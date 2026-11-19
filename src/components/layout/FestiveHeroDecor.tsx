"use client";

import React, { useMemo } from "react";
import { X, Gift, Sparkles, CheckCircle2, ShoppingBag, Snowflake } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { STORE_CONFIG, assetUrl } from "@/lib/config";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Generates SVG polygon points for a multi-pointed starburst (36 outer angles > 30) */
function generateStarburstPoints(
  pointsCount: number,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number
): string {
  const coords: string[] = [];
  const totalVertices = pointsCount * 2;
  for (let i = 0; i < totalVertices; i++) {
    const angle = (Math.PI * 2 * i) / totalVertices - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    coords.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return coords.join(" ");
}

/** Realistic Snow-Dusted Pine Branch Cluster SVG for Hero Corners */
function SnowyPineCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Back dark evergreen needles */}
      <path
        d="M-6 -4 C40 10, 95 20, 185 16 C140 34, 102 42, 62 46 C96 54, 134 62, 165 58 C118 76, 72 82, 34 86 C56 98, 86 110, 108 118 C65 116, 28 110, -4 128 Z"
        fill="#0d3b26"
      />
      {/* Mid-tone rich spruce branches */}
      <path
        d="M-4 -2 C32 14, 78 24, 152 24 C112 36, 78 44, 42 46 C76 58, 108 64, 136 62 C92 78, 52 84, 18 92 C34 102, 54 110, 74 118 C36 112, 10 106, -4 114 Z"
        fill="#145a38"
      />
      {/* Individual pine needle highlights */}
      <g stroke="#1e7d4e" strokeWidth="2.2" strokeLinecap="round">
        <line x1="12" y1="8" x2="48" y2="28" />
        <line x1="36" y1="10" x2="78" y2="24" />
        <line x1="72" y1="14" x2="118" y2="22" />
        <line x1="108" y1="16" x2="156" y2="18" />
        <line x1="10" y1="30" x2="46" y2="54" />
        <line x1="32" y1="42" x2="82" y2="58" />
        <line x1="58" y1="54" x2="112" y2="62" />
        <line x1="8" y1="56" x2="36" y2="92" />
        <line x1="16" y1="78" x2="62" y2="106" />
      </g>
      {/* Frosted white snow caps resting on top of branches */}
      <path
        d="M4 2 C34 8, 72 16, 132 14 C112 22, 74 20, 42 14 Z"
        fill="#f1f5f9"
        fillOpacity="0.92"
      />
      <path
        d="M116 14 C140 16, 162 17, 184 15 C166 23, 140 24, 120 20 Z"
        fill="#e2e8f0"
        fillOpacity="0.88"
      />
      <path
        d="M28 42 C56 48, 92 54, 126 56 C102 62, 68 58, 36 50 Z"
        fill="#f8fafc"
        fillOpacity="0.86"
      />
      <path
        d="M10 74 C28 84, 52 94, 82 104 C56 104, 30 94, 12 82 Z"
        fill="#e2e8f0"
        fillOpacity="0.82"
      />
      {/* Red winter holly berries */}
      <circle cx="48" cy="34" r="4.5" fill="#dc2626" />
      <circle cx="56" cy="40" r="4" fill="#ef4444" />
      <circle cx="45" cy="43" r="3.8" fill="#b91c1c" />
      <circle cx="106" cy="30" r="3.6" fill="#dc2626" />
      <circle cx="113" cy="35" r="3.2" fill="#ef4444" />
      {/* Tiny specular highlights on berries */}
      <circle cx="46.5" cy="32.5" r="1.2" fill="#fecaca" />
      <circle cx="54.8" cy="38.8" r="1" fill="#fecaca" />
    </svg>
  );
}

