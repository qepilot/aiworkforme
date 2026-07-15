'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { decrypt } from '@/lib/crypto'
import { getChatCompletion, type ChatTurn } from '@/lib/chat'
import { getEmbeddings } from '@/lib/embeddings'

async function requireUserId() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub as string | undefined
  if (!userId) throw new Error('Not authenticated')
  return { supabase, userId }
}

export async function sendChatMessage(formData: FormData) {
  const content = formData.get('content')
  if (typeof content !== 'string' || !content.trim()) throw new Error('Message is required')

  const { supabase, userId } = await requireUserId()

  const { data: modelIntegration } = await supabase
    .from('integrations')
    .select('provider, credentials')
    .eq('user_id', userId)
    .in('provider', ['anthropic', 'openai'])
    .order('provider', { ascending: false }) // 'openai' < 'anthropic' alphabetically reversed puts anthropic first
    .limit(1)
    .maybeSingle()

  if (!modelIntegration) {
    throw new Error('Connect an OpenAI or Anthropic key in Integrations before chatting.')
  }

  const { error: insertUserError } = await supabase
    .from('chat_messages')
    .insert({ user_id: userId, role: 'user', content: content.trim() })
  if (insertUserError) throw new Error(insertUserError.message)

  const { data: priorMessages } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  const history: ChatTurn[] = (priorMessages ?? []).map((m) => ({
    role: m.role as ChatTurn['role'],
    content: m.content as string,
  }))

  const provider = modelIntegration.provider as 'openai' | 'anthropic'
  const apiKey = JSON.parse(decrypt(modelIntegration.credentials as string)).api_key as string

  // Retrieval needs an OpenAI key specifically, for embeddings — independent
  // of which provider is used for the chat completion above.
  let context: string | undefined
  const { data: openaiIntegration } = await supabase
    .from('integrations')
    .select('credentials')
    .eq('user_id', userId)
    .eq('provider', 'openai')
    .maybeSingle()
  if (openaiIntegration) {
    try {
      const embeddingApiKey = JSON.parse(decrypt(openaiIntegration.credentials as string)).api_key as string
      const [queryEmbedding] = await getEmbeddings(embeddingApiKey, [content.trim()])
      const { data: matches } = await supabase.rpc('match_document_chunks', {
        query_embedding: queryEmbedding,
        match_user_id: userId,
        match_count: 5,
      })
      if (matches?.length) {
        context = matches.map((m: { content: string }) => m.content).join('\n\n---\n\n')
      }
    } catch {
      // Retrieval is best-effort — fall back to an ungrounded reply rather
      // than failing the whole chat turn.
    }
  }

  let reply: string
  try {
    reply = await getChatCompletion(provider, apiKey, history, context)
  } catch (e) {
    reply = `Sorry, the request to ${provider} failed: ${e instanceof Error ? e.message : 'unknown error'}`
  }

  const { error: insertAssistantError } = await supabase
    .from('chat_messages')
    .insert({ user_id: userId, role: 'assistant', content: reply })
  if (insertAssistantError) throw new Error(insertAssistantError.message)

  revalidatePath('/dashboard/chat')
}

export async function clearChatHistory() {
  const { supabase, userId } = await requireUserId()
  const { error } = await supabase.from('chat_messages').delete().eq('user_id', userId)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/chat')
}
