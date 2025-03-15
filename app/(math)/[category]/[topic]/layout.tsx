
import { getLessonNavigationBySlug } from "@/lib/db";
import { SidebarController } from "@/components/shared/sidebar-controller";


export default async function TopicLayout(props: { children: React.ReactNode; params: { category: string; topic: string } }) {
  const resolvedParams = await Promise.resolve(props.params);
  const { category, topic } = resolvedParams;

  const lesson = await getLessonNavigationBySlug(topic);
  console.log("lesson", lesson);
  
  if (!lesson) {
    throw new Error(`Lesson with slug "${topic}" not found`);
  }

  const sidebarData = {
    currentCategory: category,
    lesson,
  };


  return (
    <div className="flex w-full">
      <SidebarController data={sidebarData} lesson={lesson}/>
      <main className="flex-1 p-4">
        {props.children}
      </main>
    </div>
  );
}