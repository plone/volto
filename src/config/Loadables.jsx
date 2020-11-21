import loadable from '@loadable/component';

export const loadables = {
  prettierStandalone: loadable.lib(() => import('prettier/standalone')),
  prettierParserHtml: loadable.lib(() => import('prettier/parser-html')),
  prismCore: loadable.lib(() => import('prismjs/components/prism-core')),
  // prismMarkup: loadable.lib(() => import('prismjs/components/prism-markup')),
  reactSelect: loadable.lib(() => import('react-select')),
  toastify: loadable.lib(() => import('react-toastify'), {
    resolveComponent: (lib) => lib.toast,
  }),
};
