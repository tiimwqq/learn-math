import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const articles = await prisma.article.findMany({
            where: { categoryId: Number(params.id) }
        });

        return NextResponse.json(articles);
    } catch {
        return NextResponse.json({ error: "Ошибка при получении статей" }, { status: 500 });
    }
} //Получение всех статей в категории

export async function POST(req: Request, { params }: { params: { id: string } }) {
    console.log("API запрос получен");
    try {
        const { name, slug, content } = await req.json();

        const newArticle = await prisma.article.create({
            data: {
                name,
                slug,
                content,
                categoryId: Number(params.id),
            },
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Ошибка при создании статьи" }, { status: 500 });
    }
} //Создание статьи в категории



