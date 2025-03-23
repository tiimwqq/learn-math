import { JSONContent } from "novel";

export async function getCategoryIdBySlug(slug: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/categories/${slug}`);
        if (!response.ok) {
            throw new Error(`Ошибка при получении категории: ${response.statusText}`);
        }
        const category = await response.json();
        return category.id;
    } catch (error) {
        console.error("Ошибка в getCategoryIdBySlug:", error);
        throw error;
    }
}

export async function getArticle(categoryId: number, slug: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/article/${categoryId}/${slug}`);
        if (!response.ok) {
            throw new Error("Ошибка при получении статьи");
        }
        return response.json();
    } catch (error) {
        console.error("Ошибка в getArticle:", error);
        throw error;
    }
}

export type ArticleProps = {
    name: string;
    slug: string;
    content: JSONContent;
    categoryId: number
}

export async function createArticle({ name, slug, content, categoryId }: ArticleProps) {
    const payload = { name, slug, content }
    try {
        const res = await fetch(`http://localhost:3000/api/article/${categoryId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            alert("Статья обновлена");
        } else {
            alert("Ошибка при обновлении статьи");
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateArticle({ name, slug, content, categoryId }: ArticleProps) {
    const payload = { name, content }
    try {
        const res = await fetch(`http://localhost:3000/api/article/${categoryId}/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            alert("Статья обновлена");
        } else {
            alert("Ошибка при обновлении статьи");
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getCategories() {
    try {
        const res = await fetch('http://localhost:3000/api/categories');
        const data = res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        alert("Ошибка при получении всех категорий");
        return [];
    }
}