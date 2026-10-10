export type UserRole = 'customer' | 'admin';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url?: string | null;
  role: UserRole;
  phone?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'project' | 'product';
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category_id?: string | null;
  category?: Category;
  thumbnail_url: string;
  technologies: string[];
  features: string[];
  problem?: string | null;
  solution?: string | null;
  demo_url?: string | null;
  source_code_url?: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text?: string | null;
  sort_order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  starting_price?: number | null;
  features: string[];
  excluded_features?: string[];
  estimated_duration: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductType = 'template' | 'landing_page' | 'dashboard' | 'ecommerce' | 'source_code';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id?: string | null;
  category?: Category;
  price: number;
  thumbnail_url: string;
  gallery_urls?: string[];
  technologies: string[];
  included_items: string[];
  requirements: string[];
  license_terms: string;
  demo_url?: string | null;
  storage_path?: string | null;
  product_type: ProductType;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  avg_rating?: number;
  review_count?: number;
}

export type InquiryStatus = 'new' | 'reviewing' | 'quoted' | 'negotiating' | 'accepted' | 'rejected' | 'completed';

export interface Inquiry {
  id: string;
  inquiry_number: string;
  customer_id?: string | null;
  customer_name: string;
  email: string;
  phone?: string | null;
  contact_channel?: string | null;
  service_id?: string | null;
  service?: ServiceItem;
  project_description: string;
  required_features?: string | null;
  budget: string;
  start_date?: string | null;
  requested_deadline?: string | null;
  reference_url?: string | null;
  attachment_url?: string | null;
  status: InquiryStatus;
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
export type PaymentStatus = 'awaiting_payment' | 'reviewing_slip' | 'paid' | 'failed';

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer?: Profile;
  subtotal: number;
  discount_amount: number;
  total_amount: number;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
  payment?: Payment;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  product_title_snapshot: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface Payment {
  id: string;
  order_id: string;
  payment_method: string;
  amount: number;
  payment_status: 'pending_verification' | 'verified' | 'rejected';
  transaction_reference?: string | null;
  proof_storage_path?: string | null;
  verified_by?: string | null;
  verified_at?: string | null;
  notes?: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  customer_id: string;
  customer?: Profile;
  product_id: string;
  order_item_id: string;
  rating: number;
  comment: string;
  status: 'approved' | 'hidden';
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  recipient_id: string;
  type: string;
  title: string;
  message: string;
  read_at?: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  actor?: Profile;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  developer_name: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  line_id: string;
  github_url: string;
  domain: string;
  bank_name: string;
  bank_account_number: string;
  bank_account_name: string;
  promptpay_number: string;
}
