import DefaultTocRenderer from './DefaultTocRenderer';
import HorizontalMenu from './HorizontalMenu';

export default [
  {
    id: 'default',
    title: 'Listing (default)',
    view: DefaultTocRenderer,
    schemaExtender: null,
  },
  {
    id: 'horizontalMenu',
    title: 'Horizontal Menu',
    view: HorizontalMenu,
    schemaExtender: null,
  },
];
