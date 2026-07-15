import { createClient } from '@/lib/supabase/server'
import ChatPanel from '@/components/dashboard/ChatPanel'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub as string | undefined

  const { data: modelRows } = await supabase
    .from('integrations')
    .select('provider')
    .in('provider', ['anthropic', 'openai'])
  const hasModelProvider = (modelRows?.length ?? 0) > 0

  const { data: messageRows } = await supabase
    .from('chat_messages')
    .select('id, role, content')
    .eq('user_id', userId ?? '')
    .order('created_at', { ascending: true })

  return (
    <div>
      <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
        Chat
      </span>
      <h1 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        Ask your private AI.
      </h1>
      <p className="mt-3 text-muted">
        Grounded in the tools and documents you&apos;ve connected, using the model key you provided.
      </p>

      <div className="mt-8">
        <ChatPanel messages={messageRows ?? []} hasModelProvider={hasModelProvider} />
      </div>
    </div>
  )
}
