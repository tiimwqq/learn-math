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
  
  export async function getArticle(categoryId: number, articleSlug: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/article/${categoryId}/${articleSlug}`);
      if (!response.ok) {
        throw new Error("Ошибка при получении статьи");
      }
      return response.json();
    } catch (error) {
      console.error("Ошибка в getArticle:", error);
      throw error;
    }
  }