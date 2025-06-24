import { useMemo, type ReactNode, type CSSProperties } from 'react';
import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import type {
  AriaLabelingProps,
  DOMProps as SharedDOMProps,
} from '@react-types/shared';

export const focusRing = tv({
  base: 'outline-quanta-cobalt outline forced-colors:outline-[Highlight]',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-3',
    },
  },
});

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

// From https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx
export interface StyleRenderProps<T> {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. */
  className?:
    | string
    | ((values: T & { defaultClassName: string | undefined }) => string);
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. */
  style?:
    | CSSProperties
    | ((
        values: T & { defaultStyle: CSSProperties },
      ) => CSSProperties | undefined);
}

export interface RenderProps<T> extends StyleRenderProps<T> {
  /** The children of the component. A function may be provided to alter the children based on component state. */
  children?:
    | ReactNode
    | ((values: T & { defaultChildren: ReactNode | undefined }) => ReactNode);
}

interface RenderPropsHookOptions<T>
  extends RenderProps<T>,
    SharedDOMProps,
    AriaLabelingProps {
  values: T;
  defaultChildren?: ReactNode;
  defaultClassName?: string;
  defaultStyle?: CSSProperties;
}

interface RenderPropsHookRetVal {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  'data-rac': string;
}

export function useRenderProps<T>(
  props: RenderPropsHookOptions<T>,
): RenderPropsHookRetVal {
  const {
    className,
    style,
    children,
    defaultClassName = undefined,
    defaultChildren = undefined,
    defaultStyle,
    values,
  } = props;

  return useMemo(() => {
    let computedClassName: string | undefined;
    let computedStyle: React.CSSProperties | undefined;
    let computedChildren: React.ReactNode | undefined;

    if (typeof className === 'function') {
      computedClassName = className({ ...values, defaultClassName });
    } else {
      computedClassName = className;
    }

    if (typeof style === 'function') {
      computedStyle = style({ ...values, defaultStyle: defaultStyle || {} });
    } else {
      computedStyle = style;
    }

    if (typeof children === 'function') {
      computedChildren = children({ ...values, defaultChildren });
    } else if (children == null) {
      computedChildren = defaultChildren;
    } else {
      computedChildren = children;
    }

    return {
      className: computedClassName ?? defaultClassName,
      style:
        computedStyle || defaultStyle
          ? { ...defaultStyle, ...computedStyle }
          : undefined,
      children: computedChildren ?? defaultChildren,
      'data-rac': '',
    };
  }, [
    className,
    style,
    children,
    defaultClassName,
    defaultChildren,
    defaultStyle,
    values,
  ]);
}
