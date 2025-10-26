"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export default function MotionButton({
  children,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "outline"
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const tx = useSpring(x, { stiffness: 300, damping: 20 })
  const ty = useSpring(y, { stiffness: 300, damping: 20 })
  const transform = useTransform([tx, ty], ([vx, vy]) => `translate(${vx}px, ${vy}px)`)

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.08)
    y.set(dy * 0.08)
  }
  function onLeave() { x.set(0); y.set(0) }

  const base = variant === "primary"
    ? "bg-slate-900 text-white hover:bg-slate-800"
    : "border border-slate-300 text-slate-900 bg-white hover:bg-slate-100"

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{ transform }}
      className={`relative h-12 rounded-full px-7 shadow-sm transition ${base} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition" />
    </motion.button>
  )
}