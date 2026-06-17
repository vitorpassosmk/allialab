import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { spaceGrotesk, inter, geistMono } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ALLiA LAB',
  url: 'https://allialab.com.br',
  logo: 'https://allialab.com.br/allia-logo-vertical.svg',
  description:
    'Boutique de tecnologia aliada. Construímos a aliança entre humanidade e IA — onde tecnologia amplifica pessoas.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São José dos Campos',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  sameAs: [],
}

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
      <body className="min-h-full flex flex-col bg-slate-900 text-slate-50">
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
