'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  shake?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, shake, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full border bg-transparent px-4 py-3 font-mono text-sm tracking-wider text-ink-primary placeholder:text-ink-muted transition-all duration-200',
          'border-ink-faint focus:border-teal focus:outline-none focus:shadow-teal',
          error && 'border-red-500 focus:border-red-400 focus:shadow-none',
          shake && 'animate-shake',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
