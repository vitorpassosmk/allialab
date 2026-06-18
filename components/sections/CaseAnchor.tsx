'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Truck } from 'lucide-react'
import { fadeUp, slideInLeft, slideInRight, staggerContainer, viewport } from '@/lib/motion'

// TODO: replace placeholder values with real Madiã Transportes data before publishing
const metrics = [
  { label: 'Resultado 1', value: '[PLACEHOLDER]', unit: '' },
  { label: 'Resultado 2', value: '[PLACEHOLDER]', unit: '' },
  { label: 'Resultado 3', value: '[PLACEHOLDER]', unit: '' },
]

export default function CaseAnchor({ className }: { className?: string }) {
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
            CASE ÂNCORA
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl lg:text-5xl font-bold text-slate-50"
          >
            Resultado não se promete.{' '}
            <span className="text-steel-400">Se mostra.</span>
          </motion.h2>
        </motion.div>

        {/* Case card */}
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 items-center">

          {/* Left: client info */}
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={viewport}
            variants={slideInLeft}
            className="bg-slate-800 rounded-2xl border border-slate-600 p-8 lg:p-12"
          >
            {/* Client logo placeholder */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#E33900]/10 border border-[#E33900]/20">
                <Truck size={24} strokeWidth={1.5} className="text-[#E33900]" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-50">
                  Madiã Transportes
                </h3>
                <p className="font-mono text-xs text-slate-400 tracking-wide uppercase">
                  Transporte Rodoviário · SJC/SP
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {metrics.map(({ label, value, unit }) => (
                <div key={label} className="text-center p-4 bg-slate-900/60 rounded-xl border border-slate-700">
                  <div className="font-display text-2xl font-bold text-steel-400 mb-1">
                    {value}
                    {unit && <span className="text-base font-medium text-slate-400 ml-1">{unit}</span>}
                  </div>
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Site institucional', 'Next.js', 'Motion design', 'SEO'].map(tag => (
                <span key={tag} className="font-mono text-[11px] text-slate-400 bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600">
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/cases/madia-transportes"
              className="inline-flex items-center gap-2 font-body font-medium text-steel-400 hover:text-steel-300 transition-colors group"
            >
              Ver case completo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: quote / context */}
          <motion.div
            initial={initial}
            whileInView="visible"
            viewport={viewport}
            variants={slideInRight}
            className="flex flex-col gap-6"
          >
            <blockquote className="relative">
              <div className="absolute -top-4 -left-2 font-display text-6xl text-steel-600/40 leading-none select-none">
                &ldquo;
              </div>
              <p className="font-body text-xl text-slate-300 leading-relaxed pl-6 italic">
                [Depoimento do cliente a ser preenchido com a história real da parceria e os resultados obtidos.]
              </p>
            </blockquote>

            <div className="flex flex-col gap-3 pl-6">
              <p className="font-display text-base font-semibold text-slate-50">
                [Nome do responsável]
              </p>
              <p className="font-mono text-xs text-slate-400 uppercase tracking-wide">
                [Cargo] · Madiã Transportes
              </p>
            </div>

            <div className="pl-6 pt-4 border-t border-slate-700">
              <p className="font-body text-sm text-slate-400">
                Setor com alta concorrência local. A ALLiA entregou presença digital diferenciada e resultados mensuráveis em tráfego, leads e conversão.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
