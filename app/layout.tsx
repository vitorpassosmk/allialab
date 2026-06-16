import type { Metadata } from 'next'
import './globals.css'
import { spaceGrotesk, inter, geistMono } from '@/lib/fonts'

export const metadata: Metadata = {
  title: {
    default: 'ALLiA LAB — Inteligência Aliada. Impacto Real.',
    template: '%s | ALLiA LAB',
  },
  description:
    'Aliamos IA e estratégia humana para gerar crescimento real para PMEs. Sites, automações, agentes e MicroSaaS. São José dos Campos e todo o Brasil.',
  metadataBase: new URL('https://allialab.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'ALLiA LAB',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-50">{children}</body>
    </html>
  )
}
