import { defineMessages } from 'react-intl';
import downSVG from '@plone/volto/icons/down.svg';
import rightSVG from '@plone/volto/icons/ahead.svg';
import config from '@plone/volto/registry';

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

export const RowSchema = (props) => {
  const { intl } = props;
  const hasColumnBlockEnabled = config.experimental.columnBlock.enabled;

  return {
    title: intl.formatMessage(messages.row),
    block: 'row',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['headline', ...(hasColumnBlockEnabled ? 'direction' : [])],
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
