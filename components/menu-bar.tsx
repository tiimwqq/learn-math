"use client";

import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    PlusCircle,
    StickyNote
} from "lucide-react";
import { Toggle } from "./ui/toggle";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
    const [formula, setFormula] = useState("");
    const [isDisplayMode, setIsDisplayMode] = useState(false);

    if (!editor) {
        return null;
    }

    const insertFormula = () => {
        if (formula.trim() && editor) {
            const nodeType = isDisplayMode ? 'mathBlock' : 'mathInline';
            editor
                .chain()
                .focus()
                .insertContent({
                    type: nodeType,
                    attrs: {
                        formula: formula,
                    },
                })
                .run();
            setFormula('');
        }
    };

    const insertSection = () => {
        editor.chain().focus().insertContent({
            type: "section",
            content: [{ type: "paragraph", content: [{ type: "text", text: "section" }] }],
        }).run();
    };

    const insertNoteBlock = () => {
        editor.chain().focus().insertContent({
            type: "noteBlock",
            content: [{ type: "paragraph", content: [{ type: "text", text: "див" }] }],
        }).run();
    };

    const Options = [
        { id: "h1", icon: <Heading1 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), pressed: editor.isActive('heading', { level: 1 }) },
        { id: "h2", icon: <Heading2 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), pressed: editor.isActive('heading', { level: 2 }) },
        { id: "h3", icon: <Heading3 className="size-4" />, onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), pressed: editor.isActive('heading', { level: 3 }) },
        { id: "bold", icon: <Bold className="size-4" />, onClick: () => editor.chain().focus().toggleBold().run(), pressed: editor.isActive("bold") },
        { id: "italic", icon: <Italic className="size-4" />, onClick: () => editor.chain().focus().toggleItalic().run(), pressed: editor.isActive("italic") },
        { id: "strike", icon: <Strikethrough className="size-4" />, onClick: () => editor.chain().focus().toggleStrike().run(), pressed: editor.isActive("strike") },
        { id: "align-left", icon: <AlignLeft className="size-4" />, onClick: () => editor.chain().focus().setTextAlign("left").run(), pressed: editor.isActive({ textAlign: "left" }) },
        { id: "align-center", icon: <AlignCenter className="size-4" />, onClick: () => editor.chain().focus().setTextAlign("center").run(), pressed: editor.isActive({ textAlign: "center" }) },
        { id: "align-right", icon: <AlignRight className="size-4" />, onClick: () => editor.chain().focus().setTextAlign("right").run(), pressed: editor.isActive({ textAlign: "right" }) },
        { id: "bullet-list", icon: <List className="size-4" />, onClick: () => editor.chain().focus().toggleBulletList().run(), pressed: editor.isActive("bulletList") },
        { id: "ordered-list", icon: <ListOrdered className="size-4" />, onClick: () => editor.chain().focus().toggleOrderedList().run(), pressed: editor.isActive("orderedList") },
        { id: "highlight", icon: <Highlighter className="size-4" />, onClick: () => editor.chain().focus().toggleHighlight().run(), pressed: editor.isActive("highlight") },
        { id: "insert-section", icon: <PlusCircle className="size-4" />, onClick: insertSection, pressed: false },
        { id: "insert-note", icon: <StickyNote className="size-4" />, onClick: insertNoteBlock, pressed: false },
    ];

    return (
        <div className="border rounded-md p-2 mb-2 bg-slate-50 space-x-2 z-50 flex items-center">
            {Options.map((option) => (
                <Toggle key={option.id} pressed={option.pressed} onPressedChange={option.onClick}>
                    {option.icon}
                </Toggle>
            ))}

            {/* Поле ввода формулы */}
            <div className="math-controls flex flex-col gap-2">
                <input
                    type="text"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    placeholder="Введите LaTeX формулу"
                    className="formula-input text-sm"
                />
                <label className="display-mode text-sm">
                    <input
                        type="checkbox"
                        checked={isDisplayMode}
                        onChange={(e) => setIsDisplayMode(e.target.checked)}
                    />
                    Display Mode
                </label>
                <button onClick={insertFormula} className="insert-button text-sm">
                    Вставить формулу
                </button>
            </div>
        </div>
    );
}

