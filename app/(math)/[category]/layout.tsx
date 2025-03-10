'use client';

import { Sidebar } from "@/components/shared/sidebar";
import { SidebarToggle } from "@/components/shared/sidebar-toggle";
import { useState } from "react";

export default function MathLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex w-full">

      <aside className={`sticky top-16 h-[calc(100vh-64px)] w-[260px] shrink-0 overflow-y-auto border-r transition-all duration-300
       ${isSidebarOpen ? "w-[260px]" : "w-0 opacity-0"}`} >
        <Sidebar />
      </aside>

      <main className="flex-1 p-4">
        <SidebarToggle onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        {children}
      </main>
    </div >
  );
}


