-- ─────────────────────────────────────────────────────────────────────────────
-- ROUTA — Schema inicial de base de datos
-- Correr en: Supabase Dashboard → SQL Editor → New query → pegar y ejecutar
-- ─────────────────────────────────────────────────────────────────────────────

-- Habilitar extensión para UUIDs (equivale a NEWID() en SQL Server)
create extension if not exists "uuid-ossp";

-- ─── TABLA: providers ────────────────────────────────────────────────────────
-- Guías, agencias y operadores turísticos
create table if not exists public.providers (
  id              uuid primary key default uuid_generate_v4(),
  created_at      timestamptz default now(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  business_name   text not null,
  description     text not null default '',
  phone           text not null default '',
  whatsapp        text,
  country         text not null default 'DO',
  city            text not null default '',
  stripe_account_id text,
  is_verified     boolean default false,
  is_active       boolean default true,
  unique(user_id)
);

-- ─── TABLA: experiences ──────────────────────────────────────────────────────
-- Experiencias turísticas listadas por los proveedores
create table if not exists public.experiences (
  id              uuid primary key default uuid_generate_v4(),
  created_at      timestamptz default now(),
  title           text not null,
  description     text not null default '',
  price           numeric(10,2) not null,
  duration_hours  numeric(4,1) not null,
  max_capacity    int not null default 10,
  location        text not null,
  country         text not null default 'DO',
  category        text not null default 'otro',
  images          text[] default '{}',
  provider_id     uuid references public.providers(id) on delete cascade not null,
  is_active       boolean default true,
  avg_rating      numeric(3,2),
  total_reviews   int default 0
);

-- ─── TABLA: bookings ─────────────────────────────────────────────────────────
-- Reservas de viajeros
create table if not exists public.bookings (
  id                        uuid primary key default uuid_generate_v4(),
  created_at                timestamptz default now(),
  experience_id             uuid references public.experiences(id) not null,
  traveler_id               uuid references auth.users(id) not null,
  provider_id               uuid references public.providers(id) not null,
  booking_date              date not null,
  participants              int not null default 1,
  total_amount              numeric(10,2) not null,
  platform_fee              numeric(10,2) not null,
  provider_amount           numeric(10,2) not null,
  status                    text default 'pending',
  stripe_payment_intent_id  text,
  notes                     text
);

-- ─── TABLA: reviews ──────────────────────────────────────────────────────────
-- Reseñas de experiencias (solo viajeros que completaron la reserva)
create table if not exists public.reviews (
  id            uuid primary key default uuid_generate_v4(),
  created_at    timestamptz default now(),
  booking_id    uuid references public.bookings(id) not null unique,
  experience_id uuid references public.experiences(id) not null,
  traveler_id   uuid references auth.users(id) not null,
  rating        int not null check (rating between 1 and 5),
  comment       text
);

-- ─── ROW LEVEL SECURITY (RLS) ────────────────────────────────────────────────
-- Equivale a autorización por fila en SQL Server con predicados de seguridad.
-- Sin esto, cualquiera con la anon key puede leer/escribir toda la tabla.

alter table public.providers   enable row level security;
alter table public.experiences enable row level security;
alter table public.bookings    enable row level security;
alter table public.reviews     enable row level security;

-- Policies para providers
create policy "Providers visibles para todos" on public.providers
  for select using (is_active = true);

create policy "Proveedor puede editar su perfil" on public.providers
  for all using (auth.uid() = user_id);

-- Policies para experiences
create policy "Experiencias visibles para todos" on public.experiences
  for select using (is_active = true);

create policy "Proveedor puede gestionar sus experiencias" on public.experiences
  for all using (
    provider_id in (
      select id from public.providers where user_id = auth.uid()
    )
  );

-- Policies para bookings
create policy "Viajero ve sus reservas" on public.bookings
  for select using (auth.uid() = traveler_id);

create policy "Proveedor ve reservas de sus experiencias" on public.bookings
  for select using (
    provider_id in (
      select id from public.providers where user_id = auth.uid()
    )
  );

create policy "Viajero puede crear reserva" on public.bookings
  for insert with check (auth.uid() = traveler_id);

-- Policies para reviews
create policy "Reviews visibles para todos" on public.reviews
  for select using (true);

create policy "Viajero puede dejar reseña de su reserva" on public.reviews
  for insert with check (auth.uid() = traveler_id);

-- ─── DATOS DE PRUEBA ─────────────────────────────────────────────────────────
-- Experiencias de ejemplo para ver el marketplace con datos reales
-- (Opcional — borrar en producción)

-- Nota: necesitas crear primero un usuario y un provider para asociarlas.
-- Ver README para instrucciones de seed completo.
