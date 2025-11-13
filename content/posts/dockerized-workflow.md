---
title: "Shipping Blogs from a Dockerfile"
date: 2025-10-22T09:00:00Z
description: "A lightweight workflow for keeping Hugo builds repeatable and deployable."
tags: ["hugo", "docker", "devops"]
---

The easiest way to keep a static site honest is to build it the same way everywhere.

This post walks through the Dockerfile that powers zenOSmosis: multi-stage builds, cached Hugo downloads, and a tiny nginx image at the edge.

Along the way we look at local iteration tricks (`docker compose watch`) and how to plug the container into GitHub Actions for turnkey deploys.
