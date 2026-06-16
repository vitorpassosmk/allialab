import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-all duration-200',
  secondary:
    'border border-steel-400 text-steel-400 hover:bg-steel-400/10 px-6 py-3 rounded-lg transition-all duration-200',
  ghost: 'text-slate-300 hover:text-slate-50 transition-colors duration-200',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center cursor-pointer ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonVariant, ButtonProps }
