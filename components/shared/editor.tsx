"use client";

import {
    EditorBubble,
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    type EditorInstance,
    EditorRoot,
    handleCommandNavigation,
    JSONContent,
} from "novel";
import { defaultExtensions } from "./extensions";
import { useDebouncedCallback } from "use-debounce";
import React, { useEffect, useState } from 'react';
import { slashCommand, suggestionItems } from "./slash-command";
import { NodeSelector } from "../selectors/node-selector";
import { ColorSelector } from "../selectors/color-selector";
import { LinkSelector } from "../selectors/link-selector";
import { TextButtons } from "../selectors/text-buttons";
import { MathSelector } from "../selectors/math-selector";
import { Button } from "../ui/button";
import { ArticleProps, createArticle, getArticle, updateArticle } from "@/lib/actions";

type EditorProps = {
    name: string;
    slug: string;
    categoryId: number;
}

const Editor: React.FC<EditorProps> = ({ name, slug, categoryId }) => {
    const [content, setContent] = useState<JSONContent | null>();
    const [saveStatus, setSaveStatus] = useState<string>('saved');
    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    const [charsCount, setCharsCount] = useState<number>(0);
    const extensions = [...defaultExtensions, slashCommand];
    const [editorKey, setEditorKey] = useState(Date.now());
   

    const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
        const json = editor.getJSON();
        setCharsCount(editor.storage.characterCount.words());
        window.localStorage.setItem("novel-content", JSON.stringify(json));
       
        setContent(json);
        setSaveStatus("Saved");
    }, 500);

    useEffect(() => {
        const content = window.localStorage.getItem("novel-content");
        if (content) {
            setContent(JSON.parse(content))
        }
        else {
            setContent({ type: "doc", content: [] });
        }
    }, []);

    const sendCreatedArticle = async ({ name, slug, content, categoryId }: ArticleProps) => {
        try {
            await createArticle({ name, slug, content, categoryId });
        } catch (e) {
            console.log(e)
        }
    }
    const sendUpdatedArticle = async ({ name, slug, content, categoryId }: ArticleProps) => {
        try {
            await updateArticle({ name, slug, content, categoryId });
        } catch (e) {
            console.log(e)
        }
    }

    const readArticle = async (categoryId: number, slug: string) => {
        try {
            const article = await getArticle(categoryId, slug);
            setContent(article.content);
            setEditorKey(Date.now());
            console.log(article)
        } catch (e) {
            console.log(e)
        }
    }
    console.log(content)
    if (!content) return <div>Loading...</div>;

    return (
        <div className="relative w-full max-w-screen-lg">
            <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
                <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
                <div className={charsCount ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground" : "hidden"}>
                    {charsCount} Words
                </div>
            </div>
            <EditorRoot>
                <EditorContent
                    key={editorKey}
                    initialContent={content}
                    onUpdate={({ editor }) => {
                        setSaveStatus('unsaved')
                        debouncedUpdates(editor);
                    }}
                    editorProps={{
                        handleDOMEvents: {
                            keydown: (_view, event) => handleCommandNavigation(event),
                        },
                        attributes: {
                            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
                        },

                    }}
                    className="relative min-h-[800px] w-full max-w-screen-lg border-muted bg-background sm:rounded-lg sm:border sm:shadow-md"
                    extensions={extensions}
                    immediatelyRender={false}
                >
                    <EditorCommand className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
                        <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
                        <EditorCommandList>
                            {suggestionItems.map((item,) => (
                                <EditorCommandItem
                                    value={item.title}
                                    onCommand={(val) => item.command?.(val)}
                                    key={item.title}
                                    className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className='font-medium'>{item.title}</p>
                                        <p className='text-xs text-muted-foreground'>{item.description}</p>
                                    </div>
                                </EditorCommandItem>
                            ))}
                        </EditorCommandList>
                    </EditorCommand>
                    <EditorBubble
                        tippyOptions={{
                            placement: "top",
                        }}
                        className='flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl'>
                        <NodeSelector open={openNode} onOpenChange={setOpenNode} />
                        <LinkSelector open={openLink} onOpenChange={setOpenLink} />
                        <MathSelector />
                        <TextButtons />
                        <ColorSelector open={openColor} onOpenChange={setOpenColor} />
                    </EditorBubble>
                </EditorContent>
            </EditorRoot>
            <div className=" flex gap-4 rounded-lg mt-4">
                <Button onClick={() => sendCreatedArticle({ name, slug, content, categoryId })} variant={'outline'}>создать новую</Button>
                <Button onClick={() => sendUpdatedArticle({ name, slug, content, categoryId })} variant={'outline'}>обновить</Button>
                <Button onClick={() => readArticle(categoryId, slug)} variant={'outline'}>получить</Button>
                <Button variant={'outline'}>удалить</Button>
            </div>
        </div>
    );
};

export default Editor;

