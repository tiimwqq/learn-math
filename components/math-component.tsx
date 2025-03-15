import { NodeViewWrapper } from '@tiptap/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useState, useEffect } from 'react';

const MathComponent = ({ node, updateAttributes }: any) => {
    const [value, setValue] = useState(node.attrs.formula || '');
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Состояние для редактирования

    useEffect(() => {
        try {
            katex.render(value, document.createElement('div'), {
                throwOnError: true,
                displayMode: node.attrs.display,
            });
            setError('');
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Invalid formula');
        }
    }, [value, node.attrs.display]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        updateAttributes({ formula: newValue });
    };

    const handleClick = () => {
        setIsEditing(true); // Включаем режим редактирования при клике
    };

    const handleBlur = () => {
        setIsEditing(false); // Выключаем режим редактирования при потере фокуса
    };

    return (
        <NodeViewWrapper className="math-node" contentEditable={false}>
            {error ? (
                <span className="math-error">{error}</span>
            ) : (
                <span onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(value, {
                                throwOnError: false,
                                displayMode: node.attrs.display,
                            }),
                        }}
                    />
                </span>
            )}
            {isEditing && (
                <textarea
                    className="math-editor"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Введите LaTeX формулу"
                    autoFocus
                />
            )}
        </NodeViewWrapper>
    );
};

export default MathComponent;