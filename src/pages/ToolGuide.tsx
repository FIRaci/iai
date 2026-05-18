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
  "claude-code": "from-blue-600 via-indigo-500 to-purple-600",
  "claude-kit": "from-purple-600 via-violet-500 to-fuchsia-500",
  cursor: "from-cyan-500 via-teal-500 to-emerald-500",
  copilot: "from-emerald-500 via-green-500 to-teal-500",
  devin: "from-amber-500 via-orange-500 to-red-500",
  windsurf: "from-sky-400 via-blue-500 to-indigo-600",
  openclaw: "from-rose-500 via-pink-500 to-purple-500",
  nodejs: "from-green-500 via-emerald-500 to-teal-500",
  git: "from-orange-500 via-amber-500 to-yellow-500",
  vscode: "from-blue-500 via-indigo-500 to-sky-500",
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
