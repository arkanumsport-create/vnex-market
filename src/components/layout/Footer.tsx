"use client";

import React from "react";
import { MapPin, CreditCard, ShieldCheck, Award } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const { locale } = useStore();
  const t = DICTIONARY[locale];

  return (
    <footer className="bg-[#141412] text-[#99968e] border-t border-white/12 mt-24">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Luxury Brand & Turkish Origin */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src={assetUrl("/logo/vnex-logo.jpg")}
                alt="VNEX Market"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#38bdf8]"
              />
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#f3f0e9] tracking-[0.12em]">
                  VNEX <span className="text-[#38bdf8]">MARKET</span>
                </h3>
                <p className="text-[9px] text-[#d4af37] uppercase tracking-[0.28em]">
                  EXCLUSIVE BOUTIQUE • TURKISH LUXURY
                </p>
              </div>
            </div>
            <p className="text-xs text-[#aaa69e] leading-relaxed max-w-md">
              {locale === "es"
                ? "Suministro directo desde las mejores fábricas textiles de Turquía. Todas nuestras prendas son 100% nuevas, con etiqueta original de fábrica y certificado de calidad internacional."
                : "Direct supply from premier textile factories in Turkey. Every garment is 100% brand new with original factory tags and international quality certification."}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>
                {locale === "es"
                  ? "Importación Directa de Turquía • Precio Único $20.00 USD"
                  : "Direct Turkish Import • Flat Price $20.00 USD"}
              </span>
            </div>
          </div>

          {/* Column 2: Contact & WhatsApp with Emblem */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold uppercase tracking-[0.16em] text-[#f3f0e9]">
              {locale === "es" ? "CONTACTO & UBICACIÓN" : "CONTACT & LOCATION"}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#d4cfc4]">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{locale === "es" ? STORE_CONFIG.locationEs : STORE_CONFIG.locationEn}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#38bdf8] font-bold tracking-wide transition"
              >
                WhatsApp: {STORE_CONFIG.whatsappDisplay}
              </a>
            </div>
          </div>

          {/* Column 3: Payment Methods */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold uppercase tracking-[0.16em] text-[#f3f0e9] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#d4af37]" />
              <span>{t.paymentMethodsSectionTitle}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {STORE_CONFIG.paymentMethods.map((pm) => (
                <span
                  key={pm.id}
                  className="px-3 py-1.5 bg-[#1d1d1a] border border-white/15 text-[10px] font-bold uppercase tracking-wider text-[#f3f0e9]"
                >
                  {pm.badge}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#99968e] pt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>
                {locale === "es"
                  ? "100% Nuevo con etiqueta y certificado"
                  : "100% Brand new with tags & certificate"}
              </span>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#99968e] gap-4">
          <p>
            © {new Date().getFullYear()} {STORE_CONFIG.name}. {t.rightsReserved}
          </p>
          <p className="text-[10px] tracking-widest uppercase text-[#d4af37]">
            TURKISH FACTORY DIRECT • MARACAY, VENEZUELA
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button with Authentic WhatsApp Icon */}
      <a
        href={`https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(
          locale === "es"
            ? "¡Hola VNEX MARKET! Quiero consultar disponibilidad de franelas importadas de Turquía ($20 USD) en Maracay."
            : "Hello VNEX MARKET! I would like to check availability of Turkish imported T-shirts ($20 USD) in Maracay."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#171715] hover:bg-[#1f1f1c] border border-[#25D366] text-white font-bold text-xs tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span>{STORE_CONFIG.whatsappDisplay}</span>
      </a>
    </footer>
  );
}
