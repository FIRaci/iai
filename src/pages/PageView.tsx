import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { StepBlock } from "@/components/blocks/StepBlock"
import { CodeBlock } from "@/components/blocks/CodeBlock"
import { NoteBlock } from "@/components/blocks/NoteBlock"
import { ComparisonTable } from "@/components/blocks/ComparisonTable"
import { MermaidDiagram } from "@/components/blocks/MermaidDiagram"
import { YesNoBadge } from "@/components/YesNoBadge"
import { Seo } from "@/components/Seo"
import { TableOfContents } from "@/components/TableOfContents"
import { PageTags } from "@/components/PageTags"
import { getContentModule } from "@/lib/content-loader"
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

export function PageView({ slug: propSlug }: { slug?: string }) {
  const params = useParams()
  const slug = propSlug || (params.slug as string)
  const path = `/${slug}`
  const loader = getContentModule(path)
  const mod = loader()
  const Content = mod?.default as ComponentType<MdxContentProps> | undefined

  if (!Content) {
    return (
      <div className="mx-auto max-w-3xl py-20 text-center text-muted-foreground">
        Nội dung đang được xây dựng...
      </div>
    )
  }

  return (
    <>
      <Seo
        title={mod.title || slug}
        description={`Hướng dẫn ${mod.title || slug} trên Windows 11`}
        path={path}
        type="article"
      />
      <div className="flex gap-10">
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2 text-[#656d76] dark:text-[#8b949e] hover:text-[#1f2328] dark:hover:text-[#e6edf3]">
              <Link to="/" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Trang chủ
              </Link>
            </Button>
            <h1 className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
              {mod.title || slug}
            </h1>
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
