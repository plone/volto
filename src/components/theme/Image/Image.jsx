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
  if (isInternalURL(src)) {
    url = (config.settings.prefixPath ?? '') + src; //add prefixPath to src if it's an internal url
  }

  return <img src={url} {...rest} alt={alt} />;
};

export default Image;
