import clsx from 'clsx'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string
  label: string
  description?: string
  error?: string
}

export function Input({
  id,
  label,
  description,
  error,
  className,
  ...props
}: InputProps) {
  const describedBy = error ? `${id}-error` : description ? `${id}-help` : undefined

  return (
    <div className={clsx('space-y-2', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
        {...props}
      />
      {description ? (
        <p id={`${id}-help`} className="text-sm text-muted">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
