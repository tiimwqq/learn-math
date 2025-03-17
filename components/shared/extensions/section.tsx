import { Node } from '@tiptap/core'

export const Section = Node.create({
  name: 'section',
  group: 'block',           // Говорим, что это блочная нода
  content: 'block+',        // Внутри можно хранить один или несколько блоков
  defining: true,           // Позволяет PM чётче обрабатывать границы этой ноды

  parseHTML() {
    return [{ tag: 'section' }]
  },
  renderHTML({ HTMLAttributes }) {
    // При рендере в HTML мы получим <section>...</section>
    return ['section', { ...HTMLAttributes, class: 'admin-section' }, 0]  
  },
})