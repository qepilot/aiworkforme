import { PDFParse } from 'pdf-parse'
import type { createClient } from '@/lib/supabase/server'
import { decrypt } from '@/lib/crypto'
import { getEmbeddings } from '@/lib/embeddings'

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

const CHUNK_SIZE = 1000
const CHUNK_OVERLAP = 100
const EMBEDDING_BATCH_SIZE = 50

function chunkText(text: string): string[] {
  const chunks: string[] = []
  let start = 0
  while (start < text.length) {
    const end = Math.min(start + CHUNK_SIZE, text.length)
    const chunk = text.slice(start, end).trim()
    if (chunk) chunks.push(chunk)
    start += CHUNK_SIZE - CHUNK_OVERLAP
  }
  return chunks
}

async function markError(supabase: SupabaseServerClient, dataSourceId: string, message: string) {
  await supabase.from('data_sources').update({ status: 'error', error_message: message }).eq('id', dataSourceId)
}

// Parses a PDF already uploaded to the `sources` storage bucket, chunks its
// text, embeds each chunk, and stores the result in `document_chunks` for
// retrieval in Chat. Runs synchronously within the upload request — no
// background worker exists yet, so this is what "processing" means today.
export async function ingestPdfSource(
  supabase: SupabaseServerClient,
  userId: string,
  dataSourceId: string,
  storagePath: string,
) {
  const { data: openaiIntegration } = await supabase
    .from('integrations')
    .select('credentials')
    .eq('user_id', userId)
    .eq('provider', 'openai')
    .maybeSingle()

  if (!openaiIntegration) {
    await markError(supabase, dataSourceId, 'Connect an OpenAI key in Integrations to enable PDF ingestion.')
    return
  }
  const apiKey = JSON.parse(decrypt(openaiIntegration.credentials as string)).api_key as string

  const { data: file, error: downloadError } = await supabase.storage.from('sources').download(storagePath)
  if (downloadError || !file) {
    await markError(supabase, dataSourceId, downloadError?.message ?? 'Could not download the uploaded file.')
    return
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const parser = new PDFParse({ data: buffer })
    const { pages } = await parser.getText()
    await parser.destroy()

    const chunks = chunkText(pages.map((p) => p.text).join('\n\n'))
    if (chunks.length === 0) throw new Error('No extractable text found in this PDF.')

    for (let i = 0; i < chunks.length; i += EMBEDDING_BATCH_SIZE) {
      const batch = chunks.slice(i, i + EMBEDDING_BATCH_SIZE)
      const embeddings = await getEmbeddings(apiKey, batch)
      const rows = batch.map((content, j) => ({
        data_source_id: dataSourceId,
        user_id: userId,
        content,
        embedding: embeddings[j],
        metadata: { chunk_index: i + j },
      }))
      const { error: insertError } = await supabase.from('document_chunks').insert(rows)
      if (insertError) throw new Error(insertError.message)
    }

    await supabase.from('data_sources').update({ status: 'ready' }).eq('id', dataSourceId)
  } catch (e) {
    await markError(supabase, dataSourceId, e instanceof Error ? e.message : 'PDF ingestion failed.')
  }
}
