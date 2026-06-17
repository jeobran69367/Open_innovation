'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : prefersDark
        ? 'dark'
        : 'light'

    setTheme(initialTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, mounted }),
    [theme, mounted]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
