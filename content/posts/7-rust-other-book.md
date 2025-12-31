---
title: "Rust's \"Other\" Official Book (The Reference Guide)"
date: 2025-12-31T00:00:00Z
description: "While The Rust Book is excellent, it doesn’t dive deep into the core language specification."
tags: ["rust", "building", "systems-design"]
---

I’ve used `macro_rules!` plenty of times, but recently I wanted to explore the full range of available **fragment specifiers**. I wasn't trying to learn *how* to write a macro; I just wanted to know every single option available to me beyond the usual `$x:expr` or `$y:ident`.

I started where lots of others officially do: *The Rust Programming Language* (affectionately known as "The Rust Book"). But while The Rust Book is excellent, it doesn’t dive deep into the core language specification.

That is when I realized that Rust actually hosts two different "books" on the exact same domain. They are just a directory change away from one another:

## 1. The Rust Book (The Tutorial)

https://doc.rust-lang.org/book/

* **Goal:** Teaches you Rust from first principles. It focuses on building an intuitive understanding of "how Rust wants you to think."  
* **Use it for:** Learning ownership, borrowing, traits, and getting productive with Cargo.

## 2. The Rust Reference (The Specification)

https://doc.rust-lang.org/reference/

* **Goal:** Defines what Rust *is*. It describes the grammar, strict syntax rules, and edge cases. It is dry, precise, and exhaustive.  
* **Use it for:** Looking up exact rules (like macro matchers), operator precedence, and memory models.

---

By the way, if you are looking for the exact definitions of macro metavariables (like I was), they are defined in the Reference here: [https://doc.rust-lang.org/reference/macros-by-example.html\#metavariables](https://doc.rust-lang.org/reference/macros-by-example.html#metavariables)

