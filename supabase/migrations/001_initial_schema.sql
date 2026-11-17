-- =============================================================================
-- VNex Market — Initial Database Schema (PostgreSQL / Supabase)
-- Market: Venezuela (Maracay, Estado Aragua) & Latin America
-- Primary Locale: es-LA | Secondary Locale: en
-- Base Currency: USD ($20.00 default unit price) + VES manual rate support
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & Roles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  email TEXT,
  telegram_user_id BIGINT UNIQUE,
  preferred_locale TEXT DEFAULT 'es' CHECK (preferred_locale IN ('es', 'en')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'customer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- 2. Categories & Brands
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  logo_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Products, Variants & Images
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sku TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  price_usd NUMERIC(10, 2) NOT NULL DEFAULT 20.00 CHECK (price_usd >= 0),
  sale_price_usd NUMERIC(10, 2) CHECK (sale_price_usd IS NULL OR sale_price_usd >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  has_variants BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_new BOOLEAN NOT NULL DEFAULT TRUE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  seo_title_es TEXT,
  seo_title_en TEXT,
  seo_description_es TEXT,
  seo_description_en TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT NOT NULL UNIQUE,
  size TEXT,
  color_es TEXT,
  color_en TEXT,
  color_hex TEXT,
  price_override_usd NUMERIC(10, 2),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_es TEXT,
  alt_en TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Orders, Order Items, Payments & Status History
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  estado TEXT NOT NULL DEFAULT 'Aragua',
  ciudad TEXT NOT NULL DEFAULT 'Maracay',
  municipio TEXT,
  direccion TEXT NOT NULL,
  referencia TEXT,
  comentarios TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('zelle', 'pago_movil', 'efectivo_usd')),
  payment_status TEXT NOT NULL DEFAULT 'pendiente' CHECK (payment_status IN ('pendiente', 'comprobado', 'rechazado', 'reembolsado')),
  order_status TEXT NOT NULL DEFAULT 'nuevo' CHECK (
    order_status IN (
      'nuevo',
      'pendiente_confirmacion',
      'confirmado',
      'preparando',
      'listo_envio',
      'enviado',
      'entregado',
      'cancelado'
    )
  ),
  subtotal_usd NUMERIC(10, 2) NOT NULL CHECK (subtotal_usd >= 0),
  discount_usd NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (discount_usd >= 0),
  shipping_usd NUMERIC(10, 2),
  total_usd NUMERIC(10, 2) NOT NULL CHECK (total_usd >= 0),
  exchange_rate_ves NUMERIC(12, 4),
  shipping_method TEXT NOT NULL DEFAULT 'pickup_maracay',
  tracking_number TEXT,
  carrier TEXT,
  locale TEXT NOT NULL DEFAULT 'es',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  snapshot_name_es TEXT NOT NULL,
  snapshot_name_en TEXT NOT NULL,
  snapshot_sku TEXT NOT NULL,
  snapshot_variant_label TEXT,
  unit_price_usd NUMERIC(10, 2) NOT NULL CHECK (unit_price_usd >= 0),
  quantity INT NOT NULL CHECK (quantity > 0),
  line_total_usd NUMERIC(10, 2) NOT NULL CHECK (line_total_usd >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Store Settings (Single Seller — VNex Market)
CREATE TABLE IF NOT EXISTS public.store_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Catalog
CREATE POLICY "Public can view published categories"
  ON public.categories FOR SELECT
  USING (is_published = TRUE AND is_archived = FALSE);

CREATE POLICY "Public can view published products"
  ON public.products FOR SELECT
  USING (is_published = TRUE AND is_archived = FALSE);

CREATE POLICY "Public can view product variants"
  ON public.product_variants FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can view product images"
  ON public.product_images FOR SELECT
  USING (TRUE);

CREATE POLICY "Public can view store settings"
  ON public.store_settings FOR SELECT
  USING (TRUE);
