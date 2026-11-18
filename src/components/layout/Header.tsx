"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  ArrowRight,
  Camera,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface HeaderProps {
  activeSection?: string;
  selectedCategory?: string;
  onSelectMenu?: (targetSection: string, categorySlug?: string, menuKey?: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export function Header({
  selectedCategory = "all",
  onSelectMenu,
  searchQuery = "",
  onSearchChange,
}: HeaderProps) {
  const { locale, setLocale, showVes, toggleShowVes, vesRate, cart, setCartOpen } = useStore();
  const t = DICTIONARY[locale];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState<string>("all");

  const sidebarItems = [
    {
      key: "all",
      labelEs: "TODOS LOS PRODUCTOS",
      labelEn: "ALL PRODUCTS",
      section: "catalogo",
      category: "all",
    },
    {
      key: "louis-vuitton",
      labelEs: "LOUIS VUITTON",
      labelEn: "LOUIS VUITTON",
      section: "catalogo",
      category: "louis-vuitton",
    },
    {
      key: "dior-casablanca",
      labelEs: "DIOR & CASABLANCA",
      labelEn: "DIOR & CASABLANCA",
      section: "catalogo",
      category: "dior-casablanca",
    },
    {
      key: "offwhite-dsquared2",
      labelEs: "OFF-WHITE & DSQUARED2",
      labelEn: "OFF-WHITE & DSQUARED2",
      section: "catalogo",
      category: "offwhite-dsquared2",
    },
    {
      key: "prada-fendi-dg",
      labelEs: "PRADA • FENDI • D&G",
      labelEn: "PRADA • FENDI • D&G",
      section: "catalogo",
      category: "prada-fendi-dg",
    },
    {
      key: "urbano-luxury",
      labelEs: "LUXURY STREETWEAR",
      labelEn: "LUXURY STREETWEAR",
      section: "catalogo",
      category: "urbano-luxury",
    },
    {
      key: "fotoset",
      labelEs: "FOTOSET & VIDEOS (LOOKBOOK)",
      labelEn: "PHOTOSET & VIDEOS (LOOKBOOK)",
      section: "fotoset",
    },
    {
      key: "turquia",
      labelEs: "FÁBRICA DE TURQUÍA • NOSOTROS",
      labelEn: "TURKISH FACTORY • ABOUT US",
      section: "turquia",
    },
  ];

  const handleMenuClick = (item: (typeof sidebarItems)[number]) => {
    setActiveMenuKey(item.key);
    if (onSelectMenu) {
      onSelectMenu(item.section, item.category, item.key);
    }
    setTimeout(() => {
      setIsSidebarOpen(false);
      const el = document.getElementById(item.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 220);
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#151513] border-b border-white/10 text-[11px] tracking-wider text-[#f3f0e9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 min-h-[40px] py-1.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left Location */}
          <div className="flex items-center gap-2 text-xs text-[#d4cfc4]">
            <span className="text-[#d4af37] text-base leading-none">◦</span>
            <span>{locale === "es" ? STORE_CONFIG.locationEs : STORE_CONFIG.locationEn}</span>
          </div>

          {/* Center Promo */}
          <div className="hidden xl:flex items-center gap-2 text-[#d4af37] font-semibold tracking-[0.14em] text-[10px] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>{t.topBarPromo}</span>
          </div>

          {/* Right Contact + WhatsApp Icon + Language */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-[#38bdf8] font-bold transition"
              title="WhatsApp Oficial VNex Market"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="tracking-wide text-xs">{STORE_CONFIG.whatsappDisplay}</span>
            </a>

            <button
              onClick={toggleShowVes}
              className="px-2.5 py-1 rounded border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer"
            >
              {showVes ? `Bs. (${vesRate})` : "$ USD"}
            </button>

            <button
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              className="px-2.5 py-1 rounded border border-[#38bdf8]/50 text-[#38bdf8] hover:bg-[#38bdf8]/15 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer"
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-30 bg-[#10100f]/92 backdrop-blur-md border-b border-white/12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 min-h-[82px] flex items-center justify-between relative">
          {/* Left: MENÚ Trigger with Sky-Blue Oval Pill Frame */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase transition cursor-pointer ${
                isSidebarOpen
                  ? "border-2 border-[#38bdf8] bg-[#38bdf8]/20 text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                  : "border border-[#38bdf8]/60 bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8]/20 hover:border-[#38bdf8] shadow-[0_0_14px_rgba(56,189,248,0.2)]"
              }`}
            >
              <Menu className="w-4 h-4 text-[#38bdf8]" />
              <span>{t.menuButton}</span>
            </button>

            <a
              href="#fotoset"
              onClick={() => setActiveMenuKey("fotoset")}
              className={`hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase transition ${
                activeMenuKey === "fotoset"
                  ? "border border-[#38bdf8] bg-[#38bdf8]/15 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                  : "text-[#d4cfc4] hover:text-[#38bdf8]"
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>{t.navLookbook}</span>
            </a>
          </div>

          {/* Center: 3D Rotating Coin Logo + Luxury Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            <div className="coin-stage">
              <div className="coin-inner">
                <div className="coin-face">
                  <img
                    src={assetUrl("/logo/vnex-logo.jpg")}
                    alt="VNEX Market 3D Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="coin-face coin-face-back">
                  <img
                    src={assetUrl("/logo/vnex-logo.jpg")}
                    alt="VNEX Market 3D Logo Back"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="text-left">
              <div className="text-xl sm:text-[27px] font-bold tracking-[0.12em] leading-none flex items-center gap-2">
                <span className="wordmark-stroke-blue">VNEX</span>
                <span className="wordmark-stroke-white">MARKET</span>
              </div>
              <small className="block text-[8px] sm:text-[9px] tracking-[0.32em] uppercase text-[#99968e] mt-1">
                {locale === "es" ? STORE_CONFIG.subtitleEs : STORE_CONFIG.subtitleEn}
              </small>
            </div>
          </Link>

          {/* Right: Actions & Bag */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#turquia"
              onClick={() => setActiveMenuKey("turquia")}
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase transition ${
                activeMenuKey === "turquia"
                  ? "border border-[#38bdf8] bg-[#38bdf8]/15 text-[#38bdf8]"
                  : "border border-white/15 text-[#d4af37] hover:border-[#38bdf8] hover:text-[#38bdf8]"
              }`}
            >
              <span>🇹🇷 {locale === "es" ? "Calidad Turquía" : "Turkish Quality"}</span>
            </a>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-[#f3f0e9] hover:text-[#38bdf8] transition cursor-pointer"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-[#f3f0e9] hover:text-[#d4af37] transition cursor-pointer"
              aria-label="Carrito"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#d4af37] text-[#111] text-[9px] font-extrabold flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />

          {/* Sidebar Panel — Deep Midnight Blue & Luxury Gold/Sky-Blue Palette */}
          <aside className="relative z-10 w-full max-w-[430px] h-full flex flex-col justify-between p-7 sm:p-8 bg-gradient-to-b from-[#0b1528] via-[#0e1b33] to-[#09101d] border-r border-[#38bdf8]/30 shadow-[0_0_50px_rgba(0,0,0,0.85)] animate-drawer-left overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-5 border-b border-[#38bdf8]/20">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#38bdf8] block">
                    {t.sidebarSubtitle}
                  </span>
                  <h2 className="font-serif-luxury text-2xl sm:text-[26px] font-semibold text-white tracking-wide mt-1">
                    {t.sidebarHeading}
                  </h2>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-full border border-[#38bdf8]/40 bg-[#38bdf8]/10 hover:bg-[#38bdf8] text-[#38bdf8] hover:text-[#09101d] flex items-center justify-center transition cursor-pointer"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Input inside Sidebar */}
              <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-full border border-[#38bdf8]/35 bg-[#070d19]/70 focus-within:border-[#38bdf8] focus-within:shadow-[0_0_16px_rgba(56,189,248,0.25)] transition">
                <Search className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent text-xs text-white placeholder-[#94a3b8] focus:outline-none"
                />
              </div>

              {/* Section Label */}
              <p className="mt-7 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase text-[#94a3b8] px-2">
                {locale === "es"
                  ? "SELECCIONA UNA CATEGORÍA (MARCO AZUL)"
                  : "SELECT A CATEGORY (BLUE FRAME)"}
              </p>

              {/* Sidebar Menu Items with Oval Sky-Blue Highlight */}
              <nav className="flex flex-col space-y-1.5">
                {sidebarItems.map((item) => {
                  const isActive =
                    activeMenuKey === item.key ||
                    (item.category && item.category === selectedCategory && activeMenuKey === item.key);
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleMenuClick(item)}
                      className={`sidebar-menu-item ${isActive ? "active-oval" : ""}`}
                    >
                      <span>{locale === "es" ? item.labelEs : item.labelEn}</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isActive ? "text-[#38bdf8] translate-x-1" : "text-[#64748b]"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Footer Contact with WhatsApp Emblem */}
            <div className="mt-8 pt-6 border-t border-[#38bdf8]/20 space-y-3 text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src={assetUrl("/logo/vnex-logo.jpg")}
                  alt="VNEX Market"
                  className="w-9 h-9 rounded-full object-cover border border-[#38bdf8]"
                />
                <div>
                  <p className="font-serif-luxury font-bold text-white tracking-wider">
                    VNEX MARKET BOUTIQUE
                  </p>
                  <p className="text-[11px] text-[#94a3b8]">
                    {locale === "es" ? STORE_CONFIG.locationEs : STORE_CONFIG.locationEn}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#070d19]/90 border border-[#38bdf8]/25 space-y-2">
                <p className="text-[11px] text-[#38bdf8] font-bold uppercase tracking-wider">
                  🇹🇷 {locale === "es" ? "Importación Directa de Turquía" : "Direct Turkish Import"}
                </p>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  {locale === "es"
                    ? "100% Nuevo con etiqueta original y certificado de calidad. Precio único: $20.00 USD."
                    : "100% Brand new with original tags and quality certificate. Flat price: $20.00 USD."}
                </p>
              </div>

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366] text-white font-bold text-xs transition shadow-[0_0_16px_rgba(37,211,102,0.2)]"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp: {STORE_CONFIG.whatsappDisplay}</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
