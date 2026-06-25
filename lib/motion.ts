import type { Variants } from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1] as const

export const spring = { type: 'spring', stiffness: 100, damping: 20 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease } },
}

export const fadeInDelayed: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease, delay: 0.2 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
}

export const scaleInDelayed: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease, delay: 0.3 } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 2, ease }, opacity: { duration: 0.3 } },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

export const viewport = { once: true, margin: '-80px' }

export const auraInner: Variants = {
  hidden: { opacity: 0.8, scale: 1.7 },
  visible: { opacity: 0.22, scale: 1, transition: { duration: 1.4, ease } },
  hovered: { opacity: 0.48, scale: 1.06, transition: { duration: 0.5, ease } },
}

export const auraOuter: Variants = {
  hidden: { opacity: 0.5, scale: 2.2 },
  visible: { opacity: 0.07, scale: 1, transition: { duration: 1.8, ease } },
  hovered: { opacity: 0.2, scale: 1.14, transition: { duration: 0.5, ease } },
}

export const symbolGlow: Variants = {
  hidden: { filter: 'drop-shadow(0 0 0px rgba(77,143,214,0))' },
  visible: { filter: 'drop-shadow(0 0 0px rgba(77,143,214,0))', transition: { duration: 0.5, ease } },
  hovered: {
    filter: 'drop-shadow(0 0 24px rgba(77,143,214,0.55)) drop-shadow(0 0 52px rgba(232,84,25,0.22))',
    transition: { duration: 0.5, ease },
  },
}
