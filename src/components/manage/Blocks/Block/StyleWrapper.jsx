import React from 'react';
import cx from 'classnames';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesLookAround,
} from '@plone/volto/helpers';

const StyleWrapper = (props) => {
  const { children, content, data = {}, id } = props;
  const styles = buildStyleClassNamesFromData(data.styles);
  const nextBlock =
    content['blocks'][
      content['blocks_layout'].items[
        content['blocks_layout'].items.indexOf(id) + 1
      ]
    ];
  const previousBlock =
    content['blocks'][
      content['blocks_layout'].items[
        content['blocks_layout'].items.indexOf(id) - 1
      ]
    ];
  const lookAroundStyles = buildStyleClassNamesLookAround({
    data,
    nextBlock,
    previousBlock,
  });
  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        className: cx([child.props.className, ...styles, ...lookAroundStyles]),
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return rewrittenChildren;
};

export default StyleWrapper;
