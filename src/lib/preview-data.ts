// Sample data for /dashboard-preview — lets the signed-in dashboard UI be
// reviewed without a real Supabase project configured. No network calls,
// no real auth. Not used by the real /dashboard routes.

export const PREVIEW_EMAIL = 'jamie@example.com'

export const PREVIEW_CONNECTED_PROVIDERS = ['github', 'openai', 'notion']

export const PREVIEW_SOURCES = [
  { id: '1', type: 'github_repo', name: 'you/your-repo', status: 'ready' },
  { id: '2', type: 'wiki', name: 'https://wiki.example.com/architecture', status: 'processing' },
  { id: '3', type: 'pdf', name: 'q3-product-spec.pdf', status: 'pending' },
  { id: '4', type: 'png', name: 'onboarding-flow.png', status: 'error' },
] as const
