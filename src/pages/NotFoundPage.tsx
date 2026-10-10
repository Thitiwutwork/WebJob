import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 text-indigo-400 flex items-center justify-center mx-auto shadow-xl">
          <Terminal className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-4xl font-black text-indigo-400 font-mono">404</span>
          <h1 className="text-2xl font-bold text-white">ไม่พบหน้าที่คุณต้องการ</h1>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            URL ที่คุณเรียกอาจถูกย้าย หรือไม่มีอยู่ในระบบ (namenoname.store)
          </p>
        </div>
        <Link to="/">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            กลับหน้าหลัก (Go Home)
          </Button>
        </Link>
      </div>
    </div>
  );
};
