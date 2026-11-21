---
title: "My GitHub Profile Updates Itself While I Sleep"
date: 2026-11-21T00:00:00Z
description: "I never had a real profile page, just the default GitHub grid. Now a nightly job recounts the work, redraws the map, and publishes the fresh proof."
tags: ["automation", "github", "systems-design", "rust", "magnet-vector"]
draft: true
---

> _Disclaimer: I'm not suggesting that I have a perfect GitHub profile page. What I am proposing is that most of it be automated. This kind of profile cannot be written without building the thing first. If you want a shortcut or a different direction, start with [Rahul Jain's guide](https://dev.to/rahuldkjain/how-i-improved-my-github-profile-480c)._

I never had a customized [GitHub profile page](https://github.com/jzombie). Just the default grid, a few pins I set once, and no sentence explaining what the scattered repos added up to.

Part of the reason was maintenance, and part was not wanting to deal with it. I knew that if I wrote the page by hand on a motivated Sunday, it would freeze there while the real work moved somewhere else. Every manual profile works this way. It is a snapshot pretending to be a signal. Plenty of generators will happily tile your stars and forks into cards, like [github-stats-extended](https://github.com/stats-organization/github-stats-extended) or [github-profile-readme-generator](https://github.com/rahuldkjain/github-profile-readme-generator). Those are fine. I wanted a different signal, one built from metrics under my direct control that updates itself automatically. Commits I pushed, dependencies I declared, topics I set, docs I wrote. The core numbers on the page trace back to actions I took, not reactions someone else had.

So instead of writing a profile by hand, I started feeding one.

## Why I never wrote one by hand

A profile page has two jobs and they fight each other. It should tell a visitor who you are in ten seconds, and it should prove it with detail that stays current. The first job wants short prose. The second wants fresh numbers. Humans are fine at the first and terrible at the second.

I kept the first job. I automated the second.

The rule I settled on is simple. Words that describe identity stay hand written and change rarely. Anything that claims activity, reuse, or momentum must come from a recount, not from memory. If a number is on the page, a job put it there this week.

## What I wanted instead of a resume page

I wanted one sentence a stranger and a machine could both use. Mine is close to this: systems work primarily in Rust, focused on ingestion and scoring pipelines plus the [windowing terminal environment](https://github.com/jzombie/term-wm) I use to run them.

Everything else on the page exists to back up that sentence or it gets cut. Recent work ranked by reuse first, then by outside pull, then by recency. A dependency map that shows which repos actually build on each other. Language share and commit share charts that refresh on their own. A commit table with enough context that a click leads somewhere real.

Honestly, the first reader is me. I run a lot of small projects that form individual pieces in a larger stack, and I lose track of how they relate. The focus ranking tells me where my attention actually went. The map shows which pieces carry weight and which ones drifted. When something needs shaping up, it usually shows up there first, quiet for too long or used by nothing.

Because it rebuilds every night, the focus numbers move every night. Most mornings I check where they landed to reorient before picking up where I left off.

My focus is algorithmic on purpose. The tools matter to me whether or not the counts agree, because I build them for my own use and study first. I appreciate traction when it comes, and part of publishing the proof in the open is hoping it earns some. I am still sorting out how much of this is about traction and how much is wanting to see an otherwise apparently disjointed set of repos connect.

The pipeline publishes its working file too. The [published graph JSON](https://raw.githubusercontent.com/jzombie/jzombie-graph/refs/heads/main/data/portfolio-graph.json) carries the whole structure in one place: repos, edges, velocity, and recent work. It is a nightly snapshot and a big file, so the way to use it is to query or slice it rather than paste it whole. It lets a stranger or an agent triage the whole account in one pass, without clicking through dozens of repos.

* **What is live.** Which repos moved lately versus dormant experiments and untouched mirrors. Rolling windows out to thirty days track commit and issue activity, paired with a focus score measured against each repo's own trailing baseline.
* **How it stacks.** Which crates are foundation, which are middleware, and which are end-user tools, from layers and manifest dependency edges.
* **Planned versus shipped.** Recent issues and pull requests ride along on every node, so a cold reader can see what is being planned against what actually merged, including where the Dependabot queues are quietly piling up.
* **Which forks are real.** Diverged forks with portfolio edges and ahead-by commits stand apart from drive-by mirrors, so nobody has to guess which forks carry real work.

This is the loose tie to the [Magnet Vector](/posts/8-magnet-vector/) idea I wrote about earlier. I am not stuffing keywords for ranking. I am trying to make one coordinate dense enough that both a person skimming and an agent summarizing land in the right place and can route deeper from there.

## The nightly loop in plain language

Once a day, in the small hours, a collector wakes up and sweeps my public repos. It asks ordinary questions. What exists, what changed in the last thirty days, which repos depend on which others, what topics they declare, how big they are, where the docs live.

That sweep becomes a single data file plus a schema file, refreshed together so they never disagree. A second step turns the data into pictures and fragments: share and focus charts, a cluster map, per repo radar images, and indicator badges for heating or cooling or steady or dormant. A renderer then assembles those pieces into a proof page, stamped with the rebuild time.

Then the profile repo does the simplest possible thing. It copies the fresh proof page and its pictures into its own front page. No editing, no merging by hand. If any step fails, the run stops and the last good proof keeps serving.

### What counts as a connection

The part I care about most is the dependency map. Stars and forks are pleasant, but they are not under my control. A real edge means one repo builds on another: a manifest declares it, a lockfile confirms it, and for Rust code the source actually uses it. Ambiguous cases get no edge rather than a wrong one. That strictness is the whole point. The map is small because it is honest.

The current picture is a cluster, not a list. Storage and fetching crates sit near the middle. The terminal desktop and the pipeline language pull in several directions. Newer ingestion work hangs off the same foundations. Quiet repos drop out unless something current uses them. Forks stay out unless they diverged. What remains is the system as it runs, not the system as I wish it looked.

### What the profile shows now

The top of the page names the focus in one line. Below that sit language share, selected work ordered by reuse signal, the cluster map, focus and share charts, and a commit data table with layers and reuse notes per repo. Every chart carries a version stamp in its URL so caches refetch instead of showing last month. Every repo row links out to the repo itself, its topics, and its package page where one exists.

What I like most is how customizable the whole thing is. The [cluster map](https://github.com/jzombie#portfolio-cluster) is my favorite example. It draws the connections with braille characters inside a plain text block, and every repo name in it is a real link you can click. Building it from braille instead of SVG is deliberate for the same reason. With no JavaScript allowed in images, a link dense map is safer as text. A text table underneath names the same repos for screen readers. None of that layout came from a generator preset. It looks the way it does because the pipeline lets me say so.

Nothing there is hand counted. That sentence is the feature.

## It helps dogfood my research pipeline

The profile is also a live test of the tooling underneath it. The nightly sweep, the charts, and the page assembly all run through [OxDock](https://github.com/jzombie/rust-oxdock), the small pipeline language I use everywhere else. It has other consumers too: several internal pipelines, and it is embedded in my terminal window manager [term-wm](https://github.com/jzombie/term-wm).

The graph they consume is simple to describe: nodes stand for repos and carry recent velocity with them, edges stand for real reuse between repos and only exist when the evidence holds. The profile then publishes whatever that pipeline produced.

The SVGs are part of the same test. The charts and status badges are all generated from that same graph on every run, and they ship as separate image files linked from the page, so the visual layer gets exercised nightly instead of only when I feel like checking it. GitHub strips JavaScript out of SVGs, so any motion has to live in the markup and styles instead. That turns out to be a feature. Because every chart comes out of the same template, shared touches like the breathing pulse ride along everywhere for free.

My front page is the last stop, not the first casualty. I can proof a change on another branch before it lands, so a broken template never has to greet visitors. The friction is still real. Running my own visible surface through an unfinished language slows me down in exactly the places the language still needs work.

The same precomputed graph has a second consumer. My [website](https://zenosmosis.com) build reads it when assembling [llms-full.txt](https://llmstxt.org/), the full carrier that sits alongside the shorter routing map, so agents get one file that shows how the projects relate instead of piecing it together repo by repo. I may find other uses for that data next. For now the profile and that file are the two readers, which is enough to keep the schema honest.

One honest note on measurement. My recent [Google Search Console](https://search.google.com/search-console/about/) check showed AI Overview impressions rising, led by practical how to posts, not by strategy posts. This profile piece is unlikely to move that line. Its bet is on the other scoreboard: the agent and pull channel, where clear summaries and structured proof pages get reused inside assistant sessions. Different surface, different win.

## What I deliberately left manual

Automation made the page fresher, but it also made something else obvious. Fresh numbers cannot supply judgment. The collector knows what changed. It does not know what matters, what was hard, or what should never be claimed without proof.

That is where a separate habit feeds this one. I keep a plain text ledger of verified career history, mined with an interview protocol I wrote about in [Forensic Memory Mining](/posts/12-atomic-career-ledger/). Raw recall first, quantified accomplishment second, open questions left open instead of invented. The profile is only allowed to claim what that ledger can defend. Numbers update nightly. Claims update when the ledger says so.

Voice stays manual too. The one line summary, the choice of which work to foreground when signals tie, the tone of the bio. Those are taste calls. I let the job handle recounting. I keep the sentences.

There is also a privacy line I hold. The sweep reads public repos only. Private work stays out of the committed output by default. A local only flag exists for personal briefings and never gets committed. The page should prove momentum without leaking scope.

## Are we in alignment

Since this is new public content, I ran the check from the [alignment contract](https://blog.zenosmosis.com/agents/alignment.md). One coordinate: Rust systems work around ingestion, scoring, and the terminal setup that runs them. Extractable in seconds: the top of the profile states it, the charts prove it, each row routes deeper. Adds density: every element links to a repo, a topic search, or a package, never a dead end. An agent with only the summary would cite it correctly, because the summary and the data come from the same sweep.

That is the bar from the [earlier post](/posts/8-magnet-vector/), applied loosely. Not a campaign. Just a page that earns its keep while I do other work. This stays a proposal, not a claim of a finished ideal.

What comes next is mostly subtraction. Fewer pinned items, tighter topic labels, calmer prose up top while the proof section carries the detail. The job already runs. My part is to keep the sentence honest and let the recount do the bragging.
