import React from 'react';
import TitleBlockView from './TitleBlockView';
import TitleBlockEdit from './TitleBlockEdit';

export default (config) => {
  const className = 'documentFirstHeading';
  const formFieldName = 'title';

  config.blocks.blocksConfig.title.view = (props) => (
    <TitleBlockView
      {...props}
      className={className}
      formFieldName={formFieldName}
    />
  );
  config.blocks.blocksConfig.title.edit = (props) => (
    <TitleBlockEdit
      {...props}
      className={className}
      formFieldName={formFieldName}
    />
  );

  return config;
};
