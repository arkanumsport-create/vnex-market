"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  PhoneCall,
  CreditCard,
  Truck,
  ShieldCheck,
  Sparkles,
  Instagram,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";

export default function HomePage() {
  const { locale, products, showVes, vesRate } = useStore();
  const t = DICTIONARY[locale];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const map = new Map<string, { slug: string; nameEs: string; nameEn: string }>();
    products.forEach((p) => {
      if (!map.has(p.categorySlug)) {
        map.set(p.categorySlug, {
          slug: p.categorySlug,
          nameEs: p.categoryNameEs,
          nameEn: p.categoryNameEn,
        });
      }
    });
    return Array.from(map.values());
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = selectedCategory === "all" || p.categorySlug === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      const text = `${p.nameEs} ${p.nameEn} ${p.descriptionEs} ${p.descriptionEn} ${p.sku}`.toLowerCase();
      return matchesCat && text.includes(q);
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#091b3a] via-[#0d2754] to-[#091b3a] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-extrabold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span>{t.heroBadge}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  {t.heroTitle}
                </h1>

                <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                  {t.heroSubtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#catalogo"
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-lg transition"
                  >
                    {t.heroCtaPrimary}
                  </a>
                  <a
                    href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>
                      {t.heroCtaWhatsapp} ({STORE_CONFIG.whatsappDisplay})
                    </span>
                  </a>
                </div>

                {/* Store Quick Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Maracay, Estado Aragua</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Zelle • Pago Móvil • Efectivo $</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      {locale === "es" ? "Precio Único: $20 USD" : "Flat Price: $20 USD"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Logo Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-blue-600 via-red-500 to-blue-400 shadow-2xl">
                  <img
                    src={assetUrl("/logo/vnex-logo.jpg")}
                    alt="VNex Market Official Logo"
                    className="w-full h-full rounded-full object-cover bg-slate-950"
                  />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-red-600 text-white font-black text-sm shadow-lg whitespace-nowrap border-2 border-white">
                    {showVes
                      ? `Bs. ${(20 * vesRate).toFixed(2)} ($20 USD)`
                      : "$20.00 USD / Unidad"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                VNex Market • {STORE_CONFIG.instagramHandle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#091b3a] mt-1">
                {t.featuredTitle}
              </h2>
              <p className="text-sm text-slate-600 mt-1">{t.featuredSubtitle}</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-blue-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#091b3a] text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-600"
              }`}
            >
              {t.allProducts} ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-[#091b3a] text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-blue-600"
                }`}
              >
                {locale === "es" ? cat.nameEs : cat.nameEn}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Payment & Delivery Info Section */}
        <section id="pagos" className="bg-white border-y border-slate-200 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-black text-[#091b3a]">
                {t.paymentMethodsSectionTitle} & {locale === "es" ? "Entregas" : "Delivery"}
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                {locale === "es"
                  ? "Pagos rápidos y verificados directamente con nuestra tienda en Maracay, Estado Aragua."
                  : "Fast, verified payments directly with our store in Maracay, Aragua State."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STORE_CONFIG.paymentMethods.map((pm) => (
                <div
                  key={pm.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2"
                >
                  <span className="inline-block px-3 py-1 rounded-lg bg-[#091b3a] text-white text-xs font-extrabold">
                    {pm.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 pt-1">
                    {locale === "es" ? pm.nameEs : pm.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {locale === "es" ? pm.instructionsEs : pm.instructionsEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#091b3a] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <Truck className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-extrabold">
                    {locale === "es"
                      ? "Entregas en Maracay, Estado Aragua y Envíos Nacionales"
                      : "Pickup & Delivery in Maracay, Aragua State + Nationwide Shipping"}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {locale === "es"
                      ? "Retiro personal en Maracay, delivery local en Aragua y envíos a toda Venezuela por MRW, Zoom o Tealca."
                      : "Personal pickup in Maracay, local delivery in Aragua, and nationwide shipping across Venezuela via MRW, Zoom, or Tealca."}
                  </p>
                </div>
              </div>
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#091b3a] font-extrabold text-xs shrink-0 hover:bg-blue-50 transition"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram {STORE_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
