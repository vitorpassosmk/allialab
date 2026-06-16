interface BadgeProps {
  variant?: 'default' | 'accent'
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-slate-700 text-slate-300',
  accent: 'bg-steel-600/30 text-steel-400',
}

export default function Badge({
  variant = 'default',
  className = '',
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
