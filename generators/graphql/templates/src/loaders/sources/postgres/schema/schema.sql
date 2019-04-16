-- dependencies --

create or replace function trigger_not_exists(name text) returns boolean as $$
begin
  return (exists (select 1 from information_schema.triggers where trigger_name = name)) != true;
end;
$$ language plpgsql;

create or replace function function_not_exists(name text) returns boolean as $$
begin
  return (exists (select 1 from information_schema.routines where routine_name = name)) != true;
end $$ language plpgsql;

-- schema --

create table if not exists "member"
(
  "id" uuid not null primary key,
  "tenant_id" uuid not null,
  "first_name" text not null,
  "middle_name" text,
  "last_name" text not null,
  "created_at" timestamp(3) with time zone not null,
  "created_by" uuid not null,
  "updated_at" timestamp(3) with time zone,
  "updated_by" uuid
)
with (
  oids = false
);

alter table "member"
  owner to postgres;