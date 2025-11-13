# Multi-stage build: use an official Hugo image to build the static site, then serve with nginx
FROM klakegg/hugo:ext-alpine AS builder

WORKDIR /src
# copy the whole repository (site sources)
COPY . /src

# Build the site (produces /src/public)
RUN hugo --minify

# ---------- Serve with nginx ----------
FROM nginx:alpine

# Remove default nginx content and copy generated static site
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /src/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
