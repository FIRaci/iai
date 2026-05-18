import { Seo } from "@/components/Seo"
import { ArrowRight, BookOpen, Code2, GitCompare, Sparkles } from "lucide-react"

export function Home() {
  return (
    <>
      <Seo
        title="Trang chủ"
        description="Cẩm nang toàn diện về AI tools và dev tools dành cho người dùng Windows 11"
        path="/"
      />
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Hero */}
        <div className="space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            Cẩm nang AI Tools & Dev Tools
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Chào mừng đến với{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              IAI
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Cẩm nang toàn diện về AI tools và dev tools dành cho người dùng Windows 11.
            Hướng dẫn chi tiết từ cài đặt đến sử dụng thành thạo.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          <a
            href="/ai-tools"
            className="group relative rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-lg font-semibold group-hover:text-primary">AI Tools</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Hướng dẫn cài đặt và sử dụng các công cụ AI coding phổ biến: Claude Code, Cursor, Copilot và nhiều hơn nữa.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Xem thêm <ArrowRight className="h-3 w-3" />
            </div>
          </a>

          <a
            href="/dev-tools"
            className="group relative rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Code2 className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-lg font-semibold group-hover:text-primary">Dev Tools</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Các công cụ phát triển nền tảng: Node.js, Git, VS Code — tối ưu cho Windows 11.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Xem thêm <ArrowRight className="h-3 w-3" />
            </div>
          </a>

          <a
            href="/comparisons"
            className="group relative rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 sm:col-span-2"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <GitCompare className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-lg font-semibold group-hover:text-primary">So sánh</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Bảng so sánh chi tiết các AI coding tools — giúp bạn chọn công cụ phù hợp nhất.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Xem thêm <ArrowRight className="h-3 w-3" />
            </div>
          </a>
        </div>

        {/* Getting started guide */}
        <div className="rounded-xl border bg-gradient-to-br from-card to-muted/30 p-6">
          <h2 className="mb-5 text-lg font-semibold">Bắt đầu từ đâu?</h2>
          <ol className="space-y-4">
            {[
              { num: "1", text: 'Cài đặt môi trường:', links: [{ href: "/dev-tools/nodejs", label: "Node.js" }, { href: "/dev-tools/git", label: "Git" }] },
              { num: "2", text: 'Chọn AI coding tool phù hợp qua', link: { href: "/comparisons", label: "bảng so sánh" } },
              { num: "3", text: "Làm theo hướng dẫn chi tiết để cài đặt và sử dụng tool bạn chọn" },
              { num: "4", text: "Khám phá thêm các tool khác và nâng cao kỹ năng!" },
            ].map((step) => (
              <li key={step.num} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {step.num}
                </span>
                <span className="text-muted-foreground">
                  {step.text}
                  {"links" in step && step.links && step.links.map((l, i) => (
                    <span key={l.href}>
                      {" "}<a href={l.href} className="font-medium text-primary hover:underline">{l.label}</a>
                      {i < step.links!.length - 1 && ","}
                    </span>
                  ))}
                  {"link" in step && step.link && (
                    <span>
                      {" "}<a href={step.link.href} className="font-medium text-primary hover:underline">{step.link.label}</a>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}
