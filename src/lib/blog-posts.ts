export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  body: BlogBlock[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'build-a-private-rag-from-your-own-docs',
    title: 'How to Build a Private RAG From Your Own Docs',
    description:
      'A practical walkthrough of building a personal RAG knowledge base from your repos, PDFs, and wiki docs — what actually goes into it, and how to keep it private.',
    date: '2026-07-15',
    readingTime: '6 min read',
    body: [
      {
        type: 'p',
        text: "Most \"AI knowledge base\" products quietly mean the same thing: your documents get uploaded to someone else's servers, chunked, embedded with someone else's model, and stored in someone else's database. That's fine for a lot of use cases. It's not fine when the documents are your company's Jira boards, internal wikis, or a codebase under an NDA. A personal RAG knowledge base flips that — the pipeline runs against your accounts, with your keys, and the index belongs to you.",
      },
      {
        type: 'h2',
        text: 'What Actually Goes Into a Personal RAG',
      },
      {
        type: 'p',
        text: 'RAG (retrieval-augmented generation) is a two-step trick: retrieve the most relevant chunks of your own content for a given question, then hand those chunks to a language model as context so it answers from your material instead of guessing from its training data. The "personal" or "private" part isn\'t a different algorithm — it\'s a different trust boundary. The retrieval index, the embeddings, and the raw source files all stay scoped to your account instead of being pooled with everyone else\'s.',
      },
      {
        type: 'h2',
        text: 'Choosing What to Feed It',
      },
      {
        type: 'p',
        text: 'The useful starting set is usually smaller than people expect. Three sources cover most real questions:',
      },
      {
        type: 'ul',
        items: [
          'A GitHub repo — so questions about "how does X work" can be answered from the actual implementation, not a stale README.',
          'PDFs and screenshots — specs, design docs, architecture diagrams, anything that only exists as a file, not a webpage.',
          'Wiki or doc links — the living documentation your team already maintains, instead of duplicating it somewhere else.',
        ],
      },
      {
        type: 'p',
        text: "Resist the urge to dump everything in at once. A RAG index answers better when it's scoped tightly to what you'll actually ask about — a repo plus its related specs beats a repo plus five years of unrelated meeting notes.",
      },
      {
        type: 'h2',
        text: 'Chunking and Embeddings, Briefly',
      },
      {
        type: 'p',
        text: "Under the hood, each source gets split into chunks — small enough that a handful of them fit in a model's context window, large enough that each chunk still makes sense on its own. Every chunk is converted into an embedding, a vector that captures its meaning, and stored in a vector database. When you ask a question, your question is embedded too, and the system finds the stored chunks whose vectors are closest to it — that's the \"retrieval\" in retrieval-augmented generation. None of this requires exotic infrastructure; a Postgres database with the pgvector extension handles it comfortably for a personal-scale knowledge base.",
      },
      {
        type: 'h2',
        text: 'Keeping It Actually Private',
      },
      {
        type: 'p',
        text: "Privacy here comes down to three concrete things, not a marketing claim: row-level security so your data is unreadable by other accounts even in a shared database, encryption for any credentials used to pull from your connected tools, and — critically — using your own model API keys rather than a shared pooled key, so your content is never mixed into someone else's request logs or used to improve a model you don't control.",
      },
      {
        type: 'h2',
        text: 'Getting Started',
      },
      {
        type: 'p',
        text: 'You don\'t need a data pipeline team to try this. Connect a repo, drop in a couple of PDFs, add a wiki link — that\'s enough to see whether grounded answers actually save you time before you invest in anything bigger. That\'s the whole premise behind AI Work For Me\'s Data Sources: connect what you have, bring the model keys you already pay for, and the index is yours from the first file.',
      },
    ],
  },
  {
    slug: 'bring-your-own-api-key-why-it-matters',
    title: 'Bring Your Own API Key: Why BYOK Matters for AI Assistants',
    description:
      'Why routing an AI assistant through your own OpenAI or Anthropic API key — instead of a shared, marked-up key — changes the cost, privacy, and control equation.',
    date: '2026-07-15',
    readingTime: '5 min read',
    body: [
      {
        type: 'p',
        text: 'Almost every AI product you sign up for makes the same infrastructure decision for you: it holds one pooled API key, routes every customer\'s requests through it, and charges you a markup — usually 2-5x the underlying model cost — for the privilege. Bring-your-own-key (BYOK) tools skip that layer entirely. You connect the API key you already pay OpenAI, Anthropic, or another provider for, and the product becomes a thin, transparent layer on top of it.',
      },
      {
        type: 'h2',
        text: 'What BYOK Actually Means',
      },
      {
        type: 'p',
        text: "Concretely: instead of a product's server holding a shared key and billing you a subscription that bakes in model costs plus margin, you paste your own key into the product's settings. Every request your account makes is billed directly to your provider account, at the provider's own rates, in your own usage dashboard. The product itself charges for the software, not for the tokens.",
      },
      {
        type: 'h2',
        text: 'Why It\'s Better for Cost',
      },
      {
        type: 'p',
        text: 'A pooled-key SaaS product has to price in headroom — for its heaviest users, for margin, for the risk of one customer\'s usage spiking. That headroom shows up in your subscription price whether you use it or not. With BYOK, you pay the provider\'s list price, see exactly which requests cost what in your own billing dashboard, and can switch models — a cheaper one for routine tasks, a stronger one for hard questions — without renegotiating a plan.',
      },
      {
        type: 'h2',
        text: 'Why It\'s Better for Data Control',
      },
      {
        type: 'p',
        text: "This is the less obvious win. When requests run through a shared, pooled key, your prompts and documents flow through that vendor's infrastructure and are subject to whatever retention and training policy the vendor negotiated on your behalf — often opaque, sometimes negotiable only on enterprise plans. Routing through your own key means your usage is governed by the data processing agreement you already have (or can set) directly with OpenAI or Anthropic — the same terms that apply to any other app you've connected that key to.",
      },
      {
        type: 'h2',
        text: 'The Tradeoffs',
      },
      {
        type: 'p',
        text: "BYOK isn't free of friction. You have to actually go create an API key, and you're responsible for keeping it funded and rotating it if it leaks. For a team that wants a single predictable invoice and zero setup, a pooled-key subscription is genuinely simpler. BYOK is the right trade when you already pay for model access, care about seeing real usage costs, or need firmer control over where your data goes — not automatically for every use case.",
      },
      {
        type: 'h2',
        text: 'How It Works in Practice',
      },
      {
        type: 'p',
        text: 'In AI Work For Me, this is the default rather than an enterprise upgrade: you add your OpenAI or Anthropic key once in Integrations, it\'s encrypted at rest, and every model call your account makes runs on it directly — no shared pool, no markup on tokens, and usage you can audit in your own provider dashboard at any time.',
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
