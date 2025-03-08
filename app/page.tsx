import { Button } from "@/components/ui/button";
import Link from "next/link";

const Introduction = () => {
  return (
    <div className="flex items-center justify-center min-h-[820px] ">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold font-geist">Learn Math</h1>
        <p className="mt-4 text-base ">
          Удобная платформа с теорией, примерами и задачами. Всё, что нужно для изучения математики и подготовки к экзаменам в одном месте.
        </p>

        <Link href='/home'>
          <Button className="bg-primary text-primary-foreground my-5">Начать изучение</Button>
        </Link>
      </div>
    </div>
  );
}

export default Introduction;
