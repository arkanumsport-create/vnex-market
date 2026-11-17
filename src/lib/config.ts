import { Locale, PaymentMethodId } from "@/types/store";

export const STORE_CONFIG = {
  name: "VNex Market",
  taglineEs: "ONLINE STORE — Moda y Estilo en Venezuela",
  taglineEn: "ONLINE STORE — Fashion & Style in Venezuela",
  whatsappNumber: "+584123776184",
  whatsappClean: "584123776184",
  whatsappDisplay: "+58 412-3776184",
  instagramUrl: "https://www.instagram.com/max642553?igsi=MXNzcHJyZWVraWN6bg==",
  instagramHandle: "@max642553",
  locationEs: "Maracay, Estado Aragua, Venezuela",
  locationEn: "Maracay, Aragua State, Venezuela",
  defaultPriceUsd: 20.0,
  manualVesRate: 65.5, // Editable by Admin in /admin panel
  manualVesRateSource: "BCV / Referencia Manual",
  paymentMethods: [
    {
      id: "zelle" as PaymentMethodId,
      nameEs: "Zelle (USD)",
      nameEn: "Zelle (USD)",
      badge: "Zelle",
      instructionsEs:
        "Transferencia directa en dólares vía Zelle. Al confirmar tu pedido por WhatsApp (+58 412-3776184) te enviaremos el correo titular para verificar el comprobante.",
      instructionsEn:
        "Direct USD transfer via Zelle. Upon confirming your order on WhatsApp (+58 412-3776184), we will provide the recipient email to verify your receipt.",
    },
    {
      id: "pago_movil" as PaymentMethodId,
      nameEs: "Pago Móvil (Bs.)",
      nameEn: "Pago Móvil (VES)",
      badge: "Pago Móvil",
      instructionsEs:
        "Pago instantáneo en Bolívares al cambio del día. Recibirás los datos bancarios (Banco, Cédula/RIF y Teléfono +58 412-3776184) al finalizar tu pedido.",
      instructionsEn:
        "Instant payment in Bolívares at the current rate. You will receive the bank details (Bank, ID, and Phone +58 412-3776184) upon completing your order.",
    },
    {
      id: "efectivo_usd" as PaymentMethodId,
      nameEs: "Efectivo USD (Entrega en Maracay)",
      nameEn: "Cash USD (Maracay Pickup / Delivery)",
      badge: "Efectivo $",
      instructionsEs:
        "Pago en efectivo en dólares ($ USD) al momento de retirar o recibir tu pedido en Maracay, Estado Aragua.",
      instructionsEn:
        "Cash payment in US Dollars ($ USD) upon pickup or local delivery in Maracay, Aragua State.",
    },
  ],
};

export const DICTIONARY: Record<
  Locale,
  {
    topBarPromo: string;
    navHome: string;
    navCatalog: string;
    navTrackOrder: string;
    navContact: string;
    navAdmin: string;
    searchPlaceholder: string;
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaWhatsapp: string;
    priceUnitBanner: string;
    categoriesTitle: string;
    featuredTitle: string;
    featuredSubtitle: string;
    allProducts: string;
    filterAll: string;
    addToCart: string;
    buyNowWhatsapp: string;
    outOfStock: string;
    inStock: string;
    sizeLabel: string;
    colorLabel: string;
    quantityLabel: string;
    cartTitle: string;
    cartEmpty: string;
    subtotal: string;
    shippingNote: string;
    proceedToCheckout: string;
    checkoutTitle: string;
    checkoutSubtitle: string;
    firstName: string;
    lastName: string;
    phone: string;
    emailOptional: string;
    estado: string;
    ciudad: string;
    direccion: string;
    referencia: string;
    comentariosOptional: string;
    paymentMethodLabel: string;
    shippingMethodLabel: string;
    shippingPickupMaracay: string;
    shippingDeliveryAragua: string;
    shippingNational: string;
    confirmOrderBtn: string;
    orderSuccessTitle: string;
    orderSuccessText: string;
    sendOrderWhatsappBtn: string;
    paymentMethodsSectionTitle: string;
    locationLabel: string;
    whatsappLabel: string;
    rightsReserved: string;
  }
