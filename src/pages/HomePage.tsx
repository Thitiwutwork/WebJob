import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Code2,
  Sparkles,
  Layers,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Cpu,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Terminal,
  Database,
  Globe,
  Rocket,
} from 'lucide-react';
import { projectService } from '../services/projectService';
import { serviceService } from '../services/serviceService';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { Project, ServiceItem, Product, Review } from '../types/database';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [projData, srvData, prodData, revData] = await Promise.all([
          projectService.getFeaturedProjects(),
          serviceService.getAllServices(true),
          productService.getAllProducts(true),
          reviewService.getAllReviews(),
        ]);
        setFeaturedProjects(projData);
        setServices(srvData.slice(0, 4));
        setProducts(prodData.slice(0, 3));
        setReviews(revData.slice(0, 3));
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const techStacks = [
    { name: 'React 19 & Next.js', category: 'Frontend', desc: 'Modern reactive interfaces & fast rendering' },
    { name: 'TypeScript', category: 'Language', desc: 'Strict type safety & maintainable codebase' },
    { name: 'Tailwind CSS', category: 'Styling', desc: 'Clean, responsive and scalable design systems' },
    { name: 'Supabase & PostgreSQL', category: 'Backend & DB', desc: 'Realtime database, Auth & Row Level Security' },
    { name: 'Vercel & Edge Functions', category: 'Infra & Deploy', desc: 'Global CDN distribution & serverless logic' },
    { name: 'REST & GraphQL APIs', category: 'Integration', desc: 'Secure enterprise system connectors' },
  ];

  const workSteps = [
    {
      num: '01',
      title: 'Discovery & Briefing',
      desc: 'วิเคราะห์โจทย์ธุรกิจ วาง User Journey ฟังก์ชันหลักที่ต้องมี และกำหนดงบประมาณที่ชัดเจน',
    },
    {
      num: '02',
      title: 'Architecture & UI/UX',
      desc: 'ออกแบบ Schema ฐานข้อมูล ความปลอดภัย (RLS) และสร้าง Wireframe/Mockup ดีไซน์สวยงาม',
    },
    {
      num: '03',
      title: 'Full-Stack Development',
      desc: 'พัฒนา Frontend & Backend ด้วย Clean Code เชื่อมต่อ API และทดสอบบนทุกอุปกรณ์',
    },
    {
      num: '04',
      title: 'Launch, Testing & Handover',
      desc: 'Deploy บน Vercel เชื่อมต่อโดเมน namenoname.store พร้อมส่งมอบ Source Code และคู่มือครบถ้วน',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center px-4 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-mono shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Custom Web Projects & Consultations</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            I Build Websites That <br />
            <span className="gradient-text">Help Businesses Grow.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            บริการรับพัฒนาเว็บไซต์ Full-Stack, ออกแบบระบบ Web Application
            และจำหน่าย Website Templates คุณภาพสูง สร้างด้วยสถาปัตยกรรมที่ทันสมัย โหลดไว และปลอดภัยระดับมาตรฐาน
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button
                variant="primary"
                size="lg"
                icon={<Rocket className="w-5 h-5" />}
                className="w-full sm:w-auto text-base shadow-xl shadow-indigo-600/30"
              >
                Start a Project / เริ่มบรีฟงาน
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto text-base"
              >
                View My Work / ชมผลงาน
              </Button>
            </Link>
          </div>

          {/* Quick Stats or Domain proof */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Primary Domain</span>
              <span className="text-sm font-bold text-white font-mono">namenoname.store</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Target Architecture</span>
              <span className="text-sm font-bold text-white font-mono">React + Supabase</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Security Model</span>
              <span className="text-sm font-bold text-white font-mono">Postgres RLS Guard</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono block">Hosting Platform</span>
              <span className="text-sm font-bold text-white font-mono">Vercel Edge Global</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Code2 className="w-4 h-4" />
              <span>Showcase & Case Studies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">ผลงานที่เคยพัฒนา (Featured Projects)</h2>
            <p className="text-sm text-slate-400 mt-1">
              ผลงานระบบจริงที่ออกแบบเพื่อแก้ปัญหาธุรกิจอย่างตรงจุด
            </p>
          </div>
          <Link to="/portfolio">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              ดูผลงานทั้งหมด
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 font-mono">กำลังโหลดผลงาน...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* Services Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>What I Deliver</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">บริการพัฒนาเว็บไซต์และระบบออนไลน์</h2>
          <p className="text-sm text-slate-400">
            ครอบคลุมตั้งแต่หน้า Landing Page เพื่อปิดการขาย จนถึงระบบจัดการธุรกิจและ E-commerce ครบวงจร
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <div className="space-y-1.5 pt-2">
                  {srv.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">เริ่มต้น</span>
                  <span className="text-base font-bold text-white font-mono">
                    {srv.starting_price
                      ? `฿${srv.starting_price.toLocaleString()}`
                      : 'สอบถามราคา'}
                  </span>
                </div>
                <Link to={`/contact?service=${srv.id}`}>
                  <Button variant="outline" size="sm">
                    ขอใบเสนอราคา
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link to="/services">
            <Button variant="secondary" size="md">
              ดูรายละเอียดบริการและแพ็กเกจทั้งหมด
            </Button>
          </Link>
        </div>
      </section>

      {/* Marketplace Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase tracking-wider mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Website Marketplace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">เทมเพลตและซอร์สโค้ดพร้อมใช้งาน</h2>
            <p className="text-sm text-slate-400 mt-1">
              สั่งซื้อแล้วรับสิทธิ์ดาวน์โหลดไฟล์ดิจิทัล พร้อมคู่มือติดตั้งและสิทธิ์ Commercial License
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="ghost" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              ดูสินค้าทั้งหมดใน Marketplace
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Modern Technology Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">เทคโนโลยีและเครื่องมือระดับมาตรฐานสากล</h2>
          <p className="text-sm text-slate-400">
            เลือกใช้เทคโนโลยีที่ทันสมัย ปลอดภัย โหลดเร็ว และดูแลรักษาง่ายในระยะยาว
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStacks.map((tech) => (
            <div
              key={tech.name}
              className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-4 hover:border-slate-700 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-800/80 text-indigo-400 flex items-center justify-center shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{tech.name}</h4>
                  <Badge variant="slate" size="sm">
                    {tech.category}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
            <Rocket className="w-4 h-4" />
            <span>Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">ขั้นตอนการทำงานที่โปร่งใสและเป็นระบบ</h2>
          <p className="text-sm text-slate-400">
            ทำงานเป็นสเต็ปชัดเจน มีการอัปเดตความคืบหน้าสม่ำเสมอ ส่งงานตรงเวลา
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workSteps.map((step) => (
            <div
              key={step.num}
              className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-3xl font-black font-mono text-indigo-500/40 block">
                  {step.num}
                </span>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (Verified Customer Reviews) */}
      {reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">รีวิวจากผู้สั่งซื้อสินค้าและผู้ใช้งานจริง</h2>
            <p className="text-xs text-slate-400">
              * เฉพาะผู้ที่มี Transaction คำสั่งซื้อที่ตรวจสอบได้จริงเท่านั้นจึงจะสามารถส่งรีวิวได้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    {rev.customer?.display_name || 'ลูกค้าที่สั่งซื้อจริง'}
                  </span>
                  <Badge variant="success" size="sm">
                    Verified Purchase
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 overflow-hidden text-center space-y-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            พร้อมยกระดับเว็บไซต์ธุรกิจของคุณแล้วหรือยัง?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            ติดต่อเพื่อปรึกษา วางโครงสร้างสถาปัตยกรรม หรือขอใบเสนอราคาฟรี ไม่มีค่าใช้จ่ายล่วงหน้า
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button
                variant="primary"
                size="lg"
                icon={<Rocket className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                ส่งบรีฟโครงการของคุณ
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                เลือกดูเทมเพลตสำเร็จรูป
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
