import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Order, OrderStatus, PaymentStatus, OrderItem, Payment } from '../types/database';

const STORAGE_KEY = 'namenoname_orders';

const getLocalOrders = (): Order[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveLocalOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const orderService = {
  generateOrderNumber(): string {
    const year = new Date().getFullYear();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${year}-${randomHex}`;
  },

  async createOrder(payload: {
    customer_id: string;
    items: Array<{
      product_id: string;
      product_title: string;
      unit_price: number;
      quantity: number;
    }>;
  }): Promise<Order> {
    const orderNumber = this.generateOrderNumber();
    const subtotal = payload.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
    const totalAmount = subtotal; // can apply discount if any
    const orderId = `ord-${Date.now()}`;

    const orderItems: OrderItem[] = payload.items.map((item, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      order_id: orderId,
      product_id: item.product_id,
      product_title_snapshot: item.product_title,
      unit_price: item.unit_price,
      quantity: item.quantity,
      line_total: item.unit_price * item.quantity,
    }));

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      customer_id: payload.customer_id,
      subtotal,
      discount_amount: 0,
      total_amount: totalAmount,
      order_status: 'pending',
      payment_status: 'awaiting_payment',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      order_items: orderItems,
    };

    if (isSupabaseConfigured()) {
      try {
        const { data: orderData, error: orderErr } = await supabase
          .from('orders')
          .insert([
            {
              order_number: orderNumber,
              customer_id: payload.customer_id,
              subtotal,
              discount_amount: 0,
              total_amount: totalAmount,
              order_status: 'pending',
              payment_status: 'awaiting_payment',
            },
          ])
          .select()
          .single();

        if (!orderErr && orderData) {
          // insert order items
          const itemsToInsert = payload.items.map((item) => ({
            order_id: orderData.id,
            product_id: item.product_id,
            product_title_snapshot: item.product_title,
            unit_price: item.unit_price,
            quantity: item.quantity,
            line_total: item.unit_price * item.quantity,
          }));
          await supabase.from('order_items').insert(itemsToInsert);
          return {
            ...newOrder,
            id: orderData.id,
          };
        }
      } catch (err) {
        console.warn('Error inserting order to Supabase, fallback to local:', err);
      }
    }

    const current = getLocalOrders();
    saveLocalOrders([newOrder, ...current]);
    return newOrder;
  },

  async getAllOrders(): Promise<Order[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*), payments(*)')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data as Order[];
        }
      } catch (err) {
        console.warn('Falling back to local orders query:', err);
      }
    }
    return getLocalOrders();
  },

  async getOrderById(id: string): Promise<Order | null> {
    const orders = await this.getAllOrders();
    return orders.find((o) => o.id === id || o.order_number === id) || null;
  },

  async getCustomerOrders(customerId: string): Promise<Order[]> {
    const orders = await this.getAllOrders();
    return orders.filter((o) => o.customer_id === customerId);
  },

  async submitPaymentSlip(orderId: string, slipUrlOrBase64: string, refNumber?: string): Promise<Order> {
    const current = getLocalOrders();
    const index = current.findIndex((o) => o.id === orderId);
    if (index === -1) throw new Error('Order not found');

    const payment: Payment = {
      id: `pay-${Date.now()}`,
      order_id: orderId,
      payment_method: 'bank_transfer',
      amount: current[index].total_amount,
      payment_status: 'pending_verification',
      transaction_reference: refNumber || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      proof_storage_path: slipUrlOrBase64,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('payments').insert([
          {
            order_id: orderId,
            payment_method: 'bank_transfer',
            amount: current[index].total_amount,
            payment_status: 'pending_verification',
            transaction_reference: payment.transaction_reference,
            proof_storage_path: slipUrlOrBase64,
          },
        ]);
        await supabase.from('orders').update({ payment_status: 'reviewing_slip' }).eq('id', orderId);
      } catch (err) {
        console.warn('Error saving payment slip in Supabase:', err);
      }
    }

    current[index] = {
      ...current[index],
      payment_status: 'reviewing_slip',
      payment,
      updated_at: new Date().toISOString(),
    };
    saveLocalOrders(current);
    return current[index];
  },

  async adminVerifyPayment(
    orderId: string,
    action: 'approve' | 'reject',
    verifierId?: string
  ): Promise<Order> {
    const current = getLocalOrders();
    const index = current.findIndex((o) => o.id === orderId);
    if (index === -1) throw new Error('Order not found');

    const newPaymentStatus: PaymentStatus = action === 'approve' ? 'paid' : 'failed';
    const newOrderStatus: OrderStatus = action === 'approve' ? 'completed' : 'cancelled';

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('orders')
          .update({
            payment_status: newPaymentStatus,
            order_status: newOrderStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('id', orderId);

        await supabase
          .from('payments')
          .update({
            payment_status: action === 'approve' ? 'verified' : 'rejected',
            verified_by: verifierId || null,
            verified_at: new Date().toISOString(),
          })
          .eq('order_id', orderId);
      } catch (err) {
        console.warn('Error updating payment verification in Supabase:', err);
      }
    }

    current[index] = {
      ...current[index],
      payment_status: newPaymentStatus,
      order_status: newOrderStatus,
      updated_at: new Date().toISOString(),
      payment: current[index].payment
        ? {
            ...current[index].payment!,
            payment_status: action === 'approve' ? 'verified' : 'rejected',
            verified_by: verifierId,
            verified_at: new Date().toISOString(),
          }
        : undefined,
    };

    saveLocalOrders(current);
    return current[index];
  },

  // Generates a secure, temporary download token/URL for authorized buyers
  async generateSecureDownloadUrl(orderId: string, productId: string, customerId: string): Promise<string> {
    const order = await this.getOrderById(orderId);
    if (!order) throw new Error('Order not found');
    if (order.customer_id !== customerId) throw new Error('Unauthorized access');
    if (order.payment_status !== 'paid') throw new Error('Payment not confirmed yet');

    const hasProduct = order.order_items?.some((i) => i.product_id === productId);
    if (!hasProduct) throw new Error('Product not included in this order');

    // In a production Supabase setup with private storage bucket:
    // return (await supabase.storage.from('protected_downloads').createSignedUrl(storagePath, 3600)).data.signedUrl;

    // Secure temporary download simulation for client:
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour validity
    const token = btoa(`${orderId}:${productId}:${expiresAt}`);
    return `https://namenoname.store/api/secure-download?token=${token}`;
  },
};
