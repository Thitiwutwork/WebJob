import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Review } from '../types/database';
import { orderService } from './orderService';

const STORAGE_KEY = 'namenoname_reviews';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customer_id: 'cust-1',
    customer: {
      id: 'cust-1',
      display_name: 'คุณกิตติศักดิ์ (Tech Lead)',
      role: 'customer',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    },
    product_id: 'prod-1',
    order_item_id: 'item-demo-1',
    rating: 5,
    comment: 'โครงสร้างโค้ดสะอาดมาก แยก Layer ชัดเจน นำไปปรับแต่งต่อได้ง่ายมาก ประหยัดเวลาขึ้นโปรเจกต์ใหม่ไปได้หลายสัปดาห์เลยครับ',
    status: 'approved',
    created_at: '2026-02-10T12:00:00Z',
    updated_at: '2026-02-10T12:00:00Z',
  },
  {
    id: 'rev-2',
    customer_id: 'cust-2',
    customer: {
      id: 'cust-2',
      display_name: 'คุณพรไพลิน (E-commerce Business Owner)',
      role: 'customer',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    },
    product_id: 'prod-3',
    order_item_id: 'item-demo-2',
    rating: 5,
    comment: 'ระบบแนบสลิปและตรวจการโอนเงินดีมาก ลูกค้าซื้อแล้วระบบส่งมอบไฟล์ให้ทันทีหลังจากที่แอดมินอนุมัติ คุ้มค่าราคามากค่ะ',
    status: 'approved',
    created_at: '2026-03-05T09:30:00Z',
    updated_at: '2026-03-05T09:30:00Z',
  },
];

const getLocalReviews = (): Review[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
    return INITIAL_REVIEWS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_REVIEWS;
  }
};

const saveLocalReviews = (reviews: Review[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

export const reviewService = {
  async getProductReviews(productId: string): Promise<Review[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*, customer:profiles(*)')
          .eq('product_id', productId)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data as Review[];
        }
      } catch (err) {
        console.warn('Falling back to local reviews for product:', err);
      }
    }
    const local = getLocalReviews();
    return local.filter((r) => r.product_id === productId && r.status === 'approved');
  },

  async getAllReviews(): Promise<Review[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*, customer:profiles(*), product:products(title)')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data as Review[];
        }
      } catch (err) {
        console.warn('Falling back to local all reviews:', err);
      }
    }
    return getLocalReviews();
  },

  // Strictly verify if customer has verified paid transaction for this product
  async checkReviewEligibility(customerId: string, productId: string): Promise<{
    eligible: boolean;
    orderItemId?: string;
    reason?: string;
  }> {
    if (!customerId) {
      return { eligible: false, reason: 'กรุณาเข้าสู่ระบบก่อนรีวิว' };
    }

    const customerOrders = await orderService.getCustomerOrders(customerId);
    const paidOrders = customerOrders.filter((o) => o.payment_status === 'paid');

    for (const order of paidOrders) {
      const matchItem = order.order_items?.find((item) => item.product_id === productId);
      if (matchItem) {
        // check if already reviewed this order item
        const existingReviews = getLocalReviews();
        const alreadyReviewed = existingReviews.some(
          (r) => r.customer_id === customerId && r.order_item_id === matchItem.id
        );
        if (alreadyReviewed) {
          return { eligible: false, reason: 'คุณได้รีวิวสินค้านี้สำหรับคำสั่งซื้อนี้เรียบร้อยแล้ว' };
        }
        return { eligible: true, orderItemId: matchItem.id };
      }
    }

    return {
      eligible: false,
      reason: 'เฉพาะผู้ที่สั่งซื้อสินค้าและชำระเงินสำเร็จแล้วเท่านั้น จึงจะมีสิทธิ์รีวิวสินค้านี้',
    };
  },

  async submitReview(payload: {
    customerId: string;
    productId: string;
    orderItemId: string;
    rating: number;
    comment: string;
    displayName: string;
  }): Promise<Review> {
    // Re-verify eligibility on service level
    const check = await this.checkReviewEligibility(payload.customerId, payload.productId);
    if (!check.eligible) {
      throw new Error(check.reason || 'ไม่มีสิทธิ์รีวิวสินค้านี้');
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      customer_id: payload.customerId,
      customer: {
        id: payload.customerId,
        display_name: payload.displayName,
        role: 'customer',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      product_id: payload.productId,
      order_item_id: payload.orderItemId,
      rating: payload.rating,
      comment: payload.comment,
      status: 'approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('reviews').insert([
          {
            customer_id: payload.customerId,
            product_id: payload.productId,
            order_item_id: payload.orderItemId,
            rating: payload.rating,
            comment: payload.comment,
            status: 'approved',
          },
        ]);
      } catch (err) {
        console.warn('Error inserting review into Supabase:', err);
      }
    }

    const current = getLocalReviews();
    saveLocalReviews([newReview, ...current]);
    return newReview;
  },

  async toggleReviewStatus(reviewId: string, status: 'approved' | 'hidden'): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('reviews').update({ status }).eq('id', reviewId);
      } catch (err) {
        console.warn('Error updating review status in Supabase:', err);
      }
    }
    const current = getLocalReviews();
    const index = current.findIndex((r) => r.id === reviewId);
    if (index !== -1) {
      current[index].status = status;
      saveLocalReviews(current);
    }
  },
};
