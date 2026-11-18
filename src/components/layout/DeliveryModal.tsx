"use client";

import React from "react";
import {
  X,
  Truck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Clock,
  Wallet,
  PackageCheck,
} from "lucide-react";
import { useStore } from "@/stores/useStore";
import { STORE_CONFIG, assetUrl } from "@/lib/config";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function DeliveryBadgeButton({
  onClick,
  size = "md",
}: {
  onClick: () => void;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-[#38bdf8] bg-[#38bdf8]/12 hover:bg-[#38bdf8]/25 shadow-[0_0_18px_rgba(56,189,248,0.32)] transition cursor-pointer whitespace-nowrap ${
        size === "sm" ? "px-3.5 py-1 text-[10px]" : "px-4 py-1.5 text-[11px]"
      }`}
      title="Ver métodos de envío, Grupo ZOOM y Pago al Recibir (COD)"
    >
      <Truck className="w-3.5 h-3.5 text-[#ff1f32] shrink-0" />
      <span className="text-[#ff1f32] font-extrabold tracking-[0.16em] uppercase">
        DELIVERY
      </span>
    </button>
  );
}

export function DeliveryModal() {
  const { locale, isDeliveryModalOpen, setDeliveryModalOpen } = useStore();

  if (!isDeliveryModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[75] grid place-items-center p-3 sm:p-6 bg-black/82 backdrop-blur-sm overflow-y-auto"
      onClick={() => setDeliveryModalOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[92vh] flex flex-col border border-[#38bdf8]/45 bg-[#121622] text-[#f3f0e9] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.94)] animate-modal-rise"
      >
        {/* Top Header Bar: VNex Market in Blue + online store + Close X */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#0b1220] border-b border-[#38bdf8]/30 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={assetUrl("/logo/vnex-logo.jpg")}
              alt="VNex Market"
              className="w-10 h-10 rounded-full object-cover border border-[#38bdf8]"
            />
            <div>
              <span className="block font-serif-luxury text-lg sm:text-xl font-extrabold text-[#38bdf8] leading-none">
                VNex Market
              </span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-[#cbd5e1] mt-1">
                online store • DELIVERY & ENVÍOS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border-2 border-[#38bdf8] bg-[#38bdf8]/15 text-[#ff1f32] text-[10px] font-extrabold tracking-[0.18em] uppercase">
              <Truck className="w-3.5 h-3.5 text-[#ff1f32]" />
              <span>DELIVERY / COD</span>
            </span>

            <button
              onClick={() => setDeliveryModalOpen(false)}
              aria-label="Cerrar"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff1f32] text-white border border-white/25 grid place-items-center transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Top Highlight Banner: Delivery + Payment on Receipt (COD) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d1b33] via-[#132342] to-[#0d1b33] border border-[#38bdf8]/45 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#38bdf8]">
                <Wallet className="w-4 h-4 text-[#d4af37]" />
                <span>
                  {locale === "es"
                    ? "¡ENVÍOS A TODA VENEZUELA Y PAGO AL RECIBIR (COD)!"
                    : "NATIONWIDE SHIPPING & PAYMENT ON DELIVERY (COD)!"}
                </span>
              </div>
              <p className="text-xs text-[#e2e8f0] leading-relaxed">
                {locale === "es"
                  ? "Contamos con Delivery local en Maracay (con pago en Efectivo USD al recibir) y envíos nacionales con modalidad Cobro en Destino (COD): compras tu prenda y pagas el envío al retirar tu paquete."
                  : "We offer local Delivery in Maracay (with Cash USD payment on receipt) and nationwide shipping with Cash on Delivery (COD): buy your garment and pay the shipping fee when picking up your parcel."}
              </p>
            </div>
          </div>

          {/* Featured Operator: GRUPO ZOOM */}
          <div className="p-5 rounded-2xl bg-[#0b1220] border-2 border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.2)] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#38bdf8] text-[#08101f] text-[10px] font-black uppercase tracking-widest">
                  RECOMENDADO ⭐
                </span>
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-white">
                  Grupo ZOOM{" "}
                  <span className="text-xs font-sans font-semibold text-[#38bdf8]">
                    {locale === "es"
                      ? "(Servicio Rápido y Tecnológico)"
                      : "(Fast & Tech-Driven Logistics)"}
                  </span>
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-extrabold uppercase tracking-wider">
                Cobro en Destino (COD) Activo
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="font-bold text-[#38bdf8] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    {locale === "es" ? "Características:" : "Key Features:"}
                  </span>
                </p>
                <p className="text-[#cbd5e1] text-[11px] leading-relaxed">
                  {locale === "es"
                    ? "Uno de los operadores más antiguos y confiables de Venezuela con control logístico de alta calidad. Excelente para envíos comerciales y comercio electrónico."
                    : "One of the oldest and most reliable operators in Venezuela with high-quality logistics control. Ideal for commercial shipments and e-commerce."}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="font-bold text-[#d4af37] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {locale === "es" ? "Velocidad y Rutas:" : "Speed & Pricing:"}
                  </span>
                </p>
                <p className="text-[#cbd5e1] text-[11px] leading-relaxed">
                  {locale === "es"
                    ? "Elegido frecuentemente para entrega exprés entre las principales ciudades (por ejemplo: Maracay — Caracas — Valencia — Barquisimeto)."
                    : "Frequently chosen for express delivery between major cities (e.g., Maracay — Caracas — Valencia — Barquisimeto)."}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <p className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>
                    {locale === "es"
                      ? "Pago al Recibir (COD):"
                      : "Cash on Delivery (COD):"}
                  </span>
                </p>
                <p className="text-[#cbd5e1] text-[11px] leading-relaxed">
                  {locale === "es"
                    ? "Soportado especialmente para la comodidad de las ventas online: el cliente compra el producto y paga el envío al momento de recibirlo."
                    : "Actively used and supported for online shopping convenience: the customer buys the item and pays for shipping upon receipt."}
                </p>
              </div>
            </div>
          </div>

          {/* Other Popular Shipping Methods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* MRW */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/12 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif-luxury text-base font-bold text-white">
                  MRW Venezuela
                </span>
                <span className="text-[10px] font-bold text-[#38bdf8] uppercase">COD</span>
              </div>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                {locale === "es"
                  ? "La red más amplia de agencias en todo el país. Envío rápido a oficina con modalidad Cobro en Destino (pagas el flete al retirar)."
                  : "The largest agency network nationwide. Fast office pickup with Cash on Delivery (pay shipping fee upon pickup)."}
              </p>
            </div>

            {/* TEALCA & DOMESA */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/12 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif-luxury text-base font-bold text-white">
                  TEALCA / DOMESA
                </span>
                <span className="text-[10px] font-bold text-[#38bdf8] uppercase">COD</span>
              </div>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                {locale === "es"
                  ? "Envíos asegurados a nivel nacional con rastreo de guía en tiempo real y pago del envío en destino al recibir."
                  : "Insured nationwide parcels with real-time tracking and shipping payment upon delivery."}
              </p>
            </div>

            {/* Local Delivery Maracay & Pickup */}
            <div className="p-4 rounded-2xl bg-white/5 border border-[#d4af37]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif-luxury text-base font-bold text-[#d4af37]">
                  Delivery Maracay
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">
                  {locale === "es" ? "Mismo Día" : "Same Day"}
                </span>
              </div>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                {locale === "es"
                  ? "Entrega inmediata en Maracay (con opción de pagar en Efectivo USD al recibir) o retiro gratis en Plaza La Soledad, Calle 9."
                  : "Same-day delivery in Maracay (with Cash USD payment on receipt) or free pickup at Plaza La Soledad, Street 9."}
              </p>
            </div>
          </div>

          {/* Rules & Conditions of Shipping */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1220] border border-white/12 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#38bdf8] flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-[#d4af37]" />
              <span>
                {locale === "es"
                  ? "REGLAS DE ENVÍO, ENTREGA Y PAGO AL RECIBIR:"
                  : "SHIPPING, DELIVERY & COD RULES:"}
              </span>
            </h4>
            <ul className="space-y-2 text-xs text-[#cbd5e1]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {locale === "es"
                    ? "1. En Maracay (Estado Aragua): Puedes retirar personalmente en Plaza La Soledad, Calle 9 o solicitar Delivery local y pagar en Efectivo USD al recibir tu prenda."
                    : "1. In Maracay (Aragua State): Pick up in person at Plaza La Soledad, Street 9 or request local Delivery and pay in Cash USD upon receiving your garment."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {locale === "es"
                    ? "2. Envíos Nacionales (Grupo ZOOM, MRW, Tealca, Domesa): El cliente selecciona su agencia preferida. La prenda ($20.00 USD) se confirma por Zelle o Pago Móvil, y el costo del envío viaja bajo modalidad Cobro en Destino (COD) para pagar al retirar."
                    : "2. Nationwide Shipping (Grupo ZOOM, MRW, Tealca, Domesa): Choose your preferred agency. The garment ($20.00 USD) is confirmed via Zelle or Pago Móvil, and the shipping fee is billed as Cash on Delivery (COD) upon pickup."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {locale === "es"
                    ? "3. Despacho y Guía de Rastreo: Todos los pedidos se despachan empacados con su etiqueta y certificado de fábrica turca. Enviamos foto del comprobante/guía de envío por WhatsApp (+58 412-3776184)."
                    : "3. Dispatch & Tracking: All orders are shipped sealed with original Turkish factory tags and certificate. We send a photo of the tracking receipt via WhatsApp (+58 412-3776184)."}
                </span>
              </li>
            </ul>
          </div>

          {/* Bottom Location & WhatsApp Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-[#d4cfc4]">
              <MapPin className="w-4 h-4 text-[#ff1f32] shrink-0" />
              <span>
                <strong>VNex Market:</strong>{" "}
                {locale === "es" ? STORE_CONFIG.locationEs : STORE_CONFIG.locationEn}
              </span>
            </div>

            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(
                locale === "es"
                  ? "¡Hola VNex Market! Quiero consultar sobre el envío por Grupo ZOOM / Delivery en Maracay."
                  : "Hello VNex Market! I would like to ask about Grupo ZOOM shipping / local Delivery in Maracay."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs tracking-wider uppercase whitespace-nowrap shrink-0 transition"
            >
              <WhatsAppIcon className="w-4 h-4" withBadge={false} />
              <span>{STORE_CONFIG.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
