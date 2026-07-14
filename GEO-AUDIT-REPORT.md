# GEO Audit Report: AI Work For Me

**Audit Date:** 2026-07-14
**URL:** https://aiworkforme.com
**Business Type:** SaaS (freemium, bring-your-own-model-keys RAG tool)
**Pages Analyzed:** 4 (Home, Sign in, Sign up, Dashboard preview)

---

## Executive Summary

**Overall GEO Score: 23/100 (Critical)**

AI Work For Me is a newly-launched site with a technically solid foundation — server-side rendered, fast, mobile-friendly, and with genuinely well-written FAQ content — but it is essentially invisible to AI systems today. There is zero structured data (no schema.org markup anywhere, including on the FAQ section), no `sitemap.xml`, no `llms.txt`, no discoverable brand presence off-site, and no content beyond a single landing page. This is expected for a brand-new domain, but every category needs foundational work before AI systems have any basis to cite or recommend it.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 45/100 | 25% | 11.25 |
| Brand Authority | 5/100 | 20% | 1.00 |
| Content E-E-A-T | 15/100 | 20% | 3.00 |
| Technical GEO | 50/100 | 15% | 7.50 |
| Schema & Structured Data | 0/100 | 10% | 0.00 |
| Platform Optimization | 5/100 | 10% | 0.50 |
| **Overall GEO Score** | | | **23.25 ≈ 23/100** |

---

## Critical Issues (Fix Immediately)

1. **Zero schema.org markup anywhere on the site.** Not even basic `Organization` or `SoftwareApplication` schema on the homepage. AI systems have no structured signal for what this business is, who runs it, or what it does. (`/`)
2. **No `sitemap.xml`** — returns 404. There is no machine-readable index of the site's pages for any crawler, AI or otherwise.
3. **No `llms.txt`** — returns 404. No explicit guidance file telling AI crawlers what the site is, what pages matter, or how to cite it.
4. **No off-site brand presence detected** — no discoverable Wikipedia, Reddit, LinkedIn, or YouTube entity signal for "AI Work For Me." AI systems generally cannot recognize or recommend an entity they can't corroborate from a second source.

## High Priority Issues

1. **No `robots.txt` at all** (404) — while this doesn't block crawlers by default, it also means there's no explicit `Allow` for GPTBot, ClaudeBot, PerplexityBot, etc., and no sitemap pointer for them to follow.
2. **FAQ content has no `FAQPage` schema.** The homepage has a real, well-formed FAQ section (`#faq`) with question/answer pairs — this is exactly the content AI Overviews and answer engines prefer to lift directly, but without `FAQPage` markup it's much less likely to be extracted cleanly.
3. **No author attribution or "About" content anywhere.** There's no team page, no founder bio, no company background — nothing for AI systems to use to establish trust/expertise (E-E-A-T).
4. **No Open Graph or Twitter Card meta tags** on any page checked. This affects how the site is represented when shared/cited across platforms that render link previews (including some AI chat UIs).
5. **Only one substantive page exists.** The entire public site is a single landing page plus auth forms and a sample dashboard preview — there is no blog, documentation, or resource content for AI systems to draw on beyond the homepage copy.

## Medium Priority Issues

1. **No canonical link tag** on the homepage or sub-pages — minor, but worth adding once more pages/content exist to avoid duplicate-URL ambiguity.
2. **Missing baseline security headers** (`Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` all absent; only a minimal `Content-Security-Policy: upgrade-insecure-requests` is set). Not a direct GEO ranking factor, but AI-crawler trust heuristics and general site-quality signals can be affected by weak security posture.
3. **`x-powered-by: Next.js` header exposed** — minor information disclosure, no GEO impact, easy fix (`poweredByHeader: false` in `next.config.ts`).
4. **Dashboard preview page (`/dashboard-preview`) has no distinguishing meta description** — it reuses the homepage title/description verbatim, so it can't be individually cited or indexed as distinct content.

## Low Priority Issues

1. Meta description is good on the homepage but is Next.js's only per-page description — sign-in/sign-up pages don't have their own descriptions at all.
2. No visible "last updated" or freshness signal anywhere (expected for a landing page, but worth adding once a blog/changelog exists).
3. Favicon present but no broader icon set (apple-touch-icon, manifest) — not a GEO factor, but affects how the brand renders across surfaces.

---

## Category Deep Dives

### AI Citability (45/100)

The actual prose is a real strength: short, declarative sentences, a clean 4-step "How it works" section, and four distinct FAQ answers that are already close to ideal citation length (1–2 sentences, direct, no fluff). Example — this FAQ answer is genuinely well-formed for extraction:

