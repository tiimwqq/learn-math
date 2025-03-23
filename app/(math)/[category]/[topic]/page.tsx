import { getArticle, getCategoryIdBySlug } from "@/lib/actions";
import React from "react";
import "katex/dist/katex.min.css";
import { parseProseMirrorNode } from "@/lib/parseProseMirror";


export default async function ArticlePage(props: { params: Promise<{ category: string; topic: string }> }) {
  try {
    const { category, topic } = await props.params;

    const categoryId = await getCategoryIdBySlug(category);
    const article = await getArticle(categoryId, topic);
    console.log("Article data:", article);

    if (!article || !article.content) {
      throw new Error("Статья не найдена");
    }
    const reactTree = parseProseMirrorNode(article.content)

    return (
      <div className="prose mx-auto max-w-[800px] mt-[70px] mb-[70px] prose-lg dark:prose-invert prose-headings:font-title">
        {reactTree}
      </div>
    );
  } catch  {
    return <div className="mx-auto max-w-[800px] text-center">К сожалению статья еще не написана :(</div>;
  }
}