> = {
  es: {
    topBarPromo:
      "📍 Maracay, Edo. Aragua • Camisetas Exclusivas a $20 USD • Pagos: Zelle, Pago Móvil y Efectivo USD • WhatsApp +58 412-3776184",
    navHome: "Inicio",
    navCatalog: "Catálogo",
    navTrackOrder: "Rastrear Pedido",
    navContact: "Contacto",
    navAdmin: "Panel Admin",
    searchPlaceholder: "Buscar camisetas, tallas o colores...",
    heroBadge: "COLECCIÓN OFICIAL • MARACAY, ARAGUA",
    heroTitle: "Estilo Premium al Mejor Precio: Todo a $20 USD",
    heroSubtitle:
      "Franelas y camisetas de alta calidad con diseños exclusivos. Compra sin registro obligatorio y coordina tu pago por Zelle, Pago Móvil o Efectivo USD.",
    heroCtaPrimary: "Ver Catálogo ($20)",
    heroCtaWhatsapp: "Pedir por WhatsApp",
    priceUnitBanner: "Precio único por unidad: $20.00 USD",
    categoriesTitle: "Categorías Destacadas",
    featuredTitle: "Catálogo de Camisetas ($20 USD)",
    featuredSubtitle:
      "Selecciona tu talla y color favorito. Envíos en Maracay, Estado Aragua y toda Venezuela.",
    allProducts: "Todos",
    filterAll: "Todas las categorías",
    addToCart: "Agregar al carrito",
    buyNowWhatsapp: "Comprar ahora",
    outOfStock: "Agotado",
    inStock: "Disponible",
    sizeLabel: "Talla",
    colorLabel: "Color",
    quantityLabel: "Cantidad",
    cartTitle: "Tu Carrito de Compras",
    cartEmpty: "Tu carrito está vacío. ¡Explora nuestras camisetas a $20 USD!",
    subtotal: "Subtotal",
    shippingNote: "El envío se confirma con el asesor según tu zona en Maracay / Venezuela.",
    proceedToCheckout: "Finalizar Pedido",
    checkoutTitle: "Finalizar Compra (Sin Registro Obligatorio)",
    checkoutSubtitle:
      "Completa tus datos de entrega. Nuestro equipo de VNex Market en Maracay confirmará tu pedido de inmediato.",
    firstName: "Nombre *",
    lastName: "Apellido *",
    phone: "Teléfono / WhatsApp (+58) *",
    emailOptional: "Correo electrónico (opcional)",
    estado: "Estado *",
    ciudad: "Ciudad *",
    direccion: "Dirección exacta *",
    referencia: "Punto de referencia",
    comentariosOptional: "Comentarios o notas del pedido (opcional)",
    paymentMethodLabel: "Método de Pago Manual",
    shippingMethodLabel: "Método de Entrega",
    shippingPickupMaracay: "Retiro Personal en Maracay, Edo. Aragua (Gratis)",
    shippingDeliveryAragua: "Delivery en Maracay / Aragua (A confirmar)",
    shippingNational: "Envío Nacional MRW / Zoom / Tealca (Cobro en destino)",
    confirmOrderBtn: "Confirmar Pedido ($ USD)",
    orderSuccessTitle: "¡Pedido Creado con Éxito!",
    orderSuccessText:
      "Tu orden ha sido registrada con estado Pendiente de Confirmación. Envía tu comprobante o confirma por WhatsApp para coordinar el pago y la entrega.",
    sendOrderWhatsappBtn: "Enviar Pedido por WhatsApp (+58 412-3776184)",
    paymentMethodsSectionTitle: "Métodos de Pago Aceptados",
    locationLabel: "Ubicación",
    whatsappLabel: "Atención por WhatsApp",
    rightsReserved: "Todos los derechos reservados. Maracay, Estado Aragua, Venezuela.",
  },
  en: {
    topBarPromo:
      "📍 Maracay, Aragua State • Exclusive T-Shirts at $20 USD • Payments: Zelle, Pago Móvil & Cash USD • WhatsApp +58 412-3776184",
    navHome: "Home",
    navCatalog: "Catalog",
    navTrackOrder: "Track Order",
    navContact: "Contact",
    navAdmin: "Admin Panel",
    searchPlaceholder: "Search t-shirts, sizes, or colors...",
    heroBadge: "OFFICIAL COLLECTION • MARACAY, ARAGUA",
    heroTitle: "Premium Streetwear Style: Every Shirt $20 USD",
    heroSubtitle:
      "High-quality T-shirts with exclusive graphic designs. Guest checkout with no mandatory registration — pay via Zelle, Pago Móvil, or Cash USD.",
    heroCtaPrimary: "Browse Catalog ($20)",
    heroCtaWhatsapp: "Order via WhatsApp",
    priceUnitBanner: "Flat unit price: $20.00 USD",
    categoriesTitle: "Featured Categories",
    featuredTitle: "T-Shirt Collection ($20 USD)",
    featuredSubtitle:
      "Choose your size and color. Local pickup & delivery in Maracay, Aragua State, and nationwide shipping across Venezuela.",
    allProducts: "All",
    filterAll: "All categories",
    addToCart: "Add to Cart",
    buyNowWhatsapp: "Buy Now",
    outOfStock: "Out of Stock",
    inStock: "In Stock",
    sizeLabel: "Size",
    colorLabel: "Color",
    quantityLabel: "Quantity",
    cartTitle: "Your Shopping Cart",
    cartEmpty: "Your cart is empty. Explore our $20 USD T-shirt collection!",
    subtotal: "Subtotal",
    shippingNote: "Delivery fee is confirmed by our manager based on your zone in Maracay / Venezuela.",
    proceedToCheckout: "Proceed to Checkout",
    checkoutTitle: "Guest Checkout (No Registration Required)",
    checkoutSubtitle:
      "Enter your delivery details. Our VNex Market team in Maracay will confirm your order right away.",
    firstName: "First Name *",
    lastName: "Last Name *",
    phone: "Phone / WhatsApp (+58) *",
    emailOptional: "Email address (optional)",
    estado: "State (Estado) *",
    ciudad: "City (Ciudad) *",
    direccion: "Street Address *",
    referencia: "Landmark / Reference",
    comentariosOptional: "Order comments or notes (optional)",
    paymentMethodLabel: "Manual Payment Method",
    shippingMethodLabel: "Delivery Method",
    shippingPickupMaracay: "Local Pickup in Maracay, Aragua State (Free)",
    shippingDeliveryAragua: "Local Delivery in Maracay / Aragua (Confirmed by manager)",
    shippingNational: "Nationwide Shipping MRW / Zoom / Tealca (Pay on delivery)",
    confirmOrderBtn: "Confirm Order ($ USD)",
    orderSuccessTitle: "Order Successfully Created!",
    orderSuccessText:
      "Your order has been registered with status Pending Confirmation. Send your order details via WhatsApp to coordinate payment and delivery.",
    sendOrderWhatsappBtn: "Send Order on WhatsApp (+58 412-3776184)",
    paymentMethodsSectionTitle: "Accepted Payment Methods",
    locationLabel: "Location",
    whatsappLabel: "WhatsApp Support",
    rightsReserved: "All rights reserved. Maracay, Aragua State, Venezuela.",
  },
};
