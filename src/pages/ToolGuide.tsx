import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { StepBlock } from "@/components/blocks/StepBlock"
import { CodeBlock } from "@/components/blocks/CodeBlock"
import { NoteBlock } from "@/components/blocks/NoteBlock"
import { ComparisonTable } from "@/components/blocks/ComparisonTable"
import { MermaidDiagram } from "@/components/blocks/MermaidDiagram"
import { TableOfContents } from "@/components/TableOfContents"
import { Seo } from "@/components/Seo"
import { YesNoBadge } from "@/components/YesNoBadge"
import { PageTags } from "@/components/PageTags"
import { getToolIcon } from "@/lib/icons"
import { getContentModule, getContentTree } from "@/lib/content-loader"
import type { RouteNode } from "@/types/content"
import type { ComponentType } from "react"

const blockComponents = {
  StepBlock,
  CodeBlock,
  NoteBlock,
  Note: (props: Record<string, unknown>) => <NoteBlock type="info" {...props} />,
  Warning: (props: Record<string, unknown>) => <NoteBlock type="warning" {...props} />,
  Tip: (props: Record<string, unknown>) => <NoteBlock type="tip" {...props} />,
  Danger: (props: Record<string, unknown>) => <NoteBlock type="danger" {...props} />,
  ComparisonTable,
  MermaidDiagram,
  YesNoBadge,
  wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}

interface MdxContentProps {
  components: typeof blockComponents
}

