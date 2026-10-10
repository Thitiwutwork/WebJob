import React, { useEffect, useState, useMemo } from 'react';
import { Search, ShoppingBag, Filter, X } from 'lucide-react';
import { productService } from '../services/productService';
import { Product } from '../types/database';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/common/Button';

export const MarketplacePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(true);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching marketplace products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const productTypes = [
    { label: 'ทั้งหมด (All)', value: 'All' },
    { label: 'Website Templates', value: 'template' },
    { label: 'Admin Dashboards', value: 'dashboard' },
    { label: 'E-commerce Systems', value: 'ecommerce' },
    { label: 'Source Code Packages', value: 'source_code' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = selectedType === 'All' || product.product_type === selectedType;

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [products, searchQuery, selectedType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-mono uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4" />
          <span>Website & Source Code Store</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Marketplace สินค้าดิจิทัล</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          เลือกซื้อ Website Templates และ Full Source Code คุณภาพสูง นำไปใช้งานได้ทันที มีคู่มือการติดตั้งและการตั้งค่าระบบความปลอดภัยครบถ้วน
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อเทมเพลต, ซอร์สโค้ด หรือสแต็ก..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">เรียงตาม:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-purple-500"
            >
              <option value="newest">เพิ่มล่าสุด (Newest)</option>
              <option value="price-asc">ราคา: น้อยไปมาก</option>
              <option value="price-desc">ราคา: มากไปน้อย</option>
            </select>
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs text-slate-400 font-mono whitespace-nowrap pr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> หมวดหมู่:
          </span>
          {productTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === type.value
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          กำลังโหลดสินค้าดิจิทัล...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-slate-900/30 border border-slate-800/80 p-8 space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">ไม่พบสินค้าที่ตรงกับการค้นหา</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            ลองปรับเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อค้นหาเทมเพลตที่ต้องการ
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedType('All');
            }}
          >
            ล้างตัวกรองทั้งหมด
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
