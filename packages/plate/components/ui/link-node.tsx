import type { TInlineSuggestionData, TLinkElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';

import { Link } from '@plone/components';
import { PlateElement } from 'platejs/react';

import { cn } from '../../lib/utils';
import { SuggestionPlugin } from '../editor/plugins/suggestion-kit';

export function LinkElement(props: PlateElementProps<TLinkElement>) {
  const suggestionData = props.editor
    .getApi(SuggestionPlugin)
    .suggestion.suggestionData(props.element) as
    | TInlineSuggestionData
    | undefined;

  return (
    <PlateElement
      {...props}
      as="span"
      className={cn(
        'font-medium text-primary underline decoration-primary underline-offset-4',
        suggestionData?.type === 'remove' && 'bg-red-100 text-red-700',
        suggestionData?.type === 'insert' && 'bg-emerald-100 text-emerald-700',
      )}
      attributes={props.attributes}
    >
      <Link
        href={props.element.url}
        target={props.element.target}
        rel={props.element.target === '_blank' ? 'noreferrer' : undefined}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onAuxClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </Link>
    </PlateElement>
  );
}
