import { defineMessages } from 'react-intl';
import { blocksFormGenerator } from '@plone/volto/helpers/Blocks/Blocks';

import gridTemplate1 from './grid-1.svg';
import gridTemplate2 from './grid-2.svg';
import gridTemplate3 from './grid-3.svg';
import gridTemplate4 from './grid-4.svg';

const messages = defineMessages({
  column: {
    id: 'column',
    defaultMessage: 'column',
  },
  columns: {
    id: 'columns',
    defaultMessage: 'columns',
  },
});

const templates = (type) => (intl) => [
  {
    image: gridTemplate1,
    id: 'gridtemplateone',
    title: `1 ${intl.formatMessage(messages.column)}`,
    blocksData: blocksFormGenerator(1, type),
  },
  {
    image: gridTemplate2,
    id: 'gridtemplatetwo',
    title: `2 ${intl.formatMessage(messages.columns)}`,
    blocksData: blocksFormGenerator(2, type),
  },
  {
    image: gridTemplate3,
    id: 'gridtemplatethree',
    title: `3 ${intl.formatMessage(messages.columns)}`,
    blocksData: blocksFormGenerator(3, type),
  },
  {
    image: gridTemplate4,
    id: 'gridtemplatefour',
    title: `4 ${intl.formatMessage(messages.columns)}`,
    blocksData: blocksFormGenerator(4, type),
  },
];

export default templates;
