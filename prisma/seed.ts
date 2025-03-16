import { categories } from "./constans";
import { prisma } from "./prisma-client";

async function up() {
  try {
    console.log("Начинаем сидинг...");

    for (const category of categories) {
      const createdCategory = await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: {
          name: category.name,
          slug: category.slug,
        },
      });

      console.log(`Категория '${createdCategory.name}' добавлена`);

      for (const article of category.articles) {
        await prisma.article.upsert({
          where: { slug: article.slug },
          update: {},
          create: {
            name: article.name,
            slug: article.slug,
            categoryId: createdCategory.id,
            content: "", // Пустой контент, так как теперь он будет редактироваться через редактор
          },
        });

        console.log(` └─ Тема '${article.name}' добавлена`);
      }
    }

    console.log("Сидинг завершён успешно!");

  } catch (error) {
    console.error("Ошибка при сидинге:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Article" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });