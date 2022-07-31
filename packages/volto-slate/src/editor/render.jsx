import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Node, Text } from 'slate';
import cx from 'classnames';
import { isEmpty, omit } from 'lodash';
import Slugger from 'github-slugger';
import config from '@plone/volto/registry';
import linkSVG from '@plone/volto/icons/link.svg';

import './less/slate.less';

const OMITTED = ['editor', 'path'];

// TODO: read, see if relevant
// https://reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
export const Element = ({ element, attributes = {}, extras, ...rest }) => {
  const { slate } = config.settings;
  const { elements } = slate;
  const El = elements[element.type] || elements['default'];

  const out = Object.assign(
    element.styleName ? { className: element.styleName } : {},
    ...Object.keys(attributes || {}).map((k) =>
      !isEmpty(attributes[k]) ? { [k]: attributes[k] } : {},
    ),
  );

  return (
    <El
      element={element}
      {...omit(rest, OMITTED)}
      attributes={out}
      extras={extras}
    />
  );
};

export const Leaf = ({ children, ...rest }) => {
  // console.log('rest', rest, children);
  const { attributes, leaf, mode } = rest;
  let { leafs } = config.settings.slate;

  children = Object.keys(leafs).reduce((acc, name) => {
    return Object.keys(leaf).includes(name)
      ? leafs[name]({ children: acc })
      : acc;
  }, children);

  const classNames = {
    [`highlight-${leaf.highlightType}`]: mode !== 'view' && leaf.highlight,
    'highlight-selection': mode !== 'view' && leaf.isSelection,
  };

  // stylemenu support
  for (const prop in leaf) {
    if (prop.startsWith('style-')) {
      classNames[prop.substring(6)] = true;
    }
  }

  const klass = cx(classNames);

  return mode === 'view' ? (
    typeof children === 'string' ? (
      children.split('\n').map((t, i) => {
        // Softbreak support. Should do a plugin?
        return (
          <React.Fragment key={`${i}`}>
            {children.indexOf('\n') > -1 &&
            children.split('\n').length - 1 > i ? (
              <>
                {klass ? <span className={klass}>{t}</span> : t}
                <br />
              </>
            ) : klass ? (
              <span className={klass}>{t}</span>
            ) : (
              t
            )}
          </React.Fragment>
        );
      })
    ) : (
      <span className={klass}>{children}</span>
    )
  ) : (
    <span {...attributes} className={klass}>
      {children}
    </span>
  );
};

const serializeData = (node) => {
  return JSON.stringify({ type: node.type, data: node.data });
};

export const serializeNodes = (nodes, getAttributes, extras = {}) => {
  const editor = { children: nodes || [] };

  const _serializeNodes = (nodes) => {
    return (nodes || []).map(([node, path], i) => {
      return Text.isText(node) ? (
        <Leaf path={path} leaf={node} text={node} mode="view" key={path}>
          {node.text}
        </Leaf>
      ) : (
        <Element
          path={path}
          element={node}
          mode="view"
          key={path}
          data-slate-data={node.data ? serializeData(node) : null}
          attributes={getAttributes ? getAttributes(node, path) : null}
          extras={extras}
        >
          {_serializeNodes(Array.from(Node.children(editor, path)))}
        </Element>
      );
    });
  };

  return _serializeNodes(Array.from(Node.children(editor, [])));
};

/**
 * Get the concatenated text string of a node's content.
 *
 * Note that this WILL include spaces between block node leafs in contrary to
 * the original slate method. This function joins text of nodes with
 * separating spaces to produce a string for indexing purposes.
 *
 */
const ConcatenatedString = (node) => {
  if (Text.isText(node)) {
    return node.text.trim();
  } else {
    return node.children.map(ConcatenatedString).join(' ');
  }
};

/**
 * @function serializeNodesToText
 *
 * @param {Array[Node]} nodes
 *
 * @returns {string}
 */
export const serializeNodesToText = (nodes) => {
  return nodes.map(ConcatenatedString).join('\n');
};

export const serializeNodesToHtml = (nodes) =>
  renderToStaticMarkup(serializeNodes(nodes));

export const renderLinkElement = (tagName) => {
  function LinkElement({ attributes, children, mode = 'edit' }) {
    const Tag = tagName;
    const slug = Slugger.slug('hello');

    return (
      <Tag {...attributes}>
        {mode === 'view' && (
          <a id={slug} class="anchor" aria-hidden="true" href={`#${slug}`}>
            <svg
              {...linkSVG.attributes}
              dangerouslySetInnerHTML={{ __html: linkSVG.content }}
              width="2em"
              height={null}
            ></svg>
          </a>
        )}
        {children}
      </Tag>
    );
  }
  LinkElement.displayName = `${tagName}LinkElement`;
  return LinkElement;
};
