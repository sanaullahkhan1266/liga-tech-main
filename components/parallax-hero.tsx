"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export default function ParallaxHero({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 600], [0, -60])
  const y2 = useTransform(scrollY, [0, 600], [0, -30])
  return (
    <div className="relative overflow-hidden">
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -inset-20 -z-10 bg-[radial-gradient(900px_500px_at_50%_-10%,rgba(2,132,199,0.12),transparent_60%),radial-gradient(700px_350px_at_90%_0%,rgba(15,23,42,0.08),transparent_55%)]" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute -inset-40 -z-10 bg-[radial-gradient(600px_300px_at_10%_20%,rgba(99,102,241,0.08),transparent_60%),radial-gradient(800px_300px_at_90%_60%,rgba(236,72,153,0.06),transparent_60%)]" />
      {children}
    </div>
  )
}