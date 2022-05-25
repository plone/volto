import React from 'react';
import PropTypes from 'prop-types';
import { BlockDataForm } from '@plone/volto/components';
import { TableSchema } from './schema';
import { useIntl } from 'react-intl';

const TableSidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = TableSchema({ formData: data.table, intl });
  const table = data.table;

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          table: {
            ...table,
            [id]: value,
          },
        });
      }}
      formData={data.table}
      block={block}
    />
  );
};

TableSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default TableSidebar;
