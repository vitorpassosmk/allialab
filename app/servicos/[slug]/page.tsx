import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const slugMeta: Record<string, { title: string; description: string }> = {
  'sites-apps': {
    title: 'Sites & Apps — Presença Digital de Alto Impacto',
    description: 'Sites e aplicações que convertem visitantes em clientes.',
  },
  'automacoes': {
    title: 'Automações & IA — Liberte Seu Time',
    description: 'Processos automáticos que rodam enquanto seu time foca no que importa.',
  },
  'agentes-ia': {
    title: 'Agentes de IA — Sua Equipe que Não Dorme',
    description: 'Agentes treinados no seu negócio. Resolvem e executam 24/7.',
  },
  'microsaas': {
    title: 'MicroSaaS — Seu Produto Digital Recorrente',
    description: 'Da ideia ao produto em produção. Receita previsível e escalável.',
  },
  'marketing': {
    title: 'Marketing Digital — Crescimento Previsível',
    description: 'SEO, tráfego pago e conversão baseados em dados.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = slugMeta[slug]
  if (!meta) return { title: 'Serviço | ALLiA LAB' }
  return {
    title: meta.title,
    description: meta.description,
  }
}

export async function generateStaticParams() {
  return Object.keys(slugMeta).map(slug => ({ slug }))
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = slugMeta[slug]

  return (
    <main className="bg-slate-900 min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/servicos"
          className="inline-flex items-center gap-2 font-body text-sm text-slate-400 hover:text-steel-400 transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Voltar para serviços
        </Link>

        <p className="font-mono text-xs text-steel-400 tracking-[0.2em] uppercase mb-4">
          EM BREVE
        </p>
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-6">
          {meta?.title ?? 'Serviço'}
        </h1>
        <p className="font-body text-lg text-slate-300 mb-12">
          {meta?.description ?? 'Página em construção.'}
        </p>
        <p className="font-body text-slate-400">
          Estamos preparando uma página completa com casos, detalhes e processo para esta frente. Enquanto isso, fale conosco para saber mais.
        </p>

        <div className="mt-12">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center px-8 py-4 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
          >
            Quero saber mais — diagnóstico gratuito
          </Link>
        </div>
      </div>
    </main>
  )
}
