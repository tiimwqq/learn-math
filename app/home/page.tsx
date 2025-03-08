import { CategoryGroup } from '@/components/shared/category-group';
import { Container } from '@/components/shared/container';
import { prisma } from '@/prisma/prisma-client';
import React from 'react';

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            topics: true,
        },
    });

    console.log(categories)
    
    return (
        <Container className='flex flex-col p-4'>
            <div className="flex flex-col gap-4 ">
                <h1 className='text-3xl font-bold mt-[70px]'>Математика — это просто!</h1>
                <p className=' mb-[60px] text-lg'>Добро пожаловать на платформу, где математика становится понятной и увлекательной. Мы собрали все необходимые темы, от арифметики до высшей математики, чтобы помочь вам освоить этот предмет шаг за шагом. Независимо от того, готовитесь ли вы к экзаменам, улучшаете школьные знания или просто хотите научиться мыслить логически, здесь вы найдете всё, что нужно. Начните свой путь к математическому успеху уже сегодня!</p>
            </div>
            <h2 className="text-2xl font-bold text-center">Категории</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6    my-10">
                {categories.map((category) => (
                    <CategoryGroup
                        key={category.id}
                        categoryName={category.name}
                        categorySlug={category.slug}
                        categoryTopics={category.topics}
                    />
                ))}
            </div>
        </Container>
    );
};