-- Example migration: create the items table
-- Apply locally:  npx supabase db push
-- Apply to prod:  npx supabase db push --linked

create table if not exists public.items (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  title      text        not null,
  created_at timestamptz not null default now()
);

-- Index speeds up the common query pattern: all items for a given user
create index if not exists items_user_id_idx on public.items (user_id);

-- ─── Row-Level Security ───────────────────────────────────────────────────────
-- Supabase tables are public by default when using the anon/service key.
-- RLS scopes every operation to the authenticated user so users can only
-- ever see or modify their own rows.

alter table public.items enable row level security;

create policy "users can view their own items"
  on public.items for select
  using ( auth.uid() = user_id );

create policy "users can insert their own items"
  on public.items for insert
  with check ( auth.uid() = user_id );

create policy "users can update their own items"
  on public.items for update
  using ( auth.uid() = user_id )
  with check ( auth.uid() = user_id );

create policy "users can delete their own items"
  on public.items for delete
  using ( auth.uid() = user_id );
