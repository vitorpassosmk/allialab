'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'
import Button from '@/components/ui/Button'
import { fadeUp, scaleInDelayed, staggerContainer, auraInner, auraOuter, symbolGlow } from '@/lib/motion'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-slate-900 overflow-hidden">
      {/* Shader background */}
      {dimensions && !reduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <MeshGradient
            width={dimensions.width}
            height={dimensions.height}
            colors={['#080A11', '#0C0F1C', '#121831', '#1C2138', '#27568C', '#3570B5', '#E85419']}
            distortion={0.6}
            swirl={0.5}
            grainMixer={0}
            grainOverlay={0}
            speed={0.25}
            offsetX={0.05}
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[55fr_45fr] gap-12 items-center py-20">

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

        {/* Right column — logo vertical */}
        <motion.div
          initial={initial}
          animate="visible"
          variants={scaleInDelayed}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Aura + hover wrapper */}
          <motion.div
            initial={reduceMotion ? 'visible' : 'hidden'}
            animate="visible"
            whileHover="hovered"
            className="relative flex items-center justify-center"
          >
            <motion.div
              variants={auraOuter}
              className="absolute w-[560px] h-[560px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(232,84,25,0.18) 0%, transparent 70%)' }}
            />
            <motion.div
              variants={auraInner}
              className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(53,112,181,0.38) 0%, transparent 70%)' }}
            />
            <motion.div variants={symbolGlow} className="relative z-10">
              <Image
                src="/allia-symbol.svg"
                alt="ALLiA LAB"
                width={360}
                height={360}
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
