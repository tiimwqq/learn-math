import { Container } from "@/components/shared/container";
import { prisma } from "@/prisma/prisma-client";

export default async function TopicPage({ params }: { params: Awaited<{ id: string }> }) {
    const topic = await prisma.topic.findFirst({
        where: { id: Number(params.id) },
    });

    return (
        <Container className="p-4">
            <h1 className="text-3xl font-bold">{topic?.name}</h1>
            <div className="p-10">
                {[...Array(100)].map((_, i) => (
                    <p key={i}>Тестовая строка {i}</p>
                ))}
            </div>
        </Container>
    );
}