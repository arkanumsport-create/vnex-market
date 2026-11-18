export type Locale = "es" | "en";

export type PaymentMethodId = "zelle" | "pago_movil" | "efectivo_usd";

export type OrderStatus =
  | "nuevo"
  | "pendiente_confirmacion"
  | "confirmado"
  | "preparando"
  | "listo_envio"
  | "enviado"
  | "entregado"
  | "cancelado";

export type PaymentStatus = "pendiente" | "comprobado" | "rechazado" | "reembolsado";

export interface ProductVariant {
  id: string;
  sku: string;
  size: "S" | "M" | "L" | "XL";
  colorEs: string;
  colorEn: string;
  colorHex: string;
  stock: number;
  priceUsd?: number;
}

export interface Product {
  id: string;
  articleNumber: string; // "001" .. "027"
  brand: string;
  sku: string;
  slug: string;
  categorySlug: string;
  categoryNameEs: string;
  categoryNameEn: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  priceUsd: number;
  salePriceUsd?: number;
  images: string[];
  variants: ProductVariant[];
  isFeatured?: boolean;
  isNew?: boolean;
  materialEs?: string;
  materialEn?: string;
}

export interface CartItem {
  productId: string;
  articleNumber: string;
  brand: string;
  variantId: string;
  sku: string;
  slug: string;
  nameEs: string;
  nameEn: string;
  image: string;
  size: string;
  colorEs: string;
  colorEn: string;
  unitPriceUsd: number;
  quantity: number;
  maxStock: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  estado: string;
  ciudad: string;
  municipio?: string;
  direccion: string;
  referencia?: string;
  comentarios?: string;
  paymentMethod: PaymentMethodId;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingMethod: "pickup_maracay" | "delivery_aragua" | "national_venezuela";
  items: CartItem[];
  subtotalUsd: number;
  shippingUsd: number | null;
  totalUsd: number;
}
