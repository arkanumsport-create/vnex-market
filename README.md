# VNex Market — Online Store (Venezuela / Latin America)

E-commerce plataforma oficial **VNex Market** desarrollada con **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Zustand** y **Supabase (PostgreSQL)**, preparada para **PWA** y futura integración con **Telegram Mini App**.

## Datos Oficiales de la Tienda

- **Marca:** VNex Market — Online Store
- **Idiomas:** Español Latinoamericano (`es` — principal) e Inglés (`en` — secundario)
- **Ubicación:** Maracay, Estado Aragua, Venezuela
- **WhatsApp Oficial:** [+58 412-3776184](https://wa.me/584123776184)
- **Instagram:** [@max642553](https://www.instagram.com/max642553)
- **Precio Unitario Base (Camisetas):** `$20.00 USD` (con soporte de tasa manual en `Bs. VES`)
- **Métodos de Pago Manuales:**
  1. **Zelle (USD)**
  2. **Pago Móvil (Bs.)**
  3. **Efectivo USD** (Entrega / Retiro en Maracay, Edo. Aragua)

## Estructura del Proyecto (`D:\Projects\vnex-market`)

```text
vnex-market/
├── public/
│   ├── icons/                   # Iconos PWA (192x192, 512x512)
│   ├── logo/vnex-logo.jpg       # Logotipo oficial VNex Market
│   ├── products/                # Fotografías del catálogo de camisetas
│   └── manifest.webmanifest     # Configuración PWA
├── src/
│   ├── app/
│   │   ├── admin/page.tsx       # Panel Administrativo (/admin)
│   │   ├── globals.css          # Estilos globales Tailwind CSS
│   │   ├── layout.tsx           # Layout raíz y metadatos SEO / PWA
│   │   └── page.tsx             # Tienda principal bilingüe (ES / EN)
│   ├── components/
│   │   ├── cart/CartDrawer.tsx  # Carrito y Checkout sin registro obligatorio
│   │   ├── layout/Header.tsx    # Cabecera con selector ES/EN y USD/VES
│   │   ├── layout/Footer.tsx    # Pie de página y botón flotante WhatsApp
│   │   └── product/ProductCard.tsx # Tarjeta de producto ($20 USD + tallas S-XL)
│   ├── lib/
│   │   ├── catalog.ts           # Catálogo inicial de camisetas ($20 USD)
│   │   └── config.ts            # Configuración de tienda y diccionarios ES/EN
│   ├── stores/
│   │   └── useStore.ts          # Estado global con Zustand (Carrito, Pedidos, Idioma)
│   └── types/
│       └── store.ts             # Tipos TypeScript del dominio e-commerce
└── supabase/
    ├── migrations/001_initial_schema.sql # Esquema PostgreSQL + RLS
    └── seed.sql                 # Datos semilla iniciales
```

## Ejecución Local

```bash
npm install
npm run dev
```
