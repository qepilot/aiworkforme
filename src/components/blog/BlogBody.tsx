import type { BlogBlock } from '@/lib/blog-posts'

export default function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="font-display pt-4 text-xl font-semibold tracking-tight text-ink">
              {block.text}
            </h2>
          )
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-text">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-[15px] leading-relaxed text-text">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}
