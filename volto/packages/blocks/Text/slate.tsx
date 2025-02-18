import { Fragment } from 'react';
import type { Content } from '@plone/types';

export type SlateElementData = {
  title: string;
  url?: string;
  link: {
    external?: {
      external_link: string;
      target?: string;
    };
    internal?: {
      internal_link: Content[];
      target?: string;
    };
    email?: {
      email_address: string;
      email_subject?: string;
    };
  };
};

export type SlateNode = {
  type?: string;
  children?: SlateNode[];
  text?: string;
  data?: SlateElementData;
};

/**
 * Simple Slate renderer, inherited from the awesome work @nzambello coded in
 * https://github.com/nzambello/plone-remix-demo-pages
 *
 * For now it's ok, until we port the (more complex) one present in Volto core
 *
 * @param {string} id
 * @param {Record<string, React.ComponentType<any>>} elements
 * @param {string[]} topLevelTargetElements
 * @param {SlateNode[]} [nodes]
 * @param {boolean} [override_toc]
 * @param {*} [metadata]
 * @return {*}
 */
export const renderSlate = (
  id: string,
  elements: Record<string, React.ComponentType<any>>,
  topLevelTargetElements: string[],
  nodes?: SlateNode[],
  override_toc?: boolean,
  metadata?: any,
) => {
  const renderedNodes = (nodes ?? []).map((node: SlateNode, i) => {
    if (node.text) {
      return (
        <Fragment key={id + i}>
          {node.text.split('\n').map((t, x) =>
            (node.text?.indexOf('\n') ?? -1) > -1 ? (
              <span key={t + x}>
                {t}
                <br />
              </span>
            ) : (
              <span key={t + x}>{t}</span>
            ),
          )}
        </Fragment>
      );
    }

    if (!node.type) {
      return <Fragment key={id + i}></Fragment>;
    }

    const shouldHaveID =
      topLevelTargetElements.includes(node.type!) || override_toc;

    if (!elements[node.type]) {
      console.warn(`Unknown slate element type ${node.type}`);
    }

    const Element = elements[node.type] || elements['default'];

    return (
      <Element
        key={id + node.type + i}
        attributes={{
          id: shouldHaveID ? id : undefined,
        }}
        data={node.data}
      >
        {renderSlate(
          id,
          elements,
          topLevelTargetElements,
          node.children,
          undefined,
          metadata,
        )}
      </Element>
    );
  });

  return renderedNodes.flat();
};

export const LinkElement = ({
  attributes,
  data,
  children,
}: {
  attributes?: { [key: string]: any };
  data?: SlateElementData;
  children: JSX.Element[];
}) => {
  const internal_link = data?.link?.internal?.internal_link?.[0]?.['@id'];
  const external_link = data?.link?.external?.external_link;
  const email = data?.link?.email;

  const target = data?.link?.internal?.target ?? data?.link?.external?.target;

  const href = email
    ? `mailto:${email.email_address}${
        email.email_subject ? `?subject=${email.email_subject}` : ''
      }`
    : external_link || internal_link || data?.url;

  return (
    <a
      {...attributes}
      href={href}
      title={data?.title}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};
