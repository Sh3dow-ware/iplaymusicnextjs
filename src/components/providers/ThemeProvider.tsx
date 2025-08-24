'use client'
import "@/styles/themes/MainTheme.sass"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme | null
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)


// ThemeProvider Accepts props of type ReactNode such as JSX.Element or an array of JSX.Elements, string, number, boolean, etc.
// This allows the component to render any valid React child elements.
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null)


  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    setTheme(saved ?? 'light')
  }, [])


  useEffect(() => {
    if (!theme) return
    document.body.classList.remove(theme === 'light' ? 'dark' : 'light')
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    if (!theme) return
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return (
      <ThemeContext value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context)
    throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
