// action types
export const SAVE_SLATE_BLOCK_SELECTION = 'SAVE_SLATE_BLOCK_SELECTION';
export const SLATE_PLUGINS = 'SLATE_PLUGINS';
export const UPLOAD_CONTENT = 'UPLOAD_CONTENT';

// element 'types'. Useful to identify element types across codebase
export const IMAGE = 'img';
// export const FOOTNOTE = 'footnote';
export const LINK = 'a';
export const SIMPLELINK = 'link';

export const TABLE = 'table';
export const THEAD = 'thead';
export const TBODY = 'tbody';
export const TFOOT = 'tbody';
export const TR = 'tr';
export const TH = 'th';
export const TD = 'td';

export const P = 'p';

export const LI = 'li';
export const UL = 'ul';
export const OL = 'ol';
export const H1 = 'h1';
export const H2 = 'h2';
export const H3 = 'h3';
export const BLOCKQUOTE = 'blockquote';

// dom parsing node information
export const TEXT_NODE = 3;
export const ELEMENT_NODE = 1;
export const COMMENT = 8;

export const INLINE_ELEMENTS = [
  'A',
  'ABBR',
  'ACRONYM',
  'AUDIO',
  'B',
  'BDI',
  'BDO',
  'BIG',
  'BR',
  'BUTTON',
  'CANVAS',
  'CITE',
  'CODE',
  'DATA',
  'DATALIST',
  'DEL',
  'DFN',
  'EM',
  'EMBED',
  'I',
  'IFRAME',
  'IMG',
  'INPUT',
  'INS',
  'KBD',
  'LABEL',
  'MAP',
  'MARK',
  'METER',
  'NOSCRIPT',
  'OBJECT',
  'OUTPUT',
  'PICTURE',
  'PROGRESS',
  'Q',
  'RUBY',
  'S',
  'SAMP',
  'SCRIPT',
  'SELECT',
  'SLOT',
  'SMALL',
  'SPAN',
  'STRONG',
  'SUB',
  'SUP',
  'SVG',
  'TEMPLATE',
  'TEXTAREA',
  'TIME',
  'U',
  'TT',
  'VAR',
  'VIDEO',
  'WBR',
];

export const BLOCK_ELEMENTS = [
  'ADDRESS',
  'ARTICLE',
  'ASIDE',
  'BLOCKQUOTE',
  'DETAILS',
  'DIALOG',
  'DD',
  'DIV',
  'DL',
  'DT',
  'FIELDSET',
  'FIGCAPTION',
  'FIGURE',
  'FOOTER',
  'FORM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HEADER',
  'HGROUP',
  'HR',
  'LI',
  'MAIN',
  'NAV',
  'OL',
  'P',
  'PRE',
  'SECTION',
  'TABLE',
  'UL',
];
