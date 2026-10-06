# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**CHAHRA · BEAUTY** — Premium Algerian beauty e-commerce web app built with Next.js 14 (App Router), Tailwind CSS, and Supabase.

**Tech Stack:**
- Frontend: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- Backend: Supabase (PostgreSQL + Storage)
- Deployment: Vercel

**Development Phase:** Building Milestone 3–4 (Storefront UI → Supabase Integration)

---

## Skills to Use for Best Results

Use these Claude Code skills at specific moments to ensure high-quality output:

### Always Use Before Changes

| Skill | When | Why |
|-------|------|-----|
| `/code-review` | Before committing any changes | Find bugs, type errors, and logical issues before they land in the repo |
| `/run` | After code changes to test locally | Verify the app builds, compiles, and runs without errors |

### Use During Development

| Skill | When | Why |
|-------|------|-----|
| `artifact-design` | Before creating new UI components | Ensures design consistency with luxury brand aesthetic |
| `dataviz` | When building admin dashboards, charts, or analytics | Creates accessible, on-brand visualizations for metrics |
| `code-review --fix` | When refactoring or fixing bugs | Automatically apply code quality improvements |

### Use for Deployment

| Skill | When | Why |
|-------|------|-----|
| `replica-test` | Before final release to production | Auto-test every user flow (checkout, admin, cart) with Playwright; catch bugs in edge cases |
| `replica-deploy` | When deploying to Vercel (Milestone 6) | Preflight checks, tests must pass, config verified, environment variables set, legal compliance |

### Use for Documentation

| Skill | When | Why |
|-------|------|-----|
| `simplify` | After completing a feature | Clean up code, reduce duplication, improve readability |

---

### Quick Commands

```bash
# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed database (if applicable)
npm run seed
```

---

## Architecture Overview

### 1. **Supabase Client Architecture**

The project uses a **three-tier Supabase client pattern**:

- **`src/lib/supabase/client.ts`** — Browser client for client components (using `@supabase/ssr`)
- **`src/lib/supabase/server.ts`** — Server-side client for Server Components (handles cookies automatically)
- **`src/lib/supabase/admin.ts`** — Admin client using `SUPABASE_SERVICE_ROLE_KEY` for privileged operations

**Usage:**
- Public queries (products): use `server.ts` from Server Components
- Admin mutations (create/update/delete): use `admin.ts` from Server Actions
- Never use admin client from browser—always wrap in Server Actions

### 2. **Server Actions & Data Flow**

All database mutations and sensitive queries are **Server Actions** in `src/lib/actions/`:

- **`products.ts`** — `getProducts()`, `getProductById()` (public read)
- **`orders.ts`** — `createOrder()` (public write, order placement)
- **`admin.ts`** — All admin mutations (CRUD operations, delivery rates)

Server Components fetch data at build/request time. Client Components use `useCart()` context for UI state only.

**Key Pattern:**
```typescript
// ✅ Server Action (can use admin client)
"use server";
export async function adminCreateProduct(input: UpsertProductInput) {
  const supabase = createAdminClient();
  await supabase.from("products").insert(input);
  revalidatePath("/products");
  return { success: true };
}

// ✅ Server Component (uses server client)
export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}

// ✅ Client Component (uses context, never direct DB)
"use client";
export function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  return <button onClick={() => addToCart(product)}>Add</button>;
}
```

### 3. **Cart & UI State Management**

**`src/components/cart/CartProvider.tsx`** — React Context for shopping cart:
- Stores items in localStorage for persistence
- Only client-side operations (add, remove, update quantity)
- Never persists to DB until checkout

**`src/components/cart/CartSidebar.tsx`** — Cart drawer UI
- Reads from `useCart()` context
- Subtotal calculated on-the-fly in DZD

### 4. **Data Types**

All database types in `src/lib/types/database.ts`:
- `Product` — Catalog items
- `Order`, `OrderItem`, `OrderStatus` — Order management
- `DeliveryRate` — Wilaya shipping costs
- `ProductCategory` — Predefined categories (French)

### 5. **Design System**

