export const ESQUEMA = [
  `create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  age integer,
  gender text,
  type_document text not null,
  type_subject text not null,
  number_document text not null unique,
  date_birth text,
  code text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)`,
  `create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  age integer,
  gender text,
  type_document text not null,
  type_subject text not null,
  number_document text not null unique,
  date_birth text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
)`
];
