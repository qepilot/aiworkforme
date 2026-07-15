export type ChatRole = 'user' | 'assistant'
export type ChatTurn = { role: ChatRole; content: string }

function buildSystemPrompt(context?: string): string {
  const base =
    "You are the user's private AI assistant, grounded in the tools and documents they've connected. " +
    'Answer plainly and say when you are unsure rather than guessing.'
  if (!context) return base
  return `${base}\n\nRelevant context retrieved from the user's connected documents:\n${context}`
}

async function completeWithOpenAI(apiKey: string, history: ChatTurn[], context?: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: buildSystemPrompt(context) }, ...history],
    }),
  })
  if (!res.ok) throw new Error(`OpenAI request failed (${res.status})`)
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (typeof content !== 'string') throw new Error('OpenAI returned an empty response')
  return content
}

async function completeWithAnthropic(apiKey: string, history: ChatTurn[], context?: string): Promise<string> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: buildSystemPrompt(context),
      messages: history,
    }),
  })
  if (!res.ok) throw new Error(`Anthropic request failed (${res.status})`)
  const data = await res.json()
  const content = data.content?.[0]?.text
  if (typeof content !== 'string') throw new Error('Anthropic returned an empty response')
  return content
}

export async function getChatCompletion(
  provider: 'openai' | 'anthropic',
  apiKey: string,
  history: ChatTurn[],
  context?: string,
): Promise<string> {
  return provider === 'anthropic'
    ? completeWithAnthropic(apiKey, history, context)
    : completeWithOpenAI(apiKey, history, context)
}
