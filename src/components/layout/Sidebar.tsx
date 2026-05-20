import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  BookOpen, GitCompare, ChevronDown, Compass, Database, Monitor,
  Cpu, Shield, Eye, FolderTree,
  BarChart3, Video, Cloud, Settings, FileText,
  Package, TestTube, Brain,
  Server, Workflow, Sparkles,
  Notebook,
  Palette,
} from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { StarThemeToggle } from "@/components/StarThemeToggle"
import { getToolIcon } from "@/lib/icons"

const topLinks = [
  { title: "Bắt đầu", icon: Compass, path: "/getting-started" },
]

interface NavChild {
  title: string
  path: string
}

interface NavGroup {
  title: string
  icon: typeof BookOpen
  path: string
  children: NavChild[]
}

const navItems: NavGroup[] = [
  {
    title: "Frontend",
    icon: Monitor,
    path: "/frontend",
    children: [
      { title: "Angular", path: "/frontend/angular" },
      { title: "Astro", path: "/frontend/astro" },
      { title: "Chakra UI", path: "/frontend/chakra-ui" },
      { title: "Chromatic", path: "/frontend/chromatic" },
      { title: "CSS Modules", path: "/frontend/css-modules" },
      { title: "DaisyUI", path: "/frontend/daisyui" },
      { title: "Formik", path: "/frontend/formik" },
      { title: "Framer Motion", path: "/frontend/framer-motion" },
      { title: "Headless UI", path: "/frontend/headless-ui" },
      { title: "Jest", path: "/frontend/jest" },
      { title: "Jotai", path: "/frontend/jotai" },
      { title: "Ladle", path: "/frontend/ladle" },
      { title: "Mantine", path: "/frontend/mantine" },
      { title: "Material UI", path: "/frontend/material-ui" },
      { title: "Motion One", path: "/frontend/motion-one" },
      { title: "MSW", path: "/frontend/msw" },
      { title: "Next.js", path: "/frontend/next-js" },
      { title: "Nuxt", path: "/frontend/nuxt" },
      { title: "Panda CSS", path: "/frontend/panda-css" },
      { title: "Qwik", path: "/frontend/qwik" },
      { title: "Radix UI", path: "/frontend/radix-ui" },
      { title: "React Hook Form", path: "/frontend/react-hook-form" },
      { title: "Recoil", path: "/frontend/recoil" },
      { title: "Redux Toolkit", path: "/frontend/redux-toolkit" },
      { title: "Remix", path: "/frontend/remix" },
      { title: "SolidStart", path: "/frontend/solidstart" },
      { title: "SvelteKit", path: "/frontend/sveltekit" },
      { title: "TanStack Query", path: "/frontend/tanstack-query" },
      { title: "TanStack Router", path: "/frontend/tanstack-router" },
      { title: "TanStack Start", path: "/frontend/tanstack-start" },
      { title: "Testing Library", path: "/frontend/testing-library" },
      { title: "TypeScript", path: "/frontend/typescript" },
      { title: "UnoCSS", path: "/frontend/unocss" },
      { title: "Valibot", path: "/frontend/valibot" },
      { title: "Valtio", path: "/frontend/valtio" },
      { title: "Vue.js", path: "/frontend/vue" },
      { title: "XState", path: "/frontend/xstate" },
      { title: "Yup", path: "/frontend/yup" },
      { title: "Zod", path: "/frontend/zod" },
      { title: "Zustand", path: "/frontend/zustand" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    path: "/backend",
    children: [
      { title: "Agenda", path: "/backend/agenda" },
      { title: "Appwrite", path: "/backend/appwrite" },
      { title: "Auth.js", path: "/backend/auth-js" },
      { title: "Better Auth", path: "/backend/better-auth" },
      { title: "Bruno", path: "/backend/bruno" },
      { title: "BullMQ", path: "/backend/bullmq" },
      { title: "Clerk", path: "/backend/clerk" },
      { title: "DBeaver", path: "/backend/dbeaver" },
      { title: "Express", path: "/backend/express" },
      { title: "Fastify", path: "/backend/fastify" },
      { title: "Firebase", path: "/backend/firebase" },
      { title: "Hasura", path: "/backend/hasura" },
      { title: "Hono", path: "/backend/hono" },
      { title: "Hoppscotch", path: "/backend/hoppscotch" },
      { title: "Kafka", path: "/backend/kafka" },
      { title: "Koa", path: "/backend/koa" },
      { title: "Kysely", path: "/backend/kysely" },
      { title: "Logtail", path: "/backend/logtail" },
      { title: "Loki", path: "/backend/loki" },
      { title: "Lucia", path: "/backend/lucia" },
      { title: "MikroORM", path: "/backend/mikro-orm" },
      { title: "MongoDB", path: "/backend/mongodb" },
      { title: "NATS", path: "/backend/nats" },
      { title: "Neon", path: "/backend/neon" },
      { title: "NestJS", path: "/backend/nestjs" },
      { title: "OpenAPI", path: "/backend/openapi" },
      { title: "OpenTelemetry", path: "/backend/opentelemetry" },
      { title: "pgAdmin", path: "/backend/pgadmin" },
      { title: "PlanetScale", path: "/backend/planetscale" },
      { title: "PocketBase", path: "/backend/pocketbase" },
      { title: "RabbitMQ", path: "/backend/rabbitmq" },
      { title: "Redis", path: "/backend/redis" },
      { title: "Supabase", path: "/backend/supabase" },
      { title: "Swagger", path: "/backend/swagger" },
      { title: "TablePlus", path: "/backend/tableplus" },
      { title: "TypeORM", path: "/backend/typeorm" },
      { title: "Valkey", path: "/backend/valkey" },
    ],
  },
  {
    title: "AI Tools",
    icon: Sparkles,
    path: "/ai-tools",
    children: [
      { title: "Aider", path: "/ai-tools/aider" },
      { title: "AI21 Studio", path: "/ai-tools/ai21-studio" },
      { title: "Amazon Q", path: "/ai-tools/amazon-q" },
      { title: "Amazon Q CLI", path: "/ai-tools/amazon-q-cli" },
      { title: "Anthropic API", path: "/ai-tools/anthropic-api" },
      { title: "AnythingLLM", path: "/ai-tools/anything-llm" },
      { title: "Arc Search", path: "/ai-tools/arc-search" },
      { title: "Augment Code", path: "/ai-tools/augment-code" },
      { title: "AutoGen", path: "/ai-tools/autogen" },
      { title: "AWS Kiro", path: "/ai-tools/aws-kiro" },
      { title: "Base44", path: "/ai-tools/base44" },
      { title: "Bolt.new", path: "/ai-tools/bolt-new" },
      { title: "Brave Leo", path: "/ai-tools/brave-leo" },
      { title: "Cerebras Inference", path: "/ai-tools/cerebras-inference" },
      { title: "ChatGPT", path: "/ai-tools/chatgpt" },
      { title: "ChatGPT Desktop", path: "/ai-tools/chatgpt-desktop" },
      { title: "Chrome DevTools AI", path: "/ai-tools/chrome-devtools-ai" },
      { title: "Claude Code", path: "/ai-tools/claude-code" },
      { title: "Claude Desktop", path: "/ai-tools/claude-desktop" },
      { title: "Claude Kit", path: "/ai-tools/claude-kit" },
      { title: "Cline", path: "/ai-tools/cline" },
      { title: "Continue", path: "/ai-tools/continue" },
      { title: "Copilot", path: "/ai-tools/copilot" },
      { title: "Copilot Workspace", path: "/ai-tools/copilot-workspace" },
      { title: "CrewAI", path: "/ai-tools/crewai" },
      { title: "Cursor", path: "/ai-tools/cursor" },
      { title: "DALL-E", path: "/ai-tools/dalle" },
      { title: "DeepSeek", path: "/ai-tools/deepseek" },
      { title: "DeepSeek API", path: "/ai-tools/deepseek-api" },
      { title: "Devin", path: "/ai-tools/devin" },
      { title: "Dify", path: "/ai-tools/dify" },
      { title: "ElevenLabs", path: "/ai-tools/elevenlabs" },
      { title: "Fireworks AI", path: "/ai-tools/fireworks-ai" },
      { title: "Flowise", path: "/ai-tools/flowise" },
      { title: "Gemini", path: "/ai-tools/gemini" },
      { title: "Gemini CLI", path: "/ai-tools/gemini-cli" },
      { title: "GitHub Spark", path: "/ai-tools/github-spark" },
      { title: "Google AI Studio", path: "/ai-tools/google-ai-studio" },
      { title: "Groq", path: "/ai-tools/groq" },
      { title: "HeyGen", path: "/ai-tools/heygen" },
      { title: "Hugging Face Inference", path: "/ai-tools/hugging-face-inference" },
      { title: "Hugging Face TGI", path: "/ai-tools/hugging-face-tgi" },
      { title: "Jan", path: "/ai-tools/jan" },
      { title: "Jasper AI", path: "/ai-tools/jasper" },
      { title: "JetBrains Junie", path: "/ai-tools/jetbrains-junie" },
      { title: "Kagi", path: "/ai-tools/kagi" },
      { title: "Kite", path: "/ai-tools/kite" },
      { title: "Langflow", path: "/ai-tools/langflow" },
      { title: "LangGraph", path: "/ai-tools/langgraph" },
      { title: "Leonardo AI", path: "/ai-tools/leonardo" },
      { title: "LM Studio", path: "/ai-tools/lm-studio" },
      { title: "LM Sys Arena", path: "/ai-tools/lmsys-arena" },
      { title: "LocalAI", path: "/ai-tools/localai" },
      { title: "Lovable", path: "/ai-tools/lovable" },
      { title: "Mastra", path: "/ai-tools/mastra" },
      { title: "Mem", path: "/ai-tools/mem" },
      { title: "Metaphor", path: "/ai-tools/metaphor" },
      { title: "Midjourney", path: "/ai-tools/midjourney" },
      { title: "Microsoft AI Dev", path: "/ai-tools/microsoft-ai-dev" },
      { title: "Mistral API", path: "/ai-tools/mistral-api" },
      { title: "Notion AI", path: "/ai-tools/notion-ai" },
      { title: "Obsidian LLM", path: "/ai-tools/obsidian-llm" },
      { title: "Open Interpreter", path: "/ai-tools/open-interpreter" },
      { title: "Open WebUI", path: "/ai-tools/open-webui" },
      { title: "OpenAI API", path: "/ai-tools/openai-api" },
      { title: "OpenAI Codex", path: "/ai-tools/openai-codex" },
      { title: "OpenClaw", path: "/ai-tools/openclaw" },
      { title: "OpenCode", path: "/ai-tools/opencode" },
      { title: "OpenHands", path: "/ai-tools/openhands" },
      { title: "OpenRouter", path: "/ai-tools/openrouter" },
      { title: "Perplexity", path: "/ai-tools/perplexity" },
      { title: "Phind", path: "/ai-tools/phind" },
      { title: "Replit Agent", path: "/ai-tools/replit-agent" },
      { title: "Roo Code", path: "/ai-tools/roo-code" },
      { title: "Runway ML", path: "/ai-tools/runway" },
      { title: "SmolAgents", path: "/ai-tools/smolagents" },
      { title: "Sourcegraph Cody", path: "/ai-tools/sourcegraph-cody" },
      { title: "Stable Diffusion", path: "/ai-tools/stable-diffusion" },
      { title: "Together AI", path: "/ai-tools/together" },
      { title: "Vercel v0", path: "/ai-tools/vercel-v0" },
      { title: "Windsurf", path: "/ai-tools/windsurf" },
      { title: "xAI Grok API", path: "/ai-tools/xai-grok-api" },
      { title: "You.com", path: "/ai-tools/you-com" },
    ],
  },
  {
    title: "LLM Runtimes & RAG",
    icon: Cpu,
    path: "/llm-runtimes",
    children: [
      { title: "AutoGPT", path: "/llm-runtimes/autogpt" },
      { title: "BabyAGI", path: "/llm-runtimes/babyagi" },
      { title: "CodeGeeX", path: "/llm-runtimes/codegeex" },
      { title: "Codeium", path: "/llm-runtimes/codeium" },
      { title: "CTranslate2", path: "/llm-runtimes/ctranslate2" },
      { title: "DeepSpeed", path: "/llm-runtimes/deepspeed" },
      { title: "ExLlamaV2", path: "/llm-runtimes/exllamav2" },
      { title: "GGML", path: "/llm-runtimes/ggml" },
      { title: "Haystack", path: "/llm-runtimes/haystack" },
      { title: "KoboldAI", path: "/llm-runtimes/koboldai" },
      { title: "LangChain", path: "/llm-runtimes/langchain" },
      { title: "Llama.cpp", path: "/llm-runtimes/llama-cpp" },
      { title: "LlamaIndex", path: "/llm-runtimes/llamaindex" },
      { title: "Mistral", path: "/llm-runtimes/mistral" },
      { title: "Mistral Inference", path: "/llm-runtimes/mistral-inference" },
      { title: "MLX", path: "/llm-runtimes/mlx" },
      { title: "Ollama", path: "/llm-runtimes/ollama" },
      { title: "OpenAI CLI", path: "/llm-runtimes/openai-cli" },
      { title: "PirateX", path: "/llm-runtimes/piratex" },
      { title: "Replit", path: "/llm-runtimes/replit" },
      { title: "Tabby", path: "/llm-runtimes/tabby" },
      { title: "TensorRT LLM", path: "/llm-runtimes/tensorrt-llm" },
      { title: "Text Generation WebUI", path: "/llm-runtimes/text-generation-webui" },
      { title: "Transformers", path: "/llm-runtimes/transformers" },
      { title: "Triton", path: "/llm-runtimes/triton" },
      { title: "vLLM", path: "/llm-runtimes/vllm" },
      { title: "Warp", path: "/llm-runtimes/warp" },
    ],
  },
  {
    title: "AI Creative",
    icon: Palette,
    path: "/ai-creative",
    children: [
    ],
  },
  {
    title: "Video & Media",
    icon: Video,
    path: "/video",
    children: [
      { title: "FFmpeg", path: "/video/ffmpeg" },
      { title: "HandBrake", path: "/video/handbrake" },
      { title: "Kdenlive", path: "/video/kdenlive" },
      { title: "MPV", path: "/video/mpv" },
      { title: "OBS Studio", path: "/video/obs-studio" },
      { title: "Shotcut", path: "/video/shotcut" },
      { title: "VLC", path: "/video/vlc" },
    ],
  },
  {
    title: "Visualization",
    icon: BarChart3,
    path: "/visualization",
    children: [
      { title: "Chart.js", path: "/visualization/chart-js" },
      { title: "D3", path: "/visualization/d3" },
      { title: "ECharts", path: "/visualization/echarts" },
      { title: "Matplotlib", path: "/visualization/matplotlib" },
      { title: "Plotly", path: "/visualization/plotly" },
      { title: "Vega Lite", path: "/visualization/vega-lite" },
    ],
  },
  {
    title: "Data & Databases",
    icon: Database,
    path: "/databases",
    children: [
      { title: "Cloudflare D1", path: "/databases/cloudflare-d1" },
      { title: "DuckDB", path: "/databases/duckdb" },
      { title: "LibSQL", path: "/databases/libsql" },
      { title: "SQLite", path: "/databases/sqlite" },
      { title: "SurrealDB", path: "/databases/surrealdb" },
      { title: "Turso", path: "/databases/turso" },
    ],
  },
  {
    title: "ML & Training",
    icon: Brain,
    path: "/ml-training",
    children: [
    ],
  },
  {
    title: "Cloud & Model Hubs",
    icon: Cloud,
    path: "/cloud",
    children: [
      { title: "AWS SageMaker", path: "/cloud/aws-sagemaker" },
      { title: "Azure ML", path: "/cloud/azure-ml" },
      { title: "Google Colab", path: "/cloud/colab" },
      { title: "GCP Vertex", path: "/cloud/gcp-vertex" },
      { title: "HF Spaces", path: "/cloud/hf-spaces" },
      { title: "Lambda Cloud", path: "/cloud/lambda-cloud" },
      { title: "RunPod", path: "/cloud/runpod" },
    ],
  },
  {
    title: "Evaluation & Benchmarking",
    icon: TestTube,
    path: "/evaluation",
    children: [
      { title: "Arize Phoenix", path: "/evaluation/arize-phoenix" },
      { title: "DeepEval", path: "/evaluation/deepeval" },
      { title: "LangSmith", path: "/evaluation/langsmith" },
      { title: "LM Eval", path: "/evaluation/lm-eval" },
      { title: "Promptfoo", path: "/evaluation/promptfoo" },
      { title: "RAGAS", path: "/evaluation/ragas" },
    ],
  },
  {
    title: "Testing",
    icon: TestTube,
    path: "/testing",
    children: [
      { title: "Cypress", path: "/testing/cypress" },
      { title: "DeepEval", path: "/testing/deepeval" },
      { title: "Jest", path: "/testing/jest" },
      { title: "Playwright", path: "/testing/playwright" },
      { title: "Pytest", path: "/testing/pytest" },
      { title: "Vitest", path: "/testing/vitest" },
    ],
  },
  {
    title: "Observability & Monitoring",
    icon: Eye,
    path: "/observability",
    children: [
      { title: "Arize Phoenix", path: "/observability/arize-phoenix" },
      { title: "Artillery", path: "/observability/artillery" },
      { title: "Datadog", path: "/observability/datadog" },
      { title: "Evidently", path: "/observability/evidently" },
      { title: "Grafana", path: "/observability/grafana" },
      { title: "Great Expectations", path: "/observability/great-expectations" },
      { title: "Helicone", path: "/observability/helicone" },
      { title: "LangSmith", path: "/observability/langsmith" },
      { title: "Locust", path: "/observability/locust" },
      { title: "New Relic", path: "/observability/new-relic" },
      { title: "OpenLIT", path: "/observability/openlit" },
      { title: "Prometheus", path: "/observability/prometheus" },
      { title: "Sentry", path: "/observability/sentry" },
    ],
  },
  {
    title: "Security & Ethics",
    icon: Shield,
    path: "/security",
    children: [
      { title: "Bandit", path: "/security/bandit" },
      { title: "Data Privacy", path: "/security/data-privacy" },
      { title: "Dependabot", path: "/security/dependabot" },
      { title: "GitGuardian", path: "/security/gitguardian" },
      { title: "Gitleaks", path: "/security/gitleaks" },
      { title: "Model Cards", path: "/security/model-cards" },
      { title: "OPA", path: "/security/opa" },
      { title: "OWASP ZAP", path: "/security/owasp-zap" },
      { title: "Renovate", path: "/security/renovate" },
      { title: "Semgrep", path: "/security/semgrep" },
      { title: "Snyk", path: "/security/snyk" },
      { title: "Trivy", path: "/security/trivy" },
      { title: "TruffleHog", path: "/security/trufflehog" },
    ],
  },
  {
    title: "Dev Tools",
    icon: Monitor,
    path: "/dev-tools",
    children: [
      { title: "Android Studio", path: "/dev-tools/android-studio" },
      { title: "Antigravity", path: "/dev-tools/antigravity" },
      { title: "Docker", path: "/dev-tools/docker" },
      { title: "Figma", path: "/dev-tools/figma" },
      { title: "Git", path: "/dev-tools/git" },
      { title: "GitHub Desktop", path: "/dev-tools/github-desktop" },
      { title: "MongoDB", path: "/dev-tools/mongodb" },
      { title: "Node.js", path: "/dev-tools/nodejs" },
      { title: "npm", path: "/dev-tools/npm" },
      { title: "pnpm", path: "/dev-tools/pnpm" },
      { title: "PostgreSQL", path: "/dev-tools/postgresql" },
      { title: "PowerShell", path: "/dev-tools/powershell" },
      { title: "PyCharm", path: "/dev-tools/pycharm" },
      { title: "Sublime Text", path: "/dev-tools/sublime-text" },
      { title: "VS Code", path: "/dev-tools/vscode" },
      { title: "WebStorm", path: "/dev-tools/webstorm" },
      { title: "Windows Terminal", path: "/dev-tools/windows-terminal" },
      { title: "WSL", path: "/dev-tools/wsl" },
      { title: "Zed", path: "/dev-tools/zed" },
    ],
  },
  {
    title: "DevOps & Infra",
    icon: FolderTree,
    path: "/devops",
    children: [
      { title: "Ansible", path: "/devops/ansible" },
      { title: "ArgoCD", path: "/devops/argocd" },
      { title: "Consul", path: "/devops/consul" },
      { title: "Crossplane", path: "/devops/crossplane" },
      { title: "Docker", path: "/devops/docker" },
      { title: "GitHub Actions", path: "/devops/github-actions" },
      { title: "Packer", path: "/devops/packer" },
      { title: "Terraform", path: "/devops/terraform" },
      { title: "Vault", path: "/devops/vault" },
    ],
  },
  {
    title: "Search & Automation",
    icon: Workflow,
    path: "/search",
    children: [
      { title: "Algolia", path: "/search/algolia" },
      { title: "Elasticsearch", path: "/search/elasticsearch" },
      { title: "Meilisearch", path: "/search/meilisearch" },
      { title: "Solr", path: "/search/solr" },
      { title: "Tantivy", path: "/search/tantivy" },
      { title: "Typesense", path: "/search/typesense" },
      { title: "Vespa", path: "/search/vespa" },
    ],
  },
  {
    title: "Package Managers",
    icon: Package,
    path: "/package-managers",
    children: [
      { title: "apt", path: "/package-managers/apt" },
      { title: "Bun", path: "/package-managers/bun" },
      { title: "Cargo", path: "/package-managers/cargo" },
      { title: "Chocolatey", path: "/package-managers/chocolatey" },
      { title: "Composer", path: "/package-managers/composer" },
      { title: "Conda", path: "/package-managers/conda" },
      { title: "Deno", path: "/package-managers/deno" },
      { title: "dnf", path: "/package-managers/dnf" },
      { title: "gem", path: "/package-managers/gem" },
      { title: "Gradle", path: "/package-managers/gradle" },
      { title: "Homebrew", path: "/package-managers/homebrew" },
      { title: "Maven", path: "/package-managers/maven" },
      { title: "NuGet", path: "/package-managers/nuget" },
      { title: "pacman", path: "/package-managers/pacman" },
      { title: "pip", path: "/package-managers/pip" },
      { title: "Scoop", path: "/package-managers/scoop" },
      { title: "uv", path: "/package-managers/uv" },
      { title: "winget", path: "/package-managers/winget" },
      { title: "Yarn", path: "/package-managers/yarn" },
    ],
  },
  {
    title: "Utilities",
    icon: Settings,
    path: "/utilities",
    children: [
      { title: "Argparse", path: "/utilities/argparse" },
      { title: "Click", path: "/utilities/click" },
      { title: "Inquirer", path: "/utilities/inquirer" },
      { title: "Prompts", path: "/utilities/prompts" },
      { title: "Rich", path: "/utilities/rich" },
      { title: "Typer", path: "/utilities/typer" },
    ],
  },
  {
    title: "Documentation",
    icon: FileText,
    path: "/documentation",
    children: [
      { title: "Astro Docs", path: "/documentation/astro-docs" },
      { title: "Docusaurus", path: "/documentation/docusaurus" },
      { title: "GitBook", path: "/documentation/gitbook" },
      { title: "MDBook", path: "/documentation/mdbook" },
      { title: "Mintlify", path: "/documentation/mintlify" },
      { title: "Nextra", path: "/documentation/nextra" },
      { title: "Readme", path: "/documentation/readme" },
      { title: "VitePress", path: "/documentation/vitepress" },
    ],
  },
  {
    title: "Notebooks",
    icon: Notebook,
    path: "/notebooks",
    children: [
      { title: "DeepNote", path: "/notebooks/deepnote" },
      { title: "Hex", path: "/notebooks/hex" },
      { title: "Jupyter", path: "/notebooks/jupyter" },
      { title: "JupyterLab", path: "/notebooks/jupyterlab" },
      { title: "Observable", path: "/notebooks/observable" },
    ],
  },
  {
    title: "Windows 11 Setup",
    icon: Monitor,
    path: "/windows-setup",
    children: [
      { title: "Debian on WSL", path: "/windows-setup/debian-wsl" },
      { title: "Dev Home", path: "/windows-setup/dev-home" },
      { title: "Fedora on WSL", path: "/windows-setup/fedora-wsl" },
      { title: "Git for Windows", path: "/windows-setup/git-for-windows" },
      { title: "GitHub Desktop", path: "/windows-setup/github-desktop" },
      { title: "Hyper-V", path: "/windows-setup/hyper-v" },
      { title: "Podman Desktop", path: "/windows-setup/podman-desktop" },
      { title: "PowerToys", path: "/windows-setup/powertoys" },
      { title: "Sysinternals Suite", path: "/windows-setup/sysinternals" },
      { title: "Ubuntu on WSL", path: "/windows-setup/ubuntu-wsl" },
      { title: "Visual Studio 2022", path: "/windows-setup/visual-studio-2022" },
    ],
  },
  {
    title: "So sánh",
    icon: GitCompare,
    path: "/comparisons",
    children: [
      { title: "AI Coding Tools", path: "/comparisons/ai-coding-tools" },
      { title: "AI Chat Models", path: "/comparisons/ai-chat-models" },
      { title: "Vector Databases", path: "/comparisons/vector-databases" },
      { title: "LLM Runtimes", path: "/comparisons/llm-runtimes" },
      { title: "Frontend Frameworks", path: "/comparisons/frontend-frameworks" },
      { title: "Backend Frameworks", path: "/comparisons/backend-frameworks" },
    ],
  },
]

function NavItem({
  item,
  isActive,
}: {
  item: NavGroup
  isActive: boolean
}) {
  const location = useLocation()
  const childActive = item.children.some((c) => location.pathname === c.path)
  const [open, setOpen] = useState(childActive)

  useEffect(() => {
    if (childActive) setOpen(true)
  }, [childActive])

  const childCount = item.children.length
  const maxHeight = childCount * 36 + 16

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`nav-group-${item.title}`}
        className={cn(
          "sidebar-link flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
          isActive || childActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        )}
      >
        {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
        <span className="flex-1 text-left truncate">{item.title}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={`nav-group-${item.title}`}
        role="region"
        className="overflow-hidden collapsible-content"
        style={{ maxHeight: open ? `${maxHeight}px` : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="ml-3 mt-1 space-y-0.5 border-l border-sidebar-border pl-2">
          {item.children.map((child) => {
            const slug = child.path.split("/").pop() || ""
            const ChildIcon = getToolIcon(slug)
            const isChildActive = location.pathname === child.path
            return (
              <Link
                key={child.path}
                to={child.path}
                aria-current={isChildActive ? "page" : undefined}
                className={cn(
                  "sidebar-link flex items-center gap-2 rounded-md px-3 py-1.5 text-sm",
                  isChildActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{child.title}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar-background text-sidebar-foreground lg:block">
      <div className="flex h-full flex-col">
        <Link
          to="/"
          className="sidebar-link flex items-center gap-2.5 border-b border-sidebar-border px-4 py-4 font-semibold"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500 text-white shadow-sm">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">IAI</span>
        </Link>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Main navigation">
          {topLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "sidebar-link flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.title}
              </Link>
            )
          })}
          <div className="my-2 border-t border-sidebar-border" />
          {navItems.map((item) => (
            <NavItem
              key={item.title}
              item={item}
              isActive={location.pathname.startsWith(item.path)}
            />
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3 flex items-center gap-2">
          <ThemeToggle />
          <StarThemeToggle />
        </div>
      </div>
    </aside>
  )
}
