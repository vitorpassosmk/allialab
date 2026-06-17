import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Serviços',
  description:
    'Sites & Apps, Automações, Agentes de IA, MicroSaaS e Marketing Digital. Cinco frentes de atuação, um único objetivo: crescimento real.',
  path: '/servicos',
})

const servicos = [
  {
    slug: 'sites-apps',
    title: 'Sites & Apps',
    headline: 'Sua presença, sua autoridade',
    description:
      'Sites e aplicações que convertem visitantes em clientes — rápidos, bonitos e otimizados para performance e SEO.',
    outcomes: ['Mais tráfego orgânico', 'Taxa de conversão otimizada', 'Presença profissional consolidada'],
  },
  {
    slug: 'automacoes',
    title: 'Automações & IA',
    headline: 'Sua equipe livre do trabalho repetitivo',
    description:
      'Processos automáticos que rodam enquanto seu time foca no que importa. Integrações, fluxos e gatilhos inteligentes.',
    outcomes: ['Menos horas em tarefas manuais', 'Zero erros operacionais', 'Escalabilidade sem contratação'],
  },
  {
    slug: 'agentes-ia',
    title: 'Agentes de IA',
    headline: 'Uma equipe que não dorme',
    description:
      'Agentes treinados no seu negócio. Resolvem, respondem e executam — 24/7, com contexto do seu setor e processos.',
    outcomes: ['Atendimento 24/7 automatizado', 'Qualificação de leads em tempo real', 'Integração com seu CRM'],
  },
  {
    slug: 'microsaas',
    title: 'MicroSaaS',
    headline: 'Seu produto digital recorrente',
    description:
      'Da ideia ao produto em produção. Construímos MVPs enxutos, validamos rápido e escalamos com você.',
    outcomes: ['Receita recorrente previsível', 'MVP em semanas, não meses', 'Stack moderna e escalável'],
  },
  {
    slug: 'marketing',
    title: 'Marketing Digital',
    headline: 'Crescimento previsível e mensurável',
    description:
      'SEO, tráfego pago e conversão. Estratégias baseadas em dados, não em achismo.',
    outcomes: ['Tráfego orgânico crescente', 'ROI mensurável em cada canal', 'Funil de vendas estruturado'],
  },
]

export default function ServicosPage() {
  return (
    <main className="bg-slate-900 min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-6">
            O QUE CONSTRUÍMOS
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-50 mb-6">
            Não vendemos horas.{' '}
            <span className="text-steel-400">Construímos alianças.</span>
          </h1>
          <p className="font-body text-xl text-slate-300 max-w-2xl mx-auto">
            Cinco frentes de atuação, um único objetivo: crescimento real e mensurável para o seu negócio.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {servicos.map(({ slug, title, headline, description, outcomes }) => (
            <div
              key={slug}
              className="p-8 lg:p-10 bg-slate-800 rounded-xl border border-slate-600 hover:border-steel-600 transition-colors group"
            >
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
                <div>
                  <p className="font-mono text-[11px] text-slate-500 tracking-widest uppercase mb-2">
                    {title}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-slate-50 mb-3">
                    {headline}
                  </h2>
                  <p className="font-body text-slate-300 leading-relaxed mb-6">
                    {description}
                  </p>
                  <ul className="space-y-2">
                    {outcomes.map(outcome => (
                      <li key={outcome} className="flex items-center gap-3 font-body text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-steel-400 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/servicos/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-steel-400 text-steel-400 rounded-lg hover:bg-steel-400/10 transition-colors text-sm font-medium font-body"
                  >
                    Saiba mais
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-slate-50 mb-4">
            Qual frente faz sentido para você?
          </h2>
          <p className="font-body text-slate-300 mb-8">
            O diagnóstico gratuito mapeia exatamente onde a aliança gera mais impacto no seu negócio.
          </p>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-lg"
          >
            Fazer diagnóstico gratuito
          </Link>
        </div>
      </section>

    </main>
  )
}
