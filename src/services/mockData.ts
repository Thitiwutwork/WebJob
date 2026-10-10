import { Project, ServiceItem, Product, Category, SiteSettings } from '../types/database';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Business Website', slug: 'business-website', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-2', name: 'E-commerce & Store', slug: 'ecommerce', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-3', name: 'Enterprise System & Inventory', slug: 'enterprise-inventory', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-4', name: 'Web Application & Security', slug: 'web-app-security', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-5', name: 'Website Templates', slug: 'templates', type: 'product', created_at: new Date().toISOString() },
  { id: 'cat-6', name: 'Source Code Packages', slug: 'source-code', type: 'product', created_at: new Date().toISOString() },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-stocklin',
    title: 'StocklinApp - Enterprise Stock & Inventory Management System',
    slug: 'stocklin-inventory-system',
    summary: 'ระบบบริหารจัดการคลังสินค้าและสต็อกแบบ Real-time สถาปัตยกรรม 3-Tier Layered ด้วย Fastify 5, TypeScript, Angular, PostgreSQL และ Nginx Gateway',
    description: 'ระบบ StocklinApp ถูกออกแบบและพัฒนาขึ้นเพื่อรองรับคลังสินค้าและสต็อกขนาดใหญ่ที่ต้องการความเร็วและความแม่นยำสูง สถาปัตยกรรมระดับองค์กรแบ่งเป็น Fastify 5 + TypeScript Backend ทำงานร่วมกับ PostgreSQL และ Knex ORM รันด้วย PM2 และเชื่อมต่อ Nginx Reverse Proxy Gateway พร้อมหน้าบ้าน Angular SPA รองรับ Barcode Scanner และ Swagger Interactive API Docs ครบวงจร',
    category_id: 'cat-3',
    thumbnail_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Angular', 'TypeScript', 'Fastify 5', 'PostgreSQL', 'Knex ORM', 'Nginx', 'Docker', 'PM2'],
    features: [
      'Fastify 5 High-performance REST API พร้อม Swagger Interactive UI Docs',
      'ระบบตัดสต็อกและจัดการใบมีด/สินค้าแบบ Real-time',
      '3-Tier Layered Architecture พร้อมระบบ PM2 Process Runner',
      'PostgreSQL Foreign Table & Connection Pooling Layer',
      'JWT Authentication & Security Key Protection',
      'Nginx Reverse Proxy พร้อมระบบ Rate Limiting และความปลอดภัย'
    ],
    problem: 'ระบบจัดการสต็อกเดิมประมวลผลช้า ไม่สามารถรองรับการเชื่อมต่อแบบ Real-time ระหว่างหน้าบ้านและฐานข้อมูล PostgreSQL ขนาดใหญ่ในโรงงานได้',
    solution: 'ยกเครื่องระบบด้วย Fastify 5 + TypeScript และ Angular พร้อมเชื่อมต่อ Reverse Proxy ด้วย Nginx และ Docker Compose ทำให้ระบบประมวลผลคำขอระดับพัน Transaction ต่อวินาทีได้อย่างเสถียรและแม่นยำ 100%',
    demo_url: 'https://namenoname.store',
    source_code_url: 'https://github.com/Thitiwutwork/WebJob',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-10T10:00:00Z',
    updated_at: '2026-03-10T10:00:00Z',
  },
  {
    id: 'proj-bashop',
    title: 'BA STORE - ระบบบอกเรทราคาขายปลีก & Admin Realtime Sync',
    slug: 'ba-store-retail-pricing',
    summary: 'เว็บแอปพลิเคชันแสดงเรทราคาขายปลีกแอพพรีเมียม สไตล์น่ารัก พร้อมระบบแอดมินจัดการหลังบ้านและซิงค์ราคา Realtime ด้วย Supabase',
    description: 'ระบบแสดงเรทราคาขายปลีกและแพ็กเกจแอพพรีเมียม (Netflix, YouTube, Disney+, Viu, Spotify ฯลฯ) ดีไซน์พาสเทลสวยงาม ใช้งานง่าย มีระบบ Admin Dashboard ล็อกอินด้วยรหัส PIN สามารถเพิ่ม ลบ แก้ไขราคาได้หลายระดับ (Multi-tier: เมลล์ร้าน, เมลล์ลูกค้า, รายวัน/เดือน) ระบบซิงค์ข้อมูลสดแบบ Realtime ด้วย Supabase postgres_changes และรองรับระบบเชื่อมต่อสั่งซื้อผ่าน LINE Chat ทันที',
    category_id: 'cat-2',
    thumbnail_url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase Realtime', 'Vite', 'PostgreSQL'],
    features: [
      'ระบบแสดงเรทราคา Multi-tier Pricing แบบไดนามิก (เมลล์ร้าน, เมลล์ลูกค้า, 7/30/90 วัน)',
      'Admin Dashboard จัดการสินค้าและปรับราคาได้สะดวกรวดเร็วด้วยรหัส PIN',
      'Supabase Realtime Sync อัปเดตราคาให้ลูกค้าทุกคนเห็นพร้อมกันสดๆ ทันที',
      'ระบบโปรโมชั่นแพ็กคู่ Hot Deals Combos',
      'ปุ่มสั่งซื้อเชื่อมต่อ LINE Chat ส่งบรีฟระบุชื่อแอพและราคาพร้อมคุยทันที',
      'ระบบสำรองและกู้คืนข้อมูล (Export / Import JSON)'
    ],
    problem: 'ร้านค้าอัปเดตราคาแอพพรีเมียมบ่อยครั้ง แต่ลูกค้าต้องคอยทักถามราคาทางแชท ทำให้เสียเวลาและแอดมินตอบไม่ทันยอดขายตก',
    solution: 'พัฒนา Storefront พร้อมระบบ Supabase Realtime เมื่อแอดมินเปลี่ยนราคาในหลังบ้าน หน้าจอลูกค้าทุกคนจะเปลี่ยนราคาตามทันทีแบบไม่ต้องกดรีเฟรชหน้าเว็บ',
    demo_url: 'https://namenoname.store',
    source_code_url: 'https://github.com/Thitiwutwork/WebJob',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-15T14:30:00Z',
    updated_at: '2026-03-15T14:30:00Z',
  },
  {
    id: 'proj-trustreview',
    title: 'TrustReview - ระบบรีวิวลูกค้าจริงที่ตรวจสอบสิทธิ์การซื้อระดับ Database',
    slug: 'trust-review-verification-system',
    summary: 'ระบบจัดการและตรวจสอบรีวิวลูกค้าตัวจริงด้วย Cryptographic Token & Stored Procedure ป้องกันการปั๊มรีวิวปลอม 100% (No Transaction = No Review)',
    description: 'แพลตฟอร์มรีวิวที่เน้นความโปร่งใสและความถูกต้องระดับสากล ป้องกันการปลอมแปลงรีวิวด้วย Database Stored Procedure (RPC) ของ PostgreSQL บน Supabase ผู้ที่จะเขียนรีวิวได้จะต้องมี Completed Order ในฐานข้อมูลเท่านั้น พร้อมระบบสร้าง QR Code Review Token ที่มีความปลอดภัยสูง และระบบ Admin Moderation สำหรับจัดการข้อร้องเรียน',
    category_id: 'cat-4',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React 19', 'TypeScript', 'Supabase RLS', 'PostgreSQL RPC', 'Zod', 'Tailwind CSS v4'],
    features: [
      'Database-driven RPC Verification (No Transaction = No Review)',
      'QR Code Cryptographic Token Review Generator',
      'ระบบ Admin Moderation ตรวจสอบ ตอบกลับ และซ่อนรีวิวที่ผิดกฎ',
      'ระบบ Audit Logs บันทึกประวัติกิจกรรมสำคัญที่แก้ไขไม่ได้',
      'Role-Based Access Control (Admin & Customer)',
      'การจัดเก็บไฟล์ภาพรีวิวใน Supabase Storage พร้อมตรวจสอบสิทธิ์'
    ],
    problem: 'เว็บไซต์รีวิวทั่วไปมักถูกโจมตีด้วยบอทหรือถูกปั๊มรีวิวปลอม เพราะการตรวจสอบมักทำแค่ฝั่งหน้าบ้าน (Frontend)',
    solution: 'ย้าย Logic การตรวจสอบสิทธิ์การซื้อทั้งหมดไปไว้ที่ PostgreSQL Stored Procedure ทำให้ไม่สามารถส่งค่าปลอมแปลงเข้ามาบันทึกได้เลยแม้แต่นิดเดียว',
    demo_url: 'https://namenoname.store',
    source_code_url: 'https://github.com/Thitiwutwork/WebJob',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-25T11:20:00Z',
    updated_at: '2026-03-25T11:20:00Z',
  },
  {
    id: 'proj-assetck',
    title: 'AssetCK - ระบบบริหารจัดการคลังและทะเบียนทรัพย์สินอุปกรณ์ไอที',
    slug: 'assetck-it-management',
    summary: 'ระบบทะเบียนทรัพย์สินและจัดการอุปกรณ์ไอทีระดับองค์กร รองรับการสแกนบาร์โค้ด บันทึกสถานะเบิกยืม ซ่อมบำรุง และออกรายงาน',
    description: 'ระบบ AssetCK พัฒนาด้วย Angular และ Tailwind CSS เพื่อใช้จัดการทรัพย์สินอุปกรณ์คอมพิวเตอร์และไอทีขององค์กร รองรับการจำแนกสถานะ 4 ระดับ (พร้อมใช้งาน, ถูกเบิกยืม, ส่งซ่อมบำรุง, จำหน่ายแล้ว) พร้อมระบบค้นหารวดเร็ว สแกนบาร์โค้ด และส่งออกรายงานทะเบียนทรัพย์สิน',
    category_id: 'cat-3',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Docker', 'Electron'],
    features: [
      'ระบบทะเบียนทรัพย์สิน IT พร้อมบันทึกประวัติการถือครองและผู้ครอบครอง',
      'ตัวกรองสถานะ 4 สีชัดเจน (พร้อมใช้, เบิกยืม, ส่งซ่อม, จำหน่าย)',
      'รองรับการสแกน Barcode / QR Code ประจำอุปกรณ์',
      'แดชบอร์ดสรุปมูลค่าทรัพย์สินและสถิติการใช้งานประจำเดือน',
      'ส่งออกข้อมูลทะเบียนทรัพย์สินเป็น Excel และ PDF'
    ],
    problem: 'การบันทึกทรัพย์สินไอทีผ่าน Excel ทำให้เกิดปัญหาข้อมูลสูญหาย ตรวจสอบประวัติผู้ถือครองย้อนหลังได้ยาก',
    solution: 'รวมศูนย์ข้อมูลบนเว็บแอปพลิเคชันที่ระบุรหัสทรัพย์สินและสถานะแบบละเอียด พนักงานและฝ่ายไอทีตรวจสอบได้ทันที',
    demo_url: 'https://namenoname.store',
    source_code_url: 'https://github.com/Thitiwutwork/WebJob',
    is_featured: false,
    is_published: true,
    created_at: '2026-04-01T09:00:00Z',
    updated_at: '2026-04-01T09:00:00Z',
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Landing Page & Single Page Website',
    slug: 'landing-page',
    description: 'ออกแบบและพัฒนาหน้าเซลเพจ / หน้าแนะนำสินค้าหรือบริการ ดีไซน์สวยงาม โหลดไว รองรับมือถือ 100% พร้อมเชื่อมต่อฟอร์มติดต่อและปุ่ม Call To Action เพื่อเพิ่มยอดขาย',
    starting_price: 6900,
    features: [
      'Responsive 100% (Mobile/Tablet/Desktop)',
      'Fast Loading Speed (Core Web Vitals A+)',
      'ฟอร์มติดต่อและเชื่อมต่อปุ่ม LINE Chat / Call',
      'Dark / Modern Custom Design System',
      'ติดตั้งและ Deploy บน Vercel ฟรี 1 ปี',
      'SSL Certificate & เชื่อมต่อ Custom Domain'
    ],
    excluded_features: [
      'ระบบชำระเงินออนไลน์และตะกร้าสินค้า',
      'ระบบสมาชิกและฐานข้อมูลหลังบ้าน'
    ],
    estimated_duration: '3 - 5 วัน',
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-2',
    title: 'Corporate & Business Website',
    slug: 'business-website',
    description: 'เว็บไซต์องค์กร ธุรกิจ และบริษัท พร้อมระบบจัดการเนื้อหา (CMS/Admin) นำเสนอภาพลักษณ์ที่น่าเชื่อถือ ทันสมัย และเป็นมืออาชีพ',
    starting_price: 18900,
    features: [
      '5-8 หน้าหลัก (Home, About, Services, Projects, Team, Contact)',
      'Admin Dashboard จัดการข้อมูลและบทความเองได้',
      'SEO Optimization โครงสร้างรองรับ Google Search',
      'SSL Certificate & Custom Domain Setup',
      'รองรับ 2 ภาษา (ไทย - อังกฤษ)',
      'รับประกันแก้ไขบั๊กฟรี 3 เดือน'
    ],
    excluded_features: [
      'ระบบขายสินค้าและสต็อกหลังบ้าน'
    ],
    estimated_duration: '7 - 14 วัน',
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-3',
    title: 'E-commerce & Custom Marketplace',
    slug: 'ecommerce-website',
    description: 'ระบบร้านค้าออนไลน์ครบวงจร รองรับตะกร้าสินค้า ระบบชำระเงิน สแกนสลิป PromptPay บัตรเครดิต และจัดการสต็อกหลังบ้าน',
    starting_price: 35000,
    features: [
      'ระบบ Catalog สินค้า & ค้นหาอัจฉริยะ',
      'ระบบตะกร้าและ Multi-step Checkout Flow',
      'แนบสลิปโอนเงิน / PromptPay QR / ตรวจสอบสลิป',
      'ระบบสมาชิก ลูกค้าตรวจสอบประวัติและใบเสร็จได้',
      'Admin Dashboard จัดการ Order, สต็อก และลูกค้า',
      'ระบบคูปองส่วนลดและโปรโมชั่น'
    ],
    excluded_features: [
      'ค่าธรรมเนียม Payment Gateway ฝั่งผู้ให้บริการ'
    ],
    estimated_duration: '14 - 25 วัน',
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-4',
    title: 'Custom Web Application & Enterprise ERP / POS',
    slug: 'custom-web-app',
    description: 'พัฒนาระบบเว็บแอปพลิเคชันเฉพาะทางตามความต้องการของธุรกิจ เช่น ระบบคลังสินค้า Stocklin, ระบบจัดการทรัพย์สิน AssetCK, ระบบจัดการเรทราคา BA Store, หรือ SaaS',
    starting_price: 45000,
    features: [
      'ออกแบบ Database Schema & Architecture เฉพาะทาง (PostgreSQL / Supabase)',
      'Role-Based Access Control (Admin / Staff / Client)',
      'Realtime Data Sync (Supabase / WebSockets)',
      'Fastify / REST API & Edge Functions Backend',
      'คู่มือการใช้งานและส่งมอบ Full Source Code',
      'รับประกันดูแลระบบหลังส่งมอบ 6 เดือน'
    ],
    excluded_features: [
      'ค่าบริการ Third-party API รายเดือน (ถ้ามี)'
    ],
    estimated_duration: '20 - 45 วัน',
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-stocklin-kit',
    title: 'StocklinApp - Enterprise Fastify & Angular Inventory System Kit',
    slug: 'stocklin-inventory-system-kit',
    description: 'ชุด Source Code ระบบจัดการคลังสินค้าและสต็อกใบมีดระดับองค์กร พัฒนาด้วย Fastify 5 + TypeScript + Angular + PostgreSQL พร้อม Docker Compose และ Nginx Reverse Proxy Gateway',
    price: 3990,
    category_id: 'cat-6',
    thumbnail_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['Fastify 5', 'Angular', 'TypeScript', 'PostgreSQL', 'Docker', 'Nginx', 'PM2'],
    included_items: [
      'Full Source Code (Fastify Backend + Angular Frontend)',
      'Nginx Gateway Configuration & Rate Limiter Rules',
      'Docker Compose Setup พร้อมใช้งาน',
      'Database Migration Scripts & Swagger API Documentation',
      'สิทธิ์ Commercial License สำหรับนำไปใช้และพัฒนาต่อ'
    ],
    requirements: [
      'Node.js 20+ หรือ Docker',
      'PostgreSQL Database'
    ],
    license_terms: 'Commercial License: ใช้งานได้ไม่จำกัดโปรเจกต์ นำไปพัฒนาต่อเป็นระบบของตนเองหรือให้ลูกค้าได้',
    demo_url: 'https://namenoname.store',
    product_type: 'source_code',
    is_published: true,
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
    avg_rating: 5.0,
    review_count: 5
  },
  {
    id: 'prod-bashop-kit',
    title: 'BA STORE - Premium App Retail Storefront & Realtime Sync Engine',
    slug: 'ba-store-retail-kit',
    description: 'ระบบร้านค้าออนไลน์แสดงเรทราคาแอพพรีเมียม สไตล์ชมพูพาสเทล พร้อม Admin PIN Dashboard, Realtime Pricing ด้วย Supabase และระบบเชื่อมต่อคำสั่งซื้อ LINE Chat',
    price: 2490,
    category_id: 'cat-5',
    thumbnail_url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase Realtime', 'Vite'],
    included_items: [
      'Full Frontend & Admin Source Code',
      'Supabase Schema SQL Script สำหรับตั้งค่าฐานข้อมูล',
      'ระบบ Realtime Pricing Engine ซิงค์ราคาทันที',
      'ชุดไอคอนโลโก้แอพของแท้ความละเอียดสูง',
      'คู่มือติดตั้งและ Deploy บน Vercel'
    ],
    requirements: [
      'Node.js 18+',
      'บัญชี Supabase ฟรี'
    ],
    license_terms: 'Standard Single Project License: ใช้งานสำหรับธุรกิจส่วนตัวหรือส่งมอบลูกค้า 1 โปรเจกต์',
    demo_url: 'https://namenoname.store',
    product_type: 'ecommerce',
    is_published: true,
    created_at: '2026-03-15T00:00:00Z',
    updated_at: '2026-03-15T00:00:00Z',
    avg_rating: 5.0,
    review_count: 4
  },
  {
    id: 'prod-trustreview-kit',
    title: 'TrustReview - Cryptographic Verified Customer Review Engine',
    slug: 'trust-review-engine',
    description: 'เอนจินระบบรีวิวลูกค้าจริง ตรวจสอบความถูกต้องระดับ Database RPC & Constraints ป้องกันบอทและการสร้างรีวิวปลอม 100% พร้อม QR Code Token Generator',
    price: 2990,
    category_id: 'cat-6',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React 19', 'TypeScript', 'Supabase RLS', 'PostgreSQL RPC', 'Zod'],
    included_items: [
      'Review Verification Core Engine & QR Token Generator',
      'PostgreSQL Stored Procedures & Security Triggers',
      'Admin Moderation & Audit Logs Dashboard',
      'คู่มือการผูกระบบเข้ากับ E-commerce หรือ Web App ใดๆ'
    ],
    requirements: [
      'Node.js 18+',
      'Supabase PostgreSQL'
    ],
    license_terms: 'Commercial License: นำไปต่อยอดในโปรเจกต์พาณิชย์ได้',
    demo_url: 'https://namenoname.store',
    product_type: 'source_code',
    is_published: true,
    created_at: '2026-03-25T00:00:00Z',
    updated_at: '2026-03-25T00:00:00Z',
    avg_rating: 4.9,
    review_count: 6
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  site_name: 'Thitiwut | Developer Portfolio & Website Marketplace',
  developer_name: 'Thitiwut (Senior Full-Stack Developer)',
  tagline: 'Senior Full-Stack Developer & Modern Web Architect',
  bio: 'ผู้เชี่ยวชาญการสร้างสรรค์เว็บไซต์ระดับพรีเมียม สถาปัตยกรรมระบบ Fastify, Angular, React, Supabase และ PostgreSQL ที่ปลอดภัย โหลดเร็ว และตอบโจทย์ธุรกิจจริง',
  email: 'thitiwut.dev@namenoname.store',
  phone: '098-XXX-XXXX',
  line_id: '@thitiwut.dev',
  github_url: 'https://github.com/Thitiwutwork/WebJob',
  domain: 'namenoname.store',
  bank_name: 'ธนาคารกสิกรไทย (Kasikorn Bank)',
  bank_account_number: '098-X-XXXXX-X',
  bank_account_name: 'นาย ธิติวัฒน์ (Thitiwut)',
  promptpay_number: '098-XXX-XXXX',
};
