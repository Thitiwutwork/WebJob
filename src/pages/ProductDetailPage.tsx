import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  AlertCircle,
  FileCode,
  Package,
} from 'lucide-react';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { orderService } from '../services/orderService';
import { Product, Review } from '../types/database';
import { useCart } from '../../src/context/CartContext';
import { useAuth } from '../../src/context/AuthContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Eligibility & Form State
  const [eligibility, setEligibility] = useState<{ eligible: boolean; orderItemId?: string; reason?: string }>({
    eligible: false,
  });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Digital download state for authorized buyer
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [generatingDownload, setGeneratingDownload] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;
      try {
        const prod = await productService.getProductBySlug(slug);
        setProduct(prod);

        if (prod) {
          const revs = await reviewService.getProductReviews(prod.id);
          setReviews(revs);

          // Check if current logged-in user is eligible to review
          if (user) {
            const check = await reviewService.checkReviewEligibility(user.id, prod.id);
            setEligibility(check);

            // Check if user has paid order to unlock download link
            const userOrders = await orderService.getCustomerOrders(user.id);
            const paidOrder = userOrders.find(
              (o) => o.payment_status === 'paid' && o.order_items?.some((i) => i.product_id === prod.id)
            );
            if (paidOrder) {
              setDownloadUrl(`https://namenoname.store/api/secure-download?order=${paidOrder.id}&prod=${prod.id}`);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [slug, user]);

  const isAlreadyInCart = cart.some((item) => item.product.id === product?.id);

  const handleAddToCart = () => {
    if (product) addToCart(product, 1);
  };

  const handleBuyNow = () => {
    if (product) {
      if (!isAlreadyInCart) addToCart(product, 1);
      navigate('/cart');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !user || !eligibility.orderItemId) return;
    setSubmittingReview(true);
    setReviewError(null);

    try {
      const newRev = await reviewService.submitReview({
        customerId: user.id,
        productId: product.id,
        orderItemId: eligibility.orderItemId,
        rating,
        comment,
        displayName: user.display_name,
      });

      setReviews([newRev, ...reviews]);
      setReviewSuccess(true);
      setEligibility({ eligible: false, reason: 'คุณได้รีวิวสินค้านี้เรียบร้อยแล้ว' });
    } catch (err: any) {
      setReviewError(err.message || 'เกิดข้อผิดพลาดในการส่งรีวิว');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500 font-mono">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        กำลังโหลดรายละเอียดสินค้า...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">ไม่พบสินค้านี้ในระบบ</h2>
        <p className="text-sm text-slate-400">สินค้าอาจถูกระงับจำหน่าย หรือ URL ไม่ถูกต้อง</p>
        <Link to="/marketplace">
          <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
            กลับสู่ Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่หน้าร้าน Marketplace
        </Link>
      </div>

      {/* Top Section: Images & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Preview Image & Demo */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative aspect-[16/10]">
            <img
              src={product.thumbnail_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Live Demo Trigger */}
          {product.demo_url && (
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium">ต้องการทดสอบหน้าเว็บจริงก่อนซื้อ?</span>
              <a href={product.demo_url} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  เปิดดู Live Preview
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Right: Pricing, Purchase & Licensing */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="purple" size="sm">
                {product.product_type.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.avg_rating?.toFixed(1) || '5.0'}</span>
                <span className="text-slate-400">({reviews.length} รีวิว)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              {product.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 font-mono block">ราคาจำหน่ายสุทธิ</span>
              <span className="text-3xl font-black text-white font-mono">
                ฿{Number(product.price).toLocaleString('th-TH')}
              </span>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/40">
              One-Time Payment
            </span>
          </div>

          {/* Digital Delivery Status */}
          {downloadUrl ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-600/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                คุณมีสิทธิ์เข้าถึงไฟล์ดิจิทัลนี้แล้ว!
              </div>
              <p className="text-xs text-slate-300">
                คำสั่งซื้อของคุณได้รับการยืนยันแล้ว สามารถดาวน์โหลด Source Code Package ได้ทันที
              </p>
              <a href={downloadUrl} target="_blank" rel="noreferrer" className="block">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Download className="w-4 h-4" />}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
                >
                  ดาวน์โหลดไฟล์โปรเจกต์ (ZIP)
                </Button>
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleAddToCart}
                  icon={<ShoppingCart className="w-5 h-5" />}
                  className="w-full"
                >
                  {isAlreadyInCart ? 'อยู่ในตะกร้า' : 'ใส่ตะกร้า'}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleBuyNow}
                  className="w-full from-purple-600 to-indigo-600 shadow-xl shadow-purple-600/30"
                >
                  สั่งซื้อทันที
                </Button>
              </div>
              <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1 font-mono">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                ส่งมอบไฟล์ดิจิทัลผ่าน Secure Signed URL หลังยืนยันการชำระเงิน
              </p>
            </div>
          )}

          {/* License Terms */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 block uppercase tracking-wider">
              เงื่อนไขการใช้งาน (License Terms)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              {product.license_terms}
            </p>
          </div>
        </div>
      </div>

      {/* Specifications & Included Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Included Items */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-400" />
            สิ่งที่จะได้รับในแพ็กเกจ (What is included)
          </h3>
          <div className="space-y-2.5">
            {product.included_items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            ข้อกำหนดและการติดตั้ง (Requirements)
          </h3>
          <div className="space-y-2.5">
            {product.requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Reviews Section */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              รีวิวจากผู้สั่งซื้อสินค้าจริง (Verified Buyer Reviews)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              * กฎความถูกต้อง: ระบบไม่อนุญาตให้เขียนรีวิวหากไม่มี Transaction การสั่งซื้อที่สำเร็จ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="md">
              {reviews.length} รีวิวที่ผ่านการตรวจสอบ
            </Badge>
          </div>
        </div>

        {/* Review Submission Form if Eligible */}
        {eligibility.eligible ? (
          <form
            onSubmit={handleReviewSubmit}
            className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/40 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                คุณสั่งซื้อสินค้านี้แล้ว! ร่วมแบ่งปันประสบการณ์การใช้งาน
              </h4>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-lg text-amber-400 hover:scale-110 transition-transform"
                  >
                    {star <= rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            {reviewError && (
              <div className="p-3 rounded-xl bg-rose-950 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{reviewError}</span>
              </div>
            )}

            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="เขียนความคิดเห็นของคุณเกี่ยวกับโครงสร้างโค้ด การติดตั้ง หรือความคุ้มค่า..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
            />

            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={submittingReview}
              className="shadow-md shadow-indigo-600/30"
            >
              ส่งรีวิว (Submit Verified Review)
            </Button>
          </form>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-500" />
              {eligibility.reason || 'กรุณาสั่งซื้อและชำระเงินสำเร็จเพื่อเปิดสิทธิ์การเขียนรีวิว'}
            </span>
            {!user && (
              <Link to="/login" className="text-indigo-400 hover:underline font-mono">
                เข้าสู่ระบบ
              </Link>
            )}
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center text-xs text-slate-500 py-6 font-mono">
              ยังไม่มีรีวิวสำหรับสินค้านี้ คุณจะเป็นคนแรกที่ได้รีวิวหลังสั่งซื้อ
            </p>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {rev.customer?.display_name || 'ลูกค้าผู้สั่งซื้อ'}
                    </span>
                    <Badge variant="success" size="sm">
                      Verified Purchase
                    </Badge>
                  </div>
                  <div className="text-amber-400 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{rev.comment}</p>
                <span className="text-[10px] font-mono text-slate-500 block">
                  {new Date(rev.created_at).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
