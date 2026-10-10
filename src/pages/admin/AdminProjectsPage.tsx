import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Sparkles, Check, X } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { projectService } from '../../services/projectService';
import { Project } from '../../types/database';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AdminProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    thumbnail_url: '',
    technologies: 'React, TypeScript, Tailwind CSS',
    features: 'Responsive Design, Supabase DB',
    problem: '',
    solution: '',
    demo_url: '',
    source_code_url: '',
    is_featured: false,
    is_published: true,
  });

  const loadProjects = async () => {
    try {
      const data = await projectService.getAllProjects(false);
      setProjects(data);
    } catch (err) {
      console.error('Error loading admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      summary: '',
      description: '',
      thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      technologies: 'React, TypeScript, Tailwind CSS, Supabase',
      features: 'Full Authentication, Realtime Updates, Dark Mode UI',
      problem: '',
      solution: '',
      demo_url: '',
      source_code_url: '',
      is_featured: false,
      is_published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      description: project.description,
      thumbnail_url: project.thumbnail_url,
      technologies: project.technologies.join(', '),
      features: project.features.join(', '),
      problem: project.problem || '',
      solution: project.solution || '',
      demo_url: project.demo_url || '',
      source_code_url: project.source_code_url || '',
      is_featured: project.is_featured,
      is_published: project.is_published,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary: formData.summary,
      description: formData.description,
      thumbnail_url: formData.thumbnail_url,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
      problem: formData.problem || null,
      solution: formData.solution || null,
      demo_url: formData.demo_url || null,
      source_code_url: formData.source_code_url || null,
      is_featured: formData.is_featured,
      is_published: formData.is_published,
    };

    if (editingProject) {
      await projectService.updateProject(editingProject.id, payload);
    } else {
      await projectService.createProject(payload as any);
    }

    setModalOpen(false);
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผลงานนี้?')) {
      await projectService.deleteProject(id);
      loadProjects();
    }
  };

  const handleTogglePublish = async (project: Project) => {
    await projectService.updateProject(project.id, { is_published: !project.is_published });
    loadProjects();
  };

  const handleToggleFeatured = async (project: Project) => {
    await projectService.updateProject(project.id, { is_featured: !project.is_featured });
    loadProjects();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">จัดการผลงาน (Project Management)</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              เพิ่ม ลบ แก้ไข และกำหนดสถานะการเผยแพร่ผลงานบนพอร์ตโฟลิโอ
            </p>
          </div>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleOpenCreate}>
            เพิ่มผลงานใหม่
          </Button>
        </div>

        {/* Project Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="p-4">รูป & ชื่อโปรเจกต์</th>
                  <th className="p-4">เทคโนโลยี</th>
                  <th className="p-4">สถานะ Featured</th>
                  <th className="p-4">สถานะแสดงผล</th>
                  <th className="p-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-900/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={proj.thumbnail_url}
                        alt=""
                        className="w-12 h-12 object-cover rounded-xl bg-slate-950 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white block">{proj.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">/{proj.slug}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {proj.technologies.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleFeatured(proj)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer border ${
                          proj.is_featured
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        {proj.is_featured ? '★ Featured' : 'Normal'}
                      </button>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(proj)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer border ${
                          proj.is_published
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        {proj.is_published ? 'เผยแพร่อยู่' : 'ซ่อนไว้'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="แก้ไข"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
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

      {/* Modal for Create/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">ชื่อโปรเจกต์ (Title) *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="nexus-pos-system"
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
                <label className="block text-slate-400 font-mono mb-1">คำอธิบายสั้น (Summary) *</label>
                <input
                  type="text"
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">คำอธิบายรายละเอียด (Description) *</label>
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
                  <label className="block text-slate-400 font-mono mb-1">เทคโนโลยีที่ใช้ (คั่นด้วยจุลภาค)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">ฟีเจอร์หลัก (คั่นด้วยจุลภาค)</label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Source Code GitHub URL</label>
                  <input
                    type="url"
                    value={formData.source_code_url}
                    onChange={(e) => setFormData({ ...formData, source_code_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  />
                  <span>กำหนดเป็น Featured Project</span>
                </label>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  />
                  <span>เผยแพร่ต่อสาธารณะ</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  ยกเลิก
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  บันทึกข้อมูล
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
