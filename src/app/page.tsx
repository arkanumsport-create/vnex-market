"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ArrowRight,
  Award,
  Tag,
  ShieldCheck,
  Sparkles,
  Play,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Factory,
  CheckCircle2,
  MapPin,
  Navigation,
  Truck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductModal } from "@/components/product/ProductModal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PwaInstallModal } from "@/components/layout/PwaInstallModal";
import { DeliveryModal, DeliveryBadgeButton } from "@/components/layout/DeliveryModal";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { useStore } from "@/stores/useStore";
import {
  DICTIONARY,
  STORE_CONFIG,
  LOOKBOOK_MODELS,
  LOOKBOOK_VIDEOS,
  assetUrl,
} from "@/lib/config";
import { Product } from "@/types/store";

export default function HomePage() {
  const { locale, products, setDeliveryModalOpen } = useStore();
  const t = DICTIONARY[locale];

  // Hero Intro Animation State: "expand" (full model photo) -> "settled" (shrinks to right, reveals letters & description)
  const [introPhase, setIntroPhase] = useState<"expand" | "settled">("expand");
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  // Catalog Filter & Modal State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Lookbook Lightbox State
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Trigger Hero Intro Shrink after 1.35s on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroPhase("settled");
    }, 1350);
    return () => clearTimeout(timer);
  }, []);

  // Rotate the 5 Model Photos on the right side of the Hero
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % LOOKBOOK_MODELS.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  const replayHeroIntro = () => {
    setIntroPhase("expand");
    setTimeout(() => {
      setIntroPhase("settled");
    }, 1350);
  };

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

  const currentHeroModel = LOOKBOOK_MODELS[heroSlideIdx] || LOOKBOOK_MODELS[0];
  const storeNameChars = "VNEX MARKET".split("");

  return (
    <div className="min-h-screen flex flex-col bg-[#10100f] text-[#f3f0e9]">
      <Header
        selectedCategory={selectedCategory}
        onSelectMenu={(_section, catSlug) => {
          if (catSlug) setSelectedCategory(catSlug);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CartDrawer />
      <PwaInstallModal />
      <DeliveryModal />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <main className="flex-1 w-full overflow-x-clip">
        {/* =====================================================================
            1. CINEMATIC HERO SECTION (Reference Split Layout + Intro Shrink)
            ===================================================================== */}
        <section className="max-w-[1260px] mx-auto px-3 sm:px-8 mt-4 sm:mt-12">
          <div className="relative min-h-[580px] sm:min-h-[620px] bg-[#191916] border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* RIGHT / FULL-BLEED MODEL IMAGE CONTAINER (Starts full-width, then shrinks to right half) */}
            <div
              className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden bg-[#191916] ${
                introPhase === "expand"
                  ? "absolute inset-0 z-20 sm:scale-105"
                  : "relative lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-[44%] h-[360px] sm:h-[420px] lg:h-full z-10 scale-100"
              }`}
            >
              <img
                key={currentHeroModel.id}
                src={assetUrl(currentHeroModel.src)}
                alt={locale === "es" ? currentHeroModel.titleEs : currentHeroModel.titleEn}
                className="w-full h-full object-cover object-[center_22%] animate-hero-slide"
              />

              {/* Subtle Left-to-Right Editorial Gradient Overlay */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                  introPhase === "expand"
                    ? "bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                    : "bg-gradient-to-t lg:bg-gradient-to-r from-[#191916] via-[#191916]/25 to-transparent"
                }`}
              />

              {/* Full-Screen Intro Overlay Badge while expanded */}
              {introPhase === "expand" && (
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center px-4">
                  <span className="px-4 py-1.5 rounded-full bg-black/75 border border-[#38bdf8] text-[#38bdf8] text-xs font-bold tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                    VNEX MARKET • {locale === "es" ? "COLECCIÓN TURQUÍA" : "TURKISH COLLECTION"}
                  </span>
                </div>
              )}

              {/* Bottom Model Caption & Slide Switcher */}
              <div className="absolute z-20 right-3 bottom-3 left-3 sm:right-6 sm:bottom-5 sm:left-6 flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-[0.14em] uppercase text-white/90">
                <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/15 max-w-full">
                  <span className="text-[#d4af37] font-bold shrink-0">{currentHeroModel.indexLabel}</span>
                  <span className="text-white/40 shrink-0">•</span>
                  <span className="truncate max-w-[165px] sm:max-w-none">
                    {locale === "es" ? currentHeroModel.titleEs : currentHeroModel.titleEn}
                  </span>
                </div>

                {/* Slide Selector Dots */}
                <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-white/15">
                  {LOOKBOOK_MODELS.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setHeroSlideIdx(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === heroSlideIdx ? "w-5 bg-[#38bdf8]" : "w-1.5 bg-white/40 hover:bg-white"
                      }`}
                      aria-label={`Modelo ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Vertical Index Watermark */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 text-white/45 font-serif-luxury text-xs tracking-[0.18em] [writing-mode:vertical-rl]"
              >
                N° 0{heroSlideIdx + 1}
              </div>
            </div>

            {/* LEFT COLUMN: STORE LETTERS -> SLOGAN -> DESCRIPTION -> ACTIONS */}
            <div
              className={`relative z-20 lg:col-span-6 p-6 sm:p-10 lg:py-14 lg:pl-12 lg:pr-6 transition-all duration-700 ${
                introPhase === "expand"
                  ? "opacity-0 translate-y-6 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {/* Eyebrow + Replay Intro Button */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[#d4af37]">
                  <span className="w-6 h-[1px] bg-[#d4af37] inline-block" />
                  <span>{t.heroEyebrow}</span>
                </p>

                <button
                  onClick={replayHeroIntro}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#38bdf8] hover:underline cursor-pointer"
                  title="Ver animación de entrada"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t.replayIntro}</span>
                </button>
              </div>

              {/* Animated Store Title Letters (VNEX MARKET) */}
              <div className="mt-4 flex flex-wrap items-center gap-x-0.5 sm:gap-x-1">
                {storeNameChars.map((ch, idx) =>
                  ch === " " ? (
                    <span key={idx} className="w-2 sm:w-3 inline-block" />
                  ) : (
                    <span
                      key={`${introPhase}-${idx}`}
                      style={{ animationDelay: `${idx * 65}ms` }}
                      className={`font-serif-luxury text-xl sm:text-3xl font-extrabold tracking-[0.1em] sm:tracking-[0.14em] inline-block animate-[letter-pop_0.55s_ease-out_both] ${
                        idx < 4 ? "text-[#38bdf8]" : "text-[#d4af37]"
                      }`}
                    >
                      {ch}
                    </span>
                  )
                )}
              </div>

              {/* Slogan in Reference 3D Red/White Stroked Display Typography */}
              <h1 className="hero-slogan-display text-[26px] sm:text-4xl lg:text-[44px] mt-3 mb-4 max-w-[540px] break-words">
                {t.heroSlogan}
              </h1>

              {/* Store Description (Turkish Factory Direct, Tags & Quality Certificate) */}
              <p className="text-xs sm:text-[13px] text-[#bdb9b0] leading-[1.85] max-w-[460px] mb-6">
                {t.heroDescription}
              </p>

              {/* Turkish Quality Pills */}
              <div className="flex flex-wrap gap-2 mb-7">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider">
                  🇹🇷 {locale === "es" ? "Directo de Fábrica en Turquía" : "Turkish Factory Direct"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider">
                  <Tag className="w-3 h-3" />
                  {locale === "es" ? "Nuevo con Etiqueta y Certificado" : "New with Tag & Certificate"}
                </span>
              </div>

              {/* Hero CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#catalogo"
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#d4af37] hover:bg-[#e5c247] text-[#111] font-extrabold text-[11px] tracking-[0.16em] uppercase transition"
                >
                  <span>{t.heroCtaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-transparent hover:bg-[#25D366]/15 border border-white/30 hover:border-[#25D366] text-white font-bold text-[11px] tracking-[0.14em] uppercase transition"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{t.heroCtaWhatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            2. EXCLUSIVE PRODUCT CATALOG SECTION (Reference 4-Column Grid)
            ===================================================================== */}
        <section id="catalogo" className="max-w-[1260px] mx-auto px-4 sm:px-8 pt-20 sm:pt-24">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#d4af37]">
                {t.catalogEyebrow}
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-[42px] font-normal tracking-tight text-[#f3f0e9] mt-2">
                {t.catalogTitle}
              </h2>
            </div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#99968e]">
              {filteredProducts.length} / {products.length}{" "}
              {locale === "es" ? "ARTÍCULOS DISPONIBLES ($20.00 USD)" : "ITEMS AVAILABLE ($20.00 USD)"}
            </p>
          </div>

          {/* Category Tabs & Search Bar Row (Reference Style) */}
          <div className="min-h-[54px] flex flex-wrap items-center justify-between gap-4 border-y border-white/12 mb-4 py-2">
            <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`relative py-2 text-[10px] font-bold tracking-[0.14em] uppercase whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === "all"
                    ? "text-[#d4af37] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#d4af37]"
                    : "text-[#8f8c85] hover:text-[#f3f0e9]"
                }`}
              >
                {locale === "es" ? "TODOS" : "ALL"}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`relative py-2 text-[10px] font-bold tracking-[0.14em] uppercase whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat.slug
                      ? "text-[#d4af37] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-[#d4af37]"
                      : "text-[#8f8c85] hover:text-[#f3f0e9]"
                  }`}
                >
                  {locale === "es" ? cat.nameEs : cat.nameEn}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 text-[#99968e] w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-[11px] uppercase tracking-wider text-[#f3f0e9] placeholder-[#8f8c85] focus:outline-none"
              />
            </div>
          </div>

          <p className="text-xs text-[#99968e] mb-8">{t.catalogSubtitle}</p>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        </section>

        {/* =====================================================================
            3. FOTOSET & VIDEOS TAB / SECTION (5 Uploaded Photos + 2 Videos)
            ===================================================================== */}
        <section id="fotoset" className="max-w-[1260px] mx-auto px-4 sm:px-8 pt-24">
          <div className="border-t border-white/12 pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#38bdf8] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.lookbookEyebrow}</span>
                </p>
                <h2 className="font-serif-luxury text-3xl sm:text-[42px] font-normal tracking-tight text-[#f3f0e9] mt-2">
                  {t.lookbookTitle}
                </h2>
                <p className="text-xs text-[#99968e] mt-2 max-w-xl">{t.lookbookSubtitle}</p>
              </div>
              <span className="px-4 py-1.5 rounded-full border border-[#38bdf8]/50 bg-[#38bdf8]/10 text-[#38bdf8] text-[10px] font-bold uppercase tracking-widest w-fit">
                5 {locale === "es" ? "Fotos" : "Photos"} • 2 {locale === "es" ? "Videos Oficiales" : "Official Videos"}
              </span>
            </div>

            {/* 2 Official Lookbook Videos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {LOOKBOOK_VIDEOS.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-[#171715] border border-white/15 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[9/12] sm:aspect-[16/11] bg-black overflow-hidden">
                    <video
                      controls
                      playsInline
                      loop
                      muted
                      preload="metadata"
                      poster={assetUrl(vid.poster)}
                      className="w-full h-full object-cover"
                    >
                      <source src={assetUrl(vid.src)} type="video/mp4" />
                    </video>
                    <div className="absolute top-3 left-3 pointer-events-none px-3 py-1 rounded-full bg-black/75 border border-[#d4af37]/50 text-[#d4af37] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Play className="w-3 h-3 fill-[#d4af37]" />
                      <span>VIDEO OFICIAL</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif-luxury text-base text-[#f3f0e9]">
                        {locale === "es" ? vid.titleEs : vid.titleEn}
                      </h3>
                      <p className="text-xs text-[#99968e] mt-1">
                        {locale === "es" ? vid.descEs : vid.descEn}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] shrink-0">
                      🇹🇷 TURQUÍA
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 5 Official Lookbook Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {LOOKBOOK_MODELS.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative aspect-[3/4] bg-[#201f1c] border border-white/12 hover:border-[#38bdf8] overflow-hidden cursor-pointer"
                >
                  <img
                    src={assetUrl(item.src)}
                    alt={locale === "es" ? item.titleEs : item.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-[#38bdf8] grid place-items-center opacity-0 group-hover:opacity-100 transition">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[9px] font-bold tracking-widest text-[#d4af37] block">
                      {item.indexLabel}
                    </span>
                    <h4 className="font-serif-luxury text-xs text-white mt-0.5 line-clamp-1">
                      {locale === "es" ? item.titleEs : item.titleEn}
                    </h4>
                    <p className="text-[10px] text-white/70 mt-0.5 line-clamp-1">
                      {locale === "es" ? item.subtitleEs : item.subtitleEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. TURKISH FACTORY DIRECT & QUALITY CERTIFICATE SECTION (#turquia)
            ===================================================================== */}
        <section id="turquia" className="max-w-[1260px] mx-auto px-4 sm:px-8 pt-24">
          <div className="p-8 sm:p-12 bg-gradient-to-br from-[#191916] via-[#141824] to-[#141412] border border-[#d4af37]/30 space-y-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37] flex items-center gap-2">
                <span>🇹🇷</span>
                <span>{t.aboutEyebrow}</span>
              </p>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#f3f0e9] leading-tight">
                {t.aboutTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#bdb9b0] leading-relaxed">
                {t.aboutDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Direct from Turkish Factory */}
              <div className="p-6 bg-[#10100f]/90 border border-white/12 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8] grid place-items-center">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-base text-white">
                  {locale === "es"
                    ? "1. Suministro Directo de Fábrica en Turquía"
                    : "1. Direct Supply from Turkish Factories"}
                </h3>
                <p className="text-xs text-[#99968e] leading-relaxed">
                  {locale === "es"
                    ? "Importamos directamente desde las plantas textiles de Turquía reconocidas mundialmente por producir el mejor algodón peinado y acabados de lujo."
                    : "We import directly from Turkish textile mills renowned worldwide for producing the finest combed cotton and luxury finishes."}
                </p>
              </div>

              {/* Card 2: 100% Brand New with Original Tags */}
              <div className="p-6 bg-[#10100f]/90 border border-white/12 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] grid place-items-center">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-base text-white">
                  {locale === "es"
                    ? "2. 100% Nuevo con Etiqueta Original"
                    : "2. 100% Brand New with Original Tags"}
                </h3>
                <p className="text-xs text-[#99968e] leading-relaxed">
                  {locale === "es"
                    ? "Cada prenda se entrega completamente nueva, con sus etiquetas tejidas de cuello, etiquetas colgantes de fábrica y empaque protector."
                    : "Every garment is delivered brand new with original woven neck labels, factory hang tags, and protective packaging."}
                </p>
              </div>

              {/* Card 3: Quality Certificate */}
              <div className="p-6 bg-[#10100f]/90 border border-white/12 space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 grid place-items-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-base text-white">
                  {locale === "es"
                    ? "3. Certificado de Calidad Garantizada"
                    : "3. Guaranteed Quality Certificate"}
                </h3>
                <p className="text-xs text-[#99968e] leading-relaxed">
                  {locale === "es"
                    ? "Prendas con certificación de control de calidad: costuras reforzadas, gramaje premium que no transparenta y estampados de alta durabilidad."
                    : "Certified quality control: reinforced stitching, heavyweight non-sheer fabric, and ultra-durable high-definition prints."}
                </p>
              </div>
            </div>

            {/* Bottom Contact & Payment Banner */}
            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#d4cfc4]">
                <span className="inline-flex items-center gap-1.5 text-[#d4af37] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  {locale === "es" ? "Precio Único: $20.00 USD" : "Flat Price: $20.00 USD"}
                </span>
                <span>•</span>
                <span>Pagos: Zelle, Pago Móvil, Efectivo USD</span>
                <span>•</span>
                <span>Maracay, Estado Aragua</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <DeliveryBadgeButton onClick={() => setDeliveryModalOpen(true)} />

                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs tracking-wider uppercase whitespace-nowrap shrink-0 transition"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" withBadge={false} />
                  <span className="whitespace-nowrap">WhatsApp: {STORE_CONFIG.whatsappDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. CÓMO ENCONTRARNOS / INTERACTIVE MAP SECTION (#ubicacion)
            ===================================================================== */}
        <section id="ubicacion" className="max-w-[1260px] mx-auto px-4 sm:px-8 pt-20">
          <div className="p-6 sm:p-10 bg-[#171715] border border-[#38bdf8]/35 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#38bdf8] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ff1f32]" />
                  <span>
                    {locale === "es"
                      ? "UBICACIÓN OFICIAL & RETIRO PERSONAL"
                      : "OFFICIAL LOCATION & PERSONAL PICKUP"}
                  </span>
                </p>
                <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#f3f0e9] mt-2">
                  {locale === "es" ? "CÓMO ENCONTRARNOS" : "HOW TO FIND US"}
                </h2>
                <p className="text-xs sm:text-sm text-[#bdb9b0] mt-1">
                  {locale === "es"
                    ? "Visítanos o retira tu pedido en Maracay, Plaza La Soledad, Calle 9, Estado Aragua."
                    : "Visit us or pick up your order in Maracay, Plaza La Soledad, Street 9, Aragua State."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <DeliveryBadgeButton onClick={() => setDeliveryModalOpen(true)} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Plaza+La+Soledad+Calle+9+Maracay+Aragua+Venezuela"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#08101f] font-extrabold text-[11px] tracking-wider uppercase transition"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{locale === "es" ? "Abrir en Google Maps" : "Open in Google Maps"}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left: Location & Grupo ZOOM COD Details Card */}
              <div className="lg:col-span-5 p-6 bg-[#10100f] border border-white/12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* VNex Market Pin Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <img
                      src={assetUrl("/logo/vnex-logo.jpg")}
                      alt="VNex Market"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#38bdf8]"
                    />
                    <div>
                      <span className="block font-serif-luxury text-lg font-extrabold text-[#38bdf8] leading-none">
                        VNex Market
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.26em] text-[#cbd5e1] mt-1">
                        online store • Maracay
                      </span>
                    </div>
                  </div>

                  {/* Exact Address */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] block">
                      {locale === "es" ? "DIRECCIÓN EXACTA:" : "EXACT ADDRESS:"}
                    </span>
                    <p className="text-sm font-bold text-white flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#ff1f32] shrink-0 mt-0.5" />
                      <span>
                        {locale === "es"
                          ? "Maracay, Urbanización La Soledad, Plaza La Soledad, Calle 9, Estado Aragua, Venezuela"
                          : "Maracay, Urbanización La Soledad, Plaza La Soledad, Street 9, Aragua State, Venezuela"}
                      </span>
                    </p>
                  </div>

                  {/* Grupo ZOOM & COD Summary */}
                  <div className="p-4 rounded-xl bg-[#0c1424] border border-[#38bdf8]/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#38bdf8] uppercase">
                      <Truck className="w-4 h-4 text-[#ff1f32]" />
                      <span>
                        {locale === "es"
                          ? "Grupo ZOOM • MRW • Tealca (COD)"
                          : "Grupo ZOOM • MRW • Tealca (COD)"}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                      {locale === "es"
                        ? "Envíos rápidos a toda Venezuela (Caracas, Valencia, Barquisimeto y más) con modalidad Cobro en Destino (COD): compras tu prenda y pagas el envío al recibir."
                        : "Fast nationwide shipping across Venezuela with Cash on Delivery (COD): buy your garment and pay the shipping fee upon receipt."}
                    </p>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryModalOpen(true)}
                    className="w-full py-3 px-4 rounded-full border-2 border-[#38bdf8] bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#ff1f32] font-extrabold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-[#ff1f32]" />
                    <span>
                      {locale === "es"
                        ? "VER REGLAS DE DELIVERY Y GRUPO ZOOM"
                        : "VIEW DELIVERY & GRUPO ZOOM RULES"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right: Interactive Map with VNex Market Marker Pin */}
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[430px] bg-[#0c1424] border-2 border-[#38bdf8]/50 overflow-hidden">
                <iframe
                  title="VNex Market — Plaza La Soledad, Calle 9, Maracay"
                  src={`https://maps.google.com/maps?q=10.2586,-67.5912+(VNex+Market+-+Plaza+La+Soledad+Calle+9+Maracay)&t=&z=16&ie=UTF8&iwloc=B&output=embed&hl=${locale}`}
                  className="w-full h-full min-h-[380px] sm:min-h-[430px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Prominent Custom VNex Market Marker Badge Overlay */}
                <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0c1424]/95 border-2 border-[#38bdf8] shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
                  <span className="w-3 h-3 rounded-full bg-[#ff1f32] animate-ping" />
                  <div>
                    <span className="block font-serif-luxury text-sm font-extrabold text-[#38bdf8] leading-none">
                      📍 VNex Market
                    </span>
                    <span className="block text-[10px] font-bold text-white mt-0.5">
                      {locale === "es"
                        ? "Maracay • Plaza La Soledad, Calle 9"
                        : "Maracay • Plaza La Soledad, Street 9"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Full-Screen Lookbook Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white text-black hover:bg-[#ff1f32] hover:text-white grid place-items-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx(
                (prev) => ((prev ?? 0) - 1 + LOOKBOOK_MODELS.length) % LOOKBOOK_MODELS.length
              );
            }}
            className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl max-h-[88vh] flex flex-col items-center"
          >
            <img
              src={assetUrl(LOOKBOOK_MODELS[lightboxIdx].src)}
              alt={LOOKBOOK_MODELS[lightboxIdx].titleEs}
              className="max-h-[78vh] w-auto object-contain border border-white/20"
            />
            <div className="mt-3 text-center">
              <p className="font-serif-luxury text-sm text-[#d4af37]">
                {locale === "es"
                  ? LOOKBOOK_MODELS[lightboxIdx].titleEs
                  : LOOKBOOK_MODELS[lightboxIdx].titleEn}
              </p>
              <p className="text-xs text-[#99968e]">
                {locale === "es"
                  ? LOOKBOOK_MODELS[lightboxIdx].subtitleEs
                  : LOOKBOOK_MODELS[lightboxIdx].subtitleEn}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((prev) => ((prev ?? 0) + 1) % LOOKBOOK_MODELS.length);
            }}
            className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
