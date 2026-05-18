import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Home } from "@/pages/Home"

const CategoryPage = lazy(() => import("@/pages/CategoryPage").then(m => ({ default: m.CategoryPage })))
const ToolGuide = lazy(() => import("@/pages/ToolGuide").then(m => ({ default: m.ToolGuide })))
const NotFound = lazy(() => import("@/pages/NotFound").then(m => ({ default: m.NotFound })))

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/:category"
            element={<Suspense fallback={<PageLoader />}><CategoryPage /></Suspense>}
          />
          <Route
            path="/:category/:slug"
            element={<Suspense fallback={<PageLoader />}><ToolGuide /></Suspense>}
          />
          <Route
            path="*"
            element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
