---
phase: 3
title: "Interactive Features Suite"
status: pending
priority: P2
---

# Phase 3: Interactive Features Suite

## Overview
Add interactive elements to increase user engagement: helpful feedback widget, difficulty/tag search filters, loading skeletons, print-friendly styles, and tool comparison wizard.

## Features

### 3a: Helpful Feedback Widget
- Thumbs up/down at bottom of each ToolGuide page
- Store in localStorage (per path, per session)
- Show aggregate "X người thấy hữu ích" count
- No backend needed

### 3b: Loading Skeletons
- Replace spinner in `PageLoader` with skeleton cards matching actual layout
- Add skeleton for CategoryPage grid items
- Add skeleton for ToolGuide content area

### 3c: Print-Friendly Styles
- Add `@media print` CSS in `index.css`
- Hide sidebar, header, footer, TOC, back-to-top, feedback when printing
- Show full content with readable font sizes
- Add URL printout at bottom

### 3d: Difficulty/Tag Filters in Search
- Already has category filter pills — add difficulty filter (Beginner/Intermediate/Advanced)
- Add tag filter option in search dialog

## Related Code Files
- Modify: `src/pages/ToolGuide.tsx` — add feedback widget after content
- Modify: `src/components/SearchDialog.tsx` — add difficulty/tag filters
- Create: `src/components/FeedbackWidget.tsx` — new component
- Modify: `src/App.tsx` — replace PageLoader with skeleton
- Modify: `src/index.css` — add print styles
- Modify: `src/pages/CategoryPage.tsx` — add skeleton loading
- Modify: `src/components/blocks/CodeBlock.tsx` — print-friendly code display

## Implementation Steps
1. Create FeedbackWidget component with localStorage persistence
2. Add to ToolGuide.tsx between content and related articles
3. Add loading skeleton components
4. Replace spinner in App.tsx with skeletons
5. Add print media queries to index.css
6. Add difficulty filter buttons to SearchDialog
7. Build and verify

## Success Criteria
- [ ] Feedback thumbs up/down works per page, persists in localStorage
- [ ] Loading skeletons replace spinner during page transitions
- [ ] Print styles hide nav elements, show clean content
- [ ] Search dialog filters by difficulty (beginner/intermediate/advanced)
- [ ] Build passes
