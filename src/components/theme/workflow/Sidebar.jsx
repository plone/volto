import React from 'react';
import { useIntl } from 'react-intl';
//import { useDispatch } from 'react-redux';
//import { getContent } from '@plone/volto/actions';
//import { BlockDataForm } from '@plone/volto/components';
import { InlineForm } from '@plone/volto/components';

import { NodeSchema } from './schemaNode';
import { EdgeSchema } from './schemaEdge';

const HighlightTeaserData = (props) => {
  const { data, onChangeBlock, selectionType } = props;
  const intl = useIntl();
  // console.log('This is from sidebar', data, onChangeBlock);

  const schema =
    selectionType === 'Node'
      ? NodeSchema({ ...props, intl })
      : EdgeSchema({ ...props, intl });

  return (
    <InlineForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(id, value);
      }}
      formData={data}
    />
  );
};

export default HighlightTeaserData;
