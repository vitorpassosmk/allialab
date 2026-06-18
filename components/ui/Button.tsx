import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-amber-400 text-slate-900 font-semibold hover:bg-amber-500 active:bg-amber-600',
  secondary:
    'border border-steel-400 text-steel-400 hover:bg-steel-400/10 active:bg-steel-400/20',
  ghost: 'text-slate-300 hover:text-slate-50',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-lg transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
