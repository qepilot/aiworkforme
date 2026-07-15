// OpenAI embeddings — used for both PDF ingestion (src/lib/ingest.ts) and
// chat retrieval (src/app/dashboard/chat/actions.ts). Dimension (1536) must
// match the `document_chunks.embedding` column in the Supabase schema.
export async function getEmbeddings(apiKey: string, inputs: string[]): Promise<number[][]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: 'text-embedding-3-small', input: inputs }),
  })
  if (!res.ok) throw new Error(`OpenAI embeddings request failed (${res.status})`)
  const data = await res.json()
  return (data.data as Array<{ embedding: number[] }>).map((d) => d.embedding)
}
