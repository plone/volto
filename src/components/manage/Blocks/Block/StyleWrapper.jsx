import React from 'react';
import cx from 'classnames';
import { buildStyleClassNamesFromData } from '@plone/volto/helpers';

const StyleWrapper = (props) => {
  const { children, data = {} } = props;
  const styles = buildStyleClassNamesFromData(data);
  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        className: cx([child.props.className, ...styles]),
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return rewrittenChildren;
};

export default StyleWrapper;
