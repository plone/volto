import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Accordion, Button, Segment } from 'semantic-ui-react';
import { DragDropList, FormFieldWrapper, Icon } from '@plone/volto/components';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  Criteria: {
    id: 'Criteria',
    defaultMessage: 'Criteria',
  },
  depth: {
    id: 'Depth',
    defaultMessage: 'Depth',
  },
  SortOn: {
    id: 'Sort on',
    defaultMessage: 'Sort on',
  },
  reversedOrder: {
    id: 'Reversed order',
    defaultMessage: 'Reversed order',
  },
  limit: {
    id: 'Results limit',
    defaultMessage: 'Results limit',
  },
  itemBatchSize: {
    id: 'Item batch size',
    defaultMessage: 'Item batch size',
  },
  NoSelection: {
    id: 'No selection',
    defaultMessage: 'No selection',
  },
});

const QuerystringWidget = (props) => {
  const { block, value } = props;

  const intl = useIntl();

  const objectSchema = {
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'query',
          ...(value?.query?.filter((q) => q.i === 'path').length > 0
            ? ['depth']
            : []),
          'sort_on',
          'sort_order',
          'limit',
          'batch_size',
        ],
      },
    ],
    properties: {
      query: {
        title: intl.formatMessage(messages.Criteria),
        widget: 'query',
      },
      depth: {
        title: intl.formatMessage(messages.depth),
        type: 'number',
      },
      sort_on: {
        title: intl.formatMessage(messages.SortOn),
        widget: 'query_sort_on',
      },
      sort_order: {
        title: intl.formatMessage(messages.reversedOrder),
        type: 'boolean',
      },
      limit: {
        title: intl.formatMessage(messages.limit),
        type: 'number',
      },
      batch_size: {
        title: intl.formatMessage(messages.itemBatchSize),
        type: 'number',
      },
    },
    required: [],
  };

  return (
    <div className="querystring-widget">
      <ObjectWidget {...props} block={block} schema={objectSchema} />
    </div>
  );
};
export default QuerystringWidget;
