import React from 'react';
import cx from 'classnames';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  buildStyleObjectFromData,
} from '@plone/volto/helpers';

const StyleWrapper = (props) => {
  let classNames,
    style = [];
  const { children, content, data = {}, block } = props;
  classNames = buildStyleClassNamesFromData(data.styles);

  classNames = buildStyleClassNamesExtenders({
    block,
    content,
    data,
    classNames,
  });

  style = buildStyleObjectFromData(data.styles);

  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        className: cx([child.props.className, ...classNames]),
        style: { ...child.props.style, ...style },
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return rewrittenChildren;
};

export default StyleWrapper;
