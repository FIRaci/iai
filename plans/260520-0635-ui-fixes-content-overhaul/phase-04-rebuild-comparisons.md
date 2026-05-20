---
phase: 4
title: "Rebuild comparison section"
status: pending
priority: P2
effort: "2h"
dependencies: ["02"]
---

# Phase 04: Rebuild Comparison Section

## Overview
Fix the "So sánh" (Comparisons) section: add children to sidebar nav group, create comparison content files, ensure CategoryPage renders comparisons correctly.

## Requirements
- Sidebar "So sánh" group must show comparison entries as children
- CategoryPage `/comparisons` must render comparison grid
- Each comparison must have proper MDX content with tables and Mermaid diagrams
- At least 5 comparison topics covering major tool categories

## Architecture
Current state:
- Sidebar has `comparisons` group with empty `children: []` (line 705)
- Only 1 comparison file exists: `comparisons/ai-coding-tools.mdx`
- CategoryPage has config for `comparisons` but it may be stale

Solution:
1. Add comparison entries to sidebar children
2. Create 4+ new comparison MDX files
3. Verify CategoryPage config for comparisons

### Planned comparisons:
| File | Title | Tools Compared |
|------|-------|---------------|
| `ai-coding-tools.mdx` | AI Coding Tools | Cursor, Copilot, Claude Code, Windsurf, Devin, etc. |
| `ai-chat-models.mdx` | AI Chat Models | ChatGPT, Claude, Gemini, DeepSeek, etc. |
| `vector-databases.mdx` | Vector Databases | Pinecone, Qdrant, Milvus, Weaviate, Chroma |
| `llm-runtimes.mdx` | LLM Runtimes | Ollama, vLLM, TGI, LM Studio, etc. |
| `frontend-frameworks.mdx` | Frontend Frameworks | React, Vue, Svelte, Angular, etc. |
| `backend-frameworks.mdx` | Backend Frameworks | Express, FastAPI, Django, NestJS, etc. |

## Related Code Files
- Modify: `src/components/layout/Sidebar.tsx` (add children to comparisons group)
- Create: `src/content/comparisons/ai-chat-models/index.mdx`
- Create: `src/content/comparisons/vector-databases/index.mdx`
- Create: `src/content/comparisons/llm-runtimes/index.mdx`
- Create: `src/content/comparisons/frontend-frameworks/index.mdx`
- Create: `src/content/comparisons/backend-frameworks/index.mdx`
- Modify: `src/pages/CategoryPage.tsx` (verify comparisons config)
- Read: `src/data/comparison-data.ts` (if exists)

## Implementation Steps
1. Read existing `comparisons/ai-coding-tools.mdx` for format reference
2. Add comparison children to Sidebar.tsx navItems
3. Create 5 new comparison MDX files with tables, Mermaid diagrams, recommendations
4. Verify CategoryPage config for comparisons
5. Test: navigate to `/comparisons` — should show grid of comparisons
6. Test: click each comparison — should render with tables and diagrams

## Success Criteria
- [ ] Sidebar "So sánh" shows 6 comparison children
- [ ] `/comparisons` page renders grid of 6 comparisons
- [ ] Each comparison page has comparison table, Mermaid diagram, recommendations
- [ ] All comparison pages render without errors
- [ ] Build passes

## Risk Assessment
- **Risk**: Comparison data might need external data file
- **Mitigation**: Embed comparison data directly in MDX frontmatter or as component props
