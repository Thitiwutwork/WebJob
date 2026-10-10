import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  Calendar,
} from 'lucide-react';
import { projectService } from '../services/projectService';
import { Project } from '../types/database';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      try {
        const data = await projectService.getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500 font-mono">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        กำลังโหลดรายละเอียดผลงาน...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">ไม่พบข้อมูลผลงานนี้</h2>
        <p className="text-sm text-slate-400">ผลงานที่คุณกำลังค้นหาอาจถูกย้าย หรือปิดการเผยแพร่ชั่วคราว</p>
        <Link to="/portfolio">
          <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
            กลับหน้ารวมผลงาน
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่หน้ารวมผลงานทั้งหมด
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.is_featured && (
            <Badge variant="warning" size="sm">
              Featured Project
            </Badge>
          )}
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(project.created_at).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl">
          {project.summary}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="primary" size="md">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noreferrer">
              <Button
                variant="primary"
                size="md"
                icon={<ExternalLink className="w-4 h-4" />}
                className="shadow-lg shadow-indigo-500/20"
              >
                เปิดดู Live Demo เว็บไซต์
              </Button>
            </a>
          )}
          <Link to={`/contact?ref=${encodeURIComponent(project.title)}`}>
            <Button
              variant="outline"
              size="md"
              icon={<Sparkles className="w-4 h-4 text-purple-400" />}
            >
              จ้างพัฒนาระบบลักษณะนี้
            </Button>
          </Link>
        </div>
      </div>

      {/* Large Showcase Banner */}
      <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="w-full h-auto object-cover max-h-[550px]"
        />
      </div>

      {/* Detailed Case Study */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Narrative */}
        <div className="md:col-span-2 space-y-10">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-400" />
              ภาพรวมและวัตถุประสงค์ของโครงการ
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.problem && (
                <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    ปัญหาที่พบ (The Challenge)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Lightbulb className="w-4 h-4" />
                    แนวทางแก้ปัญหา (The Solution)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Core Features */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">ฟีเจอร์หลักของระบบ (Core Features)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Project Meta */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white">ข้อมูลจำเพาะระบบ</h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block mb-1">เทคโนโลยี Frontend</span>
                <span className="text-white font-semibold">React & Tailwind CSS</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">ฐานข้อมูล & เซิร์ฟเวอร์</span>
                <span className="text-white font-semibold">Supabase PostgreSQL & RLS</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">การส่งมอบ (Delivery)</span>
                <span className="text-white font-semibold">Full Source Code & Deployment</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link to={`/contact?ref=${encodeURIComponent(project.title)}`}>
                <Button variant="primary" size="md" className="w-full">
                  ขอใบเสนอราคาโปรเจกต์นี้
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
