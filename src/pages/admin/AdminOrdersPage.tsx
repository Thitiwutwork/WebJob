import React, { useEffect, useState } from 'react';
import { Receipt, Check, X, Eye, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { orderService } from '../../services/orderService';
import { Order } from '../../types/database';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();

  const loadOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error loading admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleVerify = async (orderId: string, action: 'approve' | 'reject') => {
    setActionLoading(true);
    try {
      await orderService.adminVerifyPayment(orderId, action, user?.id);
      await loadOrders();
      setSelectedOrder(null);
    } catch (err) {
      console.error('Error verifying payment:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">จัดการคำสั่งซื้อและตรวจสลิป (Orders)</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              ตรวจสอบหลักฐานการโอนเงิน ยืนยันการชำระเงิน และเปิดสิทธิ์ดาวน์โหลดซอร์สโค้ด
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-4">หมายเลขออเดอร์</th>
                  <th className="p-4">ยอดเงิน</th>
                  <th className="p-4">สถานะชำระเงิน</th>
                  <th className="p-4">สถานะคำสั่งซื้อ</th>
                  <th className="p-4">หลักฐานสลิป</th>
                  <th className="p-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                      ยังไม่มีคำสั่งซื้อในระบบ
                    </td>
                  </tr>
                ) : (
                  orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-900/80 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-bold text-white block">
                          {ord.order_number}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(ord.created_at).toLocaleDateString('th-TH')}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-white text-sm">
                        ฿{Number(ord.total_amount).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            ord.payment_status === 'paid'
                              ? 'success'
                              : ord.payment_status === 'reviewing_slip'
                              ? 'warning'
                              : 'slate'
                          }
                          size="sm"
                        >
                          {ord.payment_status}
                        </Badge>
                      </td>
                      <td className="p-4 font-mono text-slate-400">
                        {ord.order_status}
                      </td>
                      <td className="p-4">
                        {ord.payment?.proof_storage_path ? (
                          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> แนบสลิปแล้ว
                          </span>
                        ) : (
                          <span className="text-slate-500 font-mono text-[11px]">ไม่มีสลิป</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="secondary" size="sm" onClick={() => setSelectedOrder(ord)}>
                          ตรวจสอบสลิป
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Slip Inspection & Verification Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-indigo-400 block">
                  {selectedOrder.order_number}
                </span>
                <h3 className="text-lg font-bold text-white">ตรวจสอบคำสั่งซื้อและสลิป</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">ยอดเงินที่ต้องได้รับ:</span>
                  <span className="text-white font-bold text-base">
                    ฿{Number(selectedOrder.total_amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">สถานะปัจจุบัน:</span>
                  <span className="text-amber-400">{selectedOrder.payment_status}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-1">
                <span className="text-slate-400 block">รายการสินค้าในคำสั่งซื้อ:</span>
                {selectedOrder.order_items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/60"
                  >
                    <span className="text-white">{item.product_title_snapshot}</span>
                    <span className="text-slate-400">฿{Number(item.unit_price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Slip Image View */}
              <div className="space-y-2">
                <span className="text-slate-400 block">รูปภาพหลักฐานสลิปโอนเงิน:</span>
                {selectedOrder.payment?.proof_storage_path ? (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2 max-h-80 flex justify-center">
                    <img
                      src={selectedOrder.payment.proof_storage_path}
                      alt="Bank Slip"
                      className="max-h-72 object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center text-slate-500">
                    ลูกค้ายังไม่ได้อัปโหลดสลิป
                  </div>
                )}
              </div>

              {/* Action buttons */}
              {selectedOrder.payment_status !== 'paid' && (
                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                  <Button
                    variant="danger"
                    size="sm"
                    loading={actionLoading}
                    onClick={() => handleVerify(selectedOrder.id, 'reject')}
                  >
                    ปฏิเสธสลิป (Reject)
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    loading={actionLoading}
                    className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30"
                    onClick={() => handleVerify(selectedOrder.id, 'approve')}
                  >
                    อนุมัติยอดเงิน (Approve & Unlock)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
