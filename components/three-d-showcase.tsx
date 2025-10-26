"use client"

import { useEffect, useRef } from "react"

export default function ThreeDShowcase({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Simple animated 3D-like grid and floating shapes using CSS only
    // Create floating shapes
    const shapes = ["cube", "pyramid", "ring"] as const
    shapes.forEach((type, idx) => {
      const d = document.createElement("div")
      d.className = `shape ${type}`
      d.style.animationDelay = `${idx * 0.6}s`
      el.appendChild(d)
    })
    return () => {
      while (el.firstChild) el.removeChild(el.firstChild)
    }
  }, [])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 grid-3d opacity-40" />
      <div className="absolute -inset-24 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.25),transparent_40%),radial-gradient(circle_at_30%_70%,rgba(236,72,153,0.2),transparent_45%)] blur-3xl" />
    </div>
  )
}