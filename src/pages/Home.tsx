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
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Hero */}
        <div className="space-y-5 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d0d7de] dark:border-[#30363d] bg-[#f6f8fa] dark:bg-[#161b22] px-3.5 py-1.5 text-xs font-semibold text-[#656d76] dark:text-[#8b949e]">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Cẩm nang AI Tools & Dev Tools
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Chào mừng đến với{" "}
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              IAI
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-[#656d76] dark:text-[#8b949e] max-w-xl">
            Cẩm nang toàn diện về AI tools và dev tools dành cho người dùng Windows 11.
            Hướng dẫn chi tiết từ cài đặt đến sử dụng thành thạo.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          <a
            href="/ai-tools"
            className="group relative rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-[#1f2328] dark:text-[#e6edf3] group-hover:text-primary">AI Tools</h2>
            <p className="text-sm leading-relaxed text-[#656d76] dark:text-[#8b949e]">
              Hướng dẫn cài đặt và sử dụng các công cụ AI coding phổ biến: Claude Code, Cursor, Copilot và nhiều hơn nữa.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
              Xem thêm <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </a>

          <a
            href="/dev-tools"
            className="group relative rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
              <Code2 className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-[#1f2328] dark:text-[#e6edf3] group-hover:text-primary">Dev Tools</h2>
            <p className="text-sm leading-relaxed text-[#656d76] dark:text-[#8b949e]">
              Các công cụ phát triển nền tảng: Node.js, Git, VS Code — tối ưu cho Windows 11.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
              Xem thêm <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </a>

          <a
            href="/comparisons"
            className="group relative rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/30 sm:col-span-2"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-sm">
              <GitCompare className="h-5 w-5" />
            </div>
            <h2 className="mb-2 text-lg font-semibold text-[#1f2328] dark:text-[#e6edf3] group-hover:text-primary">So sánh</h2>
            <p className="text-sm leading-relaxed text-[#656d76] dark:text-[#8b949e]">
              Bảng so sánh chi tiết các AI coding tools — giúp bạn chọn công cụ phù hợp nhất với nhu cầu và ngân sách.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
              Xem thêm <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </a>
        </div>

        {/* Getting started guide */}
        <div className="rounded-xl border border-[#d0d7de] dark:border-[#30363d] bg-gradient-to-br from-card to-[#f6f8fa] dark:to-[#161b22] p-6">
          <h2 className="mb-5 text-lg font-semibold text-[#1f2328] dark:text-[#e6edf3]">Bắt đầu từ đâu?</h2>
          <ol className="space-y-4">
            {[
              { num: "1", text: 'Cài đặt môi trường:', links: [{ href: "/dev-tools/nodejs", label: "Node.js" }, { href: "/dev-tools/git", label: "Git" }] },
              { num: "2", text: 'Chọn AI coding tool phù hợp qua', link: { href: "/comparisons", label: "bảng so sánh" } },
              { num: "3", text: "Làm theo hướng dẫn chi tiết để cài đặt và sử dụng tool bạn chọn" },
              { num: "4", text: "Khám phá thêm các tool khác và nâng cao kỹ năng!" },
            ].map((step) => (
              <li key={step.num} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {step.num}
                </span>
                <span className="text-[#656d76] dark:text-[#8b949e] leading-relaxed">
                  {step.text}
                  {"links" in step && step.links && step.links.map((l, i) => (
                    <span key={l.href}>
                      {" "}<a href={l.href} className="font-semibold text-primary hover:underline">{l.label}</a>
                      {i < step.links!.length - 1 && " + "}
                    </span>
                  ))}
                  {"link" in step && step.link && (
                    <span>
                      {" "}<a href={step.link.href} className="font-semibold text-primary hover:underline">{step.link.label}</a>
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
