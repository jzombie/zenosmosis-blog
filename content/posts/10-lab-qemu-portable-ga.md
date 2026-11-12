---
title: "Portable QEMU Builds: lab-qemu-portable Is Generally Available"
date: 2026-11-12T00:00:00Z
description: "Portable QEMU and wimlib builds for Linux (x64/ARM), macOS (Apple Silicon), and Windows (x64/ARM), plus a virtio-win driver mirror, published with stable tags, checksums, and build provenance for bundling into your own tools."
tags: ["qemu", "virtualization", "wimlib", "virtio", "windows", "macos", "linux", "ci-cd"]
draft: false
---

> [lab-qemu-portable](https://github.com/jzombie/lab-qemu-portable) is generally available: portable builds of **QEMU**, **wimlib**, and a verified **virtio-win** driver mirror, published for Linux, macOS, and Windows as plain archives you can download, verify, and bundle. If you're building a tool that needs a hypervisor on the user's machine, this is the dependency layer. Source: [jzombie/lab-qemu-portable](https://github.com/jzombie/lab-qemu-portable).

[lab-qemu-portable](https://github.com/jzombie/lab-qemu-portable) publishes ready-made archives of [QEMU](https://www.qemu.org), [wimlib](https://wimlib.net), and the [virtio-win](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/) driver ISO: extract-and-run, no installer, no admin rights, no package manager. QEMU builds publish for Linux (x64 and ARM), macOS (Apple Silicon), and Windows (x64 and ARM); wimlib covers the same platforms except Windows ARM64 today. Stable release tags and checksums on every artifact.

That makes them a drop-in dependency for software that needs a hypervisor on the end user's machine. [windows-headless](https://github.com/jzombie/windows-headless) ([crates.io](https://crates.io/crates/windows-headless)) uses these builds directly: on first run it downloads the archives, verifies them against SHA-256, and caches them.

## What ships

Three release streams, one repo, independent workflows and tag namespaces:

| Stream | Tags | Contents |
|---|---|---|
| QEMU | `qemu-vX.Y.Z` | System emulator for the host arch + `qemu-img` + firmware (SeaBIOS, EDK2, vgabios) |
| wimlib | `wimlib-vX.Y.Z` | `wimlib-imagex` + libs, overlaid onto a QEMU tree |
| virtio-win | `drivers-YYYYMMDD` | Verified mirror of `virtio-win.iso` (rsynced from Fedora `stable-virtio`, SHA256-checked) |

Current builds track the latest stable upstream releases; the exact versions are on the [releases page](https://github.com/jzombie/lab-qemu-portable/releases).

QEMU builds on five platform legs: Windows x64 (UCRT64), Windows ARM64 (CLANGARM64), Linux x86_64, Linux aarch64, macOS Apple Silicon. wimlib has four: the same list minus Windows ARM64. Archives are `qemu-portable-<os>-<arch>[-<env>]-<ver>.{zip,tar.xz,tar.gz}` (the `-<env>` segment applies to Windows zips) with wimlib following the same pattern; the full filename table is in the [README](https://github.com/jzombie/lab-qemu-portable#downloads).

Acceleration is per-OS native (KVM, HVF, WHPX) with TCG as the universal fallback, so the same artifact works on hosts without a hypervisor.

## Why it's consumable

- **Portable means folders, not single-file exes.** Firmware must sit next to the binary and the accel backends are dynamically linked; upstream doesn't support static single-file for these paths. You get a self-contained tree: binaries, libs (`bin/` + `lib/` + `share/` on Unix; exes and DLLs at the archive root on Windows, matching upstream's portable layout).
- **No host requirements beyond glibc.** Linux builds target a conservative glibc floor (exact baseline in the [README](https://github.com/jzombie/lab-qemu-portable#downloads)) with bundled `.so` files resolved via `$ORIGIN` RPATH. No `apt`, no distro package splitting to guess at.
- **Checksums and provenance on every release.** Each QEMU and wimlib release carries `SHA256SUMS.txt` plus per-platform `BUILD-INFO-*.txt` (commit, runner image, compiler, container digest) for reproducibility audits. Driver-pack releases ship `virtio-win.iso.sha256` and a `SOURCES.txt` recording the upstream source.
- **Tags never move.** New upstream versions publish as `qemu-vX.Y.Z`; rebuilds of the same version get `qemu-vX.Y.Z-<run_number>` with the squash-merged commit message as notes. Pin a tag and it means one thing forever.
- **Smoke-tested before publishing.** `smoke-qemu.sh` verifies version, accel backends, `qemu-img`, firmware presence, a headless TCG boot probe, and a real VNC/RFB handshake. None of it needs KVM, HVF, or WHPX on the runner.

## Fitting it into your tool

The pattern windows-headless uses:

1. Pick a release tag (or track the latest with the GitHub releases API).
2. Download the archive for the user's OS/arch.
3. Verify against `SHA256SUMS.txt`, extract into your cache.
4. Point your invocations at `bin/qemu-system-<arch>` (Unix) or `qemu-system-<arch>.exe` (Windows).

wimlib overlays rather than standing alone: copy `bin/wimlib-imagex` (or `wimlib-imagex.exe` on Windows) next to the QEMU binaries. The virtio-win ISO attaches as a second cdrom alongside the installer ISO and your `Autounattend.xml` drive, which is what gives a headless Windows install its storage and network drivers.

Releases are also buildable on demand: the `build-qemu-portable` / `build-wimlib-portable` workflows take a pinned version, a `native`/`both`/`all` target mode, a platform subset for fast iteration, and a `force` flag to republish. A weekly cron watches upstream for new versions.

## Caveats

- The **Windows zip is CI smoke-tested** but hasn't been run manually on physical Windows. The validated path today is headless Windows guests driven from macOS/Linux over SSH. Native Windows run reports welcome.
- **Windows ARM64 WHPX** needs Windows 11 24H2 + the April/May 2025 updates; older builds should drop `-accel whpx` and take TCG.
- **macOS is adhoc-signed.** Quarantine only applies to browser downloads; if you fetched the archive programmatically (as a tool install would), no action is needed. After a browser download, run `xattr -cr qemu-portable` to clear it.

----

*Artifact table, quick starts, and workflow reference: [lab-qemu-portable README](https://github.com/jzombie/lab-qemu-portable). Issues and run reports: [github.com/jzombie/lab-qemu-portable/issues](https://github.com/jzombie/lab-qemu-portable/issues).*
