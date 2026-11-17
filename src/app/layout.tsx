import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VNex Market — Online Store | Camisetas Exclusivas $20 USD | Maracay, Aragua",
  description:
    "Tienda online oficial VNex Market en Maracay, Estado Aragua, Venezuela. Camisetas y franelas exclusivas a $20 USD. Pagos por Zelle, Pago Móvil y Efectivo USD. WhatsApp +58 412-3776184.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/logo/vnex-logo.jpg",
    apple: "/icons/icon-192.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
