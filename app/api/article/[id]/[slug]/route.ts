import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string, slug: string } }) {
    try {
        const article = await prisma.article.findFirst({
            where: {
                categoryId: Number(params.id),
                slug: params.slug,
            },
        });

        if (!article) {
            return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch {
        return NextResponse.json({ error: "Ошибка при получении статьи" }, { status: 500 });
    }
} // получение одной статьи 

export async function PUT(req: Request, { params }: { params: { id: string, slug: string } }) {
    try {
        const { name, content } = await req.json();

        const updatedArticle = await prisma.article.updateMany({
            where: {
                categoryId: Number(params.id),
                slug: params.slug,
            },
            data: { name, content },
        });

        return NextResponse.json(updatedArticle);
    } catch  {
        return NextResponse.json({ error: "Ошибка при обновлении статьи" }, { status: 500 });
    }
} // обновление одной статьи

export async function DELETE(req: Request, { params }: { params: { id: string, slug: string } }) {
    try {
        await prisma.article.deleteMany({
            where: {
                categoryId: Number(params.id),
                slug: params.slug,
            },
        });

        return NextResponse.json({ message: "Статья удалена" });
    } catch {
        return NextResponse.json({ error: "Ошибка при удалении статьи" }, { status: 500 });
    }
} //Удаление статьи