# C H A H R A · B E A U T Y — Product Requirements Document (PRD)

> **Document Version:** 1.0  
> **Date:** October 2026  
> **Status:** Approved for Implementation  
> **Target Market:** Algeria (Local e-commerce)

---

## 1. Executive Summary & Vision

**C H A H R A · B E A U T Y** is a premium beauty e-commerce web application designed specifically for the Algerian market.

### Vision & Brand Essence
- **Aesthetic:** Minimalist, warm, luxurious local beauty boutique. Blends refined French elegance with authentic Algerian cultural identity.
- **Tone:** Inviting, sophisticated, reliable, and premium.
- **Value Proposition:** Providing Algerian customers with a seamless, high-touch shopping experience for curated beauty and skincare products with local pricing (DZD) and a frictionless, zero-barrier order process.

---

## 2. Target Personas

| Persona | Role | Context & Key Actions |
|---|---|---|
| **The Shopper (Public)** | Algerian beauty enthusiast (mobile-first, 18–45) | Browses featured & catalog collections, inspects product details, adds items to slide-in cart, submits orders via local phone/name without complex registrations or online payment gateways. |
| **The Store Owner (Admin)** | Brand manager & operations lead | Accesses password-secured portal (`/admin`), creates/updates/removes products, uploads high-res product photos to Supabase Storage, and monitors order status (`pending`, `confirmed`, `delivered`). |

---

## 3. Technology Stack

| Dimension | Technology Selection | Notes & Rationale |
|---|---|---|
| **Framework** | **Next.js 14 (App Router)** | Server Components, fast SSR/SSG, optimized metadata, App Router structure. |
| **Styling** | **Tailwind CSS** | Custom design tokens, responsive breakpoints, sleek transitions. |
| **Database** | **Supabase (PostgreSQL)** | Managed relational database, Row Level Security (RLS), instant JSON schema queries. |
| **File Storage** | **Supabase Storage** | Public bucket (`product-images`) for high-fidelity product imagery. |
| **Typography** | **Google Fonts** (`next/font`) | Cormorant Garamond (Headings) + Inter (Body). |
| **Deployment** | **Vercel** | Edge runtime, optimized image caching, CI/CD deployment. |
| **Language** | **TypeScript** | Strict typing for database models, UI props, and server actions. |

---

## 4. Visual Design System

### 4.1 Color Palette
- **Main Background (Beige / Parchment):** `#F5F0E8`  
  *Gives an organic, warm editorial canvas reminiscent of luxury boutique packaging.*
- **Accent / Highlights (Baby Pink):** `#F8C8D4`  
  *Delicate cosmetic touch for badges, hover states, cards, and subtle accents.*
- **Call-to-Action / Links (Teal / Sarcelle):** `#4A9B9B`  
  *Sophisticated contrast color for primary buttons, action links, and price highlights.*
- **Text & Neutral Dark (Dark Charcoal):** `#2C2C2C`  
  *High legibility, soft contrast against parchment background (avoids harsh pure black).*
- **Surface / Card Background (Pure White / Off-White):** `#FFFFFF` / `#FAF7F2`

### 4.2 Typography
- **Display & Headings:** `Cormorant Garamond`, serif  
  *Used for Brand Name, Hero Title, Section Headings, Product Titles.*
- **Body & Controls:** `Inter`, sans-serif  
  *Used for descriptions, navigation links, price tags, form fields, and buttons.*

### 4.3 Design Principles
- **Generous Whitespace:** Breathing room between catalog items and editorial sections.
- **Mobile-First Responsiveness:** Flawless ergonomics on screens from 360px up to 1440px+.
- **Bilingual Flavor:** Subtle integration of French and Arabic editorial copy in the hero and brand accents.

---

## 5. Functional Requirements & Features

### 5.1 Storefront (Public)

1. **Hero Banner (`/`)**
   - Elegant header with brand identity: **C H A H R A · B E A U T Y**.
   - Bilingual tagline in Arabic and French (e.g., *"جمالك ينبض بالأناقة · L'élégance au naturel"*).
   - Prominent Call to Action button directing to the product collection.

2. **Product Catalog & Filters (`/products`)**
   - Responsive multi-column grid (1 col mobile, 2 col tablet, 3–4 col desktop).
   - Product Cards showing: Image with zoom/hover transition, Category tag, Name, and Price in **DZD** (e.g., `4,500 DZD`).
   - Category filtering bar (e.g., *Tous*, *Soins du Visage*, *Maquillage*, *Soins du Corps*, *Parfums*).

