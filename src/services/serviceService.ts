import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ServiceItem } from '../types/database';
import { INITIAL_SERVICES } from './mockData';

const STORAGE_KEY = 'namenoname_services';

const getLocalServices = (): ServiceItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SERVICES));
    return INITIAL_SERVICES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_SERVICES;
  }
};

const saveLocalServices = (services: ServiceItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
};

export const serviceService = {
  async getAllServices(onlyPublished = true): Promise<ServiceItem[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('services').select('*').order('created_at', { ascending: true });
        if (onlyPublished) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as ServiceItem[];
        }
      } catch (err) {
        console.warn('Falling back to local services data:', err);
      }
    }
    const local = getLocalServices();
    return onlyPublished ? local.filter((s) => s.is_published) : local;
  },

  async getServiceBySlug(slug: string): Promise<ServiceItem | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('services').select('*').eq('slug', slug).single();
        if (!error && data) {
          return data as ServiceItem;
        }
      } catch (err) {
        console.warn('Falling back to local service slug query:', err);
      }
    }
    const local = getLocalServices();
    return local.find((s) => s.slug === slug) || null;
  },

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('services')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) {
          return data as ServiceItem;
        }
      } catch (err) {
        console.warn('Error updating service in Supabase:', err);
      }
    }

    const current = getLocalServices();
    const index = current.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Service not found');
    current[index] = { ...current[index], ...updates, updated_at: new Date().toISOString() };
    saveLocalServices(current);
    return current[index];
  },
};
