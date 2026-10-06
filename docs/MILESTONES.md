# C H A H R A · B E A U T Y — Project Milestones

> **Total:** 6 Milestones · 1 Session Each · Run `/clear` between each session  
> **Rule:** Wait for user approval after reviewing milestones before writing any application code.

---

## Milestone 1: Project Setup & CLAUDE.md

**🎯 Goal:** Initialize Next.js 14 (App Router) project, configure Tailwind CSS with brand design tokens, set up typography (Cormorant Garamond & Inter), create root layout, helper utilities, and write `CLAUDE.md`.

**📁 Files to Create:**
- `CLAUDE.md` — Comprehensive project context, tech stack notes, and build commands for AI sessions
- `package.json` & `tsconfig.json` — Next.js 14 App Router setup with TypeScript
- `tailwind.config.ts` — Brand colors (`#F5F0E8` parchment, `#F8C8D4` baby pink, `#4A9B9B` teal, `#2C2C2C` charcoal) and font families
- `next.config.js` / `next.config.mjs` — Next.js configuration with Supabase image domain support
- `postcss.config.js` — PostCSS configuration for Tailwind
- `src/app/globals.css` — Tailwind directives and custom scrollbar/selection styling
- `src/app/layout.tsx` — Root layout loading Google Fonts (Cormorant Garamond & Inter) and metadata
- `src/app/page.tsx` — Temporary placeholder homepage verifying setup
- `src/lib/utils.ts` — Utility functions (`cn` for Tailwind classes, `formatPrice` for DZD formatting)
- `src/components/ui/Button.tsx` — Reusable button component supporting teal, pink, and outline variants
- `.env.local.example` — Environment variables template (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`)

**✅ Done When:**
- `npm run dev` starts successfully without errors
- Homepage renders with the correct parchment background (`#F5F0E8`)
- Cormorant Garamond and Inter fonts load correctly
- Tailwind recognizes all brand color tokens and button variants
- `CLAUDE.md` is fully documented

---

## Milestone 2: Supabase Schema & Configuration

**🎯 Goal:** Set up Supabase database tables (`products`, `orders`), configure public storage bucket (`product-images`), establish Supabase client/server connection wrappers, TypeScript types, and seed sample beauty products.

**📁 Files to Create:**
- `.env.local` — Local environment variables with live Supabase credentials
- `supabase/schema.sql` — PostgreSQL schema definition for `products` and `orders` tables, RLS policies, and storage bucket setup
- `src/lib/supabase/client.ts` — Browser-side Supabase client (`createBrowserClient`)
- `src/lib/supabase/server.ts` — Server-side Supabase client (`createServerClient`)
- `src/lib/supabase/admin.ts` — Supabase service role client for privileged admin operations
- `src/lib/types/database.ts` — TypeScript types corresponding to `products` and `orders` tables
- `src/seed/seed-products.ts` — Seeding script to populate 6–8 luxury beauty products in Supabase

**📋 Key Tasks:**
1. Execute `supabase/schema.sql` in Supabase SQL Editor
2. Create public storage bucket `product-images`
3. Configure Row Level Security (RLS) policies (public read for products, public insert for orders)
4. Run seed script to populate catalog

**✅ Done When:**
- `products` and `orders` tables exist in Supabase with exact columns specified in PRD
- `product-images` storage bucket is publicly accessible
- Sample beauty products are successfully queryable from the database

---

## Milestone 3: Storefront UI (Static / Mock Data)

**🎯 Goal:** Build all public-facing storefront pages and components using mock data. Pixel-perfect, responsive (360px to 1440px), elegant minimal luxury aesthetic.

**📁 Files to Create:**
- `src/lib/mock-data.ts` — Rich mock data for products and categories
- `src/components/layout/Header.tsx` — Sticky top navigation with logo, nav links, and interactive cart badge
- `src/components/layout/Footer.tsx` — Editorial footer with brand story, links, and copyright
- `src/components/layout/MobileMenu.tsx` — Slide-out mobile navigation drawer
- `src/components/home/HeroBanner.tsx` — Hero section with bilingual headline (AR + FR) and CTA
- `src/components/home/FeaturedProducts.tsx` — Grid showing top curated products
- `src/components/home/CategoryCards.tsx` — Category navigation cards (Skincare, Makeup, etc.)
- `src/components/products/ProductCard.tsx` — Card component with image hover effect, price in DZD, and Quick Add
- `src/components/products/ProductGrid.tsx` — Responsive grid container
- `src/components/products/CategoryFilter.tsx` — Filter tabs for catalog
- `src/components/cart/CartProvider.tsx` — React Context for shopping cart state (add, remove, quantity update, persistence)
- `src/components/cart/CartSidebar.tsx` — Slide-in cart drawer with items breakdown and subtotal in DZD
- `src/components/cart/CartItem.tsx` — Individual row item inside cart sidebar
- `src/app/page.tsx` — Homepage composing Hero, Category Cards, and Featured Products
- `src/app/products/page.tsx` — Product catalog page with category filtering
- `src/app/products/[id]/page.tsx` — Product detail page with image viewer and quantity selector
- `src/app/checkout/page.tsx` — Order form page with customer details inputs and order summary

**✅ Done When:**
- All storefront pages render with gorgeous parchment aesthetics, custom fonts, and smooth animations
- Cart sidebar opens/closes smoothly, calculates subtotals in DZD, and updates quantities
- Checkout form validates user input (name, phone)
- Fully responsive across mobile, tablet, and desktop viewports
- Zero Supabase calls (relies 100% on mock data)

---

## Milestone 4: Connect Storefront to Supabase

**🎯 Goal:** Replace mock data with live Supabase data queries and server actions. Wire the shopping cart checkout form to submit real orders into the Supabase database.

**📁 Files to Create / Update:**
- `src/lib/actions/products.ts` — Server actions (`getProducts`, `getProductById`, `getProductsByCategory`)
- `src/lib/actions/orders.ts` — Server action / API route (`createOrder`) to insert orders into Supabase
- `src/app/page.tsx` — 🔄 Updated to fetch featured products from Supabase
- `src/app/products/page.tsx` — 🔄 Updated to fetch and filter real products from Supabase
- `src/app/products/[id]/page.tsx` — 🔄 Updated to fetch single product details from Supabase
- `src/app/checkout/page.tsx` — 🔄 Updated to submit orders via server action/API
- `src/components/products/ProductGrid.tsx` — 🔄 Added skeleton loading states while fetching
- `src/components/checkout/OrderConfirmation.tsx` — ✨ Success screen showing order reference number after placement
- `src/app/api/orders/route.ts` — API endpoint for order submission handling

**📋 Key Tasks:**
1. Wire Supabase server actions into storefront pages
2. Implement robust loading skeletons and error boundaries
3. Implement order submission flow saving items as JSONB and total in DZD
4. Build order confirmation success view

**✅ Done When:**
- Storefront displays real products fetched directly from Supabase
- Category filtering queries Supabase dynamically
- Placing an order successfully creates a record in the Supabase `orders` table
- Order confirmation screen displays immediately upon successful submission
- Zero mock data remains in production storefront code

---

## Milestone 5: Admin Dashboard

**🎯 Goal:** Build a secure, password-protected admin dashboard (`/admin`) allowing the store owner to manage products (CRUD with Supabase Storage image uploads) and track customer orders with status management.

**📁 Files to Create:**
- `src/middleware.ts` — Next.js middleware for protecting `/admin` routes via session cookie
- `src/app/admin/login/page.tsx` — Admin password login screen
- `src/app/api/admin/login/route.ts` — Authentication API endpoint verifying `ADMIN_PASSWORD`
- `src/app/admin/layout.tsx` — Admin layout with sidebar navigation and logout action
- `src/app/admin/page.tsx` — Dashboard overview stats (total products, pending orders, revenue)
- `src/app/admin/products/page.tsx` — Product management table with quick actions
- `src/app/admin/products/new/page.tsx` — Add product form with Supabase Storage image uploader
- `src/app/admin/products/[id]/edit/page.tsx` — Edit product form
- `src/app/admin/orders/page.tsx` — Orders list with status management (`pending` → `confirmed` → `delivered`) and clickable phone numbers (`tel:`)
- `src/lib/actions/admin.ts` — Admin server actions (`createProduct`, `updateProduct`, `deleteProduct`, `updateOrderStatus`, `uploadProductImage`)

**✅ Done When:**
- Accessing `/admin` without logging in redirects to `/admin/login`
- Entering correct password grants access to the dashboard
- Store owner can upload product images, create new products, edit existing ones, and delete products
- Store owner can view all customer orders and update their status (`pending` → `confirmed` → `delivered`)

---

## Milestone 6: Polish + Deploy to Vercel

**🎯 Goal:** Conduct end-to-end testing, optimize metadata/SEO, refine responsive styling and micro-interactions, fix any bugs or type warnings, and deploy the application live to Vercel.

**📁 Files to Create / Update:**
- `src/app/sitemap.ts` — Dynamic sitemap generator for SEO
- `src/app/robots.ts` — Robots configuration
- `src/app/not-found.tsx` — Custom luxury 404 error page
- `src/components/ui/Toast.tsx` — Toast notification system for cart additions and admin actions
- Root metadata optimization in `src/app/layout.tsx` (OpenGraph, Twitter cards, title templates)

**📋 Key Tasks:**
1. Run full build test (`npm run build`) to verify zero TypeScript or ESLint errors
2. Test end-to-end user journey: Homepage → Catalog → Product Detail → Cart Sidebar → Checkout → Supabase Order
3. Test admin journey: Admin Login → Product CRUD with Image Upload → Order Status Management
4. Configure production environment variables in Vercel
5. Deploy live to Vercel and verify production URL

**✅ Done When:**
- `npm run build` succeeds cleanly with zero errors or warnings
- All end-to-end storefront and admin workflows function flawlessly
- Application is successfully deployed and accessible live on Vercel
