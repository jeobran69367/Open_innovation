import { ThemeProvider } from '@/components/ui/theme-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Innovation - Discover Mature Open Source Projects',
  description: 'An intelligent platform for discovering and curating mature, high-quality open source projects.',
  keywords: [
    'open source',
    'projects',
    'discovery',
    'github',
    'mature projects',
    'software catalog',
  ],
  openGraph: {
    title: 'Open Innovation - Discover Mature Open Source Projects',
    description: 'An intelligent platform for discovering and curating mature, high-quality open source projects.',
    type: 'website',
    url: 'https://open-innovation.example.com',
    siteName: 'Open Innovation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Innovation - Discover Mature Open Source Projects',
    description: 'An intelligent platform for discovering and curating mature, high-quality open source projects.',
  },
  viewport: 'width=device-width, initial-scale=1.0',
  charset: 'utf-8',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ThemeProvider>
          <main className="min-h-screen bg-background text-foreground">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
