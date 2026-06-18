'use client'

import type { ElementType } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Monitor, Zap, Bot, Package, TrendingUp } from 'lucide-react'
import { fadeUp, scaleIn, staggerContainer, viewport } from '@/lib/motion'

const services = [
  {
    Icon: Monitor,
    slug: 'sites-apps',
    title: 'Sites & Apps',
    headline: 'Sua presença, sua autoridade',
    description: 'Sites e aplicações que convertem visitantes em clientes — rápidos, bonitos e otimizados.',
  },
  {
    Icon: Zap,
    slug: 'automacoes',
    title: 'Automações & IA',
    headline: 'Sua equipe livre do trabalho repetitivo',
    description: 'Processos automáticos que rodam enquanto seu time foca no que importa.',
  },
  {
    Icon: Bot,
    slug: 'agentes-ia',
    title: 'Agentes de IA',
    headline: 'Uma equipe que não dorme',
    description: 'Agentes treinados no seu negócio. Resolvem, respondem e executam — 24/7.',
    featured: true,
  },
  {
    Icon: Package,
    slug: 'microsaas',
    title: 'MicroSaaS',
    headline: 'Seu produto digital recorrente',
    description: 'Da ideia ao produto em produção. Receita previsível, escalável.',
  },
  {
    Icon: TrendingUp,
    slug: 'marketing',
    title: 'Marketing Digital',
    headline: 'Crescimento previsível e mensurável',
    description: 'SEO, tráfego pago e conversão. Decisões por dado, não por achismo.',
  },
]

export default function Services({ className }: { className?: string }) {
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
            O QUE CONSTRUÍMOS
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-4"
          >
            Não vendemos horas.{' '}
            <span className="text-steel-400">Construímos alianças.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Cinco frentes de atuação, um único objetivo: crescimento real e mensurável.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map(({ Icon, slug, title, headline, description, featured }) => (
            <ServiceCard
              key={slug}
              Icon={Icon}
              title={title}
              headline={headline}
              description={description}
              featured={featured}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

function ServiceCard({
  Icon,
  title,
  headline,
  description,
  featured,
  reduceMotion,
}: {
  Icon: ElementType
  title: string
  headline: string
  description: string
  featured?: boolean
  reduceMotion: boolean
}) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={reduceMotion ? {} : { scale: 1.02, transition: { duration: 0.2 } }}
      className={`group flex flex-col gap-4 p-8 rounded-xl border transition-colors ${
        featured
          ? 'bg-slate-800 border-steel-500 shadow-[0_0_40px_-12px_rgba(53,112,181,0.4)]'
          : 'bg-slate-800/60 border-slate-600 hover:border-steel-600 hover:bg-slate-800'
      }`}
    >
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-lg ${
          featured
            ? 'bg-steel-600/30 text-steel-400'
            : 'bg-slate-700 text-slate-400 group-hover:text-steel-400 transition-colors'
        }`}
      >
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div>
        <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase mb-1">
          {title}
        </p>
        <h3 className="font-display text-lg font-semibold text-slate-50 mb-2">
          {headline}
        </h3>
        <p className="font-body text-slate-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
