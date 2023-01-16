import React from 'react';
import cx from 'classnames';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers';

const StyleWrapper = (props) => {
  const { children, content, data = {}, block } = props;
  const styles = buildStyleClassNamesFromData(data.styles);

  const styleExtenders = buildStyleClassNamesExtenders({
    block,
    content,
    data,
  });
  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        className: cx([child.props.className, ...styles, ...styleExtenders]),
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return rewrittenChildren;
};

export default StyleWrapper;
