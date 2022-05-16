/*
WARNING!
This componente renders images taking care of prefixPath.
It needs merge and refactor when this https://github.com/plone/volto/pull/3337 pr will be merged, 
and <source srcSet={srcSet} /> needs to handle prefixPath.
*/
import React from 'react';
import { isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const Image = (props) => {
  const { src, alt = '', ...rest } = props;
  let url = src;
  const { prefixPath } = config.settings;
  if (isInternalURL(src) && prefixPath && !src.startsWith(prefixPath)) {
    url = prefixPath + src; //add prefixPath to src if it's an internal url and not a static resource.
  }
  return <img src={url} {...rest} alt={alt} />;
};

export default Image;
