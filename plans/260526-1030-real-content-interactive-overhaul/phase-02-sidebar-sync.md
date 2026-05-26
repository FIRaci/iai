---
phase: 2
title: "Dynamic Sidebar Sync + Dedup"
status: pending
priority: P1
---

# Phase 2: Dynamic Sidebar Sync + Dedup

## Overview
Sync sidebar dynamically from `getContentTree()` and remove duplicate content directories. Currently Sidebar.tsx has 655 lines of hardcoded navItems showing only 17 groups, while content has 53 directories — 36 categories are invisible.

## Requirements
- Replace hardcoded `navItems` array in Sidebar.tsx with auto-generated navigation from `getContentTree()`
- Remove duplicate directories: `vector-db/` (keep `vector-databases/`), dedup `data-datasets/` vs `data-processing/`
- Remove duplicate tool entries across categories (e.g., aider, opencode in both ai-tools and llm-runtimes)
- Maintain category icons, tool icons, and expand/collapse behavior
- Keep mobile sheet sidebar working

## Related Code Files
- Modify: `src/components/layout/Sidebar.tsx` — replace navItems with dynamic generation
- Delete: `src/content/vector-db/` — move unique tools to vector-databases if any
- Modify: `src/components/layout/Breadcrumbs.tsx` — replace hardcoded labels with dynamic
- Modify: `src/pages/CategoryPage.tsx` — remove or sync hardcoded categoryConfig

## Implementation Steps
1. Audit duplicate directories: vector-db vs vector-databases, data-datasets vs data-processing
2. Remove `src/content/vector-db/` (keep only `vector-databases/`)
3. In Sidebar.tsx, replace `navItems` with a derived array from `getContentTree()`
4. Preserve expand/collapse state, icons, active page highlighting
5. Update Breadcrumbs.tsx to use dynamic category titles from content-loader
6. Update CategoryPage.tsx to get config from content-loader instead of hardcoded config
7. Build and verify all nav links work

## Success Criteria
- [ ] Sidebar shows all 53 categories automatically (no hardcoded groups)
- [ ] No duplicate content directories in content/
- [ ] Breadcrumbs show correct labels for all categories
- [ ] CategoryPage renders correctly for previously-hidden categories
- [ ] Build passes with no broken links
