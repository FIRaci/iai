import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import { Seo } from "@/components/Seo"

export function NotFound() {
  return (
    <>
      <Seo
        title="404 - Không tìm thấy trang"
        description="Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển."
      />
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 text-primary">
            <Search className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">404</h1>
        <p className="mt-4 text-lg text-[#656d76] dark:text-[#8b949e]">
          Trang này không tồn tại hoặc đang được xây dựng.
        </p>
        <Button asChild className="mt-6 gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
        </Button>
      </div>
    </>
  )
}
