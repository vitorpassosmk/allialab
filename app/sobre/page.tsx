import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Sobre a ALLiA LAB',
  description:
    'Boutique de tecnologia aliada. Construímos a ponte entre humanidade e IA — onde tecnologia amplifica pessoas.',
  path: '/sobre',
})

const valores = [
  {
    title: 'Aliança antes de tudo',
    description: 'Tecnologia existe para servir às pessoas. Sempre.',
  },
  {
    title: 'Resultado é o produto',
    description: 'Transformação mensurável, não entregáveis bonitos.',
  },
  {
    title: 'Clareza sobre complexidade',
    description: 'Traduzimos o técnico em estratégico para quem decide.',
  },
  {
    title: 'Excelência no detalhe',
    description: 'Cada pixel, cada linha de código prova competência.',
  },
  {
    title: 'Parceria de longo prazo',
    description: 'Somos aliados, não fornecedores de tarefa.',
  },
  {
    title: 'Honestidade radical',
    description: 'Verdade sobre prazos, limites e o que realmente funciona.',
  },
]

export default function SobrePage() {
  return (
    <main className="bg-slate-900 min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-6">
            NOSSA HISTÓRIA
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-50 mb-8 leading-tight">
            Tecnologia tem que ter alma.{' '}
            <span className="text-steel-400">A gente coloca.</span>
          </h1>
          <p className="font-body text-xl text-slate-300 leading-relaxed max-w-2xl">
            A ALLiA LAB nasceu da convicção de que IA e automação são mais poderosas quando amplificam pessoas — nunca quando as substituem.
          </p>
        </div>
      </section>

      {/* Propósito */}
      <section className="py-16 px-6 bg-slate-800">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-4">
              PROPÓSITO
            </p>
            <h2 className="font-display text-2xl font-bold text-slate-50">
              Por que existimos
            </h2>
          </div>
          <div className="space-y-4">
            <p className="font-body text-lg text-slate-300 leading-relaxed">
              Construir a aliança entre humanidade e IA — onde tecnologia amplifica pessoas.
            </p>
            <p className="font-body text-base text-slate-400 leading-relaxed">
              Vemos um mercado cheio de promessas tecnológicas sem raiz estratégica. Agências genéricas entregam sites bonitos que não convertem. Ferramentas de IA são adotadas sem contexto. Automações são construídas sem pensar no time que vai operar.
            </p>
            <p className="font-body text-base text-slate-400 leading-relaxed">
              A ALLiA existe para mudar isso: parceria estratégica, execução de alto nível, resultado mensurável.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-4">
              O QUE NOS GUIA
            </p>
            <h2 className="font-display text-4xl font-bold text-slate-50">
              Princípios que não negociamos
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {valores.map(({ title, description }, i) => (
              <div
                key={title}
                className="p-8 bg-slate-800 rounded-xl border border-slate-600 hover:border-steel-600 transition-colors"
              >
                <span className="font-mono text-xs text-slate-500 tracking-widest uppercase block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-50 mb-2">
                  {title}
                </h3>
                <p className="font-body text-sm text-slate-300 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-slate-50 mb-4">
            Quer fazer parte dessa aliança?
          </h2>
          <p className="font-body text-slate-300 mb-8">
            O diagnóstico é gratuito. O impacto é real.
          </p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-lg"
          >
            Quero o diagnóstico gratuito
          </Link>
        </div>
      </section>

    </main>
  )
}
