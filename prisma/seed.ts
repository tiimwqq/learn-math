import { prisma } from "./prisma-client";
import fs from "fs";
import path from "path";

async function up() {
  try {
    const categories = [
      {
        name: "Числа и Арифметика",
        slug: "numbers-arithmetic",
        topics: [
          { name: "Типы чисел", slug: "number-types" },
          { name: "Дроби и проценты", slug: "fractions-percentages" },
          { name: "Степени и корни", slug: "powers-roots" },
          { name: "Модуль числа", slug: "absolute-value" },
          { name: "Делимость, НОД и НОК", slug: "divisibility-gcd-lcm" },
          { name: "Приближенные вычисления", slug: "approximate-calculations" },
        ],
      },
      {
        name: "Алгебраические выражения",
        slug: "algebraic-expressions",
        topics: [
          { name: "Одночлены и многочлены", slug: "monomials-polynomials" },
          { name: "Формулы сокращенного умножения", slug: "multiplication-formulas" },
          { name: "Разложение на множители", slug: "factorization" },
          { name: "Алгебраические дроби", slug: "algebraic-fractions" },
          { name: "Рациональные и иррациональные выражения", slug: "rational-irrational" },
        ],
      },
      {
        name: "Уравнения",
        slug: "equations",
        topics: [
          { name: "Линейные и квадратные уравнения", slug: "linear-quadratic-equations" },
          { name: "Рациональные и иррациональные уравнения", slug: "rational-irrational-equations" },
          { name: "Уравнения высших степеней", slug: "higher-degree-equations" },
          { name: "Уравнения с модулями и параметрами", slug: "modular-parametric-equations" },
        ],
      },
      {
        name: "Системы уравнений и неравенств",
        slug: "systems-equations-inequalities",
        topics: [
          { name: "Системы линейных уравнений", slug: "linear-equations-systems" },
          { name: "Системы нелинейных уравнений", slug: "nonlinear-equations-systems" },
          { name: "Системы неравенств", slug: "inequalities-systems" },
          { name: "Текстовые задачи на системы", slug: "word-problems-systems" },
        ],
      },
      {
        name: "Неравенства",
        slug: "inequalities",
        topics: [
          { name: "Линейные и квадратные неравенства", slug: "linear-quadratic-inequalities" },
          { name: "Дробно-рациональные неравенства", slug: "fractional-inequalities" },
          { name: "Неравенства с модулями и радикалами", slug: "modular-radical-inequalities" },
        ],
      },
      {
        name: "Текстовые задачи",
        slug: "word-problems",
        topics: [
          { name: "Задачи на движение, работу", slug: "motion-work-problems" },
          { name: "Экономические задачи", slug: "economic-problems" },
          { name: "Логические задачи", slug: "logical-problems" },
          { name: "Стратегии решения задач", slug: "problem-solving-strategies" },
        ],
      },
      {
        name: "Функции и графики",
        slug: "functions-graphs",
        topics: [
          { name: "Виды функций", slug: "types-of-functions" },
          { name: "Область определения и значений", slug: "domain-range" },
          { name: "Преобразования графиков", slug: "graph-transformations" },
          { name: "Исследование функций", slug: "function-analysis" },
        ],
      },
      {
        name: "Прогрессии",
        slug: "progressions",
        topics: [
          { name: "Арифметическая прогрессия", slug: "arithmetic-progression" },
          { name: "Геометрическая прогрессия", slug: "geometric-progression" },
          { name: "Комбинированные задачи", slug: "combined-problems" },
        ],
      },
      {
        name: "Тригонометрия",
        slug: "trigonometry",
        topics: [
          { name: "Тригонометрические тождества", slug: "trig-identities" },
          { name: "Уравнения и неравенства", slug: "trig-equations-inequalities" },
          { name: "Решение треугольников", slug: "triangle-solving" },
          { name: "Обратные тригонометрические функции", slug: "inverse-trig-functions" },
        ],
      },
      {
        name: "Показательная и логарифмическая функции",
        slug: "exponential-logarithmic-functions",
        topics: [
          { name: "Свойства логарифмов и степеней", slug: "logarithm-exponent-properties" },
          { name: "Уравнения и неравенства", slug: "logarithmic-equations" },
          { name: "Графики функций", slug: "logarithmic-graphs" },
        ],
      },
      {
        name: "Планиметрия",
        slug: "planimetry",
        topics: [
          { name: "Треугольники", slug: "triangles" },
          { name: "Четырехугольники", slug: "quadrilaterals" },
          { name: "Окружность", slug: "circle" },
          { name: "Векторы и координаты", slug: "vectors-coordinates" },
        ],
      },
      {
        name: "Стереометрия",
        slug: "stereometry",
        topics: [
          { name: "Объемы и площади", slug: "volumes-areas" },
          { name: "Тела вращения", slug: "rotation-solids" },
          { name: "Сечения и проекции", slug: "sections-projections" },
        ],
      },
    ];

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

      for (const topic of category.topics) {
        const contentPath = path.join(__dirname, `./seed-content/${topic.slug}.html`);
        let content = "";

        if (fs.existsSync(contentPath)) {
          content = fs.readFileSync(contentPath, "utf-8");
        } else {
          console.warn(`⚠️ HTML-файл не найден: ${contentPath}`);
          content = `<h1>${topic.name}</h1><p>Контент пока не добавлен.</p>`;
        }

        await prisma.topic.upsert({
          where: { slug: topic.slug },
          update: {},
          create: {
            name: topic.name,
            slug: topic.slug,
            categoryId: createdCategory.id,
            content,
          },
        });

        console.log(` └─ Тема '${topic.name}' добавлена`);
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
  await prisma.$executeRaw`TRUNCATE TABLE "Topic" RESTART IDENTITY CASCADE`;
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
