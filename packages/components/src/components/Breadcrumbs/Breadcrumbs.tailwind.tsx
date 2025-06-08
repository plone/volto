import React, { type ForwardedRef } from 'react';
import { type Node } from 'react-stately';
import { ChevronrightIcon, HomeIcon } from '../../components/icons';
import {
  Breadcrumbs as RACBreadcrumbs,
  type BreadcrumbProps,
  type BreadcrumbsProps as RACBreadcrumbsProps,
  type LinkProps,
  useSlottedContext,
  BreadcrumbsContext,
  LinkContext,
} from 'react-aria-components';
import { filterDOMProps } from '@react-aria/utils';
import { twMerge } from 'tailwind-merge';
import { Link } from '../Link/Link.tailwind';
import { composeTailwindRenderProps, useRenderProps } from '../utils';
import { createLeafComponent } from '@react-aria/collections';

export interface Breadcrumb {
  '@id': string;
  title: string;
  icon?: React.ReactNode;
}

export const BreadcrumbPrimitive = /*#__PURE__*/ createLeafComponent(
  'item',
  function Breadcrumb(
    props: BreadcrumbProps & {
      separator?: React.ReactNode;
    },
    ref: ForwardedRef<HTMLLIElement>,
    node: Node<unknown>,
  ) {
    // Recreating useBreadcrumbItem because we want to use composition instead of having the link builtin.
    const isCurrent = node.nextKey == null;
    const { isDisabled, onAction } = useSlottedContext(BreadcrumbsContext)!;
    const linkProps = {
      'aria-current': isCurrent ? 'page' : null,
      isDisabled: isDisabled || isCurrent,
      onPress: () => onAction?.(node.key),
    };

    const renderProps = useRenderProps({
      ...node.props,
      children: node.rendered,
      values: { isDisabled: isDisabled || isCurrent, isCurrent },
      defaultClassName: 'react-aria-Breadcrumb',
    });

    return (
      <li
        {...filterDOMProps(props as any)}
        {...renderProps}
        ref={ref}
        data-disabled={isDisabled || isCurrent || undefined}
        data-current={isCurrent || undefined}
      >
        {(node.value as Breadcrumb)?.icon && (node.value as Breadcrumb)?.icon}
        <LinkContext.Provider value={linkProps}>
          {renderProps.children}
        </LinkContext.Provider>
        {!isCurrent && props.separator}
      </li>
    );
  },
);

interface BreadcrumbsProps<T extends Breadcrumb = Breadcrumb>
  extends RACBreadcrumbsProps<T> {
  /**
   * Current navigation root URL (flattened)
   */
  root?: string;
  /**
   * Whether include the root item in the breadcrubs (based on the root prop)
   */
  includeRoot?: boolean;
  /**
   * Icon component to be used for the root item
   */
  homeIcon?: React.ReactNode;
}

export function Breadcrumbs<T extends Breadcrumb>(props: BreadcrumbsProps<T>) {
  const { root, includeRoot, homeIcon, items } = props;
  let itemsWithRoot: typeof items;
  if (includeRoot) {
    const rootItem = {
      '@id': root || '/',
      title: 'Home',
      icon: homeIcon || <HomeIcon size="sm" />,
    } as T;
    itemsWithRoot = [rootItem, ...items!];
  }

  return (
    <RACBreadcrumbs
      {...props}
      items={itemsWithRoot || items}
      className={twMerge('flex gap-1', props.className)}
    />
  );
}

export function Breadcrumb(
  props: BreadcrumbProps &
    Omit<LinkProps, 'className'> & {
      separator?: React.ReactNode;
    },
) {
  return (
    <BreadcrumbPrimitive
      {...props}
      separator={
        props.separator ?? (
          <ChevronrightIcon className="h-3 w-3 text-gray-600 dark:text-zinc-400" />
        )
      }
      className={composeTailwindRenderProps(
        props.className,
        'flex items-center gap-1',
      )}
    >
      <Link variant="secondary" {...props} />
    </BreadcrumbPrimitive>
  );
}
