import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product } from '../types/database';
import { INITIAL_PRODUCTS } from './mockData';

const STORAGE_KEY = 'namenoname_products';

const getLocalProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    const parsed = JSON.parse(data);
    if (!parsed.some((p: any) => p.id === 'prod-rs232-kit') || parsed.some((p: any) => p.id === 'prod-stocklin-kit')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return parsed;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
  async getAllProducts(onlyPublished = true): Promise<Product[]> {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase.from('products').select('*').order('created_at', { ascending: false });
        if (onlyPublished) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as Product[];
        }
      } catch (err) {
        console.warn('Falling back to local products data:', err);
      }
    }
    const local = getLocalProducts();
    return onlyPublished ? local.filter((p) => p.is_published) : local;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
        if (!error && data) {
          return data as Product;
        }
      } catch (err) {
        console.warn('Falling back to local product slug query:', err);
      }
    }
    const local = getLocalProducts();
    return local.find((p) => p.slug === slug) || null;
  },

  async getProductById(id: string): Promise<Product | null> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (!error && data) {
          return data as Product;
        }
      } catch (err) {
        console.warn('Falling back to local product id query:', err);
      }
    }
    const local = getLocalProducts();
    return local.find((p) => p.id === id) || null;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('products').insert([product]).select().single();
        if (!error && data) {
          return data as Product;
        }
      } catch (err) {
        console.warn('Error inserting product to Supabase, saving locally:', err);
      }
    }

    const current = getLocalProducts();
    const updated = [newProduct, ...current];
    saveLocalProducts(updated);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('products')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) {
          return data as Product;
        }
      } catch (err) {
        console.warn('Error updating product in Supabase:', err);
      }
    }

    const current = getLocalProducts();
    const index = current.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    current[index] = { ...current[index], ...updates, updated_at: new Date().toISOString() };
    saveLocalProducts(current);
    return current[index];
  },

  async deleteProduct(id: string): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (err) {
        console.warn('Error deleting product from Supabase:', err);
      }
    }

    const current = getLocalProducts();
    saveLocalProducts(current.filter((p) => p.id !== id));
  },
};
