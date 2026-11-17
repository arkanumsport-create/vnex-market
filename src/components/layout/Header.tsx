"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Globe, PhoneCall, ShieldCheck, RefreshCw } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";

export function Header() {
  const { locale, setLocale, showVes, toggleShowVes, vesRate, cart, setCartOpen } = useStore();
  const t = DICTIONARY[locale];
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Promo Bar */}
      <div className="bg-[#091b3a] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <p className="font-medium tracking-wide truncate">{t.topBarPromo}</p>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={toggleShowVes}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-900/80 hover:bg-blue-800 text-[11px] font-semibold border border-blue-700 transition cursor-pointer"
              title="Cambiar visualización USD / Bs."
            >
              <RefreshCw className="w-3 h-3" />
              {showVes ? `Bs. (Tasa: ${vesRate})` : "$ USD"}
            </button>

            <div className="inline-flex items-center rounded bg-slate-800 p-0.5 border border-slate-700">
              <button
                onClick={() => setLocale("es")}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition cursor-pointer ${
                  locale === "es" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`px-2 py-0.5 text-[11px] font-bold rounded transition cursor-pointer ${
                  locale === "en" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src={assetUrl("/logo/vnex-logo.jpg")}
            alt="VNex Market Logo"
            className="w-13 h-13 rounded-full object-cover border-2 border-blue-600 shadow-sm group-hover:scale-105 transition"
          />
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#091b3a] block leading-none">
              VNex <span className="text-blue-600">Market</span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 block mt-1">
              Maracay • Aragua
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-blue-600 transition">
            {t.navHome}
          </Link>
          <a href="#catalogo" className="hover:text-blue-600 transition">
            {t.navCatalog}
          </a>
          <a href="#pagos" className="hover:text-blue-600 transition">
            {t.paymentMethodsSectionTitle}
          </a>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            {t.navAdmin}
          </Link>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{STORE_CONFIG.whatsappDisplay}</span>
          </a>

          <button
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer"
            title="Switch Language / Cambiar Idioma"
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>{locale === "es" ? "ES 🇻🇪" : "EN 🇺🇸"}</span>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#091b3a] hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{ locale === "es" ? "Carrito" : "Cart" }</span>
            {totalItems > 0 && (
              <span className="ml-0.5 px-2 py-0.5 text-xs rounded-full bg-red-600 text-white font-extrabold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
