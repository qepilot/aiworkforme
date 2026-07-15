import { createClient } from '@/lib/supabase/server'
import AddSourceForm from '@/components/dashboard/AddSourceForm'
import { deleteSource } from './actions'

const TYPE_LABELS: Record<string, string> = {
  github_repo: 'GitHub repo',
  pdf: 'PDF',
  png: 'Image',
  wiki: 'Wiki / doc link',
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'border-border text-muted',
  processing: 'border-accent/30 bg-accent/10 text-accent-2',
  ready: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  error: 'border-red-300 bg-red-50 text-red-600',
}

export default async function SourcesPage() {
  const supabase = await createClient()
  const { data: sources } = await supabase
    .from('data_sources')
    .select('id, type, name, status, error_message, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
        Data Sources
      </span>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        Build your own RAG.
      </h1>
      <p className="mt-3 text-muted">
        Connect a repo, upload files, or add a link. Everything here is indexed into a private knowledge base
        scoped to your account only.
      </p>

      <p className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        <strong>New:</strong> PDF uploads are now automatically parsed, chunked, and embedded — grounding your
        answers in Chat. GitHub repo, wiki link, and image ingestion are still on the way.
      </p>

      <div className="mt-8">
        <AddSourceForm />
      </div>

      <div className="mt-8 space-y-3">
        {!sources || sources.length === 0 ? (
          <p className="text-sm text-muted">No data sources yet — add one above.</p>
        ) : (
          sources.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-surface p-5 shadow-sm"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{source.name}</p>
                <p className="mt-0.5 text-xs text-muted">{TYPE_LABELS[source.type] ?? source.type}</p>
                {source.status === 'error' && source.error_message ? (
                  <p className="mt-1 text-xs text-red-600">{source.error_message}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[source.status] ?? STATUS_STYLES.pending}`}
                >
                  {source.status}
                </span>
                <form action={deleteSource}>
                  <input type="hidden" name="id" value={source.id} />
                  <button type="submit" className="text-xs font-medium text-muted transition-colors hover:text-ink">
                    Remove
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
