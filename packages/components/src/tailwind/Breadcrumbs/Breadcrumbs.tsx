import { ChevronRightIcon } from '../../components/Icons/ChevronrightIcon';
import React from 'react';
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  type LinkProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { Link } from './Link';
import { composeTailwindRenderProps } from './utils';

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return (
    <AriaBreadcrumbs
      {...props}
      className={twMerge('flex gap-1', props.className)}
    />
  );
}

export function Breadcrumb(
  props: BreadcrumbProps & Omit<LinkProps, 'className'>,
) {
  return (
    <AriaBreadcrumb
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'flex items-center gap-1',
      )}
    >
      <Link variant="secondary" {...props} />
      {props.href && (
        <ChevronRight className="h-3 w-3 text-gray-600 dark:text-zinc-400" />
      )}
    </AriaBreadcrumb>
  );
}
