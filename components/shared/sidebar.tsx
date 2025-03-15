// components/shared/sidebar/Sidebar.tsx
'use client';

type Props = {
    currentCategory: string;
    lesson: {
        name: string;
        headings: {
            level: number;
            text: string;
        }[];
    }
};

export default function Sidebar({ currentCategory, lesson }: Props) {
    return (
        <div className="w-[260px] h-screen p-4 border-r px-7">
            {/* раздел */}
            <div className="mb-5">
                <h3 className="text-sm  mb-2">
                    Раздел
                </h3>
                <div className="text-sm text-[#71717a] dark:text-[#fafafa]">{currentCategory}</div>
            </div>

            {/* навигация по уроку */}
            <div className="mb-5">
                <h3 className="text-sm  mb-2">
                    Навигация по уроку
                </h3>
                <div className="text-lg">
                    <ul>
                        {lesson.headings.map((heading) => (
                            <li key={heading.text} className="mb-2">
                                <a href={`#${heading.text}`} className="text-sm text-[#71717a] dark:text-[#fafafa]">{heading.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}