-- Personal profile (single row table)
create table public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Shreekala Pandey',
  pronouns text default 'She/Her',
  headline text default 'Brand Growth Strategist',
  bio text,
  email text,
  phone text,
  location text,
  avatar_url text,
  social_links jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Work experience
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  company_logo_url text,
  role text not null,
  employment_type text default 'Full-time',
  start_date date not null,
  end_date date,
  is_current boolean default false,
  location text,
  description text,
  skills text[] default '{}',
  external_url text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Skills
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profile enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;

-- Public read access
create policy "Public read profile" on public.profile for select using (true);
create policy "Public read experiences" on public.experiences for select using (true);
create policy "Public read skills" on public.skills for select using (true);

-- Authenticated write access
create policy "Authenticated write profile" on public.profile for all using (auth.role() = 'authenticated');
create policy "Authenticated write experiences" on public.experiences for all using (auth.role() = 'authenticated');
create policy "Authenticated write skills" on public.skills for all using (auth.role() = 'authenticated');
