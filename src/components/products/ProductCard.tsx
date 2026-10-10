import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../../types/database';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'template':
        return 'Website Template';
      case 'dashboard':
        return 'Admin Dashboard';
      case 'ecommerce':
        return 'E-commerce System';
      case 'landing_page':
        return 'Landing Page';
      case 'source_code':
        return 'Source Code';
      default:
        return 'Digital Product';
    }
  };

  return (
    <div className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={product.thumbnail_url}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Product Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="purple" size="sm">
            {getProductTypeLabel(product.product_type)}
          </Badge>
        </div>

        {/* Demo Link */}
        {product.demo_url && (
          <a
            href={product.demo_url}
            target="_blank"
            rel="noreferrer"
            className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/90 hover:bg-purple-600 text-slate-200 hover:text-white border border-slate-700/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="ทดลองดู Live Demo"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Rating & Tech */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.avg_rating?.toFixed(1) || '5.0'}</span>
              <span className="text-slate-400 font-normal">
                ({product.review_count || 1} รีวิว)
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
              {product.technologies.slice(0, 2).join(' • ')}
            </div>
          </div>

          {/* Title */}
          <Link to={`/marketplace/${product.slug}`}>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* After-Sales Guarantee Note */}
          <div className="flex items-center gap-1.5 text-[11px] text-indigo-400 font-mono pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>มีบริการหลังการขาย • รับประกันบั๊ก 7 วัน</span>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="pt-5 mt-4 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-xs text-slate-400 block font-mono">ราคาจำหน่าย</span>
              <span className="text-2xl font-black text-white font-mono">
                ฿{Number(product.price).toLocaleString('th-TH')}
              </span>
            </div>
            <Link
              to={`/marketplace/${product.slug}`}
              className="text-xs text-slate-400 hover:text-purple-300 flex items-center gap-1"
            >
              ดูสเปกไฟล์ <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to={`/marketplace/${product.slug}`} className="w-full">
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                ดูรายละเอียด
              </Button>
            </Link>
            <Link to={`/marketplace/${product.slug}`} className="w-full">
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                className="w-full from-purple-600 to-indigo-600 shadow-purple-500/20 text-xs"
              >
                เลือกแพ็กเกจ & ซื้อ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
