-- AI Work For Me — similarity search RPC for Chat retrieval.
-- supabase-js can't express a pgvector ORDER BY ... <=> ... through the
-- query builder, so this is called via supabase.rpc('match_document_chunks').

create or replace function match_document_chunks(
  query_embedding vector(1536),
  match_user_id uuid,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  similarity float
)
language sql stable
as $$
  select
    document_chunks.id,
    document_chunks.content,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where document_chunks.user_id = match_user_id
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
$$;
