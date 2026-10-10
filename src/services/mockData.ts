import { Project, ServiceItem, Product, Category, SiteSettings } from '../types/database';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Business Website', slug: 'business-website', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-2', name: 'E-commerce & Store', slug: 'ecommerce', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-3', name: 'Admin Dashboard & POS', slug: 'dashboard-pos', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-4', name: 'Web Application', slug: 'web-app', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-5', name: 'Website Templates', slug: 'templates', type: 'product', created_at: new Date().toISOString() },
  { id: 'cat-6', name: 'Source Code Packages', slug: 'source-code', type: 'product', created_at: new Date().toISOString() },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Nexus POS & Inventory Management System',
    slug: 'nexus-pos-inventory',
    summary: 'ระบบขายหน้าร้าน (Point of Sale) และจัดการคลังสินค้าแบบ Real-time พร้อมออกใบเสร็จและรายงานยอดขายสำหรับร้านค้าปลีก',
    description: 'ระบบ Nexus POS ถูกสร้างขึ้นเพื่อตอบสนองร้านค้ายุคใหม่ที่ต้องการความรวดเร็วในการคิดเงิน สแกนบาร์โค้ด และดูรายงานยอดขายแบบทันท่วงทีผ่าน Cloud ไม่ต้องติดตั้งเซิร์ฟเวอร์ในร้าน รองรับการทำงานทั้งบน iPad, Tablet และ PC รองรับการตัดสต็อกอัตโนมัติเมื่อมีการขาย และแจ้งเตือนเมื่อสินค้าใกล้หมด',
    category_id: 'cat-3',
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    features: [
      'ระบบคิดเงินสแกนบาร์โค้ดความเร็วสูง',
      'ตัดสต็อกสินค้าอัตโนมัติแบบ Real-time',
      'พิมพ์ใบเสร็จผ่าน Slip Printer และ PDF',
      'รายงานยอดขายรายวัน/เดือน/ปี พร้อมกราฟวิเคราะห์',
      'ระบบสิทธิ์ผู้ใช้งาน (ผู้จัดการ / พนักงานแคชเชียร์)'
    ],
    problem: 'ร้านค้าเดิมใช้ระบบออฟไลน์ ทำให้ข้อมูลสต็อกไม่ตรงกันระหว่างสาขา และเจ้าของร้านไม่สามารถดูยอดขายจากนอกร้านได้แบบ Real-time',
    solution: 'ออกแบบสถาปัตยกรรม Cloud-native บน Supabase พร้อม Realtime sync ทำให้ข้อมูลซิงค์กันทุกเครื่องทันที และเปิดดูผ่านมือถือได้จากทุกที่อย่างปลอดภัย',
    demo_url: 'https://namenoname.store/demo/pos',
    source_code_url: 'https://github.com/Thitiwutwork/WebJob',
    is_featured: true,
    is_published: true,
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-01-15T10:00:00Z',
  },
  {
    id: 'proj-2',
    title: 'Aura Logistics Tracking Platform',
    slug: 'aura-logistics-tracking',
    summary: 'แพลตฟอร์มติดตามพัสดุและบริหารงานขนส่งสำหรับธุรกิจขนส่งเอกชน พร้อมระบบ GPS Tracking และแจ้งเตือนสถานะลูกค้า',
    description: 'ระบบบริหารจัดการเส้นทางการจัดส่งพัสดุ ช่วยให้คนขับรถอัปเดตสถานะการส่งพร้อมถ่ายรูปหลักฐาน และลูกค้าสามารถเช็กสถานะพัสดุได้ด้วยเลขออเดอร์แบบเรียลไทม์ผ่านเว็บโดยไม่ต้องโหลดแอป',
    category_id: 'cat-4',
    thumbnail_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase Storage', 'PostgreSQL'],
    features: [
      'ค้นหาสถานะพัสดุ Realtime ด้วยหมายเลขติดตาม',
      'อัปโหลดรูปภาพหลักฐานการจัดส่งขึ้น Secure Storage',
      'Driver Mobile Web Portal ใช้งานง่ายบนมือถือคนขับ',
      'แดชบอร์ดสรุปงานขนส่งประจำวันและอัตราความสำเร็จ'
    ],
    problem: 'ลูกค้าโทรสอบถามสถานะบ่อยครั้ง และมักเกิดปัญหาหลักฐานการส่งของสูญหายเมื่อลูกค้าแจ้งว่าไม่ได้รับพัสดุ',
    solution: 'สร้างพอร์ทัลตรวจเช็กออนไลน์และระบบอัปโหลดรูปหลักฐานขึ้น Supabase Storage พร้อมลายเซ็นดิจิทัล ทำให้ตรวจสอบย้อนหลังได้ 100%',
    demo_url: 'https://namenoname.store/demo/logistics',
    source_code_url: undefined,
    is_featured: true,
    is_published: true,
    created_at: '2026-02-10T08:30:00Z',
    updated_at: '2026-02-10T08:30:00Z',
  },
  {
    id: 'proj-3',
    title: 'Craft Coffee & Bakery Online Ordering',
    slug: 'craft-coffee-bakery',
    summary: 'เว็บไซต์ร้านกาแฟและเบเกอรี่สไตล์มินิมอล รองรับการสั่งซื้อล่วงหน้า จองโต๊ะ และระบบสะสมแต้มสมาชิก',
    description: 'เว็บแอปพลิเคชันสำหรับคาเฟ่ที่ต้องการเพิ่มยอดขายผ่านช่องทางออนไลน์ ลูกค้าสามารถเลือกปรับแต่งเมนู (ระดับความหวาน, ประเภทนม) และชำระเงินผ่าน QR Code ได้อย่างง่ายดาย',
    category_id: 'cat-2',
    thumbnail_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase Auth', 'PromptPay QR'],
    features: [
      'ระบบปรับแต่งส่วนผสมเครื่องดื่มตามความชอบ',
      'ชำระเงินอัตโนมัติด้วย PromptPay QR พร้อมแนบสลิป',
      'ระบบจองโต๊ะและเวลาล่วงหน้า',
      'สะสมแต้มและแลกรับส่วนลดผ่านเบอร์โทรศัพท์'
    ],
    problem: 'คิวหน้าร้านยาวในช่วงเวลาเร่งด่วน พนักงานรับออร์เดอร์ผิดพลาดบ่อยครั้ง และเสียโอกาสในการขาย',
    solution: 'ระบบสั่งล่วงหน้าแบบ Self-service ส่งเข้าหน้าจอห้องครัวทันที ลดเวลารอคอยลง 60% และเพิ่มยอดขายต่อบิลได้ 25%',
    demo_url: 'https://namenoname.store/demo/craft-coffee',
    source_code_url: 'https://github.com/Thitiwutwork/WebJob',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-01T14:15:00Z',
    updated_at: '2026-03-01T14:15:00Z',
  },
  {
    id: 'proj-4',
    title: 'Horizon Real Estate Property Showcase',
    slug: 'horizon-real-estate',
    summary: 'เว็บไซต์นำเสนอโครงการบ้านและคอนโดมิเนียมหรู พร้อมระบบกรองทำเล ราคา และฟอร์มนัดหมายชมโครงการ',
    description: 'แพลตฟอร์มพอร์ตโฟลิโออสังหาริมทรัพย์ระดับไฮเอนด์ โหลดภาพไวด้วย Next-gen image optimization แสดงแผนที่และสิ่งอำนวยความสะดวกรอบโครงการ',
    category_id: 'cat-1',
    thumbnail_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    features: [
      'ระบบตัวกรองอสังหาฯ ตามราคา ทำเล และประเภท',
      'ระบบ Virtual Tour Gallery ภาพคมชัดสูง',
      'แบบฟอร์มนัดหมายชมสถานที่ล่วงหน้าส่งเข้า Line Notify',
      'เครื่องคำนวณยอดผ่อนชำระต่อเดือน (Loan Calculator)'
    ],
    problem: 'ลูกค้าติดต่อสอบถามข้อมูลซ้ำซ้อน และขาดระบบคำนวณเงินกู้เบื้องต้น ทำให้เสียเวลาในการคัดกรองผู้ซื้อ',
    solution: 'พัฒนา UI ที่เรียบหรูพร้อมเครื่องมือคำนวณสินเชื่อในตัว ช่วยให้ยอดนัดหมายที่มีคุณภาพเพิ่มขึ้น 40%',
    demo_url: 'https://namenoname.store/demo/horizon',
    source_code_url: undefined,
    is_featured: false,
    is_published: true,
    created_at: '2026-03-20T11:00:00Z',
    updated_at: '2026-03-20T11:00:00Z',
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
    title: 'Custom Web Application & SaaS / Dashboard',
    slug: 'custom-web-app',
    description: 'พัฒนาระบบเว็บแอปพลิเคชันเฉพาะทางตามความต้องการของธุรกิจ เช่น ระบบ POS, ระบบจองคิว, ระบบจัดการงานภายในองค์กร หรือแพลตฟอร์ม SaaS',
    starting_price: 45000,
    features: [
      'ออกแบบ Database Schema & Architecture เฉพาะทาง',
      'Role-Based Access Control (Admin / Staff / Client)',
      'Realtime Data Sync (Supabase PostgreSQL)',
      'REST API & Supabase Edge Functions Backend',
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
    id: 'prod-1',
    title: 'DevStudio - Ultimate Developer Portfolio & Agency Template',
    slug: 'devstudio-portfolio-template',
    description: 'เทมเพลตเว็บไซต์ Portfolio & Agency ระดับพรีเมียม พัฒนาด้วย React 19, TypeScript และ Tailwind CSS มาพร้อมธีม Dark Mode สไตล์โมเดิร์น สวยหรู โค้ดสะอาด พร้อมโครงสร้างเชื่อมต่อ Supabase Database และ Vercel Deployment Guide',
    price: 1490,
    category_id: 'cat-5',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    included_items: [
      'Full Source Code (TypeScript + Clean Architecture)',
      'หน้า Home, Projects, Services, Marketplace, Contact และ Admin',
      'SQL Migrations สำหรับ Supabase Database (14 Tables)',
      'Figma Tokens & Design Guidelines',
      'คู่มือการติดตั้งและการ Deploy บน Vercel พร้อม Custom Domain'
    ],
    requirements: [
      'Node.js 18 หรือใหม่กว่า',
      'บัญชี Supabase (ฟรี) สำหรับจัดเก็บข้อมูล',
      'ความรู้พื้นฐาน React/TypeScript เล็กน้อย'
    ],
    license_terms: 'Standard Single Project License: อนุญาตให้นำไปใช้สร้างเว็บไซต์ของตนเองหรือส่งงานให้ลูกค้า 1 โปรเจกต์ (ไม่อนุญาตให้นำซอร์สโค้ดไปแจกจ่ายต่อ)',
    demo_url: 'https://namenoname.store',
    product_type: 'template',
    is_published: true,
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-02-01T00:00:00Z',
    avg_rating: 5.0,
    review_count: 3
  },
  {
    id: 'prod-2',
    title: 'PulseAdmin - Modern SaaS Dashboard & Analytics Kit',
    slug: 'pulseadmin-saas-dashboard',
    description: 'ชุดเทมเพลตหน้าแดชบอร์ดระดับองค์กร รวมคอมโพเนนต์กว่า 50+ รายการ กราฟสรุปผล ตารางข้อมูลพร้อม Filter/Sort ระบบจัดการสมาชิก และโครงสร้างรองรับ Supabase Auth & PostgreSQL RLS',
    price: 2490,
    category_id: 'cat-5',
    thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase RLS', 'Recharts'],
    included_items: [
      'Dashboard UI Kit พร้อม 50+ Components พร้อมใช้งาน',
      'ระบบจัดการข้อมูล CRUD ตัวอย่าง (Products, Users, Orders)',
      'ตาราง Data Table พร้อม Pagination, Sort และ Search',
      'โครงสร้างเชื่อมต่อ Supabase Database & Auth State',
      'Dark / Light Mode Toggle รองรับ 100%'
    ],
    requirements: [
      'Node.js 18+',
      'บัญชี Supabase (ฟรี)'
    ],
    license_terms: 'Commercial License: สามารถนำไปต่อยอดเป็นระบบแอปพลิเคชันหรือ SaaS สำหรับการค้าได้',
    demo_url: 'https://namenoname.store/preview/pulseadmin',
    product_type: 'dashboard',
    is_published: true,
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
    avg_rating: 4.8,
    review_count: 2
  },
  {
    id: 'prod-3',
    title: 'SwiftShop - Headless E-commerce & Digital Storefront',
    slug: 'swiftshop-digital-storefront',
    description: 'ระบบร้านค้าสำเร็จรูปสำหรับขายสินค้าดิจิทัลและคอร์สเรียน พร้อมระบบตะกร้าสินค้า ระบบตรวจสอบสลิปโอนเงิน และระบบส่งมอบไฟล์อัตโนมัติผ่าน Secure Supabase Storage',
    price: 3990,
    category_id: 'cat-6',
    thumbnail_url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase Storage', 'PostgreSQL'],
    included_items: [
      'Frontend Storefront ครบวงจร (Catalog, Detail, Cart, Checkout)',
      'Admin Dashboard จัดการออเดอร์ ตรวจสลิป และเปิดสิทธิ์ดาวน์โหลด',
      'SQL Schema & Supabase RLS Policies ป้องกันการแอบดาวน์โหลดไฟล์',
      'ระบบสร้าง Signed Download URL ที่มีอายุจำกัด',
      'คู่มือติดตั้งแบบ Step-by-Step'
    ],
    requirements: [
      'Node.js 18+',
      'Supabase Project with Storage Enabled'
    ],
    license_terms: 'Extended Developer License: นำไปพัฒนาโปรเจกต์ของตนเองหรือลูกค้ารายใดก็ได้ไม่จำกัดจำนวนครั้ง',
    demo_url: 'https://namenoname.store/preview/swiftshop',
    product_type: 'ecommerce',
    is_published: true,
    created_at: '2026-03-01T00:00:00Z',
    updated_at: '2026-03-01T00:00:00Z',
    avg_rating: 5.0,
    review_count: 4
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  site_name: 'Thitiwut | Developer Portfolio & Website Marketplace',
  developer_name: 'Thitiwut',
  tagline: 'Senior Full-Stack Developer & Modern Web Architect',
  bio: 'ผู้เชี่ยวชาญการสร้างสรรค์เว็บไซต์ระดับพรีเมียม สถาปัตยกรรมระบบที่ปลอดภัย และเทมเพลตซอฟต์แวร์คุณภาพสูง เพื่อขับเคลื่อนธุรกิจของคุณให้เติบโตอย่างมั่นคง',
  email: 'thitiwut.dev@namenoname.store',
  phone: '098-XXX-XXXX',
  line_id: '@thitiwut.dev',
  github_url: 'https://github.com/Thitiwutwork/WebJob',
  domain: 'namenoname.store',
  bank_name: 'ธนาคารกสิกรไทย (Kasikorn Bank)',
  bank_account_number: 'XXX-X-XXXXX-X',
  bank_account_name: 'นาย ธิติวัฒน์ (Thitiwut)',
  promptpay_number: '098-XXX-XXXX',
};
