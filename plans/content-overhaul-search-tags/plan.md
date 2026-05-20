# Plan: Content Overhaul + Search System + Quality Improvements

## Overview
Remove ClaudeKit, add 6 new IDEs, make search dynamic, fix tags, improve content quality across the site.

## Phase 1: Remove ClaudeKit
**Files to modify:**
- Delete `src/content/ai-tools/claude-kit/index.mdx`
- `src/components/layout/Sidebar.tsx` — remove ClaudeKit from AI Coding group
- `src/components/SearchDialog.tsx` — remove ClaudeKit search item
- `src/data/comparison-data.tsx` — remove ClaudeKit from comparison rows/columns
- `src/lib/icons.ts` — remove claude-kit icon mapping
- `src/pages/ToolGuide.tsx` — remove claude-kit gradient
- `src/content/ai-tools/claude-code/index.mdx` — remove link to ClaudeKit if any
- `src/content/pages/getting-started.mdx` — remove ClaudeKit reference

## Phase 2: Add 6 New IDEs
**New MDX files to create:**
- `src/content/dev-tools/antigravity/index.mdx` — Antigravity (AI IDE)
- `src/content/dev-tools/zed/index.mdx` — Zed (Rust-based editor)
- `src/content/dev-tools/sublime-text/index.mdx` — Sublime Text
- `src/content/dev-tools/webstorm/index.mdx` — WebStorm
- `src/content/dev-tools/android-studio/index.mdx` — Android Studio
- `src/content/dev-tools/pycharm/index.mdx` — PyCharm

**Files to modify:**
- `src/components/layout/Sidebar.tsx` — add new IDEs to Dev Essentials or new "IDEs & Editors" group
- `src/lib/icons.ts` — add icon mappings for all 6 new tools
- `src/pages/ToolGuide.tsx` — add gradients for all 6 new tools
- `src/components/PageTags.tsx` — add tag configs for new tags (rust, jetbrains, mobile, python, ai-ide)
- `src/data/comparison-data.tsx` — optionally add new IDEs to comparison

## Phase 3: Dynamic Search System
**Rewrite `src/components/SearchDialog.tsx`:**
- Load search items dynamically from `getContentTree()` instead of hardcoded array
- Index: title, category, tags, difficulty
- Search by title AND tags simultaneously
- Group results by category
- Auto-sync: new MDX content appears in search automatically

## Phase 4: Fix Tag System
**Modify `src/components/PageTags.tsx`:**
- Add missing tag colors for all tags used in MDX frontmatter:
  - openai, chatbot, ai-art, creative, game-assets, gen-2, research, multimodal
  - workspace, marketing, content, text-to-speech, audio, devops, rest, graphql
  - ui-ux, collaboration, development, powershell, scripting, windows, productivity
  - nosql, mongodb, sql, postgresql, rust, jetbrains, mobile, python, ai-ide
- Ensure every tag in every MDX file has a colored badge (no fallback gray)

## Phase 5: Fix Icon Mismatches
**Modify `src/lib/icons.ts`:**
- Fix `windows-terminal` icon (MDX says layout-grid, code says Terminal)
- Fix `vscode` icon (MDX says code, code says Monitor)
- Ensure all icon imports exist in lucide-react
- Add 6 new icon mappings for new IDEs

## Phase 6: Content Quality Improvements
**Review and enhance all MDX files:**
- Ensure each tool has: clear overview, what it's for, pros/cons, tips, troubleshooting
- Standardize structure across all files
- Fix any broken links
- Add missing difficulty levels where appropriate
- Ensure tags are meaningful and consistent

## Phase 7: Build, Test, Deploy
- Run `pnpm run build` — verify no errors
- Deploy to Vercel production
- Verify on live site

## Acceptance Criteria
1. ClaudeKit completely removed — no references anywhere
2. 6 new IDEs added with full MDX content, icons, gradients, tags
3. Search loads dynamically from content tree — no hardcoded items
4. All tags have colored badges — zero gray fallback tags
5. All icon mappings correct and consistent with MDX frontmatter
6. Build passes with zero errors
7. Deployed to production successfully

## Out of Scope
- Adding 15+ more tools beyond the 6 IDEs
- Custom SVG/PNG icons (using Lucide only)
- Major redesign of page layouts
- Adding advanced difficulty level content
