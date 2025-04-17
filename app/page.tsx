'use client'

import TypewriterHeader from "@/components/shared/typewriter-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

const Introduction = () => {
  const [showButton, setShowButton] = useState(false)

  return (
    <div className="flex justify-start min-h-[820px] ">
      <div className=" w-[1350px] p-[100px] h-[200px]">
        <TypewriterHeader delay={80} className="text-8xl font-bold font-geist" onDone={() => setShowButton(true)} />
        <AnimatePresence>
          {showButton && (
            <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "fit-content", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: "easeInOut"
            }}
          >
              <Link href='/home'>
                <Button className="dark:bg-white border-transparent dark:hover:border-zinc-800 dark:hover:bg-transparent bg-white text-black px-6 py-2 rounded-xl shadow-md hover:bg-black hover:text-white transition duration-300 mt-[45px]" variant="outline">
                  Начать изучение
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Introduction;
