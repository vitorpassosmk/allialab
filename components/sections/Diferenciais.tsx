'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Users, Handshake, Cpu, BarChart2 } from 'lucide-react'
import { fadeUp, scaleIn, staggerContainer, viewport } from '@/lib/motion'

const diferenciais = [
  {
    Icon: Users,
    title: 'Boutique de alto valor',
    description: 'Time enxuto, atenção total. Você não é mais um número em nossa carteira.',
  },
  {
    Icon: Handshake,
    title: 'Parceria real',
    description: 'Crescemos junto com seu negócio. Somos aliados, não fornecedores de tarefa.',
  },
  {
    Icon: Cpu,
    title: 'Stack moderna de verdade',
    description: 'Next.js, IA nativa, automação real. Entregamos o que o mercado vai exigir amanhã.',
  },
  {
    Icon: BarChart2,
    title: 'Foco em resultado mensurável',
    description: 'Cada projeto tem métrica de sucesso. Se não der pra medir, não entregamos.',
  },
]

export default function Diferenciais({ className }: { className?: string }) {
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
            POR QUE ALIIA
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-slate-50"
          >
            Por que{' '}
            <span className="text-steel-400">ALLiA</span>
          </motion.h2>
        </motion.div>

        {/* 2×2 grid */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-4"
        >
          {diferenciais.map(({ Icon, title, description }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              className="flex gap-6 p-8 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-steel-600 transition-colors group"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-steel-600/20 text-steel-400 group-hover:bg-steel-600/30 transition-colors">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-50 mb-2">
                  {title}
                </h3>
                <p className="font-body text-slate-300 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
