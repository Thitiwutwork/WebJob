import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Code2,
  FolderGit2,
  Layers,
  ShoppingBag,
  Mail,
  User,
  ShieldCheck,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Sparkles,
  Headphones,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();

  const navLinks = [
    { label: 'หน้าแรก', path: '/', icon: Code2 },
    { label: 'ผลงาน (Portfolio)', path: '/portfolio', icon: FolderGit2 },
    { label: 'บริการพัฒนาเว็บ', path: '/services', icon: Layers },
    { label: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { label: 'บริการหลังการขาย', path: '/after-sales', icon: Headphones },
    { label: 'ติดต่อ / ขอใบเสนอราคา', path: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-mono font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                  Thitiwut
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                  Dev Studio
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono tracking-tight">
                namenoname.store
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-slate-800/90 text-indigo-300 border border-slate-700/80 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
              title="ตะกร้าสินค้า"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* Auth State */}
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<ShieldCheck className="w-4 h-4 text-amber-300" />}
                      className="from-indigo-600 to-purple-700 shadow-purple-500/20"
                    >
                      Admin Dashboard
                    </Button>
                  </Link>
                )}

                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 text-sm font-medium transition-colors"
                >
                  <User className="w-4 h-4 text-indigo-400" />
                  <span className="max-w-[120px] truncate">{user.display_name}</span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/60 transition-colors"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Sparkles className="w-3.5 h-3.5 text-indigo-200" />}
                  >
                    เริ่มบรีฟงาน
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-medium transition-all ${
                  active
                    ? 'bg-slate-800 text-indigo-300 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-400" />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-800"
                >
                  <User className="w-5 h-5 text-indigo-400" />
                  โปรไฟล์ & ประวัติคำสั่งซื้อ ({user.display_name})
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-950/80 text-indigo-200 border border-indigo-800"
                  >
                    <ShieldCheck className="w-5 h-5 text-amber-300" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-900/50"
                >
                  <LogOut className="w-5 h-5" />
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    เริ่มบรีฟงาน
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
