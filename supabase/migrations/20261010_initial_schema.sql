-- ============================================================================
-- SUPABASE POSTGRESQL SCHEMA FOR DEVELOPER PORTFOLIO & WEBSITE MARKETPLACE
-- DOMAIN: namenoname.store
-- ============================================================================

-- 0. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT 'User',
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('project', 'product')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. PROJECTS TABLE (Portfolio)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    thumbnail_url TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    problem TEXT,
    solution TEXT,
    demo_url TEXT,
    source_code_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. PROJECT_IMAGES TABLE (Portfolio Gallery)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- 5. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    starting_price NUMERIC(12, 2), -- NULL means "Inquire for quote"
    features TEXT[] NOT NULL DEFAULT '{}',
    excluded_features TEXT[] NOT NULL DEFAULT '{}',
    estimated_duration TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. PRODUCTS TABLE (Website Marketplace & Templates)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    thumbnail_url TEXT NOT NULL,
    gallery_urls TEXT[] NOT NULL DEFAULT '{}',
    technologies TEXT[] NOT NULL DEFAULT '{}',
    included_items TEXT[] NOT NULL DEFAULT '{}',
    requirements TEXT[] NOT NULL DEFAULT '{}',
    license_terms TEXT NOT NULL DEFAULT 'Standard Single Domain License',
    demo_url TEXT,
    storage_path TEXT, -- private storage path to downloadable zip file
    product_type TEXT NOT NULL CHECK (product_type IN ('template', 'landing_page', 'dashboard', 'ecommerce', 'source_code')),
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. INQUIRIES TABLE (Client briefs & quote requests)
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_number TEXT NOT NULL UNIQUE,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    contact_channel TEXT, -- e.g. Line ID, Phone
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    project_description TEXT NOT NULL,
    required_features TEXT,
    budget TEXT NOT NULL,
    start_date TEXT,
    requested_deadline TEXT,
    reference_url TEXT,
    attachment_url TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'quoted', 'negotiating', 'accepted', 'rejected', 'completed')),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. QUOTES TABLE
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    quote_number TEXT NOT NULL UNIQUE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    scope TEXT NOT NULL,
    revision_limit INT NOT NULL DEFAULT 2,
    valid_until DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'declined')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
    payment_status TEXT NOT NULL DEFAULT 'awaiting_payment' CHECK (payment_status IN ('awaiting_payment', 'reviewing_slip', 'paid', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. ORDER_ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    product_title_snapshot TEXT NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    line_total NUMERIC(12, 2) NOT NULL CHECK (line_total >= 0)
);

-- 11. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    payment_method TEXT NOT NULL DEFAULT 'bank_transfer',
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    payment_status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (payment_status IN ('pending_verification', 'verified', 'rejected')),
    transaction_reference TEXT,
    proof_storage_path TEXT, -- URL or storage path to uploaded bank slip
    verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. REVIEWS TABLE (Enforces verified purchase)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE RESTRICT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('approved', 'hidden')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_customer_order_item_review UNIQUE (customer_id, order_item_id)
);

-- 13. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. AUDIT_LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. SITE_SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_is_published ON public.projects(is_published);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_published ON public.products(is_published);
CREATE INDEX IF NOT EXISTS idx_inquiries_customer_id ON public.inquiries(customer_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if auth.uid() is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles are readable by everyone"
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own non-role profile fields"
ON public.profiles FOR UPDATE USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND (
    role = (SELECT role FROM public.profiles WHERE id = auth.uid()) -- Prevents self-elevation to admin
  )
);

-- Projects Policies
CREATE POLICY "Anyone can view published projects"
ON public.projects FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Only admins can modify projects"
ON public.projects FOR ALL USING (public.is_admin());

-- Products Policies
CREATE POLICY "Anyone can view published products"
ON public.products FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Only admins can modify products"
ON public.products FOR ALL USING (public.is_admin());

-- Services & Categories Policies
CREATE POLICY "Anyone can view services"
ON public.services FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Only admins can modify services"
ON public.services FOR ALL USING (public.is_admin());

