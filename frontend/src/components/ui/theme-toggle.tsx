'use client'

import { useTheme } from '@/components/ui/theme-provider'

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return null
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      aria-label="Basculer le thème clair ou sombre"
    >
      {theme === 'dark' ? '🌙 Mode sombre' : '☀️ Mode clair'}
    </button>
  )
}
