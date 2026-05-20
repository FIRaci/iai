---
phase: 3
title: "Fix Mermaid diagram rendering"
status: pending
priority: P1
effort: "1h"
dependencies: []
---

# Phase 03: Fix Mermaid Diagram Rendering

## Overview
Fix MermaidDiagram component that shows raw text instead of rendered diagrams. Issues: re-initialization on every render, ID collisions in StrictMode, no theme change re-render.

## Requirements
- Mermaid diagrams must render as SVG, not raw text
- Diagrams must update when theme changes
- No ID collisions in React StrictMode
- No performance degradation from repeated initialization

## Architecture
Current problems in `MermaidDiagram.tsx`:

1. **Re-initialization**: `mermaid.initialize()` called on every render (line 28) — should be called once
2. **ID collisions**: Module-level `mermaidId` counter (line 4) — StrictMode double-mount causes duplicates
3. **No theme listener**: Diagrams don't re-render when theme changes (line 26 reads theme once)
4. **Global cleanup**: `document.querySelectorAll('[id^="mermaid-"]')` (line 75) affects other instances

Solution:
1. Use `useRef` to track if mermaid is initialized — initialize only once
2. Use `crypto.randomUUID()` or `Date.now()` for unique IDs per instance
3. Add `useEffect` listener for theme class changes on `<html>`
4. Scope cleanup to component's own container only

## Related Code Files
- Modify: `src/components/blocks/MermaidDiagram.tsx` (full rewrite of rendering logic)
- Read: `src/pages/ToolGuide.tsx` (how MermaidDiagram is registered)
- Read: `src/pages/PageView.tsx` (how MermaidDiagram is registered)

## Implementation Steps
1. Read MermaidDiagram.tsx fully
2. Refactor: use `useRef` for initialization flag, unique ID per instance
3. Add `MutationObserver` or theme change listener for re-rendering
4. Scope cleanup to component container only
5. Test: view pages with Mermaid diagrams (Claude Code, Cursor, Copilot, etc.)
6. Test: switch theme while viewing Mermaid diagram — should update

## Success Criteria
- [ ] All Mermaid diagrams render as SVG
- [ ] No ID collision errors in console
- [ ] Diagrams update on theme change
- [ ] No performance issues with multiple diagrams on same page
- [ ] Build passes

## Risk Assessment
- **Risk**: Mermaid library version might have API changes
- **Mitigation**: Check package.json for mermaid version, use compatible API
