import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
} from 'lucide-react';
import { serviceService } from '../services/serviceService';
import { ServiceItem } from '../types/database';
import { Button } from '../components/common/Button';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAllServices(true);
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Services & Packages</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">บริการรับพัฒนาเว็บไซต์และระบบ</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          พัฒนาด้วยสถาปัตยกรรมระดับ Modern Web Application โครงสร้างสะอาด ปลอดภัยด้วย Supabase RLS
          และเชื่อมต่อโดเมนของคุณบน Vercel ได้อย่างรวดเร็ว
        </p>
      </div>

      {/* Services Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          กำลังโหลดแพ็กเกจบริการ...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-8 shadow-xl"
            >
              <div className="space-y-6">
                {/* Header of card */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{service.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-xs font-mono text-indigo-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>ระยะเวลาประเมิน: {service.estimated_duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-mono">ราคาเริ่มต้น</span>
                    <span className="text-2xl font-black text-white font-mono">
                      {service.starting_price
                        ? `฿${service.starting_price.toLocaleString()}`
                        : 'สอบถามราคา'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">{service.description}</p>

                {/* Included features */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
                    สิ่งที่คุณจะได้รับในแพ็กเกจ:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Excluded features if any */}
                {service.excluded_features && service.excluded_features.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      สิ่งที่ไม่รวมในแพ็กเกจเบื้องต้น:
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5">
                      {service.excluded_features.map((ex, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                          <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800">
                <Link to={`/contact?service=${service.id}`} className="block">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full text-sm font-bold shadow-lg shadow-indigo-600/20"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    ขอใบเสนอราคา / ปรึกษาแพ็กเกจนี้
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* After-Sales Service Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border border-indigo-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono">
              <Headphones className="w-3.5 h-3.5" />
              บริการหลังการขาย (After-Sales Service)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ซื้อ Source Code หรือพัฒนาระบบกับเรา ดูแลต่อเนื่องอย่างมั่นใจ
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              เรามีแพ็กเกจดูแลระบบรายเดือน <strong>Care Basic (฿590/ด.)</strong>, <strong>Care Pro (฿1,490/ด.)</strong> และ <strong>Care Business (฿2,990/ด.)</strong> ช่วยดูแล แก้ไขบั๊ก และตรวจสอบระบบเชิงเทคนิคอย่างต่อเนื่อง
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/after-sales">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="from-indigo-600 to-purple-600 shadow-xl shadow-indigo-600/30 whitespace-nowrap"
              >
                ดูรายละเอียดแพ็กเกจดูแลระบบ
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Assurance banner */}
      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            การรับประกันและความปลอดภัยของซอร์สโค้ด
          </h3>
          <p className="text-xs text-slate-400">
            ทุกโปรเจกต์ส่งมอบ Full Source Code พร้อมสิทธิ์ขาด 100% เอกสารแนะนำการติดตั้ง และรับประกันแก้ไขข้อผิดพลาดฟรี
          </p>
        </div>
        <Link to="/contact">
          <Button variant="secondary" size="md">
            คุยรายละเอียดเพิ่มเติม
          </Button>
        </Link>
      </div>
    </div>
  );
};
