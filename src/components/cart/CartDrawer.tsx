"use client";

import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, ArrowLeft } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG, assetUrl } from "@/lib/config";
import { OrderRecord, PaymentMethodId } from "@/types/store";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";

export function CartDrawer() {
  const {
    locale,
    showVes,
    vesRate,
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    createOrder,
  } = useStore();

  const t = DICTIONARY[locale];

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+58 ");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState("Aragua");
  const [ciudad, setCiudad] = useState("Maracay");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("pago_movil");
  const [shippingMethod, setShippingMethod] = useState<
    "pickup_maracay" | "delivery_aragua" | "national_venezuela"
  >("pickup_maracay");

  if (!isCartOpen) return null;

  const subtotalUsd = cart.reduce((acc, item) => acc + item.unitPriceUsd * item.quantity, 0);
  const shippingUsd = shippingMethod === "pickup_maracay" ? 0 : null;
  const totalUsd = subtotalUsd + (shippingUsd ?? 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const order = createOrder({
      firstName,
      lastName,
      phone,
      email: email || undefined,
      estado,
      ciudad,
      direccion,
      referencia: referencia || undefined,
      comentarios: comentarios || undefined,
      paymentMethod,
      shippingMethod,
      items: [...cart],
      subtotalUsd,
      shippingUsd,
      totalUsd,
    });

    setCreatedOrder(order);
    setStep("success");
  };

  const buildWhatsappOrderUrl = (order: OrderRecord) => {
    const itemsLines = order.items
      .map(
        (i) =>
          `• *Art. №${i.articleNumber || "001"}* | *Marca:* ${i.brand || "VNex"} | ${
            i.quantity
          }x ${locale === "es" ? i.nameEs : i.nameEn} (Talla ${i.size}) — $${(
            i.unitPriceUsd * i.quantity
          ).toFixed(2)} USD`
      )
      .join("\n");

    const pmObj = STORE_CONFIG.paymentMethods.find((p) => p.id === order.paymentMethod);
    const pmLabel = pmObj ? (locale === "es" ? pmObj.nameEs : pmObj.nameEn) : order.paymentMethod;

    const text =
      locale === "es"
        ? `¡Hola VNex Market! 👋\nSoy *${order.firstName} ${
            order.lastName
          }*.\nQuiero comprar el siguiente pedido (*${order.orderNumber}*):\n\n${itemsLines}\n\n*Total:* $${order.totalUsd.toFixed(
            2
          )} USD\n*Método de Pago:* ${pmLabel}\n*Teléfono:* ${order.phone}\n*Ubicación:* ${
            order.ciudad
          }, Edo. ${order.estado}\n*Dirección:* ${order.direccion}${
            order.referencia ? ` (Ref: ${order.referencia})` : ""
          }`
        : `Hello VNex Market! 👋\nMy name is *${order.firstName} ${
            order.lastName
          }*.\nI want to buy the following order (*${order.orderNumber}*):\n\n${itemsLines}\n\n*Total:* $${order.totalUsd.toFixed(
            2
          )} USD\n*Payment Method:* ${pmLabel}\n*Phone:* ${order.phone}\n*Location:* ${
            order.ciudad
          }, ${order.estado}\n*Address:* ${order.direccion}`;

    return `https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#171715] text-[#f3f0e9] border-l border-white/15 h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/12 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {step === "checkout" && (
              <button
                onClick={() => setStep("cart")}
                className="p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
              </button>
            )}
            <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
            <h2 className="font-serif-luxury text-lg tracking-wider">
              {step === "cart"
                ? t.cartTitle
                : step === "checkout"
                ? t.checkoutTitle
                : t.orderSuccessTitle}
            </h2>
          </div>

          <button
            onClick={() => {
              setCartOpen(false);
              if (step === "success") setStep("cart");
            }}
            className="w-8 h-8 rounded-full border border-white/15 hover:border-[#ff1f32] hover:bg-[#ff1f32] text-[#f3f0e9] grid place-items-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === "cart" && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#d4af37]">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="text-[#99968e] text-xs leading-relaxed max-w-xs mx-auto">
                    {t.cartEmpty}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex gap-3.5 p-3 border border-white/12 bg-[#1d1d1a]"
                    >
                      <img
                        src={assetUrl(item.image)}
                        alt={item.nameEs}
                        className="w-20 h-24 object-cover bg-[#201f1c] shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif-luxury text-xs text-[#f3f0e9] truncate">
                            {locale === "es" ? item.nameEs : item.nameEn}
                          </h4>
                          <p className="text-[10px] text-[#99968e] mt-0.5 uppercase tracking-wider">
                            {t.sizeLabel}: <span className="text-[#d4af37] font-bold">{item.size}</span>
                          </p>
                          <p className="text-xs font-bold text-[#d4af37] mt-1">
                            ${(item.unitPriceUsd * item.quantity).toFixed(2)} USD
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="inline-flex items-center border border-white/15 bg-[#10100f]">
                            <button
                              onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                              className="p-1.5 text-[#99968e] hover:text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                              className="p-1.5 text-[#99968e] hover:text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.variantId)}
                            className="p-1.5 text-[#99968e] hover:text-[#ff1f32] transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === "checkout" && (
            <form id="vnex-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
              <p className="text-[11px] text-[#d4cfc4] bg-white/5 border border-[#d4af37]/30 p-3">
                {t.checkoutSubtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                    {t.firstName}
                  </label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                    {t.lastName}
                  </label>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                    {t.phone}
                  </label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                    {t.emailOptional}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                    {t.estado}
                  </label>
                  <input
                    required
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                    {t.ciudad}
                  </label>
                  <input
                    required
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                  {t.direccion}
                </label>
                <input
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-2">
                  {t.paymentMethodLabel}
                </label>
                <div className="space-y-2">
                  {STORE_CONFIG.paymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-start gap-2.5 p-3 border cursor-pointer transition ${
                        paymentMethod === pm.id
                          ? "border-[#d4af37] bg-[#d4af37]/10"
                          : "border-white/15 hover:border-white/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === pm.id}
                        onChange={() => setPaymentMethod(pm.id)}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-bold text-white block">
                          {locale === "es" ? pm.nameEs : pm.nameEn}
                        </span>
                        <span className="text-[11px] text-[#99968e] mt-0.5 block">
                          {locale === "es" ? pm.instructionsEs : pm.instructionsEn}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#99968e] mb-1">
                  {t.shippingMethodLabel}
                </label>
                <select
                  value={shippingMethod}
                  onChange={(e) =>
                    setShippingMethod(
                      e.target.value as
                        | "pickup_maracay"
                        | "delivery_aragua"
                        | "national_venezuela"
                    )
                  }
                  className="w-full bg-[#10100f] border border-white/15 px-3 py-2.5 text-xs text-white"
                >
                  <option value="pickup_maracay">{t.shippingPickupMaracay}</option>
                  <option value="delivery_aragua">{t.shippingDeliveryAragua}</option>
                  <option value="national_venezuela">{t.shippingNational}</option>
                </select>
              </div>
            </form>
          )}

          {step === "success" && createdOrder && (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/15 border border-[#25D366] text-[#25D366] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  ORDEN #{createdOrder.orderNumber}
                </span>
                <h3 className="font-serif-luxury text-xl text-white mt-1">
                  {t.orderSuccessTitle}
                </h3>
                <p className="text-xs text-[#99968e] mt-2 leading-relaxed">
                  {t.orderSuccessText}
                </p>
              </div>

              <div className="bg-[#10100f] p-4 border border-white/12 text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-[#d4af37]">
                  <span>TOTAL USD:</span>
                  <span>${createdOrder.totalUsd.toFixed(2)} USD</span>
                </div>
                {showVes && (
                  <div className="flex justify-between text-[#99968e]">
                    <span>Referencia en Bs.:</span>
                    <span>Bs. {(createdOrder.totalUsd * vesRate).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <a
                href={buildWhatsappOrderUrl(createdOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs tracking-wider uppercase transition"
              >
                <WhatsAppIcon className="w-4 h-4" withBadge={false} />
                <span>{t.sendOrderWhatsappBtn}</span>
              </a>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {step !== "success" && cart.length > 0 && (
          <div className="p-5 border-t border-white/12 bg-[#141412] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#99968e]">
                {t.subtotal}:
              </span>
              <div className="text-right">
                <span className="font-serif-luxury text-xl text-[#d4af37]">
                  ${subtotalUsd.toFixed(2)} USD
                </span>
                {showVes && (
                  <span className="block text-[10px] text-[#99968e]">
                    ≈ Bs. {(subtotalUsd * vesRate).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <p className="text-[10px] text-[#99968e]">{t.shippingNote}</p>

            {step === "cart" ? (
              <button
                onClick={() => setStep("checkout")}
                className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e5c247] text-[#111] font-extrabold text-xs tracking-[0.16em] uppercase transition cursor-pointer"
              >
                {t.proceedToCheckout}
              </button>
            ) : (
              <button
                type="submit"
                form="vnex-checkout-form"
                className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e5c247] text-[#111] font-extrabold text-xs tracking-[0.16em] uppercase transition cursor-pointer"
              >
                {t.confirmOrderBtn} (${totalUsd.toFixed(2)} USD)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
