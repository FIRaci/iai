#!/usr/bin/env python3
"""
Content filler for other-tools category with real install commands and usage examples.
"""

import re
import sys
from pathlib import Path

TOOL_DB = {
    "activepieces": {
        "overview": "là open-source no-code automation platform. Tạo workflows tự động kết nối nhiều services mà không cần code.",
        "install": "docker run -d -p 3000:80 activepieces/activepieces",
        "usage": """# Truy cập http://localhost:3000
# 1. Tạo flow mới
# 2. Chọn trigger (ví dụ: new email)
# 3. Thêm actions (ví dụ: send Slack message)
# 4. Activate flow""",
        "tips": "**Templates:** Sử dụng pre-built templates để tạo flows nhanh hơn.",
        "links": ["Activepieces|https://www.activepieces.com", "GitHub|https://github.com/activepieces/activepieces"]
    },
    "alacritty": {
        "overview": "là GPU-accelerated terminal emulator nhanh nhất. Written in Rust, cross-platform, và highly configurable.",
        "install": "winget install Alacritty.Alacritty",
        "usage": """# Cấu hình trong %APPDATA%\\alacritty\\alacritty.toml
[font]
normal = { family = \"Cascadia Code\", style = \"Regular\" }
size = 12

[colors.primary]
background = \"#1e1e2e\"
foreground = \"#cdd6f4\" """,
        "tips": "**Performance:** Alacritty không có tabs built-in - dùng với tmux hoặc Windows Terminal.",
        "links": ["Alacritty|https://alacritty.org", "GitHub|https://github.com/alacritty/alacritty"]
    },
    "appsmith": {
        "overview": "là open-source low-code platform để build internal tools. Kéo thả UI components và kết nối với databases/APIs.",
        "install": "docker run -d --name appsmith -p 80:80 -p 443:443 appsmith/appsmith-ce",
        "usage": """# Truy cập http://localhost
# 1. Tạo new application
# 2. Kéo thả widgets (Table, Form, Button)
# 3. Connect datasource (PostgreSQL, REST API)
# 4. Bind data to widgets""",
        "tips": "**JS Queries:** Sử dụng JavaScript để transform data trước khi hiển thị.",
        "links": ["Appsmith|https://www.appsmith.com", "GitHub|https://github.com/appsmithorg/appsmith"]
    },
    "aria2": {
        "overview": "là lightweight multi-protocol download utility. Hỗ trợ HTTP/HTTPS, FTP, SFTP, BitTorrent, Metalink.",
        "install": "winget install aria2",
        "usage": """# Download file đơn
aria2c https://example.com/file.zip

# Download với nhiều connections
aria2c -x 16 -s 16 https://example.com/file.zip

# Download torrent
aria2c file.torrent""",
        "tips": "**Multi-connection:** Dùng `-x 16 -s 16` để tăng tốc download đáng kể.",
        "links": ["Aria2|https://aria2.github.io", "GitHub|https://github.com/aria2/aria2"]
    },
    "autohotkey": {
        "overview": "là scripting language cho Windows automation. Tạo hotkeys, macros, và tự động hóa GUI tasks.",
        "install": "winget install AutoHotkey.AutoHotkey",
        "usage": """; script.ahk
; Remap keys
CapsLock::Ctrl

; Hotkey để mở ứng dụng
#n::Run notepad.exe

; Auto-replace text
::btw::by the way

; Chạy script
autohotkey script.ahk""",
        "tips": "**Window Spy:** Dùng Window Spy (có sẵn) để inspect window controls và tạo automation chính xác.",
        "links": ["AutoHotkey|https://www.autohotkey.com", "Docs|https://www.autohotkey.com/docs"]
    },
    "bash": {
        "overview": "là Bourne Again SHell, command-line shell mặc định trên Linux và macOS. Scripting language mạnh mẽ cho automation.",
        "install": "# Đã có sẵn trên WSL. Trên Windows: cài qua Git Bash hoặc WSL",
        "usage": """#!/bin/bash
# Script example
for file in *.txt; do
    echo \"Processing: $file\"
    wc -l \"$file\"
done

# Run script
bash script.sh""",
        "tips": "**WSL:** Sử dụng WSL2 để chạy Bash native trên Windows với performance tốt.",
        "links": ["GNU Bash|https://www.gnu.org/software/bash", "Bash Guide|https://mywiki.wooledge.org/BashGuide"]
    },
    "bat": {
        "overview": "là cat clone với syntax highlighting và Git integration. Hiển thị file content đẹp hơn cat truyền thống.",
        "install": "winget install sharkdp.bat",
        "usage": """# Xem file với syntax highlighting
bat file.py

# Xem nhiều files
bat src/*.ts

# Với line numbers và Git changes
bat --style=numbers,changes file.py""",
        "tips": "**Alias:** Thêm `alias cat=bat` vào profile để thay thế cat mặc định.",
        "links": ["Bat|https://github.com/sharkdp/bat", "GitHub|https://github.com/sharkdp/bat"]
    },
    "biome": {
        "overview": "là fast formatter và linter cho JavaScript/TypeScript. Nhanh hơn ESLint + Prettier gấp 20-30x.",
        "install": "npm install --save-dev @biomejs/biome",
        "usage": """# Khởi tạo config
npx @biomejs/biome init

# Format code
npx biome format --write src/

# Lint code
npx biome lint src/

# Check (format + lint)
npx biome check --write src/""",
        "tips": "**Performance:** Biome viết bằng Rust nên nhanh hơn đáng kể so với ESLint + Prettier.",
        "links": ["Biome|https://biomejs.dev", "GitHub|https://github.com/biomejs/biome"]
    },
    "bookstack": {
        "overview": "là wiki/documentation platform mã nguồn mở. Tổ chức docs theo Books > Chapters > Pages.",
        "install": "docker run -d -p 8080:80 linuxserver/bookstack",
        "usage": """# Truy cập http://localhost:8080
# Default login: admin@admin.com / password
# 1. Tạo Book mới
# 2. Thêm Chapters và Pages
# 3. Sử dụng WYSIWYG hoặc Markdown editor""",
        "tips": "**Permissions:** Cấu hình role-based access control cho teams.",
        "links": ["BookStack|https://www.bookstackapp.com", "GitHub|https://github.com/BookStackApp/BookStack"]
    },
    "budibase": {
        "overview": "là low-code platform để build internal apps nhanh chóng. Tạo CRUD apps, admin panels, và dashboards.",
        "install": "docker run -d --name budibase -p 80:80 budibase/budibase",
        "usage": """# Truy cập http://localhost
# 1. Create app from template hoặc blank
# 2. Connect data source (PostgreSQL, REST API, CSV)
# 3. Build UI với drag-and-drop components
# 4. Publish app""",
        "tips": "**Built-in DB:** Budibase có internal database - không cần external DB cho simple apps.",
        "links": ["Budibase|https://budibase.com", "GitHub|https://github.com/Budibase/budibase"]
    },
    "cargo": {
        "overview": "là package manager và build tool cho Rust. Quản lý dependencies, build, test, và publish crates.",
        "install": "winget install Rustlang.Rustup",
        "usage": """# Tạo project mới
cargo new my-project
cd my-project

# Build
cargo build

# Run
cargo run

# Test
cargo test""",
        "tips": "**Crates.io:** Tìm packages tại crates.io - Rust's package registry.",
        "links": ["Cargo|https://doc.rust-lang.org/cargo", "Crates.io|https://crates.io"]
    },
    "changesets": {
        "overview": "là tool để quản lý changelogs và versioning cho monorepos. Tạo changeset files và tự động generate changelogs.",
        "install": "npm install --save-dev @changesets/cli",
        "usage": """# Khởi tạo
npx changeset init

# Tạo changeset mới
npx changeset

# Version bump
npx changeset version

# Publish packages
npx changeset publish""",
        "tips": "**CI Integration:** Dùng GitHub Actions để auto-version và publish trên mỗi merge.",
        "links": ["Changesets|https://github.com/changesets/changesets", "GitHub|https://github.com/changesets/changesets"]
    },
    "chocolatey": {
        "overview": "là package manager cho Windows. Cài đặt software từ command line giống apt trên Linux.",
        "install": "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))",
        "usage": """# Tìm package
choco search nodejs

# Cài đặt
choco install nodejs -y

# Upgrade tất cả
choco upgrade all -y

# List installed
choco list --local-only""",
        "tips": "**Admin Rights:** Chạy PowerShell as Administrator để cài Chocolatey và packages.",
        "links": ["Chocolatey|https://chocolatey.org", "Docs|https://docs.chocolatey.org"]
    },
    "cmder": {
        "overview": "là terminal emulator cho Windows dựa trên ConEmu. Tích hợp Git, MSysGit, và Clink cho trải nghiệm terminal tốt hơn.",
        "install": "winget install Cmder.Cmder",
        "usage": """# Mở Cmder
cmder

# Sử dụng như terminal bình thường
# Hỗ trợ bash-like commands trên Windows
# Tích hợp Git bash commands""",
        "tips": "**Tabs:** Cmder hỗ trợ multi-tab - dùng Ctrl+T để mở tab mới.",
        "links": ["Cmder|https://cmder.app", "GitHub|https://github.com/cmderdev/cmder"]
    },
    "commitlint": {
        "overview": "là tool để lint commit messages theo conventional commits format. Đảm bảo consistency trong commit history.",
        "install": "npm install --save-dev @commitlint/cli @commitlint/config-conventional",
        "usage": """# Tạo config file
echo \"module.exports = {extends: ['@commitlint/config-conventional']}\" > commitlint.config.js

# Test commit message
echo \"feat: add user authentication\" | npx commitlint

# Tích hợp với Husky
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit \"$1\"'""",
        "tips": "**Conventional Commits:** Format: `type(scope): description` - types: feat, fix, docs, style, refactor, test, chore.",
        "links": ["Commitlint|https://commitlint.js.org", "GitHub|https://github.com/conventional-changelog/commitlint"]
    },
    "conemu": {
        "overview": "là customizable terminal emulator cho Windows. Hỗ trợ tabs, splits, và nhiều shells trong một window.",
        "install": "winget install Maximus5.ConEmu",
        "usage": """# Mở ConEmu
# Tạo tabs mới cho các shells khác nhau
# PowerShell, CMD, Git Bash, WSL

# Split panes
# Win+A - split horizontal
# Win+Shift+A - split vertical""",
        "tips": "**Tasks:** Cấu hình Tasks để mở nhiều shells cùng lúc khi khởi động.",
        "links": ["ConEmu|https://conemu.github.io", "GitHub|https://github.com/Maximus5/ConEmu"]
    },
    "contentful": {
        "overview": "là headless CMS platform. Quản lý content qua API, tách biệt content khỏi presentation layer.",
        "install": "npm install contentful",
        "usage": """import { createClient } from 'contentful'
const client = createClient({
  space: 'your-space-id',
  accessToken: 'your-access-token'
})
const entries = await client.getEntries()
console.log(entries)""",
        "tips": "**Content Model:** Định nghĩa content types và fields trước khi tạo entries.",
        "links": ["Contentful|https://www.contentful.com", "API Docs|https://www.contentful.com/developers/docs"]
    },
    "curl": {
        "overview": "là command-line tool để transfer data với URLs. Hỗ trợ HTTP, HTTPS, FTP, và nhiều protocols khác.",
        "install": "# Đã có sẵn trên Windows 10+",
        "usage": """# GET request
curl https://api.example.com/data

# POST với JSON
curl -X POST -H \"Content-Type: application/json\" -d '{\"name\":\"test\"}' https://api.example.com/users

# Download file
curl -o file.zip https://example.com/file.zip

# Với headers
curl -H \"Authorization: Bearer token\" https://api.example.com/protected""",
        "tips": "**Verbose mode:** Dùng `-v` để xem request/response chi tiết khi debug.",
        "links": ["curl|https://curl.se", "Docs|https://curl.se/docs"]
    },
    "cypress": {
        "overview": "là end-to-end testing framework cho web applications. Chạy tests trong browser thực tế với fast feedback.",
        "install": "npm install --save-dev cypress",
        "usage": """// cypress/e2e/login.cy.js
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login')
    cy.get('[data-cy=email]').type('user@test.com')
    cy.get('[data-cy=password]').type('password123')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})

# Mở test runner
npx cypress open""",
        "tips": "**Time Travel:** Cypress chụp snapshots sau mỗi command - debug dễ dàng với time-travel.",
        "links": ["Cypress|https://www.cypress.io", "Docs|https://docs.cypress.io"]
    },
    "directus": {
        "overview": "là headless CMS và data platform. Wrap SQL database với REST/GraphQL API và admin app.",
        "install": "docker run -d -p 8055:8055 directus/directus",
        "usage": """# Truy cập http://localhost:8055
# 1. Tạo project mới
# 2. Define collections (tables)
# 3. Add fields và configure permissions
# 4. Access data via REST API hoặc GraphQL""",
        "tips": "**Auto-Admin:** Directus tự động tạo admin UI từ database schema.",
        "links": ["Directus|https://directus.io", "GitHub|https://github.com/directus/directus"]
    },
    "docker": {
        "overview": "là containerization platform. Package applications và dependencies vào containers để deploy nhất quán across environments.",
        "install": "winget install Docker.DockerDesktop",
        "usage": """# Chạy container
docker run -d -p 80:80 nginx

# Build image từ Dockerfile
docker build -t my-app .

# Docker Compose
docker-compose up -d

# List containers
docker ps""",
        "tips": "**Dockerfile:** Dùng multi-stage builds để giảm image size đáng kể.",
        "links": ["Docker|https://www.docker.com", "Docs|https://docs.docker.com"]
    },
    "docusaurus": {
        "overview": "là static site generator của Meta cho documentation websites. Hỗ trợ Markdown, versioning, và i18n.",
        "install": "npx create-docusaurus@latest my-docs classic",
        "usage": """cd my-docs
# Start dev server
npm start

# Build production
npm run build

# Serve production build
npm run serve""",
        "tips": "**Versioning:** Dùng `npm run docusaurus docs:version 1.0.0` để tạo docs versions.",
        "links": ["Docusaurus|https://docusaurus.io", "GitHub|https://github.com/facebook/docusaurus"]
    },
    "dotenv": {
        "overview": "là module để load environment variables từ .env file vào process.env. Quản lý config secrets an toàn.",
        "install": "npm install dotenv",
        "usage": """// index.js
require('dotenv').config()
console.log(process.env.DB_HOST)
console.log(process.env.API_KEY)

# .env file
DB_HOST=localhost
API_KEY=your-secret-key""",
        "tips": "**Never commit .env:** Thêm `.env` vào `.gitignore` để tránh leak secrets.",
        "links": ["dotenv|https://github.com/motdotla/dotenv", "GitHub|https://github.com/motdotla/dotenv"]
    },
    "drizzle-orm": {
        "overview": "là TypeScript ORM nhẹ và nhanh. Type-safe queries với developer experience tốt hơn Prisma.",
        "install": "npm install drizzle-orm better-sqlite3",
        "usage": """import { drizzle } from 'drizzle-orm/better-sqlite3'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull()
})

const db = drizzle(database)
const result = await db.select().from(users)""",
        "tips": "**Drizzle Kit:** Dùng `drizzle-kit generate` để auto-create migrations từ schema.",
        "links": ["Drizzle ORM|https://orm.drizzle.team", "GitHub|https://github.com/drizzle-team/drizzle-orm"]
    },
    "elvish": {
        "overview": "là expressive programming language và versatile interactive shell. Combines scripting và functional programming.",
        "install": "winget install Elvish.Elvish",
        "usage": """# Elvish shell
# Pipes với structured data
ps | each [p]{ echo $p[name] }

# Functions
fn greet [name] { echo \"Hello, $name!\" }
greet World

# Run script
elvish script.elv""",
        "tips": "**Structured Pipes:** Elvish pipes truyền objects thay vì text - mạnh hơn bash pipes.",
        "links": ["Elvish|https://elv.sh", "GitHub|https://github.com/elves/elvish"]
    },
    "esbuild": {
        "overview": "là cực nhanh JavaScript bundler viết bằng Go. Build times nhanh hơn Webpack 10-100x.",
        "install": "npm install --save-dev esbuild",
        "usage": """// build.js
require('esbuild').build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  minify: true,
}).catch(() => process.exit(1))

# Build
node build.js""",
        "tips": "**Watch mode:** Dùng `--watch` flag để auto-rebuild khi files thay đổi.",
        "links": ["esbuild|https://esbuild.github.io", "GitHub|https://github.com/evanw/esbuild"]
    },
    "eslint": {
        "overview": "là JavaScript/TypeScript linter. Find và fix problems trong code, enforce coding standards.",
        "install": "npm install --save-dev eslint",
        "usage": """# Khởi tạo config
npx eslint --init

# Lint files
npx eslint src/**/*.js

# Fix auto-fixable issues
npx eslint src/**/*.js --fix

# Với TypeScript
npx eslint src/**/*.ts --ext .ts""",
        "tips": "**Flat config:** ESLint v9 dùng `eslint.config.js` thay cho `.eslintrc`.",
        "links": ["ESLint|https://eslint.org", "GitHub|https://github.com/eslint/eslint"]
    },
    "eza": {
        "overview": "là modern replacement cho ls. Viết bằng Rust, hỗ trợ colors, icons, Git status, và tree view.",
        "install": "winget install eza.eza",
        "usage": """# List files với icons và colors
eza --icons --color=always

# Long format với Git status
eza -l --git

# Tree view
eza --tree

# Sort by modified
eza -l --sort=modified""",
        "tips": "**Alias:** Thêm `alias ls=eza --icons` vào shell profile.",
        "links": ["eza|https://github.com/eza-community/eza", "GitHub|https://github.com/eza-community/eza"]
    },
    "fd": {
        "overview": "là fast alternative cho find. Viết bằng Rust, hỗ trợ regex, ignore .gitignore, và colors.",
        "install": "winget install sharkdp.fd",
        "usage": """# Tìm files
fd pattern

# Tìm với extension
fd -e ts

# Tìm với regex
fd --type f \"^test.*\\.ts$\"

# Execute command trên kết quả
fd -e js -x wc -l""",
        "tips": "**Speed:** fd nhanh hơn find đáng kể trên large directories nhờ parallel processing.",
        "links": ["fd|https://github.com/sharkdp/fd", "GitHub|https://github.com/sharkdp/fd"]
    },
    "fish-shell": {
        "overview": "là smart and user-friendly shell. Auto-suggestions, syntax highlighting, và không cần config phức tạp.",
        "install": "winget install fish-shell.fish-shell",
        "usage": """# Fish shell
# Auto-suggestions hiện ra khi gõ (Tab để accept)

# Functions
function greet
    echo \"Hello, $argv!\"
end

# Universal variables (persist across sessions)
set -U fish_greeting \"Welcome to Fish!\"""",
        "tips": "**Web config:** Chạy `fish_config` để mở web UI cấu hình theme và prompts.",
        "links": ["Fish Shell|https://fishshell.com", "GitHub|https://github.com/fish-shell/fish-shell"]
    },
    "fzf": {
        "overview": "là command-line fuzzy finder. Fuzzy search files, history, processes với interactive UI.",
        "install": "winget install junegunn.fzf",
        "usage": """# Fuzzy find files
fd . | fzf

# Fuzzy search history (Ctrl+R)
# Tích hợp với bash/zsh/fish

# Fuzzy kill processes
fzf --pid

# Preview files while searching
fzf --preview 'bat --color=always {}'""",
        "tips": "**Keybindings:** Cài đặt keybindings để dùng Ctrl+T, Ctrl+R, Alt+C với fzf.",
        "links": ["fzf|https://github.com/junegunn/fzf", "GitHub|https://github.com/junegunn/fzf"]
    },
    "ghost": {
        "overview": "là open-source blogging platform và CMS. Tập trung vào publishing với Markdown editor và built-in SEO.",
        "install": "npm install ghost-cli -g && ghost install local",
        "usage": """# Sau khi cài đặt
# Truy cập http://localhost:2368
# Admin panel: http://localhost:2368/ghost
# 1. Tạo tài khoản admin
# 2. Viết posts với Markdown editor
# 3. Publish và quản lý subscribers""",
        "tips": "**Themes:** Ghost có theme system mạnh mẽ - customize với Handlebars templates.",
        "links": ["Ghost|https://ghost.org", "GitHub|https://github.com/TryGhost/Ghost"]
    },
    "ghostty": {
        "overview": "là fast, feature-rich terminal emulator viết bằng Zig. GPU-accelerated với cross-platform support.",
        "install": "winget install Ghostty.Ghostty",
        "usage": """# Cấu hình trong %APPDATA%\\ghostty\\config
font-family = Cascadia Code
font-size = 12
theme = catppuccin-mocha

# Mở Ghostty
ghostty""",
        "tips": "**Performance:** Ghostty nhanh hơn nhiều terminal emulators nhờ Zig và GPU acceleration.",
        "links": ["Ghostty|https://ghostty.org", "GitHub|https://github.com/ghostty-org/ghostty"]
    },
    "gitbook": {
        "overview": "là documentation platform cho teams. Viết docs với Markdown, tổ chức theo spaces và xuất bản online.",
        "install": "# Sử dụng qua web app tại gitbook.com",
        "usage": """# 1. Tạo account tại gitbook.com
# 2. Tạo Space mới
# 3. Viết pages với Markdown editor
# 4. Tổ chức theo chapters
# 5. Publish và share""",
        "tips": "**AI Assist:** Gitbook AI giúp generate và improve documentation content.",
        "links": ["GitBook|https://www.gitbook.com", "Docs|https://docs.gitbook.com"]
    },
    "github-actions": {
        "overview": "là CI/CD platform của GitHub. Automate workflows từ GitHub events như push, pull request, release.",
        "install": "# Tích hợp sẵn với GitHub repositories",
        "usage": """# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test""",
        "tips": "**Secrets:** Lưu API keys và tokens trong repository Settings > Secrets.",
        "links": ["GitHub Actions|https://github.com/features/actions", "Docs|https://docs.github.com/actions"]
    },
    "github-cli": {
        "overview": "là command-line interface cho GitHub. Tạo PRs, issues, quản lý repositories từ terminal.",
        "install": "winget install GitHub.cli",
        "usage": """# Authenticate
gh auth login

# Tạo PR
gh pr create --title \"Fix bug\" --body \"Description\"

# List PRs
gh pr list

# Clone repo
gh repo clone owner/repo""",
        "tips": "**Aliases:** Tạo custom aliases với `gh alias set` để shortcut commands.",
        "links": ["GitHub CLI|https://cli.github.com", "GitHub|https://github.com/cli/cli"]
    },
    "gitlab-ci": {
        "overview": "là CI/CD platform của GitLab. Tích hợp sẵn với GitLab repositories cho automated pipelines.",
        "install": "# Tích hợp sẵn với GitLab",
        "usage": """# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm test

build:
  stage: build
  script:
    - npm run build""",
        "tips": "**Runners:** Sử dụng shared runners hoặc self-hosted runners cho pipeline execution.",
        "links": ["GitLab CI|https://docs.gitlab.com/ee/ci", "Docs|https://docs.gitlab.com"]
    },
    "gitlab-cli": {
        "overview": "là command-line interface cho GitLab. Quản lý projects, issues, và CI/CD pipelines từ terminal.",
        "install": "winget install GitLab.CLI",
        "usage": """# Authenticate
glab auth login

# List MRs
glab mr list

# Tạo MR
glab mr create --title \"Fix bug\" --description \"Description\"

# View pipeline
glab ci view""",
        "tips": "**GLAB_EDITOR:** Set editor preference với `glab config set editor vim`.",
        "links": ["GitLab CLI|https://gitlab.com/gitlab-org/cli", "GitHub|https://github.com/profclems/glab"]
    },
    "homebrew": {
        "overview": "là package manager cho macOS và Linux. Cài đặt software từ command line dễ dàng.",
        "install": "# Trên Windows: sử dụng qua WSL\n/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"",
        "usage": """# Tìm package
brew search node

# Cài đặt
brew install node

# Upgrade
brew upgrade

# List installed
brew list""",
        "tips": "**Casks:** Dùng `brew install --cask` để cài GUI applications.",
        "links": ["Homebrew|https://brew.sh", "GitHub|https://github.com/Homebrew/brew"]
    },
    "httpie": {
        "overview": "là user-friendly HTTP client thay thế curl. Syntax đơn giản hơn, output đẹp hơn với colors.",
        "install": "winget install httpie",
        "usage": """# GET request
http GET https://api.example.com/users

# POST với JSON
http POST https://api.example.com/users name=\"John\" email=\"john@test.com\"

# Với headers
http GET https://api.example.com Authorization:\"Bearer token\"

# Download
http --download https://example.com/file.zip""",
        "tips": "**Sessions:** Dùng `http --session=user` để persist cookies và auth giữa các requests.",
        "links": ["HTTPie|https://httpie.io", "GitHub|https://github.com/httpie/httpie"]
    },
    "huginn": {
        "overview": "là open-source automation platform. Tạo agents để monitor và act on web events - như IFTTT self-hosted.",
        "install": "docker run -d -p 3000:3000 huginn/huginn",
        "usage": """# Truy cập http://localhost:3000
# 1. Tạo agents mới
# 2. Configure triggers và actions
# 3. Connect agents với events
# 4. Monitor activity""",
        "tips": "**Agents:** Huginn có nhiều agent types: Website, Twitter, Email, Shell, v.v.",
        "links": ["Huginn|https://github.com/huginn/huginn", "GitHub|https://github.com/huginn/huginn"]
    },
    "husky": {
        "overview": "là Git hooks manager. Chạy scripts trước commit, push, v.v. để enforce code quality.",
        "install": "npm install --save-dev husky",
        "usage": """# Khởi tạo
npx husky init

# Thêm pre-commit hook
echo \"npm test\" >> .husky/pre-commit

# Thêm commit-msg hook
echo \"npx commitlint --edit $1\" >> .husky/commit-msg""",
        "tips": "**Git Hooks:** Husky thay thế manual git hooks setup với simple npm commands.",
        "links": ["Husky|https://typicode.github.io/husky", "GitHub|https://github.com/typicode/husky"]
    },
    "hyper": {
        "overview": "là terminal emulator build với web technologies (Electron). Extensible với plugins và themes.",
        "install": "winget install Hyper.Hyper",
        "usage": """# Cấu hình trong ~/.hyper.js
module.exports = {
  config: {
    fontSize: 14,
    fontFamily: 'Cascadia Code',
    theme: 'hyper-material',
  }
}

# Cài plugins
hyper i hyperterm-tabs""",
        "tips": "**Plugins:** Hyper có ecosystem plugins phong phú - tìm tại hyper.is/plugins.",
        "links": ["Hyper|https://hyper.is", "GitHub|https://github.com/vercel/hyper"]
    },
    "insomnia": {
        "overview": "là API client để test và debug REST, GraphQL, và gRPC APIs. Alternative cho Postman với UI clean hơn.",
        "install": "winget install Insomnia.Insomnia",
        "usage": """# 1. Tạo new request
# 2. Chọn method (GET, POST, v.v.)
# 3. Nhập URL và headers
# 4. Send và xem response
# 5. Save vào collection để tái sử dụng""",
        "tips": "**Environments:** Sử dụng environments để switch giữa dev/staging/production configs.",
        "links": ["Insomnia|https://insomnia.rest", "GitHub|https://github.com/Kong/insomnia"]
    },
    "iterm2": {
        "overview": "là terminal emulator cho macOS. Features: split panes, search, autocomplete, và nhiều hơn nữa.",
        "install": "# macOS only: brew install --cask iterm2",
        "usage": """# Split panes
# Cmd+D - vertical split
# Cmd+Shift+D - horizontal split

# Search
# Cmd+F - find trong terminal output

# Instant Replay
# Cmd+Opt+B - xem lại output gần đây""",
        "tips": "**Profiles:** Tạo profiles khác nhau cho các projects với custom colors và startup commands.",
        "links": ["iTerm2|https://iterm2.com", "Docs|https://iterm2.com/documentation.html"]
    },
    "jenkins": {
        "overview": "là open-source automation server cho CI/CD. Build, test, và deploy applications với pipelines.",
        "install": "docker run -d -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts",
        "usage": """# Truy cập http://localhost:8080
# 1. Unlock với admin password
# 2. Cài suggested plugins
# 3. Tạo new item (pipeline)
# 4. Define Jenkinsfile
# 5. Build và monitor""",
        "tips": "**Jenkinsfile:** Định nghĩa pipelines as code với declarative hoặc scripted syntax.",
        "links": ["Jenkins|https://www.jenkins.io", "Docs|https://www.jenkins.io/doc"]
    },
    "joplin": {
        "overview": "là open-source note-taking app. Hỗ trợ Markdown, sync với nhiều services, và end-to-end encryption.",
        "install": "winget install Joplin.Joplin",
        "usage": """# 1. Mở Joplin
# 2. Tạo notebooks và notes
# 3. Viết notes với Markdown
# 4. Sync với Dropbox/OneDrive/S3
# 5. Search và organize với tags""",
        "tips": "**Web Clipper:** Cài browser extension để clip web pages trực tiếp vào Joplin.",
        "links": ["Joplin|https://joplinapp.org", "GitHub|https://github.com/laurent22/joplin"]
    },
    "jq": {
        "overview": "là command-line JSON processor. Parse, filter, và transform JSON data từ terminal.",
        "install": "winget install jqlang.jq",
        "usage": """# Pretty print JSON
cat data.json | jq .

# Extract field
cat data.json | jq '.name'

# Filter array
cat data.json | jq '.[] | select(.age > 25)'

# Transform
cat data.json | jq '{name: .name, email: .email}'""",
        "tips": "**Chaining:** Kết hợp multiple filters với `|` operator giống bash pipes.",
        "links": ["jq|https://jqlang.github.io/jq", "GitHub|https://github.com/jqlang/jq"]
    },
    "kitty": {
        "overview": "là GPU-accelerated terminal emulator. Nhanh, hỗ trợ images, ligatures, và remote control.",
        "install": "winget install Kovidgoyal.kitty",
        "usage": """# Cấu hình trong ~/.config/kitty/kitty.conf
font_family Cascadia Code
font_size 12.0
background_opacity 0.95

# Mở kitty
kitty

# Remote control
kitty @ set-colors --configured""",
        "tips": "**Kittens:** Kitty có kitten system để extend functionality (image preview, diffs, v.v.).",
        "links": ["Kitty|https://sw.kovidgoyal.net/kitty", "GitHub|https://github.com/kovidgoyal/kitty"]
    },
    "lazygit": {
        "overview": "là simple terminal UI cho Git commands. Quản lý commits, branches, stash với keyboard shortcuts.",
        "install": "winget install JesseDuffield.lazygit",
        "usage": """# Mở lazygit trong repo
lazygit

# Keyboard shortcuts
# c - commit
# p - push
# n - new branch
# s - stage file
# d - diff""",
        "tips": "**Custom Commands:** Định nghĩa custom commands trong config.yml cho workflow riêng.",
        "links": ["lazygit|https://github.com/jesseduffield/lazygit", "GitHub|https://github.com/jesseduffield/lazygit"]
    },
    "localtunnel": {
        "overview": "là tool để expose localhost servers ra internet. Tạo public URLs cho development và testing.",
        "install": "npm install -g localtunnel",
        "usage": """# Expose port 3000
lt --port 3000

# Với custom subdomain
lt --port 3000 --subdomain myapp

# Output: your url is https://myapp.loca.lt""",
        "tips": "**Security:** Chỉ expose khi cần testing - tắt khi không sử dụng.",
        "links": ["localtunnel|https://localtunnel.github.io", "GitHub|https://github.com/localtunnel/localtunnel"]
    },
    "logseq": {
        "overview": "là privacy-first open-source knowledge base. Outliner-based note-taking với bidirectional links.",
        "install": "winget install Logseq.Logseq",
        "usage": """# 1. Mở Logseq
# 2. Tạo graph mới (folder chứa notes)
# 3. Viết daily journal entries
# 4. Link notes với [[page-name]]
# 5. Query với built-in query language""",
        "tips": "**Block References:** Dùng `((block-id))` để reference specific blocks across pages.",
        "links": ["Logseq|https://logseq.com", "GitHub|https://github.com/logseq/logseq"]
    },
    "lua": {
        "overview": "là lightweight scripting language. Nhúng được vào applications, dùng trong game dev và config files.",
        "install": "winget install Lua.Lua",
        "usage": """-- script.lua
print(\"Hello, World!\")

-- Variables
local name = \"Lua\"
local version = 5.4

-- Functions
function greet(name)
    return \"Hello, \" .. name .. \"!\"
end

-- Run
lua script.lua""",
        "tips": "**Embedding:** Lua dễ dàng nhúng vào C/C++ applications - dùng cho scripting và config.",
        "links": ["Lua|https://www.lua.org", "Docs|https://www.lua.org/manual"]
    },
    "make": {
        "overview": "là build automation tool. Định nghĩa tasks và dependencies trong Makefile để automate workflows.",
        "install": "winget install GnuWin32.Make",
        "usage": """# Makefile
.PHONY: build test clean

build:
\tnpm run build

test: build
\tnpm test

clean:
\trm -rf dist

# Run target
make build
make test""",
        "tips": "**PHONY:** Luôn khai báo `.PHONY` targets để tránh conflict với file names.",
        "links": ["GNU Make|https://www.gnu.org/software/make", "Docs|https://www.gnu.org/software/make/manual"]
    },
    "mintlify": {
        "overview": "là documentation platform hiện đại. Build docs sites với MDX, search, và AI-powered features.",
        "install": "npm i -g mintlify",
        "usage": """# Khởi tạo docs
mint init

# Start dev server
mint dev

# Build production
mint build

# Deploy
mintlify deploy""",
        "tips": "**MDX Components:** Sử dụng custom MDX components cho interactive documentation.",
        "links": ["Mintlify|https://mintlify.com", "Docs|https://mintlify.com/docs"]
    },
    "mosh": {
        "overview": "là mobile shell thay thế SSH. Roaming support, intelligent local echo, và resilient to network changes.",
        "install": "winget install mosh",
        "usage": """# Connect to server (thay thế ssh)
mosh user@server.com

# Với specific port
mosh --server=\"mosh-server --port=60001\" user@server.com

# Mosh tự động reconnect khi network thay đổi""",
        "tips": "**UDP:** Mosh dùng UDP thay vì TCP - cần mở ports 60000-61000 trên firewall.",
        "links": ["Mosh|https://mosh.org", "GitHub|https://github.com/mobile-shell/mosh"]
    },
    "n8n": {
        "overview": "là workflow automation platform. Tự động hóa tasks giữa nhiều services với visual workflow editor.",
        "install": "docker run -d -p 5678:5678 n8nio/n8n",
        "usage": """# Truy cập http://localhost:5678
# 1. Tạo workflow mới
# 2. Thêm nodes (trigger, action)
# 3. Connect nodes với edges
# 4. Test và activate workflow""",
        "tips": "**Self-hosted:** n8n fair-code - free cho internal business use, paid cho SaaS.",
        "links": ["n8n|https://n8n.io", "GitHub|https://github.com/n8n-io/n8n"]
    },
    "ngrok": {
        "overview": "là tunneling service để expose localhost ra internet. Tạo secure public URLs cho development.",
        "install": "npm install -g ngrok",
        "usage": """# Authenticate
ngrok config add-authtoken YOUR_TOKEN

# Expose port 3000
ngrok http 3000

# Với custom domain
ngrok http --domain=myapp.ngrok-free.app 3000""",
        "tips": "**Web UI:** Ngrok cung cấp web UI tại http://localhost:4040 để inspect requests.",
        "links": ["ngrok|https://ngrok.com", "Docs|https://ngrok.com/docs"]
    },
    "notion": {
        "overview": "là all-in-one workspace. Notes, docs, project management, databases trong một platform.",
        "install": "winget install Notion.Notion",
        "usage": """# 1. Tạo account tại notion.so
# 2. Tạo pages và databases
# 3. Sử dụng blocks để build content
# 4. Share và collaborate với team
# 5. Integrate với các tools khác""",
        "tips": "**API:** Notion API cho phép automate và integrate với external services.",
        "links": ["Notion|https://www.notion.so", "API Docs|https://developers.notion.com"]
    },
    "npm": {
        "overview": "là package manager cho Node.js. Cài đặt, quản lý dependencies, và publish JavaScript packages.",
        "install": "# Đi kèm với Node.js installation",
        "usage": """# Cài đặt package
npm install express

# Dev dependency
npm install --save-dev typescript

# Run scripts
npm run build

# Initialize project
npm init -y""",
        "tips": "**npx:** Dùng `npx` để run packages mà không cần install global.",
        "links": ["npm|https://www.npmjs.com", "Docs|https://docs.npmjs.com"]
    },
    "nushell": {
        "overview": "là modern shell viết bằng Rust. Structured data pipelines thay vì text-based pipes.",
        "install": "winget install Nushell.Nushell",
        "usage": """# Nushell shell
# Structured data pipelines
ls | where size > 1kb | sort-by name

# Filter table data
ps | where cpu > 0

# JSON processing
open data.json | get users | each { |u| echo $u.name }""",
        "tips": "**Data-first:** Nu treats everything as structured data - dễ dàng filter và transform.",
        "links": ["Nushell|https://www.nushell.sh", "GitHub|https://github.com/nushell/nushell"]
    },
    "nx": {
        "overview": "là build system và monorepo framework. Smart caching, affected commands, và task orchestration.",
        "install": "npx create-nx-workspace@latest",
        "usage": """# Tạo workspace
npx create-nx-workspace my-workspace

# Generate app
nx generate @nx/react:app my-app

# Build affected projects
nx affected --target=build

# Run tests
nx test my-app""",
        "tips": "**Nx Cloud:** Sử dụng Nx Cloud để remote caching và distributed task execution.",
        "links": ["Nx|https://nx.dev", "GitHub|https://github.com/nrwl/nx"]
    },
    "obsidian": {
        "overview": "là knowledge base app dùng Markdown files. Bidirectional links, graph view, và plugin ecosystem.",
        "install": "winget install Obsidian.Obsidian",
        "usage": """# 1. Tạo vault mới (folder)
# 2. Viết notes với Markdown
# 3. Link notes với [[note-name]]
# 4. Xem graph view để thấy connections
# 5. Cài plugins để extend""",
        "tips": "**Local-first:** Obsidian lưu files locally - bạn sở hữu data của mình.",
        "links": ["Obsidian|https://obsidian.md", "Docs|https://help.obsidian.md"]
    },
    "oh-my-zsh": {
        "overview": "là framework quản lý Zsh configuration. Themes, plugins, và auto-completion out of the box.",
        "install": "sh -c \"$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)\"",
        "usage": """# Cấu hình trong ~/.zshrc
ZSH_THEME=\"robbyrussell\"
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)

# Apply changes
source ~/.zshrc""",
        "tips": "**Plugins:** Cài thêm zsh-autosuggestions và zsh-syntax-highlighting để trải nghiệm tốt hơn.",
        "links": ["Oh My Zsh|https://ohmyz.sh", "GitHub|https://github.com/ohmyzsh/ohmyzsh"]
    },
    "outline": {
        "overview": "là knowledge base và wiki platform cho teams. Real-time collaboration với Markdown editor.",
        "install": "docker run -d -p 3000:3000 outline/outline",
        "usage": """# Truy cập http://localhost:3000
# 1. Tạo workspace
# 2. Tạo collections và documents
# 3. Invite team members
# 4. Write với Markdown và slash commands""",
        "tips": "**Integrations:** Outline tích hợp với Slack, GitHub, và SSO providers.",
        "links": ["Outline|https://www.getoutline.com", "GitHub|https://github.com/outline/outline"]
    },
    "payload-cms": {
        "overview": "là headless CMS viết bằng TypeScript/Node.js. Code-first approach với React admin panel.",
        "install": "npx create-payload-app@latest",
        "usage": """// payload.config.ts
import { buildConfig } from 'payload/config'
export default buildConfig({
  collections: [
    {
      slug: 'posts',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText' }
      ]
    }
  ]
})

# Start dev server
npm run dev""",
        "tips": "**Code-first:** Định nghĩa collections và fields trong code thay vì UI.",
        "links": ["Payload|https://payloadcms.com", "GitHub|https://github.com/payloadcms/payload"]
    },
    "pipedream": {
        "overview": "là integration platform cho developers. Build workflows với code (Node.js, Python, Go) và no-code steps.",
        "install": "# Sử dụng qua web app tại pipedream.com",
        "usage": """# 1. Tạo account tại pipedream.com
# 2. Tạo workflow mới
# 3. Thêm triggers (HTTP, schedule, app events)
# 4. Thêm steps (code, API calls, actions)
# 5. Deploy và monitor""",
        "tips": "**Code Steps:** Viết Node.js/Python code trực tiếp trong workflow steps.",
        "links": ["Pipedream|https://pipedream.com", "Docs|https://docs.pipedream.com"]
    },
    "pipx": {
        "overview": "là tool để install và run Python applications trong isolated environments. Tránh dependency conflicts.",
        "install": "pip install pipx",
        "usage": """# Install package
pipx install black

# Run without install
pipx run black --check .

# List installed
pipx list

# Upgrade all
pipx upgrade-all""",
        "tips": "**Isolated envs:** Mỗi package được install trong virtual environment riêng - không conflict.",
        "links": ["pipx|https://pipx.pypa.io", "GitHub|https://github.com/pypa/pipx"]
    },
    "playwright": {
        "overview": "là end-to-end testing framework của Microsoft. Hỗ trợ Chromium, Firefox, WebKit với single API.",
        "install": "npm init playwright@latest",
        "usage": """// tests/example.spec.ts
import { test, expect } from '@playwright/test'
test('has title', async ({ page }) => {
  await page.goto('https://example.com')
  await expect(page).toHaveTitle(/Example/)
})

# Run tests
npx playwright test

# Run with UI
npx playwright test --ui""",
        "tips": "**Codegen:** Dùng `npx playwright codegen` để record tests tự động.",
        "links": ["Playwright|https://playwright.dev", "GitHub|https://github.com/microsoft/playwright"]
    },
    "pnpm": {
        "overview": "là fast, disk-efficient package manager. Symlink-based node_modules tiết kiệm disk space và install time.",
        "install": "npm install -g pnpm",
        "usage": """# Install dependencies
pnpm install

# Add package
pnpm add express

# Dev dependency
pnpm add -D typescript

# Run scripts
pnpm run build""",
        "tips": "**Workspace:** pnpm workspace hỗ trợ monorepo management tốt hơn npm/yarn.",
        "links": ["pnpm|https://pnpm.io", "GitHub|https://github.com/pnpm/pnpm"]
    },
    "poetry": {
        "overview": "là Python dependency management và packaging tool. Lock files, virtual environments, và publishing.",
        "install": "pip install poetry",
        "usage": """# Tạo project mới
poetry new my-project
cd my-project

# Add dependency
poetry add requests

# Install dependencies
poetry install

# Run script
poetry run python main.py""",
        "tips": "**Lock file:** `poetry.lock` đảm bảo reproducible installs across environments.",
        "links": ["Poetry|https://python-poetry.org", "GitHub|https://github.com/python-poetry/poetry"]
    },
    "postman": {
        "overview": "là API platform để develop, test, và document APIs. GUI-based với collection management và automation.",
        "install": "winget install Postman.Postman",
        "usage": """# 1. Mở Postman
# 2. Tạo new request
# 3. Chọn method, nhập URL
# 4. Thêm headers, body, params
# 5. Send và xem response
# 6. Save vào collection""",
        "tips": "**Collections:** Tổ chức requests vào collections để share với team.",
        "links": ["Postman|https://www.postman.com", "Docs|https://learning.postman.com"]
    },
    "powershell": {
        "overview": "là cross-platform task automation framework. Object-based pipeline, cmdlets, và scripting language mạnh mẽ.",
        "install": "# Đã có sẵn trên Windows. Cross-platform: winget install Microsoft.PowerShell",
        "usage": """# Get processes
Get-Process | Where-Object CPU -gt 100

# File operations
Get-ChildItem -Recurse -Filter *.txt | Select-Object Name, Length

# Script
powershell -File script.ps1""",
        "tips": "**Objects:** PowerShell pipeline truyền objects thay vì text - mạnh hơn bash cho data processing.",
        "links": ["PowerShell|https://learn.microsoft.com/powershell", "GitHub|https://github.com/PowerShell/PowerShell"]
    },
    "prettier": {
        "overview": "là opinionated code formatter. Hỗ trợ JS, TS, CSS, HTML, JSON, YAML, và nhiều languages khác.",
        "install": "npm install --save-dev prettier",
        "usage": """# Format files
npx prettier --write src/**/*.js

# Check without writing
npx prettier --check src/**/*.js

# Config trong .prettierrc
{
  \"semi\": true,
  \"singleQuote\": true,
  \"tabWidth\": 2
}""",
        "tips": "**Editor integration:** Cài Prettier extension trong VS Code để format on save.",
        "links": ["Prettier|https://prettier.io", "GitHub|https://github.com/prettier/prettier"]
    },
    "prisma": {
        "overview": "là next-generation ORM cho Node.js và TypeScript. Type-safe database queries với intuitive API.",
        "install": "npm install prisma --save-dev\nnpm install @prisma/client",
        "usage": """// schema.prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}

# Generate client
npx prisma generate

# Migrate database
npx prisma migrate dev

# Query trong code
const users = await prisma.user.findMany()""",
        "tips": "**Prisma Studio:** Dùng `npx prisma studio` để xem và edit data trong browser.",
        "links": ["Prisma|https://www.prisma.io", "GitHub|https://github.com/prisma/prisma"]
    },
    "rclone": {
        "overview": "là command-line program để sync files với cloud storage. Hỗ trợ 70+ providers (S3, GDrive, Dropbox).",
        "install": "winget install Rclone.Rclone",
        "usage": """# Configure remote
rclone configure

# Sync local to remote
rclone sync /local/path remote:bucket/path

# List files
rclone ls remote:bucket

# Mount cloud storage
rclone mount remote:bucket X:""",
        "tips": "**Dry run:** Dùng `--dry-run` để xem what would happen trước khi sync thật.",
        "links": ["rclone|https://rclone.org", "GitHub|https://github.com/rclone/rclone"]
    },
    "release-please": {
        "overview": "là automated changelog và version bump tool từ Google. Conventional commits driven releases.",
        "install": "npm install --save-dev release-please",
        "usage": """# Tạo release PR
npx release-please release-pr --token=$GITHUB_TOKEN --repo-url=https://github.com/owner/repo

# Hoặc dùng GitHub Action
# .github/workflows/release.yml
# uses: googleapis/release-please-action@v4""",
        "tips": "**Conventional Commits:** Release-please dựa vào commit messages để determine version bumps.",
        "links": ["Release Please|https://github.com/googleapis/release-please", "GitHub|https://github.com/googleapis/release-please"]
    },
    "retool": {
        "overview": "là low-code platform để build internal tools nhanh chóng. Drag-and-drop UI với database và API integrations.",
        "install": "docker run -d -p 3000:3000 tryretool/onprem",
        "usage": """# Truy cập http://localhost:3000
# 1. Tạo app mới
# 2. Kéo thả components (Table, Form, Button)
# 3. Connect resources (PostgreSQL, REST API)
# 4. Bind data và events
# 5. Publish app""",
        "tips": "**Queries:** Retool queries hỗ trợ JavaScript để transform data trước khi hiển thị.",
        "links": ["Retool|https://retool.com", "Docs|https://docs.retool.com"]
    },
    "ripgrep": {
        "overview": "là fast line-oriented search tool. Nhanh hơn grep và ack, hỗ trợ regex và .gitignore tự động.",
        "install": "winget install BurntSushi.ripgrep.MSVC",
        "usage": """# Search for pattern
rg \"pattern\"

# Search in specific file type
rg --type js \"pattern\"

# Case insensitive
rg -i \"pattern\"

# Show line numbers
rg -n \"pattern\"""",
        "tips": "**Speed:** rg nhanh hơn grep 5-10x nhờ Rust và parallel processing.",
        "links": ["ripgrep|https://github.com/BurntSushi/ripgrep", "GitHub|https://github.com/BurntSushi/ripgrep"]
    },
    "rollup": {
        "overview": "là module bundler cho JavaScript. Tối ưu cho libraries và code splitting với tree-shaking.",
        "install": "npm install --save-dev rollup",
        "usage": """// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: []
}

# Build
npx rollup -c""",
        "tips": "**Tree-shaking:** Rollup tự động loại bỏ unused code - bundle size nhỏ hơn.",
        "links": ["Rollup|https://rollupjs.org", "GitHub|https://github.com/rollup/rollup"]
    },
    "rsync": {
        "overview": "là fast file sync tool. Incremental transfers chỉ copy changed parts - tiết kiệm bandwidth.",
        "install": "# Có sẵn trên WSL. Windows: cài qua Cygwin hoặc WSL",
        "usage": """# Sync local directories
rsync -avz /source/ /destination/

# Sync to remote
rsync -avz /source/ user@remote:/destination/

# Dry run (preview)
rsync -avzn /source/ /destination/""",
        "tips": "**--delete:** Dùng `--delete` để sync exact (xóa files không có ở source).",
        "links": ["rsync|https://rsync.samba.org", "Docs|https://download.samba.org/pub/rsync/rsync.html"]
    },
    "ruff": {
        "overview": "là extremely fast Python linter và formatter. Viết bằng Rust, nhanh hơn flake8 + black 10-100x.",
        "install": "pip install ruff",
        "usage": """# Lint
ruff check src/

# Fix auto-fixable issues
ruff check --fix src/

# Format
ruff format src/

# Config trong pyproject.toml
[tool.ruff]
line-length = 88""",
        "tips": "**Drop-in replacement:** Ruff thay thế flake8, isort, black với single tool.",
        "links": ["Ruff|https://docs.astral.sh/ruff", "GitHub|https://github.com/astral-sh/ruff"]
    },
    "sanity": {
        "overview": "là headless CMS với real-time collaboration. Structured content platform với customizable editor.",
        "install": "npm install -g @sanity/cli",
        "usage": """# Tạo project
sanity init

# Start dev server
sanity dev

# Deploy
sanity deploy

# Query với GROQ
*[_type == \"post\"]{title, slug}""",
        "tips": "**GROQ:** Sanity dùng GROQ query language - mạnh mẽ và type-safe.",
        "links": ["Sanity|https://www.sanity.io", "Docs|https://www.sanity.io/docs"]
    },
    "scoop": {
        "overview": "là command-line installer cho Windows. Giống Homebrew nhưng cho Windows - cài đặt dev tools dễ dàng.",
        "install": "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser; irm get.scoop.sh | iex",
        "usage": """# Tìm package
scoop search nodejs

# Cài đặt
scoop install nodejs

# Update
scoop update

# List installed
scoop list""",
        "tips": "**Buckets:** Thêm buckets với `scoop bucket add extras` để access nhiều packages hơn.",
        "links": ["Scoop|https://scoop.sh", "GitHub|https://github.com/ScoopInstaller/Scoop"]
    },
    "semantic-release": {
        "overview": "là automated versioning và package publishing. Conventional commits trigger releases tự động.",
        "install": "npm install --save-dev semantic-release @semantic-release/github",
        "usage": """# .releaserc.json
{
  \"branches\": [\"main\"],
  \"plugins\": [
    \"@semantic-release/commit-analyzer\",
    \"@semantic-release/release-notes-generator\",
    \"@semantic-release/github\"
  ]
}

# Run (thường qua CI)
npx semantic-release""",
        "tips": "**CI Integration:** Chạy semantic-release trong GitHub Actions sau mỗi merge to main.",
        "links": ["semantic-release|https://semantic-release.gitbook.io", "GitHub|https://github.com/semantic-release/semantic-release"]
    },
    "shortcuts": {
        "overview": "là automation tool của Apple. Tạo custom workflows trên macOS và iOS với drag-and-drop interface.",
        "install": "# Built-in trên macOS và iOS",
        "usage": """# 1. Mở Shortcuts app
# 2. Tạo shortcut mới
# 3. Thêm actions từ library
# 4. Configure inputs và outputs
# 5. Run từ menu bar hoặc Siri""",
        "tips": "**Automation:** Shortcuts có thể trigger tự động dựa trên time, location, hoặc events.",
        "links": ["Shortcuts|https://support.apple.com/shortcuts", "Gallery|https://www.icloud.com/shortcuts"]
    },
    "sphinx": {
        "overview": "là documentation generator cho Python projects. Tạo docs từ reStructuredText với nhiều output formats.",
        "install": "pip install sphinx",
        "usage": """# Khởi tạo project
sphinx-quickstart docs

# Build HTML docs
sphinx-build -b html docs/ _build/html

# Build PDF
sphinx-build -b latex docs/ _build/latex

# Serve locally
python -m http.server --directory _build/html""",
        "tips": "**Autodoc:** Sphinx autodoc tự động generate docs từ Python docstrings.",
        "links": ["Sphinx|https://www.sphinx-doc.org", "GitHub|https://github.com/sphinx-doc/sphinx"]
    },
    "ssh": {
        "overview": "là secure shell protocol. Remote login và command execution với encryption.",
        "install": "# Đã có sẵn trên Windows 10+",
        "usage": """# Connect to server
ssh user@hostname

# Với specific port
ssh -p 2222 user@hostname

# SSH key authentication
ssh -i ~/.ssh/id_rsa user@hostname

# Port forwarding
ssh -L 8080:localhost:80 user@hostname""",
        "tips": "**Config file:** Dùng `~/.ssh/config` để định nghĩa host aliases và options.",
        "links": ["SSH|https://www.openssh.com", "Docs|https://man.openbsd.org/ssh"]
    },
    "standard-notes": {
        "overview": "là encrypted note-taking app. End-to-end encryption, cross-platform sync, và extensible với extensions.",
        "install": "winget install StandardNotes.StandardNotes",
        "usage": """# 1. Tạo account
# 2. Viết notes với Markdown
# 3. Organize với tags
# 4. Sync across devices
# 5. Cài extensions để thêm features""",
        "tips": "**Encryption:** Standard Notes encrypts data trước khi sync - ngay cả họ cũng không đọc được notes của bạn.",
        "links": ["Standard Notes|https://standardnotes.com", "GitHub|https://github.com/standardnotes"]
    },
    "starship": {
        "overview": "là minimal, fast, customizable prompt cho any shell. Hỗ trợ bash, zsh, fish, PowerShell, v.v.",
        "install": "winget install Starship.Starship",
        "usage": """# Thêm vào shell config
# bash/zsh:
eval \"$(starship init bash)\"

# fish:
starship init fish | source

# Config trong ~/.config/starship.toml
[character]
success_symbol = \"[➜](bold green)\"""",
        "tips": "**Presets:** Starship có nhiều preset themes - dùng `starship preset` để apply nhanh.",
        "links": ["Starship|https://starship.rs", "GitHub|https://github.com/starship/starship"]
    },
    "storybook": {
        "overview": "là frontend workshop cho UI components. Develop, test, và document components trong isolation.",
        "install": "npx storybook@latest init",
        "usage": """# Start dev server
npm run storybook

# Tạo story
// Button.stories.ts
export default { title: 'Button' }
export const Primary = () => '<button class=\"primary\">Click me</button>'

# Build static
npm run build-storybook""",
        "tips": "**Addons:** Storybook addons thêm capabilities: controls, actions, a11y testing, v.v.",
        "links": ["Storybook|https://storybook.js.org", "GitHub|https://github.com/storybookjs/storybook"]
    },
    "strapi": {
        "overview": "là open-source headless CMS. Build APIs nhanh chóng với customizable content types và admin panel.",
        "install": "npx create-strapi-app@latest my-project",
        "usage": """cd my-project
# Start dev server
npm run develop

# Truy cập admin: http://localhost:1337/admin
# 1. Tạo content types
# 2. Define fields và relations
# 3. Configure permissions
# 4. Access via REST/GraphQL API""",
        "tips": "**Plugins:** Strapi có plugin ecosystem - thêm features như i18n, SEO, upload.",
        "links": ["Strapi|https://strapi.io", "GitHub|https://github.com/strapi/strapi"]
    },
    "swc": {
        "overview": "là super-fast JavaScript/TypeScript compiler. Viết bằng Rust, nhanh hơn Babel 20x.",
        "install": "npm install --save-dev @swc/core @swc/cli",
        "usage": """// .swcrc
{
  \"jsc\": {
    \"parser\": { \"syntax\": \"typescript\" },
    \"target\": \"es2020\"
  }
}

# Compile
npx swc src -d dist

# Watch mode
npx swc src -d dist -w""",
        "tips": "**Next.js:** Next.js dùng SWC mặc định cho fast refresh và minification.",
        "links": ["SWC|https://swc.rs", "GitHub|https://github.com/swc-project/swc"]
    },
    "tabby": {
        "overview": "là highly configurable terminal emulator. Tabs, splits, themes, và plugins cho modern terminal experience.",
        "install": "winget install Eugeny.Tabby",
        "usage": """# Mở Tabby
# 1. Tạo profiles cho các connections
# 2. Configure themes và fonts
# 3. Sử dụng tabs và split panes
# 4. Cài plugins từ community""",
        "tips": "**Profiles:** Tabby profiles hỗ trợ SSH, serial, và local terminals.",
        "links": ["Tabby|https://tabby.sh", "GitHub|https://github.com/Eugeny/tabby"]
    },
    "tasker": {
        "overview": "là automation app cho Android. Tạo tasks dựa trên events, contexts, và triggers.",
        "install": "# Android only: cài từ Google Play Store",
        "usage": """# 1. Mở Tasker
# 2. Tạo profile mới
# 3. Chọn trigger (time, location, app)
# 4. Add tasks (actions to perform)
# 5. Activate profile""",
        "tips": "**Scenes:** Tasker Scenes cho phép tạo custom UIs cho tasks.",
        "links": ["Tasker|https://tasker.joaoapps.com", "Docs|https://tasker.joaoapps.com/userguide"]
    },
    "tcl": {
        "overview": "là Tool Command Language. Scripting language đơn giản, thường dùng cho testing và automation.",
        "install": "winget install ActiveState.ActiveTcl",
        "usage": """# script.tcl
puts \"Hello, World!\"

set name \"TCL\"
puts \"Hello, $name!\"

# Run
tclsh script.tcl""",
        "tips": "**Tk:** Tcl đi kèm Tk toolkit cho GUI development.",
        "links": ["Tcl|https://www.tcl-lang.org", "Docs|https://www.tcl-lang.org/man"]
    },
    "tiddlywiki": {
        "overview": "là unique non-linear notebook. Single-file wiki với powerful features cho knowledge management.",
        "install": "npm install -g tiddlywiki",
        "usage": """# Tạo wiki mới
tiddlywiki mywiki --init server

# Start server
tiddlywiki mywiki --listen

# Truy cập http://localhost:8080
# 1. Tạo tiddlers (notes)
# 2. Tag và organize
# 3. Link giữa tiddlers""",
        "tips": "**Single-file:** TiddlyWiki có thể export thành single HTML file - portable knowledge base.",
        "links": ["TiddlyWiki|https://tiddlywiki.com", "GitHub|https://github.com/TiddlyWiki/TiddlyWiki5"]
    },
    "tmux": {
        "overview": "là terminal multiplexer. Split terminals, persistent sessions, và remote pair programming.",
        "install": "winget install tmux",
        "usage": """# Start new session
tmux new -s mysession

# Split panes
# Ctrl+b % - vertical
# Ctrl+b \" - horizontal

# Detach
# Ctrl+b d

# Reattach
tmux attach -t mysession""",
        "tips": "**Prefix key:** Mặc định Ctrl+b - đổi thành Ctrl+a trong `.tmux.conf` cho dễ bấm.",
        "links": ["tmux|https://github.com/tmux/tmux", "GitHub|https://github.com/tmux/tmux"]
    },
    "tooljet": {
        "overview": "là open-source low-code platform. Build internal tools, dashboards, và admin panels nhanh chóng.",
        "install": "docker run -d -p 8080:80 tooljet/tooljet",
        "usage": """# Truy cập http://localhost:8080
# 1. Tạo application mới
# 2. Drag-and-drop widgets
# 3. Connect datasources (DB, API)
# 4. Bind data và events
# 5. Deploy app""",
        "tips": "**Datasources:** ToolJet hỗ trợ PostgreSQL, MongoDB, REST API, GraphQL, và nhiều hơn.",
        "links": ["ToolJet|https://www.tooljet.com", "GitHub|https://github.com/ToolJet/ToolJet"]
    },
    "trpc": {
        "overview": "là end-to-end typesafe API framework. Shared types giữa client và server không cần code generation.",
        "install": "npm install @trpc/server @trpc/client zod",
        "usage": """// server/router.ts
export const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query((opts) => `Hello ${opts.input.name}!`)
})

// client
const greeting = await trpc.greeting.query({ name: 'World' })""",
        "tips": "**Zod:** tRPC dùng Zod cho input validation - typesafe từ đầu đến cuối.",
        "links": ["tRPC|https://trpc.io", "GitHub|https://github.com/trpc/trpc"]
    },
    "ts-node": {
        "overview": "là TypeScript execution engine cho Node.js. Run TypeScript files trực tiếp không cần compile trước.",
        "install": "npm install --save-dev ts-node typescript",
        "usage": """# Run TypeScript file
npx ts-node script.ts

# REPL
npx ts-node

# Với ESM
npx ts-node --esm script.ts

# Trong package.json
\"scripts\": {
  \"dev\": \"ts-node src/index.ts\"
}""",
        "tips": "**tsx:** Consider dùng `tsx` thay thế - nhanh hơn và hỗ trợ ESM tốt hơn.",
        "links": ["ts-node|https://typestrong.org/ts-node", "GitHub|https://github.com/TypeStrong/ts-node"]
    },
    "tsx": {
        "overview": "là fast TypeScript executor cho Node.js. Run TS/TSX files với native ESM support và caching.",
        "install": "npm install --save-dev tsx",
        "usage": """# Run TypeScript file
npx tsx script.ts

# Watch mode
npx tsx --watch script.ts

# Trong package.json
\"scripts\": {
  \"dev\": \"tsx watch src/index.ts\"
}""",
        "tips": "**Performance:** tsx nhanh hơn ts-node nhờ esbuild dưới hood.",
        "links": ["tsx|https://tsx.is", "GitHub|https://github.com/privatenumber/tsx"]
    },
    "turbo": {
        "overview": "là incremental bundler và task runner cho monorepos. Smart caching và parallel execution.",
        "install": "npm install --save-dev turbo",
        "usage": """# turbo.json
{
  \"$schema\": \"https://turbo.build/schema.json\",
  \"tasks\": {
    \"build\": { \"dependsOn\": [\"^build\"], \"outputs\": [\"dist/**\"] },
    \"test\": { \"dependsOn\": [\"build\"] },
    \"dev\": { \"cache\": false }
  }
}

# Run
npx turbo run build""",
        "tips": "**Remote Cache:** Turbo remote cache chia sẻ cache giữa team members và CI.",
        "links": ["Turborepo|https://turbo.build", "GitHub|https://github.com/vercel/turborepo"]
    },
    "uv": {
        "overview": "là extremely fast Python package installer. Viết bằng Rust, nhanh hơn pip 10-100x.",
        "install": "pip install uv",
        "usage": """# Install packages
uv pip install requests

# Create venv
uv venv

# Run script với dependencies
uv run --with requests python script.py

# Sync from requirements
uv pip sync requirements.txt""",
        "tips": "**Drop-in replacement:** `uv pip` thay thế `pip` với cùng interface nhưng nhanh hơn nhiều.",
        "links": ["uv|https://github.com/astral-sh/uv", "GitHub|https://github.com/astral-sh/uv"]
    },
    "vite": {
        "overview": "là fast frontend build tool. Next-gen tooling với instant HMR và optimized production builds.",
        "install": "npm create vite@latest",
        "usage": """# Tạo project
npm create vite@latest my-app -- --template react
cd my-app
npm install

# Dev server
npm run dev

# Build production
npm run build""",
        "tips": "**Plugins:** Vite plugin ecosystem tương thích với Rollup plugins.",
        "links": ["Vite|https://vitejs.dev", "GitHub|https://github.com/vitejs/vite"]
    },
    "vitepress": {
        "overview": "là static site generator powered by Vite. Build documentation sites với Vue components và Markdown.",
        "install": "npm install -D vitepress",
        "usage": """# Khởi tạo
npx vitepress init

# Dev server
npx vitepress dev

# Build
npx vitepress build

# Preview production
npx vitepress preview""",
        "tips": "**Vue SFC:** VitePress hỗ trợ Vue Single File Components trong Markdown.",
        "links": ["VitePress|https://vitepress.dev", "GitHub|https://github.com/vuejs/vitepress"]
    },
    "vitest": {
        "overview": "là fast unit testing framework powered by Vite. Compatible với Jest API, native TypeScript support.",
        "install": "npm install --save-dev vitest",
        "usage": """// tests/example.test.ts
import { describe, it, expect } from 'vitest'
describe('Math', () => {
  it('should add numbers', () => {
    expect(1 + 2).toBe(3)
  })
})

# Run tests
npx vitest

# Watch mode
npx vitest watch""",
        "tips": "**Jest compat:** Vitest tương thích với hầu hết Jest APIs - migrate dễ dàng.",
        "links": ["Vitest|https://vitest.dev", "GitHub|https://github.com/vitest-dev/vitest"]
    },
    "warp": {
        "overview": "là Rust-based terminal emulator với AI features. Block-based input, command palette, và team workflows.",
        "install": "winget install Warp.Warp",
        "usage": """# Mở Warp
# 1. Gõ commands với block-based input
# 2. Sử dụng AI để suggest commands
# 3. Search command history
# 4. Share outputs với team""",
        "tips": "**AI Commands:** Warp AI giúp generate và explain commands từ natural language.",
        "links": ["Warp|https://www.warp.dev", "Docs|https://docs.warp.dev"]
    },
    "webpack": {
        "overview": "là static module bundler cho JavaScript. Bundle, optimize, và serve assets cho web applications.",
        "install": "npm install --save-dev webpack webpack-cli",
        "usage": """// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{ test: /\\.css$/, use: ['style-loader', 'css-loader'] }]
  }
}

# Build
npx webpack""",
        "tips": "**Dev Server:** Dùng `webpack-dev-server` cho hot reload during development.",
        "links": ["Webpack|https://webpack.js.org", "GitHub|https://github.com/webpack/webpack"]
    },
    "wezterm": {
        "overview": "là GPU-accelerated terminal emulator viết bằng Rust. Cross-platform, ligatures, và Lua config.",
        "install": "winget install wez.wezterm",
        "usage": """# Config trong ~/.wezterm.lua
local wezterm = require 'wezterm'
return {
  font = wezterm.font('Cascadia Code'),
  font_size = 12.0,
  color_scheme = 'Catppuccin Mocha',
}

# Mở WezTerm
wezterm""",
        "tips": "**Lua config:** WezTerm dùng Lua cho configuration - powerful và flexible.",
        "links": ["WezTerm|https://wezfurlong.org/wezterm", "GitHub|https://github.com/wez/wezterm"]
    },
    "wget": {
        "overview": "là non-interactive network downloader. Download files từ web với resume support và recursive download.",
        "install": "# Đã có sẵn trên WSL. Windows: winget install GNU.Wget",
        "usage": """# Download file
wget https://example.com/file.zip

# Resume download
wget -c https://example.com/file.zip

# Download entire site
wget --recursive --no-clobber https://example.com

# With output filename
wget -o output.zip https://example.com/file.zip""",
        "tips": "**Recursive:** wget có thể download entire websites với `--recursive` flag.",
        "links": ["Wget|https://www.gnu.org/software/wget", "Docs|https://www.gnu.org/software/wget/manual"]
    },
    "wiki-js": {
        "overview": "là modern wiki software. Markdown-based với powerful editor và beautiful UI.",
        "install": "docker run -d -p 3000:3000 requarks/wiki",
        "usage": """# Truy cập http://localhost:3000
# 1. Setup admin account
# 2. Tạo spaces và pages
# 3. Viết với Markdown editor
# 4. Organize với tags và categories
# 5. Manage permissions""",
        "tips": "**Search:** Wiki.js có full-text search mạnh mẽ với multiple engines.",
        "links": ["Wiki.js|https://js.wiki", "GitHub|https://github.com/requarks/wiki"]
    },
    "windmill": {
        "overview": "là developer platform để build workflows và internal apps. Code-first với UI builder.",
        "install": "docker run -d -p 8000:80 ghcr.io/windmill-labs/windmill",
        "usage": """# Truy cập http://localhost:8000
# 1. Tạo workspace
# 2. Write scripts (Python, TypeScript, Go)
# 3. Create flows từ scripts
# 4. Build UIs với drag-and-drop
# 5. Schedule và trigger""",
        "tips": "**Multi-language:** Windmill hỗ trợ Python, TypeScript, Go, Bash, và nhiều languages.",
        "links": ["Windmill|https://www.windmill.dev", "GitHub|https://github.com/windmill-labs/windmill"]
    },
    "windows-terminal": {
        "overview": "là modern terminal host cho Windows. Tabs, panes, Unicode, GPU text rendering, và customization.",
        "install": "winget install Microsoft.WindowsTerminal",
        "usage": """# Mở Windows Terminal
# Tabs: Ctrl+Shift+T
# Split panes: Alt+Shift+D
# Settings: Ctrl+,
# Cấu hình profiles cho PowerShell, WSL, CMD""",
        "tips": "**Profiles:** Tạo profiles khác nhau cho mỗi shell với custom colors và startup directories.",
        "links": ["Windows Terminal|https://aka.ms/terminal", "GitHub|https://github.com/microsoft/terminal"]
    },
    "winget": {
        "overview": "là Windows Package Manager của Microsoft. Cài đặt software từ command line chính thức.",
        "install": "# Đã có sẵn trên Windows 11 và Windows 10 (1709+)",
        "usage": """# Tìm package
winget search vscode

# Cài đặt
winget install Microsoft.VisualStudioCode

# Upgrade
winget upgrade --all

# List installed
winget list""",
        "tips": "**Interactive installer:** Dùng `--interactive` flag cho packages cần user input.",
        "links": ["winget|https://learn.microsoft.com/windows/package-manager", "GitHub|https://github.com/microsoft/winget-cli"]
    },
    "wordpress": {
        "overview": "là open-source CMS platform. Power 40%+ websites với themes, plugins, và flexible content management.",
        "install": "docker run -d -p 8080:80 wordpress",
        "usage": """# Truy cập http://localhost:8080
# 1. Setup WordPress (language, admin account)
# 2. Chọn theme
# 3. Cài plugins
# 4. Tạo pages và posts
# 5. Customize với Customizer""",
        "tips": "**WP-CLI:** Dùng WP-CLI để quản lý WordPress từ command line.",
        "links": ["WordPress|https://wordpress.org", "Docs|https://developer.wordpress.org"]
    },
    "xh": {
        "overview": "là friendly and fast HTTP client. Rust-based alternative cho curl với intuitive syntax.",
        "install": "winget install ducaale.xh",
        "usage": """# GET request
xh GET https://api.example.com/users

# POST với JSON
xh POST https://api.example.com/users name=John email=john@test.com

# Download
xh --download https://example.com/file.zip

# Với headers
xh GET https://api.example.com Authorization:\"Bearer token\"""",
        "tips": "**Speed:** xh nhanh hơn curl và httpie nhờ Rust implementation.",
        "links": ["xh|https://github.com/ducaale/xh", "GitHub|https://github.com/ducaale/xh"]
    },
    "xonsh": {
        "overview": "là Python-powered shell. Combines bash-like syntax với Python capabilities trong một shell.",
        "install": "pip install xonsh",
        "usage": """# Xonsh shell
# Python syntax trong shell
for i in range(5):
    echo $i

# Subprocess commands
ls -la | grep .py

# Run script
xonsh script.xsh""",
        "tips": "**Python first:** Mọi thứ trong xonsh là Python - dễ dàng viết complex scripts.",
        "links": ["Xonsh|https://xon.sh", "GitHub|https://github.com/xonsh/xonsh"]
    },
    "zapier": {
        "overview": "là automation platform kết nối 6000+ apps. Tạo Zaps (workflows) không cần code.",
        "install": "# Sử dụng qua web app tại zapier.com",
        "usage": """# 1. Tạo account tại zapier.com
# 2. Tạo Zap mới
# 3. Chọn trigger app và event
# 4. Chọn action app và event
# 5. Test và activate Zap""",
        "tips": "**Multi-step Zaps:** Kết hợp nhiều actions trong một Zap cho complex workflows.",
        "links": ["Zapier|https://zapier.com", "Docs|https://zapier.com/docs"]
    },
    "zoxide": {
        "overview": "là smarter cd command. Học từ navigation patterns để jump đến directories thường dùng nhanh hơn.",
        "install": "winget install ajeetdsouza.zoxide",
        "usage": """# Thêm vào shell config
# PowerShell:
Invoke-Expression (& { (zoxide init powershell | Out-String) })

# Usage
z project  # cd đến directory chứa \"project\"
z -i       # interactive select
z -l       # list directories""",
        "tips": "**Fuzzy matching:** zoxide dùng fuzzy matching - không cần nhớ exact path.",
        "links": ["zoxide|https://github.com/ajeetdsouza/zoxide", "GitHub|https://github.com/ajeetdsouza/zoxide"]
    },
    "zsh": {
        "overview": "là powerful shell với features như auto-completion, spell correction, và plugin support.",
        "install": "# Có sẵn trên macOS. Windows: cài qua WSL",
        "usage": """# Zsh shell
# Auto-completion: Tab
# Spell correction: yes/no prompt

# Plugins với Oh My Zsh
plugins=(git zsh-autosuggestions)

# Config trong ~/.zshrc
alias ll='ls -la'""",
        "tips": "**Oh My Zsh:** Cài Oh My Zsh để có themes, plugins, và better defaults out of the box.",
        "links": ["Zsh|https://www.zsh.org", "Docs|https://zsh.sourceforge.io/Doc"]
    },
}

