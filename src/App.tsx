import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "@/components/layout/MainLayout"
import { Home } from "@/pages/Home"
import { CategoryPage } from "@/pages/CategoryPage"
import { ToolGuide } from "@/pages/ToolGuide"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/:slug" element={<ToolGuide />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
