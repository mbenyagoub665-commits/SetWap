-- =========================================================================
-- C H A H R A · B E A U T Y — Supabase Database Schema
-- =========================================================================

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Stored in Algerian Dinars (DZD)
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL, -- Array of { product_id: string, name: string, price: number, quantity: number }
  total INTEGER NOT NULL, -- Stored in Algerian Dinars (DZD)
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
DROP POLICY IF EXISTS "Allow admin full access on products" ON public.products;
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
DROP POLICY IF EXISTS "Allow admin full access on orders" ON public.orders;

-- Products Policies: Public read, authenticated/admin full access
CREATE POLICY "Allow public read access on products"
  ON public.products
  FOR SELECT
  USING (true);

CREATE POLICY "Allow admin full access on products"
  ON public.products
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Orders Policies: Public insert, admin full access
CREATE POLICY "Allow public insert on orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow admin full access on orders"
  ON public.orders
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 4. Storage Bucket Setup (Run in Supabase Storage or via SQL if extension enabled)
-- Note: Ensure 'product-images' bucket is created in Supabase Dashboard and set to Public.
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policy for product-images bucket
DROP POLICY IF EXISTS "Public Access to Product Images" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Product Images" ON storage.objects;

CREATE POLICY "Public Access to Product Images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin Upload Product Images"
  ON storage.objects
  FOR ALL
  USING (bucket_id = 'product-images')
  With CHECK (bucket_id = 'product-images');
