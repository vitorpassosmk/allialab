interface CardProps {
  className?: string
  children: React.ReactNode
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div
      className={`bg-slate-800 border border-slate-600 rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  )
}
