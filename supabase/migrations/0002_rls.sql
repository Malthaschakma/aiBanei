-- Aibanei — Row Level Security
--
-- Posture is default-deny. Every table created in 0001_core.sql has RLS enabled
-- here, and nothing is readable or writable except through an explicit policy
-- below. Enabling RLS without adding a policy denies everything, which is the
-- correct failure mode: a table we forget about stays shut rather than open.
--
-- Two rules that must survive every future change to this file:
--   1. A draft opportunity is visible only to its owner. Never anon, never
--      authenticated-but-unrelated.
--   2. Verification records are writable only by service-role code. A user must
--      never be able to assert that their own revenue has been verified.

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

-- Wrapping auth.uid() lets Postgres cache the result per statement instead of
-- re-evaluating it per row, which matters on the Explore query.
create or replace function current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid();
$$;

create or replace function owns_opportunity(target_opportunity_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.opportunities o
    where o.id = target_opportunity_id
      and o.owner_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

alter table profiles enable row level security;

create policy "profiles are publicly readable"
  on profiles for select
  using (true);

create policy "a profile is created only by its own user"
  on profiles for insert
  to authenticated
  with check (id = (select auth.uid()));

create policy "a profile is updated only by its own user"
  on profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- No delete policy. Account deletion cascades from auth.users and is handled
-- out of band, so users cannot orphan opportunities by deleting a profile.

-- ---------------------------------------------------------------------------
-- profile_roles
-- ---------------------------------------------------------------------------

alter table profile_roles enable row level security;

create policy "profile roles are publicly readable"
  on profile_roles for select
  using (true);

create policy "a user manages only their own roles"
  on profile_roles for all
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------

alter table organizations enable row level security;

create policy "organizations are publicly readable"
  on organizations for select
  using (true);

create policy "an organization is created by an authenticated user"
  on organizations for insert
  to authenticated
  with check (created_by = (select auth.uid()));

create policy "an organization is updated only by its creator"
  on organizations for update
  to authenticated
  using (created_by = (select auth.uid()))
  with check (created_by = (select auth.uid()));

-- ---------------------------------------------------------------------------
-- opportunities
--
-- The split below is the security boundary for the whole public surface.
-- ---------------------------------------------------------------------------

alter table opportunities enable row level security;

create policy "published opportunities are publicly readable"
  on opportunities for select
  using (status = 'published');

create policy "an owner reads their own opportunities in any status"
  on opportunities for select
  to authenticated
  using (owner_id = (select auth.uid()));

create policy "an opportunity is created only by its owner"
  on opportunities for insert
  to authenticated
  with check (owner_id = (select auth.uid()));

create policy "an opportunity is updated only by its owner"
  on opportunities for update
  to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy "an opportunity is deleted only by its owner"
  on opportunities for delete
  to authenticated
  using (owner_id = (select auth.uid()));

-- ---------------------------------------------------------------------------
-- opportunity_versions
--
-- Append-only. There is deliberately no update or delete policy: the version
-- history is worthless as an audit trail if it can be rewritten.
-- ---------------------------------------------------------------------------

alter table opportunity_versions enable row level security;

create policy "an owner reads their own opportunity versions"
  on opportunity_versions for select
  to authenticated
  using (owns_opportunity(opportunity_id));

create policy "an owner appends a version to their own opportunity"
  on opportunity_versions for insert
  to authenticated
  with check (
    owns_opportunity(opportunity_id)
    and created_by = (select auth.uid())
  );

-- ---------------------------------------------------------------------------
-- opportunity_metrics
--
-- Readable only for published opportunities. Metrics on a draft are private
-- working numbers and must not leak through this table while the parent row
-- is still hidden.
-- ---------------------------------------------------------------------------

alter table opportunity_metrics enable row level security;

create policy "metrics are readable for published opportunities"
  on opportunity_metrics for select
  using (
    exists (
      select 1 from opportunities o
      where o.id = opportunity_metrics.opportunity_id
        and o.status = 'published'
    )
  );

create policy "an owner reads metrics for their own opportunities"
  on opportunity_metrics for select
  to authenticated
  using (owns_opportunity(opportunity_id));

create policy "an owner manages metrics for their own opportunities"
  on opportunity_metrics for all
  to authenticated
  using (owns_opportunity(opportunity_id))
  with check (owns_opportunity(opportunity_id));

-- ---------------------------------------------------------------------------
-- verification_records
--
-- Read-only to everyone. There is no insert, update or delete policy at all,
-- which means only service-role code running the review process can write
-- them. This is the single most important restriction in this file: if a user
-- could write here, the entire trust layer would be self-asserted.
-- ---------------------------------------------------------------------------

alter table verification_records enable row level security;

create policy "verification records are publicly readable"
  on verification_records for select
  using (true);

-- ---------------------------------------------------------------------------
-- saved_opportunities
--
-- Private to the user who saved it. A founder must not be able to see who has
-- saved their opportunity; that signal belongs to the express-interest flow,
-- where the investor chooses to reveal themselves.
-- ---------------------------------------------------------------------------

alter table saved_opportunities enable row level security;

create policy "a user reads only their own saved opportunities"
  on saved_opportunities for select
  to authenticated
  using (profile_id = (select auth.uid()));

create policy "a user manages only their own saved opportunities"
  on saved_opportunities for all
  to authenticated
  using (profile_id = (select auth.uid()))
  with check (profile_id = (select auth.uid()));

-- ---------------------------------------------------------------------------
-- Storage
--
-- Phase 1 creates no buckets. When documents land in Phase 4 they go into a
-- private bucket served only through short-lived signed URLs, with access
-- gated on data_room_access and every read written to audit_logs. Public
-- buckets are limited to avatars and organization logos.
-- ---------------------------------------------------------------------------
