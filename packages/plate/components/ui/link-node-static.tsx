import type { SlateElementProps, TLinkElement } from 'platejs';

import { Link } from '@plone/components';
import { SlateElement } from 'platejs';

export function LinkElementStatic(props: SlateElementProps<TLinkElement>) {
  return (
    <SlateElement
      {...props}
      as="span"
      className="font-medium text-primary underline decoration-primary underline-offset-4"
      attributes={props.attributes}
    >
      <Link
        href={props.element.url}
        target={props.element.target}
        rel={props.element.target === '_blank' ? 'noreferrer' : undefined}
      >
        {props.children}
      </Link>
    </SlateElement>
  );
}
