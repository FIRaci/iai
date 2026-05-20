# Content Fill Plan - 623 Empty Pages

## Overview
- **Priority**: Critical - 82% of pages are empty or incomplete
- **Status**: In Progress
- **Scope**: 623 MDX files missing Install/Usage sections

## Problem
547 pages contain ONLY a generic overview + external links. Users click and see nothing useful.

## Content Template (per page)
```mdx
---
title: "Tool Name"
category: "category"
icon: "icon"
difficulty: "level"
tags: ["tag1", "tag2"]
---

## Tổng quan
<Note type="info">
**Tool Name** là mô tả ngắn gọn bằng tiếng Việt.
</Note>

## Cài đặt
<CodeBlock language="powershell" code={`install command`} />

## Sử dụng
<CodeBlock language="powershell" code={`usage example`} />

## Tips
<Note type="tip">
**Tip:** Mẹo sử dụng hiệu quả.
</Note>

## Liên kết
- [Tool Name](https://tool.com)
```

## Execution Strategy
1. **Batch by category** - Process 10-20 files per batch
2. **AI-generated content** - Research each tool and generate Vietnamese content
3. **Build verification** - Run `npm run build` after each batch
4. **Commit after each batch** - Keep git history clean

## Batches
| Batch | Category | Files | Status |
|-------|----------|-------|--------|
| 1 | ai-tools | 163 | Pending |
| 2 | other-tools | 121 | Pending |
| 3 | frontend | 40 | Pending |
| 4 | backend | 37 | Pending |
| 5 | package-managers | 18 | Pending |
| 6 | windows-setup | 10 | Pending |
| 7 | Remaining (10+ categories) | 234 | Pending |

## Success Criteria
- All 623 files have Install + Usage sections
- Build passes cleanly
- No broken links or syntax errors
- Content is accurate and useful in Vietnamese

## Risk Assessment
- **Content accuracy**: AI may generate incorrect install commands - verify critical tools
- **Token limits**: Process in small batches to avoid context overflow
- **Build breaks**: Verify after each batch
