'use client'

import '../../../styles/prosemirror.css'
import Editor from "@/components/shared/editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/actions';
import { Category } from '@prisma/client';
import { Input } from '@/components/ui/input';


export default function AdminPage() {
  const [categories, setCategoryies] = useState<Category[]>([]);
  const [title, setTitle] = useState<string>(
    typeof window !== 'undefined' ? window.localStorage.getItem("novel-title") || '' : ''
  );
  const [slug, setSlug] = useState<string>(
    typeof window !== 'undefined' ? window.localStorage.getItem("novel-slug") || '' : ''
  );
  const [categoryId, setCategoryId] = useState(0);


  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategoryies(categories);
      console.log(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("novel-title", title);
    window.localStorage.setItem("novel-slug", slug);
  }, [slug, title]);

  return (
    <div className="flex min-h-screen flex-col items-start gap-4 sm:px-5 max-w-[900px] mx-auto py-8">
      <div className="w-full flex gap-3">
        <Select onValueChange={value => setCategoryId(Number(value))}>
          <SelectTrigger className="w-[350px]">
            <SelectValue placeholder="выбери категорию" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem value={String(category.id)} key={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input className='w-[200px]' placeholder='название статьи' onChange={e => setTitle(e.target.value)} value={title} />
        <Input className='w-[200px]' placeholder='слаг' onChange={e => setSlug(e.target.value)} value={slug} />
      </div>
      <Editor name={title} slug={slug} categoryId={categoryId} />
    </div>
  );
}