3. **Product Detail Page (`/products/[id]`)**
   - High-resolution product image gallery/viewer.
   - Rich product description, stock availability badge, category metadata.
   - Quantity counter (`-` / `+`) and primary CTA: *"Ajouter au Panier"* (Teal).
   - Back navigation to catalog.

4. **Slide-in Cart Sidebar (Global Drawer)**
   - Triggerable from the header cart badge (with real-time item count indicator).
   - Slide-in animation from the right screen edge.
   - Itemized listing: thumbnail, title, price, quantity stepper, and remove item button.
   - Order subtotal calculation in DZD.
   - Direct button to Checkout: *"Commander"* (Teal).

5. **Checkout & Order Placement (`/checkout`)**
   - No payment gateway integration required (Cash on Delivery / Local fulfillment).
   - Lightweight customer form:
     - Full Name (`customer_name`) — Required
     - Phone Number (`customer_phone`) — Required (Algerian mobile format validation)
     - Delivery Wilaya / Address / Optional Notes — Required/Optional
   - Order summary listing items, quantities, and grand total.
   - Order confirmation screen showing a friendly thank-you note and order reference code.

---

### 5.2 Admin Dashboard (`/admin`)

1. **Authentication & Protection**
   - Dedicated route: `/admin/login`.
   - Single-password protected session via secure cookie / server verification (`ADMIN_PASSWORD`).

2. **Dashboard Overview (`/admin`)**
   - Quick operational metrics: Total Products, Pending Orders, Total Revenue.
   - Recent orders quick list.

3. **Product Management (`/admin/products`)**
   - Table view listing all products with thumbnail, name, category, price, stock, and action buttons.
   - **Add Product (`/admin/products/new`):**
     - Form fields: Name, Description, Category, Price (DZD), Stock Quantity.
     - Direct image file upload to Supabase Storage bucket (`product-images`).
   - **Edit Product (`/admin/products/[id]`):** Update fields or replace existing product photo.
   - **Delete Product:** Remove record with confirmation modal.

4. **Order Management (`/admin/orders`)**
   - Chronological list of orders submitted by customers.
   - Displays Customer Name, Phone Number (clickable `tel:` link), Ordered Items breakdown, and Total DZD.
   - Status toggle / selector:
     - `pending` (Default upon checkout)
     - `confirmed` (Store contacted client via call/WhatsApp)
     - `delivered` (Order fulfilled)

---

## 6. Database Architecture (Supabase PostgreSQL)

### 6.1 `products` Table
```sql
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Stored in Algerian Dinars (DZD)
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 6.2 `orders` Table
```sql
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL, -- Array of { product_id: string, name: string, price: number, quantity: number }
  total INTEGER NOT NULL, -- Stored in Algerian Dinars (DZD)
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 6.3 Storage Buckets
- Bucket name: `product-images`
- Access policy: Public read, authenticated or service-role write.

---

## 7. Application Routes Map

```
/
├── /products
│   └── /[id]
├── /checkout
├── /admin
│   ├── /login
│   ├── /products
│   │   ├── /new
│   │   └── /[id]
│   └── /orders
└── /api
    └── /orders
```

---

## 8. Non-Functional Requirements

- **Performance:** First Contentful Paint < 1.5s, mobile optimization for local 3G/4G connections.
- **SEO & Social Sharing:** Dynamic OpenGraph tags, semantic HTML5 tags (`<main>`, `<article>`, `<header>`).
- **Data Integrity:** Server-side validation using Zod for order submissions and product mutations.
- **Responsiveness:** Full layout adaptation for 360px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop).

---

## 9. Scope Boundaries (v1)

### Strictly In-Scope
- Curated luxury beauty catalog with image, description, price, and category.
- Frictionless cart and Cash-on-Delivery checkout flow (Name + Phone + Wilaya).
- Supabase PostgreSQL persistence and Supabase Storage image uploads.
- Password-secured Admin panel for product catalog CRUD and order tracking.

### Explicitly Out-of-Scope (v1)
- Online payment gateways (Satim, CIB, BaridiMob, CCP, Stripe).
- Customer account creation, logins, passwords, or profiles.
- Automatic multi-language translation toggle switch.
- Customer reviews, star ratings, and community comments.
- Automatic inventory decrement triggers or complex logistics integrations.

---

## 10. Success Criteria & Verification
1. Visitors can browse all products with instant responsive performance.
2. Items can be added to the slide-in cart, quantity updated, and subtotal verified in DZD.
3. Order can be placed with name and phone number, saving immediately to Supabase `orders`.
4. Store owner can access `/admin`, upload product images, create/edit products, and cycle order statuses.
5. The application builds cleanly with zero TypeScript or ESLint errors and is deployed to Vercel.
