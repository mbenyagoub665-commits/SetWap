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

-- 5. Delivery Rates Table for 58 Wilayas
CREATE TABLE IF NOT EXISTS public.delivery_rates (
  wilaya_code TEXT PRIMARY KEY,
  wilaya_name TEXT NOT NULL,
  domicile INTEGER NOT NULL DEFAULT 600,
  bureau INTEGER NOT NULL DEFAULT 400,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.delivery_rates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on delivery_rates" ON public.delivery_rates;
DROP POLICY IF EXISTS "Allow admin full access on delivery_rates" ON public.delivery_rates;

CREATE POLICY "Allow public read access on delivery_rates"
  ON public.delivery_rates FOR SELECT USING (true);

CREATE POLICY "Allow admin full access on delivery_rates"
  ON public.delivery_rates FOR ALL USING (true) WITH CHECK (true);

-- Seed 58 Wilayas
INSERT INTO public.delivery_rates (wilaya_code, wilaya_name, domicile, bureau) VALUES
('01', '01. Adrar', 900, 700),
('02', '02. Chlef', 600, 400),
('03', '03. Laghouat', 800, 600),
('04', '04. Oum El Bouaghi', 600, 400),
('05', '05. Batna', 600, 400),
('06', '06. Béjaïa', 600, 400),
('07', '07. Biskra', 700, 500),
('08', '08. Béchar', 900, 700),
('09', '09. Blida', 500, 300),
('10', '10. Bouira', 600, 400),
('11', '11. Tamanrasset', 1200, 1000),
('12', '12. Tébessa', 700, 500),
('13', '13. Tlemcen', 600, 400),
('14', '14. Tiaret', 600, 400),
('15', '15. Tizi Ouzou', 600, 400),
('16', '16. Alger', 400, 250),
('17', '17. Djelfa', 700, 500),
('18', '18. Jijel', 600, 400),
('19', '19. Sétif', 600, 400),
('20', '20. Saïda', 600, 400),
('21', '21. Skikda', 600, 400),
('22', '22. Sidi Bel Abbès', 600, 400),
('23', '23. Annaba', 600, 400),
('24', '24. Guelma', 600, 400),
('25', '25. Constantine', 600, 400),
('26', '26. Médéa', 600, 400),
('27', '27. Mostaganem', 600, 400),
('28', '28. M''Sila', 600, 400),
('29', '29. Mascara', 600, 400),
('30', '30. Ouargla', 800, 600),
('31', '31. Oran', 600, 400),
('32', '32. El Bayadh', 900, 700),
('33', '33. Illizi', 1200, 1000),
('34', '34. Bordj Bou Arréridj', 600, 400),
('35', '35. Boumerdès', 500, 300),
('36', '36. El Tarf', 600, 400),
('37', '37. Tindouf', 1200, 1000),
('38', '38. Tissemsilt', 600, 400),
('39', '39. El Oued', 800, 600),
('40', '40. Khenchela', 600, 400),
('41', '41. Souk Ahras', 600, 400),
('42', '42. Tipaza', 500, 300),
('43', '43. Mila', 600, 400),
('44', '44. Aïn Defla', 600, 400),
('45', '45. Naâma', 900, 700),
('46', '46. Aïn Témouchent', 600, 400),
('47', '47. Ghardaïa', 800, 600),
('48', '48. Relizane', 600, 400),
('49', '49. Timimoun', 900, 700),
('50', '50. Bordj Badji Mokhtar', 1200, 1000),
('51', '51. Ouled Djellal', 800, 600),
('52', '52. Béni Abbès', 900, 700),
('53', '53. In Salah', 1200, 1000),
('54', '54. In Guezzam', 1200, 1000),
('55', '55. Touggourt', 800, 600),
('56', '56. Djanet', 1200, 1000),
('57', '57. El M''Ghair', 800, 600),
('58', '58. El Meniaa', 800, 600)
ON CONFLICT (wilaya_code) DO NOTHING;
