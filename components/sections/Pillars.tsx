'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Users, Sparkles, Workflow } from 'lucide-react'
import { fadeUp, staggerContainer, viewport } from '@/lib/motion'

const pillars = [
  {
    number: '01',
    Icon: Users,
    label: 'Inteligência Humana',
    description: 'Criatividade, estratégia e visão. O que nenhuma IA substitui.',
  },
  {
    number: '02',
    Icon: Sparkles,
    label: 'Inteligência Artificial',
    description: 'Dados, aprendizado e automação. Trabalhando 24h com você.',
    featured: true,
  },
  {
    number: '03',
    Icon: Workflow,
    label: 'Sistemas & Execução',
    description: 'Processos, integração e resultados. Do plano à realidade.',
  },
]

export default function Pillars({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  return (
    <section className={`py-24 bg-slate-900 ${className ?? ''}`}>
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
            A ALIANÇA EM TRÊS DIMENSÕES
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-slate-50"
          >
            Humana{' '}
            <span className="text-slate-600">·</span>{' '}
            <span className="text-steel-400">IA</span>{' '}
            <span className="text-slate-600">·</span>{' '}
            Sistemas
          </motion.h2>
        </motion.div>

        {/* Pillars grid */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-0 relative"
        >
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[3.75rem] left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-steel-600 to-transparent" />

          {pillars.map(({ number, Icon, label, description, featured }) => (
            <motion.div
              key={number}
              variants={fadeUp}
              className={`relative flex flex-col items-center text-center p-8 rounded-xl border transition-colors ${
                featured
                  ? 'bg-slate-800 border-steel-600 shadow-[0_0_40px_-12px_rgba(53,112,181,0.4)]'
                  : 'bg-transparent border-slate-600/0 md:border-slate-600/0 hover:border-slate-600/60'
              }`}
            >
              {/* Number badge */}
              <span className="font-mono text-xs font-medium text-slate-600 mb-6 tracking-widest">
                {number}
              </span>

              {/* Icon */}
              <div
                className={`flex items-center justify-center w-14 h-14 rounded-full mb-6 ${
                  featured
                    ? 'bg-steel-600/30 text-steel-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon size={24} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-slate-50 mb-3">
                {label}
              </h3>
              <p className="font-body text-slate-300 text-base leading-relaxed max-w-[220px]">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
