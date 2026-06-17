'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, scaleIn, staggerContainer, viewport } from '@/lib/motion'
import Button from '@/components/ui/Button'

export default function CTAFinal({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()
  const initial = reduceMotion ? 'visible' : 'hidden'

  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP ?? '#'

  return (
    <section className={`py-24 bg-slate-900 ${className ?? ''}`}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={initial}
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer}
          className="relative text-center bg-slate-800 rounded-2xl border border-steel-600/40 px-8 py-16 lg:px-16 overflow-hidden"
        >
          {/* Subtle top glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(53,112,181,0.12) 0%, transparent 70%)',
            }}
          />

          <motion.p
            variants={fadeUp}
            className="relative font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-6"
          >
            PRÓXIMO PASSO
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="relative font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-6"
          >
            Vamos construir essa aliança?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="relative font-body text-lg text-slate-300 mb-10 max-w-xl mx-auto"
          >
            O primeiro passo é gratuito. Diagnóstico digital completo — sem compromisso, com muito valor.
          </motion.p>

          <motion.div
            variants={scaleIn}
            className="relative flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/diagnostico" variant="primary" size="lg">
              Diagnóstico gratuito
            </Button>

            {/* WhatsApp — external link, opens new tab */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg rounded-lg border border-steel-400 text-steel-400 hover:bg-steel-400/10 active:bg-steel-400/20 transition-colors"
            >
              {/* Inline WhatsApp SVG — not available in lucide-react */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.846L.057 23.428a.5.5 0 0 0 .613.613l5.58-1.474A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.695-.504-5.236-1.383l-.376-.217-3.892 1.027 1.027-3.892-.217-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Falar no WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
