import { Link, useParams } from "react-router-dom"
import { getContentTree } from "@/lib/content-loader"
import {
  BookOpen,
  Code2,
  GitCompare,
  ChevronRight,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const categoryIcons: Record<string, typeof BookOpen> = {
  "ai-tools": BookOpen,
  "dev-tools": Code2,
  comparisons: GitCompare,
}

export function CategoryPage() {
  const { category } = useParams()
  const tree = getContentTree()
  const cat = tree.find((c) => c.path === `/${category}`)

  if (!cat) return <div className="py-20 text-center text-muted-foreground">Không tìm thấy danh mục</div>

  const Icon = categoryIcons[cat.category] || BookOpen

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Icon className="h-7 w-7 text-primary" />
          {cat.title}
        </h1>
      </div>

      <div className="grid gap-4">
        {cat.children.map((item) => (
          <Link key={item.path} to={item.path}>
            <Card className="transition-colors hover:bg-accent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {item.difficulty && (
                        <span className="text-xs font-medium text-primary">
                          {item.difficulty === "beginner" ? "Cơ bản" : item.difficulty === "intermediate" ? "Trung cấp" : "Nâng cao"}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
