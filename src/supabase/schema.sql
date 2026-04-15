create extension if not exists "pgcrypto";

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique,
  full_name text not null,
  email text,
  avatar_url text,
  bio text,
  role text not null default 'member' check (role in ('admin', 'member')),
  generation int not null check (generation in (1, 2, 3, 4)),
  generation_label text,
  is_active boolean not null default false,
  batch_year int,
  branch text,
  skills text[] not null default '{}',
  position_in_club text,
  linkedin_url text,
  github_url text,
  twitter_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.generation_meta (
  id int primary key check (id in (1, 2, 3, 4)),
  label text not null,
  year_range text not null,
  tagline text,
  milestones text[] not null default '{}',
  photo_url text
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  event_type text not null check (event_type in ('talk', 'workshop', 'hackathon', 'panel', 'other')),
  speaker_name text,
  speaker_bio text,
  speaker_photo_url text,
  speaker_linkedin text,
  speaker_company text,
  date timestamptz not null,
  venue text,
  registration_limit int,
  banner_url text,
  recording_url text,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  is_past boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  member_id uuid not null references public.members(id) on delete cascade,
  registered_at timestamptz not null default now(),
  unique (event_id, member_id)
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  logo_url text,
  tier text not null check (tier in ('gold', 'silver', 'bronze', 'partner')),
  website_url text,
  contact_email text,
  year int,
  is_active boolean not null default true,
  collab_type text,
  notes text,
  pipeline_stage text not null default 'lead'
);

create table if not exists public.sponsor_leads (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  website_url text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;
alter table public.generation_meta enable row level security;
alter table public.events enable row level security;
alter table public.registrations enable row level security;
alter table public.sponsors enable row level security;
alter table public.sponsor_leads enable row level security;

drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
  on public.events
  for select
  using (is_published = true);

drop policy if exists "Admins manage all events" on public.events;
create policy "Admins manage all events"
  on public.events
  for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Public can read visible members" on public.members;
create policy "Public can read visible members"
  on public.members
  for select
  using (is_public = true);

drop policy if exists "Members can update own profile" on public.members;
create policy "Members can update own profile"
  on public.members
  for update
  using ((auth.jwt() ->> 'sub') = clerk_id)
  with check ((auth.jwt() ->> 'sub') = clerk_id);

drop policy if exists "Members can read own profile" on public.members;
create policy "Members can read own profile"
  on public.members
  for select
  using ((auth.jwt() ->> 'sub') = clerk_id);

drop policy if exists "Admins manage all members" on public.members;
create policy "Admins manage all members"
  on public.members
  for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Public can read generation meta" on public.generation_meta;
create policy "Public can read generation meta"
  on public.generation_meta
  for select
  using (true);

drop policy if exists "Admins manage generation meta" on public.generation_meta;
create policy "Admins manage generation meta"
  on public.generation_meta
  for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Members can register themselves" on public.registrations;
create policy "Members can register themselves"
  on public.registrations
  for insert
  with check (
    exists (
      select 1
      from public.members
      where members.id = registrations.member_id
        and members.clerk_id = (auth.jwt() ->> 'sub')
    )
  );

drop policy if exists "Members can read own registrations" on public.registrations;
create policy "Members can read own registrations"
  on public.registrations
  for select
  using (
    exists (
      select 1
      from public.members
      where members.id = registrations.member_id
        and members.clerk_id = (auth.jwt() ->> 'sub')
    )
  );

drop policy if exists "Admins manage registrations" on public.registrations;
create policy "Admins manage registrations"
  on public.registrations
  for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins manage sponsors" on public.sponsors;
create policy "Admins manage sponsors"
  on public.sponsors
  for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins manage sponsor leads" on public.sponsor_leads;
create policy "Admins manage sponsor leads"
  on public.sponsor_leads
  for all
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
