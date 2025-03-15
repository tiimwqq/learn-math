"use client";
import RichTextEditor from "@/components/editor";
import { Container } from "@/components/shared/container";
import { useState } from "react";

export default function AdminPage() {
    const [post, setPost] = useState("");
    const onChange = (content: string) => {
        setPost(content);
        console.log(content);
    };
    return (
        <Container className="max-w-[800px] mx-auto py-8">
            <RichTextEditor content={post} onChange={onChange} />
        </Container>
    );
}