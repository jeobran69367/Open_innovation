import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl active:scale-95',
  secondary: 'bg-surface text-foreground border-2 border-border hover:border-primary/40 hover:bg-primary/5 active:scale-95',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 active:scale-95',
  danger: 'bg-gradient-to-r from-danger to-danger/80 text-white hover:from-danger/90 hover:to-danger/70 shadow-lg hover:shadow-xl active:scale-95',
}

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-xl border border-transparent px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
