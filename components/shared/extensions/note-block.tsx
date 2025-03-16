import { Node } from '@tiptap/core'

export const NoteBlock = Node.create({
  name: 'noteBlock',
  group: 'block',
  content: 'block+',    // можно разрешить вложенные блоки
  // или content: 'inline*' если хочешь, чтобы внутри были только инлайн-элементы

  parseHTML() {
    return [{ tag: 'div[data-type="note-block"]' }]
  },
  renderHTML({ HTMLAttributes }) {
    // Укажем data-атрибут, чтобы Tiptap мог снова распарсить
    return [
      'div', 
      { ...HTMLAttributes, 'data-type': 'note-block', class: 'my-note-block' }, 
      0
    ]
  },
})
