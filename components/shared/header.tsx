import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './theme-toggle';
import { Input } from '../ui/input';

export const Header: React.FC = () => {
    return (
        <div className="flex items-center justify-between gap-3 p-3 border-b-[1px]  px-7 ">
            <div className='flex items-center gap-3'>
                <Link href='/home'><div className=" text-xl font-black mr-3">Learn Math</div></Link>
                <div className="flex items-center justify-between gap-3">
                    <Link href="/login" className='text-sm '>Тесты</Link>
                    <Link href="/login" className='text-sm '>Формулы</Link>
                    <Link href="/login" className='text-sm'>О проекте</Link>
                </div>
            </div>
            <div className="flex gap-3">
                <Input className='' type="search" placeholder="Поиск" />
                <ModeToggle />
            </div>
        </div>
    );
};