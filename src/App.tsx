import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { lazy, Suspense, useEffect } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Home } from "@/pages/Home"
import { BackToTop } from "@/components/layout/BackToTop"
import { ReadingProgress } from "@/components/layout/ReadingProgress"

const CategoryPage = lazy(() => import("@/pages/CategoryPage").then(m => ({ default: m.CategoryPage })))
const ToolGuide = lazy(() => import("@/pages/ToolGuide").then(m => ({ default: m.ToolGuide })))
const PageView = lazy(() => import("@/pages/PageView").then(m => ({ default: m.PageView })))
const NotFound = lazy(() => import("@/pages/NotFound").then(m => ({ default: m.NotFound })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

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
      <ScrollToTop />
      <BackToTop />
      <ReadingProgress />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/getting-started"
            element={<Suspense fallback={<PageLoader />}><PageView slug="getting-started" /></Suspense>}
          />
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
