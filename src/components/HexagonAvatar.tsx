import { cn } from '@/lib/utils'

interface HexagonAvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeConfig = {
  sm: { size: 36, padding: 2 },
  md: { size: 80, padding: 3 },
  lg: { size: 100, padding: 4 },
}

export default function HexagonAvatar({ src, alt, size = 'md', className }: HexagonAvatarProps) {
  const config = sizeConfig[size]
  const containerSize = config.size + config.padding * 2

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-accent/30',
        className
      )}
      style={{ width: `${containerSize}px`, height: `${containerSize}px` }}
    >
      <div className="absolute inset-0 bg-accent/10" style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }} />
      <div className="absolute inset-1 border-2 border-accent" style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }} />
      <div className="relative overflow-hidden" style={{ width: `${config.size}px`, height: `${config.size}px`, clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
      </div>
    </div>
  )
}
