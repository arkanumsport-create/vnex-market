"use client";

import React, { useState } from "react";
import { ShoppingCart, Heart, MessageCircle, Check } from "lucide-react";
import { Product } from "@/types/store";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG } from "@/lib/config";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { locale, showVes, vesRate, addToCart, favorites, toggleFavorite } = useStore();
  const t = DICTIONARY[locale];

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ""
  );
  const [addedFeedback, setAddedFeedback] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const isFav = favorites.includes(product.id);
  const unitPrice = selectedVariant?.priceUsd ?? product.priceUsd;
  const priceDisplay = showVes
    ? `Bs. ${(unitPrice * vesRate).toFixed(2)}`
    : `$${unitPrice.toFixed(2)} USD`;

  const handleAddToCart = () => {
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
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  const whatsappDirectLink = `https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(
    locale === "es"
      ? `¡Hola VNex Market! Quiero pedir:\n• Producto: ${product.nameEs}\n• Talla: ${selectedVariant?.size}\n• Precio: $${unitPrice.toFixed(2)} USD\n• Ubicación: Maracay, Edo. Aragua`
      : `Hello VNex Market! I want to order:\n• Product: ${product.nameEn}\n• Size: ${selectedVariant?.size}\n• Price: $${unitPrice.toFixed(2)} USD\n• Location: Maracay, Aragua`
  )}`;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col">
      {/* Image Header */}
      <div className="relative aspect-square bg-slate-950 overflow-hidden">
        <img
          src={product.images[0] || "/logo/vnex-logo.jpg"}
          alt={locale === "es" ? product.nameEs : product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-[#091b3a]/90 backdrop-blur-xs text-white text-xs font-extrabold tracking-wide shadow">
            ${unitPrice.toFixed(0)} USD
          </span>
          {product.isNew && (
            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
              {locale === "es" ? "Nuevo" : "New"}
            </span>
          )}
        </div>

        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow transition cursor-pointer"
          aria-label="Favorite"
        >
          <Heart
            className={`w-4 h-4 ${isFav ? "fill-red-500 text-red-500" : "text-slate-600"}`}
          />
        </button>
      </div>

      {/* Product Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            {locale === "es" ? product.categoryNameEs : product.categoryNameEn}
          </span>
          <h3 className="mt-1 text-base font-bold text-slate-900 line-clamp-2">
            {locale === "es" ? product.nameEs : product.nameEn}
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
            {locale === "es" ? product.descriptionEs : product.descriptionEn}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-100">
          {/* Price & Stock */}
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xl font-extrabold text-[#091b3a]">{priceDisplay}</span>
              {showVes && (
                <span className="block text-[11px] text-slate-400">
                  (${unitPrice.toFixed(2)} USD)
                </span>
              )}
            </div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                (selectedVariant?.stock ?? 0) > 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {(selectedVariant?.stock ?? 0) > 0
                ? `${t.inStock} (${selectedVariant?.stock})`
                : t.outOfStock}
            </span>
          </div>

          {/* Size Selector */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
              {t.sizeLabel}:
            </span>
            <div className="flex items-center gap-1.5">
              {product.variants.map((v) => {
                const active = v.id === selectedVariant?.id;
                const disabled = v.stock <= 0;
                return (
                  <button
                    key={v.id}
                    disabled={disabled}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                      active
                        ? "bg-[#091b3a] text-white border-[#091b3a]"
                        : disabled
                        ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-600"
                    }`}
                  >
                    {v.size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock <= 0}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#091b3a] hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold transition cursor-pointer"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{locale === "es" ? "¡Agregado!" : "Added!"}</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>{t.addToCart}</span>
                </>
              )}
            </button>

            <a
              href={whatsappDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
