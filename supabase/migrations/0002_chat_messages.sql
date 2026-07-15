-- AI Work For Me — chat history for the /dashboard/chat "Ask" feature.

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

alter table chat_messages enable row level security;

create policy "Users manage their own chat messages"
  on chat_messages for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists chat_messages_user_created_idx
  on chat_messages (user_id, created_at);
