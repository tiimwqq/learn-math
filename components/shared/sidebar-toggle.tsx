import { cn } from '@/lib/utils';
import { PanelLeft } from 'lucide-react';
import React from 'react';

interface Props {
    className?: string;
    onClick: () => void;
}

export const SidebarToggle: React.FC<Props> = ({ className, onClick }) => {
    return (
        <button className={cn(className, 'pr-4 inline-flex m-4 border-r h-5')}
            onClick={onClick}>
            <PanelLeft size={18} className='text-[#71717a] dark:text-gray-300' />
        </button>
    );
};