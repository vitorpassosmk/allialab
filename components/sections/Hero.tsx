'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { fadeUp, scaleInDelayed, staggerContainer } from '@/lib/motion'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section className="min-h-screen flex items-center pt-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[55fr_45fr] gap-12 items-center py-20">

        {/* Left column — text */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl lg:text-6xl font-bold text-slate-50 leading-tight"
          >
            A IA não vai te substituir.{' '}
            <span className="text-steel-400">Nós vamos te multiplicar.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-slate-300 max-w-lg mt-6"
          >
            Aliamos estratégia humana e inteligência artificial para gerar
            crescimento real — sem jargão, sem promessa vazia.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Button variant="primary" size="lg" href="/diagnostico">
              Diagnóstico gratuito
            </Button>
            <Button variant="secondary" size="lg" href="/cases">
              Ver cases
            </Button>
          </motion.div>
        </motion.div>

        {/* Right column — trefoil */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={scaleInDelayed}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div
            className="absolute w-[480px] h-[480px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(39,86,140,0.25) 0%, transparent 70%)',
            }}
          />
          <Image
            src="/trefoil.png"
            alt="ALLiA LAB — três loops: Humano · IA · Sistemas"
            width={320}
            height={320}
            priority
            className="relative z-10"
          />
        </motion.div>

      </div>
    </section>
  )
}
