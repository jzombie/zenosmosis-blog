---
title: "Forensic Memory Mining: Recovering Lost Thoughts and the Information Flywheel Effect"
date: 2026-11-14T00:00:00Z
description: "For engineers who blank in interviews: I turned police interview tactics on myself to capture dense, auditable career history in plain text."
tags: ["career", "ai-agents", "memory", "systems-design", "magnet-vector"]
draft: true
---

I started this because I blanked in job interviews. Asked for specifics on work I had actually done, my mind went empty. Years of messy engineering collapsed into kickoff, build, launch, leaving no late-night debugging, no shelved prototype, and no boring time-saving script within reach when I needed it.

That blank interview moment is what sent me researching how investigators pull detailed recall from witnesses. I did not build a dedicated product for this endeavor. I studied forensic interview techniques, added an [`AGENTS.md`](#how-to-replicate) rule file to an empty repository, and turned my agent loose quizzing me to apply them to my own history. Not to write a better PDF, but to stop memory drift and AI confabulation at the source. Once a detail decays in human memory, no future tool can recover it without guessing. Capturing it in plain text now gives my coding agents verified history to draw from immediately, without needing any downstream automation. A resume asks you to compress. This process asks you to decompress first.

## The problem is biological before it is professional

Human memory is reconstructive, not a recording. Ask it for a chronological career story and it obliges with script-driven guessing. It paves a clean road from kickoff to launch and erases everything that does not fit the arc.

In my own extraction sessions, the missing material fell into three buckets:

1. Gnarly debugging that never made a status report, like a WebRTC to telephony bridge hit by codec mismatches and segfaults in a vendor library, or tracking down why SSH to a development server spiked with latency at the same time each day.
2. Dead architectures that never shipped because the company was acquired by a company running a different backend, which felt awkward to explain in an interview.
3. Trivial automation and unglamorous workarounds that felt too boring to list, like a Wikipedia SVG parser that turned static maps into interactive regions, or a scraper and frontend proxy overlay that let departments query a several-hundred-page financial services compliance site like a database when direct database access was unavailable.

Chronology is the enemy here. Forward recall rewards the rehearsed narrative. The detail you need for a credible accomplishment lives in the boring Tuesdays, the week before launch, the thing that broke last.

There is a second constraint, and it is worth exactly two paragraphs. Modern hiring parsers shred documents into structured fields and rank by semantic proximity. That pipeline cannot use vibes. It needs strictly typed, quantified units. That constraint forced my hand: I could not tolerate vague recollection or polished fluff at the source, because every downstream consumer amplifies whatever corruption I feed it. There is no point building a compiler before you have an uncorrupted source corpus.

The third failure is the tool most of us reach for first. Ask a default large language model for resume help and you get a helpful summarizer. It condenses thin memories into corporate gloss, invents metrics to fill gaps, and praises every bullet. I did not need AI to write. I needed it to interrogate.

## The protocol: four phases borrowed from eyewitness psychology

The approach borrows the [Cognitive Interview](https://en.wikipedia.org/wiki/Cognitive_interview) developed by Fisher and Geiselman in the 1980s for eyewitness recall. Police psychologists learned that chronological free recall produces the thinnest reports. Four specific retrieval cues produce thicker ones: reinstate context, report everything, reverse order, change perspective. I researched those cues and started applying each one as a phase to myself, kept as a short 108-line [`AGENTS.md`](#how-to-replicate) file that any coding agent can follow.

### 1. Mental reinstatement: anchor before accomplishments

No accomplishment talk until the environment is vivid. The agent opens with commands, not questions:

> _Describe your monitors and what was pinned to your dock. Who sat to your left? What channels did you keep open daily? What time did you start, and what did you check first?_

Good anchors are spatial, social, sensory, and routine. One gold standard session captured building layout, desk orientation, monitor sizes, neighbor seating, window views, dress code, daily rhythm, and first day memory before a single project was named. Thin anchors, common for short remote contracts, might only list a laptop, a chat app, and a time zone. That gap matters. Thin anchors correlate with the most forgotten impact, which is itself a finding worth logging rather than skipping.

### 2. Unfiltered recall: dump to exhaustion

Once anchored, the instruction is blunt:

> _Tell me everything about this system. Every script, bug, meeting, and boring task. Do not edit, do not summarize._

The agent is strictly forbidden from condensing, reordering, or topic hopping. One heading per system, dates in a separate tenure block, verbatim emotion preserved. A multi-language SaaS session captured nearly 1,000 hand-translated strings, a self-initiated OCR adapter built as a favor, and a tower of duplicated backends that eventually prompted a resignation to save sanity. None of that sounds like a resume bullet in raw form. That is the point. Raw first, packaging later.

### 3. Reverse order recall: walk backward from the end

Start at delivery, layoff, acquisition, or quit. Then step backward: what broke last, what changed the week before, what slipped the deadline, who was in the kickoff room.

"A telehealth video bridge" reads completely differently in reverse. Forward version: migrated video to a new provider. Backward version: delivery after codec artifacts, WebRTC to telephony mismatch, segfaults on shared servers, a rejected headless-browser proposal, eventual approval, delivered after two prior vendors burned ~$500k+ (not sure if it was in total, per vendor, or was an outright lie to make me motivated). The backward walk surfaces judgment under constraint: diagnosing the fault early, persisting through rejection, shimming browser clients onto server runtimes. Forward recall would have smoothed all of that away.

### 4. Changing perspectives: ask the room

The final cue is the least comfortable and the least completed in my own corpus, present in only two of seven sampled files. The prompts:

> _How would QA describe your contribution? What would a junior learn watching you that week? What did the PM never understand about what you built?_

One strong session captured a philosophy clash over duplicated clients versus shared interfaces, plus a frank junior view on fragmented services and early meeting bloat. Another produced a single honest line: the junior would have learned the author was absolutely winging it. That mines poorly into metrics and richly into character. I disclose the gap because it is load bearing. Perspective shift is either too threatening, too easy to deprioritize, or both.

The enforcement mechanism is tone. The agent must command, not suggest. Describe, walk backward, tell me from QA view. No preamble, no how can I help, no summary until exhaustion. This inverts the default assistant behavior, which is why the spec fits in 108 lines. Anything longer degrades attention. Anything politer invites hallucinated compliance.

## From raw recall to atomic ledger

Mining happens immediately after each phase, never batched at the end. In my files, almost everything ended up labeled PAR (Problem, Action, Result), even work that could qualify as STAR (Situation, Task, Action, Result). The other formats stayed in the template. Every entry also carries an XYZ line (what, measured how, steps taken) as defined in the [glossary below](#glossary).

Continuing that same SaaS extraction, that raw recall became a PAR:

- **Problem:** isolated string files, duplicated effort, inconsistent behavior across locales.
- **Action:** built a semi-automatic fetch pipeline with provider auto-fetch on new content plus an audit queue. Result: zero-touch localization with no empty text states.

X is roughly 1,000 strings moved from manual to pipeline. Y is elimination of manual merge time and missing key incidents. Z is identifying the scaling break, learning the internationalization framework on the job, building the fetch layer, and wiring it into the release workflow.

A second example uses that same bridge to show the PAR conversion. X names a real-time interpreter bridge delivered after prior failures, Y names delivery under contractual obligation against explicit vendor skepticism, and Z names segfault diagnosis, the headless-browser proposal, and codec resolution through trial and error. Numbers keep their tilde honesty. Roughly 12 endpoints, several hundred pages. Precision is not claimed where telemetry is gone.

The anti-confabulation rule is the differentiator. A price notification system had three microservices. The third is recorded as unrecalled and left open. A document ingestion side project is logged as specifics unknown and left open as unresolved. When measurement is missing, the protocol uses defensive estimation with visible math. Fifty invoices per day at eight minutes each, reduced to thirty seconds, even if off by half, still exceeds five hours per week. Show the arithmetic, mark the uncertainty, never invent a dashboard.

## The artifact is plain text on purpose

The corpus itself stays plain text on purpose. No resume generator. The artifact is deliberately boring: one [`AGENTS.md`](#how-to-replicate) spec, one 21-line corpus template, one index table with thirteen role eras, and one Markdown file per employer holding the four phases plus mined entries plus open items. The sessions that produced it are also preserved in two other places: the internal store my agent builds on its own, and a separate conversation log I hooked in so I can mine my own sessions in whatever future format I want.

That plainness is the payoff today. Because the corpora live in the workspace as structured text, coding agents already read verified history when drafting docs, scoping tradeoffs, or building workflow tooling. They pull the actual constraint or the actual workaround instead of guessing from a thin bio. Atomic XYZ units are kept clean so future tooling could consume them without re-extraction, but that tooling is not claimed as built.

In _[Magnet Vector](/posts/8-magnet-vector/)_ terms, this is the upstream density work before any public discovery layer exists. A keyword-stuffed resume is outbound noise pushed into a void. Anchored recall paired with quantified XYZ lines produces dense, auditable units that future discovery layers can actually index without guessing.

## Why do this at all?

I wanted a record I could trust the next time I had to explain my work, without reconstructing it under pressure or letting a tool invent details. Part of it was also avoiding manual fork drift. Maintaining separate tailored resumes for different target roles multiplies proofreading overhead and makes it easy to lose track of which claims went where. A single canonical ledger keeps every verified detail in one place instead of scattered across ad-hoc document variants. Memory keeps fading and new work keeps piling up, so it helps to run another session after a while to catch what surfaced late or what changed. The process forces honesty with yourself, which is harder than it sounds. I am not sure most people would sit with it that long.

## How to replicate

You do not need to write the spec. Borrow mine. Drop this `AGENTS.md` into an empty repo and ask your agent to run it.

```md
# Atomic Career Ledger: Forensic Cognitive Elicitation Protocol

This is the Atomic Career Ledger, a repository of structured career memories extracted via forensic cognitive interviewing. Your role is **interrogator**, not assistant.

## Core Directives

- Never begin with "how can I help?" or any greeting. Jump straight into the protocol.
- Never ask what the user accomplished before completing Phase 1.
- Never summarize, interrupt, or jump topics during narrative flow.
- Command, don't suggest. Use imperatives: "Describe your terminal windows." "Tell me every script you ran." Not "Could you describe..."

## Session Startup

1. Read ALL existing files in `EMPLOYERS/` and `TEMPLATES/` to assess state
2. Read `CORE.md` if it exists for methodology reference
3. Check any `Active Investigation` sections for unresolved items from prior sessions
4. Deploy the appropriate phase based on what's missing

## The 4-Phase Forensic Protocol

Execute these phases sequentially. Never skip a phase.

### Phase 1: Mental Reinstatement (The Anchor)

**Never ask about accomplishments first. Force environmental recall.**

Ask the user what terminal windows they had open, what music they were listening to, the names of the engineers who sat next to them, before asking about the work itself. Specific triggers:
- "What three apps were pinned to your dock?"
- "Describe the physical layout of your desk. What did you see when you looked up?"
- "Who sat to your left? What was their role?"
- "What Slack channels did you have open daily?"
- "What time did you usually start? What was the first thing you'd check?"

Stay in Phase 1 until the user has built a vivid environmental picture. Only then proceed.

### Phase 2: Unfiltered Recall (The Brain Dump)

**Suspend all summarization. Command unfiltered output.**

Command the user to report every detail of a project, even trivial scripts or mundane tasks, without self-editing. Do not interrupt the narrative flow. Specific triggers:
- "Now tell me everything about [specific project]: every script you wrote, every bug you fixed, every meeting you attended. Don't edit, don't summarize."
- "What was the most boring Tuesday? Walk me through it hour by hour."
- "What did you do the first week? The first month?"
- "Describe the build process step by step."

Do NOT jump to the next topic. Let the user exhaust their recall fully.

### Phase 3: Reverse Order Recall (Schema Disruption)

**Disrupt chronological storytelling explicitly.**

Force the user to start at the project's launch date and walk backward, step-by-step, to the initial planning phase. This uncovers forgotten deployment hurdles. Specific triggers:
- "Now walk backward from the launch date. What was the last thing that broke before launch?"
- "And the week before that? What changed in staging?"
- "What was the original deadline? What pushed it?"
- "Go back to the kickoff meeting. Who was in the room? What was the initial scope?"

### Phase 4: Changing Perspectives (Holistic Extraction)

**Shift viewpoints to uncover soft skills and cross-functional impact.**

Ask the user to describe their work from another persona's perspective. Specific triggers:
- "How would the lead QA engineer describe your contribution to that project?"
- "What would your skip-level manager say you did that no one else did?"
- "If a junior developer joined your team on day one, what would they have learned from watching you?"
- "What did the product manager not understand about what you built?"

## Achievement Mining

After each phase extracts a memory, immediately mine it into a structured accomplishment:

1. Choose the framework (based on memory type):
   - **STAR**: Leadership, cross-team, long projects (full context + result)
   - **PAR/CAR**: Technical firefighting, outages, hotfixes (action + result only)
   - **SOAR**: Strategic planning, roadmap work (align action to business objective)
   - **SHARE**: Projects that failed or went sideways (hindrance + evaluation)
   - **PARLA**: Junior roles, career pivoters (learning + future application)

2. Enforce the XYZ formula on every entry:
   - **X**: What was accomplished (quantified)
   - **Y**: How it was measured (metric, KPI, observation)
   - **Z**: What specific actions were taken (technical steps, decisions)

3. If exact Y is missing, trigger Defensive Estimation:
   - "If you processed 50 invoices per day manually, and each took 8 minutes, and you reduced it to 30 seconds, even if you're off by 50%, that's still 5+ hours saved per week. Let's work backward."
   - Never skip quantification. Estimate if you must, but always attach a number.

4. Write the mined accomplishment to the appropriate corpus file immediately.

## File Structure

| File | Purpose |
|------|---------|
| `CORE.md` | Framework reference (read for deeper methodology) |
| `EMPLOYERS/index.md` | Master index linking all employer files |
| `EMPLOYERS/<Name>_Contextual_Corpus.md` | One per employer: environmental context, raw dumps, mined accomplishments, active investigation |
| `TEMPLATES/corpus_template.md` | Template for new employer corpora |

## Session End

When the user signals they're done:
1. Summarize what was mined this session
2. Log any unresolved items to Active Investigation
3. Ensure all files are saved

## Next Session

Re-read all files. Resume from Active Investigation. Do not restart the protocol from Phase 1 unless there are no existing entries.
```

Start one index row per role era, allowing approximate dates and stub status. Run phase one with no accomplishment talk. Dump one system to exhaustion, then mine one PAR with XYZ. Walk the same system backward without overwriting the forward dump. Attempt perspectives even when uncomfortable. Mark a corpus complete only when the anchor is vivid, the dump is exhausted, the backward chain reaches kickoff, at least one XYZ entry exists, and no open item is silently dropped.

Two honest limits ship with the method. The referenced `CORE.md` methodology deep dive does not exist on disk, so every session runs on the short spec plus prior corpora as implicit examples. Either write it or remove the reference. And phase four remains underused. Softer prompts or explicit worked examples for failure and early career formats may be needed before the coverage claim holds.

## The information flywheel effect

The initial pass took about 12 hours in one sitting, plus a single update session so far. Because my logging hooks already capture every agent conversation to both the agent's internal store and an external conversation log, even the sessions used to conceptualize and audit this post are persisted on disk. That history can feed back into future mining passes. Each pass makes the next recall easier: the ledger captures the work, the logs are already capturing the capture, and future sessions can mine both.

Memory will keep compressing. Parsers will keep shredding. Default AI will keep polishing. The alternative is to treat your own career like a cold case: reinstate the room, dump everything, walk it backward, ask the witnesses, and write down what you can prove with the math showing.

## Glossary

This post references the following hiring frameworks from the repository templates as a working glossary, not a claim of mastery:

### Accomplishment frameworks

* **PAR**: Problem, Action, Result. Also written CAR for Challenge, Action, Result. For firefighting, outages, and shipped fixes. Most of my filed entries carry this label.
* **STAR**: Situation, Task, Action, Result. For cross team or leadership work where scope and assignment need context before the action.
* **SOAR**: Situation, Obstacle, Action, Result. For strategic work tied to a business objective. In the template but I do not recall using it.
* **SHARE**: Situation, Hindrance, Action, Result, Evaluation. For sideways or failed work where the lesson matters as much as the outcome. In the template but I do not recall using it.
* **PARLA**: Problem, Action, Result, Learning, Application. For early career work where transferable learning is the point. In the template but I do not recall using it.

### Quantification

* **XYZ**: a quantification line attached to PAR or STAR. X is what you accomplished, quantified. Y is how it was measured, by metric or direct observation. Z is the specific technical steps you took.

### Agent protocol

* **AGENTS.md**: the short rule file my agent reads on session start. It tells the agent to interrogate instead of assist, read the existing corpora, run the four phases in order, and mine XYZ entries to disk. Full copy in [How to replicate](#how-to-replicate).
