import React from 'react';
import { injectIntl } from 'react-intl';
import QuantaEditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/QuantaEditBlockWrapper';
import cx from 'classnames';
import { Plug } from '@plone/volto/components/manage/Pluggable';

const SlotEditBlockWrapper = (props) => {
  const { blockProps } = props;
  const { data } = blockProps;
  const inherited = data._v_inherit && 'slot-inherited';

  return (
    <>
      <QuantaEditBlockWrapper
        {...props}
        className={cx(
          'slot-editor',
          `slot-editor-${data['@type']}`,
          inherited || '',
        )}
      />
      <Plug pluggable="block-toolbar" id="slot-buttons"></Plug>
    </>
  );
};

export default injectIntl(SlotEditBlockWrapper);
