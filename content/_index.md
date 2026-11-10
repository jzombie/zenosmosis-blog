---
title: "About"
date: 2026-11-10T00:00:00Z
description: "Systems engineering, open-source infrastructure, and developer tooling by jzombie / zenOSmosis."
tags: []
---

I’m Jeremy ([jzombie](https://github.com/jzombie)), an independent systems engineer building infrastructure under the research studio [zenOSmosis](https://zenosmosis.com).

This blog intends to document some of the underlying primitives, architectural mechanics, and sub-systems that compose a larger infrastructure stack which I have been composing primarily using the [Rust programming language](https://rust-lang.org/).

Some of pieces that I have been building include:

- **Terminal Desktop Environments:** [`term-wm`](https://github.com/jzombie/term-wm) — A spatial tiling window manager and remote desktop designed to run entirely inside terminal emulators over low-bandwidth SSH links.
- **Process Orchestration & Build DSLs:** [`rust-oxdock`](https://github.com/jzombie/rust-oxdock) — A containerless automation engine and build DSL that isolates process execution, asset embedding, and synchronized dual-target documentation.
- **High-Performance Storage:** [`rust-simd-r-drive`](https://github.com/jzombie/rust-simd-r-drive) and [`rust-llkv`](https://github.com/jzombie/rust-llkv) — Zero-copy, append-only binary storage engines optimized for SIMD operations and columnar SQL queries over memory-mapped files.
- **Autonomous VM Provisioning:** [`windows-headless`](https://github.com/jzombie/windows-headless) — Fully unattended, single-command Windows 11 VM generation from stock ISOs with automated VirtIO injection.

### Discovery & Machine Context

This ecosystem is structured for both human engineers and autonomous agents:
- **For humans:** Technical postmortems, architecture breakdowns, and benchmarks live across the [posts](/posts/) archive.
- **For AI agents and IDE assistants:** Machine-readable routing maps and full context streams are published at [/llms.txt](/llms.txt) and [/llms-full.txt](/llms-full.txt).
