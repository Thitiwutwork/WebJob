import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SiteSettings } from '../types/database';
import { INITIAL_SETTINGS } from './mockData';

const STORAGE_KEY = 'namenoname_settings';

export const settingService = {
  async getSettings(): Promise<SiteSettings> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').eq('key', 'general').single();
        if (!error && data && data.value) {
          return data.value as SiteSettings;
        }
      } catch (err) {
        console.warn('Falling back to local settings:', err);
      }
    }
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('site_settings').upsert({
          key: 'general',
          value: updated,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Error saving settings to Supabase:', err);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },
};
