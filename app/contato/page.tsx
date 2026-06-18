import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import ContatoForm from '@/components/forms/ContatoForm'

export const metadata: Metadata = buildMetadata({
  title: 'Contato',
  description:
    'Entre em contato com a ALLiA LAB. Fale pelo WhatsApp ou envie uma mensagem — resposta em até 24h.',
  path: '/contato',
})

const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP ?? 'https://wa.me/5511915300958'

export default function ContatoPage() {
  return (
    <main className="bg-slate-900 min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-steel-400 uppercase mb-6">
            FALE CONOSCO
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-50 mb-4">
            Vamos conversar
          </h1>
          <p className="font-body text-lg text-slate-300">
            Prefere rapidez? WhatsApp. Prefere detalhar? Use o formulário — respondemos em até 24h.
          </p>
        </div>
      </section>

      {/* Content grid */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12">

          {/* Left: contact options */}
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-600">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-success/20 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3DD68C" className="w-5 h-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.846L.057 23.428a.5.5 0 0 0 .613.613l5.58-1.474A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.695-.504-5.236-1.383l-.376-.217-3.892 1.027 1.027-3.892-.217-.376A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-50">WhatsApp</h3>
                  <p className="font-body text-xs text-slate-400">Resposta mais rápida</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-green-success/10 border border-green-success/30 text-green-success rounded-lg hover:bg-green-success/20 transition-colors font-body font-medium text-sm"
              >
                Abrir WhatsApp
              </a>
            </div>

            {/* Email info */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-600">
              <h3 className="font-display text-base font-semibold text-slate-50 mb-2">Email</h3>
              <p className="font-body text-sm text-slate-400 mb-1">Respondemos em até 24h úteis.</p>
              <a
                href="mailto:contact@allialab.com"
                className="font-body text-sm text-steel-400 hover:text-steel-300 transition-colors"
              >
                contact@allialab.com
              </a>
            </div>

            {/* Location */}
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-600">
              <h3 className="font-display text-base font-semibold text-slate-50 mb-2">Localização</h3>
              <p className="font-body text-sm text-slate-400">
                São José dos Campos, SP — Brasil
              </p>
              <p className="font-body text-sm text-slate-500 mt-1">
                Atendemos todo o Brasil remotamente.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-slate-800 rounded-xl border border-slate-600 p-8">
            <h2 className="font-display text-xl font-bold text-slate-50 mb-6">
              Envie uma mensagem
            </h2>
            <ContatoForm />
          </div>

        </div>
      </section>

    </main>
  )
}
