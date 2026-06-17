import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50',
  secondary: 'bg-surface text-foreground border border-border hover:bg-slate-100 focus-visible:ring-primary/50',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary/50',
  danger: 'bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger/50',
}

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
