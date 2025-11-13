# Hugo blog (Dockerized)

This repository contains a minimal Hugo blog and a Dockerfile that builds the site with Hugo and serves the generated static files with nginx.

Quick start (build + run):

```bash
# build the image
docker build -t zenosmosis-blog .

# run the container and map port 1313 locally to container port 80
docker run --rm -p 1313:80 zenosmosis-blog
```

Then open http://localhost:1313 in your browser.

Development notes:
- The Dockerfile performs a full static build with Hugo (useful for production). For live development, you may prefer running the Hugo server locally (requires Hugo installed) or mount the site into a development container.
- There's a `docker-compose.yml` included for convenience.

If you want a different theme or added content, edit the files in the repository and re-build the image with `docker build`.
