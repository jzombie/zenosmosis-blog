# Plan: Underground Bot Route for Magnet Vector Alignment

## Goal
Define a single fetchable bot contract on the blog (`/agents/llms.txt`) that 20+ repos can point to via a tiny `AGENTS.md` stub. Solves: bots answering "are we in alignment?" leak Magnet Vector / statistical arbitrage / GEO into unrelated Rust work or unrelated posts.

Non-goal: editing the human article `content/posts/8-magnet-vector.md`. Human show vs. agent script stay separate.

## Context (read first)
- `content/posts/8-magnet-vector.md:53-63` — canonical "Are We in Alignment?" 5 questions.
- `content/posts/8-magnet-vector.md:69-73` — `llms.txt` = routing map, `llms-full.txt` = carrier.
- `config.toml:6-8,42-56` — root outputs `LLMS`/`LLMSFULL` via `layouts/index.llms.txt`, `layouts/index.llmsfull.txt`.
- `layouts/index.llms.txt` — auto-lists recent posts. Do NOT add underground route here.
- `Dockerfile:1-10` — `hugo --minify`, `static/` passes through to `public/` verbatim, served by nginx.
- Spec: llmstxt.org v2 — file at `/agents/llms.txt` covers only URLs under `/agents/`. One H1, then `>` summary, then H2 file-lists with `- [name](url): notes`.

## Route decision
- Source: `static/agents/llms.txt` (handwritten, no frontmatter, no Hugo templating — guarantees spec order).
- Served: `https://blog.zenosmosis.com/agents/llms.txt`
- Why `static/` not `content/`: avoids HTML list pages, RSS/JSON inclusion, TOC/nav, and template wrapping.
- Underground = unlinked: no nav link, no entry in root `/llms.txt`, no sitemap entry (static files aren't regular pages).

## Tasks
1. Create `static/agents/llms.txt`, strict router only (H1 + blockquote + H2 link lists, no standalone paragraphs):
   - H1: `# zenOSmosis Agent Contract` (only H1).
   - Blockquote: one-sentence summary for shared context.
   - `## Alignment` — list: `- [Alignment contract](https://blog.zenosmosis.com/agents/alignment.md): when Magnet Vector applies, 5 condensed alignment questions, scope guardrails.` + `- [Magnet Vector proposal](https://blog.zenosmosis.com/posts/8-magnet-vector/): human narrative, do not quote unprompted.`
   - `## Spec` — list: `- [llms.txt v2](https://llmstxt.org/): router format reference.`
   - Keep <30 lines. Note: v2 mock example explicitly allows an `Optional details go here` paragraph between blockquote and H2s, and documents `## Optional` by convention — both omitted here as a stylistic choice for minimal parser surface, not a compliance requirement.
2. Create `static/agents/alignment.md` (full payload, isolated guardrails):
   - One H1 + short summary, then: 5 alignment questions condensed from `8-magnet-vector.md:53-63`; scope: default to local repo, never inject Magnet Vector / GEO / algorithmic-statistical arbitrage into unrelated Rust features/refactors/bugfixes, no cross-post linking unless asked, offline = local-only.
2. Verify underground:
   - `grep -r "agents/llms" layouts/ content/ config.toml` returns only the new static file (no template refs).
   - Confirm `layouts/index.llms.txt` untouched (still only posts loop).
3. Build + serve check:
   - `docker build -t zenosmosis-blog .` then `docker run --rm -p 1313:80 zenosmosis-blog`, or `docker run --rm -v "$PWD":/src klakegg/hugo:ext-alpine -- hugo --minify` per `AGENTS.md`.
   - `curl -s http://localhost:1313/agents/llms.txt | head -20` shows H1 + blockquote + H2s; `curl -s http://localhost:1313/agents/alignment.md` shows payload.
   - `curl -s http://localhost:1313/llms.txt | grep -c agents` == 0.
4. Document stub for other repos (output in final summary, do NOT create here):
   ```md
   # AGENTS.md — <repo>
   > Local rules win. Shared contract on blog.
   1. Read local context first.
   2. If web access, fetch https://blog.zenosmosis.com/agents/alignment.md and obey it; discover via https://blog.zenosmosis.com/agents/llms.txt.
   3. Only answer "are we in alignment?" when asked.
   ```

## Acceptance
- [ ] `static/agents/llms.txt` exists, H1 + blockquote + H2 link lists only, links valid.
- [ ] `static/agents/alignment.md` exists with guardrails, linked from `llms.txt` via `- [Title](URL): Description`.
- [ ] Served verbatim at `/agents/llms.txt` after build.
- [ ] Not referenced from root `llms.txt`, RSS, nav, sitemap.
- [ ] Human post `8-magnet-vector.md` unmodified.
- [ ] Final message prints stub snippet for 20-repo reuse.

## Handoff
Paste this file to implementation agent. Two-file change expected: `static/agents/llms.txt` + `static/agents/alignment.md` only.
