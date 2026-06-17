export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {/* TODO: Add Navigation */}
        <main>
          {children}
        </main>
        {/* TODO: Add Footer */}
      </body>
    </html>
  )
}
