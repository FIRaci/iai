import { Seo } from "@/components/Seo"

export function Home() {
  return (
    <>
      <Seo
        title="Trang chủ"
        description="Cẩm nang toàn diện về AI tools và dev tools dành cho người dùng Windows 11"
        path="/"
      />
      <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Chào mừng đến với <span className="text-primary">IAI</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Cẩm nang toàn diện về AI tools và dev tools dành cho người dùng Windows 11.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="/ai-tools"
          className="group rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
        >
          <h2 className="mb-2 text-xl font-semibold">AI Tools</h2>
          <p className="text-sm text-muted-foreground">
            Hướng dẫn cài đặt và sử dụng các công cụ AI coding phổ biến: Claude Code, Cursor, Copilot và nhiều hơn nữa.
          </p>
        </a>

        <a
          href="/dev-tools"
          className="group rounded-lg border bg-card p-6 transition-colors hover:bg-accent"
        >
          <h2 className="mb-2 text-xl font-semibold">Dev Tools</h2>
          <p className="text-sm text-muted-foreground">
            Các công cụ phát triển nền tảng: Node.js, Git, VS Code — tối ưu cho Windows 11.
          </p>
        </a>

        <a
          href="/comparisons"
          className="group rounded-lg border bg-card p-6 transition-colors hover:bg-accent sm:col-span-2"
        >
          <h2 className="mb-2 text-xl font-semibold">So sánh</h2>
          <p className="text-sm text-muted-foreground">
            Bảng so sánh chi tiết các AI coding tools — giúp bạn chọn công cụ phù hợp nhất.
          </p>
        </a>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Bắt đầu từ đâu?</h2>
        <ol className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-bold text-primary">1.</span>
            <span>Cài đặt môi trường: <a href="/dev-tools/nodejs" className="text-primary hover:underline">Node.js</a> + <a href="/dev-tools/git" className="text-primary hover:underline">Git</a></span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">2.</span>
            <span>Chọn AI coding tool phù hợp qua <a href="/comparisons" className="text-primary hover:underline">bảng so sánh</a></span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">3.</span>
            <span>Làm theo hướng dẫn chi tiết để cài đặt và sử dụng tool bạn chọn</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">4.</span>
            <span>Khám phá thêm các tool khác và nâng cao kỹ năng!</span>
          </li>
        </ol>
      </div>
      </div>
    </>
  )
}
