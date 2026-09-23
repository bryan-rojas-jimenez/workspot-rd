import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WorkSpot RD - Encuentra tu Espacio de Trabajo Remoto Ideal',
  description: 'Plataforma colaborativa en tiempo real para encontrar cafeterías, coworkings y espacios con buen Wi-Fi, silencio y tomacorrientes en Santo Domingo, República Dominicana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
