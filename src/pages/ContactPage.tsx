import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  MessageSquare,
  Globe,
  HelpCircle,
  Clock,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { GithubIcon } from '../components/common/GithubIcon';
import { serviceService } from '../services/serviceService';
import { ServiceItem } from '../types/database';
import { InquiryForm } from '../components/forms/InquiryForm';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('service') || undefined;
  const refProject = searchParams.get('ref') || undefined;

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

  const faqs = [
    {
      q: 'มีขั้นตอนการเริ่มงานอย่างไรบ้าง?',
      a: 'เริ่มต้นด้วยการกรอกแบบฟอร์มด้านล่างเพื่อบรีฟความต้องการ จากนั้นเราจะติดต่อกลับเพื่อพูดคุยรายละเอียด ทำใบเสนอราคา และจัดทำสัญญาพร้อมแบ่งงวดงานที่ชัดเจน',
    },
    {
      q: 'เว็บไซต์ที่พัฒนาจะขึ้นออนไลน์บนโดเมนของลูกค้าได้เลยไหม?',
      a: 'ใช่ครับ เราช่วยตั้งค่าเชื่อมต่อ Custom Domain ของคุณ เช่น การผูก DNS กับ Vercel หรือ Cloudflare และติดตั้ง SSL Certificate ให้ฟรี',
    },
    {
      q: 'หากต้องการแก้ไขโค้ดเองในอนาคต สามารถทำได้หรือไม่?',
      a: 'ทำได้ 100% ครับ เราส่งมอบ Full Source Code บน GitHub พร้อมโครงสร้าง Clean Architecture และเอกสารแนะนำการรันคำสั่งเบื้องต้น',
    },
    {
      q: 'การชำระเงินแบ่งจ่ายอย่างไร?',
      a: 'สำหรับงานพัฒนาเว็บไซต์ทั่วไป แบ่งชำระเป็น 2 งวด: มัดจำก่อนเริ่มพัฒนา 50% และชำระงวดสุดท้าย 50% เมื่องานเสร็จสิ้นและพร้อมขึ้นเซิร์ฟเวอร์จริง',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <Send className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">ติดต่อเรา / ขอใบเสนอราคา</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          มีไอเดียโปรเจกต์ใหม่ ต้องการสร้างเว็บไซต์ธุรกิจ หรือพัฒนา Web App เฉพาะทาง?
          ส่งรายละเอียดโครงการของคุณมาได้เลยครับ เราพร้อมให้คำปรึกษาและประเมินราคาฟรี
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">ช่องทางการติดต่อโดยตรง</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-mono block">อีเมลสำหรับธุรกิจ</span>
                  <a
                    href="mailto:thitiwut.dev@namenoname.store"
                    className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                  >
                    thitiwut.dev@namenoname.store
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-mono block">LINE Official / Chat</span>
                  <span className="text-sm font-semibold text-white">@thitiwut.dev</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/60 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-mono block">Official Domain</span>
                  <a
                    href="https://namenoname.store"
                    className="text-sm font-semibold text-white hover:text-purple-400 font-mono transition-colors"
                  >
                    namenoname.store
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-mono block">GitHub Organization</span>
                  <a
                    href="https://github.com/Thitiwutwork/WebJob"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-white hover:text-indigo-400 font-mono transition-colors"
                  >
                    Thitiwutwork/WebJob
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>เวลาตอบกลับโดยเฉลี่ย: ภายใน 2-4 ชั่วโมง (วันทำการ)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>มีสัญญาจ้างงานและเอกสารหักภาษี ณ ที่จ่าย (ถ้าต้องการ)</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              คำถามที่พบบ่อย (FAQ)
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="text-xs font-bold text-white">{faq.q}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: The Full Inquiry Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md space-y-6">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">แบบฟอร์มส่งข้อมูลบรีฟโครงการ</h3>
            <p className="text-xs text-slate-400">
              กรอกรายละเอียดเบื้องต้นเพื่อให้เราเตรียมข้อมูลและคำนวณสโคปงานได้อย่างแม่นยำ
            </p>
            {refProject && (
              <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-800/80 text-xs text-indigo-300 font-mono">
                โครงการที่อ้างอิง: {refProject}
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 font-mono">กำลังโหลดแบบฟอร์ม...</div>
          ) : (
            <InquiryForm services={services} preselectedServiceId={preselectedServiceId} />
          )}
        </div>
      </div>
    </div>
  );
};
