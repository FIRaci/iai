#!/usr/bin/env python3
"""Create content for new AI tools."""

import os
from pathlib import Path

TOOLS = {
    "gemini-cli": {
        "title": "Gemini CLI",
        "icon": "terminal",
        "tags": '["cli", "free", "google"]',
        "overview": "là AI agent cho terminal từ Google. Powered by Gemini 3.5 Flash, hỗ trợ code understanding, file manipulation, và command execution.",
        "install": "npm install -g @anthropic-ai/gemini-cli\ngemini login",
        "usage": """# Start Gemini CLI
gemini

# Ask questions hoặc yêu cầu
"Explain this codebase"
"Refactor the auth module"
"Run tests and fix failures" """,
        "tips": "**Free tier:** Gemini CLI có free tier với usage limits cao.",
        "links": ["Gemini CLI|https://ai.google.dev/gemini-api/docs/cli", "GitHub|https://github.com/google-gemini/gemini-cli"]
    },
    "junie": {
        "title": "JetBrains Junie",
        "icon": "code",
        "tags": '["ide", "jetbrains", "agent"]',
        "overview": "là AI coding agent từ JetBrains. Tích hợp sâu với IntelliJ, PyCharm, WebStorm. Hỗ trợ multi-model với BYOK approach.",
        "install": "# Cài từ JetBrains Marketplace hoặc bundled với JetBrains AI",
        "usage": """# Trong JetBrains IDE:
# 1. Mở Junie tool window
# 2. Describe task bằng natural language
# 3. Junie sẽ analyze codebase và propose changes
# 4. Review và apply changes""",
        "tips": "**BYOK:** Junie CLI hỗ trợ Bring Your Own Key cho OpenAI, Anthropic, Google models.",
        "links": ["Junie|https://www.jetbrains.com/junie", "Docs|https://www.jetbrains.com/help/junie"]
    },
    "tabnine": {
        "title": "Tabnine",
        "icon": "sparkles",
        "tags": '["ide", "enterprise", "privacy"]',
        "overview": "là AI coding assistant tập trung vào privacy và enterprise. On-premise deployment, code never leaves infrastructure. Hỗ trợ 40+ IDEs.",
        "install": "# Cài extension từ VS Code Marketplace hoặc JetBrains",
        "usage": """# Sau khi cài extension:
# 1. Sign in với Tabnine account
# 2. AI sẽ tự động suggest code khi gõ
# 3. Tab để accept suggestions
# 4. Configure team policies trong dashboard""",
        "tips": "**On-premise:** Tabnine Enterprise hỗ trợ full on-premise deployment - code không rời infrastructure.",
        "links": ["Tabnine|https://www.tabnine.com", "Docs|https://docs.tabnine.com"]
    },
    "jetbrains-ai": {
        "title": "JetBrains AI Assistant",
        "icon": "code",
        "tags": '["ide", "jetbrains", "paid"]',
        "overview": "là AI assistant tích hợp trong JetBrains IDEs. Code completion, refactoring, test generation, và documentation từ AI.",
        "install": "# Bundled với JetBrains IDEs 2024+ hoặc cài từ Marketplace",
        "usage": """# Trong JetBrains IDE:
# 1. Mở AI Assistant tool window
# 2. Hỏi về code hoặc yêu cầu changes
# 3. AI sẽ suggest code, explain, hoặc refactor
# 4. Apply changes với one-click""",
        "tips": "**$10/month:** JetBrains AI Pro rất rẻ so với các AI assistants khác.",
        "links": ["JetBrains AI|https://www.jetbrains.com/ai", "Docs|https://www.jetbrains.com/help/ai-assistant"]
    },
    "gemini-code-assist": {
        "title": "Gemini Code Assist",
        "icon": "brain",
        "tags": '["ide", "google", "enterprise"]',
        "overview": "là AI coding assistant từ Google cho enterprise. Powered by Gemini 3 với 1M token context window. Tích hợp với VS Code, JetBrains, Cloud Workstations.",
        "install": "# Cài extension từ VS Code Marketplace hoặc JetBrains",
        "usage": """# Sau khi cài extension:
# 1. Sign in với Google account
# 2. AI sẽ suggest code khi gõ
# 3. Sử dụng smart actions: fix errors, generate tests, explain code
# 4. Agent mode cho multi-file changes""",
        "tips": "**1M context:** Gemini Code Assist có context window lớn nhất - hiểu được toàn bộ codebase.",
        "links": ["Gemini Code Assist|https://developers.google.com/gemini-code-assist", "Docs|https://cloud.google.com/gemini-code-assist"]
    },
    "bolt": {
        "title": "Bolt.new",
        "icon": "zap",
        "tags": '["web", "no-code", "fullstack"]',
        "overview": "là AI-powered web development tool từ StackBlitz. Generate full-stack applications từ natural language descriptions, chạy ngay trong browser.",
        "install": "# Truy cập web app tại bolt.new",
        "usage": """# 1. Truy cập bolt.new
# 2. Mô tả web app muốn tạo
# 3. AI generate code và preview ngay trong browser
# 4. Deploy trực tiếp hoặc export code""",
        "tips": "**Browser-based:** Không cần cài đặt - build và deploy apps trực tiếp từ browser.",
        "links": ["Bolt.new|https://bolt.new", "StackBlitz|https://stackblitz.com"]
    },
    "lovable": {
        "title": "Lovable",
        "icon": "heart",
        "tags": '["web", "no-code", "fullstack"]',
        "overview": "là AI app builder. Tạo full-stack applications từ natural language với Supabase backend integration.",
        "install": "# Truy cập web app tại lovable.dev",
        "usage": """# 1. Truy cập lovable.dev
# 2. Mô tả app muốn build
# 3. AI generate frontend + backend
# 4. Deploy với one-click""",
        "tips": "**Supabase integration:** Lovable tự động setup database và auth với Supabase.",
        "links": ["Lovable|https://lovable.dev", "Docs|https://docs.lovable.dev"]
    },
    "replit": {
        "title": "Replit Agent",
        "icon": "code",
        "tags": '["web", "cloud", "agent"]',
        "overview": "là AI software engineer trên Replit platform. Tự động plan, code, và deploy applications từ natural language prompts.",
        "install": "# Truy cập web app tại replit.com",
        "usage": """# 1. Truy cập replit.com
# 2. Tạo Repl mới
# 3. Mô tả app muốn build
# 4. Replit Agent tự động code và deploy""",
        "tips": "**One-click deploy:** Replit tự động deploy apps với custom domains.",
        "links": ["Replit|https://replit.com", "Docs|https://docs.replit.com"]
    },
    "continue": {
        "title": "Continue",
        "icon": "infinity",
        "tags": '["ide", "opensource", "custom"]',
        "overview": "là open-source AI coding assistant. Build custom AI agents cho development workflow. Hỗ trợ nhiều models và IDEs.",
        "install": "npm install -g continue\n# Hoặc cài extension từ VS Code Marketplace",
        "usage": """# Cấu hình trong .continue/config.json
{
  "models": [{"provider": "openai", "model": "gpt-4"}],
  "tabAutocompleteModel": {"provider": "ollama", "model": "codellama"}
}

# Sử dụng trong IDE:
# Ctrl+L để mở chat
# Ctrl+I để inline edit""",
        "tips": "**Open-source:** Continue cho phép tự host và customize hoàn toàn.",
        "links": ["Continue|https://continue.dev", "GitHub|https://github.com/continuedev/continue"]
    },
    "qodo": {
        "title": "Qodo",
        "icon": "shield-check",
        "tags": '["testing", "code-review", "enterprise"]',
        "overview": "là AI code review platform. Focus vào PR validation, test generation, và standards enforcement trước khi merge.",
        "install": "# Tích hợp với GitHub/GitLab qua app marketplace",
        "usage": """# 1. Cài Qodo app vào GitHub/GitLab
# 2. Mỗi PR sẽ được AI review tự động
# 3. Xem AI-generated tests và suggestions
# 4. Approve hoặc request changes""",
        "tips": "**Merge gating:** Qodo có thể block merges nếu code không đạt standards.",
        "links": ["Qodo|https://www.qodo.ai", "Docs|https://docs.qodo.ai"]
    },
    "snyk-code": {
        "title": "Snyk Code",
        "icon": "shield",
        "tags": '["security", "sast", "enterprise"]',
        "overview": "là AI-powered SAST tool. Scan source code để tìm security vulnerabilities trước khi merge. Tích hợp vào IDE và CI/CD.",
        "install": "npm install -g snyk\nsnyk auth",
        "usage": """# Scan code
snyk code test

# Trong IDE:
# Snyk extension sẽ auto-scan khi save
# Click vào vulnerability để xem fix suggestions""",
        "tips": "**IDE integration:** Snyk scan real-time trong IDE - fix vulnerabilities trước khi commit.",
        "links": ["Snyk Code|https://snyk.io/product/snyk-code", "Docs|https://docs.snyk.io"]
    },
    "codescene": {
        "title": "CodeScene",
        "icon": "git-compare",
        "tags": '["code-review", "analytics", "enterprise"]',
        "overview": "là AI code review và technical debt tracking tool. Phân tích code hotspots, predict risks, và contextual PR reviews.",
        "install": "# Tích hợp với GitHub/GitLab/Bitbucket",
        "usage": """# 1. Connect repository
# 2. CodeScene tự động analyze codebase
# 3. Xem hotspots và risk analysis
# 4. AI review cho mỗi PR""",
        "tips": "**Behavioral analysis:** CodeScene phân tích developer behavior patterns để predict bugs.",
        "links": ["CodeScene|https://codescene.io", "Docs|https://docs.codescene.io"]
    },
    "lambdatest": {
        "title": "LambdaTest",
        "icon": "flask-conical",
        "tags": '["testing", "cloud", "enterprise"]',
        "overview": "là AI-powered testing platform. Cross-browser testing, visual regression, và test automation trên cloud.",
        "install": "npm install -g lambdatest-cli\nlt configure",
        "usage": """# Run cross-browser tests
lt test --browser chrome --os windows

# Visual regression
lt visual-test --url https://example.com""",
        "tips": "**3000+ browsers:** LambdaTest hỗ trợ test trên 3000+ browser/OS combinations.",
        "links": ["LambdaTest|https://www.lambdatest.com", "Docs|https://www.lambdatest.com/support/docs"]
    },
    "tembo": {
        "title": "Tembo",
        "icon": "layers",
        "tags": '["agent", "orchestration", "enterprise"]',
        "overview": "là AI agent orchestration platform. Chạy Claude Code, Cursor, Codex như background agents across multiple repos. Trigger từ Slack, Linear, GitHub.",
        "install": "# Truy cập web app tại tembo.io",
        "usage": """# 1. Connect GitHub/GitLab
# 2. Tag @tembo trong Slack hoặc Linear
# 3. AI agent picks up task và chạy
# 4. Agent mở PR khi hoàn thành""",
        "tips": "**Multi-agent:** Tembo orchestrate nhiều coding agents cùng lúc - Claude Code, Cursor, Codex, Gemini.",
        "links": ["Tembo|https://tembo.io", "Docs|https://docs.tembo.io"]
    },
    "air-jetbrains": {
        "title": "JetBrains Air",
        "icon": "rocket",
        "tags": '["ide", "jetbrains", "agent", "multi-agent"]',
        "overview": "là agentic development environment từ JetBrains. Orchestrate multiple AI agents (Claude, Codex, Gemini, Junie) chạy concurrently trong isolated containers.",
        "install": "# Có sẵn trong JetBrains IDEs 2026+",
        "usage": """# 1. Mở Air tool window trong IDE
# 2. Delegate task cho agents
# 3. Multiple agents chạy song song trong worktrees
# 4. Review và merge results""",
        "tips": "**Multi-agent:** Air cho phép nhiều agents làm việc cùng lúc mà không interfere với main working copy.",
        "links": ["JetBrains Air|https://www.jetbrains.com/air", "Docs|https://www.jetbrains.com/help/air"]
    },
}

