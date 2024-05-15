import React from 'react';
import {
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb as RACBreadcrumb,
} from 'react-aria-components';
import { Link } from '../Link/Link';
import { HomeIcon } from './HomeIcon';
import type { BreadcrumbsProps as RACBreadcrumbsProps } from 'react-aria-components';

type Breadcrumb = {
  '@id': string;
  title: string;
};

interface BreadcrumbsProps<T> extends RACBreadcrumbsProps<T> {
  /**
   * Current navigation root URL (flattened)
   */
  root?: string;
  /**
   * Whether include the root item in the breadcrubs (based on the root prop)
   */
  includeRoot?: boolean;
}

/**
 * Breadcrumbs display a hierarchy of links to the current page or resource in an application.
 */
export function Breadcrumbs({
  className,
  items,
  root,
  includeRoot,
}: BreadcrumbsProps<Breadcrumb>) {
  let itemsWithRoot: typeof items;
  if (includeRoot) {
    const rootItem: Breadcrumb = {
      '@id': root || '/',
      title: 'Home',
    };
    itemsWithRoot = [rootItem, ...(items as Breadcrumb[])];
  }

  return (
    <nav aria-label="breadcrumbs" role="navigation">
      <RACBreadcrumbs className={className} items={itemsWithRoot || items}>
        {(item) => (
          <RACBreadcrumb className={className} id={item['@id']}>
            <Link href={item['@id']}>
              {item['@id'] === (root || '/') && <HomeIcon size="S" />}
              {item.title}
            </Link>
          </RACBreadcrumb>
        )}
      </RACBreadcrumbs>
    </nav>
  );
}
