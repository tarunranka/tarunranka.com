import { useEffect, useRef } from 'react'
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

  return (
    <header ref={ref} className="frosted-glass border-border bg-canvas/90 max-md:header-open:shadow-lg sticky top-0 z-10 border-b" role="banner">
      <div className="mx-auto grid max-w-screen-xl items-center gap-x-6 p-4 grid-cols-[auto_1fr_auto] max-md:grid-cols-[auto_auto] max-md:grid-rows-[auto_auto]">
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

        {/* Nav */}
        <nav className="max-md:anim-fade-to-r max-md:header-closed:hidden flex gap-y-2 max-md:my-4 max-md:flex-col max-md:col-span-2 md:justify-center md:gap-8" role="navigation">
          {links.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <a key={href} href={href} className={cn(
                'text-[13px] font-medium tracking-wide transition-colors md:grid md:place-content-center',
                isActive
                  ? 'text-ink relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full max-md:after:hidden'
                  : 'text-ink-dim hover:text-ink',
              )}>
                {label}
              </a>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <label className="md:hidden justify-self-end">
          <input id="header-toggle" type="checkbox" hidden />
          <span className="header-open:hidden text-ink-muted text-sm">Menu</span>
          <span className="header-closed:hidden text-ink-muted text-sm">Close</span>
        </label>
      </div>
    </header>
  )
}
