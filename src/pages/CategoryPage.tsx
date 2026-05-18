import { Link, useParams } from "react-router-dom"
import { getContentTree } from "@/lib/content-loader"
import { getToolIcon } from "@/lib/icons"
import {
  BookOpen,
  Code2,
  GitCompare,
  ChevronRight,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Seo } from "@/components/Seo"

const categoryTitles: Record<string, string> = {
  "ai-tools": "AI Tools",
  "dev-tools": "Dev Tools",
  comparisons: "So sánh",
}

const categoryIcons: Record<string, typeof BookOpen> = {
  "ai-tools": BookOpen,
  "dev-tools": Code2,
  comparisons: GitCompare,
}

const categoryDesc: Record<string, string> = {
  "ai-tools": "Hướng dẫn chi tiết cài đặt và sử dụng các AI coding tools phổ biến trên Windows 11",
  "dev-tools": "Hướng dẫn cài đặt và cấu hình các công cụ phát triển nền tảng trên Windows 11",
  comparisons: "So sánh chi tiết các AI coding tools — chọn công cụ phù hợp nhất với nhu cầu của bạn",
}

export function CategoryPage() {
  const { category } = useParams()
  const tree = getContentTree()
  const cat = tree.find((c) => c.path === `/${category}`)
  const catTitle = category ? (categoryTitles[category] || category) : ""
  const catDesc = category ? (categoryDesc[category] || `Hướng dẫn về ${category}`) : ""

  if (!cat) return <div className="py-20 text-center text-muted-foreground">Không tìm thấy danh mục</div>

  const Icon = categoryIcons[cat.category] || BookOpen

  return (
    <>
      <Seo
        title={catTitle}
        description={catDesc}
        path={`/${category}`}
      />
      <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Icon className="h-7 w-7 text-primary" />
          {cat.title}
        </h1>
      </div>

      <div className="grid gap-4">
        {cat.children.map((item) => {
          const slug = item.path.split("/").pop() || ""
          const ItemIcon = getToolIcon(slug)
          return (
            <Link key={item.path} to={item.path}>
              <Card className="transition-colors hover:bg-accent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <ItemIcon className="h-4 w-4 text-primary" />
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
          )
        })}
      </div>
      </div>
    </>
  )
}
