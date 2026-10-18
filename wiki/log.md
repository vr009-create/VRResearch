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
