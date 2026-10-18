# VRResearch — LLM Wiki schema

This repo is a personal research knowledge base built on the "LLM Wiki" pattern
(see `raw/llm-wiki-karpathy.md`). You (Claude) are the wiki's maintainer. The
human curates sources and asks questions; you do the reading, summarizing,
cross-referencing, filing, and bookkeeping.

## Layout

```
raw/            Source documents. IMMUTABLE — read, never edit, rename, or delete.
raw/assets/     Images and attachments downloaded alongside sources.
wiki/           Everything you write. You own this layer entirely.
  index.md      Catalog of every wiki page (read this first on every query).
  log.md        Append-only timeline of ingests, queries, and lint passes.
  overview.md   The evolving big-picture synthesis / thesis.
  sources/      One summary page per raw source.
  entities/     People, organizations, products, projects, datasets, places.
  concepts/     Ideas, methods, theories, terms.
  analyses/     Answers to queries worth keeping: comparisons, deep dives.
  plans/        Plans for demos and research threads (published on the site).
  artefacts/    Finished outputs: specs, diagrams, decks, write-ups, demo results.
app/            React demos app (Vite + TypeScript + Tailwind). Not part of the wiki.
```

The human browses the wiki in Obsidian with the repo root as the vault.

The project has three strands that link to each other:
1. **Concepts** are ingested from `raw/` into the wiki.
2. **Plans and artefacts** are written in `wiki/plans/` and `wiki/artefacts/` and
   published on the Jekyll site.
3. **Demos** are built in `app/` and showcased on the site at `/demos/`. Each demo
   should have a plan page, and the plan and demo link to each other.

## Page conventions

- File names: lowercase-kebab-case, e.g. `wiki/concepts/retrieval-augmented-generation.md`.
- Links: Obsidian wikilinks by file name, e.g. `[[retrieval-augmented-generation]]`.
  Link generously — every entity or concept mentioned that has (or deserves) a page.
- Every page starts with YAML frontmatter:

  ```yaml
  ---
  type: source | entity | concept | analysis | overview
  tags: [topic-a, topic-b]
  sources: [source-page-name, ...]   # source pages this page draws on
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  ---
  ```

- Source pages also carry `raw: raw/<file>` plus `author`, `date`, and `url` when known.
- Plan and artefact pages use `type: plan` / `type: artefact` and also carry:
  `summary:` (one line, shown on the Plans/Artefacts list pages),
  `status:` (plans: `draft | active | done | dropped`), and, when a demo exists,
  `demo: <slug>` (adds an "Open the demo" button linking to `/demos/#/demos/<slug>`).
- Attribute claims: cite the source page as `([[source-page-name]])` after the claim.
- When sources disagree, keep both claims and mark it with a `> [!warning] Contradiction`
  callout naming the sources. Never silently overwrite an older claim.
- Separate what sources say from your own synthesis. Put your inferences under a
  `## Synthesis` heading or mark them with a `> [!note] Synthesis` callout.

## Workflows

### Ingest (`ingest raw/<file>`)
1. Read the source in full. If it has images in `raw/assets/`, view the relevant ones.
2. Share 3–6 key takeaways with the human and ask what to emphasize, unless they
   asked for a batch ingest.
3. Write `wiki/sources/<name>.md`: summary, key claims, notable quotes, open questions.
4. Create or update every entity and concept page the source touches (often 5–15 pages).
   Add the source to each page's `sources` list and bump `updated`.
5. Revise `wiki/overview.md` if the source changes the big picture.
6. Update `wiki/index.md` and append a log entry.

### Query
1. Read `wiki/index.md`, then drill into relevant pages. Go to `raw/` only when the
   wiki lacks the detail.
2. Answer with citations to wiki pages.
3. If the answer is a reusable analysis, offer to file it in `wiki/analyses/`
   (then update the index and log).

### Plan (`plan <thing>`)
1. Write `wiki/plans/<name>.md`: goal, background (link the concepts it builds on),
   approach, milestones, open questions. Set `status: draft`.
2. Update `wiki/index.md` and the log. Plans are public — keep secrets and
   client-confidential details out.

### Demo (`build a demo for <plan>`)
1. Create `app/src/demos/<slug>/index.tsx` (copy `starter/`) and register it in
   `app/src/demos/registry.ts` with `wikiPath: "plans/<name>/"`.
2. Add `demo: <slug>` to the plan's frontmatter.
3. Check it with `npm run lint` and `npm run build` in `app/`.

### Lint (`lint the wiki`)
Check for and report, then fix with the human's OK:
contradictions between pages, stale claims superseded by newer sources, orphan
pages (no inbound links), concepts mentioned on several pages without their own page,
broken wikilinks, index entries out of sync with files, and gaps worth a web search.
Suggest new questions and sources to pursue. Log the pass.

## index.md format

One line per page under its category heading, kept alphabetical:
`- [[page-name]] — one-line summary (N sources)`

## log.md format

Append-only, newest at the bottom. Every entry starts with a parseable header:
`## [YYYY-MM-DD] ingest | <Source title>` (or `query`, `lint`, `schema`), followed
by 1–5 bullets on what changed. `grep "^## \[" wiki/log.md | tail -5` shows recent activity.

## Published site (Jekyll)

`wiki/` and the demos app are published to https://vr009-create.github.io/VRResearch/
by `.github/workflows/pages.yml` on every push to `main` that touches them (wiki at
`/`, demos at `/demos/`). The repo is public, so everything in `wiki/` and `app/` is
public too — never write secrets, credentials, or private data into them. App
secrets go in `app/.env`, which git ignores. Demos that need a backend (e.g.
Salesforce) can't run on Pages; publish a mock-data mode instead.

- `_plugins/obsidian.rb` turns `[[wikilinks]]` into links, renders `> [!kind]` callouts,
  takes each page's title from its first `# Heading`, and builds "Linked from" backlinks.
- Keep the `permalink` lines on `index.md` (`/`), `overview.md`, and `log.md`.
- Other pages get URLs from their folder: `wiki/concepts/foo.md` → `/concepts/foo/`.
- `raw/`, `app/`, and this file are excluded from the site (`_config.yml`).
- `wiki/plans.md` and `wiki/artefacts.md` list pages automatically by `type`.
- Local preview (needs Ruby 3): build the CSS, then `bundle install && bundle exec jekyll serve`.

## UI and styling (Tailwind CSS)

Both the Jekyll site and the React app use Tailwind CSS v4 utility classes. Don't add
separate CSS files or other UI frameworks.

- **Site:** classes go in `_layouts/` and `_includes/`; the source stylesheet is
  `_tailwind/site.css` (it uses the typography plugin's `prose` for wiki content).
  CI builds it to `assets/css/site.css` with the Tailwind standalone CLI.
- **App:** classes go directly in JSX; `app/src/index.css` only imports Tailwind.
- Shared look: `stone` neutrals, `blue` accent, every component styled for both
  light and `dark:` modes, layouts that work at phone width.

## Git

The wiki is a git repo. After an ingest or lint pass, offer to commit with a message
like `ingest: <source title>`. Don't push unless asked.

## Evolving this schema

This file is meant to change. When a convention isn't working, propose an edit,
apply it once the human agrees, and log it as a `schema` entry.
