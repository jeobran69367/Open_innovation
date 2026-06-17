import Link from 'next/link'
import clsx from 'clsx'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={clsx('flex items-center gap-2 text-sm text-muted', className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-muted">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded px-1"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
