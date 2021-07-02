import React from 'react';
import { injectIntl } from 'react-intl';
import QuantaEditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/QuantaEditBlockWrapper';
import cx from 'classnames';
import { Plug } from '@plone/volto/components/manage/Pluggable';

const SlotEditBlockWrapper = (props) => {
  const { blockProps } = props;
  const { data, selected, block } = blockProps;
  // const inherited = data._v_inherit && 'slot-inherited';
  // console.log('inherited', inherited, data);

  const inherited = true;
  return (
    <>
      <QuantaEditBlockWrapper
        {...props}
        className={cx(
          'slot-editor',
          `slot-editor-${data['@type']}`,
          inherited || '',
        )}
        key={`wrapper-${block}-${selected}`}
      />
      {inherited && (
        <Plug
          pluggable="block-toolbar-more"
          id="delete-button"
          from="slot"
          key={`plug-${block}-${selected}`}
        ></Plug>
      )}
    </>
  );
};

export default injectIntl(SlotEditBlockWrapper);
