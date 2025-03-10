'use client';
import { Category } from "@prisma/client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    const currentCategory = parts[0];
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        async function fetchCategory() {
            if (!currentCategory) return;

            try {
                const response = await fetch(`/api/sidebar?slug=${currentCategory}`);
                const data = await response.json();
                setCategory(data);
            } catch (error) {
                console.error("Ошибка загрузки категории", error);
            }
        }

        fetchCategory();
    }, [currentCategory]);


    return (
        <div className="w-[260px] h-screen p-4 border-r px-7">
            {/* раздел */}
            <div className="mb-5">
                <h3 className="text-sm text-[#71717a] dark:text-[#fafafa] font-light mb-2">Раздел</h3>
                <div className=" text-lg">{category?.name}</div>
            </div>
            {/* навигация по уроку */}
            {/* комментарии */}
        </div>
    );
};