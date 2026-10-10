import { Project, ServiceItem, Product, Category, SiteSettings } from '../types/database';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Business Website', slug: 'business-website', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-2', name: 'E-commerce & Store', slug: 'ecommerce', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-3', name: 'Enterprise & Industrial IoT', slug: 'enterprise-iot', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-4', name: 'Web Application & AI Automation', slug: 'web-app-ai', type: 'project', created_at: new Date().toISOString() },
  { id: 'cat-5', name: 'Website Templates', slug: 'templates', type: 'product', created_at: new Date().toISOString() },
  { id: 'cat-6', name: 'Source Code Packages', slug: 'source-code', type: 'product', created_at: new Date().toISOString() },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-bastore',
    title: 'BA STORE - ระบบบอกเรทราคาขายปลีก & Admin Realtime Sync',
    slug: 'ba-store-retail',
    summary: 'เว็บแอปพลิเคชันแสดงเรทราคาขายปลีกแอพพรีเมียม สไตล์น่ารัก พร้อมระบบแอดมินจัดการหลังบ้านและซิงค์ราคา Realtime ด้วย Supabase',
    description: 'ระบบแสดงเรทราคาขายปลีกและแพ็กเกจแอพพรีเมียม (Netflix, YouTube, Disney+, Viu, Spotify ฯลฯ) ดีไซน์พาสเทลสวยงาม ใช้งานง่าย มีระบบ Admin Dashboard ล็อกอินด้วยรหัส PIN สามารถเพิ่ม ลบ แก้ไขราคาได้หลายระดับ (Multi-tier: เมลล์ร้าน, เมลล์ลูกค้า, รายวัน/เดือน) ระบบซิงค์ข้อมูลสดแบบ Realtime ด้วย Supabase postgres_changes และรองรับระบบเชื่อมต่อสั่งซื้อผ่าน LINE Chat ทันที',
    category_id: 'cat-2',
    thumbnail_url: '/projects/ba-store/banner.jpg',
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
    source_code_url: '',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-28T14:30:00Z',
    updated_at: '2026-03-28T14:30:00Z',
  },
  {
    id: 'proj-otp',
    title: 'BA-STORE OTP - ระบบกระจายสิทธิ์และส่งรหัส OTP บัญชีสตรีมมิ่ง',
    slug: 'ba-store-otp-portal',
    summary: 'เว็บแอปพลิเคชันจัดการและกระจายรหัสยืนยันตัวตน OTP สำหรับผู้ใช้งานแอพสตรีมมิ่งชั้นนำ (Netflix, Disney+, Viu, WeTV, iQIYI, Bilibili)',
    description: 'พอร์ทัลบริการรับและแจกจ่ายรหัสยืนยัน OTP อัตโนมัติสำหรับสมาชิกร้าน BA STORE ที่ใช้บริการแอพสตรีมมิ่งระดับพรีเมียม ช่วยลดภาระของแอดมินในการส่งรหัสทางแชททีละคน โดยผู้ใช้งานสามารถเข้ามากดขอรับรหัสผ่านหน้าเว็บได้อย่างรวดเร็ว ปลอดภัย และมีการจำกัดเวลาหมดอายุของรหัสตามมาตรฐานความปลอดภัย',
    category_id: 'cat-4',
    thumbnail_url: '/projects/otp/banner.jpg',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase Auth', 'Vite', 'Lucide'],
    features: [
      'แจกจ่ายและตรวจสอบ OTP ปลอดภัยแบบ Real-time',
      'คัดแยกหมวดหมู่แอพสตรีมมิ่ง 6 แพลตฟอร์ม (Bilibili, Disney+, iQIYI, Viu, WeTV, Youku)',
      'ระบบตั้งเวลาหมดอายุของรหัส (Code Expiration Timer)',
      'ระบบค้นหาและตรวจสอบหมายเลขบัญชีผู้ใช้',
      'Responsive UI ออกแบบให้ใช้งานสะดวกทั้งบนมือถือและคอมพิวเตอร์'
    ],
    problem: 'ลูกค้าที่ซื้อบัญชีร่วมต้องรอแอดมินส่ง OTP ทางแชท ซึ่งใช้เวลานานในชั่วโมงเร่งด่วนและเสี่ยงต่อการส่งสลับคน',
    solution: 'สร้างระบบ OTP Self-Service Portal ให้ลูกค้ารับรหัสยืนยันตัวตนได้เองอัตโนมัติตลอด 24 ชม. ลดเวลาตอบแชทของร้านลงกว่า 80%',
    demo_url: 'https://namenoname.store',
    source_code_url: '',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-25T11:20:00Z',
    updated_at: '2026-03-25T11:20:00Z',
  },
  {
    id: 'proj-rs232',
    title: 'RS232 Industrial Barcode & Scale Weight System (ShoesBox)',
    slug: 'rs232-barcode-scale-system',
    summary: 'ระบบอ่านค่าน้ำหนักเครื่องชั่งผ่านพอร์ต Serial RS232 และยิงสแกนบาร์โค้ดงานออกสำหรับโรงงานอุตสาหกรรม พร้อม WebSocket Real-time Streaming',
    description: 'โซลูชันระบบอุตสาหกรรมพัฒนาด้วย FastAPI และ Python เชื่อมต่อฮาร์ดแวร์เครื่องชั่งน้ำหนักผ่านพอร์ต Serial RS232 อ่านค่าและสตรีมขึ้นหน้าเว็บแบบ Real-time ด้วย WebSockets พร้อมระบบยิงบาร์โค้ดตรวจสอบแผนงานกับฐานข้อมูล SQL Server (ShoesBox) มีระบบเสียงแจ้งเตือน Toast แจ้งสถานะ รันบนสภาพแวดล้อม Docker และ Nginx Gateway',
    category_id: 'cat-3',
    thumbnail_url: '/projects/rs232/terminal.png',
    technologies: ['FastAPI', 'Python', 'SQL Server (ShoesBox)', 'PySerial (RS232)', 'WebSockets', 'Docker', 'Nginx'],
    features: [
      'เชื่อมต่อเครื่องชั่งผ่าน Serial COM Ports (RS232) พร้อมระบบตรวจจับพอร์ตอัตโนมัติ',
      'WebSocket Streaming ส่งค่าน้ำหนัก Gross/Net แบบสดๆ ไปยังหน้าจอควบคุม',
      'สแกนบาร์โค้ดจับคู่กับฐานข้อมูล SQL Server (ShoesBox) ทันที',
      'ระบบแจ้งเตือนด้วยเสียง (Audio Beep) และข้อความ Toast เมื่อตรวจพบข้อผิดพลาด',
      'จัดเตรียมสภาพแวดล้อมด้วย Dockerfile, Docker Compose และ Nginx Reverse Proxy',
      'รองรับการส่งออกข้อมูลและสรุปรายงาน Excel'
    ],
    problem: 'การชั่งน้ำหนักและตรวจนับสินค้าในไลน์การผลิตต้องใช้พนักงานจดบันทึกลงกระดาษ เสี่ยงผิดพลาด ช้า และไม่เชื่อมโยงกับฐานข้อมูลโรงงาน',
    solution: 'พัฒนาระบบอัตโนมัติอ่านค่าจากเครื่องชั่งผ่าน RS232 และดึงข้อมูล Order จาก SQL Server โดยตรง แสดงผล Real-time บนเบราว์เซอร์ พร้อมบันทึกค่าน้ำหนักลงระบบอัตโนมัติ 100%',
    demo_url: 'https://namenoname.store',
    source_code_url: '',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-15T09:00:00Z',
    updated_at: '2026-03-15T09:00:00Z',
  },
  {
    id: 'proj-payroll',
    title: 'Payroll Management System - ระบบจัดการเงินเดือนและสแกนลายนิ้วมือ',
    slug: 'payroll-management-system',
    summary: 'ระบบจัดการเงินเดือนพนักงาน บริษัท นิว ไอเดีย สเตเบิล จำกัด รองรับการนำเข้าข้อมูลเครื่องสแกนลายนิ้วมือ (CSV Import), คำนวณ OT, ขาด ลา มาสาย และอนุมัติจ่าย',
    description: 'ระบบสารสนเทศจัดการเงินเดือนและเวลาปฏิบัติงานของพนักงาน ออกแบบและพัฒนาเพื่อ บริษัท นิว ไอเดีย สเตเบิล จำกัด (New Idea Stable Co., Ltd.) รองรับการนำเข้าไฟล์ CSV จากเครื่องสแกนลายนิ้วมือ (ZKTeco / Suprema) พร้อมระบบลงเวลาแบบ Manual สำรอง คำนวณ OT, หักสาย, หักขาดงานตามสูตรบริษัท พร้อมระบบ Workflow อนุมัติเงินเดือน และส่งออกรายงาน Excel ได้ทันที',
    category_id: 'cat-3',
    thumbnail_url: '/projects/payroll/dashboard.jpg',
    technologies: ['PHP', 'MySQL', 'CSV Fingerprint Import', 'ZKTeco / Suprema', 'Tailwind CSS', 'Excel Export'],
    features: [
      'นำเข้าข้อมูลเวลาทำงานจากเครื่องสแกนลายนิ้วมือผ่านไฟล์ CSV อัตโนมัติ',
      'ระบบลงเวลาด้วยมือ (Manual Punch-in/out) สำรองกรณีเครื่องสแกนขัดข้อง',
      'คำนวณเงินเดือนสุทธิ, ค่าล่วงเวลา OT (1.5 เท่า), หักสายรายนาที และหักขาดงานอัตโนมัติ',
      'ระบบบริหารจัดการข้อมูลพนักงาน ฝ่าย แผนก และรหัสสแกนนิ้ว (Fingerprint ID)',
      'ขั้นตอนการอนุมัติเงินเดือน (Workflow: Draft -> Approved)',
      'ส่งออกรายงานสรุปเงินเดือนเป็นไฟล์ Excel / CSV พร้อมพิมพ์สลิปเงินเดือน'
    ],
    problem: 'ฝ่ายบุคคลต้องคำนวณเวลาทำงานและค่าล่วงเวลาของพนักงานด้วยมือจากไฟล์เครื่องสแกนลายนิ้วมือ ใช้เวลาหลายวันและเสี่ยงคำนวณพลาด',
    solution: 'ออกแบบระบบเชื่อมโยง Fingerprint ID เข้ากับฐานข้อมูล MySQL พร้อมสูตรคำนวณเงินเดือนอัตโนมัติ ลดเวลาประมวลผลของฝ่ายบุคคลจากหลายวันเหลือเพียงไม่กี่นาที',
    demo_url: 'https://namenoname.store',
    source_code_url: '',
    is_featured: true,
    is_published: true,
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
  },
  {
    id: 'proj-botnoi',
    title: 'Botnoi AI Stress Logger - ระบบบันทึกผลประเมินความเครียดอัตโนมัติ',
    slug: 'botnoi-stress-logger',
    summary: 'ระบบเชื่อมต่อ Botnoi AI Chatbot ผ่าน Webhook บันทึกผลประเมินความเครียดและสุขภาพจิตลง Google Sheets Database อัตโนมัติแบบ Serverless',
    description: 'ระบบ Automation Pipeline พัฒนาด้วย Google Apps Script ทำหน้าที่เป็น Serverless Webhook Endpoint รับข้อมูลผลประเมินความเครียดจากแชทบอท Botnoi AI คำนวณคะแนน บันทึก Timestamp ชื่อผู้ใช้ คะแนนความเครียด และผลการวินิจฉัยลงใน Google Sheets แบบอัตโนมัติและส่ง JSON Response กลับไปยังผู้ใช้อย่างแม่นยำ',
    category_id: 'cat-4',
    thumbnail_url: '/projects/botnoi/dashboard.jpg',
    technologies: ['Google Apps Script', 'Botnoi AI NLP', 'JavaScript', 'Google Sheets API', 'Webhooks'],
    features: [
      'เชื่อมต่อกับ Botnoi Chatbot AI NLP ผ่าน Webhook GET/POST Parameters',
      'สถาปัตยกรรม Serverless ด้วย Google Apps Script ทำงาน 24/7 โดยไม่มีค่าใช้จ่ายเซิร์ฟเวอร์',
      'บันทึกข้อมูลผลประเมินลง Google Sheets Database แบบ Real-time พร้อมคอลัมน์มาตรฐาน',
      'ส่ง JSON Response ตอบกลับผลการบันทึกข้อมูลอย่างเป็นระบบ',
      'โครงสร้างข้อมูลรองรับการต่อยอดทำ Dashboard วิเคราะห์สถิติสุขภาพจิต'
    ],
    problem: 'การประเมินความเครียดผ่านแชทบอทเดิมไม่มีระบบจัดเก็บผลลัพธ์ที่เป็นระเบียบ ทำให้ข้อมูลกระจัดกระจายและไม่สามารถนำมาวิเคราะห์ต่อได้',
    solution: 'สร้างระบบ Web App API บน Google Apps Script รับข้อมูลจาก Botnoi แล้วจัดเก็บลง Google Sheets อัตโนมัติทันที ทำให้ผู้ดูแลระบบติดตามสุขภาพจิตผู้รับการประเมินได้แบบเรียลไทม์',
    demo_url: 'https://namenoname.store',
    source_code_url: '',
    is_featured: false,
    is_published: true,
    created_at: '2026-02-15T10:00:00Z',
    updated_at: '2026-02-15T10:00:00Z',
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
    slug: 'corporate-business-website',
    description: 'เว็บไซต์บริษัทและองค์กรที่ดูน่าเชื่อถือ ทันสมัย ประกอบด้วยหน้าแรก, เกี่ยวกับเรา, บริการ, ผลงาน, บทความ/ข่าวสาร และหน้าติดต่อ พร้อมระบบจัดการเนื้อหา (CMS) หลังบ้าน',
    starting_price: 15900,
    features: [
      'โครงสร้าง 5-8 หน้ามาตรฐานธุรกิจ',
      'Admin Dashboard จัดการข่าวสารและเนื้อหา',
      'SEO Friendly (Meta tags, Open Graph, Sitemap)',
      'สถิติผู้เข้าชมเว็บไซต์เบื้องต้น',
      'ออกแบบ UI/UX สอดคล้องกับอัตลักษณ์ของแบรนด์',
      'ดูแลและอัปเดตระบบฟรี 3 เดือน'
    ],
    excluded_features: [
      'การเขียนบทความเนื้อหาหรือถ่ายภาพสินค้าจริง'
    ],
    estimated_duration: '7 - 14 วัน',
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-3',
    title: 'E-commerce & Store System',
    slug: 'ecommerce-store-system',
    description: 'ระบบร้านค้าออนไลน์ครบวงจร เช่น ระบบร้านค้า BA Store แสดงเรทราคา Realtime ตะกร้าสินค้า ระบบแจ้งชำระเงินและแนบสลิป ตรวจสอบออเดอร์ และแดชบอร์ดสรุปยอดขาย',
    starting_price: 25900,
    features: [
      'ระบบแคตตาล็อกสินค้า ตัวเลือกสินค้า และเรทราคา Realtime',
      'ระบบแนบสลิปโอนเงิน & ตรวจสอบสลิปในแดชบอร์ด',
      'ระบบสมาชิก ลูกค้าตรวจสอบประวัติการสั่งซื้อได้',
      'Admin Dashboard จัดการสินค้า สต็อก และออเดอร์',
      'แจ้งเตือนออเดอร์ใหม่ผ่าน LINE Notify / Webhook',
      'ฐานข้อมูล Supabase PostgreSQL ปลอดภัยด้วย RLS'
    ],
    excluded_features: [
      'ค่าธรรมเนียม Payment Gateway (ถ้าใช้บริการบัตรเครดิตภายนอก)'
    ],
    estimated_duration: '14 - 21 วัน',
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'srv-4',
    title: 'Custom Web Application & Enterprise IoT',
    slug: 'custom-web-app-enterprise',
    description: 'พัฒนาระบบเว็บแอปพลิเคชันเฉพาะทางตามความต้องการของธุรกิจ เช่น ระบบอ่านค่าน้ำหนัก RS232, ระบบจัดการเงินเดือน Payroll, ระบบ OTP บัญชี หรือเชื่อมต่อ AI Automation',
    starting_price: 35000,
    features: [
      'ออกแบบ Database Schema & Architecture เฉพาะทาง (PostgreSQL / SQL Server / MySQL)',
      'Role-Based Access Control (Admin / Staff / Client)',
      'Realtime Data Sync (WebSockets / Supabase Realtime)',
      'FastAPI / PHP / Node.js Backend พร้อมความปลอดภัยสูง',
      'คู่มือการใช้งานและเอกสารการทำงานของระบบ',
      'รับประกันดูแลระบบหลังส่งมอบ 6 เดือน'
    ],
    excluded_features: [
      'ค่าบริการ Third-party API รายเดือน (ถ้ามี)'
    ],
    estimated_duration: '15 - 30 วัน',
    is_published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-bastore-kit',
    title: 'BA STORE - Premium App Retail Storefront & Realtime Sync Engine',
    slug: 'ba-store-retail-kit',
    description: 'ระบบร้านค้าออนไลน์แสดงเรทราคาแอพพรีเมียม สไตล์ชมพูพาสเทล พร้อม Admin PIN Dashboard, Realtime Pricing ด้วย Supabase และระบบเชื่อมต่อคำสั่งซื้อ LINE Chat',
    price: 2490,
    category_id: 'cat-5',
    thumbnail_url: '/projects/ba-store/banner.jpg',
    gallery_urls: [
      '/projects/ba-store/banner.jpg',
      '/projects/ba-store/logo.jpg'
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
    created_at: '2026-03-28T00:00:00Z',
    updated_at: '2026-03-28T00:00:00Z',
    avg_rating: 5.0,
    review_count: 8
  },
  {
    id: 'prod-otp-kit',
    title: 'BA-STORE OTP - Verification & Account Distribution Portal',
    slug: 'ba-store-otp-kit',
    description: 'ชุดระบบกระจายสิทธิ์และส่งรหัสยืนยันตัวตน OTP สำหรับผู้ใช้งานแอพสตรีมมิ่ง 6 แพลตฟอร์ม พร้อมระบบนับเวลาหมดอายุและการตรวจสอบความปลอดภัย',
    price: 1990,
    category_id: 'cat-6',
    thumbnail_url: '/projects/otp/banner.jpg',
    gallery_urls: [
      '/projects/otp/banner.jpg'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase Auth', 'Vite'],
    included_items: [
      'Full Source Code ของระบบ OTP Portal',
      'ระบบตัวนับเวลา OTP Expiration Timer',
      'ไอคอนและโลโก้สตรีมมิ่งครบชุด',
      'คู่มือการติดตั้งและผูกระบบเข้ากับ Supabase'
    ],
    requirements: [
      'Node.js 18+',
      'Supabase Project'
    ],
    license_terms: 'Commercial License: นำไปปรับแต่งและใช้งานในธุรกิจสตรีมมิ่งของท่านได้',
    demo_url: 'https://namenoname.store',
    product_type: 'source_code',
    is_published: true,
    created_at: '2026-03-25T00:00:00Z',
    updated_at: '2026-03-25T00:00:00Z',
    avg_rating: 5.0,
    review_count: 5
  },
  {
    id: 'prod-rs232-kit',
    title: 'RS232 Industrial Barcode & Scale Weight Integration Kit',
    slug: 'rs232-scale-integration-kit',
    description: 'ชุดระบบเชื่อมต่อพอร์ต Serial RS232 อ่านค่าน้ำหนักเครื่องชั่ง สตรีมผ่าน WebSocket Real-time และตรวจเช็คบาร์โค้ดสินค้าใน SQL Server พร้อม Docker & Nginx',
    price: 3990,
    category_id: 'cat-6',
    thumbnail_url: '/projects/rs232/terminal.png',
    gallery_urls: [
      '/projects/rs232/terminal.png',
      '/projects/rs232/factory_report.png'
    ],
    technologies: ['FastAPI', 'Python', 'SQL Server', 'PySerial', 'WebSockets', 'Docker', 'Nginx'],
    included_items: [
      'FastAPI Backend & WebSocket Streaming Server',
      'สคริปต์เชื่อมต่อ RS232 Serial COM Ports',
      'ตัวเชื่อมต่อฐานข้อมูล SQL Server (ShoesBox)',
      'Frontend HTML5/JS Dashboard พร้อมระบบเสียงแจ้งเตือน',
      'Docker Compose & Nginx Configuration พร้อมใช้งาน'
    ],
    requirements: [
      'Python 3.10+ หรือ Docker',
      'พอร์ต Serial / USB-to-RS232'
    ],
    license_terms: 'Commercial License: ใช้งานได้ในโรงงานอุตสาหกรรมหรือโปรเจกต์เชิงพาณิชย์',
    demo_url: 'https://namenoname.store',
    product_type: 'source_code',
    is_published: true,
    created_at: '2026-03-15T00:00:00Z',
    updated_at: '2026-03-15T00:00:00Z',
    avg_rating: 5.0,
    review_count: 4
  },
  {
    id: 'prod-payroll-kit',
    title: 'Payroll Management System - Biometric Attendance & Payroll Kit',
    slug: 'payroll-management-system-kit',
    description: 'ชุดระบบจัดการเงินเดือนพนักงานภาษา PHP + MySQL รองรับการนำเข้าไฟล์ CSV จากเครื่องสแกนลายนิ้วมือ (ZKTeco/Suprema), คำนวณ OT และส่งออกรายงาน Excel',
    price: 2990,
    category_id: 'cat-6',
    thumbnail_url: '/projects/payroll/dashboard.jpg',
    gallery_urls: [
      '/projects/payroll/dashboard.jpg'
    ],
    technologies: ['PHP', 'MySQL', 'CSV Fingerprint Import', 'Tailwind CSS', 'Excel Export'],
    included_items: [
      'Full PHP Source Code พร้อมสถาปัตยกรรมแยกโมดูล',
      'SQL Script สร้างตารางฐานข้อมูล payroll_db',
      'สคริปต์ประมวลผลไฟล์ CSV จากเครื่องสแกนนิ้ว',
      'สูตรคำนวณเงินเดือนสุทธิ OT และหักสาย/ขาดงานอัตโนมัติ',
      'ระบบส่งออกรายงาน Excel และคู่มือการติดตั้ง'
    ],
    requirements: [
      'PHP 7.4 - 8.2 (XAMPP / Apache / Nginx)',
      'MySQL / MariaDB'
    ],
    license_terms: 'Commercial License: นำไปติดตั้งใช้งานให้บริษัทหรือลูกค้าได้ทันที',
    demo_url: 'https://namenoname.store',
    product_type: 'source_code',
    is_published: true,
    created_at: '2026-03-01T00:00:00Z',
    updated_at: '2026-03-01T00:00:00Z',
    avg_rating: 4.9,
    review_count: 7
  },
  {
    id: 'prod-botnoi-kit',
    title: 'Botnoi AI Stress Logger & Google Sheets Automation Pipeline',
    slug: 'botnoi-stress-logger-kit',
    description: 'ชุดสคริปต์เชื่อมต่อ Botnoi AI Chatbot รับค่า Webhook และบันทึกผลการประเมินลง Google Sheets อัตโนมัติด้วย Google Apps Script แบบ Serverless 100%',
    price: 990,
    category_id: 'cat-6',
    thumbnail_url: '/projects/botnoi/dashboard.jpg',
    gallery_urls: [
      '/projects/botnoi/dashboard.jpg'
    ],
    technologies: ['Google Apps Script', 'Botnoi AI NLP', 'JavaScript', 'Google Sheets API'],
    included_items: [
      'สคริปต์ Google Apps Script (Code.gs) พร้อมใช้งาน',
      'เทมเพลต Google Sheets พร้อมตารางโครงสร้างข้อมูล',
      'คู่มือขั้นตอนการผูก Webhook เข้ากับ Botnoi AI',
      'ตัวอย่าง Prompt และ Persona สำหรับบอทประเมินสุขภาพจิต'
    ],
    requirements: [
      'บัญชี Google (Google Sheets & Apps Script ฟรี)',
      'บัญชี Botnoi AI'
    ],
    license_terms: 'Standard License: ใช้งานได้ไม่จำกัดจำนวนสเปรดชีต',
    demo_url: 'https://namenoname.store',
    product_type: 'source_code',
    is_published: true,
    created_at: '2026-02-15T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
    avg_rating: 5.0,
    review_count: 3
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  site_name: 'Thitiwut | Developer Portfolio & Website Marketplace',
  developer_name: 'Thitiwut (Senior Full-Stack Developer)',
  tagline: 'Senior Full-Stack Developer & Modern Web Architect',
  bio: 'ผู้เชี่ยวชาญการสร้างสรรค์เว็บไซต์ระดับพรีเมียม สถาปัตยกรรมระบบ React, FastAPI, PHP, Supabase และฐานข้อมูลที่ปลอดภัย โหลดเร็ว และตอบโจทย์ธุรกิจจริง',
  email: 'thitiwut.dev@namenoname.store',
  phone: '098-XXX-XXXX',
  line_id: '@thitiwut.dev',
  github_url: '',
  domain: 'namenoname.store',
  bank_name: 'ธนาคารกสิกรไทย (Kasikorn Bank)',
  bank_account_number: 'xxx-x-x6751-x',
  bank_account_name: 'นาย ฐิติวุฒิ พุกภิญโญ',
  promptpay_number: 'สแกนผ่าน Thai QR Code ด้านบน',
};
