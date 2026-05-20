create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  project_type text not null default 'local',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_project_type_check check (project_type in ('local'))
);

create table public.pets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  species text not null default 'hamster',
  color_variant text not null default 'amber',
  personality text not null default 'brave',
  level integer not null default 1 check (level >= 1),
  current_xp integer not null default 0 check (current_xp >= 0),
  total_xp integer not null default 0 check (total_xp >= 0),
  evolution_stage text not null default 'egg',
  mood text not null default 'idle',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pets_project_id_unique unique (project_id),
  constraint pets_species_check check (
    species in ('hamster', 'slime', 'dragon', 'robot', 'cat', 'ghost')
  ),
  constraint pets_evolution_stage_check check (
    evolution_stage in ('egg', 'baby', 'child')
  ),
  constraint pets_mood_check check (
    mood in ('idle', 'happy', 'sleepy', 'celebrate')
  )
);

create table public.quests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  source_type text not null default 'local',
  source_issue_id text,
  title text not null,
  description text,
  status text not null default 'todo',
  quest_type text not null default 'side',
  difficulty text not null default 'normal',
  priority integer,
  estimate integer,
  xp_reward integer not null default 30 check (xp_reward >= 0),
  assignee_id uuid references auth.users(id) on delete set null,
  due_date timestamptz,
  completed_at timestamptz,
  reward_claimed_at timestamptz,
  source_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quests_source_type_check check (source_type in ('local', 'linear')),
  constraint quests_status_check check (
    status in ('todo', 'in_progress', 'done', 'archived', 'canceled')
  ),
  constraint quests_quest_type_check check (
    quest_type in ('main', 'side', 'daily', 'bug', 'chore', 'boss')
  ),
  constraint quests_difficulty_check check (
    difficulty in ('easy', 'normal', 'hard', 'boss')
  )
);

create table public.xp_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  pet_id uuid not null references public.pets(id) on delete cascade,
  quest_id uuid not null references public.quests(id) on delete cascade,
  amount integer not null check (amount > 0),
  reason text not null,
  created_at timestamptz not null default now(),
  constraint xp_logs_reason_check check (
    reason in ('quest_clear', 'streak_bonus', 'boss_clear', 'manual_adjustment')
  ),
  constraint xp_logs_quest_id_unique unique (quest_id)
);

create index projects_owner_id_idx on public.projects(owner_id);
create index pets_project_id_idx on public.pets(project_id);
create index quests_project_id_idx on public.quests(project_id);
create index quests_status_idx on public.quests(status);
create index xp_logs_project_id_idx on public.xp_logs(project_id);
create index xp_logs_pet_id_idx on public.xp_logs(pet_id);

revoke all on public.profiles from anon, authenticated;
revoke all on public.projects from anon, authenticated;
revoke all on public.pets from anon, authenticated;
revoke all on public.quests from anon, authenticated;
revoke all on public.xp_logs from anon, authenticated;

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, update on public.pets to authenticated;
grant select, insert, update, delete on public.quests to authenticated;
grant select, insert on public.xp_logs to authenticated;

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.pets enable row level security;
alter table public.quests enable row level security;
alter table public.xp_logs enable row level security;

create policy "profiles_select_own"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "profiles_update_own"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "projects_select_own"
on public.projects for select
to authenticated
using ((select auth.uid()) = owner_id);

create policy "projects_insert_own"
on public.projects for insert
to authenticated
with check ((select auth.uid()) = owner_id);

create policy "projects_update_own"
on public.projects for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "projects_delete_own"
on public.projects for delete
to authenticated
using ((select auth.uid()) = owner_id);

create policy "pets_select_owned_project"
on public.pets for select
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = pets.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "pets_insert_owned_project"
on public.pets for insert
to authenticated
with check (
  exists (
    select 1
    from public.projects
    where projects.id = pets.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "pets_update_owned_project"
on public.pets for update
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = pets.project_id
      and projects.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.projects
    where projects.id = pets.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "quests_select_owned_project"
on public.quests for select
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = quests.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "quests_insert_owned_project"
on public.quests for insert
to authenticated
with check (
  exists (
    select 1
    from public.projects
    where projects.id = quests.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "quests_update_owned_project"
on public.quests for update
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = quests.project_id
      and projects.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.projects
    where projects.id = quests.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "quests_delete_owned_project"
on public.quests for delete
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = quests.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "xp_logs_select_owned_project"
on public.xp_logs for select
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = xp_logs.project_id
      and projects.owner_id = (select auth.uid())
  )
);

create policy "xp_logs_insert_owned_project"
on public.xp_logs for insert
to authenticated
with check (
  exists (
    select 1
    from public.projects
    where projects.id = xp_logs.project_id
      and projects.owner_id = (select auth.uid())
  )
);
