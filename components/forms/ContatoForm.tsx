'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  mensagem: z.string().min(10, 'Mensagem muito curta (mín. 10 caracteres)'),
})

type FormData = z.infer<typeof schema>

export default function ContatoForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-green-success/20 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3DD68C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="font-display text-xl font-bold text-slate-50 mb-2">Mensagem enviada!</h3>
        <p className="font-body text-slate-300 text-sm">Entrarei em contato em breve.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-sm font-medium text-slate-300">Nome</label>
        <input
          {...register('nome')}
          placeholder="Seu nome"
          className={inputClass(!!errors.nome)}
        />
        {errors.nome && <p className="font-body text-xs text-amber-400">{errors.nome.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-sm font-medium text-slate-300">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="seu@email.com"
          className={inputClass(!!errors.email)}
        />
        {errors.email && <p className="font-body text-xs text-amber-400">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-body text-sm font-medium text-slate-300">Mensagem</label>
        <textarea
          {...register('mensagem')}
          rows={4}
          placeholder="Como posso ajudar?"
          className={inputClass(!!errors.mensagem)}
        />
        {errors.mensagem && <p className="font-body text-xs text-amber-400">{errors.mensagem.message}</p>}
      </div>

      {status === 'error' && (
        <p className="font-body text-sm text-amber-400">Erro ao enviar. Tente pelo WhatsApp.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  )
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 bg-slate-700 border rounded-lg font-body text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-steel-500 transition-colors ${
    hasError ? 'border-amber-400/60' : 'border-slate-600 focus:border-steel-500'
  }`
}
