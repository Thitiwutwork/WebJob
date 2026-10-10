import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';
import { Project } from '../../types/database';
import { Badge } from '../common/Badge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Featured Badge */}
        {project.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Live Demo Quick Link */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-950/90 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700/80 backdrop-blur-md transition-colors"
              title="เปิดดู Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.source_code_url && (
            <a
              href={project.source_code_url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-950/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 backdrop-blur-md transition-colors"
              title="ดู Source Code"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="slate" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] text-slate-400 self-center">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/portfolio/${project.slug}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
          </Link>

          {/* Summary */}
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Action Bottom */}
        <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
          <Link
            to={`/portfolio/${project.slug}`}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 group/link"
          >
            ดูรายละเอียดระบบ
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          <span className="text-[11px] font-mono text-slate-400">
            {new Date(project.created_at).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
