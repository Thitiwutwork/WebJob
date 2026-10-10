# Thitiwut | Developer Portfolio & Website Marketplace

[![Domain: namenoname.store](https://img.shields.io/badge/Domain-namenoname.store-indigo.svg)](https://namenoname.store)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Thitiwutwork%2FWebJob-black.svg)](https://github.com/Thitiwutwork/WebJob)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black.svg?logo=vercel)](https://vercel.com)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E.svg?logo=supabase)](https://supabase.com)

เว็บไซต์พอร์ตโฟลิโอและร้านค้าจำหน่าย Website Templates & Source Code สำหรับนักพัฒนามืออาชีพ (Senior Full-Stack Developer) ออกแบบด้วยสไตล์ **Modern Developer Studio (Dark Theme)** พร้อมระบบ Admin Dashboard, ระบบสั่งซื้อ & ตรวจสอบสลิปธนาคาร, ระบบส่งมอบไฟล์ดิจิทัลที่ปลอดภัย และระบบรีวิวที่ตรวจสอบสิทธิ์การซื้อจริง (Verified Purchases Only)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### Frontend
- **React 19** & **TypeScript**
- **Vite** (Next-gen frontend tooling)
- **Tailwind CSS v4** (Modern utility-first CSS)
- **React Router 7** (Client-side routing with clean URL slugs)
- **Lucide Icons**
- **Zod & React Hook Form**

### Backend & Database
- **Supabase PostgreSQL** (14 Tables with Foreign Keys, Constraints & Indexes)
- **Supabase Authentication** (Secure session management & JWT)
- **Row Level Security (RLS)** (ความปลอดภัยระดับ Row-level ป้องกันการปลอมแปลงสิทธิ์)
- **Supabase Storage** (Secure storage for payment slips & downloadable packages)

### Deployment & Infrastructure
- **Vercel** (Global Edge CDN distribution for Frontend SPA)
- **Custom Domain**: `namenoname.store`
- **GitHub Repository**: [https://github.com/Thitiwutwork/WebJob](https://github.com/Thitiwutwork/WebJob)

---

## 🚀 ฟีเจอร์หลักของระบบ (Core Features)

1. **Home Page (`/`)**:
   - Hero Section: Headline "I Build Websites That Help Businesses Grow"
   - Featured Projects Showcase & Filter
   - บริการรับทำเว็บไซต์ (Services Overview)
   - Technology Stack Breakdown
   - Workflow & Steps การทำงาน (Discovery -> Architecture -> Dev -> Launch)
   - ลูกค้ารีวิวจริง (Verified Testimonials)
   - Call to Action สำหรับเริ่มบรีฟโครงการ
2. **Portfolio Page (`/portfolio`)**:
   - แสดงผลงานแบบ Interactive Grid Cards
   - ค้นหาด้วยชื่อและคำอธิบายระบบ (Live Search)
   - กรองตามเทคโนโลยี (Tech Stack Filters)
   - กรองตามสถานะผลงานเด่น (Featured Filter)
3. **Project Detail Page (`/portfolio/:slug`)**:
   - รายละเอียดปัญหา (Challenge) และแนวทางแก้ปัญหา (Solution)
   - รายการฟีเจอร์หลัก (Core Features)
   - ลิงก์ Live Demo และ Source Code GitHub
   - ปุ่มขอใบเสนอราคาสำหรับโปรเจกต์ลักษณะเดียวกัน
4. **Services Page (`/services`)**:
   - แสดงแพ็กเกจบริการ: Landing Page, Business Website, E-commerce, Custom Web App / POS
   - แจกแจงสิ่งที่ได้รับ, สิ่งที่ไม่รวม, ระยะเวลาประเมิน, และราคาเริ่มต้น
5. **Marketplace Page (`/marketplace`)**:
   - ร้านขาย Website Templates, Dashboard Kits, และ Source Code Packages
   - ค้นหา กรองตามประเภท และเรียงตามราคา
   - ตัวอย่าง Live Preview Demo
6. **Product Detail Page (`/marketplace/:slug`)**:
   - ข้อมูลสิ่งที่ลูกค้าจะได้รับ (Included items), ข้อกำหนดการติดตั้ง (Requirements), และ License Terms
   - ระบบรีวิวสินค้าเฉพาะผู้ที่สั่งซื้อจริง ("ไม่มี Transaction = ไม่มีสิทธิ์รีวิว")
   - ระบบปลดล็อกดาวน์โหลดไฟล์ดิจิทัล (ZIP) อัตโนมัติเมื่อชำระเงินสำเร็จ
7. **Contact / Request a Quote (`/contact`)**:
   - แบบฟอร์มบรีฟงาน (ชื่อ, อีเมล, เบอร์โทร, LINE, บริการ, รายละเอียด, งบประมาณ, กำหนดส่ง)
   - ระบบสร้างเลขที่คำขออัตโนมัติ (เช่น `INQ-2026-XXXX`)
   - ระบบแจ้งสถานะและบันทึกข้อมูลเข้าฐานข้อมูล
8. **Cart & Payment System (`/cart`, `/checkout`, `/order-success`)**:
   - ระบบตะกร้าสินค้า
   - หน้าชำระเงินพร้อมเลขที่บัญชีธนาคารกสิกรไทย และ PromptPay QR
   - อัปโหลดสลิปหลักฐานการโอนเงิน (บันทึกสถานะ `reviewing_slip`)
9. **Customer Portal (`/dashboard`)**:
   - ตรวจสอบประวัติคำสั่งซื้อและสถานะชำระเงิน
   - ลิงก์ดาวน์โหลด Source Code สำหรับออเดอร์ที่อนุมัติแล้ว
   - ติดตามสถานะคำขอบรีฟงานที่ส่งไว้
10. **Admin Dashboard (`/admin`)**:
    - ภาพรวมสถิติรายได้คำสั่งซื้อจริง, จำนวนบรีฟใหม่, จำนวนสลิปรอตรวจสอบ
    - จัดการผลงาน (เพิ่ม/แก้ไข/ลบ/Toggle Featured & Published)
    - จัดการสินค้า Marketplace (เพิ่ม/แก้ไข/ตั้งราคา/License)
    - จัดการบรีฟงานลูกค้า (เปลี่ยนสถานะ New -> Quoted -> Accepted พร้อมบันทึกโน้ต)
    - ตรวจสอบสลิปโอนเงิน (เปิดดูรูปสลิป -> กดยืนยันอนุมัติเพื่อปลดล็อกไฟล์ให้ลูกค้าทันที)
    - จัดการรีวิว (ซ่อน/แสดงผล)
    - ตั้งค่าระบบ (ชื่อสตูดิโอ, โดเมน, บัญชีธนาคาร)

---

## 📦 โครงสร้างโปรเจกต์ (Project Structure)

```
job/
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── admin/          # แดชบอร์ดและเลย์เอาต์แอดมิน
│   │   ├── common/         # Navbar, Footer, Button, Badge, GithubIcon
│   │   ├── forms/          # InquiryForm ฟอร์มบรีฟงาน
│   │   ├── portfolio/      # ProjectCard
│   │   └── products/       # ProductCard
│   ├── context/
│   │   ├── AuthContext.tsx # ระบบสมาชิกและจัดการสิทธิ์ Role
│   │   └── CartContext.tsx # ระบบตะกร้าสินค้า
│   ├── lib/
│   │   └── supabase.ts     # Supabase Client & Connection Checker
│   ├── pages/
│   │   ├── admin/          # หน้าจัดการของ Admin ทั้งหมด
│   │   ├── HomePage.tsx
│   │   ├── PortfolioPage.tsx
│   │   ├── ProjectDetailPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── MarketplacePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── OrderCheckoutPage.tsx
│   │   ├── OrderSuccessPage.tsx
│   │   ├── CustomerDashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/           # Data Services เชื่อมโยง Supabase & Local Fallback
│   ├── types/
│   │   └── database.ts     # TypeScript Interfaces สอดคล้องกับ SQL Schema
│   ├── App.tsx             # Route Configuration
│   ├── index.css           # Tailwind CSS v4 & Modern Dark Styles
│   └── main.tsx
├── supabase/
│   └── migrations/
│       └── 20261010_initial_schema.sql # SQL 14 ตาราง + RLS + Triggers + Seed Data
├── vercel.json             # Vercel SPA Rewrites & Security Headers
├── .env.example            # ตัวอย่าง Environment Variables
└── package.json
```

---

## ⚙️ ขั้นตอนการติดตั้งและรันในเครื่อง (Local Setup)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. คัดลอกไฟล์ Environment Variables
cp .env.example .env

# 3. รันโปรเจกต์ในโหมดพัฒนา
npm run dev

# 4. ทดสอบ Build สำหรับ Production
npm run build
```

---

## 🗄️ การตั้งค่า Supabase Database

1. ไปที่ [https://supabase.com](https://supabase.com) และสร้างโปรเจกต์ใหม่
2. ไปที่เมนู **SQL Editor** ในแดชบอร์ด Supabase
3. เปิดไฟล์ `supabase/migrations/20261010_initial_schema.sql` และคัดลอกโค้ดทั้งหมดไปวางใน SQL Editor แล้วกด **Run**
   - คำสั่งนี้จะสร้าง 14 ตารางหลัก พร้อม Primary Keys, Foreign Keys, Indexes, Constraints
   - ตั้งค่าความปลอดภัย **Row Level Security (RLS)** ให้ทุกตาราง
   - สร้าง Trigger สำหรับสร้าง Profile อัตโนมัติเมื่อมี User สมัครสมาชิก
   - ใส่ข้อมูลตัวอย่าง (Seed Data) ให้พร้อมใช้งานทันที
4. ไปที่ **Project Settings** -> **API** ใน Supabase
5. นำค่า **Project URL** และ **anon public key** มาใส่ในไฟล์ `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

---

## 🌐 การ Deploy บน Vercel และผูก Domain `namenoname.store`

1. นำโค้ดขึ้น GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Developer Portfolio & Website Marketplace system"
   git push -u origin main
   ```
2. ไปที่ [https://vercel.com](https://vercel.com) และกด **Add New Project**
3. เลือก Repository: `Thitiwutwork/WebJob`
4. ตั้งค่า Environment Variables ใน Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. กด **Deploy**
6. **ตั้งค่า Custom Domain `namenoname.store` ใน Vercel**:
   - ไปที่แท็บ **Settings** -> **Domains** ของโปรเจกต์ใน Vercel
   - พิมพ์ `namenoname.store` แล้วกด Add
   - ที่ผู้ให้บริการโดเมน (DNS Registrar) ของคุณ ให้ตั้งค่าระเบียน DNS ดังนี้:
     - **A Record**: โฮสต์ `@` ชี้ไปที่ `76.76.21.21`
     - **CNAME Record**: โฮสต์ `www` ชี้ไปที่ `cname.vercel-dns.com`
   - Vercel จะออกใบรับรอง SSL ให้อัตโนมัติภายในไม่กี่นาที

---

## 🔑 บัญชีทดสอบ (Quick Test Accounts)

ในหน้าเข้าสู่ระบบ (`/login`) ได้จัดเตรียมปุ่ม **One-Click Demo Login** ไว้ให้เพื่อความสะดวกในการทดสอบ:

- **Admin Account**: `admin@namenoname.store` (เข้าถึงหน้า `/admin` ได้ทุกฟังก์ชัน)
- **Customer Account**: `customer@example.com` (สั่งซื้อสินค้า แนบสลิป และติดตามผลงาน)
