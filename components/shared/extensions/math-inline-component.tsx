// extensions/MathInlineComponent.tsx
import React, { useState, useEffect } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function MathInlineComponent({ node, updateAttributes }) {
  const [value, setValue] = useState(node.attrs.formula || '')
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      katex.renderToString(value, { throwOnError: true })
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }, [value])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    updateAttributes({ formula: e.target.value })
  }

  return (
    <NodeViewWrapper className="math-inline-node" contentEditable={false}>
      {error
        ? <span className="math-error">{error}</span>
        : <span
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(value, { throwOnError: false })
            }}
          />
      }
      {/* Текстовое поле для редактирования, если нужно */}
      <textarea value={value} onChange={onChange} />
    </NodeViewWrapper>
  )
}
