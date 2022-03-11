import { v4 as uuid } from 'uuid';
import { defineMessages } from 'react-intl';

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
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
  {
    image: gridTemplate2,
    id: 'gridtemplatetwo',
    title: `2 ${intl.formatMessage(messages.columns)}`,
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
  {
    image: gridTemplate3,
    id: 'gridtemplatethree',
    title: `3 ${intl.formatMessage(messages.columns)}`,
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
  {
    image: gridTemplate4,
    id: 'gridtemplatefour',
    title: `4 ${intl.formatMessage(messages.columns)}`,
    columns: [
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ],
  },
];

export default templates;
