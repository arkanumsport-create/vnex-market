"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  DollarSign,
  PlusCircle,
  Upload,
  RefreshCw,
} from "lucide-react";
import { useStore } from "@/stores/useStore";
import { assetUrl } from "@/lib/config";
import { OrderStatus, PaymentStatus, Product } from "@/types/store";

export default function AdminDashboardPage() {
  const {
    products,
    addProduct,
    updateProductImage,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    vesRate,
    setVesRate,
  } = useStore();

  const [newNameEs, setNewNameEs] = useState("");
  const [newNameEn, setNewNameEn] = useState("");
  const [newPriceUsd, setNewPriceUsd] = useState("20");
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleFileUploadForProduct = (productId: string, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateProductImage(productId, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNewProductImageFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setNewImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNameEs.trim()) return;
    const id = `prod-${Date.now()}`;
    const nextNum = String(products.length + 1).padStart(3, "0");
    const skuBase = `ART-${nextNum}`;
    const product: Product = {
      id,
      articleNumber: nextNum,
      brand: "VNex Exclusive",
      sku: skuBase,
      slug: `camiseta-${Date.now()}`,
      categorySlug: "camisetas",
      categoryNameEs: "Camisetas y Franelas",
      categoryNameEn: "T-Shirts & Tops",
      nameEs: newNameEs.trim(),
      nameEn: newNameEn.trim() || newNameEs.trim(),
      descriptionEs:
        "Camiseta exclusiva VNex Market disponible en Maracay, Estado Aragua. Pagos vía Zelle, Pago Móvil o Efectivo USD.",
      descriptionEn:
        "Exclusive VNex Market T-shirt available in Maracay, Aragua State. Pay via Zelle, Pago Móvil, or Cash USD.",
      priceUsd: parseFloat(newPriceUsd) || 20.0,
      images: [newImageUrl || "/logo/vnex-logo.jpg"],
      isFeatured: true,
      isNew: true,
      variants: [
        { id: `${id}-s`, sku: `${skuBase}-S`, size: "S", colorEs: "Único", colorEn: "Standard", colorHex: "#091b3a", stock: 10 },
        { id: `${id}-m`, sku: `${skuBase}-M`, size: "M", colorEs: "Único", colorEn: "Standard", colorHex: "#091b3a", stock: 15 },
        { id: `${id}-l`, sku: `${skuBase}-L`, size: "L", colorEs: "Único", colorEn: "Standard", colorHex: "#091b3a", stock: 12 },
        { id: `${id}-xl`, sku: `${skuBase}-XL`, size: "XL", colorEs: "Único", colorEn: "Standard", colorHex: "#091b3a", stock: 8 },
      ],
    };
    addProduct(product);
    setNewNameEs("");
    setNewNameEn("");
    setNewPriceUsd("20");
    setNewImageUrl("");
  };

  const confirmedRevenue = orders
    .filter((o) => o.paymentStatus === "comprobado")
    .reduce((acc, o) => acc + o.totalUsd, 0);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-[#091b3a] text-white py-4 px-6 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Tienda</span>
            </Link>
            <h1 className="text-lg sm:text-xl font-extrabold">
              VNex Market — Panel Administrativo (/admin)
            </h1>
          </div>
          <span className="text-xs bg-blue-600 px-3 py-1 rounded-full font-bold">
            Rol: Owner / Admin
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Pedidos Totales</span>
              <ShoppingBag className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-[#091b3a] mt-2">{orders.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Ingresos Confirmados</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-700 mt-2">
              ${confirmedRevenue.toFixed(2)} USD
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Productos en Catálogo</span>
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-[#091b3a] mt-2">{products.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
              <span>Tasa Manual Bs. / USD</span>
              <RefreshCw className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                value={vesRate}
                onChange={(e) => setVesRate(parseFloat(e.target.value) || 1)}
                className="w-28 px-2.5 py-1 rounded-lg border border-slate-300 font-bold text-sm"
              />
              <span className="text-xs font-semibold text-slate-500">Bs./$</span>
            </div>
          </div>
        </div>

        {/* Add / Upload Product Section */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <h2 className="text-lg font-extrabold text-[#091b3a] flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <span>Agregar Nueva Camiseta ($20 USD) / Subir Foto</span>
          </h2>

          <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              required
              value={newNameEs}
              onChange={(e) => setNewNameEs(e.target.value)}
              placeholder="Nombre en Español (Ej. Franela VNex Negra)"
              className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
            />
            <input
              value={newNameEn}
              onChange={(e) => setNewNameEn(e.target.value)}
              placeholder="Name in English (Optional)"
              className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
            />
            <input
              type="number"
              step="0.01"
              value={newPriceUsd}
              onChange={(e) => setNewPriceUsd(e.target.value)}
              placeholder="Precio USD (20.00)"
              className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
            />
            <div className="flex items-center gap-2">
              <label className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-dashed border-blue-500 bg-blue-50 text-blue-700 text-xs font-bold cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>{newImageUrl ? "Foto Lista ✓" : "Subir Foto"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleNewProductImageFile(e.target.files?.[0])}
                />
              </label>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#091b3a] hover:bg-blue-700 text-white text-xs font-extrabold cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>

          {/* Existing Products Image Updater */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Catálogo Actual (Puedes cambiar la foto de cualquier camiseta con 1 clic):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-xl border border-slate-200 flex items-center gap-3 bg-slate-50"
                >
                  <img
                    src={assetUrl(prod.images[0])}
                    alt={prod.nameEs}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-900 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{prod.nameEs}</p>
                    <p className="text-xs font-extrabold text-blue-600">
                      ${prod.priceUsd.toFixed(2)} USD
                    </p>
                    <label className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-blue-600 cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>Cambiar foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUploadForProduct(prod.id, e.target.files?.[0])}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Orders Management Section */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-lg font-extrabold text-[#091b3a]">
            Gestión de Pedidos y Confirmación Manual de Pagos (Zelle / Pago Móvil / Efectivo USD)
          </h2>

          {orders.length === 0 ? (
            <p className="text-sm text-slate-500 py-8 text-center">
              Aún no hay pedidos registrados. Realiza un pedido de prueba desde el catálogo.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase">
                    <th className="py-3 px-2">Orden</th>
                    <th className="py-3 px-2">Cliente / WhatsApp</th>
                    <th className="py-3 px-2">Ubicación</th>
                    <th className="py-3 px-2">Método Pago</th>
                    <th className="py-3 px-2">Total</th>
                    <th className="py-3 px-2">Estado Pago</th>
                    <th className="py-3 px-2">Estado Pedido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td className="py-3 px-2 font-bold text-[#091b3a]">{ord.orderNumber}</td>
                      <td className="py-3 px-2">
                        <div className="font-bold">
                          {ord.firstName} {ord.lastName}
                        </div>
                        <div className="text-slate-500">{ord.phone}</div>
                      </td>
                      <td className="py-3 px-2">
                        {ord.ciudad}, {ord.estado}
                      </td>
                      <td className="py-3 px-2 uppercase font-semibold">{ord.paymentMethod}</td>
                      <td className="py-3 px-2 font-extrabold">${ord.totalUsd.toFixed(2)} USD</td>
                      <td className="py-3 px-2">
                        <select
                          value={ord.paymentStatus}
                          onChange={(e) =>
                            updatePaymentStatus(ord.id, e.target.value as PaymentStatus)
                          }
                          className="rounded-lg border border-slate-300 px-2 py-1 font-bold bg-white"
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="comprobado">Comprobado</option>
                          <option value="rechazado">Rechazado</option>
                          <option value="reembolsado">Reembolsado</option>
                        </select>
                      </td>
                      <td className="py-3 px-2">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="rounded-lg border border-slate-300 px-2 py-1 font-bold bg-white"
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="pendiente_confirmacion">Pendiente de confirmación</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="preparando">Preparando</option>
                          <option value="listo_envio">Listo para envío</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