content_dir = Path(r"C:\Users\TSC\Desktop\Nothing\AII\iai\src\content\ai-tools")

for tool_name, data in TOOLS.items():
    tool_dir = content_dir / tool_name
    tool_dir.mkdir(exist_ok=True)
    
    mdx_content = "---\n"
    mdx_content += 'title: "' + data['title'] + '"\n'
    mdx_content += 'category: "ai-tools"\n'
    mdx_content += 'icon: "' + data['icon'] + '"\n'
    mdx_content += 'difficulty: "intermediate"\n'
    mdx_content += "tags: " + data['tags'] + "\n"
    mdx_content += "---\n\n"
    mdx_content += "## Tổng quan\n\n"
    mdx_content += '<Note type="info">\n'
    mdx_content += "**" + data['title'] + "** " + data['overview'] + "\n"
    mdx_content += "</Note>\n\n"
    mdx_content += "## Cài đặt\n\n"
    mdx_content += '<CodeBlock language="powershell" code={`' + data['install'] + '`} />\n\n'
    mdx_content += "## Sử dụng\n\n"
    mdx_content += '<CodeBlock language="powershell" code={`' + data['usage'] + '`} />\n\n'
    mdx_content += "## Tips\n\n"
    mdx_content += '<Note type="tip">\n'
    mdx_content += data['tips'] + "\n"
    mdx_content += "</Note>\n\n"
    mdx_content += "## Liên kết\n\n"
    mdx_content += "\n".join(['- [' + l.split('|')[0] + '](' + l.split('|')[1] + ')' for l in data['links']]) + "\n"
    
    with open(tool_dir / "index.mdx", "w", encoding="utf-8") as f:
        f.write(mdx_content)
    
    print(f"[OK] Created: {tool_name}")

print(f"\nDone! Created {len(TOOLS)} tools")
