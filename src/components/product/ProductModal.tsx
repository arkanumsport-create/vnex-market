"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Product } from "@/types/store";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { locale, showVes, vesRate, addToCart } = useStore();
  const t = DICTIONARY[locale];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id || ""
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) return null;

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const unitPrice = selectedVariant?.priceUsd ?? product.priceUsd;
  const priceDisplay = showVes
    ? `Bs. ${(unitPrice * vesRate).toFixed(2)} ($${unitPrice.toFixed(2)} USD)`
    : `$${unitPrice.toFixed(2)}`;

  const images = product.images.length > 0 ? product.images : ["/logo/vnex-logo.jpg"];
  const activeImage = assetUrl(images[selectedImageIdx] || images[0]);

  const handleAdd = () => {
    if (!selectedVariant || selectedVariant.stock <= 0) return;
    addToCart({
      productId: product.id,
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

  const whatsappDirectLink = `https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(
    locale === "es"
      ? `¡Hola VNEX MARKET! Quiero comprar:\n• Prenda: ${product.nameEs} (${product.sku})\n• Talla: ${selectedVariant?.size}\n• Precio: $${unitPrice.toFixed(2)} USD\n• Origen: Fábrica de Turquía (Nuevo con etiqueta)\n• Ubicación: Maracay, Edo. Aragua`
      : `Hello VNEX MARKET! I want to buy:\n• Item: ${product.nameEn} (${product.sku})\n• Size: ${selectedVariant?.size}\n• Price: $${unitPrice.toFixed(2)} USD\n• Location: Maracay, Aragua`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[920px] max-h-[92vh] grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 overflow-y-auto p-5 sm:p-8 border border-white/15 bg-[#171715] text-[#f3f0e9] shadow-[0_25px_70px_rgba(0,0,0,0.9)] animate-modal-rise"
      >
        {/* Close Button (Reference Circular Button) */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white text-[#111] hover:bg-[#ff1f32] hover:text-white border-2 border-[#111] shadow-lg grid place-items-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: High-Res Gallery + Zoom + Thumbnails */}
        <div className="md:col-span-7 flex flex-col">
          <div className="relative bg-[#201f1c] border border-white/10 overflow-hidden aspect-square flex items-center justify-center group">
            <img
              src={activeImage}
              alt={locale === "es" ? product.nameEs : product.nameEn}
              onClick={() => setIsZoomed(!isZoomed)}
              className={`w-full h-full object-cover transition-transform duration-500 cursor-zoom-in ${
                isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 hover:scale-105"
              }`}
            />

            {/* Zoom Toggle Pill */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/75 border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 hover:border-[#38bdf8] hover:text-[#38bdf8] transition cursor-pointer"
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span>{locale === "es" ? "Reducir" : "Zoom Out"}</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{locale === "es" ? "Ampliar Foto" : "Zoom Photo"}</span>
                </>
              )}
            </button>

            {/* Prev / Next Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center transition cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIdx((prev) => (prev + 1) % images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center transition cursor-pointer"
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
                  onClick={() => {
                    setSelectedImageIdx(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-14 h-16 shrink-0 border overflow-hidden transition cursor-pointer ${
                    idx === selectedImageIdx
                      ? "border-2 border-[#d4af37] opacity-100 scale-105"
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

        {/* Right Column: Luxury Details, Turkish Certificate Info, Size & Actions */}
        <div className="md:col-span-5 flex flex-col justify-between py-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#99968e]">
                {locale === "es" ? product.categoryNameEs : product.categoryNameEn}
              </p>
              <span className="text-[10px] tracking-widest text-[#38bdf8] font-bold">
                {product.sku}
              </span>
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-[28px] font-normal leading-snug text-[#f3f0e9]">
              {locale === "es" ? product.nameEs : product.nameEn}
            </h2>

            <p className="font-serif-luxury text-2xl text-[#d4af37]">{priceDisplay}</p>

            <p className="text-xs text-[#99968e] leading-relaxed">
              {locale === "es" ? product.descriptionEs : product.descriptionEn}
            </p>

            {/* Turkish Factory Direct Authenticity Block */}
            <div className="p-3.5 bg-[#111622] border border-[#38bdf8]/35 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
                <Award className="w-4 h-4 shrink-0 text-[#d4af37]" />
                <span>{t.turkeyBadgeTitle}</span>
              </div>
              <p className="text-[11px] text-[#cbd5e1] leading-relaxed">{t.turkeyBadgeText}</p>
              <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-[#d4af37] font-semibold">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  <Tag className="w-3 h-3" />{" "}
                  {locale === "es" ? "Con Etiqueta Original" : "With Original Tag"}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  <ShieldCheck className="w-3 h-3" />{" "}
                  {locale === "es" ? "Certificado de Calidad" : "Quality Certificate"}
                </span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#99968e] mb-2.5">
                <span>{t.sizeLabel}</span>
                <span className="text-[#d4af37] font-bold">{selectedVariant?.size}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.variants.map((v) => {
                  const active = v.id === selectedVariant?.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`w-11 h-11 text-xs font-bold border transition cursor-pointer ${
                        active
                          ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10"
                          : "border-white/15 text-[#f3f0e9] hover:border-[#38bdf8] hover:text-[#38bdf8]"
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["Zelle", "Pago Móvil", "Efectivo USD"].map((pill) => (
                <span
                  key={pill}
                  className="px-2.5 py-1 border border-white/15 text-[#d8d5cd] text-[10px] uppercase tracking-wider"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="grid gap-3 mt-6 pt-4 border-t border-white/10">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 px-5 bg-[#d4af37] hover:bg-[#e5c247] text-[#111] font-bold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 transition cursor-pointer"
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

            <a
              href={whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 bg-transparent hover:bg-[#25D366]/15 border border-white/25 hover:border-[#25D366] text-white font-bold text-xs tracking-[0.16em] uppercase flex items-center justify-center gap-2.5 transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.buyNowWhatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
