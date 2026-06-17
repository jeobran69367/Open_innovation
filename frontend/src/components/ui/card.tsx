import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <section
      className={clsx(
        'rounded-3xl border border-border bg-surface p-6 shadow-surface transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
