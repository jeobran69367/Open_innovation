'use client'

import { useEffect } from 'react'
import clsx from 'clsx'

export type ToastVariant = 'primary' | 'success' | 'warning' | 'danger'

const variantStyles: Record<ToastVariant, string> = {
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
}

interface ToastProps {
  open: boolean
  title: string
  description?: string
  variant?: ToastVariant
  onClose: () => void
}

export function Toast({ open, title, description, variant = 'primary', onClose }: ToastProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handle = window.setTimeout(onClose, 5000)
    return () => window.clearTimeout(handle)
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 w-full max-w-sm px-4" role="status" aria-live="polite">
      <div
        className={clsx(
          'pointer-events-auto rounded-3xl border border-border bg-surface p-4 shadow-surface',
          variantStyles[variant]
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-foreground">{title}</p>
            {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Fermer la notification"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
