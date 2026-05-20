import { cn } from "@/lib/utils"

const difficultyLabels: Record<string, string> = {
  beginner: "Cơ bản",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
}

const difficultyConfig: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
  beginner: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    ring: "ring-emerald-600/20 dark:ring-emerald-400/30",
    dot: "bg-emerald-500",
  },
  intermediate: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    ring: "ring-amber-600/20 dark:ring-amber-400/30",
    dot: "bg-amber-500",
  },
  advanced: {
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    ring: "ring-red-600/20 dark:ring-red-400/30",
    dot: "bg-red-500",
  },
}

export function DifficultyBadge({ difficulty }: { difficulty?: string }) {
  if (!difficulty || !difficultyLabels[difficulty]) return null
  const cfg = difficultyConfig[difficulty]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1",
        cfg.bg, cfg.text, cfg.ring,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {difficultyLabels[difficulty]}
    </span>
  )
}

const tagConfig: Record<string, { bg: string; text: string; ring: string }> = {
  // AI Coding tags
  cli: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  anthropic: { bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30", text: "text-fuchsia-700 dark:text-fuchsia-400", ring: "ring-fuchsia-600/20 dark:ring-fuchsia-400/30" },
  editor: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  "ai-native": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  "ai-engineer": { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-400/30" },
  "open-source": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  github: { bg: "bg-gray-50 dark:bg-gray-950/30", text: "text-gray-700 dark:text-gray-400", ring: "ring-gray-600/20 dark:ring-gray-400/30" },
  microsoft: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  "version-control": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  javascript: { bg: "bg-yellow-50 dark:bg-yellow-950/30", text: "text-yellow-700 dark:text-yellow-400", ring: "ring-yellow-600/20 dark:ring-yellow-400/30" },
  runtime: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  comparison: { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  orchestration: { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-700 dark:text-purple-400", ring: "ring-purple-600/20 dark:ring-purple-400/30" },
  ide: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  web: { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30" },
  claude: { bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30", text: "text-fuchsia-700 dark:text-fuchsia-400", ring: "ring-fuchsia-600/20 dark:ring-fuchsia-400/30" },
  "large-language-model": { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-400/30" },
  // AI Creative tags
  "image-generation": { bg: "bg-pink-50 dark:bg-pink-950/30", text: "text-pink-700 dark:text-pink-400", ring: "ring-pink-600/20 dark:ring-pink-400/30" },
  "text-to-image": { bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-700 dark:text-rose-400", ring: "ring-rose-600/20 dark:ring-rose-400/30" },
  openai: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", ring: "ring-emerald-600/20 dark:ring-emerald-400/30" },
  chatbot: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "ai-art": { bg: "bg-pink-50 dark:bg-pink-950/30", text: "text-pink-700 dark:text-pink-400", ring: "ring-pink-600/20 dark:ring-pink-400/30" },
  creative: { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-700 dark:text-purple-400", ring: "ring-purple-600/20 dark:ring-purple-400/30" },
  "game-assets": { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  "gen-2": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  // AI Productivity tags
  "ai-search": { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", ring: "ring-emerald-600/20 dark:ring-emerald-400/30" },
  research: { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30" },
  "google-ai": { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  multimodal: { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  productivity: { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  workspace: { bg: "bg-slate-50 dark:bg-slate-950/30", text: "text-slate-700 dark:text-slate-400", ring: "ring-slate-600/20 dark:ring-slate-400/30" },
  "ai-writing": { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  marketing: { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  content: { bg: "bg-yellow-50 dark:bg-yellow-950/30", text: "text-yellow-700 dark:text-yellow-400", ring: "ring-yellow-600/20 dark:ring-yellow-400/30" },
  "video-ai": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  "voice-ai": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  "text-to-speech": { bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-700 dark:text-rose-400", ring: "ring-rose-600/20 dark:ring-rose-400/30" },
  audio: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  // Dev Tools tags
  "ai-coding": { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  "ai-ide": { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  container: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  docker: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  devops: { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-600/30" },
  "package-manager": { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  npm: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  pnpm: { bg: "bg-yellow-50 dark:bg-yellow-950/30", text: "text-yellow-700 dark:text-yellow-400", ring: "ring-yellow-600/20 dark:ring-yellow-400/30" },
  "api-testing": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  rest: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", ring: "ring-emerald-600/20 dark:ring-emerald-400/30" },
  graphql: { bg: "bg-pink-50 dark:bg-pink-950/30", text: "text-pink-700 dark:text-pink-400", ring: "ring-pink-600/20 dark:ring-pink-400/30" },
  design: { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-700 dark:text-purple-400", ring: "ring-purple-600/20 dark:ring-purple-400/30" },
  "ui-ux": { bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30", text: "text-fuchsia-700 dark:text-fuchsia-400", ring: "ring-fuchsia-600/20 dark:ring-fuchsia-400/30" },
  collaboration: { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30" },
  terminal: { bg: "bg-gray-50 dark:bg-gray-950/30", text: "text-gray-700 dark:text-gray-400", ring: "ring-gray-600/20 dark:ring-gray-400/30" },
  wsl: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  linux: { bg: "bg-yellow-50 dark:bg-yellow-950/30", text: "text-yellow-700 dark:text-yellow-400", ring: "ring-yellow-600/20 dark:ring-yellow-400/30" },
  development: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  powershell: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  scripting: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  windows: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  database: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "cloud-storage": { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  "git-client": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  nosql: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  mongodb: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  sql: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  postgresql: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  // IDEs & Editors tags
  rust: { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  performance: { bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400", ring: "ring-emerald-600/20 dark:ring-emerald-400/30" },
  lightweight: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  jetbrains: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  python: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  mobile: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  android: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  // LLM Runtime tags
  "llm-runtime": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  "local-ai": { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  inference: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  "agent-framework": { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  rag: { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30" },
  retrieval: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  // Multimodal tags
  "image-captioning": { bg: "bg-pink-50 dark:bg-pink-950/30", text: "text-pink-700 dark:text-pink-400", ring: "ring-pink-600/20 dark:ring-pink-400/30" },
  "diffusion-models": { bg: "bg-purple-50 dark:bg-purple-950/30", text: "text-purple-700 dark:text-purple-400", ring: "ring-purple-600/20 dark:ring-purple-400/30" },
  "video-generation": { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-400/30" },
  "music-generation": { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  "speech-to-text": { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "node-based": { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  // Voice & Audio tags
  tts: { bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-700 dark:text-rose-400", ring: "ring-rose-600/20 dark:ring-rose-400/30" },
  "voice-cloning": { bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30", text: "text-fuchsia-700 dark:text-fuchsia-400", ring: "ring-fuchsia-600/20 dark:ring-fuchsia-400/30" },
  "audio-processing": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  // Search & Productivity tags
  "semantic-search": { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30" },
  "knowledge-base": { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  "video-avatar": { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  // IDE Plugin tags
  "code-completion": { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  lsp: { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  neovim: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "modal-editor": { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-400/30" },
  // Dev Infra tags
  "version-manager": { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "runtime-alternative": { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  "infra-as-code": { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  "deploy-platform": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  paas: { bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400", ring: "ring-sky-600/20 dark:ring-sky-400/30" },
  "backend-as-service": { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  // Vector DB tags
  "vector-database": { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  "similarity-search": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  "object-storage": { bg: "bg-gray-50 dark:bg-gray-950/30", text: "text-gray-700 dark:text-gray-400", ring: "ring-gray-600/20 dark:ring-gray-400/30" },
  caching: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  // Dataset tags
  datasets: { bg: "bg-yellow-50 dark:bg-yellow-950/30", text: "text-yellow-700 dark:text-yellow-400", ring: "ring-yellow-600/20 dark:ring-yellow-400/30" },
  annotation: { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "data-visualization": { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  "weak-supervision": { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30" },
  // MLOps tags
  mlops: { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  "experiment-tracking": { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-400/30" },
  "model-serving": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  "model-deployment": { bg: "bg-teal-50 dark:bg-teal-950/30", text: "text-teal-700 dark:text-teal-400", ring: "ring-teal-600/20 dark:ring-teal-400/30" },
  "ml-monitoring": { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  "model-ui": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  // Observability tags
  monitoring: { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  metrics: { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  "error-tracking": { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  "load-testing": { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "data-testing": { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  "data-drift": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  // Security tags
  security: { bg: "bg-red-50 dark:bg-red-950/30", text: "text-red-700 dark:text-red-400", ring: "ring-red-600/20 dark:ring-red-400/30" },
  "policy-enforcement": { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  "dependency-scanning": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  "security-linting": { bg: "bg-green-50 dark:bg-green-950/30", text: "text-green-700 dark:text-green-400", ring: "ring-green-600/20 dark:ring-green-400/30" },
  "container-scanning": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  "model-documentation": { bg: "bg-gray-50 dark:bg-gray-950/30", text: "text-gray-700 dark:text-gray-400", ring: "ring-gray-600/20 dark:ring-gray-400/30" },
  "data-privacy": { bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-400", ring: "ring-violet-600/20 dark:ring-violet-400/30" },
  // Other tags
  "model-hosting": { bg: "bg-yellow-50 dark:bg-yellow-950/30", text: "text-yellow-700 dark:text-yellow-400", ring: "ring-yellow-600/20 dark:ring-yellow-400/30" },
  "inference-api": { bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400", ring: "ring-orange-600/20 dark:ring-orange-400/30" },
  "cloud-gpu": { bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400", ring: "ring-blue-600/20 dark:ring-blue-400/30" },
  notebooks: { bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400", ring: "ring-amber-600/20 dark:ring-amber-400/30" },
  "managed-ai": { bg: "bg-cyan-50 dark:bg-cyan-950/30", text: "text-cyan-700 dark:text-cyan-400", ring: "ring-cyan-600/20 dark:ring-cyan-400/30" },
  "enterprise-ai": { bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-400", ring: "ring-indigo-600/20 dark:ring-indigo-400/30" },
}

export function TagBadge({ tag }: { tag: string }) {
  const cfg = tagConfig[tag] || { bg: "bg-muted", text: "text-muted-foreground", ring: "ring-border" }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        cfg.bg, cfg.text, cfg.ring,
      )}
    >
      {tag}
    </span>
  )
}

export function PageTags({ difficulty, tags }: { difficulty?: string; tags?: string[] }) {
  if (!difficulty && (!tags || tags.length === 0)) return null
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {difficulty && <DifficultyBadge difficulty={difficulty} />}
      {tags?.map((tag) => <TagBadge key={tag} tag={tag} />)}
    </div>
  )
}
