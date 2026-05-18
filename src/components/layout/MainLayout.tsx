import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6 lg:p-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
