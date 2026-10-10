# Design System Specification — Thitiwut Web Studio (namenoname.store)

## 1. Brand Identity & Purpose
- **Site Name:** Thitiwut Web Studio (namenoname.store)
- **Primary Audience:** Business owners, startups, and developers looking for high-quality websites, enterprise systems, and turnkey source code packages.
- **Theme:** Professional Dark Mode with Tech-Forward Indigo & Violet Accents.

---

## 2. Color Palette (Tailwind CSS Tokens)

### 2.1 Surfaces & Backgrounds
- **App Canvas:** `bg-slate-950` (`#020617`)
- **Card Surface Primary:** `bg-slate-900/80` or `bg-slate-900/60` (`#0f172a`) with `backdrop-blur-md`
- **Sub-surfaces / Inset Containers:** `bg-slate-950/80` or `bg-slate-950/60`
- **Border Default:** `border-slate-800` (`#1e293b`)
- **Border Subtle:** `border-slate-800/80` or `border-slate-700/60`
- **Border Hover:** `hover:border-slate-700` or `hover:border-indigo-500/40`

### 2.2 Brand & Accents
- **Primary Brand Gradient:** `from-indigo-500 via-indigo-600 to-purple-600`
- **Primary Brand Accent:** Indigo-500 (`#6366f1`) / Indigo-400 (`#818cf8`)
- **Secondary Accent:** Purple-500 (`#a855f7`) / Purple-400 (`#c084fc`)
- **Success / Savings:** Emerald-400 (`#34d399`) / Emerald-950/60 container
- **Warning / Star Ratings:** Amber-400 (`#fbbf24`) / Amber-950/60 container
- **Danger / Destructive:** Rose-500 (`#f43f5e`) / Rose-950/60 container

### 2.3 Typography & Text Contrast
- **Text Headings / Bold:** `text-white` (`#ffffff`)
- **Text Body / Secondary:** `text-slate-300` (`#cbd5e1`)
- **Text Muted:** `text-slate-400` (`#94a3b8`)
- *WCAG AA Compliance Rule:* Do NOT use text color lower than `text-slate-400` for body copy on `slate-950`.

---

## 3. Typography Hierarchy
- **Display / H1:** `text-3xl` to `text-6xl`, `font-black` / `font-extrabold`, `tracking-tight` (Plus Jakarta Sans / Prompt)
- **Section Heading / H2:** `text-2xl` to `text-3xl`, `font-bold`, `text-white`
- **Card Heading / H3:** `text-base` to `text-lg`, `font-bold`, `text-white`
- **Body Regular:** `text-sm` or `text-xs`, `leading-relaxed`, `text-slate-300`
- **Numbers / Currencies / Tags:** `font-mono`, `font-bold` (JetBrains Mono)

---

## 4. Spacing, Geometry & Radii
- **Hero & Primary Cards:** `rounded-3xl` (24px)
- **Item Cards, Buttons, Inputs:** `rounded-2xl` (16px) or `rounded-xl` (12px)
- **Pills, Badges & Avatars:** `rounded-full` (9999px)
- **Touch Target Minimum:** All interactive elements must maintain at least 44px x 44px clickable touch area on mobile.
- **Focus Rings:** All buttons, links, and form fields must display `focus-visible:ring-2 focus-visible:ring-indigo-500 focus:outline-none`.

---

## 5. Standard Component Guidelines

### 5.1 Buttons (`Button.tsx`)
- `primary`: Gradient indigo-purple with glowing shadow and border highlight.
- `secondary`: Slate-800 with subtle border.
- `outline`: Transparent with slate-700 border, hover slate-800.
- `ghost`: Transparent, hover slate-800/60 text-white.
- `danger`: Rose-600 with glowing shadow.

### 5.2 Badges (`Badge.tsx`)
- Standard size `sm` (`text-xs px-2.5 py-0.5`), rounded-full with matching 80% opacity background and colored border.
