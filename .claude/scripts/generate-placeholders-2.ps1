# PowerShell script to generate missing MDX placeholder files - Part 2
# Run from project root: .claude/scripts/generate-placeholders-2.ps1

$ErrorActionPreference = "Stop"

$basePath = "src/content"

# Get all existing MDX files per category
function Get-ExistingItems {
    param($category)
    $catPath = Join-Path $basePath $category
    if (Test-Path $catPath) {
        Get-ChildItem -Path $catPath -Directory | Select-Object -ExpandProperty Name
    } else {
        @()
    }
}

# Define categories and their sidebar items
$categories = @{
    "databases" = @(
        "chroma", "cloudflare-d1", "cohere-embeddings", "common-crawl", "cvat", "dask",
        "datafusion", "duckdb", "faiss", "fiftyone", "hf-datasets", "jina-embeddings",
        "kaggle", "label-studio", "libsql", "milvus", "minio", "nomic-embed",
        "openai-embeddings", "pandas", "pinecone", "polars", "qdrant", "ray",
        "redis", "roboflow", "snorkel", "sqlite", "spark", "surrealdb", "turso",
        "voyage-ai", "weaviate"
    )
    "dev-tools" = @(
        "alacritty", "android-studio", "antigravity", "bat", "curl", "docker",
        "emacs", "fd", "figma", "fzf", "git", "gitkraken", "github-desktop",
        "gitui", "helix", "httpie", "jetbrains-ai", "jq", "kite", "lazygit",
        "lapce", "lunarvim", "mongodb", "neovim", "neovim-ai", "nodejs", "npm",
        "onivim", "pnpm", "postgresql", "powershell", "pycharm", "ripgrep",
        "sourcetree", "sublime-merge", "sublime-text", "tabnine", "tabby", "tig",
        "vim", "vscode", "webstorm", "wezterm", "wget", "windows-terminal", "wsl", "zed"
    )
    "backend" = @(
        "agenda", "appwrite", "auth-js", "better-auth", "bruno", "bullmq", "clerk",
        "dbeaver", "django", "express", "fastapi", "fastify", "firebase", "flask",
        "gradio", "hasura", "hono", "hoppscotch", "insomnia", "kafka", "koa",
        "kysely", "litestar", "logtail", "loki", "lucia", "mikro-orm", "mongodb",
        "nats", "neon", "nestjs", "openapi", "opentelemetry", "pgadmin", "planetscale",
        "pocketbase", "postman", "rabbitmq", "readme-api", "redis", "stoplight",
        "streamlit", "supabase", "swagger", "tableplus", "typeorm", "valkey"
    )
    "llm-runtimes" = @(
        "autogpt", "babyagi", "codegeex", "codeium", "ctranslate2", "deepspeed",
        "dspy", "enchant", "exllamav2", "ggml", "gpt4all", "haystack", "koboldai",
        "koboldcpp", "langchain", "llama-cpp", "llamafile", "llamaindex", "memgpt",
        "mistral", "mistral-inference", "mlx", "msty", "numpy", "ollama", "openai-cli",
        "opencv", "pillow", "piratex", "privategpt", "ragflow", "replit", "scikit-learn",
        "scipy", "sentence-transformers", "tabby", "tensorrt-llm", "text-generation-webui",
        "transformers", "triton", "vllm", "warp"
    )
    "cloud" = @(
        "aws-bedrock", "aws-sagemaker", "azure-ml", "azure-openai", "civitai",
        "colab", "gcp-vertex", "hf-hub", "hf-spaces", "huggingface", "lambda-cloud",
        "modelscope", "paperspace", "pytorch-hub", "replicate", "runpod",
        "tensorflow-hub", "titan", "vertex-ai"
    )
    "evaluation" = @(
        "arize-phoenix", "big-bench", "deepeval", "gpqa", "helm", "human-eval",
        "langsmith", "lm-eval", "mmlu", "open-llm-leaderboard", "promptfoo", "ragas"
    )
    "observability" = @(
        "arize-phoenix", "artillery", "datadog", "evidently", "grafana",
        "great-expectations", "helicone", "langsmith", "locust", "new-relic",
        "openlit", "prometheus", "sentry", "uptime-kuma"
    )
    "security" = @(
        "bandit", "data-privacy", "dependabot", "gitguardian", "gitleaks",
        "model-cards", "opa", "owasp-zap", "renovate", "semgrep", "snyk", "trivy", "trufflehog"
    )
    "devops" = @(
        "ansible", "argocd", "bun", "consul", "crossplane", "deno", "docker",
        "fly-io", "github-actions", "hasura", "kubernetes", "nvm-windows",
        "packer", "railway", "render", "terraform", "vault", "yarn"
    )
    "search" = @(
        "activepieces", "algolia", "elasticsearch", "huginn", "make", "meilisearch",
        "n8n", "solr", "tantivy", "typesense", "vespa", "windmill", "zapier"
    )
}

$totalCreated = 0

foreach ($cat in $categories.Keys) {
    $items = $categories[$cat]
    $existing = Get-ExistingItems -category $cat
    $catPath = Join-Path $basePath $cat

    if (-not (Test-Path $catPath)) {
        New-Item -ItemType Directory -Force -Path $catPath | Out-Null
    }

    foreach ($item in $items) {
        if ($item -notin $existing) {
            $itemPath = Join-Path $catPath $item
            if (-not (Test-Path $itemPath)) {
                New-Item -ItemType Directory -Force -Path $itemPath | Out-Null
            }

            $mdxPath = Join-Path $itemPath "index.mdx"
            if (-not (Test-Path $mdxPath)) {
                $title = ($item -replace '-', ' ' -replace '\b\w', { $_.Value.ToUpper() })
                $content = @"
---
title: "$title"
category: "$cat"
icon: "code"
difficulty: "beginner"
tags: ["$cat"]
---

## Tổng quan

<Note type="info">
**$title** là công cụ trong nhóm $cat. Xem tài liệu chính thức để biết chi tiết.
</Note>

## Liên kết

- [$title Official](https://google.com/search?q=$item)

"@
                Set-Content -Path $mdxPath -Value $content -Encoding UTF8
                $totalCreated++
            }
        }
    }
}

Write-Host "Done! Created $totalCreated placeholder files."
