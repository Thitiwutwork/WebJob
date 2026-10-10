import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MessageSquare, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-mono font-bold shadow-md">
                &lt;/&gt;
              </div>
              <span className="font-bold text-lg text-white">Thitiwut Dev Studio</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              รับพัฒนาเว็บไซต์ ออกแบบระบบเว็บแอปพลิเคชัน และจำหน่าย Website Templates คุณภาพสูง
              สร้างบนสถาปัตยกรรมที่ปลอดภัย ทันสมัย และตอบโจทย์ธุรกิจจริง
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://namenoname.store"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                title="Primary Domain"
              >
                <Globe className="w-5 h-5" />
              </a>
              <Link
                to="/contact"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center transition-colors"
                title="Contact Me"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              หน้าหลัก
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  หน้าแรก (Home)
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-indigo-400 transition-colors">
                  ผลงานที่ผ่านมา (Portfolio)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-400 transition-colors">
                  บริการพัฒนาเว็บไซต์ (Services)
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-indigo-400 transition-colors">
                  ร้านค้าเทมเพลต (Marketplace)
                </Link>
              </li>
              <li>
                <Link to="/after-sales" className="hover:text-indigo-400 transition-colors text-indigo-300 font-semibold">
                  บริการหลังการขาย (After-Sales)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">
                  ขอใบเสนอราคา (Get a Quote)
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              บริการยอดนิยม
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/services" className="hover:text-indigo-400 transition-colors">
                  Landing Page & Sales Page
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-400 transition-colors">
                  Corporate & Business Website
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-400 transition-colors">
                  E-commerce & Store System
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-400 transition-colors">
                  Custom Web App & SaaS / POS
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-400 transition-colors">
                  Website Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech & Infrastructure */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Stack & Domain
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span className="font-mono text-xs text-slate-300">namenoname.store</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs text-slate-300">Vercel + Supabase RLS</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300">LINE: @thitiwut.dev</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                PostgreSQL &bull; TypeScript &bull; React
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900/90 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Thitiwut. All rights reserved. Domain: namenoname.store</p>
          <p className="flex items-center gap-1.5">
            Designed & Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Modern Web Developers
          </p>
        </div>
      </div>
    </footer>
  );
};
