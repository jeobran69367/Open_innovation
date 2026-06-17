import clsx from 'clsx'

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

const badgeStyles: Record<BadgeVariant, string> = {
  primary: 'bg-gradient-to-r from-primary/15 to-primary/5 text-primary border border-primary/20',
  secondary: 'bg-slate-100/50 text-foreground border border-border',
  success: 'bg-gradient-to-r from-success/15 to-success/5 text-success border border-success/20',
  warning: 'bg-gradient-to-r from-warning/15 to-warning/5 text-warning border border-warning/20',
  danger: 'bg-gradient-to-r from-danger/15 to-danger/5 text-danger border border-danger/20',
}

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'secondary', className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-all duration-200',
        badgeStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
