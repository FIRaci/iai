import { Link, useParams } from "react-router-dom"
import { getContentTree } from "@/lib/content-loader"
import { getToolIcon } from "@/lib/icons"
import {
  BookOpen,
  Code2,
  GitCompare,
  ChevronRight,
} from "lucide-react"
import { Seo } from "@/components/Seo"
import { DifficultyBadge } from "@/components/PageTags"

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

const categoryGradients: Record<string, string> = {
  "ai-tools": "from-blue-500 to-indigo-600",
  "dev-tools": "from-emerald-500 to-teal-600",
  comparisons: "from-violet-500 to-purple-600",
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
  const gradient = categoryGradients[cat.category] || "from-primary to-blue-500"

  return (
    <>
      <Seo
        title={catTitle}
        description={catDesc}
        path={`/${category}`}
      />
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}>
              <Icon className="h-5 w-5" />
            </div>
            <h1 className={`bg-gradient-to-r ${gradient} bg-clip-text text-3xl font-bold text-transparent`}>
              {cat.title}
            </h1>
          </div>
          <p className="mt-2 text-sm text-[#656d76] dark:text-[#8b949e]">{catDesc}</p>
        </div>

        {/* Tool list */}
        <div className="grid gap-3">
          {cat.children.map((item) => {
            const slug = item.path.split("/").pop() || ""
            const ItemIcon = getToolIcon(slug)
            return (
              <Link key={item.path} to={item.path}>
                <div className="group flex items-center justify-between rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-card px-5 py-4 transition-all duration-200 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/30">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ItemIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1f2328] dark:text-[#e6edf3] group-hover:text-primary transition-colors">
                        {item.title}
                      </div>
                      {item.difficulty && (
                        <div className="mt-1">
                          <DifficultyBadge difficulty={item.difficulty} />
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#656d76] dark:text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
