'use client'

interface LogoProps {
  variant?: 'full' | 'icon' | 'minimal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: { full: 'h-8', icon: 'w-8 h-8' },
  md: { full: 'h-10', icon: 'w-10 h-10' },
  lg: { full: 'h-12', icon: 'w-12 h-12' },
  xl: { full: 'h-16', icon: 'w-16 h-16' },
}

export default function Logo({ variant = 'full', size = 'md', className = '' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <div className={`${sizes[size].icon} ${className}`}>
        {/* Logo Icon - L elegante con corona */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Fondo circular con gradiente */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Círculo exterior */}
          <circle cx="50" cy="50" r="48" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />

          {/* L estilizada */}
          <path
            d="M30 25 L30 70 L70 70"
            stroke="url(#logoGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Elemento decorativo - pequeña corona/diamante */}
          <path
            d="M55 30 L60 20 L65 30 L60 25 Z"
            fill="url(#goldAccent)"
          />
          <circle cx="60" cy="18" r="3" fill="url(#goldAccent)" />
        </svg>
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={`${sizes[size].full} ${className}`}>
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          {/* Texto Lorenza */}
          <text
            x="10"
            y="42"
            fontFamily="Playfair Display, serif"
            fontSize="36"
            fontWeight="700"
            fill="url(#textGradient)"
          >
            Lorenza
          </text>
        </svg>
      </div>
    )
  }

  // Variant: full (default)
  return (
    <div className={`${sizes[size].full} ${className}`}>
      <svg viewBox="0 0 280 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <defs>
          <linearGradient id="fullLogoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="fullGoldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Icono L con marco */}
        <g transform="translate(5, 5)">
          {/* Marco hexagonal */}
          <path
            d="M30 0 L55 10 L55 50 L30 60 L5 50 L5 10 Z"
            stroke="url(#fullLogoGradient)"
            strokeWidth="2"
            fill="none"
          />

          {/* L interior */}
          <path
            d="M18 15 L18 45 L42 45"
            stroke="url(#fullLogoGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Diamante decorativo */}
          <path
            d="M38 18 L42 12 L46 18 L42 15 Z"
            fill="url(#fullGoldAccent)"
          />
        </g>

        {/* Texto LORENZA */}
        <text
          x="75"
          y="47"
          fontFamily="Playfair Display, serif"
          fontSize="38"
          fontWeight="700"
          fill="url(#fullLogoGradient)"
          letterSpacing="2"
        >
          LORENZA
        </text>

        {/* Línea decorativa debajo */}
        <line x1="75" y1="55" x2="200" y2="55" stroke="url(#fullGoldAccent)" strokeWidth="1.5" />

        {/* Texto pequeño PY */}
        <text
          x="205"
          y="55"
          fontFamily="DM Sans, sans-serif"
          fontSize="14"
          fontWeight="500"
          fill="#fbbf24"
          letterSpacing="1"
        >
          PY
        </text>
      </svg>
    </div>
  )
}

// Logo alternativo más elegante con monograma
export function LogoMonogram({ size = 'md', className = '' }: Omit<LogoProps, 'variant'>) {
  return (
    <div className={`${sizes[size].icon} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="monoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Marco elegante */}
        <rect x="5" y="5" width="90" height="90" rx="10" stroke="url(#monoGradient)" strokeWidth="3" fill="none" />

        {/* Esquinas decorativas */}
        <path d="M5 20 L5 5 L20 5" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M80 5 L95 5 L95 20" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M95 80 L95 95 L80 95" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M20 95 L5 95 L5 80" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* L grande y elegante */}
        <path
          d="M28 22 L28 72 L72 72"
          stroke="url(#monoGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* G superpuesta (iniciales LG) */}
        <path
          d="M72 35 C72 25 62 22 52 22 C42 22 35 30 35 40"
          stroke="url(#monoGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

// Logo con nombre completo estilo firma
export function LogoSignature({ className = '' }: { className?: string }) {
  return (
    <div className={`h-14 ${className}`}>
      <svg viewBox="0 0 350 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
        <defs>
          <linearGradient id="sigGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        {/* Nombre estilo firma elegante */}
        <text
          x="10"
          y="50"
          fontFamily="Cormorant Garamond, serif"
          fontSize="42"
          fontStyle="italic"
          fontWeight="600"
          fill="url(#sigGradient)"
        >
          Lorenza Gonzalez
        </text>

        {/* Línea de firma decorativa */}
        <path
          d="M10 60 Q50 65 100 58 T200 62 T300 55"
          stroke="#fbbf24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Pequeño diamante */}
        <path d="M310 58 L315 52 L320 58 L315 55 Z" fill="#fbbf24" />
      </svg>
    </div>
  )
}

// Logo Diamond - Versión premium
export function LogoDiamond({ size = 'md', className = '' }: Omit<LogoProps, 'variant'>) {
  return (
    <div className={`${sizes[size].icon} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <linearGradient id="diamondGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Diamante exterior */}
        <path
          d="M50 5 L95 40 L50 95 L5 40 Z"
          stroke="url(#diamondGrad)"
          strokeWidth="3"
          fill="none"
        />

        {/* Facetas del diamante */}
        <path d="M50 5 L50 40 L5 40" stroke="url(#diamondGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M50 5 L50 40 L95 40" stroke="url(#diamondGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M50 40 L50 95" stroke="url(#diamondGrad)" strokeWidth="1.5" fill="none" opacity="0.5" />

        {/* L en el centro */}
        <path
          d="M35 25 L35 60 L65 60"
          stroke="url(#diamondGold)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Brillo superior */}
        <circle cx="50" cy="15" r="3" fill="white" opacity="0.8" />
        <circle cx="45" cy="18" r="1.5" fill="white" opacity="0.5" />
      </svg>
    </div>
  )
}
