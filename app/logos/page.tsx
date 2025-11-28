'use client'

import Logo, { LogoMonogram, LogoSignature, LogoDiamond } from '@/components/Logo'

export default function LogosPage() {
  return (
    <div className="min-h-screen bg-slate-dark py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-center mb-4 gradient-text">
          Opciones de Logo - Lorenzapy
        </h1>
        <p className="text-cream/60 text-center mb-16">
          Selecciona el diseño que más te guste
        </p>

        {/* Opción 1: Logo Completo */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-cream mb-8 border-b border-primary-500/30 pb-4">
            Opción 1: Logo Completo con Icono
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Fondo oscuro */}
            <div className="glass-card p-12 flex flex-col items-center gap-8">
              <span className="text-cream/40 text-sm">Fondo Oscuro</span>
              <Logo variant="full" size="xl" />
              <Logo variant="full" size="lg" />
              <Logo variant="full" size="md" />
            </div>

            {/* Fondo claro */}
            <div className="bg-white rounded-2xl p-12 flex flex-col items-center gap-8">
              <span className="text-gray-400 text-sm">Fondo Claro</span>
              <Logo variant="full" size="xl" />
              <Logo variant="full" size="lg" />
              <Logo variant="full" size="md" />
            </div>
          </div>
        </section>

        {/* Opción 2: Solo Icono */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-cream mb-8 border-b border-primary-500/30 pb-4">
            Opción 2: Solo Icono (para favicon, apps, etc.)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-12 flex flex-col items-center gap-8">
              <span className="text-cream/40 text-sm">Fondo Oscuro</span>
              <div className="flex items-end gap-6">
                <Logo variant="icon" size="xl" />
                <Logo variant="icon" size="lg" />
                <Logo variant="icon" size="md" />
                <Logo variant="icon" size="sm" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-12 flex flex-col items-center gap-8">
              <span className="text-gray-400 text-sm">Fondo Claro</span>
              <div className="flex items-end gap-6">
                <Logo variant="icon" size="xl" />
                <Logo variant="icon" size="lg" />
                <Logo variant="icon" size="md" />
                <Logo variant="icon" size="sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Opción 3: Monograma LG */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-cream mb-8 border-b border-primary-500/30 pb-4">
            Opción 3: Monograma Elegante (iniciales L)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-12 flex flex-col items-center gap-8">
              <span className="text-cream/40 text-sm">Fondo Oscuro</span>
              <div className="flex items-end gap-6">
                <LogoMonogram size="xl" />
                <LogoMonogram size="lg" />
                <LogoMonogram size="md" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-12 flex flex-col items-center gap-8">
              <span className="text-gray-400 text-sm">Fondo Claro</span>
              <div className="flex items-end gap-6">
                <LogoMonogram size="xl" />
                <LogoMonogram size="lg" />
                <LogoMonogram size="md" />
              </div>
            </div>
          </div>
        </section>

        {/* Opción 4: Logo Diamante Premium */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-cream mb-8 border-b border-primary-500/30 pb-4">
            Opción 4: Logo Diamante (Estilo Premium/Liderazgo)
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-12 flex flex-col items-center gap-8">
              <span className="text-cream/40 text-sm">Fondo Oscuro</span>
              <div className="flex items-end gap-6">
                <LogoDiamond size="xl" />
                <LogoDiamond size="lg" />
                <LogoDiamond size="md" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-12 flex flex-col items-center gap-8">
              <span className="text-gray-400 text-sm">Fondo Claro</span>
              <div className="flex items-end gap-6">
                <LogoDiamond size="xl" />
                <LogoDiamond size="lg" />
                <LogoDiamond size="md" />
              </div>
            </div>
          </div>
        </section>

        {/* Opción 5: Firma Elegante */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-cream mb-8 border-b border-primary-500/30 pb-4">
            Opción 5: Firma Elegante (Nombre Completo)
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="glass-card p-12 flex flex-col items-center gap-8">
              <span className="text-cream/40 text-sm">Fondo Oscuro</span>
              <LogoSignature />
            </div>

            <div className="bg-white rounded-2xl p-12 flex flex-col items-center gap-8">
              <span className="text-gray-400 text-sm">Fondo Claro</span>
              <LogoSignature />
            </div>
          </div>
        </section>

        {/* Preview en contexto */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-cream mb-8 border-b border-primary-500/30 pb-4">
            Vista Previa en Navegación
          </h2>

          <div className="space-y-6">
            {/* Nav con Logo Full */}
            <div className="glass-card p-4 flex items-center justify-between">
              <Logo variant="full" size="md" />
              <div className="flex gap-6 text-cream/60">
                <span>Inicio</span>
                <span>Sobre Mí</span>
                <span>Proyectos</span>
                <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm">Unirme Ahora</span>
              </div>
            </div>

            {/* Nav con Logo Icono + Texto */}
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo variant="icon" size="md" />
                <span className="font-display text-xl font-bold gradient-text">Lorenza</span>
              </div>
              <div className="flex gap-6 text-cream/60">
                <span>Inicio</span>
                <span>Sobre Mí</span>
                <span>Proyectos</span>
                <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm">Unirme Ahora</span>
              </div>
            </div>

            {/* Nav con Diamante + Texto */}
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoDiamond size="md" />
                <span className="font-display text-xl font-bold gradient-text">LORENZA</span>
              </div>
              <div className="flex gap-6 text-cream/60">
                <span>Inicio</span>
                <span>Sobre Mí</span>
                <span>Proyectos</span>
                <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm">Unirme Ahora</span>
              </div>
            </div>

            {/* Nav con Monograma + Texto */}
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoMonogram size="md" />
                <span className="font-display text-xl font-bold gradient-text">LORENZAPY</span>
              </div>
              <div className="flex gap-6 text-cream/60">
                <span>Inicio</span>
                <span>Sobre Mí</span>
                <span>Proyectos</span>
                <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm">Unirme Ahora</span>
              </div>
            </div>
          </div>
        </section>

        {/* Instrucciones */}
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-bold text-cream mb-4">Cuál te gusta más?</h3>
          <p className="text-cream/60">
            Dime cuál opción prefieres y la implementamos en la navegación del sitio.
            <br />
            También puedo hacer ajustes de colores, formas o estilos según tu preferencia.
          </p>
        </div>
      </div>
    </div>
  )
}
