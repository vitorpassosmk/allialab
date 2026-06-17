import type { Metadata } from 'next'

const baseUrl = 'https://allialab.com.br'

export function buildMetadata({
  title,
  description,
  path = '/',
}: {
  title: string
  description: string
  path?: string
}): Metadata {
  const url = `${baseUrl}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'pt_BR',
      siteName: 'ALLiA LAB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
