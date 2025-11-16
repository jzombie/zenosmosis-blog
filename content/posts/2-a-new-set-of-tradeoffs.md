---
title: "A new set of tradeoffs"
date: 2025-11-14T00:00:00Z
description: "This project did not start with some grand plan to build a database engine..."
tags: ["building"]
---

This project did not start with some grand plan to build a database engine.

It started with a small tool called [Muxio](https://github.com/jzombie/rust-muxio), a library I hacked together in Rust to give me WebSocket connectivity between Rust, Python, and WASM clients. Somehow, at least for a few hours, it ended up on the front page of Hacker News. I still like the project a lot, but I am  not entirely sure how or why it wound up there.

For most people, that is a spike of traffic, a few GitHub stars, and then life goes back to normal. For me, one side effect was a message from a company I was already interested in about a potential role.

On paper, it looked almost ideal: market data, infrastructure, performance, and a career track in Rust. Exactly the kind of work I actually enjoy doing.

Before any of this, I had already thought about reaching out to them directly with something like, "hey, I built this library that fits what you do, you should look at it, and maybe look at me too."

I had briefly been a client of theirs, had decent insight into their market data offerings, designed a schema to capture what I wanted, and started building a never-ending series of machine learning models that I was convinced would make me very rich, or at least noticeable.

So when this role basically came to me, I was sure I was their guy.

The first interview, with one of the co-founders, went well.

A few interviews in, I bombed one. That was the end of that.

But one of the things they asked about in that failed round was something I did not know yet and had been thinking about building for myself anyway. So after the interview died, I started building it.

That is how this project started: not with a clean vision, but with a door closing, a question I could not shake, and the decision to just build the thing on my own, to learn how it could truly work in conjunction with my own set of trade-offs that I would subsequently impose on such a system.
