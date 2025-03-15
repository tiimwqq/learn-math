import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import MathComponent from './math-component'; // Убедитесь, что путь правильный

export const MathExtension = Node.create({
    name: 'mathBlock',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
        return {
            formula: {
                default: '',
            },
            display: {
                default: false,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="math"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { 'data-type': 'math' }, HTMLAttributes.formula];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MathComponent);
    },
});