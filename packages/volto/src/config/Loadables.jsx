import loadable from '@loadable/component';

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
};
