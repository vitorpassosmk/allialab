import type { MetadataRoute } from 'next'

const baseUrl = 'https://allialab.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/sobre`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/servicos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/diagnostico`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/contato`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const servicoSlugs = ['sites-apps', 'automacoes', 'agentes-ia', 'microsaas', 'marketing']
  const servicoRoutes: MetadataRoute.Sitemap = servicoSlugs.map(slug => ({
    url: `${baseUrl}/servicos/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...servicoRoutes]
}