/** Festive Snowy Pine & Twinkling Garland Frame for the Main Hero Banner */
export function HeroChristmasFrame() {
  const topLights = [
    { left: "4%", top: "6px", color: "#ffd166", delay: "0s", dur: "3.2s" },
    { left: "11%", top: "14px", color: "#ff4d6d", delay: "0.7s", dur: "3.8s" },
    { left: "18%", top: "9px", color: "#38bdf8", delay: "1.4s", dur: "3.5s" },
    { left: "26%", top: "15px", color: "#fff3b0", delay: "0.4s", dur: "4.1s" },
    { left: "34%", top: "8px", color: "#ffd166", delay: "1.9s", dur: "3.4s" },
    { left: "42%", top: "14px", color: "#ff4d6d", delay: "1.1s", dur: "3.9s" },
    { left: "50%", top: "9px", color: "#38bdf8", delay: "0.2s", dur: "3.6s" },
    { left: "58%", top: "15px", color: "#ffd166", delay: "1.6s", dur: "4.2s" },
    { left: "66%", top: "8px", color: "#fff3b0", delay: "0.9s", dur: "3.3s" },
    { left: "74%", top: "14px", color: "#ff4d6d", delay: "2.1s", dur: "3.7s" },
    { left: "82%", top: "9px", color: "#38bdf8", delay: "0.5s", dur: "4.0s" },
    { left: "90%", top: "14px", color: "#ffd166", delay: "1.3s", dur: "3.5s" },
    { left: "96%", top: "8px", color: "#fff3b0", delay: "0.8s", dur: "3.8s" },
  ];

  const bottomLights = [
    { left: "6%", bottom: "7px", color: "#38bdf8", delay: "0.6s", dur: "3.6s" },
    { left: "15%", bottom: "11px", color: "#ffd166", delay: "1.5s", dur: "4.0s" },
    { left: "25%", bottom: "6px", color: "#ff4d6d", delay: "0.3s", dur: "3.4s" },
    { left: "36%", bottom: "11px", color: "#fff3b0", delay: "1.8s", dur: "3.9s" },
    { left: "47%", bottom: "7px", color: "#ffd166", delay: "0.9s", dur: "3.5s" },
    { left: "58%", bottom: "11px", color: "#38bdf8", delay: "2.0s", dur: "4.2s" },
    { left: "69%", bottom: "6px", color: "#ff4d6d", delay: "0.4s", dur: "3.7s" },
    { left: "80%", bottom: "11px", color: "#ffd166", delay: "1.2s", dur: "3.3s" },
    { left: "91%", bottom: "7px", color: "#fff3b0", delay: "0.7s", dur: "3.8s" },
  ];

  const snowFlakes = [
    { left: "8%", delay: "0s", dur: "9s", size: 4 },
    { left: "19%", delay: "2.2s", dur: "11s", size: 3 },
    { left: "31%", delay: "4.5s", dur: "10s", size: 5 },
    { left: "46%", delay: "1.1s", dur: "12s", size: 3 },
    { left: "61%", delay: "3.6s", dur: "9.5s", size: 4 },
    { left: "74%", delay: "0.8s", dur: "11.5s", size: 3 },
    { left: "86%", delay: "5.2s", dur: "10.5s", size: 4 },
    { left: "94%", delay: "2.7s", dur: "12.5s", size: 3 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-25 overflow-hidden">
      {/* Subtle Top Evergreen Garland Strip with Snow Frosting */}
      <div
        className="absolute top-0 left-0 right-0 h-5 opacity-90"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(16,74,45,0.92) 0px, rgba(20,90,56,0.9) 24px, rgba(241,245,249,0.38) 28px, rgba(13,59,38,0.92) 48px)",
          maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
        }}
      />

      {/* Curved Garland Wire SVG across Top Edge */}
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-8 opacity-75"
        aria-hidden="true"
      >
        <path
          d="M0 6 Q 150 26, 300 8 T 600 8 T 900 8 T 1200 8"
          stroke="#1e5c3a"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M0 4 Q 150 22, 300 6 T 600 6 T 900 6 T 1200 6"
          stroke="#e2e8f0"
          strokeOpacity="0.45"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>

      {/* Four Lush Snowy Pine Branch Corners */}
      <SnowyPineCorner className="absolute -top-1 -left-1 w-32 sm:w-48 h-auto drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]" />
      <SnowyPineCorner className="absolute -top-1 -right-1 w-32 sm:w-48 h-auto -scale-x-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.65)]" />
      <SnowyPineCorner className="absolute -bottom-1 -left-1 w-28 sm:w-40 h-auto -scale-y-100 opacity-85 drop-shadow-[0_-4px_10px_rgba(0,0,0,0.65)]" />
      <SnowyPineCorner className="absolute -bottom-1 -right-1 w-28 sm:w-40 h-auto -scale-x-100 -scale-y-100 opacity-85 drop-shadow-[0_-4px_10px_rgba(0,0,0,0.65)]" />

      {/* Top Twinkling Garland Lights */}
      {topLights.map((light, i) => (
        <span
          key={`tl-${i}`}
          style={{
            left: light.left,
            top: light.top,
            backgroundColor: light.color,
            boxShadow: `0 0 8px 2px ${light.color}, 0 0 16px 3px ${light.color}80`,
            animationDelay: light.delay,
            animationDuration: light.dur,
          }}
          className="absolute w-2.5 h-2.5 rounded-full animate-twinkle-gentle"
        />
      ))}

      {/* Bottom Twinkling Garland Lights */}
      {bottomLights.map((light, i) => (
        <span
          key={`bl-${i}`}
          style={{
            left: light.left,
            bottom: light.bottom,
            backgroundColor: light.color,
            boxShadow: `0 0 7px 2px ${light.color}, 0 0 14px 2px ${light.color}75`,
            animationDelay: light.delay,
            animationDuration: light.dur,
          }}
          className="absolute w-2 h-2 rounded-full animate-twinkle-gentle"
        />
      ))}

      {/* Gentle Snowfall Particles */}
      {snowFlakes.map((flake, i) => (
        <span
          key={`sf-${i}`}
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `snow-fall-soft ${flake.dur} linear ${flake.delay} infinite`,
          }}
          className="absolute top-0 rounded-full bg-white/75 blur-[0.4px]"
        />
      ))}
    </div>
  );
}

