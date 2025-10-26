"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

export default function CounterUp({ to = 100, duration = 1.2, className = "", suffix = "%" }: { to?: number, duration?: number, className?: string, suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    const controls = animate(0, to, { duration, onUpdate: (v) => count.set(v as number), ease: "easeOut" })
    return () => controls.stop()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to])

  return (
    <span className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}