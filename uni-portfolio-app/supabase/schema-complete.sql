-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int not null default 0
);

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client_name text not null,
  category_id uuid not null references public.categories(id),
  summary text not null,
  challenge_description text,
  solution_description text,
  completion_year int not null,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  external_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  tags text[] default '{}',
  related_projects jsonb default '[]',
  outcome_highlights text[] default '{}'
);

-- Media assets
create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  asset_type text not null check (asset_type in ('image', 'video', 'interactive_embed')),
  url text not null,
  poster_url text,
  alt_text text not null,
  width int,
  height int,
  display_order int not null default 0
);

-- Articles
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  author_name text not null,
  body_content text not null,
  reading_time_minutes int not null,
  published_at timestamptz not null default now(),
  status text not null default 'draft' check (status in ('draft', 'published')),
  excerpt text,
  topics text[] default '{}'
);

-- Awards
create table public.awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  project_name text not null,
  year int not null,
  verification_url text,
  display_order int not null default 0
);

-- Services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  display_order int not null default 0
);

-- Methodology steps
create table public.methodology_steps (
  id uuid primary key default gen_random_uuid(),
  step_number int not null unique,
  title text not null,
  description text not null
);

-- Clients
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text not null,
  display_order int not null default 0
);

-- Inquiries
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  services text[] not null default '{}',
  budget_range text not null check (budget_range in ('<25k', '25k-50k', '50k-100k', '100k+')),
  estimated_timeline text,
  project_description text not null,
  attachment_url text,
  status text not null default 'new' check (status in ('new', 'read', 'contacted', 'archived', 'email_failed')),
  ip_address text not null,
  created_at timestamptz default now()
);

-- Profile
create table public.profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Shreekala Pandey',
  pronouns text default 'She/Her',
  headline text default 'Brand Growth Strategist',
  tagline text default 'Marketing Diva',
  bio text,
  email text,
  phone text,
  location text,
  avatar_url text,
  social_links jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Experiences
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

-- Enable RLS on all tables
alter table public.categories enable row level security;
alter table public.projects enable row level security;
alter table public.media_assets enable row level security;
alter table public.articles enable row level security;
alter table public.awards enable row level security;
alter table public.services enable row level security;
alter table public.methodology_steps enable row level security;
alter table public.clients enable row level security;
alter table public.inquiries enable row level security;
alter table public.profile enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;

-- Public read policies
create policy "Public read categories" on public.categories for select using (true);
create policy "Public read projects" on public.projects for select using (true);
create policy "Public read media_assets" on public.media_assets for select using (true);
create policy "Public read articles" on public.articles for select using (true);
create policy "Public read awards" on public.awards for select using (true);
create policy "Public read services" on public.services for select using (true);
create policy "Public read methodology_steps" on public.methodology_steps for select using (true);
create policy "Public read clients" on public.clients for select using (true);
create policy "Public read inquiries" on public.inquiries for select using (true);
create policy "Public read profile" on public.profile for select using (true);
create policy "Public read experiences" on public.experiences for select using (true);
create policy "Public read skills" on public.skills for select using (true);

-- Authenticated write policies
create policy "Authenticated write categories" on public.categories for all using (auth.role() = 'authenticated');
create policy "Authenticated write projects" on public.projects for all using (auth.role() = 'authenticated');
create policy "Authenticated write media_assets" on public.media_assets for all using (auth.role() = 'authenticated');
create policy "Authenticated write articles" on public.articles for all using (auth.role() = 'authenticated');
create policy "Authenticated write awards" on public.awards for all using (auth.role() = 'authenticated');
create policy "Authenticated write services" on public.services for all using (auth.role() = 'authenticated');
create policy "Authenticated write methodology_steps" on public.methodology_steps for all using (auth.role() = 'authenticated');
create policy "Authenticated write clients" on public.clients for all using (auth.role() = 'authenticated');
create policy "Authenticated write inquiries" on public.inquiries for all using (auth.role() = 'authenticated');
create policy "Authenticated write profile" on public.profile for all using (auth.role() = 'authenticated');
create policy "Authenticated write experiences" on public.experiences for all using (auth.role() = 'authenticated');
create policy "Authenticated write skills" on public.skills for all using (auth.role() = 'authenticated');
