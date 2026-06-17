import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Open Innovation - Découvrez les meilleurs projets open source',
  description:
    'Plateforme intelligente de curation et de découverte de logiciels open source utilisant l\'IA et le RAG',
  keywords: [
    'open source',
    'projets',
    'découverte',
    'intelligence artificielle',
    'RAG',
    'GitHub',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="bg-white dark:bg-slate-950">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
