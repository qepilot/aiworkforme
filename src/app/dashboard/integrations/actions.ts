'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { encrypt } from '@/lib/crypto'
import { getProvider } from '@/lib/integrations'

async function requireUserId() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub as string | undefined
  if (!userId) throw new Error('Not authenticated')
  return { supabase, userId }
}

export async function connectIntegration(formData: FormData) {
  const providerId = formData.get('provider')
  if (typeof providerId !== 'string') throw new Error('Missing provider')
  const provider = getProvider(providerId)
  if (!provider) throw new Error('Unknown provider')

  const { supabase, userId } = await requireUserId()

  const credentials: Record<string, string> = {}
  for (const field of provider.fields) {
    const value = formData.get(field.key)
    if (typeof value === 'string' && value.trim()) {
      credentials[field.key] = value.trim()
    }
  }
  if (Object.keys(credentials).length === 0) {
    throw new Error('At least one field is required to connect')
  }

  const { error } = await supabase.from('integrations').upsert(
    {
      user_id: userId,
      provider: providerId,
      credentials: encrypt(JSON.stringify(credentials)),
      status: 'connected',
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,provider' },
  )
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/integrations')
}

export async function disconnectIntegration(formData: FormData) {
  const providerId = formData.get('provider')
  if (typeof providerId !== 'string') throw new Error('Missing provider')

  const { supabase, userId } = await requireUserId()

  const { error } = await supabase
    .from('integrations')
    .delete()
    .eq('user_id', userId)
    .eq('provider', providerId)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/integrations')
}
