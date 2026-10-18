---
type: log
title: Log
permalink: /log/
---

# Log

Append-only. Recent entries: `grep "^## \[" wiki/log.md | tail -5`

## [2026-10-18] schema | Wiki initialized
- Set up the LLM Wiki structure (raw/, wiki/, CLAUDE.md) from Karpathy's "LLM Wiki" gist.
- Filed the gist as the first raw source: `raw/llm-wiki-karpathy.md` (not yet ingested).

## [2026-10-18] schema | Jekyll site added
- Wiki is published with Jekyll via GitHub Actions; Obsidian wikilinks, callouts, and backlinks render on the site.

## [2026-10-18] schema | Plans, artefacts, demos, and Tailwind
- Added `wiki/plans/` and `wiki/artefacts/` with auto-generated list pages on the site.
- Added the React demos app (`app/`), published at `/demos/`.
- Restyled the site with Tailwind CSS; the app uses Tailwind too.

## [2026-10-18] plan | Salesforce sandbox layer
- Wrote [[salesforce-layer]] (draft): guardrails, architecture, four feature areas, six milestones, setup steps, open questions.
- Linked the plan to the `salesforce-layer` entry in the demos app; added Mermaid diagram rendering to the site.
