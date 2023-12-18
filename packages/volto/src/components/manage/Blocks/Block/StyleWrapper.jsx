import React from 'react';
import cx from 'classnames';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers';

const StyleWrapper = (props) => {
  let classNames = [];
  const { children, content, data = {}, block } = props;
  classNames = buildStyleClassNamesFromData(data.styles);

  classNames = buildStyleClassNamesExtenders({
    block,
    content,
    data,
    classNames,
  });
  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        className: cx([child.props.className, ...classNames]),
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return rewrittenChildren;
};

export default StyleWrapper;
