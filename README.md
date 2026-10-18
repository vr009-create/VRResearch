# VRResearch

A personal research knowledge base maintained by an LLM, following the
[LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

- `raw/` — source documents (immutable)
- `wiki/` — LLM-written pages; start at `wiki/index.md`
- `CLAUDE.md` — the schema: conventions and workflows the LLM follows

## Using it

Open this folder in Claude Code and in [Obsidian](https://obsidian.md) (as a vault).

- **Ingest:** drop a file into `raw/`, then tell Claude `ingest raw/<file>`.
- **Query:** ask a question; good answers get filed into `wiki/analyses/`.
- **Lint:** say `lint the wiki` to check for contradictions, orphans, and gaps.
