interface BadgeProps {
  className?: string
  children?: React.ReactNode
}

export function Badge({ className = '', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium font-mono text-steel-400 border border-steel-400/30 rounded-full px-3 py-1 ${className}`}
    >
      {children}
    </span>
  )
}
