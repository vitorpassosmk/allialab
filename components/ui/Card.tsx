interface CardProps {
  className?: string
  children?: React.ReactNode
  glow?: boolean
}

export function Card({ className = '', children, glow = false }: CardProps) {
  return (
    <div
      className={`
        bg-slate-800 border border-slate-600 rounded-xl p-6
        hover:border-steel-400/50 hover:bg-slate-700
        transition-all duration-300
        ${glow ? 'hover:shadow-[0_0_24px_rgba(77,143,214,0.15)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
