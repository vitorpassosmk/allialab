import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import DiagnosticoForm from '@/components/forms/DiagnosticoForm'

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Diagnóstico Digital 360° Gratuito',
    description:
      '10 perguntas. 24h de análise. Um plano de aliança personalizado para o seu negócio — sem compromisso, com muito valor.',
    path: '/diagnostico',
  }),
  other: {
    'schema:type': 'FAQPage',
  },
}

export default function DiagnosticoPage() {
  return (
    <main className="bg-slate-900 min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-6">
            PRIMEIRO PASSO GRATUITO
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            Diagnóstico Digital 360° —{' '}
            <span className="text-steel-400">Gratuito</span>
          </h1>
          <p className="font-body text-lg text-slate-300 max-w-xl mx-auto">
            10 perguntas. 24h de análise. Um plano de aliança personalizado para o seu negócio.
          </p>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-8 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4 p-6 bg-slate-800 rounded-xl border border-slate-600">
            {[
              { value: '100%', label: 'Gratuito' },
              { value: '24h', label: 'Resposta' },
              { value: '0', label: 'Compromisso' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl font-bold text-steel-400">{value}</div>
                <div className="font-mono text-[11px] text-slate-400 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <DiagnosticoForm />
        </div>
      </section>

    </main>
  )
}
