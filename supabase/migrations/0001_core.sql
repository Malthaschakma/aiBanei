-- Aibanei — Phase 1 core schema
--
-- Covers only what Phase 1 needs: profiles, organizations, opportunities and
-- the trust layer around them. Later-phase entities are listed at the bottom of
-- this file as a roadmap but deliberately not created, so the schema stays
-- something we can reason about.
--
-- Row Level Security is enabled in 0002_rls.sql. This file creates no policies,
-- which means every table here is inaccessible until that migration runs.

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

-- ---------------------------------------------------------------------------
-- Enumerated types. These mirror types/taxonomy.ts exactly.
-- ---------------------------------------------------------------------------

create type user_role as enum (
  'idea_owner', 'founder', 'investor', 'partner',
  'talent', 'advisor', 'operator', 'organization'
);

create type opportunity_sector as enum (
  'technology', 'agriculture', 'hospitality', 'healthcare', 'education',
  'manufacturing', 'climate', 'media', 'creative', 'other'
);

create type opportunity_stage as enum (
  'idea', 'validation', 'prototype', 'mvp', 'revenue', 'growth'
);

create type opportunity_need as enum (
  'capital', 'co_founder', 'partner', 'talent', 'expertise',
  'customers', 'distribution', 'technology', 'operations', 'acquisition'
);

create type opportunity_status as enum (
  'draft', 'published', 'paused', 'archived', 'removed'
);

create type activity_status as enum (
  'actively_looking', 'exploring', 'not_looking'
);

create type verification_kind as enum (
  'identity', 'company_registration', 'revenue', 'customers', 'legal'
);

-- Granular by design. There is no single "verified" state, because a lone tick
-- would imply the whole record had been vouched for.
create type verification_status as enum (
  'self_reported', 'identity_verified', 'profile_reviewed', 'evidence_verified'
);

-- ---------------------------------------------------------------------------
-- Shared helpers
-- ---------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles
--
-- One row per auth.users row. Application code always reads profiles, never
-- auth.users directly.
-- ---------------------------------------------------------------------------

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  slug text not null unique,
  full_name text not null,
  headline text,
  bio text,
  avatar_url text,

  city text,
  region text,
  country text,

  activity_status activity_status not null default 'exploring',
  looking_for opportunity_need[] not null default '{}',
  can_offer text[] not null default '{}',

  -- Denormalised for cheap "last active" rendering in lists.
  last_active_at timestamptz not null default now(),
  onboarding_completed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint profiles_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index profiles_activity_status_idx on profiles (activity_status);
create index profiles_country_idx on profiles (country);
create index profiles_looking_for_idx on profiles using gin (looking_for);
create index profiles_full_name_trgm_idx on profiles using gin (full_name gin_trgm_ops);

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- profile_roles
--
-- A person is never forced into one permanent identity. Founder + Investor and
-- Investor + Partner are ordinary combinations, so roles are a separate table
-- rather than a column.
-- ---------------------------------------------------------------------------

create table profile_roles (
  profile_id uuid not null references profiles (id) on delete cascade,
  role user_role not null,
  created_at timestamptz not null default now(),
  primary key (profile_id, role)
);

create index profile_roles_role_idx on profile_roles (role);

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------

create table organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  website text,
  logo_url text,

  city text,
  region text,
  country text,

  registration_number text,
  incorporated_on date,

  created_by uuid not null references profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint organizations_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index organizations_created_by_idx on organizations (created_by);

create trigger organizations_set_updated_at
  before update on organizations
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- opportunities
--
-- The published, publicly readable record. Narrative prose lives in a jsonb
-- column because the section set is still moving; the fields that are filtered
-- or sorted on are real columns.
-- ---------------------------------------------------------------------------

create table opportunities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text not null,

  sector opportunity_sector not null,
  stage opportunity_stage not null,
  needs opportunity_need[] not null default '{}',
  status opportunity_status not null default 'draft',
  activity_status activity_status not null default 'actively_looking',

  city text not null,
  region text,
  country text not null,

  -- Stored in the smallest currency unit's whole value (BDT taka, not poisha).
  capital_seeking_bdt bigint,

  narrative jsonb not null default '{}'::jsonb,
  use_of_funds jsonb not null default '[]'::jsonb,

  owner_id uuid not null references profiles (id) on delete restrict,
  organization_id uuid references organizations (id) on delete set null,

  readiness_score smallint not null default 0,
  readiness_signals jsonb not null default '[]'::jsonb,

  published_at timestamptz,
  last_active_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Maintained by trigger below rather than as a generated column, because
  -- narrative is jsonb and jsonb extraction is not immutable.
  search_vector tsvector,

  constraint opportunities_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint opportunities_summary_length check (char_length(summary) between 1 and 200),
  constraint opportunities_capital_non_negative check (capital_seeking_bdt is null or capital_seeking_bdt >= 0),
  constraint opportunities_readiness_range check (readiness_score between 0 and 100),
  -- A published opportunity must record when it was published.
  constraint opportunities_published_has_timestamp check (status <> 'published' or published_at is not null)
);

