---
title: "UI Fixes & Content Overhaul"
status: pending
created: "2026-05-20"
phases:
  - id: "01"
    title: "Remove theme transition lag"
    status: pending
  - id: "02"
    title: "Sync CategoryPage with sidebar categories"
    status: pending
  - id: "03"
    title: "Fix Mermaid diagram rendering"
    status: pending
  - id: "04"
    title: "Rebuild comparison section"
    status: pending
  - id: "05"
    title: "Create missing content placeholders"
    status: pending
---

# Plan: UI Fixes & Content Overhaul

## Overview
Fix 5 critical UI/content issues reported by user: theme lag, category mismatch, broken Mermaid, missing comparisons, and incomplete content.

## Key Issues

### 1. Theme Transition Lag (CRITICAL)
- `index.css:806-822` applies `transition` to `*, *::before, *::after` — forces browser to animate EVERY element on theme switch
- Star theme `::before/::after` pseudo-elements with 30+ radial gradients cause GPU jank
- Fix: Remove global `*` transitions, keep only targeted element transitions

### 2. CategoryPage Missing Categories (HIGH)
- Sidebar has 23 nav groups; CategoryPage only has 16 configs
- 12 categories show "Không tìm thấy danh mục" when clicked
- Missing: frontend, backend, ai-creative, video, visualization, databases, ml-training, cloud, evaluation, testing, devops, search, package-managers, utilities, documentation, notebooks, windows-setup
- Fix: Add all missing category configs to CategoryPage

### 3. Mermaid Diagrams Broken (HIGH)
- MermaidDiagram.tsx re-initializes `mermaid.initialize()` on every render
- Module-level `mermaidId` counter causes ID collisions in React StrictMode
- No theme change re-render mechanism
- Fix: Initialize once, fix ID generation, add theme listener

### 4. Comparison Section Missing (MEDIUM)
- Sidebar shows "So sánh" with 0 children
- Only 1 comparison file exists: `comparisons/ai-coding-tools.mdx`
- Fix: Add comparison entries to sidebar, create more comparison content

### 5. Missing Content (MEDIUM)
- Many sidebar items have no MDX files: ai-creative (0/33), ml-training (0/31), databases (6/33), dev-tools (20/48), backend (37/48), llm-runtimes (29/43)
- Fix: Create minimal placeholder MDX files for all missing items

## Related Code Files
- Modify: `src/index.css` (theme transitions)
- Modify: `src/pages/CategoryPage.tsx` (category configs)
- Modify: `src/components/layout/Sidebar.tsx` (comparison children)
- Modify: `src/components/blocks/MermaidDiagram.tsx` (rendering)
- Create: `src/content/ai-creative/*/index.mdx` (33 files)
- Create: `src/content/ml-training/*/index.mdx` (31 files)
- Create: `src/content/databases/*/index.mdx` (27 files)
- Create: `src/content/dev-tools/*/index.mdx` (28 files)
- Create: `src/content/backend/*/index.mdx` (11 files)
- Create: `src/content/llm-runtimes/*/index.mdx` (14 files)
- Create: `src/content/comparisons/*.mdx` (additional files)

## Dependencies
- Phase 01 must complete before others (CSS changes affect all pages)
- Phase 02 and 03 are independent
- Phase 04 depends on 02 (comparison needs category config)
- Phase 05 is independent bulk work

## Risk Assessment
- **Low risk**: CSS changes are isolated, category configs are additive
- **Medium risk**: Mermaid re-render could affect existing diagrams — need to test
- **Low risk**: Placeholder content is additive, won't break existing pages
