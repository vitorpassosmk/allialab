import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  mensagem: z.string().min(10),
})

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const { error } = await resend.emails.send({
      from: 'ALLiA LAB <noreply@allialab.com.br>',
      to: ['vitorpassosmkt@gmail.com'],
      replyTo: data.email,
      subject: `[Contato] ${data.nome}`,
      html: `
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${data.mensagem.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) return Response.json({ error: 'Falha ao enviar' }, { status: 500 })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Dados inválidos' }, { status: 400 })
  }
}
