# 🌟 Lorenza CMS

Un sitio web moderno y elegante con panel de administración completo, bilingüe (Español/Portugués), integrado con Supabase.

## ✨ Características

- **Diseño Moderno**: Estética luxury con animaciones fluidas
- **Bilingüe**: Español y Portugués de Brasil
- **Panel Admin**: Gestión completa de contenido
- **Carrusel de Equipo**: "¿Quieres pertenecer a mi equipo?" con scroll infinito
- **Integración USDT**: Billetera, red, y venta de USDT
- **WhatsApp**: Botón de contacto directo
- **100% Administrable**: Todo el contenido se puede editar desde el panel

## 🚀 Instalación

### 1. Configurar Supabase

1. Ve a [Supabase](https://supabase.com) y abre tu proyecto
2. Ve a **SQL Editor**
3. Copia y pega todo el contenido de `supabase-setup.sql`
4. Ejecuta el script
5. Ve a **Authentication > Users > Add user**
6. Crea el usuario admin para Lorenza:
   - Email: el email de Lorenza
   - Password: una contraseña segura

### 2. Configurar Storage (Imágenes)

1. Ve a **Storage** en Supabase
2. Crea un bucket llamado `images` (público)
3. Crea un bucket llamado `team` (público)
4. En cada bucket, ve a **Policies** y asegúrate de que las políticas estén activas

### 3. Instalar dependencias

```bash
cd lorenza-cms
npm install
```

### 4. Variables de entorno

El archivo `.env.local` ya está configurado con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://trbbnfanzggtopzlkrbn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el sitio.

## 📱 Estructura del Sitio

```
/ (Página principal)
├── Hero Section (Foto + nombre + descripción)
├── About Section (Trayectoria + highlights)
├── Team Section (Carrusel "Únete a mi equipo")
├── Contact Section (WhatsApp + USDT + Billetera)
└── Footer (Créditos Windoce LLC)

/admin (Panel de administración)
├── Login (Solo Lorenza puede acceder)
├── Content Tab (Editar textos en ES/PT)
├── Team Tab (Gestionar imágenes del carrusel)
└── Settings Tab (WhatsApp, USDT, foto principal)
```

## 🎨 Personalización

### Colores
Los colores se pueden modificar en `tailwind.config.js`:
- `gold`: Color dorado principal
- `cream`: Color crema para textos
- `charcoal`: Gris oscuro
- `slate-dark`: Negro principal

### Fuentes
Las fuentes se cargan desde Google Fonts en `app/globals.css`:
- **Playfair Display**: Títulos elegantes
- **DM Sans**: Texto del cuerpo
- **Cormorant Garamond**: Acentos itálicos

## 🔐 Panel de Administración

Accede a `/admin` con las credenciales creadas en Supabase.

### Pestañas disponibles:

1. **Contenido**: Editar todos los textos del sitio en español y portugués
2. **Equipo**: Subir/eliminar imágenes del carrusel
3. **Configuración**:
   - Foto principal de Lorenza
   - Número de WhatsApp
   - Dirección de billetera USDT
   - Red (TRC20, ERC20, etc.)
   - Activar/desactivar venta de USDT

## 📦 Despliegue

### Vercel (Recomendado)

1. Sube el código a GitHub
2. Conecta el repositorio a Vercel
3. Agrega las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Despliega

### Otros servicios

También puedes desplegar en:
- Netlify
- Railway
- DigitalOcean App Platform

## 🌐 Idiomas

El sitio soporta dos idiomas que se pueden cambiar con las banderas en la navegación:

- 🇪🇸 Español (España)
- 🇧🇷 Português (Brasil)

Las traducciones se almacenan en:
- `/translations/es.json`
- `/translations/pt.json`

## 📞 Soporte

Desarrollado por **Windoce LLC** - [windoce.com](https://windoce.com)

---

© 2024 Lorenza. Todos los derechos reservados.
