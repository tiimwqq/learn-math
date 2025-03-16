import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import MathInlineComponent from './math-inline-component' 

export const MathBlock = Node.create({
  name: 'mathBlock',

  group: 'block',
  inline: false,
  displayMode: true,

  addAttributes() {
    return {
      formula: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="math-block"]',
      },
    ]
  },

  renderHTML({ node }) {
    // node.attrs.formula — строка LaTeX
    const formula = node.attrs.formula || ''
    return [
      'span',
      { 'data-type': 'math-block', 'data-formula': formula },
      formula,
    ]
  },

  // Если нужен ReactNodeView (редактирование прямо в редакторе), подключаем:
  addNodeView() {
    return ReactNodeViewRenderer(MathInlineComponent)
  },
})
