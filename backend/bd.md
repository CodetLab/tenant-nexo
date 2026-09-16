create table organizations (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  slug text unique not null,

  created_at timestamptz default now()
);

create table students (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid not null
    references organizations(id)
    on delete cascade,

  first_name text not null,
  last_name text not null,

  diagnosis text,

  status text not null default 'active',

  created_at timestamptz default now()
);

create table observations (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid not null
    references organizations(id)
    on delete cascade,

  student_id uuid not null
    references students(id)
    on delete cascade,

  user_id uuid not null,

  area text not null,

  observation text not null,

  achievement text,
  difficulty text,
  strategy_used text,

  created_at timestamptz default now()
);

create table strategies (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid not null
    references organizations(id)
    on delete cascade,

  title text not null,

  description text not null,

  objective text,

  created_by uuid not null,

  created_at timestamptz default now()
);

create table meetings (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid not null
    references organizations(id)
    on delete cascade,

  title text not null,

  meeting_date timestamptz,

  summary text,

  created_by uuid not null,

  created_at timestamptz default now()
);

create table meeting_students (
  meeting_id uuid not null
    references meetings(id)
    on delete cascade,

  student_id uuid not null
    references students(id)
    on delete cascade,

  primary key (
    meeting_id,
    student_id
  )
);

E inmediatamente despues

create index idx_students_organization_id
on students(organization_id);

create index idx_observations_organization_id
on observations(organization_id);

create index idx_observations_student_id
on observations(student_id);

create index idx_observations_user_id
on observations(user_id);

create index idx_observations_created_at
on observations(created_at);

create index idx_strategies_organization_id
on strategies(organization_id);

create index idx_meetings_organization_id
on meetings(organization_id);

create index idx_meetings_date
on meetings(meeting_date);