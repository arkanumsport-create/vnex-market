"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ShoppingBag,
  Check,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Award,
  Tag,
  ShieldCheck,
  Maximize2,
  User,
  Truck,
} from "lucide-react";
import { PaymentMethodId, Product } from "@/types/store";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { DeliveryBadgeButton } from "@/components/layout/DeliveryModal";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const {
    locale,
    showVes,
    vesRate,
    addToCart,
    customerFullName,
    setCustomerFullName,
    setDeliveryModalOpen,
  } = useStore();
  const t = DICTIONARY[locale];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodId>("zelle");
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string>(
    "Grupo ZOOM (Cobro en Destino COD / Pago al Recibir)"
  );
  const [isLargePhotoOpen, setIsLargePhotoOpen] = useState(false);
  const [isLargeZoomed, setIsLargeZoomed] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImageIdx(0);
      setSelectedVariantId(product.variants[0]?.id || "");
      setIsLargePhotoOpen(false);
      setIsLargeZoomed(false);
    }
  }, [product]);

  if (!product) return null;

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const unitPrice = selectedVariant?.priceUsd ?? product.priceUsd;
  const priceDisplay = showVes
    ? `Bs. ${(unitPrice * vesRate).toFixed(2)} ($${unitPrice.toFixed(2)} USD)`
    : `$${unitPrice.toFixed(2)} USD`;

  const images = product.images.length > 0 ? product.images : ["/logo/vnex-logo.jpg"];
  const activeImage = assetUrl(images[selectedImageIdx] || images[0]);

  const pmObj =
    STORE_CONFIG.paymentMethods.find((p) => p.id === selectedPayment) ||
    STORE_CONFIG.paymentMethods[0];
  const selectedPaymentLabel = locale === "es" ? pmObj.nameEs : pmObj.nameEn;

  const handleAdd = () => {
    if (!selectedVariant || selectedVariant.stock <= 0) return;
    addToCart({
      productId: product.id,
      articleNumber: product.articleNumber,
      brand: product.brand,
      variantId: selectedVariant.id,
      sku: selectedVariant.sku,
      slug: product.slug,
      nameEs: product.nameEs,
      nameEn: product.nameEn,
      image: product.images[0] || "/logo/vnex-logo.jpg",
      size: selectedVariant.size,
      colorEs: selectedVariant.colorEs,
      colorEn: selectedVariant.colorEn,
      unitPriceUsd: unitPrice,
      quantity: 1,
      maxStock: selectedVariant.stock,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  const buyerName =
    customerFullName.trim() ||
    (locale === "es" ? "[Mi Nombre y Apellido]" : "[My First & Last Name]");

  const whatsappDirectLink = `https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(
    locale === "es"
      ? `¡Hola VNex Market! 👋\nSoy *${buyerName}*.\nQuiero comprar la siguiente camiseta:\n• *Art. №:* ${product.articleNumber}\n• *Marca:* ${product.brand}\n• *Modelo:* ${product.nameEs}\n• *Talla:* ${selectedVariant?.size}\n• *Color:* ${selectedVariant?.colorEs}\n• *Precio:* $${unitPrice.toFixed(2)} USD\n• *Método de Pago:* ${selectedPaymentLabel}\n• *Envío / Delivery:* ${selectedDeliveryOption}\n• *Tienda:* Maracay, Plaza La Soledad, Calle 9`
      : `Hello VNex Market! 👋\nMy name is *${buyerName}*.\nI want to buy the following T-shirt:\n• *Art. №:* ${product.articleNumber}\n• *Brand:* ${product.brand}\n• *Model:* ${product.nameEn}\n• *Size:* ${selectedVariant?.size}\n• *Color:* ${selectedVariant?.colorEn}\n• *Price:* $${unitPrice.toFixed(2)} USD\n• *Payment Method:* ${selectedPaymentLabel}\n• *Shipping / Delivery:* ${selectedDeliveryOption}\n• *Store:* Maracay, Plaza La Soledad, Street 9`
  )}`;

  return (
    <>
      {/* =====================================================================
          1. PRODUCT DETAIL MODAL WINDOW
          ===================================================================== */}
      <div
        className="pwa-modal-safe fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-6 bg-black/82 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="pwa-modal-card relative w-full max-w-[960px] max-h-[90dvh] flex flex-col overflow-hidden border border-[#38bdf8]/35 bg-[#171715] text-[#f3f0e9] shadow-[0_25px_70px_rgba(0,0,0,0.92)] animate-modal-rise rounded-2xl sm:rounded-none"
        >
          {/* DEDICATED TOP HEADER BAR (VNex Market in Blue + online store below + DELIVERY button + Non-Overlapping Close X) */}
          <div className="flex items-center justify-between gap-2 px-3.5 sm:px-7 py-3 bg-[#0c1424] border-b border-[#38bdf8]/30 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={assetUrl("/logo/vnex-logo.jpg")}
                alt="VNex Market"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-[#38bdf8] shrink-0"
              />
              <div className="min-w-0">
                <span className="block font-serif-luxury text-[15px] sm:text-xl font-extrabold text-[#38bdf8] tracking-wide leading-none whitespace-nowrap">
                  VNex Market
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.28em] text-[#cbd5e1] mt-1 whitespace-nowrap">
                  online store
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* DELIVERY Button (Blue Oval + Red Letters) inside Product Modal */}
              <DeliveryBadgeButton onClick={() => setDeliveryModalOpen(true)} size="sm" />

              <span className="hidden md:inline-block px-3 py-1 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/50 text-[#38bdf8] text-xs font-extrabold tracking-wider">
                Art. №{product.articleNumber} • {product.brand}
              </span>

              <button
                onClick={onClose}
                aria-label="Cerrar ventana"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-[#ff1f32] text-white border border-white/30 hover:border-[#ff1f32] grid place-items-center transition cursor-pointer shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* MODAL BODY CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 overflow-y-auto p-5 sm:p-7">
            {/* Left Column: Clickable T-Shirt Photo (Opens Full-Screen Large Photo) + Thumbnails */}
            <div className="md:col-span-6 flex flex-col">
              <div
                onClick={() => setIsLargePhotoOpen(true)}
                title={
                  locale === "es"
                    ? "Haz clic para abrir la foto en tamaño grande"
                    : "Click to open full-size photo"
                }
                className="relative bg-[#201f1c] border border-white/15 hover:border-[#38bdf8] overflow-hidden aspect-square flex items-center justify-center group cursor-zoom-in"
              >
                <img
                  src={activeImage}
                  alt={locale === "es" ? product.nameEs : product.nameEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top-Left Article Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0c1424]/90 border border-[#38bdf8] text-[#38bdf8] text-xs font-extrabold tracking-wider shadow">
                  Art. №{product.articleNumber}
                </div>

                {/* Click to Open Giant Photo Prompt */}
                <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black/85 border border-[#38bdf8] text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-lg group-hover:bg-[#38bdf8] group-hover:text-black transition">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>
                    {locale === "es"
                      ? "Clic para Ver Foto Grande"
                      : "Click for Full-Screen Photo"}
                  </span>
                </div>

                {/* Prev / Next Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIdx(
                          (prev) => (prev - 1 + images.length) % images.length
                        );
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center transition cursor-pointer"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIdx((prev) => (prev + 1) % images.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center transition cursor-pointer"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pt-3">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`w-14 h-16 shrink-0 border overflow-hidden transition cursor-pointer ${
                        idx === selectedImageIdx
                          ? "border-2 border-[#38bdf8] opacity-100 scale-105"
                          : "border-white/15 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={assetUrl(imgUrl)}
                        alt={`Vista ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Article Number, Brand, Details, Delivery Notice & Auto-Filled WhatsApp Form */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Brand & Article Pill Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold tracking-[0.16em] uppercase text-[#38bdf8]">
                    {locale === "es" ? "MARCA:" : "BRAND:"} {product.brand}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-[#d4af37] text-xs font-extrabold tracking-widest">
                    ART. №{product.articleNumber}
                  </span>
                </div>

                <h2 className="font-serif-luxury text-xl sm:text-2xl font-normal leading-snug text-[#f3f0e9]">
                  {locale === "es" ? product.nameEs : product.nameEn}
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-serif-luxury text-2xl text-[#d4af37]">{priceDisplay}</p>

                  {/* Visible Delivery + COD Callout Button right inside Product Details */}
                  <DeliveryBadgeButton onClick={() => setDeliveryModalOpen(true)} size="sm" />
                </div>

                <p className="text-xs text-[#99968e] leading-relaxed">
                  {locale === "es" ? product.descriptionEs : product.descriptionEn}
                </p>

                {/* Turkish Factory + Grupo ZOOM COD Notice */}
                <div className="p-3 bg-[#111622] border border-[#38bdf8]/35 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 shrink-0 text-[#d4af37]" />
                    <span>{t.turkeyBadgeTitle}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] text-[#d4af37] font-semibold">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      <Tag className="w-3 h-3" />{" "}
                      {locale === "es" ? "Con Etiqueta" : "With Tag"}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      <ShieldCheck className="w-3 h-3" />{" "}
                      {locale === "es" ? "Certificado Turco" : "Turkish Certificate"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeliveryModalOpen(true)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#38bdf8]/15 border border-[#38bdf8] text-[#ff1f32] font-extrabold cursor-pointer"
                    >
                      <Truck className="w-3 h-3" />{" "}
                      {locale === "es"
                        ? "Envío ZOOM / Pago al Recibir (COD)"
                        : "ZOOM Shipping / COD"}
                    </button>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#99968e] mb-1.5">
                    <span>{t.sizeLabel}</span>
                    <span className="text-[#d4af37] font-bold">{selectedVariant?.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.variants.map((v) => {
                      const active = v.id === selectedVariant?.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariantId(v.id)}
                          className={`w-11 h-9 text-xs font-bold border transition cursor-pointer ${
                            active
                              ? "border-[#38bdf8] text-[#38bdf8] bg-[#38bdf8]/15"
                              : "border-white/15 text-[#f3f0e9] hover:border-[#38bdf8] hover:text-[#38bdf8]"
                          }`}
                        >
                          {v.size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Customer Name, Payment & Delivery Selector for Auto-Filled WhatsApp Form */}
                <div className="p-3.5 rounded-xl bg-[#10100f] border border-white/15 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>
                        {locale === "es"
                          ? "Formulario Rápido de Pedido:"
                          : "Quick Order Form:"}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setDeliveryModalOpen(true)}
                      className="text-[10px] font-bold text-[#ff1f32] hover:underline uppercase cursor-pointer"
                    >
                      {locale === "es" ? "Ver Reglas Delivery →" : "Delivery Rules →"}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                      {locale === "es"
                        ? "Tu Nombre y Apellido:"
                        : "Your First & Last Name:"}
                    </label>
                    <input
                      type="text"
                      value={customerFullName}
                      onChange={(e) => setCustomerFullName(e.target.value)}
                      placeholder={
                        locale === "es" ? "Ej. Carlos Rodríguez" : "e.g. Carlos Rodriguez"
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#171715] border border-white/20 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                      {locale === "es"
                        ? "Envío / Delivery (Soporta Pago al Recibir COD):"
                        : "Shipping / Delivery (Supports COD):"}
                    </label>
                    <select
                      value={selectedDeliveryOption}
                      onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#171715] border border-[#38bdf8]/40 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                    >
                      <option value="Grupo ZOOM (Cobro en Destino COD / Pago al Recibir)">
                        {locale === "es"
                          ? "⭐ Grupo ZOOM — Rápido / Pago al Recibir (COD)"
                          : "⭐ Grupo ZOOM — Express / Cash on Delivery (COD)"}
                      </option>
                      <option value="Delivery Local en Maracay (Pago al Recibir)">
                        {locale === "es"
                          ? "🛵 Delivery en Maracay (Pago en Efectivo USD al Recibir)"
                          : "🛵 Local Delivery in Maracay (Pay Cash USD on Receipt)"}
                      </option>
                      <option value="Retiro en Tienda (Maracay, Plaza La Soledad, Calle 9)">
                        {locale === "es"
                          ? "📍 Retiro Personal — Maracay, Plaza La Soledad, Calle 9 (Gratis)"
                          : "📍 Personal Pickup — Maracay, Plaza La Soledad, Street 9 (Free)"}
                      </option>
                      <option value="MRW Venezuela (Cobro en Destino COD)">
                        {locale === "es"
                          ? "📦 MRW Venezuela — Cobro en Destino (COD)"
                          : "📦 MRW Venezuela — Cash on Delivery (COD)"}
                      </option>
                      <option value="TEALCA / DOMESA (Cobro en Destino COD)">
                        {locale === "es"
                          ? "📦 TEALCA / DOMESA — Cobro en Destino (COD)"
                          : "📦 TEALCA / DOMESA — Cash on Delivery (COD)"}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                      {locale === "es" ? "Método de Pago:" : "Payment Method:"}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {STORE_CONFIG.paymentMethods.map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setSelectedPayment(pm.id)}
                          className={`py-1.5 px-2 rounded text-[10px] font-bold uppercase border transition cursor-pointer ${
                            selectedPayment === pm.id
                              ? "border-[#38bdf8] bg-[#38bdf8]/15 text-[#38bdf8]"
                              : "border-white/15 text-[#d8d5cd] hover:border-white/35"
                          }`}
                        >
                          {pm.badge}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="grid gap-2.5 pt-2 border-t border-white/10">
                <a
                  href={whatsappDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs tracking-[0.14em] uppercase flex items-center justify-center gap-2.5 transition shadow-lg"
                >
                  <WhatsAppIcon className="w-4 h-4" withBadge={false} />
                  <span>
                    {t.buyNowWhatsapp} (Art. №{product.articleNumber})
                  </span>
                </a>

                <button
                  onClick={handleAdd}
                  className="w-full py-3 px-5 bg-[#d4af37] hover:bg-[#e5c247] text-[#111] font-bold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 transition cursor-pointer"
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{locale === "es" ? "¡AÑADIDO A LA BOLSA!" : "ADDED TO BAG!"}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.addToCart}</span>
                      <ShoppingBag className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. FULL-SCREEN GIANT PHOTO LIGHTBOX (Opens when clicking the T-Shirt image)
          ===================================================================== */}
      {isLargePhotoOpen && (
        <div
          className="pwa-lightbox-safe fixed inset-0 z-[80] bg-black/95 backdrop-blur-md flex flex-col justify-between px-3 sm:px-6"
          onClick={() => {
            setIsLargePhotoOpen(false);
            setIsLargeZoomed(false);
          }}
        >
          {/* Top Bar in Full-Screen Viewer (Model + Article + DELIVERY + Zoom + Close X, safely below status bar) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full mx-auto flex flex-col gap-2 px-3.5 sm:px-5 py-3 rounded-2xl bg-[#0c1424]/95 border border-[#38bdf8]/45 shadow-xl shrink-0"
          >
            {/* Row 1: VNex Market + DELIVERY + Zoom + Close */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="block font-serif-luxury text-sm sm:text-lg font-extrabold text-[#38bdf8] leading-none whitespace-nowrap">
                  VNex Market
                </span>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#cbd5e1] mt-0.5 whitespace-nowrap">
                  online store
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                <DeliveryBadgeButton onClick={() => setDeliveryModalOpen(true)} size="sm" />

                <button
                  onClick={() => setIsLargeZoomed(!isLargeZoomed)}
                  className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8] text-[#38bdf8] text-[10px] sm:text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  {isLargeZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5" />
                      <span>1x</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>2x</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsLargePhotoOpen(false);
                    setIsLargeZoomed(false);
                  }}
                  aria-label="Cerrar foto grande"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-[#ff1f32] text-white border border-white/30 grid place-items-center transition cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Row 2: Article Number + Brand + Model Name */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-1.5 border-t border-white/10 text-[11px] sm:text-xs">
              <span className="px-2 py-0.5 rounded bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8] font-extrabold tracking-wider">
                Art. №{product.articleNumber}
              </span>
              <span className="font-bold text-[#d4af37] uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-[#f3f0e9] truncate max-w-full">
                {locale === "es" ? product.nameEs : product.nameEn}
              </span>
            </div>
          </div>

          {/* Center Giant Image Area */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center overflow-auto my-3"
          >
            {images.length > 1 && (
              <button
                onClick={() =>
                  setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length)
                }
                className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-[#38bdf8] text-white hover:text-black border border-white/25 grid place-items-center transition cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={activeImage}
              alt={product.nameEs}
              onClick={() => setIsLargeZoomed(!isLargeZoomed)}
              className={`max-h-[78vh] max-w-[90vw] object-contain transition-transform duration-300 ${
                isLargeZoomed ? "scale-175 cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
            />

            {images.length > 1 && (
              <button
                onClick={() => setSelectedImageIdx((prev) => (prev + 1) % images.length)}
                className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/80 hover:bg-[#38bdf8] text-white hover:text-black border border-white/25 grid place-items-center transition cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails in Full-Screen Viewer */}
          {images.length > 1 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2.5 pb-1"
            >
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-14 h-16 border overflow-hidden transition cursor-pointer ${
                    idx === selectedImageIdx
                      ? "border-2 border-[#38bdf8] opacity-100 scale-105"
                      : "border-white/20 opacity-55 hover:opacity-100"
                  }`}
                >
                  <img
                    src={assetUrl(imgUrl)}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
