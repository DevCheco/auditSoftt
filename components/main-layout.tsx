import type React from "react"
import { Sidebar } from "./sidebar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-audit-light-gray">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 pt-20 md:pt-6">{children}</div>
      </main>
    </div>
  )
}
