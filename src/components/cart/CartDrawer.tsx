"use client";

import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import { useStore } from "@/stores/useStore";
import { DICTIONARY, STORE_CONFIG } from "@/lib/config";
import { OrderRecord, PaymentMethodId } from "@/types/store";

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

  // Checkout Form State
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
          `• ${i.quantity}x ${locale === "es" ? i.nameEs : i.nameEn} (Talla ${i.size}) — $${(
            i.unitPriceUsd * i.quantity
          ).toFixed(2)} USD`
      )
      .join("\n");

    const pmObj = STORE_CONFIG.paymentMethods.find((p) => p.id === order.paymentMethod);
    const pmLabel = pmObj ? (locale === "es" ? pmObj.nameEs : pmObj.nameEn) : order.paymentMethod;

    const text =
      locale === "es"
        ? `¡Hola VNex Market! He realizado el pedido *${order.orderNumber}*:\n\n${itemsLines}\n\n*Total:* $${order.totalUsd.toFixed(
            2
          )} USD\n*Método de Pago:* ${pmLabel}\n*Cliente:* ${order.firstName} ${
            order.lastName
          }\n*Teléfono:* ${order.phone}\n*Ubicación:* ${order.ciudad}, Edo. ${
            order.estado
          }\n*Dirección:* ${order.direccion}${
            order.referencia ? ` (Ref: ${order.referencia})` : ""
          }`
        : `Hello VNex Market! I placed order *${order.orderNumber}*:\n\n${itemsLines}\n\n*Total:* $${order.totalUsd.toFixed(
            2
          )} USD\n*Payment Method:* ${pmLabel}\n*Customer:* ${order.firstName} ${
            order.lastName
          }\n*Phone:* ${order.phone}\n*Location:* ${order.ciudad}, ${
            order.estado
          }\n*Address:* ${order.direccion}`;

    return `https://wa.me/${STORE_CONFIG.whatsappClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#091b3a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {step === "checkout" && (
              <button
                onClick={() => setStep("cart")}
                className="p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold">
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
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {step === "cart" && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-slate-600 font-medium text-sm">{t.cartEmpty}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex gap-3.5 p-3 rounded-xl border border-slate-200 bg-slate-50/60"
                    >
                      <img
                        src={item.image}
                        alt={item.nameEs}
                        className="w-20 h-20 rounded-lg object-cover bg-slate-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {locale === "es" ? item.nameEs : item.nameEn}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {t.sizeLabel}: <span className="font-bold text-slate-700">{item.size}</span>{" "}
                          • {locale === "es" ? item.colorEs : item.colorEn}
                        </p>
                        <p className="text-sm font-extrabold text-[#091b3a] mt-1">
                          ${(item.unitPriceUsd * item.quantity).toFixed(2)} USD
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white">
                            <button
                              onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.variantId)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
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
            <form id="vnex-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 bg-blue-50 border border-blue-200 rounded-xl p-3">
                {t.checkoutSubtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.firstName}
                  </label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                    placeholder="Ej. Carlos"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.lastName}
                  </label>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                    placeholder="Ej. Pérez"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.phone}</label>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                    placeholder="+58 412 0000000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.emailOptional}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.estado}</label>
                  <input
                    required
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.ciudad}</label>
                  <input
                    required
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.direccion}</label>
                <input
                  required
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                  placeholder="Av. Las Delicias / Urb. / Calle / Casa o Edificio"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.referencia}
                </label>
                <input
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                  placeholder="Cerca de..."
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t.paymentMethodLabel}
                </label>
                <div className="space-y-2">
                  {STORE_CONFIG.paymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        paymentMethod === pm.id
                          ? "border-blue-600 bg-blue-50/60"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === pm.id}
                        onChange={() => setPaymentMethod(pm.id)}
                        className="mt-1"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">
                          {locale === "es" ? pm.nameEs : pm.nameEn}
                        </span>
                        <span className="text-slate-600 mt-0.5 block">
                          {locale === "es" ? pm.instructionsEs : pm.instructionsEn}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
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
                  className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-800 bg-white"
                >
                  <option value="pickup_maracay">{t.shippingPickupMaracay}</option>
                  <option value="delivery_aragua">{t.shippingDeliveryAragua}</option>
                  <option value="national_venezuela">{t.shippingNational}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.comentariosOptional}
                </label>
                <textarea
                  rows={2}
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-600"
                />
              </div>
            </form>
          )}

          {step === "success" && createdOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Orden #{createdOrder.orderNumber}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {t.orderSuccessTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t.orderSuccessText}
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Total USD:</span>
                  <span>${createdOrder.totalUsd.toFixed(2)} USD</span>
                </div>
                {showVes && (
                  <div className="flex justify-between text-slate-600">
                    <span>Referencia en Bs.:</span>
                    <span>Bs. {(createdOrder.totalUsd * vesRate).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Estado del Pedido:</span>
                  <span className="font-bold text-amber-600">Pendiente de confirmación</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estado del Pago:</span>
                  <span className="font-bold text-amber-600">Pendiente</span>
                </div>
              </div>

              <a
                href={buildWhatsappOrderUrl(createdOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.sendOrderWhatsappBtn}</span>
              </a>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {step !== "success" && cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">{t.subtotal}:</span>
              <div className="text-right">
                <span className="text-lg font-extrabold text-[#091b3a]">
                  ${subtotalUsd.toFixed(2)} USD
                </span>
                {showVes && (
                  <span className="block text-xs text-slate-500">
                    ≈ Bs. {(subtotalUsd * vesRate).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <p className="text-[11px] text-slate-500">{t.shippingNote}</p>

            {step === "cart" ? (
              <button
                onClick={() => setStep("checkout")}
                className="w-full py-3 rounded-xl bg-[#091b3a] hover:bg-blue-700 text-white font-extrabold text-sm shadow transition cursor-pointer"
              >
                {t.proceedToCheckout}
              </button>
            ) : (
              <button
                type="submit"
                form="vnex-checkout-form"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow transition cursor-pointer"
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
