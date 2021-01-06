import loadable from '@loadable/component';

export const loadables = {
  prettierStandalone: loadable.lib(() => import('prettier/standalone')),
  prettierParserHtml: loadable.lib(() => import('prettier/parser-html')),
  prismCore: loadable.lib(() => import('prismjs/components/prism-core')),
  toastify: loadable.lib(() => import('react-toastify'), {
    resolveComponent: (lib) => lib.toast,
  }),
  reactSelect: loadable.lib(() => import('react-select')),
};
