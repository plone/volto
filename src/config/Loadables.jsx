import loadable from '@loadable/component';

export const loadables = {
  'prettier/standalone': loadable.lib(() => import('prettier/standalone')),
  'prettier/parser-html': loadable.lib(() => import('prettier/parser-html')),
  'prismjs/components/prism-core': loadable.lib(() =>
    import('prismjs/components/prism-core'),
  ),
  'prismjs/components/prism-markup': loadable.lib(() =>
    import('prismjs/components/prism-markup'),
  ),
  'react-select': loadable.lib(() => import('react-select')),
};
