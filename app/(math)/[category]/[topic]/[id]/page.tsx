import { Container } from "@/components/shared/container";
import { prisma } from "@/prisma/prisma-client";

export default async function TopicPage({ params: { id } }: { params: { id: string } }) {
    const topic = await prisma.topic.findFirst({ where: { id: Number(id) } });
    console.log(topic);

    return (
        <Container className="p-4 ">
            <h1 className="text-3xl font-bold">{topic?.name}</h1>
        </Container>
    );
}