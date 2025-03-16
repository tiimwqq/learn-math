import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/prisma/prisma-client";

export async function GET(req: Request, { params }: { params: { category: string } }) {
    try {
        console.log("Поиск категории по slug:", params.category);

        // Проверяем, что slug передан
        if (!params.category) {
            return NextResponse.json({ error: "Slug категории не указан" }, { status: 400 });
        }

        // Ищем категорию по slug
        const category = await prisma.category.findUnique({
            where: { slug: params.category },
        });

        if (!category) {
            console.log("Категория не найдена");
            return NextResponse.json({ error: "Категория не найдена" }, { status: 404 });
        }

        console.log("Категория найдена:", category);
        return NextResponse.json(category);
    } catch (error) {
        console.error("Ошибка при поиске категории:", error);
        return NextResponse.json({ error: "Ошибка при получении категории" }, { status: 500 });
    }
}

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