import React from 'react';
import { injectIntl } from 'react-intl';
import QuantaEditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/QuantaEditBlockWrapper';
import cx from 'classnames';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import trashSVG from '@plone/volto/icons/delete.svg';
import { BlockToolbarItem } from '@plone/volto/components';

const SlotEditBlockWrapper = (props) => {
  const { blockProps } = props;
  const { data } = blockProps;
  const inherited = data._v_inherit ? 'slot-inherited' : null;
  console.log('data', data);
  // , selected, block

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
      {inherited ? (
        <Plug
          pluggable="block-toolbar-extra"
          id="delete-button"
          dependencies={[blockProps]}
          extra={{ group: 'slot' }}
        >
          <div>inherited</div>
        </Plug>
      ) : (
        ''
      )}
    </>
  );
};

export default injectIntl(SlotEditBlockWrapper);
