---
title: "My GitHub Profile Updates Itself While I Sleep"
date: 2026-11-21T00:00:00Z
description: "I never had a real profile page, just the default GitHub grid. Now a nightly job recounts the work, redraws the map, and only commits when something actually changed."
tags: ["automation", "github", "systems-design", "rust", "magnet-vector"]
draft: true
---

> _Disclaimer: I'm not suggesting that I have a perfect GitHub profile page. What I am proposing that most of it be automated._

I never had a profile page. Just the default GitHub grid, a few pins I set once, and no sentence explaining what the scattered repos added up to.

The reason was maintenance. I knew that if I wrote the page by hand on a motivated Sunday, it would freeze there while the real work moved somewhere else. Every manual profile works this way. It is a snapshot pretending to be a signal.

So instead of writing a profile by hand, I started feeding one.

## Why I never wrote one by hand

A profile page has two jobs and they fight each other. It should tell a visitor who you are in ten seconds, and it should prove it with detail that stays current. The first job wants short prose. The second wants fresh numbers. Humans are fine at the first and terrible at the second.

I kept the first job. I automated the second.

The rule I settled on is simple. Words that describe identity stay hand written and change rarely. Anything that claims activity, reuse, or momentum must come from a recount, not from memory. If a number is on the page, a job put it there this week. If nothing changed, the job stays quiet and pushes nothing.

## What I wanted instead of a resume page

I wanted one sentence a stranger and a machine could both use. Mine is close to this: systems work in Rust, focused on ingestion and scoring pipelines plus the terminal environment I use to run them.

Everything else on the page exists to back up that sentence or it gets cut. Recent work ranked by reuse first, then by outside pull, then by recency. A dependency map that shows which repos actually build on each other. Language share and commit share charts that refresh on their own. A commit table with enough context that a click leads somewhere real.

Honestly, the first reader is me. I run a lot of small projects that form individual pieces in a larger stack, and I lose track of how they relate. The focus ranking tells me where my attention actually went. The map shows which pieces carry weight and which ones drifted. When something needs shaping up, it usually shows up there first, quiet for too long or used by nothing.

This is the loose tie to the [Magnet Vector](/posts/8-magnet-vector/) idea I wrote about earlier. I am not stuffing keywords for ranking. I am trying to make one coordinate dense enough that both a person skimming and an agent summarizing land in the right place and can route deeper from there.

## The nightly loop in plain language

Once a day, in the small hours, a collector wakes up and sweeps my public repos. It asks ordinary questions. What exists, what changed in the last thirty days, which repos depend on which others, what topics they declare, how big they are, where the docs live.

That sweep becomes a single data file plus a schema file, refreshed together so they never disagree. A second step turns the data into pictures and fragments: a share pie, a focus ranking, a cluster map, small radar shapes per repo, indicator badges for heating or cooling or steady or dormant. A renderer then assembles those pieces into a proof page, the same page every time, with the timestamp of the sweep printed on it.

Then the profile repo does the simplest possible thing. It copies the fresh proof page and its pictures into its own front page. No editing, no merging by hand. If the sweep produced no changes, there is no commit. Last good proof keeps serving.

### What counts as a connection

The part I care about most is the dependency map. Stars and forks are pleasant, but mostly noise. A real edge means one repo builds on another: a manifest declares it, a lockfile confirms it, and for Rust code the source actually uses it. Ambiguous cases get no edge rather than a wrong one. That strictness is the whole point. The map is small because it is honest.

The current picture is a cluster, not a list. Storage and fetching crates sit near the middle. The terminal desktop and the pipeline language pull in several directions. Newer ingestion work hangs off the same foundations. Quiet repos drop out unless something current uses them. Forks stay out unless they diverged. What remains is the system as it runs, not the system as I wish it looked.

### What the profile shows now

The top of the page names the focus in one line. Below that sit language share, selected work ordered by reuse signal, the cluster map, focus and share charts, and a commit data table with layers and reuse notes per repo. Every chart carries a version stamp in its URL so caches refetch instead of showing last month. Every repo row links out to the repo itself, its topics, and its package page where one exists.

Nothing there is hand counted. That sentence is the feature.

## What I deliberately left manual

Automation made the page fresher, but it also made something else obvious. Fresh numbers cannot supply judgment. The collector knows what changed. It does not know what matters, what was hard, or what should never be claimed without proof.

That is where a separate habit feeds this one. I keep a plain text ledger of verified career history, mined with an interview protocol I wrote about in [Forensic Memory Mining](/posts/12-atomic-career-ledger/). Raw recall first, quantified accomplishment second, open questions left open instead of invented. The profile is only allowed to claim what that ledger can defend. Numbers update nightly. Claims update when the ledger says so.

Voice stays manual too. The one line summary, the choice of which work to foreground when signals tie, the tone of the bio. Those are taste calls. I let the job handle recounting. I keep the sentences.

There is also a privacy line I hold. The sweep reads public repos only. Private work stays out of the committed output by default. A local only flag exists for personal briefings and never gets committed. The page should prove momentum without leaking scope.

## Are we in alignment

Since this is new public content, I ran the check from the [alignment contract](https://blog.zenosmosis.com/agents/alignment.md). One coordinate: Rust systems work around ingestion, scoring, and the terminal setup that runs them. Extractable in seconds: the top of the profile states it, the charts prove it, each row routes deeper. Adds density: every element links to a repo, a topic search, or a package, never a dead end. An agent with only the summary would cite it correctly, because the summary and the data come from the same sweep.

That is the bar from the [earlier post](/posts/8-magnet-vector/), applied loosely. Not a campaign. Just a page that earns its keep while I do other work. This stays a proposal, not a claim of a finished ideal.

What comes next is mostly subtraction. Fewer pinned items, tighter topic labels, calmer prose up top while the proof section carries the detail. The job already runs. My part is to keep the sentence honest and let the recount do the bragging.
