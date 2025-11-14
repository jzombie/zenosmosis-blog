---
title: "Why does anyone invent anything?"
date: 2025-11-14T08:00:00Z
description: "Why are there multiple brands of [anything] with extremely similar features..."
tags: ["building", "reinventing-the-wheel", "systems-design", "software"]
---

Why are there multiple brands of cars with extremely similar features? Most of them have four wheels, a steering wheel, pedals in roughly the same layout, a windshield, and a trunk. From far enough away, a Honda and a BMW are the same object: a metal box that moves you from A to B.

Why are there multiple operating systems with graphical interfaces that look almost interchangeable at a glance? Windows, macOS, KDE, GNOME, iOS, Android: they all reuse the same handful of ideas. Desktop, taskbar or dock, file menu, copy and paste, windows that overlap, icons that you can drag around. Even the “new” ones are really variations on a pattern that solidified decades ago.

Why do Unix-like systems spawn endless desktop environments and window managers that all sit on top of the same kernel? XFCE, GNOME, KDE, i3, sway, Awesome, and on and on. They share the same underlying system calls and process model, but people keep rearranging the pixels.

Why are there dozens of Linux distributions that all share the same kernel? Different wallpapers, package managers, default configs, and community norms wrapped around essentially the same core. If “Linux is Linux,” why does anyone bother shipping yet another distro?

Why are there multiple CPU architectures for consumer hardware at all? X86, x86_64, ARM, RISC-V and others, each with their own instruction sets and tradeoffs, all ultimately executing code to add numbers, move bytes, and jump around in memory.

“Reinventing the wheel” is only pointless if:

1. You really are copying an existing design without understanding it, and
2. You are not changing any constraints, goals, or tradeoffs.

But as soon as any of those shift, you are not reinventing the wheel; you are designing a wheel that fits a different road, a different load, and a different vehicle.
