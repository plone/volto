import React from 'react';
import {
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb as RACBreadcrumb,
  type BreadcrumbProps as RACBreadcrumbProps,
  type BreadcrumbsProps as RACBreadcrumbsProps,
  type LinkProps,
} from 'react-aria-components';
import { Link } from '../Link/Link';
import { HomeIcon } from '../../components/icons';

export type Breadcrumb = {
  '@id': string;
  title: string;
  icon?: React.ReactNode;
};

export function Breadcrumb(
  props: RACBreadcrumbProps &
    Omit<LinkProps, 'className'> & {
      separator?: React.ReactNode;
      value?: Breadcrumb;
    },
) {
  return (
    <RACBreadcrumb {...props}>
      {({ isCurrent }) => (
        <>
          {props.value?.icon && props.value?.icon}
          <Link {...props} />
          {!isCurrent && props.separator && props.separator}
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

/**
 * Breadcrumbs display a hierarchy of links to the current page or resource in an application.
 */
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

  return <RACBreadcrumbs {...props} items={itemsWithRoot || items} />;
}

export function BreadcrumbsSlot<T extends Breadcrumb>(
  props: BreadcrumbsProps<T>,
) {
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
    <nav aria-label="breadcrumbs" role="navigation">
      <Breadcrumbs items={itemsWithRoot || items}>
        {(item) => (
          <Breadcrumb id={item['@id']} href={item['@id']}>
            {item.title}
          </Breadcrumb>
        )}
      </Breadcrumbs>
    </nav>
  );
}
