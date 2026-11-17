"use client";

import React from "react";
import { MapPin, PhoneCall, Instagram, CreditCard, ShieldCheck } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";

export function Footer() {
  const { locale } = useStore();
  const t = DICTIONARY[locale];

  return (
    <footer className="bg-[#091b3a] text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={assetUrl("/logo/vnex-logo.jpg")}
                alt="VNex Market"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  VNex <span className="text-blue-400">Market</span>
                </h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest">
                  Online Store • Venezuela
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {locale === "es"
                ? "Tienda oficial en Maracay, Estado Aragua. Camisetas y franelas exclusivas a $20 USD con atención personalizada por WhatsApp."
                : "Official store in Maracay, Aragua State. Exclusive T-shirts at $20 USD with direct personalized support on WhatsApp."}
            </p>
          </div>

          {/* Column 2: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.navContact}
            </h4>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>
                {locale === "es" ? STORE_CONFIG.locationEs : STORE_CONFIG.locationEn}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white font-semibold transition"
              >
                WhatsApp: {STORE_CONFIG.whatsappDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white font-semibold transition"
              >
                Instagram: {STORE_CONFIG.instagramHandle}
              </a>
            </div>
          </div>

          {/* Column 3: Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-400" />
              {t.paymentMethodsSectionTitle}
            </h4>
            <div className="flex flex-wrap gap-2">
              {STORE_CONFIG.paymentMethods.map((pm) => (
                <span
                  key={pm.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-xs font-bold text-white"
                >
                  {locale === "es" ? pm.nameEs : pm.nameEn}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              {locale === "es"
                ? "Compra segura sin registro obligatorio • Confirmación directa"
                : "Safe guest checkout • Direct order confirmation"}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} {STORE_CONFIG.name}. {t.rightsReserved}
          </p>
          <p className="text-slate-500">
            PWA & Telegram Mini App Ready Architecture • Next.js + Supabase
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(
          locale === "es"
            ? "¡Hola VNex Market! Quiero consultar disponibilidad de camisetas ($20 USD) en Maracay."
            : "Hello VNex Market! I would like to check T-shirt availability ($20 USD) in Maracay."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition"
      >
        <PhoneCall className="w-4 h-4" />
        <span>WhatsApp</span>
      </a>
    </footer>
  );
}
