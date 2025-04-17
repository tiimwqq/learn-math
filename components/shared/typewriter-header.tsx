import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic'

// Отключаем SSR, чтобы не было конфликтов с серверным рендером
const Typewriter = dynamic(
    () => import('typewriter-effect'),
    { ssr: false }
)

interface TypewriteTextProps {
    delay: number;
    loop?: boolean;
    className?: string;
    onDone?: () => void;
}

export const TypewriterText: React.FC<TypewriteTextProps> = ({  delay, loop, className, onDone }) => {
    return (
        <div className={cn(className, '')}>
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                    .pauseFor(400)
                    .typeString('Learn Math for a job')
                    .pauseFor(1000)
                    .deleteChars(9)               
                    .typeString('for school')
                    .pauseFor(1100)
                    .deleteChars(10)              
                    .typeString('to change the world')
                    .callFunction((state) => {
                      state.elements.cursor.hidden = true;
                      onDone?.()
                    })
                    .start()
                }}
                options={{
                    cursor: '|',
                    delay: delay,
                    loop: loop || false
                }}
            />
        </div>
    )
}

export default TypewriterText;