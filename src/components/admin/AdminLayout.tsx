import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  ShoppingBag,
  Inbox,
  Receipt,
  Star,
  Settings,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono">กำลังตรวจสอบสิทธิ์ Admin...</span>
        </div>
      </div>
    );
  }

  // Security protection: If not admin, redirect or show unauthorized
  if (!user || !isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-rose-800/60 text-center">
          <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied (เฉพาะผู้ดูแลระบบ)</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            คุณไม่มีสิทธิ์เข้าถึงหน้า Admin Console กรุณาเข้าสู่ระบบด้วยบัญชีแอดมิน
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
            >
              เข้าสู่ระบบด้วยบัญชี Admin
            </Link>
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
            >
              กลับหน้าแรก
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'ภาพรวม (Overview)', path: '/admin', icon: LayoutDashboard },
    { label: 'จัดการผลงาน (Projects)', path: '/admin/projects', icon: FolderGit2 },
    { label: 'จัดการสินค้า (Products)', path: '/admin/products', icon: ShoppingBag },
    { label: 'คำขอบรีฟงาน (Inquiries)', path: '/admin/inquiries', icon: Inbox },
    { label: 'คำสั่งซื้อ & สลิป (Orders)', path: '/admin/orders', icon: Receipt },
    { label: 'จัดการรีวิว (Reviews)', path: '/admin/reviews', icon: Star },
    { label: 'ตั้งค่าระบบ (Settings)', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-slate-800/80 bg-slate-950/60 shrink-0 p-4 md:p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                ADM
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Admin Console</h2>
                <span className="text-[10px] text-indigo-400 font-mono">Thitiwut Studio</span>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-900 mt-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับสู่หน้าร้าน (Storefront)
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
};
