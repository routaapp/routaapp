# Routa — Marketplace de experiencias turísticas en LATAM

> **itsrouta.com** · Repo privado · Stack: Next.js + Supabase + Stripe Connect

---

## Stack

| Capa | Tecnología | Equivalente .NET |
|---|---|---|
| Frontend / SSR | Next.js 16 + TypeScript | ASP.NET MVC + Razor Pages |
| UI | Tailwind CSS | Bootstrap / CSS custom |
| Base de datos | Supabase (PostgreSQL) | SQL Server / EF Core |
| Auth | Supabase Auth | ASP.NET Identity |
| Pagos | Stripe Connect | — |
| Deploy | Vercel | Azure App Service |

---

## Setup local

### 1. Clonar el repo

```bash
git clone git@github.com:routaapp/routaapp.git
cd routaapp
```

### 2. Instalar dependencias

```bash
npm install
```

> Equivale a `dotnet restore` en .NET.

### 3. Variables de entorno

```bash
cp .env.example .env.local
```

Abre `.env.local` y rellena:
- **Supabase:** Crea un proyecto en [supabase.com](https://supabase.com) → Settings → API
- **Stripe:** Crea una cuenta en [stripe.com](https://stripe.com) → Developers → API Keys

### 4. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Estructura del proyecto

```
src/
├── app/                        # Rutas (App Router = Controllers en .NET)
│   ├── (auth)/                 # Grupo de rutas: login, signup
│   ├── (marketplace)/          # Grupo de rutas: home, experiencias
│   ├── (provider)/             # Grupo de rutas: dashboard del proveedor
│   └── api/                    # API Routes (= Controllers de API en .NET)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Cliente browser (Client Components)
│   │   └── server.ts           # Cliente servidor (Server Components)
│   └── stripe/
│       └── client.ts           # Cliente Stripe
│
├── types/
│   └── database.ts             # Tipos generados de Supabase (= modelos .NET)
│
└── middleware.ts               # Auth middleware (= ActionFilter global)
```

### Conceptos clave para un dev de .NET

| .NET | Next.js / Supabase |
|---|---|
| `appsettings.json` | `.env.local` |
| `Program.cs` / DI Container | Providers en `layout.tsx` |
| `[Authorize]` attribute | `middleware.ts` |
| Controller Action | `page.tsx` (Server Component) |
| API Controller | `route.ts` (Route Handler) |
| Razor Page (server render) | Server Component (default) |
| React component con estado | Client Component (`"use client"`) |
| EF Core DbContext | `supabase.from('tabla')` |
| LINQ | Supabase query builder |

---

## Comandos frecuentes

```bash
npm run dev          # Servidor de desarrollo (http://localhost:3000)
npm run build        # Build de producción
npm run lint         # Linter (ESLint)

# Generar tipos de Supabase automáticamente (cuando tengas el proyecto creado)
npx supabase gen types typescript --project-id TU_PROJECT_ID > src/types/database.ts
```

---

## Deploy en Vercel

1. Conecta el repo privado en [vercel.com](https://vercel.com)
2. Agrega las variables de entorno en Vercel → Settings → Environment Variables
3. Cada push a `main` hace deploy automático

---

## Modelo de negocio

- Proveedor lista gratis
- Routa cobra **15%** al proveedor + **5–8%** al viajero por reserva completada
- Total Routa: ~20–23% del valor de cada transacción
