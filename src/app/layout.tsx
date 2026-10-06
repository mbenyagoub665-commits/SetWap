import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";

export const metadata: Metadata = {
  title: "C H A H R A · B E A U T Y | Luxury Algerian Beauty",
  description: "Boutique de beauté de luxe en Algérie. Natural elegance and premium local cosmetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-parchment text-charcoal font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