CREATE POLICY "Anyone can view categories"
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories"
ON public.categories FOR ALL USING (public.is_admin());

-- Inquiries Policies
CREATE POLICY "Anyone can submit an inquiry"
ON public.inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers view own inquiries and Admins view all"
ON public.inquiries FOR SELECT USING (
  (auth.uid() IS NOT NULL AND customer_id = auth.uid()) OR public.is_admin()
);

CREATE POLICY "Admins can update inquiries"
ON public.inquiries FOR UPDATE USING (public.is_admin());

-- Orders & Order Items Policies
CREATE POLICY "Customers view own orders and Admins view all"
ON public.orders FOR SELECT USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "Customers can create pending orders"
ON public.orders FOR INSERT WITH CHECK (
  customer_id = auth.uid() AND 
  payment_status = 'awaiting_payment' AND
  order_status = 'pending'
);

CREATE POLICY "Only Admins can update order status and payment status"
ON public.orders FOR UPDATE USING (public.is_admin());

CREATE POLICY "Customers view own order items and Admins view all"
ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.customer_id = auth.uid() OR public.is_admin())
  )
);

CREATE POLICY "Customers can insert items into their pending orders"
ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.customer_id = auth.uid()
    AND orders.payment_status = 'awaiting_payment'
  )
);

-- Payments Policies
CREATE POLICY "Customers view own payments and Admins view all"
ON public.payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = payments.order_id 
    AND (orders.customer_id = auth.uid() OR public.is_admin())
  )
);

CREATE POLICY "Customers can upload payment proof"
ON public.payments FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = payments.order_id 
    AND orders.customer_id = auth.uid()
  ) AND payment_status = 'pending_verification'
);

CREATE POLICY "Admins can update payments"
ON public.payments FOR UPDATE USING (public.is_admin());

-- Reviews Policies (Verified Purchase check!)
CREATE POLICY "Anyone can view approved reviews"
ON public.reviews FOR SELECT USING (status = 'approved' OR public.is_admin());

CREATE POLICY "Verified purchasers can insert reviews"
ON public.reviews FOR INSERT WITH CHECK (
  customer_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.order_items oi
    JOIN public.orders o ON o.id = oi.order_id
    WHERE oi.id = order_item_id
    AND oi.product_id = reviews.product_id
    AND o.customer_id = auth.uid()
    AND o.payment_status = 'paid'
  )
);

CREATE POLICY "Admins can moderate reviews"
ON public.reviews FOR UPDATE USING (public.is_admin());

-- Site Settings Policies
CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can edit site settings"
ON public.site_settings FOR ALL USING (public.is_admin());

