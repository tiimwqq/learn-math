import React from "react";
import "katex/dist/katex.min.css";
import katex from "katex";
import sanitizeHtml from "sanitize-html";
import { getLessonBySlug } from "@/lib/db";

function MathBlock({ formula }: { formula: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(formula, {
          throwOnError: false,
          displayMode: false, // Чтобы формулы рендерились в строку
        }),
      }}
      className="mx-2 inline-block"
    />
  );
}


async function LessonPage({ params }: { params: { category: string; topic: string } }) {
  console.log("Полученный params:", params); // Проверка

  if (!params.topic) {
    throw new Error("Slug (topic) не передан в LessonPage");
  }

  const lesson = await getLessonBySlug(params.topic);
  if (!lesson) {
    throw new Error(`Lesson с таким slug "${params.topic}" не найден`);
  }
  const contentWithClass = lesson.content.replace(/className=/g, "class=");

  const sanitizedContent = sanitizeHtml(contentWithClass, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2", "h3", "img", "p", "span", "div"]),
    allowedAttributes: {
      "*": ["class"],
      img: ["src", "alt"],
    },
    allowedSchemes: ["data", "http", "https"],
  });

  return (
    <div className="prose lg:prose-xl flex flex-col items-center text-left mx-auto max-w-[800px] mb-[50px]">
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
}

export default LessonPage;