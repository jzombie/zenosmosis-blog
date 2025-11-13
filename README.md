# zenOSmosis blog

This repository contains a minimal Hugo blog and a Dockerfile that builds the site with Hugo and serves the generated static files with nginx.

## Features at a glance

- **Blog layout:** Hero header with CTA, recent posts grid, cards with tags, and a helpful sidebar so the homepage feels like a real publication.
- **Search overlay:** Click the search icon or press `/` to open it, then type text to filter against the Hugo-generated JSON index.
- **Per-post table of contents:** Every article automatically renders a TOC (built via Hugo’s `TableOfContents`) to jump between sections quickly.
- **Live-reload dev environment:** A Compose-powered `hugo server` watches the repo and refreshes the browser the moment content, layouts, or static assets change.
- **Activity feeds:** Hugo now emits RSS, Atom, and JSON Feed streams rooted at `/activity.*` so any reader can subscribe.

## Quick start (build + run)

```bash
# build the image
docker build -t zenosmosis-blog .

# run the container and map port 1313 locally to container port 80
docker run --rm -p 1313:80 zenosmosis-blog
```

Then open http://localhost:1313 in your browser.

## Generate static files only

When you just need fresh artifacts for GitHub Pages (without rebuilding the nginx image), run the official Hugo builder image against this repo:

```bash
docker run --rm -v "$PWD":/src klakegg/hugo:ext-alpine
```

That command mounts the repository at `/src` inside the container and executes `hugo`, which populates the `public/` directory with the full static site. Commit or deploy the contents of `public/` directly to your Pages branch.

## Activity feeds

Every build emits three matching streams of the latest posts (up to 20 entries) that you can wire into any RSS/Atom/JSON-feed reader:

- RSS 2.0 → `https://blog.zenosmosis.com/activity.xml`
- Atom 1.0 → `https://blog.zenosmosis.com/activity.atom`
- JSON Feed 1.1 → `https://blog.zenosmosis.com/activity.json`

When running locally, swap the origin for `http://localhost:1313`. Each file is generated during `hugo` builds, so deploying the `public/` directory automatically publishes the updated feeds.

## Using docker compose

```bash
# build the image and bake the latest Hugo content
docker compose build

# run nginx serving the generated site on http://localhost:1313
docker compose up -d
```

This flow mirrors production: the Dockerfile runs `hugo --minify` in a builder stage, copies the generated `public/` directory into an nginx image, and serves it on port 80 (mapped to 1313 locally).

## Live-reload development (hot reloading)

For faster iteration use the included `docker-compose.dev.yml`, which mounts the repo into a Hugo server container:

```bash
docker compose -f docker-compose.dev.yml up -d --remove-orphans
```

- `-d` keeps the server running in the background while you edit.
- `--remove-orphans` cleans up the production-style `web` service if you previously ran `docker compose up` so the two stacks don’t conflict on port 1313.

The dev service runs `hugo server -D --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313` inside the `klakegg/hugo:ext-alpine` image while mounting the current folder at `/src`. Any edits to content, layouts, or static assets trigger Hugo’s live-reload pipeline automatically; your browser refreshes as soon as files change.

Check logs at any time with:

```bash
docker compose -f docker-compose.dev.yml logs --tail=50 -f
```

Stop the dev container with `docker compose -f docker-compose.dev.yml down` when you’re done.

If you want a different theme or added content, edit the files in the repository and re-build the image with `docker build`.
