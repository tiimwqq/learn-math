import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch {
        return NextResponse.json({ error: "чтото пошло не так" }, { status: 500 })
    }
} //получение всех категорий

export async function POST(req: Request) {
    const { name } = await req.json();

    if (!name) {
        return NextResponse.json({ error: "Название категории обязательно" }, { status: 400 });
    }

    const category = await prisma.category.create({
        data: name
    })

    return NextResponse.json(category, { status: 201 })
} //создание категории