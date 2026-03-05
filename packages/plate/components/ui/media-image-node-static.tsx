import type {
  SlateElementProps,
  TCaptionProps,
  TImageElement,
  TResizableProps,
} from 'platejs';

import { NodeApi, SlateElement } from 'platejs';

import { cn } from '../../lib/utils';

export function ImageElementStatic(
  props: SlateElementProps<TImageElement & TCaptionProps & TResizableProps>,
) {
  const { align = 'center', caption, url, width } = props.element;
  const normalizedAlign = align;
  const isFloatingAlign =
    normalizedAlign === 'left' || normalizedAlign === 'right';

  return (
    <SlateElement {...props} className="py-2.5">
      <figure
        className={cn(
          'group relative z-20 m-0 w-fit max-w-full',
          normalizedAlign === 'left' && 'float-left mr-4 mb-2',
          normalizedAlign === 'right' && 'float-right mb-2 ml-4',
          !isFloatingAlign && 'clear-both mx-auto',
        )}
        style={{ width }}
      >
        <div className="relative max-w-full min-w-[92px]">
          <img
            className={cn(
              'w-full max-w-full cursor-default object-cover px-0',
              'rounded-sm',
            )}
            alt={(props.attributes as any).alt}
            src={url}
          />
          {caption && (
            <figcaption className="mx-auto mt-2 h-[24px] max-w-full">
              {NodeApi.string(caption[0])}
            </figcaption>
          )}
        </div>
      </figure>
      {!isFloatingAlign && <div aria-hidden className="clear-both h-0" />}
      {props.children}
    </SlateElement>
  );
}
