import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalAmount, totalCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">ตะกร้าสินค้าว่างเปล่า</h2>
        <p className="text-sm text-slate-400">
          คุณยังไม่มีสินค้าในตะกร้า เลือกดู Website Templates หรือ Full Source Code ที่น่าสนใจใน Marketplace ได้เลยครับ
        </p>
        <Link to="/marketplace">
          <Button variant="primary" size="md">
            ไปยัง Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">ตะกร้าสินค้าของคุณ</h1>
          <span className="text-xs text-slate-400 font-mono">ทั้งหมด {totalCount} รายการ</span>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-xs text-rose-400">
          ล้างตะกร้า
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.thumbnail_url}
                  alt={item.product.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-slate-950 shrink-0"
                />
                <div>
                  <Link
                    to={`/marketplace/${item.product.slug}`}
                    className="text-sm font-bold text-white hover:text-indigo-400 transition-colors line-clamp-1"
                  >
                    {item.product.title}
                  </Link>
                  {item.bundleLabel && (
                    <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                      {item.bundleLabel}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 block font-mono mt-1">
                    ฿{Number(item.bundlePrice ?? item.product.price).toLocaleString()} &times; {item.quantity}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-base font-bold text-white font-mono whitespace-nowrap">
                  ฿{((item.bundlePrice ?? item.product.price) * item.quantity).toLocaleString()}
                </span>
                <button
                  onClick={() => removeFromCart(item.product.id, item.bundleTier)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="ลบออกจากตะกร้า"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <h3 className="text-base font-bold text-white">สรุปยอดคำสั่งซื้อ</h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>ยอดรวมสินค้า</span>
              <span>฿{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>ส่วนลด</span>
              <span>฿0</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold text-white">
              <span>ยอดสุทธิ</span>
              <span>฿{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/checkout')}
            className="w-full text-sm font-bold shadow-lg shadow-indigo-600/30"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            ดำเนินการชำระเงิน
          </Button>

          <div className="space-y-2 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>การสั่งซื้อปลอดภัย 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>ส่งมอบไฟล์ดิจิทัลทันทีหลังตรวจสลิป</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
