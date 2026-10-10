import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  ShoppingBag,
  Inbox,
  Receipt,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { projectService } from '../../services/projectService';
import { productService } from '../../services/productService';
import { inquiryService } from '../../services/inquiryService';
import { orderService } from '../../services/orderService';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    productsCount: 0,
    inquiriesCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    pendingSlips: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const [projects, products, inquiries, orders] = await Promise.all([
          projectService.getAllProjects(false),
          productService.getAllProducts(false),
          inquiryService.getAllInquiries(),
          orderService.getAllOrders(),
        ]);

        const verifiedOrders = orders.filter((o) => o.payment_status === 'paid');
        const totalRevenue = verifiedOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        const pendingSlips = orders.filter((o) => o.payment_status === 'reviewing_slip').length;

        setStats({
          projectsCount: projects.length,
          productsCount: products.length,
          inquiriesCount: inquiries.length,
          ordersCount: orders.length,
          totalRevenue,
          pendingSlips,
        });

        setRecentOrders(orders.slice(0, 5));
        setRecentInquiries(inquiries.slice(0, 5));
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              ศูนย์ควบคุมระบบ แดชบอร์ดข้อมูลจริง และจัดการคำสั่งซื้อ (namenoname.store)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/projects">
              <Button variant="secondary" size="sm" icon={<Plus className="w-4 h-4" />}>
                เพิ่มผลงาน
              </Button>
            </Link>
            <Link to="/admin/products">
              <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                เพิ่มสินค้า
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Revenue */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between text-indigo-400">
              <span className="text-xs font-mono font-semibold uppercase">ยอดขายที่ยืนยันแล้ว</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              ฿{stats.totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 block font-mono">
              คำสั่งซื้อสำเร็จ: {stats.ordersCount} รายการ
            </span>
          </div>

          {/* Pending Slips */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-mono font-semibold uppercase">สลิปรอตรวจสอบ</span>
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              {stats.pendingSlips}
            </div>
            <Link to="/admin/orders" className="text-[11px] text-amber-400 hover:underline font-mono">
              ไปยังหน้ารอตรวจสลิป &rarr;
            </Link>
          </div>

          {/* Inquiries */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-purple-400">
              <span className="text-xs font-mono font-semibold uppercase">คำขอบรีฟงาน</span>
              <Inbox className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              {stats.inquiriesCount}
            </div>
            <Link to="/admin/inquiries" className="text-[11px] text-purple-400 hover:underline font-mono">
              จัดการคำขอจากลูกค้า &rarr;
            </Link>
          </div>

          {/* Projects & Products */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-mono font-semibold uppercase">ผลงาน / สินค้า</span>
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {stats.projectsCount} <span className="text-slate-500 text-lg font-normal">/</span> {stats.productsCount}
            </div>
            <span className="text-[11px] text-slate-400 block font-mono">
              Portfolio & Templates ที่เผยแพร่
            </span>
          </div>
        </div>

        {/* Recent Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-indigo-400" />
                คำสั่งซื้อล่าสุด (Recent Orders)
              </h3>
              <Link to="/admin/orders" className="text-xs text-indigo-400 hover:underline font-mono">
                ดูทั้งหมด
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center font-mono">ยังไม่มีคำสั่งซื้อ</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-white block">
                        {ord.order_number}
                      </span>
                      <span className="text-slate-400 font-mono">
                        ฿{Number(ord.total_amount).toLocaleString()}
                      </span>
                    </div>
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
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Inquiries */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-purple-400" />
                คำขอบรีฟงานล่าสุด (Recent Inquiries)
              </h3>
              <Link to="/admin/inquiries" className="text-xs text-purple-400 hover:underline font-mono">
                ดูทั้งหมด
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center font-mono">ยังไม่มีคำขอ</p>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{inq.customer_name}</span>
                      <span className="text-slate-400 font-mono truncate max-w-[180px] block">
                        {inq.inquiry_number} &bull; {inq.budget}
                      </span>
                    </div>
                    <Badge variant={inq.status === 'new' ? 'info' : 'slate'} size="sm">
                      {inq.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
