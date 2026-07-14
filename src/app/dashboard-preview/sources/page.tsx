import AddSourceForm from '@/components/dashboard/AddSourceForm'
import { PREVIEW_SOURCES } from '@/lib/preview-data'

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

export default function SourcesPreviewPage() {
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

      <div className="mt-8">
        <AddSourceForm preview />
      </div>

      <div className="mt-8 space-y-3">
        {PREVIEW_SOURCES.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-surface p-5 shadow-sm"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{source.name}</p>
              <p className="mt-0.5 text-xs text-muted">{TYPE_LABELS[source.type] ?? source.type}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[source.status] ?? STATUS_STYLES.pending}`}
              >
                {source.status}
              </span>
              <span className="text-xs font-medium text-muted/60">Remove</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
