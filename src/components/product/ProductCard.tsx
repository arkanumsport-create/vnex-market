"use client";

import React, { useState } from "react";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/store";
import { useStore } from "@/stores/useStore";
import { assetUrl } from "@/lib/config";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const { locale, showVes, vesRate } = useStore();
  const [imageIndex, setImageIndex] = useState(0);

  const unitPrice = product.priceUsd;
  const priceDisplay = showVes
    ? `Bs. ${(unitPrice * vesRate).toFixed(2)}`
    : `$${unitPrice.toFixed(2)}`;

  const totalImages = product.images.length;
  const currentImage = assetUrl(product.images[imageIndex] || "/logo/vnex-logo.jpg");

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % totalImages);
  };

  return (
    <article className="group flex flex-col">
      {/* Editorial Image Button */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[0.82] w-full overflow-hidden bg-[#201f1c] border border-white/10 hover:border-[#38bdf8]/70 transition cursor-pointer"
      >
        <img
          src={currentImage}
          alt={locale === "es" ? product.nameEs : product.nameEn}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
        />

        {/* Top Left Article Number & Turkish Origin Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-0.5 bg-[#09152b]/90 backdrop-blur-xs border border-[#38bdf8] text-[10px] font-extrabold tracking-wider uppercase text-[#38bdf8] shadow">
            Art. №{product.articleNumber}
          </span>
          <span className="px-2 py-0.5 bg-black/75 backdrop-blur-xs border border-white/15 text-[9px] font-bold tracking-widest uppercase text-[#d4af37]">
            🇹🇷 TURQUÍA
          </span>
          {totalImages > 1 && (
            <span className="px-2 py-0.5 bg-black/75 backdrop-blur-xs border border-white/15 text-[9px] font-medium tracking-wider text-white/90">
              {imageIndex + 1}/{totalImages}
            </span>
          )}
        </div>

        {/* Hover Zoom Prompt */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 border border-[#38bdf8]/60 text-[#38bdf8] text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3 h-3" />
          <span>{locale === "es" ? "Ver Prenda" : "Open Item"}</span>
        </div>

        {/* Quick Prev/Next Arrows on Hover */}
        {totalImages > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/65 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/65 hover:bg-[#38bdf8] text-white hover:text-black grid place-items-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Editorial Product Info Row */}
      <div className="flex items-start justify-between gap-3 pt-3.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold tracking-[0.14em] uppercase text-[#38bdf8]">
              {product.brand}
            </span>
            <span className="text-[9px] text-[#99968e]">• Art. №{product.articleNumber}</span>
          </div>
          <button
            onClick={() => onSelectProduct(product)}
            className="mt-1 font-serif-luxury text-[14px] sm:text-[15px] text-left text-[#f3f0e9] hover:text-[#d4af37] transition leading-snug line-clamp-2 cursor-pointer"
          >
            {locale === "es" ? product.nameEs : product.nameEn}
          </button>
        </div>
        <span className="text-xs font-semibold text-[#d4af37] whitespace-nowrap pt-1">
          {priceDisplay}
        </span>
      </div>

      {/* Payment & Authenticity Pills */}
      <div
        className="flex flex-wrap items-center gap-1.5 pt-2.5"
        aria-label="Métodos de pago disponibles"
      >
        <span className="px-2 py-0.5 border border-white/12 text-[#d8d5cd] text-[8.5px] tracking-wider uppercase">
          Zelle
        </span>
        <span className="px-2 py-0.5 border border-white/12 text-[#d8d5cd] text-[8.5px] tracking-wider uppercase">
          Pago Móvil
        </span>
        <span className="px-2 py-0.5 border border-white/12 text-[#d8d5cd] text-[8.5px] tracking-wider uppercase">
          Efectivo USD
        </span>
        <span className="px-2 py-0.5 border border-[#38bdf8]/35 text-[#38bdf8] text-[8.5px] tracking-wider uppercase">
          {locale === "es" ? "Con Etiqueta" : "With Tags"}
        </span>
      </div>
    </article>
  );
}
