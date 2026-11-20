import { useEffect, useRef, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const FADE_MS = 350 // a little longer than the 0.3s CSS fade in index.css

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function savedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

export default function ThemeToggle() {
  // index.html already set data-theme before React loaded; start from that.
  const [theme, setTheme] = useState<Theme>(currentTheme)
  const fadeTimer = useRef<number | undefined>(undefined)

  // Switch the theme with one shared fade: .theme-switching gives every element
  // the same transition, then it is removed so normal hover effects stay snappy.
  const applyTheme = (next: Theme) => {
    const root = document.documentElement
    root.classList.add('theme-switching')
    root.dataset.theme = next
    setTheme(next)
    window.clearTimeout(fadeTimer.current)
    fadeTimer.current = window.setTimeout(() => root.classList.remove('theme-switching'), FADE_MS)
  }

  // Follow the operating system's setting until the visitor picks a theme themselves.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      if (!savedTheme()) applyTheme(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
      window.clearTimeout(fadeTimer.current)
    }
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be unavailable (e.g. some private modes); the toggle still works for this visit.
    }
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Dark theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 1.5 A6.5 6.5 0 0 1 8 14.5 Z" fill="currentColor" />
      </svg>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
