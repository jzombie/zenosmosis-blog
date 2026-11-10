---
title: "Zero-Trust IoT Messaging: Dockerized Mosquitto and Cloudflare Tunnels"
date: 2026-11-10T00:00:00Z
description: "Dockerized Eclipse Mosquitto MQTT broker with outbound-only Cloudflare Tunnel — no inbound ports, for secure IoT messaging."
tags: ["mqtt", "mosquitto", "cloudflare", "docker", "iot", "zero-trust"]
draft: false
---

> A Dockerized [Eclipse Mosquitto](https://mosquitto.org/) [MQTT](https://mqtt.org/) broker integrated with `cloudflared` to establish an outbound-only, Zero-Trust tunnel for IoT messaging. For edge deployments that cannot expose inbound ports. Source: [jzombie/docker-mqtt-mosquitto-cloudflare-tunnel](https://github.com/jzombie/docker-mqtt-mosquitto-cloudflare-tunnel).

Exposing port 1883 on a public server to run an MQTT broker is a liability. It invites automated scanners, demands constant firewall vigilance, and bets everything on the authentication layer holding.

The [`docker-mqtt-mosquitto-cloudflare-tunnel`](https://github.com/jzombie/docker-mqtt-mosquitto-cloudflare-tunnel) repository provides a structural fix: eliminate the inbound attack surface entirely.

### The Outbound-Only Architecture

The deployment runs two containers in one Docker network — `mosquitto` (`eclipse-mosquitto:latest`) and `cloudflared` (`cloudflare/cloudflared:latest`).

The defining feature of the [`docker-compose.yml`](https://github.com/jzombie/docker-mqtt-mosquitto-cloudflare-tunnel/blob/main/docker-compose.yml) is what is missing: no published inbound host ports.

Instead, the `cloudflared` container runs `tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL_TOKEN}` to establish a persistent outbound connection to the [Cloudflare](https://www.cloudflare.com/) edge via [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/). The origin stays closed and invisible to the public internet. Tunnels are included in the [Cloudflare Zero Trust free tier](https://www.cloudflare.com/plans/) ($0 for up to 50 users). Full setup, including Zero Trust dashboard steps and `.env` configuration, is in the repo [README](https://github.com/jzombie/docker-mqtt-mosquitto-cloudflare-tunnel) and [docs site](https://docs.docker-mqtt-mosquitto-cloudflare-tunnel.zenosmosis.com/). See also the official [Connect networks docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/).

### Edge TLS and Internal Resolution

Public routing and cryptography are offloaded to Cloudflare:

* **Edge TLS termination:** Clients — sensors, smart-home devices, dashboards — connect to `https://<subdomain>.<hostname>` on port 443. TLS terminates at Cloudflare's edge.
* **Internal Docker DNS:** Cloudflare forwards through the tunnel to the internal service `mosquitto:9001`. That hostname resolves via Docker DNS; it is not a public URL or public port.
* **Local WebSocket handshake:** [`mosquitto.conf`](https://github.com/jzombie/docker-mqtt-mosquitto-cloudflare-tunnel/blob/main/mosquitto.conf) listens on `1883` (native MQTT, container-internal only) and `9001` with `protocol websockets`. The tunnel targets the WebSocket listener.

Result: high-throughput MQTT-over-WebSockets without opening anything inbound.

> Note: the default `mosquitto.conf` on `main` uses `allow_anonymous true`. Treat it as a starting primitive, not a production policy. For hardening patterns — per-user ACLs and retained-message handling — see the [`protected-no-wildcard` branch](https://github.com/jzombie/docker-mqtt-mosquitto-cloudflare-tunnel/tree/protected-no-wildcard) and [compare view](https://github.com/jzombie/docker-mqtt-mosquitto-cloudflare-tunnel/compare/main...protected-no-wildcard).
