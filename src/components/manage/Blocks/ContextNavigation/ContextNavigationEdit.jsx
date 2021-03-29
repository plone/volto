import React from 'react';
import { EditSchema } from './schema';
import { InlineForm } from '@plone/volto/components';
import ContextNavigation from './ContextNavigationView';

const ContextNavigationFillView = (props) => {
  return (
    <>
      <ContextNavigation {...props.data} />{' '}
      {props.selected && <InlineForm schema={EditSchema()} />}
    </>
  );
};

export default ContextNavigationFillView;
