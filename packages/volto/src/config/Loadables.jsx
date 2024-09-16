import { lazy } from 'react';

// This is to make happy the types declaration extractor (tsc) that is not able to
// extract one private method the types from `@dnd-kit` library:
// error TS9006: Declaration emit for this file requires using private name
// 'DefaultDropAnimationSideEffectsOptions' from module '".../node_modules/@dnd-kit/core/dist/components/DragOverlay/hooks/useDropAnimation"'.
// An explicit type annotation may unblock declaration emit

/**
 * @typedef {Object} LoadableLib
 * @property {() => Promise<any>} import
 * @property {Object} [options]
 */

/**
 * @type {{ [key: string]: LoadableLib }}
 */
export const loadables = {
  prettierStandalone: loadable.lib(() => import('prettier/standalone')),
  prettierParserHtml: loadable.lib(() => import('prettier/plugins/html')),
  prismCore: loadable.lib(() => import('prismjs/components/prism-core')),
  toastify: loadable.lib(() => import('react-toastify')),
  reactSelect: loadable.lib(() => import('react-select'), { ssr: false }),
  reactVirtualized: loadable.lib(() => import('react-virtualized'), {
    ssr: false,
  }),
  reactSortableHOC: loadable.lib(() => import('react-sortable-hoc'), {
    ssr: false,
  }),
  reactSelectAsyncPaginate: loadable.lib(
    () => import('react-select-async-paginate'),
    { ssr: false },
  ),
  reactSelectAsync: loadable.lib(() => import('react-select/async'), {
    ssr: false,
  }),
  reactSelectCreateable: loadable.lib(() => import('react-select/creatable'), {
    ssr: false,
  }),
  reactSelectAsyncCreateable: loadable.lib(
    () => import('react-select/async-creatable'),
    {
      ssr: false,
    },
  ),
  diffLib: loadable.lib(() => import('diff')),
  moment: loadable.lib(() => import('moment')),
  reactDates: loadable.lib(() => import('react-dates')),
  reactDnd: loadable.lib(() => import('react-dnd')),
  reactDndHtml5Backend: loadable.lib(() => import('react-dnd-html5-backend')),
  reactBeautifulDnd: loadable.lib(() => import('react-beautiful-dnd')),
  rrule: loadable.lib(() => import('rrule')),
  dndKitCore: loadable.lib(() => import('@dnd-kit/core')),
  dndKitSortable: loadable.lib(() => import('@dnd-kit/sortable')),
  dndKitUtilities: loadable.lib(() => import('@dnd-kit/utilities')),
};