const gradientMap: Record<string, string> = {
  // AI Coding
  "claude-code": "from-blue-600 via-indigo-500 to-purple-600",
  cursor: "from-cyan-500 via-teal-500 to-emerald-500",
  copilot: "from-emerald-500 via-green-500 to-teal-500",
  "copilot-workspace": "from-gray-500 via-slate-500 to-zinc-500",
  "github-spark": "from-amber-500 via-orange-500 to-yellow-500",
  devin: "from-amber-500 via-orange-500 to-red-500",
  windsurf: "from-sky-400 via-blue-500 to-indigo-600",
  openclaw: "from-rose-500 via-pink-500 to-purple-500",
  opencode: "from-violet-500 via-purple-500 to-fuchsia-500",
  deepseek: "from-blue-500 via-cyan-500 to-teal-500",
  "aws-kiro": "from-orange-500 via-amber-500 to-yellow-500",
  "jetbrains-junie": "from-red-500 via-rose-500 to-pink-500",
  "amazon-q": "from-yellow-500 via-amber-500 to-orange-500",
  "microsoft-ai-dev": "from-blue-500 via-indigo-500 to-violet-500",
  "chrome-devtools-ai": "from-green-500 via-emerald-500 to-teal-500",
  // LLM Runtimes
  "llama-cpp": "from-orange-500 via-amber-500 to-yellow-500",
  ggml: "from-amber-500 via-yellow-500 to-lime-500",
  mistral: "from-orange-600 via-red-500 to-rose-500",
  "mistral-inference": "from-red-500 via-orange-500 to-amber-500",
  transformers: "from-yellow-500 via-amber-500 to-orange-500",
  "text-generation-webui": "from-pink-500 via-rose-500 to-red-500",
  koboldai: "from-purple-500 via-violet-500 to-indigo-500",
  vllm: "from-emerald-500 via-teal-500 to-cyan-500",
  triton: "from-green-500 via-emerald-500 to-teal-500",
  ollama: "from-sky-500 via-blue-500 to-indigo-500",
  autogpt: "from-violet-500 via-purple-500 to-fuchsia-500",
  babyagi: "from-fuchsia-500 via-pink-500 to-rose-500",
  langchain: "from-teal-500 via-cyan-500 to-sky-500",
  llamaindex: "from-cyan-500 via-sky-500 to-blue-500",
  haystack: "from-amber-500 via-yellow-500 to-lime-500",
  replit: "from-orange-500 via-amber-500 to-yellow-500",
  "openai-cli": "from-emerald-500 via-teal-500 to-cyan-500",
  warp: "from-blue-500 via-indigo-500 to-violet-500",
  piratex: "from-red-500 via-rose-500 to-pink-500",
  codeium: "from-blue-500 via-cyan-500 to-teal-500",
  // AI Creative
  chatgpt: "from-emerald-500 via-teal-500 to-cyan-500",
  midjourney: "from-purple-500 via-pink-500 to-rose-500",
  dalle: "from-blue-500 via-purple-500 to-pink-500",
  "stable-diffusion": "from-indigo-500 via-purple-500 to-fuchsia-500",
  leonardo: "from-amber-500 via-orange-500 to-red-500",
  runway: "from-cyan-500 via-blue-500 to-indigo-500",
  // Multimodal
  "clip-interrogator": "from-pink-500 via-rose-500 to-red-500",
  diffusers: "from-yellow-500 via-amber-500 to-orange-500",
  automatic1111: "from-orange-500 via-red-500 to-rose-500",
  comfyui: "from-green-500 via-emerald-500 to-teal-500",
  invokeai: "from-violet-500 via-purple-500 to-fuchsia-500",
  controlnet: "from-cyan-500 via-blue-500 to-indigo-500",
  "novelai-webui": "from-pink-500 via-fuchsia-500 to-purple-500",
  kaiber: "from-purple-500 via-violet-500 to-indigo-500",
  sora: "from-blue-500 via-indigo-500 to-violet-500",
  "pika-labs": "from-rose-500 via-pink-500 to-fuchsia-500",
  descript: "from-teal-500 via-cyan-500 to-sky-500",
  soundraw: "from-amber-500 via-yellow-500 to-lime-500",
  melobytes: "from-fuchsia-500 via-pink-500 to-rose-500",
  whisper: "from-green-500 via-emerald-500 to-teal-500",
  "faster-whisper": "from-emerald-500 via-teal-500 to-cyan-500",
  // AI Productivity
  perplexity: "from-teal-500 via-emerald-500 to-green-500",
  gemini: "from-blue-500 via-indigo-500 to-purple-500",
  "lmsys-arena": "from-amber-500 via-yellow-500 to-orange-500",
  "notion-ai": "from-gray-500 via-slate-500 to-zinc-500",
  jasper: "from-amber-500 via-yellow-500 to-orange-500",
  elevenlabs: "from-orange-500 via-red-500 to-rose-500",
  // Search & Aggregators
  heygen: "from-blue-500 via-cyan-500 to-teal-500",
  "ai21-studio": "from-indigo-500 via-violet-500 to-purple-500",
  "you-com": "from-blue-500 via-indigo-500 to-violet-500",
  metaphor: "from-amber-500 via-orange-500 to-red-500",
  kagi: "from-green-500 via-emerald-500 to-teal-500",
  mem: "from-violet-500 via-purple-500 to-fuchsia-500",
  "obsidian-llm": "from-purple-500 via-violet-500 to-indigo-500",
  // Voice & Audio
  "coqui-tts": "from-green-500 via-emerald-500 to-teal-500",
  "mozilla-tts": "from-orange-500 via-amber-500 to-yellow-500",
  riffusion: "from-pink-500 via-rose-500 to-red-500",
  vocode: "from-cyan-500 via-blue-500 to-indigo-500",
  "resemble-ai": "from-violet-500 via-purple-500 to-fuchsia-500",
  silero: "from-blue-500 via-indigo-500 to-violet-500",
  "descript-overdub": "from-teal-500 via-cyan-500 to-sky-500",
  // IDEs & Editors
  vscode: "from-blue-500 via-indigo-500 to-sky-500",
  antigravity: "from-violet-500 via-purple-500 to-fuchsia-500",
  zed: "from-yellow-500 via-amber-500 to-orange-500",
  "sublime-text": "from-orange-500 via-amber-500 to-yellow-500",
  webstorm: "from-cyan-500 via-blue-500 to-indigo-500",
  pycharm: "from-green-500 via-emerald-500 to-teal-500",
  "android-studio": "from-green-500 via-lime-500 to-emerald-500",
  // IDE Plugins
  "neovim-ai": "from-green-500 via-emerald-500 to-teal-500",
  tabnine: "from-blue-500 via-indigo-500 to-violet-500",
  kite: "from-orange-500 via-amber-500 to-yellow-500",
  "jetbrains-ai": "from-cyan-500 via-blue-500 to-indigo-500",
  lunarvim: "from-green-500 via-lime-500 to-emerald-500",
  onivim: "from-blue-500 via-indigo-500 to-violet-500",
  // Dev Essentials
  nodejs: "from-green-500 via-emerald-500 to-teal-500",
  git: "from-orange-500 via-amber-500 to-yellow-500",
  docker: "from-blue-500 via-cyan-500 to-sky-500",
  npm: "from-red-500 via-rose-500 to-pink-500",
  pnpm: "from-yellow-500 via-amber-500 to-orange-500",
  // Dev Infra
  "nvm-windows": "from-green-500 via-emerald-500 to-teal-500",
  bun: "from-amber-500 via-yellow-500 to-lime-500",
  deno: "from-gray-500 via-slate-500 to-zinc-500",
  yarn: "from-blue-500 via-indigo-500 to-violet-500",
  terraform: "from-violet-500 via-purple-500 to-fuchsia-500",
  kubernetes: "from-blue-500 via-cyan-500 to-sky-500",
  "fly-io": "from-orange-500 via-amber-500 to-yellow-500",
  render: "from-gray-500 via-slate-500 to-zinc-500",
  railway: "from-violet-500 via-purple-500 to-fuchsia-500",
  hasura: "from-red-500 via-rose-500 to-pink-500",
  // Dev Utilities
  postman: "from-orange-500 via-amber-500 to-yellow-500",
  figma: "from-purple-500 via-pink-500 to-rose-500",
  "github-desktop": "from-gray-600 via-slate-600 to-zinc-600",
  wsl: "from-blue-500 via-indigo-500 to-purple-500",
  powershell: "from-blue-600 via-indigo-600 to-violet-600",
  "windows-terminal": "from-gray-500 via-slate-500 to-zinc-500",
  // Databases
  mongodb: "from-green-500 via-emerald-500 to-teal-500",
  postgresql: "from-blue-500 via-indigo-500 to-violet-500",
  // Vector DBs
  redis: "from-red-500 via-rose-500 to-pink-500",
  milvus: "from-blue-500 via-indigo-500 to-violet-500",
  weaviate: "from-cyan-500 via-blue-500 to-indigo-500",
  pinecone: "from-green-500 via-emerald-500 to-teal-500",
  qdrant: "from-orange-500 via-amber-500 to-yellow-500",
  faiss: "from-yellow-500 via-amber-500 to-orange-500",
  minio: "from-cyan-500 via-blue-500 to-indigo-500",
  // Datasets & Labeling
  "hf-datasets": "from-yellow-500 via-amber-500 to-orange-500",
  "label-studio": "from-green-500 via-emerald-500 to-teal-500",
  fiftyone: "from-violet-500 via-purple-500 to-fuchsia-500",
  roboflow: "from-orange-500 via-red-500 to-rose-500",
  snorkel: "from-cyan-500 via-blue-500 to-indigo-500",
  cvat: "from-blue-500 via-indigo-500 to-violet-500",
  // MLOps
  mlflow: "from-blue-500 via-indigo-500 to-violet-500",
  kserve: "from-green-500 via-emerald-500 to-teal-500",
  bentoml: "from-orange-500 via-amber-500 to-yellow-500",
  seldon: "from-cyan-500 via-blue-500 to-indigo-500",
  tfx: "from-orange-500 via-red-500 to-rose-500",
  neptune: "from-blue-500 via-cyan-500 to-teal-500",
  clearml: "from-green-500 via-lime-500 to-emerald-500",
  catalyst: "from-violet-500 via-purple-500 to-fuchsia-500",
  gradio: "from-orange-500 via-amber-500 to-yellow-500",
  streamlit: "from-red-500 via-rose-500 to-pink-500",
  // Observability
  prometheus: "from-orange-500 via-amber-500 to-yellow-500",
  sentry: "from-red-500 via-rose-500 to-pink-500",
  locust: "from-green-500 via-emerald-500 to-teal-500",
  artillery: "from-blue-500 via-indigo-500 to-violet-500",
  "great-expectations": "from-violet-500 via-purple-500 to-fuchsia-500",
  evidently: "from-cyan-500 via-blue-500 to-indigo-500",
  // Security
  opa: "from-blue-500 via-indigo-500 to-violet-500",
  snyk: "from-red-500 via-rose-500 to-pink-500",
  bandit: "from-green-500 via-emerald-500 to-teal-500",
  trivy: "from-blue-500 via-cyan-500 to-teal-500",
  "model-cards": "from-gray-500 via-slate-500 to-zinc-500",
  "data-privacy": "from-violet-500 via-purple-500 to-fuchsia-500",
  // Other
  "hf-hub": "from-yellow-500 via-amber-500 to-orange-500",
  replicate: "from-black via-gray-800 to-gray-600",
  paperspace: "from-blue-500 via-indigo-500 to-violet-500",
  colab: "from-yellow-500 via-amber-500 to-orange-500",
  "vertex-ai": "from-blue-500 via-cyan-500 to-teal-500",
  "azure-openai": "from-blue-500 via-indigo-500 to-violet-500",
  "aws-bedrock": "from-orange-500 via-amber-500 to-yellow-500",
  titan: "from-gray-500 via-slate-500 to-zinc-500",
}

