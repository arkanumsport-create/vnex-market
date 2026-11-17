-- =============================================================================
-- VNex Market — Seed Data (Maracay, Estado Aragua, Venezuela)
-- =============================================================================

INSERT INTO public.store_settings (key, value) VALUES
('general', '{
  "store_name": "VNex Market",
  "whatsapp": "+584123776184",
  "whatsapp_clean": "584123776184",
  "address_es": "Maracay, Estado Aragua, Venezuela",
  "address_en": "Maracay, Aragua State, Venezuela",
  "instagram": "https://www.instagram.com/max642553",
  "instagram_handle": "@max642553",
  "default_locale": "es",
  "supported_locales": ["es", "en"],
  "base_currency": "USD",
  "default_unit_price_usd": 20.00,
  "payment_methods": ["zelle", "pago_movil", "efectivo_usd"]
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

INSERT INTO public.categories (slug, name_es, name_en, description_es, description_en, sort_order) VALUES
('camisetas', 'Camisetas y Franelas', 'T-Shirts & Tops', 'Colección exclusiva de camisetas y franelas premium a $20 USD.', 'Exclusive collection of premium T-shirts and tops at $20 USD.', 1),
('moda-urbana', 'Moda Urbana', 'Streetwear', 'Estilo urbano y deportivo con diseños modernos.', 'Urban and athletic style with modern designs.', 2),
('edicion-especial', 'Edición Especial', 'Special Edition', 'Diseños gráficos exclusivos y estampados de alta calidad.', 'Exclusive graphic designs and high-quality prints.', 3),
('accesorios', 'Gorras y Accesorios', 'Caps & Accessories', 'Complementos para tu estilo diario.', 'Accessories for your daily style.', 4)
ON CONFLICT (slug) DO NOTHING;
