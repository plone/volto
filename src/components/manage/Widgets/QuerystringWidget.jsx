import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';

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

export const objectSchema = ({
  value,
  intl,
  includePaginationFields = true,
}) => {
  const fields = [
    'query',
    ...(value?.query?.filter((q) => q.i === 'path').length > 0
      ? ['depth']
      : []),
    'sort_on',
    'sort_order_boolean',
    ...(includePaginationFields ? ['limit', 'batch_size'] : []),
  ];

  return {
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields,
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
      sort_order_boolean: {
        title: intl.formatMessage(messages.reversedOrder),
        type: 'boolean',
      },
      ...(includePaginationFields
        ? {
            limit: {
              title: intl.formatMessage(messages.limit),
              type: 'number',
            },
            batch_size: {
              title: intl.formatMessage(messages.itemBatchSize),
              type: 'number',
            },
          }
        : {}),
    },
    required: [],
  };
};

const QuerystringWidget = (props) => {
  const { block, onChange } = props;

  const intl = useIntl();
  const schema = objectSchema({ ...props, intl });

  return (
    <div className="querystring-widget">
      <ObjectWidget
        {...props}
        block={block}
        schema={schema}
        onChange={(id, value) => {
          const adaptedValue = {
            ...value,
            sort_order: value.sort_order_boolean ? 'descending' : 'ascending',
          };
          onChange(id, adaptedValue);
        }}
      />
    </div>
  );
};
export default QuerystringWidget;
