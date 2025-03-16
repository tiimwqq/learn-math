import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import MathInlineComponent from './math-inline-component'
// это React-компонент, который будет отображать формулу

export const MathInline = Node.create({
    name: 'mathInline',

    // "inline" и "atom" означают, что это инлайн-элемент и ведёт себя как "цельная" нода
    group: 'inline',
    inline: true,
    atom: true,
    displayMode: false,

    addAttributes() {
        return {
            formula: {
                default: '',
            },
        }
    },

    parseHTML() {
        // Допустим, в HTML это <span data-type="math-inline">FORMULA</span>
        return [
            {
                tag: 'span[data-type="math-inline"]',
            },
        ]
    },

    renderHTML({ node }) {
        // node.attrs.formula — строка LaTeX
        const formula = node.attrs.formula || ''
        return [
            'span',
            { 'data-type': 'math-inline', 'data-formula': formula },
            formula,
        ]
    },

    // Если нужен ReactNodeView (редактирование прямо в редакторе), подключаем:
    addNodeView() {
        return ReactNodeViewRenderer(MathInlineComponent)
    },
})