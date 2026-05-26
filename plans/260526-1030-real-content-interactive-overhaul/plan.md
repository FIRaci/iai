# Plan: Real Content Overhaul + Interactive Features

**Status:** completed
**Created:** 2026-05-26
**Completed:** 2026-05-26
**Phases:** 4

## Summary
Replaced 740 placeholder MDX files with real content for 58 top tools, synced sidebar dynamically, added interactive features (helpful feedback, loading skeletons, print styles, difficulty filters), and added trust signals (author, last-updated, version, JSON-LD).

## Phases

| Phase | Name | Status | Priority |
|-------|------|--------|----------|
| 1 | Real Content for Top 52 Tools | completed | P1 |
| 2 | Dynamic Sidebar Sync + Dedup | completed | P1 |
| 3 | Interactive Features Suite | completed | P2 |
| 4 | Trust & Credibility Signals | completed | P2 |

## Key Dependencies
- Phase 2 depends on Phase 1 (content structure may change)
- Phase 3 is independent
- Phase 4 depends on Phase 1 for accurate content to annotate

## Files of Interest
- `src/content/**/index.mdx` — 774 MDX files to update
- `src/components/layout/Sidebar.tsx` — 655 lines, hardcoded nav
- `src/content/vector-db/` and `src/content/vector-databases/` — duplicate
- `src/content/data-datasets/` and `src/content/data-processing/` — partial dup
- `src/components/SearchDialog.tsx` — add difficulty/tag filters
- `src/pages/CategoryPage.tsx` — tag filtering, empty state
- `src/pages/ToolGuide.tsx` — add helpful feedback, last-updated, author
- `src/components/TagFilter.tsx` — improve filter UI
- `src/components/blocks/CodeBlock.tsx` — add print styles
- `src/index.css` — add print media queries
- `src/lib/icons.ts` — 525 lines, icon mapping
- `src/lib/content-loader.ts` — dynamic content tree source
