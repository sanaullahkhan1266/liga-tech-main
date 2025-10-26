"use client"

import { ReactNode, useRef, CSSProperties } from "react"

export default function InteractiveTilt({
  children,
  className = "",
  maxTilt = 12,
  glare = true,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (maxTilt / 2 - px * maxTilt).toFixed(2)
    const ry = (py * maxTilt - maxTilt / 2).toFixed(2)
    el.style.transform = `perspective(1000px) rotateX(${ry}deg) rotateY(${rx}deg) translateZ(0)`
    if (glare) {
      const gx = (px * 100).toFixed(2)
      const gy = (py * 100).toFixed(2)
      el.style.setProperty("--glare-x", `${gx}%`)
      el.style.setProperty("--glare-y", `${gy}%`)
    }
  }
  function handleLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative will-change-transform transition-transform duration-200 ${className}`}
      style={{ transformStyle: "preserve-3d" as CSSProperties["transformStyle"] }}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background:
              "radial-gradient(600px 200px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.15), transparent 60%)",
            mixBlendMode: "overlay",
            transform: "translateZ(20px)",
          }}
        />
      )}
    </div>
  )
}