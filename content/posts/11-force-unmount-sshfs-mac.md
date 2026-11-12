---
title: "How to Force Unmount SSHFS on Mac (And Fix \"Device Busy\" Frozen Terminals)"
date: 2026-11-12T12:00:00Z
description: "Three escalating commands to unmount a frozen SSHFS mount on macOS: umount, diskutil unmount force, and killing the stuck sshfs process."
tags: ["sshfs", "macos", "terminal", "sysadmin", "docker"]
draft: false
---

> **Quick Answer:** To unmount an SSHFS drive on macOS, open your terminal and run:
> `umount /path/to/mountpoint`
> If the drive is stuck, frozen, or throwing a "Resource busy" error, force unmount it using macOS's built-in disk utility:
> `diskutil unmount force /path/to/mountpoint`

## The Zombie Mount Problem

A few years ago, I built a tool called [`sshfs-mac-docker`](https://github.com/jzombie/sshfs-mac-docker) to get around macOS's notoriously clunky native handling of network drives. The project used a custom [`Dockerfile`](https://github.com/jzombie/sshfs-mac-docker/blob/main/Dockerfile) and an [`smb.conf`](https://github.com/jzombie/sshfs-mac-docker/blob/main/smb.conf) configuration to bridge SSHFS over to a Samba share. I haven't actively tested or maintained that specific codebase in years, but the fundamental UNIX headache that inspired it remains a daily reality for developers: when a network connection drops or your Mac simply goes to sleep, the SSHFS mount turns into a zombie.

Your terminal freezes, Finder hangs indefinitely, and the standard commands refuse to work because the OS insists the resource is still busy. While my old Docker workaround is archived, the underlying macOS commands to break these frozen mounts haven't changed in a decade. Here is the cheat sheet for cleanly getting your terminal back.

## 3 Ways to Kill a Frozen SSHFS Mount

When you are dealing with a stalled network drive, you want to escalate from the most graceful command to the most aggressive.

### 1. The Standard Unmount

Under normal circumstances, you should always try to close the connection gracefully. Standard Linux syntax works perfectly fine on macOS when the connection is healthy:

```sh
umount /path/to/mountpoint
```

### 2. The macOS Native Force Unmount

If the first command hangs or returns a `Resource busy` error, bypass the standard UNIX `umount` and use macOS's built-in disk utility. This command forces the operating system to detach the volume, even if processes are currently trying to read from it:

```sh
diskutil unmount force /path/to/mountpoint
```

### 3. The Nuclear Option (Process Termination)

If Finder is completely locked up and even `diskutil` hangs, the background `sshfs` process itself has likely become completely unresponsive. You need to find the specific process ID (PID) and terminate it directly.

First, list all running processes and filter for SSHFS:

```sh
ps aux | grep sshfs
```

Look for the line that corresponds to your stuck mount and find the PID (the first number in the row). The `grep sshfs` line itself will also show up in the output; ignore it. Then, force kill that process:

```sh
kill -9 <PID>
```

Once the process is dead, macOS will eventually realize the volume is gone, and your frozen terminal and Finder windows will instantly release. It is a harsh way to end a session, but when you are dealing with a network drop on a remote server, it is often the only way out.

----

*Archived workaround, still online: [sshfs-mac-docker](https://github.com/jzombie/sshfs-mac-docker).*
