import { prisma } from "@/prisma/prisma-client";


export async function getLessonBySlug(slug: string | undefined) {
    if (!slug) {
        throw new Error("Slug не передан в getLessonBySlug");
    }

    return await prisma.topic.findUnique({
        where: { slug },
        select: { name: true, content: true },
    });
}

import * as cheerio from "cheerio";

export async function getLessonNavigationBySlug(slug: string) {
    const lesson = await prisma.topic.findUnique({
        where: { slug },
        select: { name: true, content: true }
    });

    if (!lesson) return null;

    const $ = cheerio.load(lesson.content || ""); // Загружаем HTML
    const headings: { level: number; text: string }[] = [];

    $("h1, h2, h3, h4, h5, h6").each((_, el) => {
        const tag = el.tagName.toLowerCase();
        headings.push({ level: parseInt(tag.replace("h", ""), 10), text: $(el).text().trim() });
    });

    return { name: lesson.name, headings };
}