'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

async function requireUserId() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const userId = data?.claims?.sub as string | undefined
  if (!userId) throw new Error('Not authenticated')
  return { supabase, userId }
}

// Ingestion (chunking + embedding into document_chunks) isn't wired up yet —
// sources are created in 'pending' status and stay there until a follow-up
// processing pipeline picks them up.

export async function addRepoSource(formData: FormData) {
  const url = formData.get('source_url')
  if (typeof url !== 'string' || !url.trim()) throw new Error('Repo URL is required')

  const { supabase, userId } = await requireUserId()
  const name = url.trim().replace(/^https?:\/\/(www\.)?github\.com\//, '')

  const { error } = await supabase.from('data_sources').insert({
    user_id: userId,
    type: 'github_repo',
    name,
    source_url: url.trim(),
    status: 'pending',
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/sources')
}

export async function addWikiSource(formData: FormData) {
  const url = formData.get('source_url')
  if (typeof url !== 'string' || !url.trim()) throw new Error('Link is required')

  const { supabase, userId } = await requireUserId()

  const { error } = await supabase.from('data_sources').insert({
    user_id: userId,
    type: 'wiki',
    name: url.trim(),
    source_url: url.trim(),
    status: 'pending',
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/sources')
}

export async function addFileSource(formData: FormData) {
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) throw new Error('Choose a file to upload')

  const { supabase, userId } = await requireUserId()

  const type = file.type === 'application/pdf' ? 'pdf' : 'png'
  const path = `${userId}/${Date.now()}-${file.name}`

  const { error: uploadError } = await supabase.storage.from('sources').upload(path, file)
  if (uploadError) throw new Error(uploadError.message)

  const { error } = await supabase.from('data_sources').insert({
    user_id: userId,
    type,
    name: file.name,
    storage_path: path,
    status: 'pending',
  })
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/sources')
}

export async function deleteSource(formData: FormData) {
  const id = formData.get('id')
  if (typeof id !== 'string') throw new Error('Missing source id')

  const { supabase, userId } = await requireUserId()

  const { data: source } = await supabase
    .from('data_sources')
    .select('storage_path')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (source?.storage_path) {
    await supabase.storage.from('sources').remove([source.storage_path])
  }

  const { error } = await supabase.from('data_sources').delete().eq('id', id).eq('user_id', userId)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/sources')
}
