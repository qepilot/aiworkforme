import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

// AES-256-GCM at rest for integration credentials. ENCRYPTION_KEY must be a
// base64-encoded 32-byte key (`openssl rand -base64 32`) and is server-only —
// never expose it via NEXT_PUBLIC_*.
function getKey() {
  const key = process.env.ENCRYPTION_KEY
  if (!key) throw new Error('ENCRYPTION_KEY is not set')
  const buf = Buffer.from(key, 'base64')
  if (buf.length !== 32) throw new Error('ENCRYPTION_KEY must decode to 32 bytes')
  return buf
}

// Output format: base64(iv).base64(authTag).base64(ciphertext)
export function encrypt(plaintext: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', getKey(), iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  const authTag = cipher.getAuthTag()
  return [iv, authTag, ciphertext].map((b) => b.toString('base64')).join('.')
}

export function decrypt(payload: string): string {
  const [ivB64, authTagB64, ciphertextB64] = payload.split('.')
  if (!ivB64 || !authTagB64 || !ciphertextB64) throw new Error('Malformed encrypted payload')
  const decipher = createDecipheriv('aes-256-gcm', getKey(), Buffer.from(ivB64, 'base64'))
  decipher.setAuthTag(Buffer.from(authTagB64, 'base64'))
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(ciphertextB64, 'base64')),
    decipher.final(),
  ])
  return plaintext.toString('utf8')
}
