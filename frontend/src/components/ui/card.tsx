import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-border bg-surface p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
