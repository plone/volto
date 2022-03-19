import { defineMessages } from 'react-intl';
import { blocksFormGenerator } from '@plone/volto/helpers';

import rowTemplate1 from './row-1.svg';
import rowTemplate2 from './row-2.svg';
import rowTemplate3 from './row-3.svg';
import rowTemplate4 from './row-4.svg';

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
    image: rowTemplate1,
    id: 'rowtemplateone',
    title: `1 ${intl.formatMessage(messages.column)}`,
    blocksData: blocksFormGenerator(1, type),
  },
  {
    image: rowTemplate2,
    id: 'rowtemplatetwo',
    title: `2 ${intl.formatMessage(messages.columns)}`,
    blocksData: blocksFormGenerator(2, type),
  },
  {
    image: rowTemplate3,
    id: 'rowtemplatethree',
    title: `3 ${intl.formatMessage(messages.columns)}`,
    blocksData: blocksFormGenerator(3, type),
  },
  {
    image: rowTemplate4,
    id: 'rowtemplatefour',
    title: `4 ${intl.formatMessage(messages.columns)}`,
    blocksData: blocksFormGenerator(4, type),
  },
];

export default templates;
