import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2),
  empresa: z.string().min(2),
  setor: z.string().min(2),
  faturamento: z.string().min(1),
  gargalo: z.string().min(10),
  maturidade: z.string().min(1),
  objetivos: z.string().min(10),
  prazo: z.string().min(1),
  orcamento: z.string().min(1),
  contato: z.string().min(5),
})

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const html = `
      <h2>Novo Diagnóstico Digital — ALLiA LAB</h2>
      <table cellpadding="8" style="border-collapse:collapse;width:100%;font-family:sans-serif;">
        <tr><td><strong>Nome</strong></td><td>${data.nome}</td></tr>
        <tr><td><strong>Empresa</strong></td><td>${data.empresa}</td></tr>
        <tr><td><strong>Setor</strong></td><td>${data.setor}</td></tr>
        <tr><td><strong>Faturamento</strong></td><td>${data.faturamento}</td></tr>
        <tr><td><strong>Gargalo principal</strong></td><td>${data.gargalo}</td></tr>
        <tr><td><strong>Maturidade digital</strong></td><td>${data.maturidade}</td></tr>
        <tr><td><strong>Objetivos</strong></td><td>${data.objetivos}</td></tr>
        <tr><td><strong>Prazo</strong></td><td>${data.prazo}</td></tr>
        <tr><td><strong>Orçamento</strong></td><td>${data.orcamento}</td></tr>
        <tr><td><strong>Contato</strong></td><td>${data.contato}</td></tr>
      </table>
    `

    const { error } = await resend.emails.send({
      from: 'ALLiA LAB <noreply@allialab.com.br>',
      to: ['vitorpassosmkt@gmail.com'],
      subject: `[Diagnóstico] ${data.nome} — ${data.empresa}`,
      html,
    })

    if (error) return Response.json({ error: 'Falha ao enviar email' }, { status: 500 })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Dados inválidos' }, { status: 400 })
  }
}
