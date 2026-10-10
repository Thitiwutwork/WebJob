import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Inbox,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  FileCode,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { inquiryService } from '../services/inquiryService';
import { Order, Inquiry } from '../types/database';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const CustomerDashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries'>('orders');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [userOrders, userInquiries] = await Promise.all([
          orderService.getCustomerOrders(user.id),
          inquiryService.getCustomerInquiries(user.id),
        ]);
        setOrders(userOrders);
        setInquiries(userInquiries);
      } catch (err) {
        console.error('Error fetching customer data:', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">ชำระเงินสำเร็จ (Paid)</Badge>;
      case 'reviewing_slip':
        return <Badge variant="warning">รอตรวจสอบสลิป</Badge>;
      case 'awaiting_payment':
        return <Badge variant="slate">รอการชำระเงิน</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  const getInquiryStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="info">รอดำเนินการ (New)</Badge>;
      case 'reviewing':
        return <Badge variant="warning">กำลังตรวจสอบบรีฟ</Badge>;
      case 'quoted':
        return <Badge variant="purple">ออกใบเสนอราคาแล้ว</Badge>;
      case 'accepted':
        return <Badge variant="success">ตกลงเริ่มงานแล้ว</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-2xl">
            {user.display_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user.display_name}</h1>
              <Badge variant={user.role === 'admin' ? 'purple' : 'slate'} size="sm">
                {user.role}
              </Badge>
            </div>
            <span className="text-xs text-slate-400 font-mono">Member ID: {user.id}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/marketplace">
            <Button variant="outline" size="sm" icon={<ShoppingBag className="w-4 h-4" />}>
              เลือกดูเทมเพลต
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="primary" size="sm" icon={<Inbox className="w-4 h-4" />}>
              ส่งบรีฟงานใหม่
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>ประวัติคำสั่งซื้อ & สิทธิ์ดาวน์โหลด ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>คำขอบรีฟโครงการที่ส่ง ({inquiries.length})</span>
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">ยังไม่มีประวัติการสั่งซื้อ</h3>
              <p className="text-xs text-slate-400">
                เมื่อคุณสั่งซื้อ Template หรือ Source Code รายการจะปรากฏที่นี่พร้อมลิงก์ดาวน์โหลด
              </p>
              <Link to="/marketplace">
                <Button variant="outline" size="sm">
                  ไปที่ Marketplace
                </Button>
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-white">
                      {order.order_number}
                    </span>
                    {getPaymentStatusBadge(order.payment_status)}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    วันที่สร้าง: {new Date(order.created_at).toLocaleDateString('th-TH')}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.order_items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        <FileCode className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {item.product_title_snapshot}
                          </h4>
                          <span className="text-xs font-mono text-slate-400">
                            ราคา: ฿{Number(item.unit_price).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {order.payment_status === 'paid' ? (
                        <a
                          href={`https://namenoname.store/api/secure-download?order=${order.id}&item=${item.id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<Download className="w-4 h-4" />}
                            className="bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                          >
                            ดาวน์โหลดไฟล์ (ZIP)
                          </Button>
                        </a>
                      ) : (
                        <span className="text-xs text-amber-400 font-mono flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          รอแอดมินยืนยันสลิปเพื่อปลดล็อกไฟล์
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">ยอดรวมคำสั่งซื้อ</span>
                  <span className="text-base font-bold text-white">
                    ฿{Number(order.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Inquiries Tab */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <Inbox className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">ยังไม่มีคำขอบรีฟงาน</h3>
              <p className="text-xs text-slate-400">
                เมื่อคุณส่งฟอร์มขอใบเสนอราคา คุณจะสามารถติดตามสถานะการตอบกลับได้ที่นี่
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm">
                  ส่งบรีฟโครงการ
                </Button>
              </Link>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-white">
                      {inq.inquiry_number}
                    </span>
                    {getInquiryStatusBadge(inq.status)}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    งบประมาณ: {inq.budget}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  {inq.project_description}
                </p>

                {inq.internal_notes && (
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-300 font-mono">
                    <strong>ข้อความตอบกลับจากแอดมิน:</strong> {inq.internal_notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
