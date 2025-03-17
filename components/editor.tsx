"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { MathExtension } from "./math-extension";
import MenuBar from "./menu-bar";
import "katex/dist/katex.min.css";
import { Section } from './shared/extensions/section'
import { NoteBlock } from './shared/extensions/note-block'
import { MathInline } from './shared/extensions/math-inline'
import { MathBlock } from './shared/extensions/math-block'
import { CustomBold } from "./shared/extensions/strong";

interface RichTextEditorProps {
    content: any;
    onChange: (json: any) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3], // Разрешаем h1, h2, h3
                    HTMLAttributes: {
                        class: 'my-heading', // Опционально: добавьте классы для стилизации
                    },
                },
                bulletList: { HTMLAttributes: { class: "list-disc ml-3" } },
                orderedList: { HTMLAttributes: { class: "list-decimal ml-3" } },
                bold: false,
            }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Highlight,
            Placeholder.configure({ placeholder: "Напишите что-нибудь..." }),
            MathExtension.configure({
                inline: true,
                HTMLAttributes: {
                    class: 'math-container',
                },
            }),
            Section,
            NoteBlock,
            MathInline,
            MathBlock,
            CustomBold
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
    });

    return (
        <div className="math-editor-wrapper">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <style jsx global>{`
                .math-node {
                    position: relative;
                    margin: 0.5em 0;
                    padding: 0.5em;
                    background: #f8f9fa;
                    border-radius: 4px;
                }
                
                .math-editor {
                    width: 100%;
                    padding: 8px;
                    margin-top: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-family: monospace;
                    display: none;
                }
                
                .math-node:hover .math-editor {
                    display: block;
                }
                
                .math-error {
                    color: #dc3545;
                    font-family: monospace;
                }
                
                .katex-display {
                    margin: 1em 0;
                }
            `}</style>
        </div>
    );
}