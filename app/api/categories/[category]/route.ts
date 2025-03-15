import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export async function GET({ params }: { params: { slug: string } }) {
    try {
        const category = await prisma.category.findUnique({
            where: { slug: params.slug },
            include: { articles: true }
        });

        if (!category) {
            return NextResponse.json({ error: "категория не найдена" }, { status: 404 });
        }

        return NextResponse.json(category)
    } catch {
        return NextResponse.json({ error: "чтото пошло не так" }, { status: 500 });
    }
}  //поиск одной категории

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { name, slug } = await req.json();

        if (!name) {
            return NextResponse.json(
                { error: "имя обязательно" },
                { status: 400 }
            );
        };

        const updatedCategory = prisma.category.update({
            where: { slug: params.slug },
            data: { name, slug }
        });

        return NextResponse.json(updatedCategory);
    } catch {
        return NextResponse.json(
            { error: "ошибка обновления категории" },
            { status: 500 }
        );
    }
} // Обновить категорию по slug

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await prisma.category.delete({
            where: { slug: params.slug }
        })

        return NextResponse.json(
            { message: "категория удалена" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "ошибка удаления категории" },
            { status: 500 }
        );
    }
} // Удалить категорию по slug