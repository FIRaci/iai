---
phase: 1
title: "Real Content for Top 52 Tools"
status: pending
priority: P1
---

# Phase 1: Real Content for Top 52 Tools

## Overview
Replace placeholder template MDX content with accurate, detailed install guides for the 52 most popular tools. Each guide includes: real overview, Windows 11 install commands (winget/choco/scoop/exe), usage examples, verification steps, and official docs links.

## Requirements
- Each tool guide must have: accurate overview, real Windows 11 install steps, usage example, verification step, official docs URL
- Cross-link to related tools (WSL, Windows Terminal, VS Code) where relevant
- Remove "Nội dung đang được xây dựng..." placeholder pattern
- Keep Vietnamese language for descriptions, keep commands in English
- Add `lastUpdated` frontmatter field with actual date

## Tools to Write (52 total)

### Tier 1: AI Coding (9 tools)
Cursor, GitHub Copilot, Windsurf, Claude Desktop, Claude Code CLI, Continue, Aider, Cline, OpenHands

### Tier 2: Local LLM (6 tools)
Ollama, LM Studio, Open WebUI, GPT4All, ComfyUI, text-generation-webui

### Tier 3: IDEs (6 tools)
VS Code, WebStorm, PyCharm, Sublime Text, Zed, Neovim

### Tier 4: Runtimes & Package Managers (10 tools)
Node.js, Git, npm, pnpm, Bun, Python/pip, Chocolatey, Scoop, Winget, WSL

### Tier 5: Terminals & Utilities (5 tools)
Windows Terminal, PowerShell 7, Postman, Figma, GitHub Desktop

### Tier 6: Frameworks (7 tools)
Next.js, TypeScript, Vite, FastAPI, Django, Supabase, Prisma

### Tier 7: Databases & Infra (6 tools)
PostgreSQL, Redis, DBeaver, Docker Desktop, Kubernetes/kubectl, Terraform

### Tier 8: Testing & Tools (3 tools)
Playwright, FFmpeg, OBS Studio

## Related Code Files
- Modify: `src/content/*/tool-name/index.mdx` (52 files)
- Modify: `src/lib/content-loader.ts` — add lastUpdated support if needed

## Implementation Steps
1. For each tool, write MDX content following the template below
2. Add accurate frontmatter (title, category, difficulty, tags, lastUpdated)
3. Write overview section with real description
4. Write Cài đặt section with real Windows 11 install commands
5. Write Sử dụng section with real usage examples
6. Add troubleshooting notes where applicable
7. Link to official documentation
8. Build and verify no errors

## Content Template
```mdx
---
title: "Tool Name"
category: "category"
tags: ["tag1", "tag2"]
difficulty: "beginner|intermediate|advanced"
lastUpdated: "2026-05-26"
---

## Tổng quan

Real 2-3 sentence description of what this tool does and why it matters.

## Cài đặt

Real Windows 11 install steps with proper command(s).

<CodeBlock language="powershell" code={`winget install ToolName`} />

## Sử dụng

Real usage examples.

<CodeBlock language="powershell" code={`tool-name --help`} />

## Xác minh cài đặt

<CodeBlock language="powershell" code={`tool-name --version`} />

## Tài liệu tham khảo

- [Official Documentation](https://docs.example.com)

## Lưu ý

Any troubleshooting tips specific to Windows 11.
```

## Success Criteria
- [ ] 52 tool guides have accurate Windows 11 install instructions
- [ ] No remaining "Nội dung đang được xây dựng" in any updated file
- [ ] All guides pass build (npm run build)
- [ ] Cross-links to WSL, Windows Terminal, VS Code where applicable
