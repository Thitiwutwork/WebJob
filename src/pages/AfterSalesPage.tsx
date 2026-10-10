import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Headphones,
  Zap,
  HelpCircle,
  FileText,
  AlertCircle,
  Server,
  Database,
  Code2,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const AfterSalesPage: React.FC = () => {
  const packages = [
    {
      id: 'care-basic',
      name: 'Care Basic',
      subtitle: 'ดูแลเบื้องต้น',
      promoPrice: 590,
      normalPrice: 790,
      popular: false,
      badge: 'เริ่มต้นง่าย',
      desc: 'เหมาะสำหรับเว็บไซต์หรือระบบขนาดเล็กที่ต้องการผู้ช่วยดูแลเมื่อเกิดปัญหา',
      hoursPerMonth: '30 นาที / เดือน',
      features: [
        'ตรวจสอบปัญหาการทำงานของระบบเบื้องต้น',
        'แก้ไขข้อผิดพลาดจาก Source Code เดิมตามขอบเขตที่ตกลง',
        'แก้ไขข้อความหรือรูปภาพเล็กน้อย ไม่เกิน 30 นาทีต่อเดือน',
        'ให้คำแนะนำเกี่ยวกับการใช้งานระบบ',
        'ติดต่อขอรับบริการผ่านช่องทางที่ร้านกำหนด',
      ],
      supportChannels: 'LINE Chat / Ticket มาตรฐาน',
    },
    {
      id: 'care-pro',
      name: 'Care Pro',
      subtitle: 'ดูแลอย่างต่อเนื่อง',
      promoPrice: 1490,
      normalPrice: 1990,
      popular: true,
      badge: '⭐ ยอดนิยม (Most Popular)',
      desc: 'เหมาะสำหรับผู้ที่นำระบบไปใช้งานจริงและต้องการความช่วยเหลือเป็นประจำ',
      hoursPerMonth: '2 ชั่วโมง / เดือน',
      features: [
        'ทุกบริการจากแพ็กเกจ Care Basic',
        'แก้ไขเนื้อหาและปรับข้อมูลบนเว็บไซต์ ไม่เกิน 2 ชั่วโมงต่อเดือน',
        'ตรวจสอบฟังก์ชันหลักและข้อผิดพลาดที่พบ',
        'ตรวจสอบบันทึกข้อผิดพลาดและการทำงานของระบบตามความสามารถของแพลตฟอร์ม',
        'ให้คำแนะนำด้านการปรับปรุงประสิทธิภาพ',
        'สรุปผลการตรวจสอบรายเดือน',
      ],
      supportChannels: 'LINE Chat ด่วน / โทรศัพท์ฉุกเฉิน',
    },
    {
      id: 'care-business',
      name: 'Care Business',
      subtitle: 'ดูแลระบบเชิงเทคนิค',
      promoPrice: 2990,
      normalPrice: null,
      popular: false,
      badge: 'Enterprise Level',
      desc: 'เหมาะสำหรับธุรกิจที่ต้องการดูแลระบบอย่างต่อเนื่อง และต้องการความช่วยเหลือด้านเทคนิคมากขึ้น',
      hoursPerMonth: '4 ชั่วโมง / เดือน',
      features: [
        'ทุกบริการจากแพ็กเกจ Care Pro',
        'ตรวจสอบการเชื่อมต่อ API และฐานข้อมูลตามขอบเขตที่ตกลง',
        'แก้ไขปัญหาทางเทคนิคไม่เกิน 4 ชั่วโมงต่อเดือน',
        'จัดลำดับความสำคัญของปัญหาที่แจ้งเข้ามา (Priority Support)',
        'ให้คำแนะนำด้านความเสถียรและประสิทธิภาพของระบบ',
        'สรุปผลการดูแลระบบรายเดือนแบบละเอียด',
      ],
      supportChannels: 'Direct Developer Channel & Priority Queue',
    },
  ];

  const terms = [
    'ชั่วโมงการทำงานในแต่ละแพ็กเกจเป็นเวลารวมต่อเดือน และไม่สามารถสะสมไปเดือนถัดไปได้',
    'การพัฒนาฟีเจอร์ใหม่ การเปลี่ยนแปลงโครงสร้างระบบ และงานขนาดใหญ่จะประเมินราคาแยกต่างหาก',
    'ค่าบริการ Vercel, Supabase, Domain, SMS/OTP, AI API และบริการจากผู้ให้บริการภายนอกไม่รวมอยู่ในแพ็กเกจ เว้นแต่จะระบุไว้เป็นลายลักษณ์อักษร',
    'การสำรองข้อมูลและการกู้คืนข้อมูลให้บริการตามความสามารถของระบบและแพ็กเกจที่ใช้งาน โดยต้องยืนยันรายละเอียดก่อนเริ่มบริการ',
    'การแก้ไขโค้ดโดยบุคคลอื่น การใช้งานผิดวิธี หรือปัญหาจากผู้ให้บริการภายนอก อาจมีค่าใช้จ่ายเพิ่มเติม',
    'บริการหลังการขายเป็นบริการสมัครใจแยกจากการซื้อ Source Code และไม่ใช่การรับประกันว่าระบบจะไม่มีข้อผิดพลาด',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header & Brand Philosophy */}
      <div className="text-center max-w-4xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono shadow-inner">
          <Headphones className="w-3.5 h-3.5 text-indigo-400" />
          <span>ThitiwutWeb After-Sales Service</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          บริการหลังการขาย <span className="gradient-text">(After-Sales Service)</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          ซื้อ Source Code กับ <strong>ThitiwutWeb</strong> ไม่ได้จบแค่การรับโค้ด เรายังมีบริการช่วยดูแล แก้ไขปัญหา
          และให้คำแนะนำ เพื่อให้คุณสามารถนำระบบไปใช้งานจริงได้อย่างมั่นใจ
        </p>
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 inline-block font-mono">
          <span className="text-indigo-400 font-bold">ThitiwutWeb</span> — <em>Your Idea, Our Code.</em>{' '}
          เราพร้อมช่วยให้โปรเจกต์ของคุณก้าวจากโค้ดสู่การใช้งานจริง
        </div>
      </div>

      {/* ThitiwutWebLaunch Promotion Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/90 via-purple-950/70 to-slate-950 border border-indigo-500/40 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              ThitiwutWebLaunch Promotion — สิทธิพิเศษสำหรับลูกค้าใหม่
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              เริ่มต้นใช้งานระบบของคุณได้ง่ายขึ้น ด้วยสิทธิพิเศษจาก ThitiwutWeb
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              โปรโมชั่นค่าบริการรายเดือนใช้กับ 3 เดือนแรกของการสมัคร โดยหลังสิ้นสุดโปรโมชั่นจะเปลี่ยนเป็นราคาปกติของแพ็กเกจที่เลือก
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Care Basic</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">฿590</span>
                <span className="text-xs text-slate-500 line-through ml-1.5 font-mono">฿790</span>
                <span className="text-[10px] text-slate-400 block">/เดือน (3 เดือนแรก)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/40">
                <span className="text-xs text-purple-300 block font-mono">Care Pro</span>
                <span className="text-lg font-bold text-purple-400 font-mono">฿1,490</span>
                <span className="text-xs text-slate-500 line-through ml-1.5 font-mono">฿1,990</span>
                <span className="text-[10px] text-slate-400 block">/เดือน (3 เดือนแรก)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">Care Business</span>
                <span className="text-lg font-bold text-white font-mono">฿2,990</span>
                <span className="text-[10px] text-slate-400 block">/เดือน</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-3 min-w-[280px]">
            <h4 className="text-xs font-bold font-mono text-indigo-300 uppercase tracking-wider">
              สิทธิพิเศษเพิ่มเติมสำหรับผู้ซื้อ Code:
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>ตรวจสอบความพร้อมของระบบเบื้องต้น 1 ครั้งก่อนเริ่มใช้บริการ</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>สอบถามวิธีติดตั้งและใช้งานเบื้องต้นตามขอบเขตที่ร้านกำหนด</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>ขอใบเสนอราคาสำหรับการติดตั้ง การปรับแต่ง และพัฒนาฟีเจอร์เพิ่มได้</span>
              </li>
            </ul>
            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              *ค่าบริการ Hosting, Database, Domain และบริการภายนอกไม่รวมอยู่ในโปรโมชั่น
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Packages Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">เลือกแพ็กเกจที่เหมาะกับการใช้งานของคุณ</h2>
          <p className="text-sm text-slate-400">
            ตั้งแต่การแก้ไขปัญหาเบื้องต้น ไปจนถึงการตรวจสอบระบบและดูแลทางเทคนิคอย่างต่อเนื่อง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl flex flex-col justify-between transition-all duration-300 p-8 relative ${
                pkg.popular
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105 z-10'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <span className="whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40 ring-1 ring-white/20">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    {!pkg.popular && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-indigo-400 font-mono block mt-0.5">{pkg.subtitle}</span>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed min-h-[36px]">{pkg.desc}</p>
                </div>

                {/* Pricing display */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-850">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white font-mono">
                      ฿{pkg.promoPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">/เดือน</span>
                    {pkg.normalPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono ml-auto">
                        ปกติ ฿{pkg.normalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {pkg.normalPrice && (
                    <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                      ประหยัด ฿{(pkg.normalPrice - pkg.promoPrice).toLocaleString()} / เดือน (3 เดือนแรก)
                    </span>
                  )}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>เวลาทำงาน:</span>
                    <span className="text-slate-200 font-bold">{pkg.hoursPerMonth}</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3">
                  <span className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider block">
                    สิ่งที่คุณจะได้รับ:
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 border-t border-slate-800/80 mt-6">
                <Link to={`/contact?service=${pkg.id}&ref=${encodeURIComponent(pkg.name)}`}>
                  <Button
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full text-sm font-bold shadow-lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    สมัครแพ็กเกจ {pkg.name}
                  </Button>
                </Link>
                <span className="text-[11px] text-slate-500 text-center block mt-2 font-mono">
                  ช่องทาง: {pkg.supportChannels}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bundle Value Stacking Section (Marketing Strategy) */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Bundles — ซื้อคู่ Source Code ประหยัดสูงสุด 50%</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              หมดกังวลเรื่องการติดตั้งและดูแลระบบ ด้วยแพ็กเกจบันเดิลสุดคุ้ม
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              เมื่อคุณสั่งซื้อ Source Code ใน Marketplace คุณสามารถเลือกแพ็กเกจ <strong>Starter Bundle (+฿890)</strong> เพื่อรับบริการติดตั้งขึ้น Cloud และฟรีดูแลระบบ 1 เดือนทันที หรือเลือก <strong>Business Turnkey (+฿2,990)</strong> เพื่อรับการติดตั้ง ปรับแต่งแบรนด์ และดูแล VIP ต่อเนื่อง 3 เดือนเต็ม
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/marketplace">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="from-purple-600 to-indigo-600 shadow-xl shadow-purple-600/30 whitespace-nowrap"
              >
                เลือกดู Source Code ใน Marketplace
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Bundle Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">1. Standard</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">เฉพาะโค้ด</span>
            </div>
            <p className="text-xs text-slate-400">รับ Source Code เต็ม 100% พร้อมคู่มือ สำหรับนักพัฒนาที่ติดตั้งเอง</p>
            <span className="text-xs text-slate-300 font-mono font-bold block pt-1">ราคาปกติของสินค้า</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/50 space-y-2 relative">
            <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white font-mono">
              ประหยัด ฿1,400
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-indigo-300 text-sm">2. 🚀 Starter Bundle</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">แนะนำ</span>
            </div>
            <p className="text-xs text-slate-300">โค้ด + บริการติดตั้งขึ้น Cloud ให้พร้อมใช้งาน + ดูแลระบบ Care Basic ฟรี 1 เดือน</p>
            <span className="text-xs text-indigo-300 font-mono font-bold block pt-1">+ ฿890 จากราคาโค้ด</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/50 space-y-2 relative">
            <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500 text-white font-mono">
              ประหยัด ฿4,980
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-purple-300 text-sm">3. 👑 Business Turnkey</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">VIP</span>
            </div>
            <p className="text-xs text-slate-300">โค้ด + ติดตั้ง Custom Domain + ปรับแต่งแบรนด์/โลโก้ + ดูแล Care Pro 3 เดือน</p>
            <span className="text-xs text-purple-300 font-mono font-bold block pt-1">+ ฿2,990 จากราคาโค้ด</span>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Section */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">เงื่อนไขการให้บริการ (Terms of Service)</h2>
            <p className="text-xs text-slate-400">ข้อตกลงและขอบเขตการให้บริการหลังการขาย</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms.map((term, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-850 flex items-start gap-3"
            >
              <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">{term}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            ต้องการฟังก์ชันใหม่หรือปรับแต่งระบบขนาดใหญ่? สามารถปรึกษาและขอใบเสนอราคาแยกต่างหากได้
          </p>
          <Link to="/contact">
            <Button variant="outline" size="sm" icon={<HelpCircle className="w-3.5 h-3.5" />}>
              ปรึกษา / ขอใบเสนอราคาเพิ่มเติม
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