/** 36-Pointed Starburst Polygon (>30 Angles) Promo Badge in Corner of Hero */
export function HolidayPromoStarburst({ onClick }: { onClick: () => void }) {
  const { locale } = useStore();
  // 36 outer peaks / angles (72 vertices total — strictly > 30 angles!)
  const polygonPoints = useMemo(() => generateStarburstPoints(36, 100, 100, 96, 84), []);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        locale === "es"
          ? "Abrir Promoción Especial de Navidad y Año Nuevo 3+1"
          : "Open Christmas and New Year Special 3+1 Promo"
      }
      className="group absolute top-5 right-4 sm:top-7 sm:right-7 z-35 w-[112px] h-[112px] sm:w-[138px] sm:h-[138px] flex items-center justify-center cursor-pointer focus:outline-none hover:scale-105 active:scale-95 transition-transform duration-300"
    >
      {/* Slowly Rotating 36-Angle Polygon Starburst */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-starburst-slow drop-shadow-[0_0_20px_rgba(255,31,50,0.48)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="vnexHolidayBurst" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d90429" />
            <stop offset="50%" stopColor="#9d0208" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>
        <polygon
          points={polygonPoints}
          fill="url(#vnexHolidayBurst)"
          stroke="#ffd166"
          strokeWidth="2.5"
        />
        <circle
          cx="100"
          cy="100"
          r="76"
          fill="#0c1424"
          fillOpacity="0.92"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeDasharray="4 3"
        />
      </svg>

      {/* Upright Inner Content (% + 3+1 + Bilingual Christmas/New Year Text) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 leading-tight">
        <div className="flex items-center justify-center gap-0.5">
          <span className="text-2xl sm:text-3xl font-black text-[#ffd166] drop-shadow-[0_0_8px_rgba(255,209,102,0.55)] leading-none">
            %
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#ff1f32] text-white text-[9px] sm:text-[10px] font-black tracking-tight">
            3+1
          </span>
        </div>

        <span className="mt-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[0.06em] text-white leading-[1.15]">
          {locale === "es" ? "PROMO FELIZ NAVIDAD" : "CHRISTMAS PROMO"}
        </span>
        <span className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-[0.06em] text-[#38bdf8] leading-[1.15]">
          {locale === "es" ? "& AÑO NUEVO" : "& NEW YEAR"}
        </span>
        <span className="mt-1 text-[7px] font-bold uppercase tracking-widest text-[#ffd166]/90 underline">
          {locale === "es" ? "VER OFERTA" : "VIEW OFFER"}
        </span>
      </div>
    </button>
  );
}

/** Separate Holiday 3+1 Promo Modal with Gentle, Eye-Friendly Twinkling Garland Frame */
export function HolidayPromoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { locale } = useStore();

  if (!isOpen) return null;

  // Soft, eye-friendly warm lights around the modal border (gentle opacity wave)
  const modalTopLights = [
    { left: "7%", color: "#ffd166", delay: "0s" },
    { left: "19%", color: "#38bdf8", delay: "0.8s" },
    { left: "31%", color: "#fff3b0", delay: "1.6s" },
    { left: "44%", color: "#ff6b81", delay: "2.4s" },
    { left: "56%", color: "#ffd166", delay: "0.4s" },
    { left: "69%", color: "#38bdf8", delay: "1.2s" },
    { left: "81%", color: "#fff3b0", delay: "2.0s" },
    { left: "93%", color: "#ffd166", delay: "2.8s" },
  ];

  const modalBottomLights = [
    { left: "10%", color: "#fff3b0", delay: "0.6s" },
    { left: "26%", color: "#ffd166", delay: "1.8s" },
    { left: "42%", color: "#38bdf8", delay: "0.2s" },
    { left: "58%", color: "#ff6b81", delay: "1.4s" },
    { left: "74%", color: "#ffd166", delay: "2.5s" },
    { left: "90%", color: "#38bdf8", delay: "0.9s" },
  ];

  const promoWhatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(
    locale === "es"
      ? "¡Hola VNex Market! 🎄✨ Quiero aprovechar la *PROMO NAVIDAD Y AÑO NUEVO 3+1* (compro 3 camisetas por $60 USD y me llevo la 4ta camiseta GRATIS). ¿Qué modelos y tallas tienen disponibles?"
      : "Hello VNex Market! 🎄✨ I want to claim the *CHRISTMAS & NEW YEAR 3+1 PROMO* (Buy 3 T-shirts for $60 USD and get the 4th T-shirt FREE). Which models and sizes are available?"
  )}`;

  const handleGoCatalog = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("catalogo");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div
      className="pwa-modal-safe fixed inset-0 z-[88] flex items-center justify-center px-3 sm:px-6 bg-black/82 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="pwa-modal-card relative w-full max-w-xl max-h-[90dvh] flex flex-col overflow-hidden rounded-3xl border-2 border-[#d4af37]/60 bg-[#111622] text-[#f3f0e9] shadow-[0_25px_70px_rgba(0,0,0,0.92)] animate-modal-rise"
      >
        {/* Subtle Soft-Twinkling Garland Lights Along Top Border (Eye-Friendly) */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-3 z-20">
          {modalTopLights.map((l, idx) => (
            <span
              key={`mt-${idx}`}
              style={{
                left: l.left,
                top: "3px",
                backgroundColor: l.color,
                boxShadow: `0 0 6px 1px ${l.color}99`,
                animationDelay: l.delay,
              }}
              className="absolute w-1.5 h-1.5 rounded-full animate-twinkle-modal-soft"
            />
          ))}
        </div>

        {/* Subtle Soft-Twinkling Garland Lights Along Bottom Border */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-3 z-20">
          {modalBottomLights.map((l, idx) => (
            <span
              key={`mb-${idx}`}
              style={{
                left: l.left,
                bottom: "3px",
                backgroundColor: l.color,
                boxShadow: `0 0 6px 1px ${l.color}99`,
                animationDelay: l.delay,
              }}
              className="absolute w-1.5 h-1.5 rounded-full animate-twinkle-modal-soft"
            />
          ))}
        </div>

        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 pt-5 pb-3.5 bg-[#0b1220] border-b border-[#d4af37]/30 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={assetUrl("/logo/vnex-logo.jpg")}
              alt="VNex Market"
              className="w-9 h-9 rounded-full object-cover border border-[#38bdf8] shrink-0"
            />
            <div className="min-w-0">
              <span className="block font-serif-luxury text-base sm:text-lg font-extrabold text-[#38bdf8] leading-none whitespace-nowrap">
                VNex Market
              </span>
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#ffd166] mt-1 truncate">
                {locale === "es"
                  ? "online store • PROMO NAVIDAD & AÑO NUEVO"
                  : "online store • CHRISTMAS & NEW YEAR PROMO"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar promoción"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff1f32] text-white border border-white/25 grid place-items-center transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Promo Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          {/* Hero 3+1 Offer Highlight Box */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#192338] via-[#131b2c] to-[#1d1419] border border-[#d4af37]/45 text-center space-y-2.5 overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ff1f32]/20 border border-[#ff1f32]/50 text-[#ffd166] text-[10px] font-extrabold uppercase tracking-[0.18em]">
              <Snowflake className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>
                {locale === "es"
                  ? "¡FELIZ NAVIDAD Y PRÓSPERO AÑO NUEVO!"
                  : "MERRY CHRISTMAS & HAPPY NEW YEAR!"}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="font-serif-luxury text-4xl sm:text-5xl font-black text-[#ffd166] tracking-wider">
                3 + 1
              </span>
              <span className="px-3 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366] text-[#25D366] text-xs font-extrabold uppercase tracking-wider">
                {locale === "es" ? "1 GRATIS" : "1 FREE"}
              </span>
            </div>

            <h3 className="font-serif-luxury text-lg sm:text-xl text-white font-bold">
              {locale === "es"
                ? "Compra 3 Camisetas y Llévate la 4ta ¡TOTALMENTE DE REGALO!"
                : "Buy 3 T-Shirts and Get the 4th One 100% FREE as a Gift!"}
            </h3>

            <p className="text-xs text-[#cbd5e1] max-w-md mx-auto leading-relaxed">
              {locale === "es"
                ? "Lleva 4 franelas premium importadas de Turquía por solo $60.00 USD (en lugar de $80.00 USD — ¡ahorras $20.00 USD al instante!)."
                : "Get 4 premium Turkish-imported T-shirts for only $60.00 USD (instead of $80.00 USD — instant $20.00 USD savings!)."}
            </p>
          </div>

          {/* Conditions Checklist */}
          <div className="p-4 rounded-2xl bg-[#0b1220] border border-white/12 space-y-2.5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#38bdf8] flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#ffd166]" />
              <span>
                {locale === "es" ? "CONDICIONES DE LA PROMOCIÓN 3+1:" : "3+1 PROMOTION TERMS:"}
              </span>
            </p>

            <ul className="space-y-2 text-xs text-[#cbd5e1]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {locale === "es"
                    ? "Al comprar cualquier 3 camisetas ($20 USD c/u = $60 USD), eliges tu 4ta camiseta completamente GRATIS."
                    : "When buying any 3 T-shirts ($20 USD each = $60 USD), you pick your 4th T-shirt completely FREE."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {locale === "es"
                    ? "Puedes combinar libremente marcas, diseños y tallas (S, M, L, XL) entre los 31 modelos del catálogo (Art. №001 – Art. №031)."
                    : "Mix and match any brands, designs, and sizes (S, M, L, XL) across all 31 catalog models (Art. №001 – Art. №031)."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {locale === "es"
                    ? "Las 4 prendas son 100% nuevas importadas directamente de fábrica en Turquía con etiqueta original y certificado de calidad."
                    : "All 4 garments are 100% brand new direct Turkish factory imports with original tags and quality certificate."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {locale === "es"
                    ? "Válido para retiro en Maracay (Plaza La Soledad, Calle 9), Delivery local y envíos por Grupo ZOOM (Pago al Recibir COD), MRW y Tealca. Pagos por Zelle, Pago Móvil y Efectivo USD."
                    : "Valid for pickup in Maracay (Plaza La Soledad, Street 9), local Delivery, and Grupo ZOOM (COD), MRW & Tealca shipping. Pay via Zelle, Pago Móvil, or Cash USD."}
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href={promoWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-[11px] tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" withBadge={false} />
              <span>{locale === "es" ? "PEDIR PROMO 3+1" : "CLAIM 3+1 PROMO"}</span>
            </a>

            <button
              type="button"
              onClick={handleGoCatalog}
              className="w-full py-3.5 px-4 rounded-full bg-[#d4af37] hover:bg-[#e5c247] text-[#111] font-extrabold text-[11px] tracking-wider uppercase flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>{locale === "es" ? "ELEGIR 4 MODELOS" : "PICK 4 MODELS"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
