import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Topic } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
    className?: string;
    categoryName: string;
    categorySlug: string;
    categoryTopics: Topic[]
}

export const CategoryGroup: React.FC<Props> = ({ className, categoryName, categoryTopics, categorySlug }) => {
    return (
        <div className={className}>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className='text-lg font-semibold'>{categoryName}</AccordionTrigger>
                    {categoryTopics.map((topic) => (
                        <AccordionContent key={topic.id}>
                            <Link href={`/${categorySlug}/${topic.slug}/${topic.id}`}>
                                <p className='font-light text-base hover:underline'>{topic.name}</p>
                            </Link>
                        </AccordionContent>
                    ))}
                </AccordionItem>
            </Accordion>
        </div>
    );
};