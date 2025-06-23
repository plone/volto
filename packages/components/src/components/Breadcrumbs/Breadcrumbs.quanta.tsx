import React from 'react';
import { ChevronrightIcon, HomeIcon } from '../../components/icons';
import {
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps,
  type BreadcrumbsProps as RACBreadcrumbsProps,
  type LinkProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { Link } from '../Link/Link.quanta';
import { composeTailwindRenderProps } from '../utils';

export interface Breadcrumb {
  '@id': string;
  title: string;
  icon?: React.ReactNode;
}

export function Breadcrumb(
  props: BreadcrumbProps &
    Omit<LinkProps, 'className'> & {
      separator?: React.ReactNode;
      value?: Breadcrumb;
    },
) {
  return (
    <RACBreadcrumb
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex items-center gap-1 [&_a>svg]:mx-1 [&_a>svg]:inline [&_a>svg]:align-text-top',
      )}
    >
      {({ isCurrent }) => (
        <>
          {props.value?.icon && props.value?.icon}
          <Link variant="secondary" {...props} />
          {!isCurrent &&
            (props.separator ?? (
              <ChevronrightIcon className="h-3 w-3 text-gray-600" />
            ))}
        </>
      )}
    </RACBreadcrumb>
  );
}

interface BreadcrumbsProps<T extends Breadcrumb = Breadcrumb>
  extends RACBreadcrumbsProps<T> {
  /**
   * If we should include a root item in the breadcrumbs, we provide a Breadcrumb object.
   */
  root?: Breadcrumb;
}

export function Breadcrumbs<T extends Breadcrumb>(props: BreadcrumbsProps<T>) {
  const { root, items } = props;
  let itemsWithRoot: typeof items;
  if (root && items) {
    const rootItem = {
      '@id': root['@id'] || '/',
      title: 'Home',
      icon: root.icon || <HomeIcon size="sm" />,
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
