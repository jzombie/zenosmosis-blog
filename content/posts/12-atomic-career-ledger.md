---
title: "Forensic Memory Mining: Using Police Tactics on Myself to Recover Lost Thoughts"
date: 2026-11-14T00:00:00Z
description: "Resumes compress a messy career into smooth fiction, so I researched forensic interview techniques and started applying reverse recall, verbatim dumps, and auditable XYZ entries to my own history before any polish."
tags: ["career", "ai-agents", "memory", "systems-design", "magnet-vector"]
draft: true
---

Sit down to update your resume and watch what happens. Three years of messy engineering collapse into a smooth story: kickoff, build, launch. The late-night debugging, the shelved prototype, the boring script that saved the team hours each week, all gone. What remains is a highlight reel that feels true and is mostly reconstruction.

That blank page moment is what sent me researching how investigators pull detailed recall from witnesses. I did not build a dedicated product for this endeavor. I studied forensic interview techniques, laid down ground rules in an empty repository `AGENTS.md` file, and turned my agent loose quizzing me to apply them to my own history. Not to write a better PDF, but to stop memory drift and AI confabulation at the source. Once a detail decays in human memory, no future tool can recover it without guessing. Capturing it in plain text now gives my coding agents verified history to draw from immediately, without needing any downstream automation. A resume asks you to compress. This process asks you to decompress first.

## The problem is biological before it is professional

Human memory is reconstructive, not a recording. Ask it for a chronological career story and it obliges with script-driven guessing. It paves a clean road from kickoff to launch and erases everything that does not fit the arc.

In my own extraction sessions, the missing material fell into three buckets:

1. Gnarly debugging that never made a status report, like a WebRTC to telephony codec mismatch that segfaulted on underpowered servers, or a demo-day import failure caused by unresolved module paths.
2. Dead architectures that felt embarrassing to mention, like a state unification layer that proved incompatible with the existing codebase and was shelved after weeks of shimming.
3. Trivial automation that felt too boring to list, like a Wikipedia SVG parser that turned static maps into interactive regions, or a proxy plus search layer built with zero database access.

Chronology is the enemy here. Forward recall rewards the rehearsed narrative. The detail you need for a credible accomplishment lives in the boring Tuesdays, the week before launch, the thing that broke last.

There is a second constraint, and it is worth exactly two paragraphs. Modern hiring parsers shred documents into structured fields and rank by semantic proximity. That pipeline cannot use vibes. It needs strictly typed, quantified units. That constraint forced my hand: I could not tolerate vague recollection or polished fluff at the source, because every downstream consumer amplifies whatever corruption I feed it. There is no point building a compiler before you have an uncorrupted source corpus.

The third failure is the tool most of us reach for first. Ask a default large language model for resume help and you get a helpful summarizer. It condenses thin memories into corporate gloss, invents metrics to fill gaps, and praises every bullet. I did not need AI to write. I needed it to interrogate.

## The protocol: four phases borrowed from eyewitness psychology

The approach borrows the Cognitive Interview developed by Fisher and Geiselman in the 1980s for eyewitness recall. Police psychologists learned that chronological free recall produces the thinnest reports. Four specific retrieval cues produce thicker ones: reinstate context, report everything, reverse order, change perspective. I researched those cues and started applying each one as a phase to myself, kept as a short 108-line `AGENTS.md` file that any coding agent can follow.

### 1. Mental reinstatement: anchor before accomplishments

No accomplishment talk until the environment is vivid. The agent opens with commands, not questions:

> Describe your monitors and what was pinned to your dock. Who sat to your left? What channels did you keep open daily? What time did you start, and what did you check first?

Good anchors are spatial, social, sensory, and routine. One gold standard session captured building layout, desk orientation, monitor sizes, neighbor seating, window views, dress code, daily rhythm, and first day memory before a single project was named. Thin anchors, common for short remote contracts, might only list a laptop, a chat app, and a time zone. That gap matters. Thin anchors correlate with the most forgotten impact, which is itself a finding worth logging rather than skipping.

### 2. Unfiltered recall: dump to exhaustion

Once anchored, the instruction is blunt:

> Tell me everything about this system. Every script, bug, meeting, and boring task. Do not edit, do not summarize.

The agent is strictly forbidden from condensing, reordering, or topic hopping. One heading per system, dates in a separate tenure block, verbatim emotion preserved. A multi-language SaaS session captured nearly 1,000 hand-translated strings, a self-initiated OCR adapter built as a favor, and a tower of duplicated backends that eventually prompted a resignation to save sanity. None of that sounds like a resume bullet in raw form. That is the point. Raw first, packaging later.

### 3. Reverse order recall: walk backward from the end

Start at delivery, layoff, acquisition, or quit. Then step backward: what broke last, what changed the week before, what slipped the deadline, who was in the kickoff room.

A telehealth video bridge reads completely differently in reverse. Forward version: migrated video to a new provider. Backward version: delivery after codec artifacts, WebRTC to telephony mismatch, segfaults on shared servers, a rejected headless-browser proposal, eventual approval, delivered after two prior vendors burned ~$500k+ (not sure if it was in total, per vendor, or was an outright lie to make me motivated). The backward walk surfaces judgment under constraint: diagnosing the fault early, persisting through rejection, shimming browser clients onto server runtimes. Forward recall would have smoothed all of that away.

### 4. Changing perspectives: ask the room

The final cue is the least comfortable and the least completed in my own corpus, present in only two of seven sampled files. The prompts:

> How would QA describe your contribution? What would a junior learn watching you that week? What did the PM never understand about what you built?

