# C H A H R A · B E A U T Y — AI Session Context & Guidelines

> **Project:** Premium Algerian Beauty E-commerce Web App  
> **Stack:** Next.js 14 (App Router), Tailwind CSS, Supabase (PostgreSQL + Storage), Vercel

---

## 1. Quick Reference Commands

- **Development Server:** `npm run dev`
- **Production Build:** `npm run build`
- **Production Start:** `npm start`
- **Linter:** `npm run lint`

---

## 2. Design System Tokens

- **Background (Parchment):** `#F5F0E8` (`bg-parchment` / `bg-skin`)
- **Accent (Baby Pink):** `#F8C8D4` (`bg-pink-accent`, `text-pink-accent`)
- **CTA / Links (Teal):** `#4A9B9B` (`bg-teal-sarcelle`, `text-teal-sarcelle`)
- **Text (Dark Charcoal):** `#2C2C2C` (`text-charcoal`)
- **Headings Font:** Cormorant Garamond (`font-serif`)
- **Body Font:** Inter (`font-sans`)
- **Currency:** Algerian Dinars (`DZD`)

---

## 3. Architecture & Code Conventions

- **App Router:** Use Server Components by default; add `'use client'` only when state, effects, or browser APIs are required.
- **Server Actions:** Place server mutations in `src/lib/actions/`.
- **Supabase Clients:** Use `src/lib/supabase/client.ts` for browser, `server.ts` for server components, and `admin.ts` for privileged admin operations.
- **TypeScript:** Strict types required. Avoid `any` or type suppression hacks.
- **Styling:** Use Tailwind CSS utility classes adhering strictly to the brand color palette.

---

## 4. Current Milestone Status

Refer to `docs/MILESTONES.md` for the exact milestone breakdown and current implementation progress.
