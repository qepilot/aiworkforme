import { INTEGRATION_PROVIDERS } from '@/lib/integrations'
import { PREVIEW_CONNECTED_PROVIDERS } from '@/lib/preview-data'
import IntegrationCard from '@/components/dashboard/IntegrationCard'

export default function IntegrationsPreviewPage() {
  const connectedProviders = new Set(PREVIEW_CONNECTED_PROVIDERS)
  const apps = INTEGRATION_PROVIDERS.filter((p) => p.category === 'app')
  const models = INTEGRATION_PROVIDERS.filter((p) => p.category === 'model')

  return (
    <div>
      <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
        Integrations
      </span>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        Connect your tools and models.
      </h1>
      <p className="mt-3 text-muted">
        Credentials are encrypted at rest and scoped to your account only. Nothing is shared or proxied.
      </p>

      <h2 className="font-display mt-10 text-lg font-medium text-ink">Apps</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {apps.map((provider) => (
          <IntegrationCard
            key={provider.id}
            provider={provider}
            connected={connectedProviders.has(provider.id)}
            preview
          />
        ))}
      </div>

      <h2 className="font-display mt-10 text-lg font-medium text-ink">Model providers</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {models.map((provider) => (
          <IntegrationCard
            key={provider.id}
            provider={provider}
            connected={connectedProviders.has(provider.id)}
            preview
          />
        ))}
      </div>
    </div>
  )
}
