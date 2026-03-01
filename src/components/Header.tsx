import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

interface HeaderProps {
  pathname: string
}

export default function Header({ pathname }: HeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // set --header-height
  useEffect(() => {
    function setHeight() {
      if (!ref.current) return
      document.documentElement.style.setProperty('--header-height', `${ref.current.offsetHeight}px`)
    }
    setHeight()
    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header ref={ref} className="frosted-glass border-border bg-canvas/90 sticky top-0 z-40 border-b" role="banner">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a className="group relative shrink-0" href="/">
              <div className="relative h-9 w-9">
                <div className="absolute inset-0 hex-clip bg-accent" />
                <div className="absolute inset-[2px] hex-clip overflow-hidden">
                  <img src="/tarun-avatar.jpg" alt="Tarun Ranka" className="h-full w-full object-cover object-center" />
                </div>
              </div>
            </a>
            <a className="flex items-center gap-1.5" href="/">
              <span className="text-[15px] font-bold text-ink tracking-wide">Tarun</span>
              <span className="text-[15px] font-normal text-ink-dim tracking-wide">Ranka</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation">
            {links.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <a key={href} href={href} className={cn(
                  'text-[13px] font-medium tracking-wide transition-colors relative',
                  isActive
                    ? 'text-ink after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full'
                    : 'text-ink-dim hover:text-ink',
                )}>
                  {label}
                </a>
              )
            })}
          </nav>

          {/* Hamburger Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-canvas-light transition-colors z-50"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={cn(
                'block h-[2px] w-full bg-ink rounded-full transition-all duration-300 origin-center',
                open && 'translate-y-[7px] rotate-45'
              )} />
              <span className={cn(
                'block h-[2px] w-full bg-ink rounded-full transition-all duration-300',
                open ? 'opacity-0 scale-x-0' : 'opacity-100'
              )} />
              <span className={cn(
                'block h-[2px] w-full bg-ink rounded-full transition-all duration-300 origin-center',
                open && '-translate-y-[7px] -rotate-45'
              )} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-30 transition-all duration-500',
          open ? 'visible' : 'invisible pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-canvas/95 backdrop-blur-xl transition-opacity duration-500',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
        />

        {/* Menu Content */}
        <div className={cn(
          'relative h-full flex flex-col justify-center px-8 transition-all duration-500',
          open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          <nav className="flex flex-col gap-2" role="navigation">
            {links.map(({ href, label }, i) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'group flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300',
                    'hover:bg-canvas-light/60',
                    isActive && 'bg-canvas-light/40'
                  )}
                  style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
                >
                  <span className={cn(
                    'text-xs font-mono tabular-nums w-6',
                    isActive ? 'text-accent' : 'text-ink-dim'
                  )}>
                    0{i + 1}
                  </span>
                  <span className={cn(
                    'text-2xl font-bold tracking-tight transition-colors',
                    isActive ? 'text-accent' : 'text-ink group-hover:text-ink'
                  )}>
                    {label}
                  </span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className={cn(
            'mt-12 px-4 pt-6 border-t border-border/50 transition-all duration-500',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )} style={{ transitionDelay: open ? '350ms' : '0ms' }}>
            <div className="flex gap-5">
              <a href="https://github.com/tarunranka" target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-accent transition-colors" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              </a>
              <a href="https://linkedin.com/in/tarunranka" target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:tarunranka.m@gmail.com" className="text-ink-dim hover:text-accent transition-colors" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-8.628 5.313a3 3 0 01-3.144 0L2.25 6.75"/></svg>
              </a>
            </div>
            <p className="text-ink-dim text-xs mt-4">tarunranka.m@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
