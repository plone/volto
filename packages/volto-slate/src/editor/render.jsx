import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Node, Text } from 'slate';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import { addAppURL } from '@plone/volto/helpers/Url/Url';
import useClipboard from '@plone/volto/hooks/clipboard/useClipboard';
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

  const attrs = Object.assign(
    element.styleName ? { className: element.styleName } : {},
    ...Object.keys(attributes || {}).map((k) =>
      !isEmpty(attributes[k]) ? { [k]: attributes[k] } : {},
    ),
  );
  attrs.ref = attributes?.ref; // never remove the ref

  return (
    <El
      element={element}
      {...omit(rest, OMITTED)}
      attributes={attrs}
      extras={extras}
    />
  );
};

export const Leaf = ({ children, ...rest }) => {
  const { attributes, leaf, mode } = rest;
  let { leafs } = config.settings.slate;

  children = Object.keys(leafs).reduce((acc, name) => {
    return Object.keys(leaf).includes(name)
      ? leafs[name]({ children: acc })
      : acc;
  }, children);

  const classNames = {
    [`highlight-${leaf.highlightType}`]: mode !== 'view' && leaf.highlightType,
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
  function LinkElement({
    attributes,
    children,
    mode = 'edit',
    className = null,
  }) {
    const { slate = {} } = config.settings;
    const Tag = tagName;
    const slug = attributes.id || '';
    const location = useLocation();
    const token = useSelector((state) => state.userSession.token);
    const appPathname = addAppURL(location.pathname);
    // eslint-disable-next-line no-unused-vars
    const [copied, copy, setCopied] = useClipboard(
      appPathname.concat(`#${slug}`),
    );
    const intl = useIntl();
    return !token || slate.useLinkedHeadings === false ? (
      <Tag {...attributes} className={className} tabIndex={0}>
        {children}
      </Tag>
    ) : (
      <Tag {...attributes} className={className} tabIndex={0}>
        {children}
        {mode === 'view' && slug && (
          <UniversalLink
            className="anchor"
            aria-hidden="true"
            tabIndex={-1}
            href={`#${slug}`}
          >
            <style>
              {/* Prettify the unstyled flash of the link icon on development */}
              {`
              a.anchor svg {
                height: var(--anchor-svg-height, 24px);
              }
              `}
            </style>
            <svg
              {...linkSVG.attributes}
              dangerouslySetInnerHTML={{ __html: linkSVG.content }}
              height={null}
              onClick={() => {
                copy();

                toast.info(
                  <Toast
                    info
                    title={intl.formatMessage(messages.success)}
                    content={intl.formatMessage(messages.urlClipboardCopy)}
                  />,
                );
              }}
            ></svg>
          </UniversalLink>
        )}
      </Tag>
    );
  }
  LinkElement.displayName = `${tagName}LinkElement`;
  return LinkElement;
};
