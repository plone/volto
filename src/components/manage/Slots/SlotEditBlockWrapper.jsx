import React from 'react';
import { injectIntl } from 'react-intl';
import QuantaEditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/QuantaEditBlockWrapper';
import cx from 'classnames';
import { Plug } from '@plone/volto/components/manage/Pluggable';

const SlotEditBlockWrapper = (props) => {
  const { blockProps } = props;
  const { data, selected } = blockProps;
  const inherited = data._v_inherit ? 'slot-inherited' : null;

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
      {selected && inherited ? (
        <Plug
          pluggable="block-toolbar-extra"
          id="delete-button"
          dependencies={[blockProps]}
          extra={{ group: 'slot' }}
        >
          <div></div>
        </Plug>
      ) : (
        ''
      )}
    </>
  );
};

export default injectIntl(SlotEditBlockWrapper);
