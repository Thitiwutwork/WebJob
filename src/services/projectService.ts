import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Project } from '../types/database';
import { INITIAL_PROJECTS } from './mockData';

const STORAGE_KEY = 'namenoname_projects';

const getLocalProjects = (): Project[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PROJECTS;
  }
};

const saveLocalProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const projectService = {
  async getAllProjects(onlyPublished = true): Promise<Project[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (onlyPublished) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as Project[];
        }
      } catch (err) {
        console.warn('Falling back to local projects data:', err);
      }
    }
    const local = getLocalProjects();
    return onlyPublished ? local.filter((p) => p.is_published) : local;
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        console.warn('Falling back to local project slug query:', err);
      }
    }
    const local = getLocalProjects();
    return local.find((p) => p.slug === slug) || null;
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const all = await this.getAllProjects(true);
    return all.filter((p) => p.is_featured);
  },

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('projects').insert([project]).select().single();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        console.warn('Error inserting project to Supabase, saving locally:', err);
      }
    }

    const current = getLocalProjects();
    const updated = [newProject, ...current];
    saveLocalProjects(updated);
    return newProject;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        console.warn('Error updating project in Supabase:', err);
      }
    }

    const current = getLocalProjects();
    const index = current.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Project not found');
    current[index] = { ...current[index], ...updates, updated_at: new Date().toISOString() };
    saveLocalProjects(current);
    return current[index];
  },

  async deleteProject(id: string): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Error deleting project from Supabase:', err);
      }
    }

    const current = getLocalProjects();
    saveLocalProjects(current.filter((p) => p.id !== id));
  },
};
