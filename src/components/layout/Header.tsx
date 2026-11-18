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
  Smartphone,
  Truck,
  MapPin,
} from "lucide-react";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { PwaBadgeIcon } from "./PwaInstallModal";
import { DeliveryBadgeButton } from "./DeliveryModal";

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
  const {
    locale,
    setLocale,
    showVes,
    toggleShowVes,
    vesRate,
    cart,
    setCartOpen,
    setPwaModalOpen,
    setDeliveryModalOpen,
  } = useStore();
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
    {
      key: "ubicacion",
      labelEs: "MAPA • PLAZA LA SOLEDAD CALLE 9",
      labelEn: "MAP • PLAZA LA SOLEDAD STREET 9",
      section: "ubicacion",
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

  const handleWebAppClick = () => {
    setActiveMenuKey("webapp-pwa");
    setTimeout(() => {
      setIsSidebarOpen(false);
      setPwaModalOpen(true);
    }, 180);
  };

  const handleDeliveryMenuClick = () => {
    setActiveMenuKey("delivery-modal");
    setTimeout(() => {
      setIsSidebarOpen(false);
      setDeliveryModalOpen(true);
    }, 180);
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#151513] border-b border-white/10 text-[11px] tracking-wider text-[#f3f0e9]">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          {/* Left Location */}
          <a
            href="#ubicacion"
            className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#d4cfc4] hover:text-[#38bdf8] transition min-w-0"
          >
            <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">
              {locale === "es" ? STORE_CONFIG.shortLocationEs : STORE_CONFIG.shortLocationEn}
            </span>
          </a>

          {/* Center Promo */}
          <div className="hidden xl:flex items-center gap-2 text-[#d4af37] font-semibold tracking-[0.14em] text-[10px] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>{t.topBarPromo}</span>
          </div>

          {/* Right Contact + WhatsApp Icon + Language */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white hover:text-[#38bdf8] font-bold transition whitespace-nowrap"
              title="WhatsApp Oficial VNex Market"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="tracking-wide text-[11px] sm:text-xs">
                {STORE_CONFIG.whatsappDisplay}
              </span>
            </a>

            <button
              onClick={toggleShowVes}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer"
            >
              {showVes ? `Bs. (${vesRate})` : "$ USD"}
            </button>

            <button
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#38bdf8]/50 text-[#38bdf8] hover:bg-[#38bdf8]/15 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer"
            >
              {locale === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-30 bg-[#10100f]/94 backdrop-blur-md border-b border-white/12">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-8 py-2.5 lg:py-0 lg:min-h-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 relative">
          {/* Row 1 (Mobile) / Main Row (Desktop) */}
          <div className="w-full flex items-center justify-between gap-2">
            {/* Left: MENÚ Trigger with Sky-Blue Oval Pill Frame */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className={`inline-flex items-center gap-1.5 sm:gap-2.5 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase transition cursor-pointer ${
                  isSidebarOpen
                    ? "border-2 border-[#38bdf8] bg-[#38bdf8]/20 text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                    : "border border-[#38bdf8]/60 bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8]/20 hover:border-[#38bdf8] shadow-[0_0_14px_rgba(56,189,248,0.2)]"
                }`}
              >
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38bdf8]" />
                <span>{t.menuButton}</span>
              </button>

              <a
                href="#fotoset"
                onClick={() => setActiveMenuKey("fotoset")}
                className={`hidden xl:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase transition ${
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
              className="flex items-center gap-2 sm:gap-3.5 group lg:absolute lg:left-1/2 lg:-translate-x-1/2 min-w-0"
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

              <div className="text-left min-w-0">
                <div className="text-[15px] sm:text-[26px] font-bold tracking-[0.08em] sm:tracking-[0.12em] leading-none flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                  <span className="wordmark-stroke-blue">VNEX</span>
                  <span className="wordmark-stroke-white">MARKET</span>
                </div>
                <small className="block text-[6.5px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.32em] uppercase text-[#99968e] mt-1 truncate">
                  {locale === "es" ? STORE_CONFIG.subtitleEs : STORE_CONFIG.subtitleEn}
                </small>
              </div>
            </Link>

            {/* Right: Desktop DELIVERY + PWA + Search + Bag (Mobile shows Search + Bag here, DELIVERY + PWA neatly in Row 2) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <div className="hidden lg:flex items-center gap-2.5">
                <DeliveryBadgeButton onClick={() => setDeliveryModalOpen(true)} />

                <button
                  onClick={() => setPwaModalOpen(true)}
                  title={
                    locale === "es"
                      ? "Instalar Aplicación Web (PWA)"
                      : "Install Web Application (PWA)"
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-[#38bdf8] bg-[#38bdf8]/15 hover:bg-[#38bdf8] text-[#38bdf8] hover:text-[#08101f] text-[11px] font-extrabold tracking-[0.14em] uppercase shadow-[0_0_16px_rgba(56,189,248,0.28)] transition cursor-pointer whitespace-nowrap"
                >
                  <PwaBadgeIcon className="w-3.5 h-3.5" />
                  <span>PWA</span>
                </button>
              </div>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 sm:p-2 text-[#f3f0e9] hover:text-[#38bdf8] transition cursor-pointer"
                aria-label="Buscar"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-1.5 sm:p-2 text-[#f3f0e9] hover:text-[#d4af37] transition cursor-pointer"
                aria-label="Carrito"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#d4af37] text-[#111] text-[9px] font-extrabold flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Row 2: Centered DELIVERY + PWA + Fotoset Pills (Prevents any horizontal overflow!) */}
          <div className="flex lg:hidden flex-wrap items-center justify-center gap-2 pt-1.5 border-t border-white/10">
            <DeliveryBadgeButton onClick={() => setDeliveryModalOpen(true)} size="sm" />

            <button
              onClick={() => setPwaModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border-2 border-[#38bdf8] bg-[#38bdf8]/15 text-[#38bdf8] text-[10px] font-extrabold tracking-[0.14em] uppercase shadow-[0_0_14px_rgba(56,189,248,0.25)] transition cursor-pointer whitespace-nowrap"
            >
              <PwaBadgeIcon className="w-3.5 h-3.5" />
              <span>PWA</span>
            </button>

            <a
              href="#fotoset"
              onClick={() => setActiveMenuKey("fotoset")}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/20 text-[#d4cfc4] hover:text-[#38bdf8] text-[10px] font-bold tracking-[0.12em] uppercase whitespace-nowrap"
            >
              <Camera className="w-3 h-3 text-[#38bdf8]" />
              <span>Fotoset</span>
            </a>
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
                    (item.category &&
                      item.category === selectedCategory &&
                      activeMenuKey === item.key);
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

                {/* Dedicated DELIVERY & PWA Buttons inside Sidebar Menu */}
                <div className="pt-3 mt-2 border-t border-[#38bdf8]/20 space-y-2">
                  {/* DELIVERY Button in Sidebar */}
                  <button
                    onClick={handleDeliveryMenuClick}
                    className={`sidebar-menu-item ${
                      activeMenuKey === "delivery-modal" ? "active-oval" : ""
                    } border-2 border-[#38bdf8] bg-[#38bdf8]/12`}
                  >
                    <span className="inline-flex items-center gap-2.5 text-[#ff1f32] font-extrabold">
                      <Truck className="w-4 h-4 text-[#ff1f32] shrink-0" />
                      <span>
                        {locale === "es"
                          ? "ENVÍOS & DELIVERY (ZOOM / COD)"
                          : "SHIPPING & DELIVERY (ZOOM / COD)"}
                      </span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full border border-[#38bdf8] bg-[#38bdf8]/20 text-[#ff1f32] text-[10px] font-extrabold tracking-widest uppercase">
                      DELIVERY
                    </span>
                  </button>

                  {/* WEB APPLICATION (PWA) Button in Sidebar */}
                  <button
                    onClick={handleWebAppClick}
                    className={`sidebar-menu-item ${
                      activeMenuKey === "webapp-pwa" ? "active-oval" : ""
                    } border-[#38bdf8]/50 bg-[#38bdf8]/10 text-[#38bdf8]`}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-[#38bdf8] shrink-0" />
                      <span>
                        {locale === "es"
                          ? "APLICACIÓN WEB (PWA)"
                          : "WEB APPLICATION (PWA)"}
                      </span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#38bdf8] text-[#08101f] text-[10px] font-extrabold tracking-widest uppercase">
                      PWA
                    </span>
                  </button>
                </div>
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

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366] text-white font-bold text-xs transition shadow-[0_0_16px_rgba(37,211,102,0.2)] whitespace-nowrap"
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
