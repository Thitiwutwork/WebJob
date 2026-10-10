import React, { useEffect, useState, useMemo } from 'react';
import { Search, Filter, FolderGit2, X } from 'lucide-react';
import { projectService } from '../services/projectService';
import { Project } from '../types/database';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { Button } from '../components/common/Button';

export const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'featured'>('newest');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects(true);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Collect all unique technologies across all projects
  const availableTechnologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.technologies?.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, [projects]);

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTech =
          selectedTech === 'All' || project.technologies.includes(selectedTech);

        return matchesSearch && matchesTech;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [projects, searchQuery, selectedTech, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <FolderGit2 className="w-4 h-4" />
          <span>Work Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">ผลงานที่เคยพัฒนา (Portfolio)</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          รวมตัวอย่างโปรเจกต์ระบบเว็บและแอปพลิเคชันจริงที่เคยส่งมอบ ครอบคลุมระบบหลังบ้าน E-commerce, POS, SaaS และ Business Platform
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อโปรเจกต์ หรือคำอธิบายระบบ..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
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
            <span className="text-xs font-mono text-slate-400 whitespace-nowrap">เรียงลำดับ:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="newest">ล่าสุด (Newest)</option>
              <option value="featured">ผลงานเด่น (Featured First)</option>
            </select>
          </div>
        </div>

        {/* Tech Stack Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs text-slate-400 font-mono whitespace-nowrap pr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Stack:
          </span>
          {availableTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedTech === tech
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-mono">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          กำลังโหลดรายการผลงาน...
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-slate-900/30 border border-slate-800/80 p-8 space-y-3">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">ไม่พบผลงานที่ตรงกับเงื่อนไข</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            ลองปรับเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองเทคโนโลยีเพื่อดูผลงานอื่น ๆ
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedTech('All');
            }}
          >
            ล้างตัวกรองทั้งหมด
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