One strong session captured a philosophy clash over duplicated clients versus shared interfaces, plus a frank junior view on fragmented services and early meeting bloat. Another produced a single honest line: the junior would have learned the author was absolutely winging it. That mines poorly into metrics and richly into character. I disclose the gap because it is load bearing. Perspective shift is either too threatening, too easy to deprioritize, or both.

The enforcement mechanism is tone. The agent must command, not suggest. Describe, walk backward, tell me from QA view. No preamble, no how can I help, no summary until exhaustion. This inverts the default assistant behavior, which is why the spec fits in 108 lines. Anything longer degrades attention. Anything politer invites hallucinated compliance.

## Terms used in this post

This post references the following hiring frameworks from the repository templates as a working glossary, not a claim of mastery:

* **PAR**: Problem, Action, Result. Also written CAR for Challenge, Action, Result. For firefighting, outages, and shipped fixes. Most of my filed entries carry this label.
* **STAR**: Situation, Task, Action, Result. For cross team or leadership work where scope and assignment need context before the action.
* **SOAR**: Situation, Obstacle, Action, Result. For strategic work tied to a business objective. In the template but I do not recall using it.
* **SHARE**: Situation, Hindrance, Action, Result, Evaluation. For sideways or failed work where the lesson matters as much as the outcome. In the template but I do not recall using it.
* **PARLA**: Problem, Action, Result, Learning, Application. For early career work where transferable learning is the point. In the template but I do not recall using it.
* **XYZ**: a quantification line attached to PAR or STAR. X is what you accomplished, quantified. Y is how it was measured, by metric or direct observation. Z is the specific technical steps you took.

## From raw recall to atomic ledger

Mining happens immediately after each phase, never batched at the end. In my files, almost everything ended up labeled PAR, even work that could qualify as STAR. The other formats stayed in the template. Every entry also carries an XYZ line as defined above.

Continuing that same SaaS extraction, that raw recall became a PAR:

Problem: isolated string files, duplicated effort, inconsistent behavior across locales. Action: built a semi-automatic fetch pipeline with provider auto-fetch on new content plus an audit queue. Result: zero-touch localization with no empty text states.

X is roughly 1,000 strings moved from manual to pipeline. Y is elimination of manual merge time and missing key incidents. Z is identifying the scaling break, learning the internationalization framework on the job, building the fetch layer, and wiring it into the release workflow.

A second example uses that same bridge to show the PAR conversion. X names a real-time interpreter bridge delivered after prior failures, Y names delivery under contractual obligation against explicit vendor skepticism, and Z names segfault diagnosis, the headless-browser proposal, and codec resolution through trial and error. Numbers keep their tilde honesty. Roughly 12 endpoints, several hundred pages. Precision is not claimed where telemetry is gone.

The anti-confabulation rule is the differentiator. A price notification system had three microservices. The third is recorded as unrecalled and left open. A document ingestion side project is logged as specifics unknown and left open as unresolved. When measurement is missing, the protocol uses defensive estimation with visible math. Fifty invoices per day at eight minutes each, reduced to thirty seconds, even if off by half, still exceeds five hours per week. Show the arithmetic, mark the uncertainty, never invent a dashboard.

## The artifact is plain text on purpose

The corpus itself stays plain text on purpose. No resume generator. The artifact is deliberately boring: one `AGENTS.md` spec, one 21-line corpus template, one index table with thirteen role eras, and one Markdown file per employer holding the four phases plus mined entries plus open items. The sessions that produced it are also preserved in two other places: the internal store my agent builds on its own, and a separate conversation log I hooked in so I can mine my own sessions in whatever future format I want.

That plainness is the payoff today. Because the corpora live in the workspace as structured text, coding agents already read verified history when drafting docs, scoping tradeoffs, or building workflow tooling. They pull the actual constraint or the actual workaround instead of guessing from a thin bio. Atomic XYZ units are kept clean so future tooling could consume them without re-extraction, but that tooling is not claimed as built.

In _[Magnet Vector](/posts/8-magnet-vector/)_ terms, this is the upstream density work before any public discovery layer exists. A keyword-stuffed resume is outbound noise pushed into a void. Anchored recall paired with quantified XYZ lines produces dense, auditable units that future discovery layers can actually index without guessing.

Why do this at all? I wanted a record I could trust the next time I had to explain my work, without reconstructing it under pressure or letting a tool invent details. In total I spent about 12 hours answering questions across sessions, not in one sitting. Memory keeps fading and new work keeps piling up, so it helps to run another session after a while to catch what surfaced late or what changed. I include the storage detail for context. The process forces honesty with yourself, which is harder than it sounds. I am not sure most people would sit with it that long.

Replicating this takes less infrastructure than you expect and more discipline than you want.

Start with the spec and the template. Index every role era, allowing approximate dates and stub status rather than false precision. Run phase one alone with no accomplishment talk. Dump one system to exhaustion in the next session and mine one PAR immediately with XYZ. Walk the same system backward without overwriting the forward dump, so both views survive. Attempt perspectives even when uncomfortable. Mark a file complete only when the anchor is vivid, the dump is exhausted, the backward chain reaches kickoff, at least one XYZ entry exists, and no investigation item is silently dropped.

Two honest limits ship with the method. The referenced `CORE.md` methodology deep dive does not exist on disk, so every session runs on the short spec plus prior corpora as implicit examples. Either write it or remove the reference. And phase four remains underused. Softer prompts or explicit worked examples for failure and early career formats may be needed before the coverage claim holds.

Memory will keep compressing. Parsers will keep shredding. Default AI will keep polishing. The alternative is to treat your own career like a cold case: reinstate the room, dump everything, walk it backward, ask the witnesses, and write down what you can prove with the math showing.
