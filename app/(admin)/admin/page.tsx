"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "@/components/editor";
import { Container } from "@/components/shared/container";

interface Category {
  id: number;
  name: string;
}

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Поля для работы со статьёй
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [post, setPost] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Загружаем список категорий при монтировании
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Ошибка загрузки категорий");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Функция, которая синхронно обновляет состояние при изменении контента редактора
  const onChange = (content: any) => {
    setPost(content);
  };

  // --- CREATE ---
  const handleCreateArticle = async () => {
    if (!selectedCategory) {
      setError("Выберите категорию!");
      return;
    }
    if (!title || !slug) {
      setError("Введите название и slug!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const articleContent = post
      const response = await fetch(`/api/article/${selectedCategory}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: title,
          slug,
          content: articleContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании статьи");
      }

      const data = await response.json();
      console.log("Статья создана:", data);
    } catch {
      setError("Не удалось создать статью.");
    } finally {
      setLoading(false);
    }
  };

  // --- READ / LOAD ---
  const handleLoadArticle = async () => {
    if (!selectedCategory) {
      setError("Выберите категорию!");
      return;
    }
    if (!slug) {
      setError("Укажите slug статьи!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/article/${selectedCategory}/${slug}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Ошибка при загрузке статьи");
      }
      const data = await response.json();
      console.log("Загруженная статья:", data);

      // Обновляем поля формы, чтобы пользователь мог редактировать
      setTitle(data.name);
      setSlug(data.slug);
      setPost(data.content);
    } catch {
      setError("Не удалось загрузить статью.");
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATE ---
  const handleUpdateArticle = async () => {
    if (!selectedCategory) {
      setError("Выберите категорию!");
      return;
    }
    if (!slug) {
      setError("Укажите slug статьи!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const articleContent = post


      const response = await fetch(`/api/article/${selectedCategory}/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: title,
          slug,
          content: articleContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении статьи");
      }

      const data = await response.json();
      console.log("Статья обновлена:", data);
    } catch {
      setError("Не удалось обновить статью.");
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE ---
  const handleDeleteArticle = async () => {
    if (!selectedCategory) {
      setError("Выберите категорию!");
      return;
    }
    if (!slug) {
      setError("Укажите slug статьи!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/article/${selectedCategory}/${slug}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка при удалении статьи");
      }

      console.log("Статья удалена");
      // Сбросить поля формы
      setTitle("");
      setSlug("");
      setPost("");
    } catch {
      setError("Не удалось удалить статью.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="max-w-[800px] mx-auto py-8">
      {/* Выбор категории */}
      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="" disabled>
          Выберите категорию
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Поля для заголовка и slug */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название статьи"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug статьи"
        className="w-full p-2 border rounded mb-2"
      />

      {/* Редактор текста */}
      <RichTextEditor content={post} onChange={onChange} />

      <div className="flex gap-2 mt-4 flex-wrap">
        <button
          onClick={handleCreateArticle}
          disabled={loading}
          className=" border p-2 rounded disabled:opacity-50"
        >
          {loading ? "Сохранение..." : "Создать статью"}
        </button>
        <button
          onClick={handleLoadArticle}
          disabled={loading}
          className=" border p-2 rounded disabled:opacity-50"
        >
          Загрузить статью
        </button>
        <button
          onClick={handleUpdateArticle}
          disabled={loading}
          className="border p-2 rounded disabled:opacity-50"
        >
          Обновить статью
        </button>
        <button
          onClick={handleDeleteArticle}
          disabled={loading}
          className="border  p-2 rounded disabled:opacity-50"
        >
          Удалить статью
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </Container>
  );
}
