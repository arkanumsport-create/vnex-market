import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0c1424",
};

export const metadata: Metadata = {
  title: "VNEX MARKET — Exclusive Boutique | Luxury Turkish Import | Maracay, Venezuela",
  description:
    "Boutique exclusiva VNEX MARKET en Maracay, Plaza La Soledad, Calle 9, Estado Aragua, Venezuela. Importación directa desde fábricas de Turquía. Prendas 100% nuevas con etiqueta original y certificado de calidad a $20.00 USD.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VNex Market",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VNex Market" />
      </head>
      <body className="min-h-screen flex flex-col antialiased overflow-x-clip">{children}</body>
    </html>
  );
}
