export type IntegrationField = {
  key: string
  label: string
  placeholder?: string
  secret?: boolean
}

export type IntegrationCategory = 'app' | 'model'

export type IntegrationProvider = {
  id: string
  label: string
  category: IntegrationCategory
  description: string
  fields: IntegrationField[]
}

export const INTEGRATION_PROVIDERS: IntegrationProvider[] = [
  {
    id: 'jira',
    label: 'Jira',
    category: 'app',
    description: 'Read boards, tickets, and linked docs for grounding and deep-read summaries.',
    fields: [
      { key: 'site_url', label: 'Site URL', placeholder: 'https://yourcompany.atlassian.net' },
      { key: 'email', label: 'Account email', placeholder: 'you@company.com' },
      { key: 'api_token', label: 'API token', secret: true },
    ],
  },
  {
    id: 'notion',
    label: 'Notion',
    category: 'app',
    description: 'Index your Notion workspace and pull board summaries on demand.',
    fields: [{ key: 'integration_token', label: 'Internal integration secret', secret: true }],
  },
  {
    id: 'slack',
    label: 'Slack',
    category: 'app',
    description: 'Read and post to channels your bot has been invited to.',
    fields: [{ key: 'bot_token', label: 'Bot User OAuth Token', placeholder: 'xoxb-...', secret: true }],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    category: 'app',
    description: 'Send and receive WhatsApp messages via the Meta Cloud API.',
    fields: [
      { key: 'phone_number_id', label: 'Phone number ID' },
      { key: 'access_token', label: 'Access token', secret: true },
    ],
  },
  {
    id: 'github',
    label: 'GitHub',
    category: 'app',
    description: 'Read repos you have access to, for RAG ingestion and code-aware answers.',
    fields: [{ key: 'personal_access_token', label: 'Personal access token', secret: true }],
  },
  {
    id: 'openai',
    label: 'OpenAI',
    category: 'model',
    description: 'Used for chat completions and/or embeddings — your key, your usage, your bill.',
    fields: [{ key: 'api_key', label: 'API key', secret: true }],
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    category: 'model',
    description: 'Used for chat completions — your key, your usage, your bill.',
    fields: [{ key: 'api_key', label: 'API key', secret: true }],
  },
]

export function getProvider(id: string): IntegrationProvider | undefined {
  return INTEGRATION_PROVIDERS.find((p) => p.id === id)
}

export const DATA_SOURCE_TYPES = [
  { id: 'github_repo', label: 'GitHub repo' },
  { id: 'pdf', label: 'PDF' },
  { id: 'png', label: 'Image (PNG)' },
  { id: 'wiki', label: 'Wiki / doc link' },
] as const

export type DataSourceType = (typeof DATA_SOURCE_TYPES)[number]['id']
