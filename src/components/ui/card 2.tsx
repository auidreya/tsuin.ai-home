import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('border border-[#797ea6]/30 bg-[#1a1b26]', className)}
      {...props}
    />
  )
}

export { Card }
