"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const enabled = stored ? stored === 'dark' : !!prefersDark
    document.documentElement.classList.toggle('dark', enabled)
    return enabled
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  function toggle() {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <Button onClick={toggle} variant="outline" aria-label="Toggle theme" className="rounded-full border-slate-300 text-slate-900 bg-white hover:bg-slate-100">
      {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
    </Button>
  )
}
