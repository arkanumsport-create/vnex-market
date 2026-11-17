import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VNEX MARKET — Exclusive Boutique | Luxury Turkish Import | Maracay, Venezuela",
  description:
    "Boutique exclusiva VNEX MARKET en Maracay, Estado Aragua, Venezuela. Importación directa desde fábricas de Turquía. Prendas 100% nuevas con etiqueta original y certificado de calidad a $20.00 USD.",
  manifest: "/manifest.webmanifest",
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
      </head>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
