import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { resetPasswordForEmail } = useAuth();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await resetPasswordForEmail(email);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || 'ไม่สามารถส่งลิงก์รีเซ็ตรหัสผ่านได้');
      }
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการดำเนินการ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white">ลืมรหัสผ่าน (Forgot Password)</h1>
          <p className="text-xs text-slate-400">
            กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-800 text-emerald-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>ส่งลิงก์เรียบร้อยแล้ว!</span>
              </div>
              <p className="leading-relaxed">
                ระบบได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยัง <strong className="text-white underline">{email}</strong> แล้ว กรุณาตรวจสอบกล่องข้อความของคุณ
              </p>
              <p className="text-[11px] text-emerald-300/80">
                *หากไม่พบในกล่องข้อความหลัก กรุณาตรวจสอบโฟลเดอร์ Junk หรือ Spam
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                ยังไม่ได้รับอีเมล? หรือจำอีเมลไม่ได้? สามารถติดต่อให้ผู้ดูแลระบบช่วยเหลือได้ที่{' '}
                <Link to="/contact" className="text-indigo-400 underline hover:text-indigo-300">
                  หน้าติดต่อเรา
                </Link>
              </span>
            </div>

            <div className="pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  กลับไปหน้าเข้าสู่ระบบ
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">
                อีเมลที่ใช้ลงทะเบียน (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full text-sm font-bold shadow-lg shadow-indigo-600/30"
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </Button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                กลับสู่หน้าเข้าสู่ระบบ
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
