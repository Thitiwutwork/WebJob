import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Inquiry, InquiryStatus } from '../types/database';

const STORAGE_KEY = 'namenoname_inquiries';

const getLocalInquiries = (): Inquiry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveLocalInquiries = (inquiries: Inquiry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
};

export const inquiryService = {
  generateInquiryNumber(): string {
    const year = new Date().getFullYear();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    return `INQ-${year}-${randomHex}`;
  },

  async submitInquiry(
    payload: Omit<Inquiry, 'id' | 'inquiry_number' | 'status' | 'created_at' | 'updated_at'>
  ): Promise<Inquiry> {
    const inquiryNumber = this.generateInquiryNumber();
    const newInquiry: Inquiry = {
      ...payload,
      id: `inq-${Date.now()}`,
      inquiry_number: inquiryNumber,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .insert([
            {
              inquiry_number: inquiryNumber,
              customer_id: payload.customer_id || null,
              customer_name: payload.customer_name,
              email: payload.email,
              phone: payload.phone || null,
              contact_channel: payload.contact_channel || null,
              service_id: payload.service_id || null,
              project_description: payload.project_description,
              required_features: payload.required_features || null,
              budget: payload.budget,
              start_date: payload.start_date || null,
              requested_deadline: payload.requested_deadline || null,
              reference_url: payload.reference_url || null,
              attachment_url: payload.attachment_url || null,
              status: 'new',
            },
          ])
          .select()
          .single();

        if (!error && data) {
          return data as Inquiry;
        }
      } catch (err) {
        console.warn('Error submitting inquiry to Supabase, fallback to local:', err);
      }
    }

    const current = getLocalInquiries();
    saveLocalInquiries([newInquiry, ...current]);
    return newInquiry;
  },

  async getAllInquiries(): Promise<Inquiry[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data as Inquiry[];
        }
      } catch (err) {
        console.warn('Falling back to local inquiries query:', err);
      }
    }
    return getLocalInquiries();
  },

  async getCustomerInquiries(customerId: string): Promise<Inquiry[]> {
    const all = await this.getAllInquiries();
    return all.filter((i) => i.customer_id === customerId);
  },

  async updateInquiryStatus(id: string, status: InquiryStatus, internal_notes?: string): Promise<Inquiry> {
    if (isSupabaseConfigured()) {
      try {
        const updates: any = { status, updated_at: new Date().toISOString() };
        if (internal_notes !== undefined) {
          updates.internal_notes = internal_notes;
        }
        const { data, error } = await supabase
          .from('inquiries')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        if (!error && data) {
          return data as Inquiry;
        }
      } catch (err) {
        console.warn('Error updating inquiry status in Supabase:', err);
      }
    }

    const current = getLocalInquiries();
    const index = current.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Inquiry not found');
    current[index] = {
      ...current[index],
      status,
      internal_notes: internal_notes !== undefined ? internal_notes : current[index].internal_notes,
      updated_at: new Date().toISOString(),
    };
    saveLocalInquiries(current);
    return current[index];
  },
};
