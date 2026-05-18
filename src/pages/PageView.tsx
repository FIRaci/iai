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
      <div className="flex gap-8">
        <div className="min-w-0 flex-1">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Trang chủ
              </Link>
            </Button>
            <h1 className="mt-4 text-3xl font-bold">{mod.title || slug}</h1>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Content components={blockComponents} />
          </div>
        </div>

        <TableOfContents />
      </div>
    </>
  )
}