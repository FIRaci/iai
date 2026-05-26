---
phase: 4
title: "Trust & Credibility Signals"
status: pending
priority: P2
---

# Phase 4: Trust & Credibility Signals

## Overview
Add trust-building elements to make the site authoritative: author/byline, last-updated dates from frontmatter, external references section, version/changelog tracking, and content completeness indicators.

## Features

### 4a: Author & Last-Updated
- Show "Cập nhật lần cuối: DD/MM/YYYY" from MDX frontmatter `lastUpdated` field in ToolGuide
- Show author name from frontmatter (default "IAI Team")
- Parse frontmatter in ToolGuide.tsx render

### 4b: External References Section
- Add "Tài liệu tham khảo" section at bottom of tool guides
- Parse from MDX content or frontmatter `references` field
- Show as styled link cards

### 4c: Content Completeness Indicator
- Show badge: "Hướng dẫn đầy đủ" vs "Đang cập nhật" based on content quality score
- Quality scoring: has real install commands? has usage examples? has troubleshooting?

### 4d: Version/Changelog
- Track content updates in `CHANGELOG.md`
- Show version number in footer ("v1.2.0")

## Related Code Files
- Modify: `src/pages/ToolGuide.tsx` — add lastUpdated display, author, references
- Modify: `src/lib/content-loader.ts` — expose frontmatter fields
- Modify: `src/content/*/index.mdx` — add lastUpdated, references to frontmatter
- Modify: `src/components/layout/Footer.tsx` — add version number
- Create: `CHANGELOG.md` — track updates

## Implementation Steps
1. Update content-loader to expose frontmatter fields (lastUpdated, references)
2. In ToolGuide.tsx, render lastUpdated and author below page title
3. Add references section from frontmatter `references` array
4. Add content completeness badge logic
5. Create CHANGELOG.md with current state
6. Add version display to footer
7. Build and verify

## Success Criteria
- [ ] lastUpdated date visible on all tool guides
- [ ] Author name displayed on guides
- [ ] External references show as styled links
- [ ] Content completeness badge indicates guide quality
- [ ] Version visible in footer
- [ ] Build passes
