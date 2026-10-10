import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, ShoppingBag } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { productService } from '../../services/productService';
import { Product, ProductType } from '../../types/database';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: 1490,
    thumbnail_url: '',
    technologies: 'React, TypeScript, Tailwind CSS',
    included_items: 'Full Source Code, Vercel Guide',
    requirements: 'Node.js 18+',
    license_terms: 'Standard Single Project License',
    demo_url: '',
    product_type: 'template' as ProductType,
    is_published: true,
  });

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts(false);
      setProducts(data);
    } catch (err) {
      console.error('Error loading admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      slug: '',
      description: '',
      price: 1490,
      thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      technologies: 'React 19, TypeScript, Tailwind CSS, Supabase',
      included_items: 'Full Source Code, SQL Migrations, Documentation',
      requirements: 'Node.js 18+, Supabase Account',
      license_terms: 'Commercial License (ใช้กับเว็บไซต์ตนเองหรือลูกค้าได้)',
      demo_url: '',
      product_type: 'template',
      is_published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title,
      slug: prod.slug,
      description: prod.description,
      price: prod.price,
      thumbnail_url: prod.thumbnail_url,
      technologies: prod.technologies.join(', '),
      included_items: prod.included_items.join(', '),
      requirements: prod.requirements.join(', '),
      license_terms: prod.license_terms,
      demo_url: prod.demo_url || '',
      product_type: prod.product_type,
      is_published: prod.is_published,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formData.description,
      price: Number(formData.price),
      thumbnail_url: formData.thumbnail_url,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      included_items: formData.included_items.split(',').map((i) => i.trim()).filter(Boolean),
      requirements: formData.requirements.split(',').map((r) => r.trim()).filter(Boolean),
      license_terms: formData.license_terms,
      demo_url: formData.demo_url || null,
      product_type: formData.product_type,
      is_published: formData.is_published,
    };

    if (editingProduct) {
      await productService.updateProduct(editingProduct.id, payload);
    } else {
      await productService.createProduct(payload as any);
    }

    setModalOpen(false);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
      await productService.deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">จัดการสินค้า Marketplace</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              ตั้งค่าเทมเพลต กำหนดราคาขาย สิทธิ์ License และการเผยแพร่
            </p>
          </div>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleOpenCreate}>
            เพิ่มสินค้าใหม่
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-4">รูป & ชื่อสินค้า</th>
                  <th className="p-4">ประเภท</th>
                  <th className="p-4">ราคาจำหน่าย</th>
                  <th className="p-4">สถานะ</th>
                  <th className="p-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={prod.thumbnail_url}
                        alt=""
                        className="w-12 h-12 object-cover rounded-xl bg-slate-950 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white block">{prod.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">/{prod.slug}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="purple" size="sm">
                        {prod.product_type}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono font-bold text-white text-sm">
                      ฿{Number(prod.price).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <Badge variant={prod.is_published ? 'success' : 'slate'} size="sm">
                        {prod.is_published ? 'วางจำหน่าย' : 'ซ่อน'}
                      </Badge>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="แก้ไข"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300"
                        title="ลบ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า Marketplace ใหม่'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">ชื่อสินค้า (Title) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">ราคา (บาท) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">ภาพ Thumbnail URL *</label>
                <input
                  type="url"
                  required
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">รายละเอียดสินค้า (Description) *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">ประเภทสินค้า</label>
                  <select
                    value={formData.product_type}
                    onChange={(e: any) => setFormData({ ...formData, product_type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="template">Website Template</option>
                    <option value="dashboard">Admin Dashboard</option>
                    <option value="ecommerce">E-commerce System</option>
                    <option value="source_code">Source Code Package</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Live Demo Preview URL</label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">เงื่อนไข License</label>
                <input
                  type="text"
                  value={formData.license_terms}
                  onChange={(e) => setFormData({ ...formData, license_terms: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pub"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                <label htmlFor="pub" className="text-slate-300">เปิดวางจำหน่ายบน Marketplace</label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  ยกเลิก
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  บันทึกข้อมูลสินค้า
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