def process_file(file_path):
    """Process a single MDX file and add content."""
    with open(file_path, 'r', encoding='utf-8') as f:
        original = f.read()
    
    has_install = "## Cài đặt" in original
    has_usage = "## Sử dụng" in original
    
    if has_install and has_usage:
        # Check if content is placeholder
        if "Xem tài liệu chính thức" not in original and "# 1. Cài đặt và cấu hình" not in original:
            return False
    
    frontmatter_match = re.match(r'(---\n.*?\n---\n)', original, re.DOTALL)
    if not frontmatter_match:
        return False
    
    frontmatter = frontmatter_match.group(1)
    
    title_match = re.search(r'title:\s*["\']([^"\']+)["\']', frontmatter)
    category_match = re.search(r'category:\s*["\']([^"\']+)["\']', frontmatter)
    
    if not title_match or not category_match:
        return False
    
    title = title_match.group(1)
    tool_name = Path(file_path).parent.name
    
    if tool_name not in TOOL_DB:
        return False
    
    generated = TOOL_DB[tool_name]
    
    new_sections = []
    new_sections.append("## Tổng quan\n\n<Note type=\"info\">\n**" + title + "** " + generated['overview'] + "\n</Note>\n")
    new_sections.append("## Cài đặt\n\n<CodeBlock language=\"powershell\" code={`" + generated['install'] + "`} />\n")
    new_sections.append("## Sử dụng\n\n<CodeBlock language=\"powershell\" code={`" + generated['usage'] + "`} />\n")
    new_sections.append("## Tips\n\n<Note type=\"tip\">\n" + generated['tips'] + "\n</Note>\n")
    
    has_links = "## Liên kết" in original
    if has_links:
        links_match = re.search(r'## Liên kết\n(.*?)(?=\n##|\Z)', original, re.DOTALL)
        if links_match:
            existing_links = links_match.group(1).strip()
            new_sections.append("## Liên kết\n\n" + existing_links + "\n")
        else:
            links_md = "\n".join(["- [" + l.split("|")[0] + "](" + l.split("|")[1] + ")" for l in generated['links']])
            new_sections.append("## Liên kết\n\n" + links_md + "\n")
    else:
        links_md = "\n".join(["- [" + l.split("|")[0] + "](" + l.split("|")[1] + ")" for l in generated['links']])
        new_sections.append("## Liên kết\n\n" + links_md + "\n")
    
    new_body = "\n".join(new_sections)
    new_content = frontmatter + "\n" + new_body
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: python content-filler-other-tools.py <directory>")
        sys.exit(1)
    
    content_dir = Path(sys.argv[1])
    
    if not content_dir.exists():
        print(f"Directory not found: {content_dir}")
        sys.exit(1)
    
    processed = 0
    skipped = 0
    
    for mdx_file in sorted(content_dir.rglob("*.mdx")):
        result = process_file(mdx_file)
        if result:
            processed += 1
            print(f"[OK] Updated: {mdx_file.relative_to(content_dir)}")
        else:
            skipped += 1
    
    print(f"\nDone! Processed: {processed}, Skipped: {skipped}")

if __name__ == "__main__":
    main()
