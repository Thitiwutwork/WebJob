import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { Button } from '../components/common/Button';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'ORD-RECENT';

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-black text-white">บันทึกคำสั่งซื้อและรับสลิปเรียบร้อยแล้ว!</h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
          ขอบคุณสำหรับการสั่งซื้อครับ เราได้รับหลักฐานการชำระเงินเรียบร้อยแล้ว
          เจ้าหน้าที่จะทำการตรวจสอบยอดโอนเงินเพื่อปลดล็อกสิทธิ์การดาวน์โหลดไฟล์ดิจิทัลให้คุณโดยเร็วที่สุด
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 inline-block text-left w-full max-w-md space-y-4">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400">หมายเลขคำสั่งซื้อ:</span>
          <span className="text-indigo-400 font-bold text-sm">{orderNumber}</span>
        </div>

        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400">สถานะการชำระเงิน:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
            <Clock className="w-3 h-3" />
            รอตรวจสอบสลิป (Reviewing Slip)
          </span>
        </div>

        <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
          * คุณสามารถดูประวัติคำสั่งซื้อ ตรวจสอบสถานะ และดาวน์โหลด Source Code ได้ที่หน้า{' '}
          <strong className="text-slate-200">Customer Dashboard</strong>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/dashboard">
          <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            ไปยัง Customer Dashboard
          </Button>
        </Link>
        <Link to="/marketplace">
          <Button variant="secondary" size="md">
            เลือกดูเทมเพลตอื่นต่อ
          </Button>
        </Link>
      </div>
    </div>
  );
};
