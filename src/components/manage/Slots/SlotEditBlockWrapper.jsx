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
        classNames={cx('slot-editor', `slot-editor-${data['@type']}`, {
          'slot-inherited': inherited,
        })}
      />

      <Plug
        pluggable="block-toolbar-main"
        id="mutate-block-button-classic"
        dependencies={[blockProps]}
      >
        <></>
      </Plug>

      {selected && inherited && (
        <>
          <Plug
            pluggable="block-toolbar-main"
            id="mutate-block-button"
            dependencies={[blockProps]}
          >
            <></>
          </Plug>
          <Plug
            pluggable="block-toolbar-extra"
            id="delete-button"
            dependencies={[blockProps]}
            extra={{ group: 'slot' }}
          >
            <></>
          </Plug>
          <Plug
            pluggable="block-toolbar-main"
            id="mutate-block-button"
            dependencies={[blockProps]}
          ></Plug>
        </>
      )}
    </>
  );
};

export default injectIntl(SlotEditBlockWrapper);
