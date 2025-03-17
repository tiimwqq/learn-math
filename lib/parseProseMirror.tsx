import React, { JSX } from 'react'
import katex from 'katex'

export function parseProseMirrorNode(node: any): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'doc':
      // node.content - массив дочерних нод
      return <>{node.content?.map((child, index) => <React.Fragment key={index}>{parseProseMirrorNode(child)}</React.Fragment>)}</>


    case 'paragraph':
      return <p >{node.content?.map((child, index) => <React.Fragment key={index}>{parseProseMirrorNode(child)}</React.Fragment>)}</p>


    case 'text':
      return node.marks ? parseProseMirrorMarks(node) : node.text;

    case 'heading':
      // У heading могут быть attrs.level
      const HTag = `h${node.attrs.level}` as keyof JSX.IntrinsicElements
      return <HTag className='heading'>{node.content?.map((child, index) => <React.Fragment key={index}>{parseProseMirrorNode(child)}</React.Fragment>)}</HTag>


    case 'section':
      return <section className="section">{node.content?.map((child, index) => <React.Fragment key={index}>{parseProseMirrorNode(child)}</React.Fragment>)}</section>

    case 'noteBlock':
      return <div className="note-block">{node.content?.map((child, index) => <React.Fragment key={index}>{parseProseMirrorNode(child)}</React.Fragment>)}</div>

    case 'mathInline':
      // У нас есть node.attrs.formula
      return renderMath(node.attrs.formula, false) // inline = false?

    case 'mathBlock':
      return renderMath(node.attrs.formula, true)

    case 'bulletList':
      return (
        <ul>
          {node.content?.map((child, index) => (
            <React.Fragment key={index}>
              {parseProseMirrorNode(child)}
            </React.Fragment>
          ))}
        </ul>
      );

    case 'orderedList':
      return (
        <ol>
          {node.content?.map((child, index) => (
            <React.Fragment key={index}>
              {parseProseMirrorNode(child)}
            </React.Fragment>
          ))}
        </ol>
      );

    case 'listItem':
      return (
        <li>
          {node.content?.map((child, index) => (
            <React.Fragment key={index}>
              {parseProseMirrorNode(child)}
            </React.Fragment>
          ))}
        </li>
      );

    default:
      // Поддержка mark'ов, strong, italic и т.д. тоже нужна.
      // Но StarterKit добавляет их как "marks", см. пример ниже
      return node.content
        ? <>{node.content?.map((child, index) => <React.Fragment key={index}>{parseProseMirrorNode(child)}</React.Fragment>)}</>
        : null
  }
}

function renderMath(formula: string, displayMode: boolean) {
  // Либо просто оборачиваем в <span> / <div>
  // Либо используем katex.renderToString и dangerouslySetInnerHTML
  // Для SSR это сработает, но нужно убедиться, что KaTeX есть в окружении.
  // Пример (упрощённый):

  const html = katex.renderToString(formula, { displayMode, throwOnError: false })

  if (displayMode) {
    return <div className="math-block" dangerouslySetInnerHTML={{ __html: html }} />
  } else {
    return <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
  }
}

// Отдельно обрабатываем marks (strong, italic, etc.)
export function parseProseMirrorMarks(node: any): React.ReactNode {
  if (node.marks) {
    return node.marks.reduce((acc, mark) => {
      switch (mark.type) {
        case 'bold':
          return <strong className="article-bold">{acc}</strong>;
        case 'italic':
          return <em>{acc}</em>
        case 'strike':
          return <s>{acc}</s>
        // ... и т.д.
        default:
          return acc
      }
    }, node.text || node.content?.map(parseProseMirrorNode))
  } else {
    // Если нет marks, это просто текст или вложенные ноды
    return node.text || node.content?.map(parseProseMirrorNode)
  }
}
