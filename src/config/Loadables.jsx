import loadable from '@loadable/component';

export const loadables = {
  prettierStandalone: loadable.lib(() => import('prettier/standalone')),
  prettierParserHtml: loadable.lib(() => import('prettier/parser-html')),
  prismCore: loadable.lib(() => import('prismjs/components/prism-core')),
  toastify: loadable.lib(() => import('react-toastify')),
  reactSelect: loadable.lib(() => import('react-select'), { ssr: false }),
  reactSelectAsyncPaginate: loadable.lib(
    () => import('react-select-async-paginate'),
    { ssr: false },
  ),
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
};
