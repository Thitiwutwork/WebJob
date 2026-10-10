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

INSERT INTO public.projects (title, slug, summary, description, thumbnail_url, technologies, features, problem, solution, demo_url, source_code_url, is_featured) VALUES
(
  'Nexus POS & Inventory Management System',
  'nexus-pos-inventory',
  'ระบบขายหน้าร้าน (Point of Sale) และจัดการคลังสินค้าแบบ Real-time พร้อมออกใบเสร็จและรายงานยอดขายสำหรับร้านค้าปลีก',
  'ระบบ Nexus POS ถูกสร้างขึ้นเพื่อตอบสนองร้านค้ายุคใหม่ที่ต้องการความรวดเร็วในการคิดเงิน สแกนบาร์โค้ด และดูรายงานยอดขายแบบทันท่วงทีผ่าน Cloud ไม่ต้องติดตั้งเซิร์ฟเวอร์ในร้าน',
  'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
  ARRAY['ระบบคิดเงินสแกนบาร์โค้ดความเร็วสูง', 'ตัดสต็อกสินค้าอัตโนมัติแบบ Real-time', 'พิมพ์ใบเสร็จผ่าน Slip Printer & PDF', 'รายงานยอดขายรายวัน/เดือน/ปี'],
  'ร้านค้าเดิมใช้ระบบออฟไลน์ ทำให้ข้อมูลสต็อกไม่ตรงกันระหว่างสาขา และไม่สามารถดูยอดขายจากนอกร้านได้',
  'สถาปัตยกรรม Cloud-native บน Supabase พร้อม Realtime sync ทำให้ข้อมูลซิงค์กันทุกเครื่องทันที และเปิดดูผ่านมือถือได้จากทุกที่',
  'https://namenoname.store/demo/pos',
  'https://github.com/Thitiwutwork/WebJob',
  true
),
(
  'Aura Logistics Tracking Platform',
  'aura-logistics-tracking',
  'แพลตฟอร์มติดตามพัสดุและบริหารงานขนส่งสำหรับธุรกิจขนส่งเอกชน พร้อมระบบ GPS Tracking และแจ้งเตือนสถานะลูกค้า',
  'ระบบบริหารจัดการเส้นทางการจัดส่งพัสดุ ช่วยให้คนขับรถอัปเดตสถานะการส่งพร้อมถ่ายรูปหลักฐาน และลูกค้าสามารถเช็กสถานะพัสดุได้ด้วยเลขออเดอร์แบบเรียลไทม์',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase Storage', 'PostgreSQL'],
  ARRAY['ค้นหาสถานะพัสดุ Realtime', 'อัปโหลดรูปภาพหลักฐานการจัดส่ง', 'Driver Mobile Web Portal', 'แดชบอร์ดสรุปงานขนส่งประจำวัน'],
  'ลูกค้าโทรสอบถามสถานะบ่อยครั้ง และเกิดปัญหาหลักฐานการส่งของสูญหาย',
  'สร้างพอร์ทัลตรวจเช็กออนไลน์และระบบอัปโหลดรูปหลักฐานขึ้น Supabase Storage พร้อมลายเซ็นดิจิทัล',
  'https://namenoname.store/demo/logistics',
  NULL,
  true
),
(
  'Craft Coffee & Bakery Online Ordering',
  'craft-coffee-bakery',
  'เว็บไซต์ร้านกาแฟและเบเกอรี่สไตล์มินิมอล รองรับการสั่งซื้อล่วงหน้า จองโต๊ะ และระบบสะสมแต้มสมาชิก',
  'เว็บแอปพลิเคชันสำหรับคาเฟ่ที่ต้องการเพิ่มยอดขายผ่านช่องทางออนไลน์ ลูกค้าสามารถเลือกปรับแต่งเมนู (หวานน้อย, นมโอ๊ต) และชำระเงินผ่าน QR Code ได้อย่างง่ายดาย',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase Auth', 'PromptPay QR'],
  ARRAY['ระบบปรับแต่งส่วนผสมเครื่องดื่ม', 'ชำระเงินอัตโนมัติ PromptPay QR', 'ระบบจองโต๊ะและเวลาล่วงหน้า', 'สะสมแต้มผ่านเบอร์โทรศัพท์'],
  'คิวหน้าร้านยาวในช่วงเวลาเร่งด่วน พนักงานรับออร์เดอร์ผิดพลาดบ่อยครั้ง',
  'ระบบสั่งล่วงหน้าแบบ Self-service ส่งเข้าหน้าจอห้องครัวทันที ลดเวลารอคอยลง 60%',
  'https://namenoname.store/demo/craft-coffee',
  'https://github.com/Thitiwutwork/WebJob',
  true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (title, slug, description, price, thumbnail_url, technologies, included_items, requirements, license_terms, demo_url, product_type) VALUES
(
  'DevStudio - Ultimate Developer Portfolio & Agency Template',
  'devstudio-portfolio-template',
  'เทมเพลตเว็บไซต์ Portfolio & Agency ระดับพรีเมียม พัฒนาด้วย React 19, TypeScript และ Tailwind CSS มาพร้อมธีม Dark Mode, ระบบแสดงผลงาน, หน้าบล็อก และฟอร์มติดต่อที่ใช้งานได้จริง',
  1490.00,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  ARRAY['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
  ARRAY['Full Source Code (TypeScript)', 'Figma Design Tokens', 'คู่มือการติดตั้งและการ Deploy บน Vercel', 'Free Updates 6 เดือน'],
  ARRAY['Node.js 18+ หรือสูงกว่า', 'ความรู้พื้นฐาน React/TypeScript เบื้องต้น'],
  'Standard Single Project License (อนุญาตให้ใช้กับ 1 เว็บไซต์เพื่อการค้า)',
  'https://namenoname.store/preview/devstudio',
  'template'
),
(
  'PulseAdmin - Modern SaaS Dashboard & Analytics Kit',
  'pulseadmin-saas-dashboard',
  'ชุดเทมเพลตหน้าแดชบอร์ดระดับองค์กร รวมคอมโพเนนต์กว่า 50+ รายการ กราฟสรุปผล ตารางข้อมูลพร้อม Filter/Sort ระบบจัดการสมาชิก และโครงสร้างรองรับ Supabase Auth',
  2490.00,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase RLS', 'Recharts'],
  ARRAY['Dashboard UI Kit 50+ Components', 'ระบบจัดการข้อมูล CRUD พร้อมตัวอย่าง', 'โครงสร้างเชื่อมต่อ Supabase Database', 'คู่มือการตั้งค่าความปลอดภัย RLS'],
  ARRAY['Node.js 18+', 'บัญชี Supabase ฟรี'],
  'Commercial License (นำไปใช้พัฒนาเป็นผลิตภัณฑ์ของตนเองหรือให้ลูกค้าได้)',
  'https://namenoname.store/preview/pulseadmin',
  'dashboard'
),
(
  'SwiftShop - Headless E-commerce & Digital Storefront',
  'swiftshop-digital-storefront',
  'ระบบร้านค้าสำเร็จรูปสำหรับขายสินค้าดิจิทัลและคอร์สเรียน พร้อมระบบตะกร้าสินค้า ระบบตรวจสอบสลิปโอนเงิน และระบบส่งมอบไฟล์อัตโนมัติผ่าน Secure Storage',
  3990.00,
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
  ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Supabase Storage', 'PostgreSQL'],
  ARRAY['Frontend Storefront ครบวงจร', 'Admin Dashboard จัดการออเดอร์และสลิป', 'SQL Schema & Supabase RLS Policies', 'ระบบสร้าง Signed Download URL ที่ปลอดภัย'],
  ARRAY['Node.js 18+', 'Supabase Account'],
  'Extended Developer License (ใช้งานได้ไม่จำกัดโปรเจกต์)',
  'https://namenoname.store/preview/swiftshop',
  'ecommerce'
)
ON CONFLICT (slug) DO NOTHING;
