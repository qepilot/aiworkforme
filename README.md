# AI Work For Me

aiworkforme.com — connect Jira, Notion, Slack, WhatsApp, and GitHub, bring your own model keys, and build a private RAG from your own docs, repos, and boards.

This is a [Next.js](https://nextjs.org) project using Supabase for auth/DB and pgvector for the RAG index.

## Getting Started

1. Create a Supabase project, copy the URL and anon key into `.env.local` (see `.env.local.example`).
2. Run the SQL in `supabase/migrations/0001_integrations_and_sources.sql` against your project (SQL Editor or `supabase db push`).
3. Generate an encryption key for stored integration credentials: `openssl rand -base64 32`, and set it as `ENCRYPTION_KEY` in `.env.local`.
4. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Structure

- `/dashboard` — account overview
- `/dashboard/integrations` — connect Jira, Notion, Slack, WhatsApp, GitHub, and model provider keys
- `/dashboard/sources` — build your RAG: connect a GitHub repo, upload PDFs/images, or add wiki/doc links

Integration credentials are encrypted (AES-256-GCM) before being stored, and Supabase Row Level Security scopes every table and storage object to the owning user.