create index opportunities_status_idx on opportunities (status);
create index opportunities_sector_idx on opportunities (sector);
create index opportunities_stage_idx on opportunities (stage);
create index opportunities_country_idx on opportunities (country);
create index opportunities_owner_idx on opportunities (owner_id);
create index opportunities_organization_idx on opportunities (organization_id);
create index opportunities_needs_idx on opportunities using gin (needs);
create index opportunities_search_idx on opportunities using gin (search_vector);
create index opportunities_capital_idx on opportunities (capital_seeking_bdt);
-- Covers the default Explore ordering: published records, most recently active.
create index opportunities_published_active_idx
  on opportunities (last_active_at desc)
  where status = 'published';

create or replace function opportunities_update_search_vector()
returns trigger
language plpgsql
as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.summary, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.city, '') || ' ' || coalesce(new.country, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(new.narrative ->> 'problem', '')), 'D') ||
    setweight(to_tsvector('english', coalesce(new.narrative ->> 'solution', '')), 'D');
  return new;
end;
$$;

create trigger opportunities_search_vector_refresh
  before insert or update of name, summary, city, country, narrative on opportunities
  for each row execute function opportunities_update_search_vector();

create trigger opportunities_set_updated_at
  before update on opportunities
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- opportunity_versions
--
-- Append-only snapshot taken on each publish. Lets a founder recover a draft
-- and gives an investor an auditable history of what was claimed and when.
-- ---------------------------------------------------------------------------

create table opportunity_versions (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities (id) on delete cascade,
  version integer not null,
  snapshot jsonb not null,
  created_by uuid not null references profiles (id) on delete restrict,
  created_at timestamptz not null default now(),

  unique (opportunity_id, version)
);

create index opportunity_versions_opportunity_idx
  on opportunity_versions (opportunity_id, version desc);

-- ---------------------------------------------------------------------------
-- opportunity_metrics
--
-- Separate from opportunities because these are time-series: one row per
-- reporting period, not a single mutable snapshot.
-- ---------------------------------------------------------------------------

create table opportunity_metrics (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references opportunities (id) on delete cascade,

  period date not null,
  monthly_revenue_bdt bigint,
  monthly_growth_pct numeric(6, 2),
  customers integer,
  team_size integer not null default 1,
  founder_contribution_bdt bigint,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (opportunity_id, period),
  constraint opportunity_metrics_non_negative check (
    (monthly_revenue_bdt is null or monthly_revenue_bdt >= 0) and
    (customers is null or customers >= 0) and
    (founder_contribution_bdt is null or founder_contribution_bdt >= 0) and
    team_size > 0
  )
);

create index opportunity_metrics_opportunity_idx
  on opportunity_metrics (opportunity_id, period desc);

create trigger opportunity_metrics_set_updated_at
  before update on opportunity_metrics
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- verification_records
--
-- Polymorphic over profiles, organizations and opportunities. `statement` is
-- mandatory: every record must say in plain language what was actually checked,
-- because that text is what the UI renders next to the mark.
-- ---------------------------------------------------------------------------

create table verification_records (
  id uuid primary key default gen_random_uuid(),

  subject_type text not null check (subject_type in ('profile', 'organization', 'opportunity')),
  subject_id uuid not null,

  kind verification_kind not null,
  status verification_status not null default 'self_reported',
  statement text not null,

  reviewed_by uuid references profiles (id) on delete set null,
  verified_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (subject_type, subject_id, kind),
  constraint verification_statement_present check (char_length(trim(statement)) > 0),
  -- Anything past self-reported must record when it was checked.
  constraint verification_verified_has_timestamp
    check (status = 'self_reported' or verified_at is not null)
);

create index verification_records_subject_idx
  on verification_records (subject_type, subject_id);

create trigger verification_records_set_updated_at
  before update on verification_records
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- saved_opportunities
-- ---------------------------------------------------------------------------

create table saved_opportunities (
  profile_id uuid not null references profiles (id) on delete cascade,
  opportunity_id uuid not null references opportunities (id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  primary key (profile_id, opportunity_id)
);

create index saved_opportunities_opportunity_idx
  on saved_opportunities (opportunity_id);

-- ---------------------------------------------------------------------------
-- Roadmap — intentionally not created in Phase 1
--
-- Adding these before the Phase 1 surface is stable would mean maintaining RLS
-- policies for tables nothing reads yet. Each lands with the phase that uses it.
--
--   Phase 2 (Network)
--     investors                 investor preferences: ticket range, sectors, stages
--     partners, talent          role-specific profile extensions
--     skills, profile_skills    controlled skill vocabulary
--     matches                   computed fit, with per-dimension breakdown
--     connections               express-interest requests and their state
--     messages                  private, gated on an accepted connection
--     notifications             critical / useful / digest tiers
--
--   Phase 3 (Trust)
--     verification_requests     the queue behind verification_records
--     reports, moderation_actions
--     updates, comments
--
--   Phase 4 (Deal flow)
--     funding_rounds, investor_interests
--     documents, data_rooms, data_room_access
--     meetings, tasks, deal_rooms, deal_participants
--
--   Phase 5+ (Intelligence, media, infrastructure)
--     document_analyses, opportunity_questions
--     events, pitch_days
--     subscriptions, payments
--
--   Cross-cutting
--     audit_logs                append-only; must land with data_rooms at the latest
-- ---------------------------------------------------------------------------
