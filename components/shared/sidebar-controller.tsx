'use client';

import { useState } from 'react';
import { SidebarToggle } from './sidebar-toggle';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('./sidebar'), { ssr: false });

interface Props {
  className?: string;
  data: {
    currentCategory: string;
  };
  lesson:
  {
    name: string;
    headings: {
      level: number;
      text: string;
    }[];
  }
}

export const SidebarController: React.FC<Props> = ({
  className,
  data,
  lesson
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={cn(className, 'flex')}>
      <aside
        className={`sticky top-16 h-[calc(100vh-64px)] shrink-0 overflow-y-auto border-r transition-all duration-300
          ${isSidebarOpen ? "w-[260px] max-w-[260px]" : "max-w-0 overflow-hidden"}`}
      >
        {/* Передаем данные в Sidebar */}
        <Sidebar currentCategory={data.currentCategory} lesson={lesson} />
      </aside>

      <SidebarToggle onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
};