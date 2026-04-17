-- ─────────────────────────────────────────────────────────────────────────────
-- ROUTA — Schema de base de datos (v2)
-- Correr en: Supabase Dashboard → SQL Editor → New query → pegar y ejecutar
--
-- IMPORTANTE: Este script elimina y recrea todas las tablas desde cero.
-- Si ya existe data real, hacer backup antes de ejecutar.
-- ─────────────────────────────────────────────────────────────────────────────

-- Habilitar extensión para UUIDs
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. ELIMINAR tablas existentes (en orden inverso de dependencias)
-- ─────────────────────────────────────────────────────────────────────────────

drop table if exists public.user_wishlists  cascade;
drop table if exists public.reviews         cascade;
drop table if exists public.bookings        cascade;
drop table if exists public.departures      cascade;
drop table if exists public.experiences     cascade;
drop table if exists public.providers       cascade;

-- Eliminar función y trigger si existían
drop function if exists public.update_provider_rating() cascade;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. CREAR TABLAS
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── TABLA: providers ────────────────────────────────────────────────────────
-- Agencias, guías y operadores turísticos.
-- El rating vive aquí — Routa evalúa proveedores, no tours individuales.
create table public.providers (
  id                uuid        primary key default uuid_generate_v4(),
  created_at        timestamptz default now(),
  user_id           uuid        references auth.users(id) on delete cascade not null,
  business_name     text        not null,
  description       text        not null default '',
  phone             text        not null default '',
  whatsapp          text,
  country           text        not null default 'DO',
  city              text        not null default '',
  stripe_account_id text,
  is_verified       boolean     default false,
  is_active         boolean     default true,

  -- Rating agregado del proveedor (calculado automáticamente por trigger)
  avg_rating        numeric(3,2),
  total_reviews     int         default 0,

  unique(user_id)
);

-- ─── TABLA: experiences ──────────────────────────────────────────────────────
-- Plantillas de experiencias turísticas. Un tour se crea una sola vez y se
-- "activa" para distintas fechas mediante la tabla departures.
-- El rating ya no vive aquí — está en el proveedor.
create table public.experiences (
  id              uuid        primary key default uuid_generate_v4(),
  created_at      timestamptz default now(),
  provider_id     uuid        references public.providers(id) on delete cascade not null,
  title           text        not null,
  description     text        not null default '',
  base_price      numeric(10,2) not null,       -- precio base; cada departure puede sobreescribirlo
  duration_hours  numeric(4,1) not null,
  max_capacity    int         not null default 10,
  location        text        not null,
  country         text        not null default 'DO',
  category        text        not null default 'otro',
  images          text[]      default '{}',
  is_active       boolean     default true,
  times_activated int         default 0         -- contador de cuántas salidas ha tenido
);

-- ─── TABLA: departures ───────────────────────────────────────────────────────
-- Cada salida (fecha específica) de un tour.
-- Las agencias no recrean el tour — solo agregan nuevas salidas al catálogo.
create table public.departures (
  id              uuid        primary key default uuid_generate_v4(),
  created_at      timestamptz default now(),
  experience_id   uuid        references public.experiences(id) on delete cascade not null,
  provider_id     uuid        references public.providers(id) on delete cascade not null, -- denormalizado para queries rápidas
  departure_date  date        not null,
  departure_time  time,                         -- hora de inicio (opcional)
  price_override  numeric(10,2),                -- si es null, usa base_price de la experiencia
  capacity        int,                          -- si es null, usa max_capacity de la experiencia
  spots_taken     int         not null default 0,
  status          text        not null default 'active',  -- active | cancelled | full | completed
  notes           text                          -- notas internas del proveedor para esta salida
);

-- ─── TABLA: bookings ─────────────────────────────────────────────────────────
-- Reservas de viajeros. Ahora apuntan a una salida específica (departure),
-- no a una fecha suelta.
create table public.bookings (
  id                        uuid        primary key default uuid_generate_v4(),
  created_at                timestamptz default now(),
  departure_id              uuid        references public.departures(id) not null,
  experience_id             uuid        references public.experiences(id) not null,  -- denormalizado para queries rápidas
  provider_id               uuid        references public.providers(id) not null,    -- denormalizado para queries rápidas
  traveler_id               uuid        references auth.users(id) not null,
  participants              int         not null default 1,
  total_amount              numeric(10,2) not null,
  platform_fee              numeric(10,2) not null,
  provider_amount           numeric(10,2) not null,
  status                    text        default 'pending',  -- pending | confirmed | cancelled | completed
  stripe_payment_intent_id  text,
  notes                     text                            -- nota del viajero al proveedor
);