**Colors (Tailwind custom classes):**
- `bg-parchment` / `text-parchment` — `#F5F0E8` (cream background)
- `bg-pink-accent` / `text-pink-accent` — `#F8C8D4` (baby pink accents)
- `bg-teal-sarcelle` / `text-teal-sarcelle` — `#4A9B9B` (CTA/links)
- `text-charcoal` — `#2C2C2C` (body text)

**Fonts:**
- Headings: `font-serif` (Cormorant Garamond)
- Body: `font-sans` (Inter)

**Button Component (`src/components/ui/Button.tsx`):**
- Variants: `teal` (primary CTA), `pink` (accent), `outline`
- Sizes: `sm`, `md`, `lg`

### 6. **Middleware & Auth**

**`src/middleware.ts`** — Protects `/admin` routes:
- Non-login admin routes redirect to `/admin/login` if `chahra_admin_auth` cookie is missing
- Cookie set server-side at `src/app/api/admin/login/route.ts`

### 7. **Key Directories**

```
src/
  app/                          # Next.js App Router
    (public)/                   # Public pages (homepage, products, checkout)
    admin/                      # Protected admin routes
      login/page.tsx
      products/                 # Product CRUD
      orders/page.tsx           # Order management
      delivery-rates/page.tsx   # Shipping config
    api/                        # API routes (login endpoint)
    layout.tsx                  # Root layout
    globals.css                 # Tailwind directives

  components/
    ui/                         # Reusable primitives (Button, etc.)
    layout/                     # Header, Footer, Navigation
    home/                       # Homepage sections
    products/                   # Product display components
    cart/                       # Shopping cart logic & UI
    admin/                      # Admin-specific components

  lib/
    supabase/                   # Three-tier Supabase clients
    actions/                    # Server Actions (products, orders, admin)
    types/                      # TypeScript interfaces
    utils.ts                    # Utility functions (cn, formatPrice)
    mock-data.ts                # Mock products for fallback
    delivery-defaults.ts        # Default delivery rates

  middleware.ts                 # Route protection

supabase/
  schema.sql                    # Database schema definition
```

---

## Common Patterns

### Fetching Data in Server Components

```typescript
import { getProducts } from "@/lib/actions/products";

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}
```

### Creating Orders

```typescript
// src/app/checkout/page.tsx
"use client";
import { createOrder } from "@/lib/actions/orders";

export function CheckoutForm() {
  async function handleSubmit(formData: FormData) {
    const result = await createOrder({
      customer_name: formData.get("name"),
      customer_phone: formData.get("phone"),
      items: cart.items,
      total: cart.subtotal,
    });
    if (result.success) {
      // Show confirmation
    }
  }
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Admin Mutations

```typescript
// src/app/admin/products/new/page.tsx
"use client";
import { adminCreateProduct } from "@/lib/actions/admin";

export function NewProductForm() {
  async function handleSubmit(input: UpsertProductInput) {
    await adminCreateProduct(input);
    // Revalidation happens server-side automatically
  }
  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Key Decisions & Tradeoffs

1. **Server Actions over API Routes** — Used for simplicity; Server Components + Actions handle most data needs without explicit endpoints
2. **localStorage for Cart** — Lightweight, no DB queries until checkout; acceptable for MVP
3. **Mock Data Fallback** — Admin functions return mock data on Supabase errors for resilience
4. **Middleware for Auth** — Simple cookie-based admin auth (production should add 2FA/better hashing)

---

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=chahra2026
NODE_ENV=development
```

---

## Type Safety

- **Strict mode enabled** — All TypeScript errors must be resolved
- **No `any` types** — Use `unknown` with proper narrowing
- **Database types** — Always import from `src/lib/types/database.ts`

---

## Current Issues to Fix

1. **Type Safety:** `src/app/api/admin/login/route.ts:27` uses `err: any` → change to `err: unknown`
2. **Error Handling:** Most admin actions silently return `{ success: true }` on errors → add logging

---

## Milestones

See `docs/MILESTONES.md` for the complete project roadmap (6 milestones, currently in Milestone 3-4).