> "Yes — signing up is free. You bring your own model API keys, so you only ever pay your model provider directly for what you use."

That's exactly the kind of self-contained, quotable block AI Overviews/Perplexity favor. The problem is volume and structure, not quality: there's only one page of content, no dedicated FAQ/help page, no comparison or "how is this different from X" content, and none of it is marked up as `FAQPage`/`Article` so it's harder for automated extraction to isolate cleanly from the surrounding marketing copy.

### Brand Authority (5/100)

No evidence of the brand existing anywhere except its own domain. For a domain this new, that's expected, but it means AI systems currently have zero corroborating signal that "AI Work For Me" is a real, established entity — which directly suppresses citation likelihood regardless of on-page quality.

### Content E-E-A-T (15/100)

No author, no team, no company "About" story, no case studies, no testimonials, no third-party validation of any kind. The copy is confident and clear ("Your keys, your usage, your bill — we never proxy or mark up model calls") but there's nothing establishing who is making these claims or why they should be trusted.

### Technical GEO (50/100)

The genuine bright spot: pages are fully server-side rendered (verified — full HTML content present with no JS-only shell), served over HTTP/2 with fast edge caching (Hostinger's `hcdn`), and responsive/mobile-friendly. What's missing is entirely about discovery infrastructure: no `sitemap.xml`, no `robots.txt`, no `llms.txt`. These are all inexpensive to add and would meaningfully improve the technical score on their own.

### Schema & Structured Data (0/100)

Confirmed zero `<script type="application/ld+json">` or microdata anywhere across the homepage, sign-in, sign-up, and dashboard preview pages. This is the single highest-leverage fix available — going from 0 to even basic `Organization` + `SoftwareApplication` + `FAQPage` schema would be a large relative jump in this category for a few hours of work.

### Platform Optimization (5/100)

Too new to have any indexed presence in Google, ChatGPT browsing, Perplexity, or Gemini. Nothing to optimize yet beyond making sure the on-site fundamentals (schema, sitemap, llms.txt) are in place before the domain gets its first real crawl/index pass.

---

## Quick Wins (Implement This Week)

1. **Add `Organization` + `SoftwareApplication` JSON-LD** to the homepage `<head>` — highest score impact per hour of work, since the schema category is currently at 0.
2. **Add `FAQPage` schema** wrapping the existing FAQ content on the homepage — the Q&A content already exists, this just needs to be marked up.
3. **Create `sitemap.xml`** listing `/`, `/sign-in`, `/sign-up` (Next.js supports this natively via `app/sitemap.ts`).
4. **Create `robots.txt`** with an explicit `Allow: /` and a `Sitemap:` pointer, and confirm GPTBot/ClaudeBot/PerplexityBot/Google-Extended aren't inadvertently blocked.
5. **Add a minimal `llms.txt`** at the root describing the product in 3-4 sentences and linking to the key pages — cheap to write, and one of the few explicit "please cite me" signals available today.

## 30-Day Action Plan

### Week 1: Structured Data & Crawlability
- [ ] Add Organization/SoftwareApplication/FAQPage JSON-LD to homepage
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Add `llms.txt`

### Week 2: Content Depth
- [ ] Add an "About" page with founder/company background (E-E-A-T)
- [ ] Add Open Graph + Twitter Card meta tags site-wide
- [ ] Give sign-in/sign-up pages their own meta descriptions

### Week 3: Brand Signals
- [ ] Create a LinkedIn company page
- [ ] Publish the product on relevant directories (Product Hunt, G2, etc.) to start building corroborating brand mentions
- [ ] Add at least one blog post or comparison page (e.g. "AI Work For Me vs. [alternative]") to broaden citable content

### Week 4: Technical Hardening & Re-check
- [ ] Add missing security headers (HSTS, X-Content-Type-Options, Referrer-Policy)
- [ ] Disable `x-powered-by` header
- [ ] Re-run this audit and compare score deltas

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---|
| `/` | AI Work For Me — Your tools, your data, your own RAG | No schema, no OG tags, FAQ unmarked |
| `/sign-in` | (reuses homepage title) | No unique meta description, no schema |
| `/sign-up` | (no explicit title found) | No unique meta description, no schema |
| `/dashboard-preview` | (reuses homepage title) | No unique meta description, no schema, public preview page not indicated to crawlers as distinct content |

**Fetch failures (all 404, noted as findings above, not crawl errors):** `/robots.txt`, `/sitemap.xml`, `/llms.txt`