-- ─── TABLA: reviews ──────────────────────────────────────────────────────────
-- Reseñas verificadas: solo quien reservó por Routa puede opinar.
-- El rating impacta al proveedor (agencia), no al tour individual.
-- La reseña queda etiquetada con el tour específico para mostrarse
-- en futuras salidas de ese mismo tour.
create table public.reviews (
  id            uuid    primary key default uuid_generate_v4(),
  created_at    timestamptz default now(),
  booking_id    uuid    references public.bookings(id) not null unique,  -- garantiza 1 reseña por reserva
  experience_id uuid    references public.experiences(id) not null,      -- para mostrar reseñas por tour
  provider_id   uuid    references public.providers(id) not null,        -- para agregar rating al proveedor
  traveler_id   uuid    references auth.users(id) not null,
  rating        int     not null check (rating between 1 and 5),
  comment       text
);

-- ─── TABLA: user_wishlists ───────────────────────────────────────────────────
-- Tours guardados por el viajero. Si tiene antojo de algo, lo guarda para
-- reservar cuando esté listo. También sirve como señal de demanda para Routa.
create table public.user_wishlists (
  id            uuid    primary key default uuid_generate_v4(),
  created_at    timestamptz default now(),
  user_id       uuid    references auth.users(id) on delete cascade not null,
  experience_id uuid    references public.experiences(id) on delete cascade not null,
  unique(user_id, experience_id)  -- un usuario no puede guardar el mismo tour dos veces
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. TRIGGER: recalcular rating del proveedor al insertar/borrar reseñas
-- ─────────────────────────────────────────────────────────────────────────────

create or replace function public.update_provider_rating()
returns trigger as $$
begin
  update public.providers
  set
    avg_rating    = (select round(avg(rating)::numeric, 2) from public.reviews where provider_id = coalesce(new.provider_id, old.provider_id)),
    total_reviews = (select count(*) from public.reviews where provider_id = coalesce(new.provider_id, old.provider_id))
  where id = coalesce(new.provider_id, old.provider_id);
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

create trigger trg_update_provider_rating
  after insert or delete on public.reviews
  for each row execute function public.update_provider_rating();

-- También actualizar el contador de salidas en experiences cuando se agrega una departure
create or replace function public.increment_times_activated()
returns trigger as $$
begin
  update public.experiences
  set times_activated = times_activated + 1
  where id = new.experience_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_increment_times_activated
  after insert on public.departures
  for each row execute function public.increment_times_activated();

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.providers       enable row level security;
alter table public.experiences     enable row level security;
alter table public.departures      enable row level security;
alter table public.bookings        enable row level security;
alter table public.reviews         enable row level security;
alter table public.user_wishlists  enable row level security;

-- ── Providers ────────────────────────────────────────────────────────────────
create policy "Providers visibles para todos"
  on public.providers for select
  using (is_active = true);

create policy "Proveedor puede gestionar su perfil"
  on public.providers for all
  using (auth.uid() = user_id);

-- ── Experiences ──────────────────────────────────────────────────────────────
create policy "Experiencias visibles para todos"
  on public.experiences for select
  using (is_active = true);

create policy "Proveedor puede gestionar sus experiencias"
  on public.experiences for all
  using (
    provider_id in (
      select id from public.providers where user_id = auth.uid()
    )
  );

-- ── Departures ───────────────────────────────────────────────────────────────
create policy "Salidas visibles para todos"
  on public.departures for select
  using (status != 'cancelled');

create policy "Proveedor puede gestionar sus salidas"
  on public.departures for all
  using (
    provider_id in (
      select id from public.providers where user_id = auth.uid()
    )
  );

-- ── Bookings ─────────────────────────────────────────────────────────────────
create policy "Viajero ve sus reservas"
  on public.bookings for select
  using (auth.uid() = traveler_id);

create policy "Proveedor ve reservas de sus salidas"
  on public.bookings for select
  using (
    provider_id in (
      select id from public.providers where user_id = auth.uid()
    )
  );

create policy "Viajero puede crear reserva"
  on public.bookings for insert
  with check (auth.uid() = traveler_id);

create policy "Viajero puede cancelar su reserva"
  on public.bookings for update
  using (auth.uid() = traveler_id);

-- ── Reviews ──────────────────────────────────────────────────────────────────
create policy "Reviews visibles para todos"
  on public.reviews for select
  using (true);

create policy "Viajero puede dejar reseña de su reserva"
  on public.reviews for insert
  with check (auth.uid() = traveler_id);

-- ── User Wishlists ───────────────────────────────────────────────────────────
create policy "Usuario ve su propia wishlist"
  on public.user_wishlists for select
  using (auth.uid() = user_id);

create policy "Usuario puede gestionar su wishlist"
  on public.user_wishlists for all
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- FIN DEL SCHEMA
-- ─────────────────────────────────────────────────────────────────────────────
-- Notas para el equipo:
--
-- 1. experiences → plantilla reutilizable del tour
-- 2. departures  → cada fecha/hora específica de ese tour
-- 3. bookings    → la reserva apunta a departure_id (salida específica)
-- 4. reviews     → van al proveedor; etiquetadas con experience_id para
--                  mostrarlas en futuras salidas del mismo tour
-- 5. user_wishlists → tours guardados por el viajero para reservar después
-- 6. avg_rating / total_reviews viven en providers, no en experiences
-- ─────────────────────────────────────────────────────────────────────────────
