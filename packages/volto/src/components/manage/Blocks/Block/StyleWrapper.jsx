import React from 'react';
import cx from 'classnames';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  buildStyleObjectFromData,
} from '@plone/volto/helpers/Blocks/Blocks';
import config from '@plone/volto/registry';

const SevenStyleWrapper = (props) => {
  const { children, data = {}, classNames, blocksConfig, style } = props;
  const category = blocksConfig?.[data['@type']]?.category;
  return (
    <div
      className={cx(
        'block',
        data['@type'],
        { [`category-${category}`]: category },
        classNames,
      )}
      style={style}
    >
      <div className="block-inner-container">{children}</div>
    </div>
  );
};

const StyleWrapper = (props) => {
  let classNames,
    style = [];
  const { block, children, content, data = {}, isContainer } = props;
  const sevenBlockModel = config.experimental.sevenBlockModel.enabled;
  classNames = buildStyleClassNamesFromData(data.styles);

  classNames = buildStyleClassNamesExtenders({
    block,
    content,
    data,
    classNames,
  });

  style = buildStyleObjectFromData(
    data,
    '',
    // If we are rendering blocks inside a container, then pass also the data from the container
    // This is needed in order to calculate properly the styles for the blocks inside the container
    isContainer && content.blocks ? content : {},
  );

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

  return (
    <MaybeWrap {...props} condition={sevenBlockModel} as={SevenStyleWrapper}>
      {rewrittenChildren}
    </MaybeWrap>
  );
};

export default StyleWrapper;
