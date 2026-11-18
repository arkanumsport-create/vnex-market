import { Locale, PaymentMethodId } from "@/types/store";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetUrl(path: string): string {
  if (!path) return `${BASE_PATH}/logo/vnex-logo.jpg`;
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  if (BASE_PATH && path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

export const LOOKBOOK_MODELS = [
  {
    id: "model-01",
    indexLabel: "01 / 05",
    src: "/lookbook/model-01.jpg",
    titleEs: "PRADA MILANO RED CREST — ESTUDIO",
    titleEn: "PRADA MILANO RED CREST — STUDIO",
    subtitleEs: "Algodón Turco Peinado • Etiqueta y Certificado Original",
    subtitleEn: "Combed Turkish Cotton • Original Tag & Certificate",
  },
  {
    id: "model-02",
    indexLabel: "02 / 05",
    indexNum: 2,
    src: "/lookbook/model-02.jpg",
    titleEs: "CHRISTIAN DIOR 1947 PATCHES — LUXURY LOUNGE",
    titleEn: "CHRISTIAN DIOR 1947 PATCHES — LUXURY LOUNGE",
    subtitleEs: "Parches Bordados de Alta Precisión • Importación Turquía",
    subtitleEn: "High-Precision Embroidered Patches • Turkish Import",
  },
  {
    id: "model-03",
    indexLabel: "03 / 05",
    src: "/lookbook/model-03.jpg",
    titleEs: "OFF-WHITE STREET EDITION — URBAN EDITORIAL",
    titleEn: "OFF-WHITE STREET EDITION — URBAN EDITORIAL",
    subtitleEs: "Estampado de Alta Densidad • 100% Nuevo con Etiqueta",
    subtitleEn: "High-Density Print • 100% Brand New with Tags",
  },
  {
    id: "model-04",
    indexLabel: "04 / 05",
    src: "/lookbook/model-04.jpg",
    titleEs: "OFF-WHITE ORANGE VIBES — OUTDOOR SESSION",
    titleEn: "OFF-WHITE ORANGE VIBES — OUTDOOR SESSION",
    subtitleEs: "Colores Vibrantes Certificados • Corte Contemporáneo",
    subtitleEn: "Certified Vibrant Dye • Contemporary Cut",
  },
  {
    id: "model-05",
    indexLabel: "05 / 05",
    src: "/lookbook/model-05.jpg",
    titleEs: "LOUIS VUITTON DRIP EDITION — MARACAY LOOKBOOK",
    titleEn: "LOUIS VUITTON DRIP EDITION — MARACAY LOOKBOOK",
    subtitleEs: "Calidad Premium de Exportación • Todo a $20.00 USD",
    subtitleEn: "Export-Grade Premium Quality • Flat $20.00 USD",
  },
];

export const LOOKBOOK_VIDEOS = [
  {
    id: "video-01",
    src: "/lookbook/video-01.mp4",
    poster: "/lookbook/model-01.jpg",
    titleEs: "Backstage & Lookbook Oficial — Sesión I",
    titleEn: "Official Backstage & Lookbook — Session I",
    descEs: "Textura real, caída perfecta y detalles de fábrica turca en movimiento.",
    descEn: "Real fabric texture, drape, and Turkish factory craftsmanship in motion.",
  },
  {
    id: "video-02",
    src: "/lookbook/video-02.mp4",
    poster: "/lookbook/model-05.jpg",
    titleEs: "Lookbook Streetwear Maracay — Sesión II",
    titleEn: "Maracay Streetwear Lookbook — Session II",
    descEs: "Prendas 100% nuevas con etiqueta original y certificado de calidad.",
    descEn: "100% brand new garments with original factory tags and quality certificate.",
  },
];

export const STORE_CONFIG = {
  name: "VNEX MARKET",
  subtitleEs: "EXCLUSIVE BOUTIQUE • TURKISH LUXURY",
  subtitleEn: "EXCLUSIVE BOUTIQUE • TURKISH LUXURY",
  whatsappNumber: "+584123776184",
  whatsappClean: "584123776184",
  whatsappDisplay: "+58 412-3776184",
  instagramUrl: "https://www.instagram.com/max642553?igsi=MXNzcHJyZWVraWN6bg==",
  instagramHandle: "@max642553",
  locationEs: "Maracay, Plaza La Soledad, Calle 9, Edo. Aragua, Venezuela",
  locationEn: "Maracay, Plaza La Soledad, Calle 9, Aragua State, Venezuela",
  shortLocationEs: "Plaza La Soledad, Calle 9 • Maracay, Aragua",
  shortLocationEn: "Plaza La Soledad, Street 9 • Maracay, Aragua",
  mapCoordinates: { lat: 10.2586, lng: -67.5912 },
  defaultPriceUsd: 20.0,
  manualVesRate: 65.5,
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
      nameEs: "Efectivo USD (Maracay)",
      nameEn: "Cash USD (Maracay)",
      badge: "Efectivo USD",
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
    menuButton: string;
    sidebarSubtitle: string;
    sidebarHeading: string;
    navCatalog: string;
    navLookbook: string;
    navAboutTurkey: string;
    navAdmin: string;
    searchPlaceholder: string;
    heroEyebrow: string;
    heroSlogan: string;
    heroDescription: string;
    heroCtaPrimary: string;
    heroCtaWhatsapp: string;
    replayIntro: string;
    catalogEyebrow: string;
    catalogTitle: string;
    catalogSubtitle: string;
    allProducts: string;
    addToCart: string;
    buyNowWhatsapp: string;
    outOfStock: string;
    inStock: string;
    sizeLabel: string;
    colorLabel: string;
    quantityLabel: string;
    turkeyBadgeTitle: string;
    turkeyBadgeText: string;
    lookbookEyebrow: string;
    lookbookTitle: string;
    lookbookSubtitle: string;
    aboutEyebrow: string;
    aboutTitle: string;
    aboutDescription: string;
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
    topBarPromo: "IMPORTACIÓN DIRECTA DE TURQUÍA • NUEVO CON ETIQUETA Y CERTIFICADO • ENVÍOS NACIONALES",
    menuButton: "MENÚ",
    sidebarSubtitle: "N° 01 • BOUTIQUE EXCLUSIVA",
    sidebarHeading: "EXPLORAR COLECCIÓN",
    navCatalog: "Catálogo Exclusivo",
    navLookbook: "Fotoset & Videos",
    navAboutTurkey: "Fábrica de Turquía / Nosotros",
    navAdmin: "Panel Admin",
    searchPlaceholder: "Buscar franelas, marcas, tallas...",
    heroEyebrow: "COLECCIÓN 2026 • IMPORTACIÓN DIRECTA DE TURQUÍA",
    heroSlogan: "¡VISTE LA EXCELENCIA! ¡NO SEAS COMO LOS DEMÁS, MARCA TU PROPIO ESTILO!",
    heroDescription:
      "Suministro directo desde las mejores fábricas textiles de Turquía. Todas nuestras prendas son 100% nuevas, con etiqueta original y certificado de calidad internacional en Maracay, Venezuela. Precio único: $20.00 USD.",
    heroCtaPrimary: "VER COLECCIÓN ($20)",
    heroCtaWhatsapp: "VENTAS DIRECTAS VÍA WHATSAPP",
    replayIntro: "Repetir Intro",
    catalogEyebrow: "CATÁLOGO EXCLUSIVO • CALIDAD TURCA CERTIFICADA",
    catalogTitle: "TODOS LOS PRODUCTOS",
    catalogSubtitle:
      "Haz clic en cualquier prenda para ampliar la fotografía en alta definición y revisar sus detalles de fábrica.",
    allProducts: "TODOS LOS PRODUCTOS",
    addToCart: "AÑADIR AL CARRITO",
    buyNowWhatsapp: "COMPRAR POR WHATSAPP",
    outOfStock: "AGOTADO",
    inStock: "DISPONIBLE",
    sizeLabel: "TALLA",
    colorLabel: "COLOR",
    quantityLabel: "CANTIDAD",
    turkeyBadgeTitle: "ORIGEN: FÁBRICA DE TURQUÍA • NUEVO CON ETIQUETA Y CERTIFICADO",
    turkeyBadgeText:
      "Prenda importada directamente de fábrica en Turquía. 100% nueva con etiquetas tejidas/colgantes originales y certificado de control de calidad textil.",
    lookbookEyebrow: "EDITORIAL OFICIAL • MARACAY, ARAGUA",
    lookbookTitle: "FOTOSET & VIDEOS",
    lookbookSubtitle:
      "Sesión fotográfica y videos reales de nuestras franelas importadas de Turquía. Haz clic en cualquier foto para ampliarla.",
    aboutEyebrow: "SOBRE NOSOTROS & GARANTÍA DE ORIGEN",
    aboutTitle: "DIRECTO DESDE LAS FÁBRICAS DE TURQUÍA",
    aboutDescription:
      "En VNEX MARKET trabajamos sin intermediarios directamente con fabricantes textiles certificados en Turquía. Cada prenda que recibes en Maracay o en cualquier estado de Venezuela es 100% nueva, cuenta con su etiqueta original de fábrica y sello de calidad garantizada.",
    cartTitle: "CARRITO DE COMPRAS",
    cartEmpty: "Tu bolsa está vacía. Explora nuestra colección turca a $20.00 USD.",
    subtotal: "Subtotal",
    shippingNote: "Retiro gratis en Maracay o envío nacional (MRW / Zoom / Tealca).",
    proceedToCheckout: "FINALIZAR PEDIDO",
    checkoutTitle: "DATOS DE ENTREGA (SIN REGISTRO)",
    checkoutSubtitle:
      "Completa tus datos. Confirmaremos tu pedido inmediatamente por WhatsApp (+58 412-3776184).",
    firstName: "Nombre *",
    lastName: "Apellido *",
    phone: "Teléfono / WhatsApp (+58) *",
    emailOptional: "Correo electrónico (opcional)",
    estado: "Estado *",
    ciudad: "Ciudad *",
    direccion: "Dirección exacta *",
    referencia: "Punto de referencia",
    comentariosOptional: "Notas del pedido (opcional)",
    paymentMethodLabel: "Método de Pago",
    shippingMethodLabel: "Método de Entrega",
    shippingPickupMaracay: "Retiro Personal en Maracay, Edo. Aragua (Gratis)",
    shippingDeliveryAragua: "Delivery en Maracay / Aragua (A coordinar)",
    shippingNational: "Envío Nacional MRW / Zoom / Tealca",
    confirmOrderBtn: "CONFIRMAR PEDIDO",
    orderSuccessTitle: "¡ORDEN REGISTRADA CON ÉXITO!",
    orderSuccessText:
      "Tu orden está lista. Presiona el botón de WhatsApp para enviar el detalle a nuestro equipo en Maracay y coordinar tu pago por Zelle, Pago Móvil o Efectivo USD.",
    sendOrderWhatsappBtn: "ENVIAR PEDIDO POR WHATSAPP (+58 412-3776184)",
    paymentMethodsSectionTitle: "Métodos de Pago Aceptados",
    locationLabel: "Ubicación",
    whatsappLabel: "Ventas WhatsApp",
    rightsReserved: "Todos los derechos reservados. Maracay, Estado Aragua, Venezuela.",
  },
  en: {
    topBarPromo: "DIRECT TURKISH FACTORY IMPORT • BRAND NEW WITH TAGS & CERTIFICATE • NATIONWIDE SHIPPING",
    menuButton: "MENU",
    sidebarSubtitle: "N° 01 • EXCLUSIVE BOUTIQUE",
    sidebarHeading: "EXPLORE COLLECTION",
    navCatalog: "Exclusive Catalog",
    navLookbook: "Photoset & Videos",
    navAboutTurkey: "Turkish Factory / About Us",
    navAdmin: "Admin Panel",
    searchPlaceholder: "Search t-shirts, brands, sizes...",
    heroEyebrow: "2026 COLLECTION • DIRECT IMPORT FROM TURKEY",
    heroSlogan: "WEAR EXCELLENCE! DON'T BE LIKE THE REST, DEFINE YOUR OWN STYLE!",
    heroDescription:
      "Direct supply from premier textile factories in Turkey. Every garment is 100% brand new with original tags and an international quality certificate in Maracay, Venezuela. Flat price: $20.00 USD.",
    heroCtaPrimary: "VIEW COLLECTION ($20)",
    heroCtaWhatsapp: "DIRECT SALES VIA WHATSAPP",
    replayIntro: "Replay Intro",
    catalogEyebrow: "EXCLUSIVE CATALOG • CERTIFIED TURKISH QUALITY",
    catalogTitle: "ALL PRODUCTS",
    catalogSubtitle:
      "Click any garment to open the high-definition detail panel and zoom in on the fabric and print.",
    allProducts: "ALL PRODUCTS",
    addToCart: "ADD TO BAG",
    buyNowWhatsapp: "BUY VIA WHATSAPP",
    outOfStock: "OUT OF STOCK",
    inStock: "AVAILABLE",
    sizeLabel: "SIZE",
    colorLabel: "COLOR",
    quantityLabel: "QUANTITY",
    turkeyBadgeTitle: "ORIGIN: TURKISH FACTORY • BRAND NEW WITH TAGS & CERTIFICATE",
    turkeyBadgeText:
      "Imported directly from our partner factory in Turkey. 100% brand new with original woven/hang tags and textile quality control certification.",
    lookbookEyebrow: "OFFICIAL EDITORIAL • MARACAY, ARAGUA",
    lookbookTitle: "PHOTOSET & VIDEOS",
    lookbookSubtitle:
      "Official photoshoot and live videos of our Turkish-imported T-shirts. Click any photo to enlarge.",
    aboutEyebrow: "ABOUT US & ORIGIN GUARANTEE",
    aboutTitle: "DIRECT FROM TURKEY'S PREMIER FACTORIES",
    aboutDescription:
      "At VNEX MARKET we work directly with certified textile manufacturers in Turkey without middlemen. Every garment delivered in Maracay or across Venezuela is 100% brand new, complete with original factory tags and certified quality.",
    cartTitle: "SHOPPING BAG",
    cartEmpty: "Your bag is empty. Explore our $20.00 USD Turkish collection.",
    subtotal: "Subtotal",
    shippingNote: "Free pickup in Maracay or nationwide shipping (MRW / Zoom / Tealca).",
    proceedToCheckout: "PROCEED TO CHECKOUT",
    checkoutTitle: "DELIVERY DETAILS (GUEST CHECKOUT)",
    checkoutSubtitle:
      "Enter your details. Our team in Maracay will confirm your order via WhatsApp (+58 412-3776184).",
    firstName: "First Name *",
    lastName: "Last Name *",
    phone: "Phone / WhatsApp (+58) *",
    emailOptional: "Email (optional)",
    estado: "State *",
    ciudad: "City *",
    direccion: "Street Address *",
    referencia: "Landmark / Reference",
    comentariosOptional: "Order notes (optional)",
    paymentMethodLabel: "Payment Method",
    shippingMethodLabel: "Delivery Method",
    shippingPickupMaracay: "Personal Pickup in Maracay, Aragua State (Free)",
    shippingDeliveryAragua: "Local Delivery in Maracay / Aragua",
    shippingNational: "Nationwide Shipping MRW / Zoom / Tealca",
    confirmOrderBtn: "CONFIRM ORDER",
    orderSuccessTitle: "ORDER SUCCESSFULLY CREATED!",
    orderSuccessText:
      "Your order is registered. Click the WhatsApp button below to send your order details to our Maracay team and coordinate payment via Zelle, Pago Móvil, or Cash USD.",
    sendOrderWhatsappBtn: "SEND ORDER ON WHATSAPP (+58 412-3776184)",
    paymentMethodsSectionTitle: "Accepted Payment Methods",
    locationLabel: "Location",
    whatsappLabel: "WhatsApp Sales",
    rightsReserved: "All rights reserved. Maracay, Aragua State, Venezuela.",
  },
};