-- ============================================================================
-- AUTH PROFILE CREATION TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    'customer'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- SEED DATA (INITIAL DATA FOR PORTFOLIO, SERVICES & MARKETPLACE)
-- ============================================================================
INSERT INTO public.categories (name, slug, type) VALUES
('Business Website', 'business-website', 'project'),
('E-commerce & Store', 'ecommerce', 'project'),
('Admin Dashboard & POS', 'dashboard-pos', 'project'),
('Web Application', 'web-app', 'project'),
('Website Templates', 'templates', 'product'),
('Source Code Packages', 'source-code', 'product')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.services (title, slug, description, starting_price, features, excluded_features, estimated_duration) VALUES
(
  'Landing Page & Single Page Website',
  'landing-page',
  'ออกแบบและพัฒนาหน้าเซลเพจ / หน้าแนะนำสินค้าหรือบริการ ดีไซน์สวยงาม โหลดไว รองรับมือถือ 100% พร้อมเชื่อมต่อฟอร์มติดต่อและปุ่ม Call To Action เพื่อเพิ่มยอดขาย',
  6900.00,
  ARRAY['Responsive 100% (Mobile/Tablet/Desktop)', 'Fast Loading Performance & SEO Ready', 'Contact Form & LINE Connect', 'Dark/Light Modern Design', 'ฟรี Host Vercel 1 ปี'],
  ARRAY['ระบบชำระเงินออนไลน์', 'ระบบสมาชิกหลังบ้าน'],
  '3 - 5 วัน'
),
(
  'Corporate & Business Website',
  'business-website',
  'เว็บไซต์องค์กร ธุรกิจ และบริษัท พร้อมระบบจัดการเนื้อหา (CMS) รองรับหลายภาษา นำเสนอภาพลักษณ์ที่น่าเชื่อถือและทันสมัย',
  18900.00,
  ARRAY['5-8 หน้าหลัก (Home, About, Services, Projects, Contact)', 'Admin Dashboard จัดการข้อมูลเองได้', 'SEO Optimization & Google Search Console', 'SSL Certificate & Custom Domain Setup', 'รองรับภาษาไทย-อังกฤษ'],
  ARRAY['ระบบขายสินค้าและตะกร้าสินค้า'],
  '7 - 14 วัน'
),
(
  'E-commerce & Custom Marketplace',
  'ecommerce-website',
  'ระบบร้านค้าออนไลน์ครบวงจร รองรับตะกร้าสินค้า ระบบชำระเงิน สลิป PromptPay บัตรเครดิต และจัดการสต็อกหลังบ้าน',
  35000.00,
  ARRAY['ระบบ Catalog สินค้า & ค้นหาอัจฉริยะ', 'ระบบตะกร้าและ Checkout Flow', 'แนบสลิป & ตรวจสอบการชำระเงิน', 'ระบบสมาชิก & ประวัติคำสั่งซื้อ', 'Admin Dashboard จัดการ Order'],
  ARRAY['ค่าธรรมเนียม Payment Gateway ฝั่งผู้ให้บริการ'],
  '14 - 25 วัน'
),
(
  'Custom Web Application & SaaS / Dashboard',
  'custom-web-app',
  'พัฒนาระบบเว็บแอปพลิเคชันเฉพาะทางตามความต้องการของธุรกิจ เช่น ระบบ POS, ระบบจองคิว, ระบบจัดการงานภายในองค์กร หรือแพลตฟอร์ม SaaS',
  45000.00,
  ARRAY['ออกแบบ Database Schema & Architecture', 'Role-Based Access Control (Admin/Staff/Client)', 'Realtime Data Sync (Supabase)', 'REST / Edge Functions Backend', 'คู่มือและส่งมอบ Source Code ครบถ้วน'],
  ARRAY['ระบบ Third-party API ที่มีค่าบริการรายเดือน'],
  '20 - 45 วัน'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.projects (
  title, slug, summary, description, thumbnail_url, technologies, features, problem, solution, demo_url, source_code_url, is_featured, is_published
) VALUES
(
  'BA STORE - ระบบบอกเรทราคาขายปลีก & Admin Realtime Sync',
  'ba-store-retail',
  'เว็บแอปพลิเคชันแสดงเรทราคาขายปลีกแอพพรีเมียม สไตล์น่ารัก พร้อมระบบแอดมินจัดการหลังบ้านและซิงค์ราคา Realtime ด้วย Supabase',
  'ระบบแสดงเรทราคาขายปลีกและแพ็กเกจแอพพรีเมียม (Netflix, YouTube, Disney+, Viu, Spotify ฯลฯ) ดีไซน์พาสเทลสวยงาม ใช้งานง่าย มีระบบ Admin Dashboard ล็อกอินด้วยรหัส PIN สามารถเพิ่ม ลบ แก้ไขราคาได้หลายระดับ (Multi-tier: เมลล์ร้าน, เมลล์ลูกค้า, รายวัน/เดือน) ระบบซิงค์ข้อมูลสดแบบ Realtime ด้วย Supabase postgres_changes และรองรับระบบเชื่อมต่อสั่งซื้อผ่าน LINE Chat ทันที',
  '/projects/ba-store/banner.jpg',
  ARRAY['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase Realtime', 'Vite', 'PostgreSQL'],
  ARRAY['ระบบแสดงเรทราคา Multi-tier Pricing แบบไดนามิก (เมลล์ร้าน, เมลล์ลูกค้า, 7/30/90 วัน)', 'Admin Dashboard จัดการสินค้าและปรับราคาได้สะดวกรวดเร็วด้วยรหัส PIN', 'Supabase Realtime Sync อัปเดตราคาให้ลูกค้าทุกคนเห็นพร้อมกันสดๆ ทันที', 'ระบบโปรโมชั่นแพ็กคู่ Hot Deals Combos', 'ปุ่มสั่งซื้อเชื่อมต่อ LINE Chat ส่งบรีฟระบุชื่อแอพและราคาพร้อมคุยทันที', 'ระบบสำรองและกู้คืนข้อมูล (Export / Import JSON)'],
  'ร้านค้าอัปเดตราคาแอพพรีเมียมบ่อยครั้ง แต่ลูกค้าต้องคอยทักถามราคาทางแชท ทำให้เสียเวลาและแอดมินตอบไม่ทันยอดขายตก',
  'พัฒนา Storefront พร้อมระบบ Supabase Realtime เมื่อแอดมินเปลี่ยนราคาในหลังบ้าน หน้าจอลูกค้าทุกคนจะเปลี่ยนราคาตามทันทีแบบไม่ต้องกดรีเฟรชหน้าเว็บ',
  'https://namenoname.store',
  '',
  true,
  true
),
(
  'BA-STORE OTP - ระบบกระจายสิทธิ์และส่งรหัส OTP บัญชีสตรีมมิ่ง',
  'ba-store-otp-portal',
  'เว็บแอปพลิเคชันจัดการและกระจายรหัสยืนยันตัวตน OTP สำหรับผู้ใช้งานแอพสตรีมมิ่งชั้นนำ (Netflix, Disney+, Viu, WeTV, iQIYI, Bilibili)',
  'พอร์ทัลบริการรับและแจกจ่ายรหัสยืนยัน OTP อัตโนมัติสำหรับสมาชิกร้าน BA STORE ที่ใช้บริการแอพสตรีมมิ่งระดับพรีเมียม ช่วยลดภาระของแอดมินในการส่งรหัสทางแชททีละคน โดยผู้ใช้งานสามารถเข้ามากดขอรับรหัสผ่านหน้าเว็บได้อย่างรวดเร็ว ปลอดภัย และมีการจำกัดเวลาหมดอายุของรหัสตามมาตรฐานความปลอดภัย',
  '/projects/otp/banner.jpg',
  ARRAY['React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase Auth', 'Vite', 'Lucide'],
  ARRAY['แจกจ่ายและตรวจสอบ OTP ปลอดภัยแบบ Real-time', 'คัดแยกหมวดหมู่แอพสตรีมมิ่ง 6 แพลตฟอร์ม (Bilibili, Disney+, iQIYI, Viu, WeTV, Youku)', 'ระบบตั้งเวลาหมดอายุของรหัส (Code Expiration Timer)', 'ระบบค้นหาและตรวจสอบหมายเลขบัญชีผู้ใช้', 'Responsive UI ออกแบบให้ใช้งานสะดวกทั้งบนมือถือและคอมพิวเตอร์'],
  'ลูกค้าที่ซื้อบัญชีร่วมต้องรอแอดมินส่ง OTP ทางแชท ซึ่งใช้เวลานานในชั่วโมงเร่งด่วนและเสี่ยงต่อการส่งสลับคน',
  'สร้างระบบ OTP Self-Service Portal ให้ลูกค้ารับรหัสยืนยันตัวตนได้เองอัตโนมัติตลอด 24 ชม. ลดเวลาตอบแชทของร้านลงกว่า 80%',
  'https://namenoname.store',
  '',
  true,
  true
),
(
  'RS232 Industrial Barcode & Scale Weight System (ShoesBox)',
  'rs232-barcode-scale-system',
  'ระบบอ่านค่าน้ำหนักเครื่องชั่งผ่านพอร์ต Serial RS232 และยิงสแกนบาร์โค้ดงานออกสำหรับโรงงานอุตสาหกรรม พร้อม WebSocket Real-time Streaming',
  'โซลูชันระบบอุตสาหกรรมพัฒนาด้วย FastAPI และ Python เชื่อมต่อฮาร์ดแวร์เครื่องชั่งน้ำหนักผ่านพอร์ต Serial RS232 อ่านค่าและสตรีมขึ้นหน้าเว็บแบบ Real-time ด้วย WebSockets พร้อมระบบยิงบาร์โค้ดตรวจสอบแผนงานกับฐานข้อมูล SQL Server (ShoesBox) มีระบบเสียงแจ้งเตือน Toast แจ้งสถานะ รันบนสภาพแวดล้อม Docker และ Nginx Gateway',
  '/projects/rs232/terminal.png',
  ARRAY['FastAPI', 'Python', 'SQL Server (ShoesBox)', 'PySerial (RS232)', 'WebSockets', 'Docker', 'Nginx'],
  ARRAY['เชื่อมต่อเครื่องชั่งผ่าน Serial COM Ports (RS232) พร้อมระบบตรวจจับพอร์ตอัตโนมัติ', 'WebSocket Streaming ส่งค่าน้ำหนัก Gross/Net แบบสดๆ ไปยังหน้าจอควบคุม', 'สแกนบาร์โค้ดจับคู่กับฐานข้อมูล SQL Server (ShoesBox) ทันที', 'ระบบแจ้งเตือนด้วยเสียง (Audio Beep) และข้อความ Toast เมื่อตรวจพบข้อผิดพลาด', 'จัดเตรียมสภาพแวดล้อมด้วย Dockerfile, Docker Compose และ Nginx Reverse Proxy', 'รองรับการส่งออกข้อมูลและสรุปรายงาน Excel'],
  'การชั่งน้ำหนักและตรวจนับสินค้าในไลน์การผลิตต้องใช้พนักงานจดบันทึกลงกระดาษ เสี่ยงผิดพลาด ช้า และไม่เชื่อมโยงกับฐานข้อมูลโรงงาน',
  'พัฒนาระบบอัตโนมัติอ่านค่าจากเครื่องชั่งผ่าน RS232 และดึงข้อมูล Order จาก SQL Server โดยตรง แสดงผล Real-time บนเบราว์เซอร์ พร้อมบันทึกค่าน้ำหนักลงระบบอัตโนมัติ 100%',
  'https://namenoname.store',
  '',
  true,
  true
),
(
  'Payroll Management System - ระบบจัดการเงินเดือนและสแกนลายนิ้วมือ',
  'payroll-management-system',
  'ระบบจัดการเงินเดือนพนักงาน บริษัท นิว ไอเดีย สเตเบิล จำกัด รองรับการนำเข้าข้อมูลเครื่องสแกนลายนิ้วมือ (CSV Import), คำนวณ OT, ขาด ลา มาสาย และอนุมัติจ่าย',
  'ระบบสารสนเทศจัดการเงินเดือนและเวลาปฏิบัติงานของพนักงาน ออกแบบและพัฒนาเพื่อ บริษัท นิว ไอเดีย สเตเบิล จำกัด (New Idea Stable Co., Ltd.) รองรับการนำเข้าไฟล์ CSV จากเครื่องสแกนลายนิ้วมือ (ZKTeco / Suprema) พร้อมระบบลงเวลาแบบ Manual สำรอง คำนวณ OT, หักสาย, หักขาดงานตามสูตรบริษัท พร้อมระบบ Workflow อนุมัติเงินเดือน และส่งออกรายงาน Excel ได้ทันที',
  '/projects/payroll/dashboard.jpg',
  ARRAY['PHP', 'MySQL', 'CSV Fingerprint Import', 'ZKTeco / Suprema', 'Tailwind CSS', 'Excel Export'],
  ARRAY['นำเข้าข้อมูลเวลาทำงานจากเครื่องสแกนลายนิ้วมือผ่านไฟล์ CSV อัตโนมัติ', 'ระบบลงเวลาด้วยมือ (Manual Punch-in/out) สำรองกรณีเครื่องสแกนขัดข้อง', 'คำนวณเงินเดือนสุทธิ, ค่าล่วงเวลา OT (1.5 เท่า), หักสายรายนาที และหักขาดงานอัตโนมัติ', 'ระบบบริหารจัดการข้อมูลพนักงาน ฝ่าย แผนก และรหัสสแกนนิ้ว (Fingerprint ID)', 'ขั้นตอนการอนุมัติเงินเดือน (Workflow: Draft -> Approved)', 'ส่งออกรายงานสรุปเงินเดือนเป็นไฟล์ Excel / CSV พร้อมพิมพ์สลิปเงินเดือน'],
  'ฝ่ายบุคคลต้องคำนวณเวลาทำงานและค่าล่วงเวลาของพนักงานด้วยมือจากไฟล์เครื่องสแกนลายนิ้วมือ ใช้เวลาหลายวันและเสี่ยงคำนวณพลาด',
  'ออกแบบระบบเชื่อมโยง Fingerprint ID เข้ากับฐานข้อมูล MySQL พร้อมสูตรคำนวณเงินเดือนอัตโนมัติ ลดเวลาประมวลผลของฝ่ายบุคคลจากหลายวันเหลือเพียงไม่กี่นาที',
  'https://namenoname.store',
  '',
  true,
  true
),
(
  'Botnoi AI Stress Logger - ระบบบันทึกผลประเมินความเครียดอัตโนมัติ',
  'botnoi-stress-logger',
  'ระบบเชื่อมต่อ Botnoi AI Chatbot ผ่าน Webhook บันทึกผลประเมินความเครียดและสุขภาพจิตลง Google Sheets Database อัตโนมัติแบบ Serverless',
  'ระบบ Automation Pipeline พัฒนาด้วย Google Apps Script ทำหน้าที่เป็น Serverless Webhook Endpoint รับข้อมูลผลประเมินความเครียดจากแชทบอท Botnoi AI คำนวณคะแนน บันทึก Timestamp ชื่อผู้ใช้ คะแนนความเครียด และผลการวินิจฉัยลงใน Google Sheets แบบอัตโนมัติและส่ง JSON Response กลับไปยังผู้ใช้อย่างแม่นยำ',
  '/projects/botnoi/dashboard.jpg',
  ARRAY['Google Apps Script', 'Botnoi AI NLP', 'JavaScript', 'Google Sheets API', 'Webhooks'],
  ARRAY['เชื่อมต่อกับ Botnoi Chatbot AI NLP ผ่าน Webhook GET/POST Parameters', 'สถาปัตยกรรม Serverless ด้วย Google Apps Script ทำงาน 24/7 โดยไม่มีค่าใช้จ่ายเซิร์ฟเวอร์', 'บันทึกข้อมูลผลประเมินลง Google Sheets Database แบบ Real-time พร้อมคอลัมน์มาตรฐาน', 'ส่ง JSON Response ตอบกลับผลการบันทึกข้อมูลอย่างเป็นระบบ', 'โครงสร้างข้อมูลรองรับการต่อยอดทำ Dashboard วิเคราะห์สถิติสุขภาพจิต'],
  'การประเมินความเครียดผ่านแชทบอทเดิมไม่มีระบบจัดเก็บผลลัพธ์ที่เป็นระเบียบ ทำให้ข้อมูลกระจัดกระจายและไม่สามารถนำมาวิเคราะห์ต่อได้',
  'สร้างระบบ Web App API บน Google Apps Script รับข้อมูลจาก Botnoi แล้วจัดเก็บลง Google Sheets อัตโนมัติทันที ทำให้ผู้ดูแลระบบติดตามสุขภาพจิตผู้รับการประเมินได้แบบเรียลไทม์',
  'https://namenoname.store',
  '',
  false,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  description = EXCLUDED.description,
  thumbnail_url = EXCLUDED.thumbnail_url,
  technologies = EXCLUDED.technologies,
  features = EXCLUDED.features,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  demo_url = EXCLUDED.demo_url,
  source_code_url = EXCLUDED.source_code_url,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published;

INSERT INTO public.products (
  title, slug, description, price, thumbnail_url, gallery_urls, technologies, included_items, requirements, license_terms, demo_url, product_type, is_published
) VALUES
(
  'BA STORE - Premium App Retail Storefront & Realtime Sync Engine',
  'ba-store-retail-kit',
  'ระบบร้านค้าออนไลน์แสดงเรทราคาแอพพรีเมียม สไตล์ชมพูพาสเทล พร้อม Admin PIN Dashboard, Realtime Pricing ด้วย Supabase และระบบเชื่อมต่อคำสั่งซื้อ LINE Chat',
  2490.00,
  '/projects/ba-store/banner.jpg',
  ARRAY['/projects/ba-store/banner.jpg', '/projects/ba-store/logo.jpg'],
  ARRAY['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase Realtime', 'Vite'],
  ARRAY['Full Frontend & Admin Source Code', 'Supabase Schema SQL Script สำหรับตั้งค่าฐานข้อมูล', 'ระบบ Realtime Pricing Engine ซิงค์ราคาทันที', 'ชุดไอคอนโลโก้แอพของแท้ความละเอียดสูง', 'คู่มือติดตั้งและ Deploy บน Vercel'],
  ARRAY['Node.js 18+', 'บัญชี Supabase ฟรี'],
  'Standard Single Project License: ใช้งานสำหรับธุรกิจส่วนตัวหรือส่งมอบลูกค้า 1 โปรเจกต์',
  'https://namenoname.store',
  'ecommerce',
  true
),
(
  'BA-STORE OTP - Verification & Account Distribution Portal',
  'ba-store-otp-kit',
  'ชุดระบบกระจายสิทธิ์และส่งรหัสยืนยันตัวตน OTP สำหรับผู้ใช้งานแอพสตรีมมิ่ง 6 แพลตฟอร์ม พร้อมระบบนับเวลาหมดอายุและการตรวจสอบความปลอดภัย',
  1990.00,
  '/projects/otp/banner.jpg',
  ARRAY['/projects/otp/banner.jpg'],
  ARRAY['React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase Auth', 'Vite'],
  ARRAY['Full Source Code ของระบบ OTP Portal', 'ระบบตัวนับเวลา OTP Expiration Timer', 'ไอคอนและโลโก้สตรีมมิ่งครบชุด', 'คู่มือการติดตั้งและผูกระบบเข้ากับ Supabase'],
  ARRAY['Node.js 18+', 'Supabase Project'],
  'Commercial License: นำไปปรับแต่งและใช้งานในธุรกิจสตรีมมิ่งของท่านได้',
  'https://namenoname.store',
  'source_code',
  true
),
(
  'RS232 Industrial Barcode & Scale Weight Integration Kit',
  'rs232-scale-integration-kit',
  'ชุดระบบเชื่อมต่อพอร์ต Serial RS232 อ่านค่าน้ำหนักเครื่องชั่ง สตรีมผ่าน WebSocket Real-time และตรวจเช็คบาร์โค้ดสินค้าใน SQL Server พร้อม Docker & Nginx',
  3990.00,
  '/projects/rs232/terminal.png',
  ARRAY['/projects/rs232/terminal.png', '/projects/rs232/factory_report.png'],
  ARRAY['FastAPI', 'Python', 'SQL Server', 'PySerial', 'WebSockets', 'Docker', 'Nginx'],
  ARRAY['FastAPI Backend & WebSocket Streaming Server', 'สคริปต์เชื่อมต่อ RS232 Serial COM Ports', 'ตัวเชื่อมต่อฐานข้อมูล SQL Server (ShoesBox)', 'Frontend HTML5/JS Dashboard พร้อมระบบเสียงแจ้งเตือน', 'Docker Compose & Nginx Configuration พร้อมใช้งาน'],
  ARRAY['Python 3.10+ หรือ Docker', 'พอร์ต Serial / USB-to-RS232'],
  'Commercial License: ใช้งานได้ในโรงงานอุตสาหกรรมหรือโปรเจกต์เชิงพาณิชย์',
  'https://namenoname.store',
  'source_code',
  true
),
(
  'Payroll Management System - Biometric Attendance & Payroll Kit',
  'payroll-management-system-kit',
  'ชุดระบบจัดการเงินเดือนพนักงานภาษา PHP + MySQL รองรับการนำเข้าไฟล์ CSV จากเครื่องสแกนลายนิ้วมือ (ZKTeco/Suprema), คำนวณ OT และส่งออกรายงาน Excel',
  2990.00,
  '/projects/payroll/dashboard.jpg',
  ARRAY['/projects/payroll/dashboard.jpg'],
  ARRAY['PHP', 'MySQL', 'CSV Fingerprint Import', 'Tailwind CSS', 'Excel Export'],
  ARRAY['Full PHP Source Code พร้อมสถาปัตยกรรมแยกโมดูล', 'SQL Script สร้างตารางฐานข้อมูล payroll_db', 'สคริปต์ประมวลผลไฟล์ CSV จากเครื่องสแกนนิ้ว', 'สูตรคำนวณเงินเดือนสุทธิ OT และหักสาย/ขาดงานอัตโนมัติ', 'ระบบส่งออกรายงาน Excel และคู่มือการติดตั้ง'],
  ARRAY['PHP 7.4 - 8.2 (XAMPP / Apache / Nginx)', 'MySQL / MariaDB'],
  'Commercial License: นำไปติดตั้งใช้งานให้บริษัทหรือลูกค้าได้ทันที',
  'https://namenoname.store',
  'source_code',
  true
),
(
  'Botnoi AI Stress Logger & Google Sheets Automation Pipeline',
  'botnoi-stress-logger-kit',
  'ชุดสคริปต์เชื่อมต่อ Botnoi AI Chatbot รับค่า Webhook และบันทึกผลการประเมินลง Google Sheets อัตโนมัติด้วย Google Apps Script แบบ Serverless 100%',
  990.00,
  '/projects/botnoi/dashboard.jpg',
  ARRAY['/projects/botnoi/dashboard.jpg'],
  ARRAY['Google Apps Script', 'Botnoi AI NLP', 'JavaScript', 'Google Sheets API'],
  ARRAY['สคริปต์ Google Apps Script (Code.gs) พร้อมใช้งาน', 'เทมเพลต Google Sheets พร้อมตารางโครงสร้างข้อมูล', 'คู่มือขั้นตอนการผูก Webhook เข้ากับ Botnoi AI', 'ตัวอย่าง Prompt และ Persona สำหรับบอทประเมินสุขภาพจิต'],
  ARRAY['บัญชี Google (Google Sheets & Apps Script ฟรี)', 'บัญชี Botnoi AI'],
  'Standard License: ใช้งานได้ไม่จำกัดจำนวนสเปรดชีต',
  'https://namenoname.store',
  'source_code',
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  thumbnail_url = EXCLUDED.thumbnail_url,
  gallery_urls = EXCLUDED.gallery_urls,
  technologies = EXCLUDED.technologies,
  included_items = EXCLUDED.included_items,
  requirements = EXCLUDED.requirements,
  license_terms = EXCLUDED.license_terms,
  demo_url = EXCLUDED.demo_url,
  product_type = EXCLUDED.product_type,
  is_published = EXCLUDED.is_published;

INSERT INTO public.site_settings (key, value) VALUES
(
  'general',
  '{
    "site_name": "Thitiwut | Developer Portfolio & Website Marketplace",
    "developer_name": "Thitiwut (Senior Full-Stack Developer)",
    "tagline": "Senior Full-Stack Developer & Modern Web Architect",
    "bio": "ผู้เชี่ยวชาญการสร้างสรรค์เว็บไซต์ระดับพรีเมียม สถาปัตยกรรมระบบ React, FastAPI, PHP, Supabase และฐานข้อมูลที่ปลอดภัย โหลดเร็ว และตอบโจทย์ธุรกิจจริง",
    "email": "thitiwut.dev@namenoname.store",
    "phone": "098-XXX-XXXX",
    "line_id": "@thitiwut.dev",
    "github_url": "",
    "domain": "namenoname.store",
    "bank_name": "ธนาคารกสิกรไทย (Kasikorn Bank)",
    "bank_account_number": "xxx-x-x6751-x",
    "bank_account_name": "นาย ฐิติวุฒิ พุกภิญโญ",
    "promptpay_number": "004999140755892"
  }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = timezone('utc'::text, now());

