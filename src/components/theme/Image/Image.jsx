/*
WARNING!
This componente renders images taking care of prefixPath.
It needs merge and refactor when this https://github.com/plone/volto/pull/3337 pr will be merged, 
and <source srcSet={srcSet} /> needs to handle prefixPath.
*/
import React from 'react';
import { addPrefixPath } from '@plone/volto/helpers';

const Image = (props) => {
  const { src, alt = '', ...rest } = props;

  let url = addPrefixPath(src);

  return <img src={url} {...rest} alt={alt} />;
};

export default Image;
