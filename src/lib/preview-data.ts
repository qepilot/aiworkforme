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

export const PREVIEW_MESSAGES = [
  { id: '1', role: 'user', content: 'What changed in the last sprint according to Jira?' },
  {
    id: '2',
    role: 'assistant',
    content:
      "Based on the connected Jira board, the last sprint closed 12 tickets, mostly around the onboarding flow. Two tickets (ONB-142, ONB-145) rolled over to this sprint — both are waiting on design review.",
  },
] as const
