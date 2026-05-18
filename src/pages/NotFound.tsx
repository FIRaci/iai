import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { Seo } from "@/components/Seo"

export function NotFound() {
  return (
    <>
      <Seo
        title="404 - Không tìm thấy trang"
        description="Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển."
      />
      <div className="mx-auto max-w-md py-20 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Trang này không tồn tại hoặc đang được xây dựng.
      </p>
      <Button asChild className="mt-6">
        <Link to="/" className="gap-2">
          <Home className="h-4 w-4" />
          Về trang chủ
        </Link>
      </Button>
      </div>
    </>
  )
}
