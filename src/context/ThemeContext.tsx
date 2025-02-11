import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

const lightTheme = {
  background: '#ffffff',
  text: '#1d1d1f',
  textSecondary: 'rgba(29, 29, 31, 0.8)',
  cardBg: '#ffffff',
  navBg: 'rgba(255, 255, 255, 0.85)',
  border: 'rgba(0, 0, 0, 0.1)',
  primary: '#06c',
  primaryHover: '#0055b3',
  inputBg: '#ffffff',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)',
  shadowHover: '0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.12)',
  navShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
  buttonBg: 'rgba(0, 0, 0, 0.05)',
  buttonHover: 'rgba(0, 0, 0, 0.1)',
  onlineTag: '#34c759',
  cardBorder: 'none',
  gradientBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.02) 100%)',
  cardGradient: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
  imageOverlay: 'rgba(0, 0, 0, 0.03)'
}

const darkTheme = {
  background: '#000000',
  text: '#f5f5f7',
  textSecondary: 'rgba(245, 245, 247, 0.8)',
  cardBg: 'rgba(29, 29, 31, 0.7)',
  navBg: 'rgba(0, 0, 0, 0.85)',
  border: 'rgba(255, 255, 255, 0.1)',
  primary: '#0a84ff',
  primaryHover: '#0070e0',
  inputBg: 'rgba(29, 29, 31, 0.7)',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.3)',
  shadowHover: '0 2px 8px rgba(0, 0, 0, 0.3), 0 8px 24px rgba(0, 0, 0, 0.4)',
  navShadow: '0 1px 0 rgba(255, 255, 255, 0.1)',
  buttonBg: 'rgba(255, 255, 255, 0.08)',
  buttonHover: 'rgba(255, 255, 255, 0.12)',
  onlineTag: '#30d158',
  cardBorder: '1px solid rgba(255, 255, 255, 0.08)',
  gradientBg: 'linear-gradient(180deg, rgba(29, 29, 31, 0) 0%, rgba(29, 29, 31, 0.7) 100%)',
  cardGradient: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)',
  imageOverlay: 'rgba(0, 0, 0, 0.2)'
}

type Theme = typeof lightTheme

interface ThemeContextType {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  const theme = isDark ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 