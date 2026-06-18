'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  empresa: z.string().min(2, 'Nome da empresa obrigatório'),
  setor: z.string().min(2, 'Setor obrigatório'),
  faturamento: z.string().min(1, 'Selecione uma faixa'),
  gargalo: z.string().min(10, 'Descreva o principal gargalo (mín. 10 caracteres)'),
  maturidade: z.string().min(1, 'Selecione um nível'),
  objetivos: z.string().min(10, 'Descreva seus objetivos (mín. 10 caracteres)'),
  prazo: z.string().min(1, 'Selecione um prazo'),
  orcamento: z.string().min(1, 'Selecione uma faixa'),
  contato: z.string().min(5, 'Informe email ou WhatsApp'),
})

type FormData = z.infer<typeof schema>

const faturamentoOptions = [
  'Até R$ 20k/mês',
  'R$ 20k – R$ 100k/mês',
  'R$ 100k – R$ 500k/mês',
  'Acima de R$ 500k/mês',
]
const maturidadeOptions = [
  'Zero digital — começando do zero',
  'Básico — site e redes sociais',
  'Intermediário — e-commerce ou sistema próprio',
  'Avançado — ferramentas integradas e processos digitais',
]
const prazoOptions = ['Urgente (até 30 dias)', '1–3 meses', '3–6 meses', 'Sem pressa — queremos fazer certo']
const orcamentoOptions = ['Até R$ 3k', 'R$ 3k – R$ 10k', 'R$ 10k – R$ 30k', 'Acima de R$ 30k']

export default function DiagnosticoForm() {
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
      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Falha no envio')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-success/20 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3DD68C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-50 mb-3">Diagnóstico enviado!</h2>
        <p className="font-body text-slate-300">
          Recebi suas respostas e entrarei em contato em até 24h com o plano de aliança personalizado.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Row 1: nome + empresa */}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Seu nome" error={errors.nome?.message}>
          <input
            {...register('nome')}
            placeholder="João Silva"
            className={inputClass(!!errors.nome)}
          />
        </Field>
        <Field label="Empresa" error={errors.empresa?.message}>
          <input
            {...register('empresa')}
            placeholder="Nome da empresa"
            className={inputClass(!!errors.empresa)}
          />
        </Field>
      </div>

      {/* Row 2: setor + faturamento */}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Setor" error={errors.setor?.message}>
          <input
            {...register('setor')}
            placeholder="Ex: Transportes, Saúde, Varejo..."
            className={inputClass(!!errors.setor)}
          />
        </Field>
        <Field label="Faturamento mensal" error={errors.faturamento?.message}>
          <select {...register('faturamento')} className={inputClass(!!errors.faturamento)}>
            <option value="">Selecione...</option>
            {faturamentoOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      {/* Gargalo */}
      <Field label="Qual é o seu principal gargalo hoje?" error={errors.gargalo?.message}>
        <textarea
          {...register('gargalo')}
          rows={3}
          placeholder="Ex: Perco muito tempo com tarefas manuais, não consigo escalar o atendimento..."
          className={inputClass(!!errors.gargalo)}
        />
      </Field>

      {/* Maturidade */}
      <Field label="Maturidade digital atual" error={errors.maturidade?.message}>
        <select {...register('maturidade')} className={inputClass(!!errors.maturidade)}>
          <option value="">Selecione...</option>
          {maturidadeOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </Field>

      {/* Objetivos */}
      <Field label="Quais são seus objetivos para os próximos 6 meses?" error={errors.objetivos?.message}>
        <textarea
          {...register('objetivos')}
          rows={3}
          placeholder="Ex: Quero dobrar meu faturamento, reduzir custo operacional, lançar um produto digital..."
          className={inputClass(!!errors.objetivos)}
        />
      </Field>

      {/* Row 3: prazo + orçamento */}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Prazo para início" error={errors.prazo?.message}>
          <select {...register('prazo')} className={inputClass(!!errors.prazo)}>
            <option value="">Selecione...</option>
            {prazoOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Orçamento disponível" error={errors.orcamento?.message}>
          <select {...register('orcamento')} className={inputClass(!!errors.orcamento)}>
            <option value="">Selecione...</option>
            {orcamentoOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      {/* Contato */}
      <Field label="Seu melhor contato (email ou WhatsApp)" error={errors.contato?.message}>
        <input
          {...register('contato')}
          placeholder="email@empresa.com ou (11) 99999-9999"
          className={inputClass(!!errors.contato)}
        />
      </Field>

      {status === 'error' && (
        <p className="font-body text-sm text-amber-400">
          Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-500 active:bg-amber-600 transition-colors text-lg disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Quero meu diagnóstico'}
      </button>

      <p className="font-body text-xs text-slate-500 text-center">
        Suas informações são confidenciais e nunca serão compartilhadas.
      </p>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-sm font-medium text-slate-300">{label}</label>
      {children}
      {error && <p className="font-body text-xs text-amber-400">{error}</p>}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 bg-slate-700 border rounded-lg font-body text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-steel-500 transition-colors ${
    hasError ? 'border-amber-400/60' : 'border-slate-600 focus:border-steel-500'
  }`
}
