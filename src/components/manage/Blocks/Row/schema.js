import { defineMessages } from 'react-intl';
import downSVG from '@plone/volto/icons/down.svg';
import rightSVG from '@plone/volto/icons/ahead.svg';

const messages = defineMessages({
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
  row: {
    id: 'Row',
    defaultMessage: 'Row',
  },
  direction: {
    id: 'Direction',
    defaultMessage: 'Direction',
  },
});

export const GridSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.row),
    block: 'row',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['headline', 'direction'],
      },
    ],

    properties: {
      headline: {
        title: intl.formatMessage(messages.headline),
      },
      direction: {
        title: intl.formatMessage(messages.direction),
        widget: 'buttons',
        actions: ['row', 'column'],
        actionsInfoMap: {
          row: [rightSVG, 'Row'],
          column: [downSVG, 'Column'],
        },
        defaultAction: 'row',
        default: 'row',
      },
    },
    required: [],
  };
};
