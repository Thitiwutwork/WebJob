import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { inquiryService } from '../../services/inquiryService';
import { ServiceItem } from '../../types/database';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

interface InquiryFormProps {
  services: ServiceItem[];
  preselectedServiceId?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ services, preselectedServiceId }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    customer_name: user?.display_name || '',
    email: '',
    phone: '',
    contact_channel: '',
    service_id: preselectedServiceId || (services[0]?.id || ''),
    project_description: '',
    required_features: '',
    budget: '15,000 - 30,000 บาท',
    start_date: 'เริ่มงานทันที',
    requested_deadline: 'ภายใน 2-3 สัปดาห์',
    reference_url: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successInquiryNumber, setSuccessInquiryNumber] = useState<string | null>(null);

  const budgetOptions = [
    'ต่ำกว่า 10,000 บาท (Landing Page / ปรับแต่งเว็บเดิม)',
    '15,000 - 30,000 บาท (Business Website / แดชบอร์ดเบื้องต้น)',
    '35,000 - 60,000 บาท (E-commerce / Web App เต็มรูปแบบ)',
    '70,000 บาทขึ้นไป (Custom SaaS / ระบบระดับองค์กร)',
    'ยังไม่ได้กำหนดงบประมาณ (ต้องการปรึกษาเพื่อประเมินราคา)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customer_name.trim()) {
      setError('กรุณาระบุชื่อของคุณ');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('กรุณาระบุอีเมลที่ถูกต้องสำหรับการติดต่อกลับ');
      return;
    }
    if (!formData.project_description.trim()) {
      setError('กรุณาระบุรายละเอียดโครงการหรือความต้องการโดยสังเขป');
      return;
    }

    setLoading(true);
    try {
      const result = await inquiryService.submitInquiry({
        customer_id: user?.id || null,
        customer_name: formData.customer_name,
        email: formData.email,
        phone: formData.phone || null,
        contact_channel: formData.contact_channel || null,
        service_id: formData.service_id || null,
        project_description: formData.project_description,
        required_features: formData.required_features || null,
        budget: formData.budget,
        start_date: formData.start_date || null,
        requested_deadline: formData.requested_deadline || null,
        reference_url: formData.reference_url || null,
        attachment_url: null,
      });

      setSuccessInquiryNumber(result.inquiry_number);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  if (successInquiryNumber) {
    return (
      <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/40 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">ส่งข้อมูลบรีฟโครงการสำเร็จ!</h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          ขอบคุณที่ให้ความสนใจครับ เราได้รับข้อมูลโครงการของคุณเรียบร้อยแล้ว
          และจะทำการตรวจสอบรายละเอียดเพื่อติดต่อกลับหรือจัดทำใบเสนอราคาภายใน 24 ชั่วโมง
        </p>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-8 inline-block">
          <span className="text-xs text-slate-400 block font-mono">หมายเลขอ้างอิงคำขอ (Inquiry No.)</span>
          <span className="text-xl font-bold text-indigo-400 font-mono tracking-wider">
            {successInquiryNumber}
          </span>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={() => {
              setSuccessInquiryNumber(null);
              setFormData({
                customer_name: user?.display_name || '',
                email: '',
                phone: '',
                contact_channel: '',
                service_id: services[0]?.id || '',
                project_description: '',
                required_features: '',
                budget: budgetOptions[1],
                start_date: 'เริ่มงานทันที',
                requested_deadline: 'ภายใน 2-3 สัปดาห์',
                reference_url: '',
              });
            }}
          >
            ส่งคำขออื่นเพิ่มเติม
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
            ชื่อผู้ติดต่อ <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            placeholder="เช่น คุณธิติวัฒน์ / Tech Lead"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
            อีเมลติดต่อกลับ <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your-email@example.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
          />
        </div>
      </div>

      {/* Row 2: Phone & LINE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
            เบอร์โทรศัพท์ (ไม่บังคับ)
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="08X-XXX-XXXX"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
            LINE ID หรือ ช่องทางแชตอื่น
          </label>
          <input
            type="text"
            value={formData.contact_channel}
            onChange={(e) => setFormData({ ...formData, contact_channel: e.target.value })}
            placeholder="เช่น line_id หรือ Telegram"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Service Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
          ประเภทบริการที่สนใจ <span className="text-rose-400">*</span>
        </label>
        <select
          value={formData.service_id}
          onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm transition-colors"
        >
          {services.map((srv) => (
            <option key={srv.id} value={srv.id}>
              {srv.title} {srv.starting_price ? `(เริ่มต้น ฿${srv.starting_price.toLocaleString()})` : ''}
            </option>
          ))}
          <option value="other">อื่น ๆ / ออกแบบระบบเฉพาะทาง</option>
        </select>
      </div>

      {/* Row 4: Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
          รายละเอียดโครงการ / ปัญหาที่ต้องการแก้ไข <span className="text-rose-400">*</span>
        </label>
        <textarea
          rows={4}
          required
          value={formData.project_description}
          onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
          placeholder="อธิบายธุรกิจของคุณ เป้าหมายของเว็บไซต์ และกลุ่มลูกค้าเป้าหมาย..."
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors resize-y"
        />
      </div>

      {/* Row 5: Required Features */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
          ฟีเจอร์หลักที่ต้องการ (ไม่บังคับ)
        </label>
        <textarea
          rows={2}
          value={formData.required_features}
          onChange={(e) => setFormData({ ...formData, required_features: e.target.value })}
          placeholder="เช่น ระบบตะกร้าสินค้า, ระบบจองเวลา, ล็อกอินด้วย Google, แดชบอร์ดรายงานผล..."
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
        />
      </div>

      {/* Row 6: Budget & Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
            งบประมาณโดยประมาณ
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-sm transition-colors"
          >
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
            กำหนดส่งมอบที่ต้องการ
          </label>
          <input
            type="text"
            value={formData.requested_deadline}
            onChange={(e) => setFormData({ ...formData, requested_deadline: e.target.value })}
            placeholder="เช่น ภายในสิ้นเดือนนี้ / ภายใน 1 เดือน"
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
          />
        </div>
      </div>

      {/* Row 7: Reference URL */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider font-mono">
          เว็บไซต์อ้างอิงหรือตัวอย่างดีไซน์ที่ชอบ (ถ้ามี)
        </label>
        <input
          type="url"
          value={formData.reference_url}
          onChange={(e) => setFormData({ ...formData, reference_url: e.target.value })}
          placeholder="https://example.com"
          className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          icon={<Send className="w-5 h-5" />}
          className="w-full text-base font-bold shadow-xl shadow-indigo-600/25"
        >
          ส่งข้อมูลบรีฟโครงการ (Submit Brief)
        </Button>
        <p className="text-center text-xs text-slate-400 mt-3 font-mono">
          🔒 ข้อมูลของคุณจะถูกเก็บรักษาเป็นความลับและใช้เพื่อการประเมินโครงการเท่านั้น
        </p>
      </div>
    </form>
  );
};
