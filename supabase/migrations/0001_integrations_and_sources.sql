-- AI Work For Me — integrations, data sources, and RAG schema.
-- Run this against your Supabase project (SQL Editor, or `supabase db push`
-- if you've linked the CLI). Requires the pgvector extension, which Supabase
-- ships by default.

create extension if not exists vector;

-- Connected tools and model provider keys. `credentials` holds an
-- AES-256-GCM-encrypted JSON blob (see src/lib/crypto.ts) — never store
-- plaintext secrets here.
create table if not exists integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  credentials text not null,
  status text not null default 'connected',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider)
);

alter table integrations enable row level security;

create policy "Users manage their own integrations"
  on integrations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Things a user has pointed the RAG at: a GitHub repo, an uploaded file, or
-- a wiki/doc link. `storage_path` is set for uploaded files (bucket
-- `sources`); `source_url` is set for repos and links.
create table if not exists data_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('github_repo', 'pdf', 'png', 'wiki')),
  name text not null,
  source_url text,
  storage_path text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'ready', 'error')),
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table data_sources enable row level security;

create policy "Users manage their own data sources"
  on data_sources for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Chunked + embedded content for RAG retrieval. Populated by the ingestion
-- pipeline (not yet wired up) once a data source finishes processing.
-- Dimension 1536 matches OpenAI text-embedding-3-small; change it if you use
-- a different embedding model.
create table if not exists document_chunks (
  id uuid primary key default gen_random_uuid(),
  data_source_id uuid not null references data_sources(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  embedding vector(1536),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table document_chunks enable row level security;

create policy "Users manage their own document chunks"
  on document_chunks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists document_chunks_embedding_idx
  on document_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Private storage bucket for uploaded PDFs/images. Files are keyed as
-- `${user_id}/${filename}` so the RLS policy below can scope access.
insert into storage.buckets (id, name, public)
values ('sources', 'sources', false)
on conflict (id) do nothing;

create policy "Users manage their own source files"
  on storage.objects for all
  using (bucket_id = 'sources' and auth.uid()::text = (storage.foldername(name))[1])
  with check (bucket_id = 'sources' and auth.uid()::text = (storage.foldername(name))[1]);
