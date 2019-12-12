import React from 'react';

const styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20,
  },
};

// Inline (not block) styles
const inline = {
  BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
  ITALIC: (children, { key }) => <em key={key}>{children}</em>,
  UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
  CODE: (children, { key }) => (
    <span key={key} style={styles.code}>
      {children}
    </span>
  ),
};

const addBreaklines = children => children.map(child => [child, <br />]);

// Returns how the default lists should be rendered
const getList = ordered => (children, { depth, keys }) =>
  ordered ? (
    <ol key={keys[0]} keys={keys} depth={depth}>
      {children.map((child, i) => (
        <li key={keys[i]}>{child}</li>
      ))}
    </ol>
  ) : (
    <ul key={keys[0]} keys={keys} depth={depth}>
      {children.map((child, i) => (
        <li key={keys[i]}>{child}</li>
      ))}
    </ul>
  );

// Special function to deal with list clones
/*const getSpecialList = type => (children, { depth, keys }) => (
  <ul key={keys[0]} keys={keys} depth={depth} className={type}>
    {children.map((child, i) => (
      <li key={keys[i]} className={`${type}-item`}>
        {child}
      </li>
    ))}
  </ul>
);
*/

const getAtomic = (children, { data, keys }) =>
  data.map((item, i) => <div key={keys[i]} {...data[i]} />);

/**
 * Note that children can be maped to render a list or do other cool stuff
 */
const blocks = {
  unstyled: (children, { keys }) => {
    const processedChildren = children.map(chunks =>
      chunks.map(child => {
        if (Array.isArray(child)) {
          return child.map((subchild, index) => {
            if (typeof subchild === 'string') {
              const last = subchild.split('\n').length - 1;
              return subchild.split('\n').map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  {index !== last && <br />}
                </React.Fragment>
              ));
            } else {
              return subchild;
            }
          });
        } else {
          return child;
        }
      }),
    );
    return processedChildren.map(
      chunk => chunk && <p key={keys[0]}>{chunk}</p>,
    );
  },
  atomic: getAtomic,
  blockquote: (children, { keys }) => (
    <blockquote key={keys[0]}>{addBreaklines(children)}</blockquote>
  ),
  'header-one': (children, { keys }) =>
    children.map((child, i) => <h1 key={keys[i]}>{child}</h1>),
  'header-two': (children, { keys }) =>
    children.map((child, i) => <h2 key={keys[i]}>{child}</h2>),
  'header-three': (children, { keys }) =>
    children.map((child, i) => <h3 key={keys[i]}>{child}</h3>),
  'header-four': (children, { keys }) =>
    children.map((child, i) => <h4 key={keys[i]}>{child}</h4>),
  'header-five': (children, { keys }) =>
    children.map((child, i) => <h5 key={keys[i]}>{child}</h5>),
  'header-six': (children, { keys }) =>
    children.map((child, i) => <h6 key={keys[i]}>{child}</h6>),
  'code-block': (children, { keys }) => (
    <pre key={keys[0]} style={styles.codeBlock}>
      {addBreaklines(children)}
    </pre>
  ),
  'unordered-list-item': getList(),
  'ordered-list-item': getList(true),
  callout: (children, { keys }) =>
    children.map((child, i) => (
      <p key={keys[i]} className="callout">
        {child}
      </p>
    )),
};

const entities = {
  LINK: (children, entity, { key }) => (
    <a key={key} href={entity.url}>
      {children}
    </a>
  ),
  IMAGE: (children, entity, { key }) => (
    <img key={key} src={entity.src} alt={entity.alt} />
  ),
};

export const options = {
  cleanup: false,
  // joinOutput: true,
};

const renderers = {
  inline,
  blocks,
  entities,
};

export default renderers;
