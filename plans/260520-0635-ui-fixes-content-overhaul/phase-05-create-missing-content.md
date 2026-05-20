---
phase: 5
title: "Create missing content placeholders"
status: pending
priority: P2
effort: "3h"
dependencies: []
---

# Phase 05: Create Missing Content Placeholders

## Overview
Create minimal placeholder MDX files for all sidebar items that currently have no content. This ensures every sidebar link leads to a valid page instead of a 404.

## Requirements
- Every sidebar nav item must have a corresponding MDX file
- Placeholder content must include: title, overview, links to official docs
- Content must follow existing MDX format conventions
- No broken links in sidebar

## Architecture
Current gaps (sidebar items with no MDX):

### Critical (0 content):
| Directory | Sidebar Items | Missing |
|-----------|--------------|---------|
| `ai-creative/` | 33 items | ALL — directory doesn't exist |
| `ml-training/` | 31 items | ALL — directory doesn't exist |

### Partial (some content):
| Directory | Sidebar Items | Existing | Missing |
|-----------|--------------|----------|---------|
| `databases/` | 33 | 6 | 27 |
| `dev-tools/` | 48 | 20 | 28 |
| `backend/` | 48 | 37 | 11 |
| `llm-runtimes/` | 43 | 29 | 14 |
| `cloud/` | 19 | 8 | 11 |
| `evaluation/` | 12 | 6 | 6 |
| `observability/` | 14 | 9 | 5 |
| `security/` | 13 | 8 | 5 |
| `devops/` | 18 | 9 | 9 |
| `search/` | 12 | 7 | 5 |

### Placeholder template:
```mdx
---
title: "{Tool Name}"
category: "{category}"
icon: "{icon}"
difficulty: "beginner"
tags: ["{tag1}", "{tag2}"]
---

## Tổng quan

<Note type="info">
**{Tool Name}** là công cụ {category}. Xem tài liệu chính thức để biết chi tiết.
</Note>

## Liên kết

- [{Tool Name} Official]({official-url})
- [{Tool Name} Documentation]({docs-url})
```

## Related Code Files
- Create: `src/content/ai-creative/*/index.mdx` (33 files)
- Create: `src/content/ml-training/*/index.mdx` (31 files)
- Create: `src/content/databases/*/index.mdx` (27 files)
- Create: `src/content/dev-tools/*/index.mdx` (28 files)
- Create: `src/content/backend/*/index.mdx` (11 files)
- Create: `src/content/llm-runtimes/*/index.mdx` (14 files)
- Create: `src/content/cloud/*/index.mdx` (11 files)
- Create: `src/content/evaluation/*/index.mdx` (6 files)
- Create: `src/content/observability/*/index.mdx` (5 files)
- Create: `src/content/security/*/index.mdx` (5 files)
- Create: `src/content/devops/*/index.mdx` (9 files)
- Create: `src/content/search/*/index.mdx` (5 files)

Total: ~190 new MDX files

## Implementation Steps
1. Read Sidebar.tsx navItems to get complete list of all items per category
2. Read existing MDX files in each directory to understand format
3. Create directories that don't exist (ai-creative, ml-training)
4. Generate placeholder MDX files for all missing items using script
5. Verify all sidebar paths have corresponding MDX files
6. Test: click every sidebar link — should render page, not 404

## Success Criteria
- [ ] All 500+ sidebar items have MDX files
- [ ] No 404 errors when clicking sidebar links
- [ ] All placeholder files follow consistent format
- [ ] Build passes
- [ ] Dev server loads all pages without errors

## Risk Assessment
- **Risk**: 190 files is a lot — might hit rate limits or take too long
- **Mitigation**: Use batch script to generate files, process in chunks of 20
- **Risk**: Some tool names might not have official URLs
- **Mitigation**: Use search URL pattern (e.g., `https://google.com/search?q={tool}`)
