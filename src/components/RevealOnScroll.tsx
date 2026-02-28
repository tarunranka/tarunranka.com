import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function RevealOnScroll({ children, className, delay = 0, direction = 'up' }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('opacity-100')
            ;(entry.target as HTMLElement).style.transform = 'translate(0, 0)'
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [delay])

  const transform = direction === 'left' ? 'translateX(-32px)' : direction === 'right' ? 'translateX(32px)' : 'translateY(32px)'

  return (
    <div ref={ref} className={cn('opacity-0 transition-all duration-700 ease-out', className)} style={{ transform }}>
      {children}
    </div>
  )
}
