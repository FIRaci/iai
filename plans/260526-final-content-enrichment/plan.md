# Plan: Final Content Enrichment + CategoryPage Cleanup

**Status:** pending
**Created:** 2026-05-26
**Phases:** 5

## Summary
Enrich all remaining placeholder MDX files (56 files) with real Vietnamese content, fix CategoryPage missing descriptions, build verify, code review, and commit.

## Phases

| Phase | Name | Status | Priority |
|-------|------|--------|----------|
| 1 | Enrich comparisons/ (6 files) | pending | P0 |
| 2 | Enrich backend/ (34 files) | pending | P0 |
| 3 | Enrich cloud/ (8 files) + ai-services/ (4) + deployment/ (4) | pending | P0 |
| 4 | Fix CategoryPage descriptions | pending | P1 |
| 5 | Build + code review + commit | pending | P0 |

## Content Template
All enriched files follow existing pattern:
- Vietnamese overview describing the tool
- Real install commands (winget/choco/pip/npm)
- Real usage examples
- Verification section
- Tips/warnings
- Reference links
- CodeBlock with `code={``}` syntax (NO backticks, NO `${}`, NO `\"`)

## Touchpoints
- `src/content/comparisons/*.mdx` and `*/index.mdx` — 6 files
- `src/content/backend/*/index.mdx` — 34 files
- `src/content/cloud/*/index.mdx` — 8 files
- `src/content/ai-services/*/index.mdx` — 4 files
- `src/content/deployment/*/index.mdx` — 4 files
- `src/pages/CategoryPage.tsx` — catDescriptions additions

## Key Dependencies
- Parallel enrichment possible across categories
- Build verify after all enrichment
- Code review after build passes

## Risk Assessment
- Build breaks from MDX syntax errors in template literals — mitigated by strict `code={``}` rule
- Vietnamese diacritics corruption from copy-paste — mitigated by direct file writes
