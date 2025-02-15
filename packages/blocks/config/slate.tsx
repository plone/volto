//@ts-nocheck
import { LinkElement } from '../Text/slate';

export const slate = {
  topLevelTargetElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

  // Default rendered elements
  elements: {
    default: ({ attributes, children }) => <p {...attributes}>{children}</p>,

    h1: ({ attributes, children }) => <h1 {...attributes}>{children}</h1>,
    h2: ({ attributes, children }) => <h2 {...attributes}>{children}</h2>,
    h3: ({ attributes, children }) => <h3 {...attributes}>{children}</h3>,
    h4: ({ attributes, children }) => <h4 {...attributes}>{children}</h4>,

    li: ({ attributes, children }) => <li {...attributes}>{children}</li>,
    ol: ({ attributes, children }) => <ol {...attributes}>{children}</ol>,
    ul: ({ attributes, children }) => {
      return <ul {...attributes}>{children}</ul>;
    },

    div: ({ attributes, children }) => <div {...attributes}>{children}</div>,
    p: ({ attributes, children }) => {
      return <p {...attributes}>{children}</p>;
    },

    // While usual slate editor consider these to be Leafs, we treat them as
    // inline elements because they can sometimes contain elements (ex:
    // <b><a/></b>
    em: ({ children }) => <em>{children}</em>,
    i: ({ children }) => <i>{children}</i>,
    b: ({ children }) => {
      return <b>{children}</b>;
    },
    strong: ({ children }) => {
      return <strong>{children}</strong>;
    },
    u: ({ children }) => <u>{children}</u>,
    s: ({ children }) => <del>{children}</del>,
    del: ({ children }) => <del>{children}</del>,
    sub: ({ children }) => <sub>{children}</sub>,
    sup: ({ children }) => <sup>{children}</sup>,
    code: ({ children }) => <code>{children}</code>,

    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    link: LinkElement,
    a: LinkElement,
  },
};
