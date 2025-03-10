import { prisma } from "./prisma-client";

async function up() {
    const categories = [
        {
            name: "Числа",
            slug: "numbers",
            topics: [
                { name: "Натуральные числа", slug: "natural-numbers" },
                { name: "Признаки делимости. НОД и НОК натуральных чисел", slug: "divisibility-gcd-lcm" },
                { name: "Целые числа", slug: "integers" },
                { name: "Рациональные числа", slug: "rational-numbers" },
                { name: "Практика. Рациональные числа", slug: "practice-rational-numbers" },
                { name: "Действительные числа", slug: "real-numbers" },
            ],
        },
        {
            name: "Многочлены",
            slug: "polynomials",
            topics: [
                { name: "Понятие многочлена. Стандартный вид многочлена.", slug: "polynomial-definition" },
                { name: "Практика. Многочлены (часть 1).", slug: "practice-polynomials-1" },
                { name: "Практика. Многочлены (часть 2).", slug: "practice-polynomials-2" },
            ],
        },
        {
            name: "Уравнения",
            slug: "equations",
            topics: [
                { name: "Линейные уравнения", slug: "linear-equations" },
                { name: "Квадратные уравнения", slug: "quadratic-equations" },
                { name: "Рациональные уравнения", slug: "rational-equations" },
            ],
        },
        {
            name: "Системы уравнений",
            slug: "systems-of-equations",
            topics: [
                { name: "Линейные системы", slug: "linear-systems" },
                { name: "Квадратичные системы", slug: "quadratic-systems" },
            ],
        },
        {
            name: "Неравенства",
            slug: "inequalities",
            topics: [
                { name: "Линейные неравенства", slug: "linear-inequalities" },
                { name: "Квадратичные неравенства", slug: "quadratic-inequalities" },
            ],
        },
        {
            name: "Функции",
            slug: "functions",
            topics: [
                { name: "Понятие функции", slug: "function-definition" },
                { name: "Графики функций", slug: "function-graphs" },
                { name: "Свойства функций", slug: "function-properties" },
            ],
        },
        {
            name: "Прогрессии",
            slug: "progressions",
            topics: [
                { name: "Числовые последовательности", slug: "number-sequences" },
                { name: "Арифметическая прогрессия", slug: "arithmetic-progression" },
                { name: "Геометрическая прогрессия", slug: "geometric-progression" },
            ],
        },
        {
            name: "Тригонометрия",
            slug: "trigonometry",
            topics: [
                { name: "Тригонометрические функции", slug: "trigonometric-functions" },
                { name: "Основные тригонометрические уравнения", slug: "basic-trigonometric-equations" },
            ],
        },
    ];

    await prisma.category.createMany({
        data: categories.map(({ topics, ...category }) => category),
    });

    for (const category of categories) {
        const createdCategory = await prisma.category.findUnique({ where: { slug: category.slug } });

        if (createdCategory) {
            await prisma.topic.createMany({
                data: category.topics.map((topic) => ({
                    ...topic,
                    categoryId: createdCategory.id,
                })),
            });
        }
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
