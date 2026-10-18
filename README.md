# VRResearch

A research knowledge base maintained by an LLM, following the
[LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f),
with plans, artefacts, and working demos.

**Site:** https://vr009-create.github.io/VRResearch/ · **Demos:** https://vr009-create.github.io/VRResearch/demos/

- `raw/` — source documents (immutable)
- `wiki/` — LLM-written pages: concepts, entities, sources, plans, artefacts. Start at `wiki/index.md`
- `app/` — React demos app (Vite, TypeScript, Tailwind CSS)
- `CLAUDE.md` — the schema: conventions and workflows the LLM follows

## Using it

Open this folder in Claude Code and in [Obsidian](https://obsidian.md) (as a vault).

- **Ingest:** drop a file into `raw/`, then tell Claude `ingest raw/<file>`.
- **Plan:** `plan <idea>` writes a plan page that's published on the site.
- **Demo:** `build a demo for <plan>` adds a demo to the React app.
- **Lint:** `lint the wiki` checks for contradictions, orphans, and gaps.

Pushing to `main` republishes the site and demos automatically.

## Running the demos locally

```sh
cd app
npm install
npm run dev
```
