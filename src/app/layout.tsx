
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: 'Ganga Medical | Trust-Inspired Digital Pharmacy',
  description: 'Ganga Medical Store - Your reliable online pharmacy for prescription medicines, health consultations, and blood tests.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
