'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, slideInLeft, staggerContainer, viewport } from '@/lib/motion'

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Entendemos seu negócio, seus gargalos e onde a aliança gera mais impacto.',
  },
  {
    number: '02',
    title: 'Estratégia',
    description: 'Mapeamos a solução ideal, o stack certo e o caminho mais curto para o resultado.',
  },
  {
    number: '03',
    title: 'Construção',
    description: 'Executamos com precisão. Cada entrega é uma prova de competência.',
  },
  {
    number: '04',
    title: 'Evolução',
    description: 'Não abandonamos. Medimos, otimizamos e crescemos junto.',
  },
]

export default function Method({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section className={`py-24 bg-slate-800 ${className ?? ''}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-4"
          >
            COMO TRABALHAMOS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-4"
          >
            Como a aliança funciona
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-slate-300 max-w-xl mx-auto"
          >
            Um processo que respira clareza em cada passo.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="relative grid md:grid-cols-4 gap-0"
        >
          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-steel-600 to-transparent" />

          {steps.map(({ number, title, description }, i) => (
            <motion.div
              key={number}
              variants={slideInLeft}
              style={reduceMotion ? {} : { transitionDelay: `${i * 0.1}s` }}
              className="relative flex flex-col items-center text-center p-8 group"
            >
              {/* Step number circle */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 border-2 border-steel-600 mb-6 transition-colors group-hover:border-steel-400 group-hover:bg-steel-600/10">
                <span className="font-mono text-sm font-bold text-steel-400">
                  {number}
                </span>
              </div>

              {/* Vertical connector — mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden absolute top-[5.5rem] left-1/2 -translate-x-1/2 w-px h-8 bg-steel-600/40" />
              )}

              <h3 className="font-display text-lg font-semibold text-slate-50 mb-3">
                {title}
              </h3>
              <p className="font-body text-slate-300 text-sm leading-relaxed max-w-[200px]">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
