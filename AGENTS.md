# AGENTS.md — zenosmosis-blog

Hugo blog (`config.toml`, `content/`, `layouts/`, `assets/css/styles.css`). No external theme.

## Build / dev

- Production build: `docker build -t zenosmosis-blog .` then `docker run --rm -p 1313:80 zenosmosis-blog`
- Static files only: `docker run --rm -v "$PWD":/src klakegg/hugo:ext-alpine`
- Live reload: `docker compose -f docker-compose.dev.yml up --remove-orphans`

## Blog post style guide

### Frontmatter (`content/posts/*.md`)

Required: `title`, `date` (ISO-8601 UTC), `description` (used as `.post__dek`), `tags` (lowercase, hyphenated).

### Em-dashes: never (`—`, `--`, `&mdash;`)

Do not use em-dashes anywhere in a post (body, headings, frontmatter). They read as machine-generated and are banned in published prose.

- Replace with a colon, comma, semicolon, parentheses, or a plain sentence break, whichever fits the sentence.
- En-dashes (`–`) in ranges (`10–20`) are fine. Hyphens in compounds and tags are fine.
- Applies to quotes/blockquotes too.

### Heading hierarchy (enforced)

Root cause of past inconsistency (e.g. `8-magnet-vector.md` used `###` for top-level sections while `7-rust-other-book.md` used `##`): the two levels render completely differently.

- `#` (H1): **never use in post body.** H1 is reserved for the post `title` rendered by `layouts/_default/single.html`.
- `##` (H2): **top-level body sections.** Always start here. Renders large with an accent bar (`assets/css/styles.css:508-524`).
- `###` (H3): **subsections only, nested under a `##`.** Renders small, uppercase, muted (`styles.css:543-550`). Never use as a top-level section.
- `####` (H4): sparingly, only nested under a `###` (see `4-what-does-fastest-db-mean.md` for the canonical `##` → `###` → `####` example).
- Never skip levels (`##` → `####` with no intervening `###`).
- Numbered sections (`## 1. ...`, `## 2. ...`) are allowed; match the level rule regardless of numbering.

Good (`7-rust-other-book.md`, `6-nato-alphabet-words.md`):

```md
## 1. The Rust Book (The Tutorial)
## 2. The Rust Reference (The Specification)
```

```md
## How to actually remember this
### 1. The "Chunking" Method
### 2. The License Plate Game
```

Bad (old `8-magnet-vector.md` — fixed):

```md
### 1. The Physics of Semantic Gravity   <!-- renders as small uppercase H3 -->
```

### Why it matters

- `config.toml` sets TOC to `startLevel = 2, endLevel = 4`. H2s anchor the TOC; orphan H3s flatten hierarchy and break "On this page" nesting.
- `layouts/_default/_markup/render-heading.html` wraps every heading in an anchor link, so heading text must be link-safe plain prose (no block HTML).
- Use `---` / `----` (renders as `hr` with accent bar, `styles.css`) only as a one-off separator before a byline/aside (see `7-rust-other-book.md:28`), not as a substitute for section headings.
