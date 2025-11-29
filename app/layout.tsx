import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lorenza Gonzalez | Líder en Marketing de Red | +20 Años de Experiencia',
  description: 'Lorenza Gonzalez - Líder en marketing de red con más de 20 años de experiencia. Únete a mi equipo de 9,000+ personas en Solar Group. Resultados comprobados.',
  keywords: ['Lorenza Gonzalez', 'marketing de red', 'MLM', 'Solar Group', 'network marketing', 'liderazgo', 'emprendimiento'],
  authors: [{ name: 'Lorenza Gonzalez' }],
  openGraph: {
    title: 'Lorenza Gonzalez | Líder en Marketing de Red',
    description: 'Únete a mi equipo de 9,000+ personas. +20 años de experiencia en marketing de red.',
    url: 'https://lorenzapy.com',
    siteName: 'Lorenzapy',
    locale: 'es_PY',
    type: 'website',
    images: [
      {
        url: 'https://lorenzapy.com/images2/lorenzapy-evento-solar-group-2024-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Lorenza Gonzalez - Líder en Marketing de Red',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lorenza Gonzalez | Líder en Marketing de Red',
    description: 'Únete a mi equipo de 9,000+ personas. +20 años de experiencia.',
    images: ['https://lorenzapy.com/images2/lorenzapy-evento-solar-group-2024-1.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="grain">
        {children}
      </body>
    </html>
  )
}