export function ToolGuide() {
  const { category, slug } = useParams()
  const path = `/${category}/${slug}`
  const loader = getContentModule(path)
  const mod = loader()
  const Content = mod?.default as ComponentType<MdxContentProps> | undefined

  const tree = getContentTree()
  const cat = tree.find((c) => c.path === `/${category}`)
  const item = cat?.children.find((c: RouteNode) => c.path === path)

  if (!Content) {
    return (
      <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
        Nội dung đang được xây dựng...
      </div>
    )
  }

  const gradient = slug ? gradientMap[slug] || "from-primary to-blue-500" : "from-primary to-blue-500"

  return (
    <>
      <Seo
        title={item?.title || slug || "Hướng dẫn"}
        description={String(item?.frontmatter?.description || `Hướng dẫn chi tiết về ${slug} trên Windows 11`)}
        path={path}
        type="article"
      />
      <div className="flex gap-10">
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2 text-[#656d76] dark:text-[#8b949e] hover:text-[#1f2328] dark:hover:text-[#e6edf3]">
            <Link to={`/${category}`} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              {cat?.title || category}
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            {slug && (() => {
              const Icon = getToolIcon(slug)
              return (
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
                  <Icon className="h-5 w-5" />
                </div>
              )
            })()}
            <h1 className={`bg-gradient-to-r ${gradient} bg-clip-text text-3xl font-bold text-transparent`}>
              {item?.title || slug}
            </h1>
          </div>
          <PageTags difficulty={mod.difficulty} tags={mod.tags} />
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <Content components={blockComponents} />
        </div>
      </div>

      <TableOfContents />
      </div>
    </>
  )
}
