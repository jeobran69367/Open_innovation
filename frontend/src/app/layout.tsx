import { SearchBar } from "@/components/features/SearchBar";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="font-bold text-xl">
              🔍 Open Innovation
            </div>
            <div className="flex-1 max-w-md mx-8">
              <SearchBar />
            </div>
            <div>
              {/* TODO: Add user menu */}
            </div>
          </nav>
        </header>
        <main>
          {children}
        </main>
        {/* TODO: Add Footer */}
      </body>
    </html>
  )
}
