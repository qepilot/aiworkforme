import ChatPanel from '@/components/dashboard/ChatPanel'
import { PREVIEW_MESSAGES } from '@/lib/preview-data'

export default function ChatPreviewPage() {
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
        <ChatPanel messages={[...PREVIEW_MESSAGES]} hasModelProvider preview />
      </div>
    </div>
  )
}
