---
phase: 1
title: "Remove theme transition lag"
status: pending
priority: P1
effort: "30m"
dependencies: []
---

# Phase 01: Remove Theme Transition Lag

## Overview
Remove expensive global CSS transitions that cause UI lag during theme switching. Target only the `theme-transition-ready` class in `index.css`.

## Requirements
- Theme switching must be instant (no lag, no freeze)
- Visual appearance must remain correct in all 3 themes (light, dark, star)
- No FOUC (flash of unstyled content) on page load

## Architecture
Current problem: `index.css:806-822` applies transitions to `*, *::before, *::after` — this forces the browser to compute transitions for every single element on the page, causing massive repaint/reflow during theme switch.

Solution: Remove the global `*` selector. Keep transitions only on elements that actually need them (sidebar links, cards, buttons, toggles).

## Related Code Files
- Modify: `src/index.css` (lines 805-822)
- Modify: `src/hooks/useTheme.ts` (remove transition class toggle if no longer needed)
- Modify: `src/main.tsx` (remove requestAnimationFrame transition setup)

## Implementation Steps
1. Read `src/index.css` lines 805-822
2. Remove the `*, *::before, *::after` transition block entirely
3. Read `src/hooks/useTheme.ts` — remove `theme-transition-ready` class toggle logic
4. Read `src/main.tsx` — remove `requestAnimationFrame` transition setup
5. Verify star theme `::before/::after` animations still work (they don't need transitions)
6. Test: switch between light/dark/star themes — should be instant

## Success Criteria
- [ ] Theme switch is instant (no lag, no freeze)
- [ ] All 3 themes render correctly
- [ ] No FOUC on page load
- [ ] Star theme background animation still works
- [ ] Build passes

## Risk Assessment
- **Risk**: Removing transitions might make theme switch feel abrupt
- **Mitigation**: Keep targeted transitions on specific elements (sidebar links, cards) — these are cheap and don't cause lag
