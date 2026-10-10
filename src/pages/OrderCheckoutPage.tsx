import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Upload,
  QrCode,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { settingService } from '../services/settingService';
import { SiteSettings } from '../types/database';
import { Button } from '../components/common/Button';

export const OrderCheckoutPage: React.FC = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerEmail, setCustomerEmail] = useState(user?.display_name || '');
  const [slipFileBase64, setSlipFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [transactionRef, setTransactionRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedPromptpay, setCopiedPromptpay] = useState(false);

  useEffect(() => {
    settingService.getSettings().then(setSettings).catch(console.error);
  }, []);

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('ไฟล์สลิปต้องมีขนาดไม่เกิน 5MB');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSlipFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user && !customerEmail.trim()) {
      setError('กรุณากรอกอีเมลสำหรับรับข้อมูลคำสั่งซื้อ');
      return;
    }

    if (!slipFileBase64) {
      setError('กรุณาแนบไฟล์สลิปหลักฐานการโอนเงินเพื่อดำเนินการตรวจสอบ');
      return;
    }

    setLoading(true);
    try {
      const customerId = user?.id || `guest-${Date.now()}`;

      // 1. Create Order
      const newOrder = await orderService.createOrder({
        customer_id: customerId,
        items: cart.map((item) => ({
          product_id: item.product.id,
          product_title: item.bundleLabel ? `${item.product.title} [${item.bundleLabel}]` : item.product.title,
          unit_price: item.bundlePrice ?? item.product.price,
          quantity: item.quantity,
        })),
      });

      // 2. Submit Payment Slip
      await orderService.submitPaymentSlip(
        newOrder.id,
        slipFileBase64,
        transactionRef || undefined
      );

      // 3. Clear Cart & Redirect to success page
      clearCart();
      navigate(`/order-success?orderNumber=${newOrder.order_number}`);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่ตะกร้าสินค้า
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">ชำระเงินและแจ้งโอน (Checkout)</h1>
        <p className="text-xs text-slate-400 mt-1">
          กรุณาโอนเงินตามยอดที่ระบุและแนบสลิปหลักฐานเพื่อเปิดสิทธิ์การดาวน์โหลด
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Bank Info & Slip Upload */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Account info & QR Card */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              ช่องทางการชำระเงิน (ธนาคาร & Thai QR PromptPay)
            </h3>

            {/* QR Code Container */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="w-52 shrink-0 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-700/40">
                <img
                  src="/images/promptpay-qr.png"
                  alt="Thai QR Payment - PromptPay นาย ฐิติวุฒิ พุกภิญโญ"
                  className="w-full h-auto rounded-xl object-contain block"
                />
              </div>

              <div className="space-y-3 flex-1 font-mono text-xs w-full">
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 space-y-1">
                  <span className="text-[11px] text-indigo-300 font-bold block">
                    ⚡ สแกนได้จากทุกแอปธนาคาร
                  </span>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    เปิดแอปธนาคารของคุณ (K+, SCB, KMA, Krungthai NEXT ฯลฯ) แล้วสแกน QR Code ได้ทันที
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">ชื่อบัญชี:</span>
                    <span className="text-white font-bold font-sans">นาย ฐิติวุฒิ พุกภิญโญ</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">ธนาคาร:</span>
                    <span className="text-emerald-400 font-bold font-sans">กสิกรไทย (KBANK / K+)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">เลขบัญชี:</span>
                    <span className="text-slate-300 font-bold tracking-wider">xxx-x-x6751-x</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-2">
                    <span className="text-slate-400">เลขอ้างอิง QR:</span>
                    <span className="text-indigo-400 font-bold">004999140755892</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
              <span className="text-xs text-emerald-300 font-mono block">ยอดที่ต้องโอนชำระ</span>
              <span className="text-3xl font-black text-white font-mono">
                ฿{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Slip Upload Area */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-400" />
              แนบหลักฐานการโอนเงิน (Slip Upload) <span className="text-rose-400">*</span>
            </h3>

            <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500 rounded-2xl p-6 text-center cursor-pointer relative bg-slate-950/60 transition-colors">
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="space-y-2 pointer-events-none">
                <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                <span className="text-xs font-semibold text-indigo-400 block">
                  {fileName ? `เลือกไฟล์แล้ว: ${fileName}` : 'คลิกเพื่อเลือกไฟล์รูปสลิป หรือลากไฟล์มาวาง'}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  รองรับ JPG, PNG (ขนาดไม่เกิน 5MB)
                </span>
              </div>
            </div>

            {slipFileBase64 && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>แนบสลิปเรียบร้อยแล้ว พร้อมส่งตรวจสอบ</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                เลขอ้างอิงสลิป / เวลาโอน (ไม่บังคับ)
              </label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="เช่น เวลา 14:32 น. หรือเลขอ้างอิง"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Right: Items in Order & Action */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white">รายการที่จะได้รับ ({cart.length} รายการ)</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-start text-xs border-b border-slate-800/40 pb-2">
                <div className="pr-2">
                  <span className="text-white font-medium block truncate max-w-[200px]">
                    {item.product.title}
                  </span>
                  {item.bundleLabel && (
                    <span className="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 mt-0.5">
                      {item.bundleLabel}
                    </span>
                  )}
                  <span className="text-slate-500 font-mono block text-[11px] mt-0.5">จำนวน: {item.quantity}</span>
                </div>
                <span className="text-white font-bold font-mono whitespace-nowrap">
                  ฿{((item.bundlePrice ?? item.product.price) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 flex justify-between text-base font-bold text-white font-mono">
            <span>ยอดชำระสุทธิ</span>
            <span className="text-indigo-400">฿{totalAmount.toLocaleString()}</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full text-sm font-bold shadow-xl shadow-indigo-600/30"
          >
            ยืนยันการแจ้งชำระเงิน
          </Button>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>ระบบตรวจสอบสิทธิ์ 2 ขั้นตอน:</span>
            </div>
            <p>1. สลิปจะถูกส่งเข้าคิวรอ Admin ตรวจสอบ</p>
            <p>2. เมื่ออนุมัติแล้ว ระบบจะปลดล็อกปุ่มดาวน์โหลดไฟล์ในแดชบอร์ดของคุณทันที</p>
          </div>
        </div>
      </form>
    </div>
  );
};
