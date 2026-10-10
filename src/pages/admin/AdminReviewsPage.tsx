import React, { useEffect, useState } from 'react';
import { Star, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { reviewService } from '../../services/reviewService';
import { Review } from '../../types/database';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const AdminReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error('Error loading admin reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleStatus = async (review: Review) => {
    const newStatus = review.status === 'approved' ? 'hidden' : 'approved';
    await reviewService.toggleReviewStatus(review.id, newStatus);
    loadReviews();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-black text-white">จัดการรีวิว (Review Moderation)</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            ตรวจสอบรีวิวจากผู้สั่งซื้อจริง ซ่อนรีวิวที่ไม่เหมาะสม หรืออนุมัติการแสดงผล
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-4">ผู้รีวิว</th>
                  <th className="p-4">คะแนน</th>
                  <th className="p-4">ความคิดเห็น</th>
                  <th className="p-4">สถานะ</th>
                  <th className="p-4">วันที่</th>
                  <th className="p-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-900/80 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-white block">
                        {rev.customer?.display_name || 'ลูกค้าผู้สั่งซื้อ'}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified Order
                      </span>
                    </td>
                    <td className="p-4 text-amber-400 text-sm">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </td>
                    <td className="p-4 text-slate-300 max-w-xs">{rev.comment}</td>
                    <td className="p-4">
                      <Badge variant={rev.status === 'approved' ? 'success' : 'slate'} size="sm">
                        {rev.status}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono text-slate-500">
                      {new Date(rev.created_at).toLocaleDateString('th-TH')}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant={rev.status === 'approved' ? 'outline' : 'secondary'}
                        size="sm"
                        onClick={() => handleToggleStatus(rev)}
                      >
                        {rev.status === 'approved' ? 'ซ่อนรีวิว' : 'อนุมัติ'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
