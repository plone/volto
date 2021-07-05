import React from 'react';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import QuantaEditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/QuantaEditBlockWrapper';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import { BlockToolbarItem } from '@plone/volto/components';
import hideSVG from '@plone/volto/icons/hide.svg';
import showSVG from '@plone/volto/icons/show.svg';

const SlotEditBlockWrapper = (props) => {
  const { blockProps } = props;
  const { data, selected, block, onChangeBlock } = blockProps;
  const inherited = data._v_inherit ? 'slot-inherited' : null;
  const blockIsHidden = data['v:hidden'];

  return (
    <>
      <QuantaEditBlockWrapper
        {...props}
        classNames={cx('slot-editor', `slot-editor-${data['@type']}`, {
          'slot-inherited': inherited,
          'slot-hidden': blockIsHidden,
        })}
      />

      {/* Override the classic button, if it exists */}
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
            id="hide-slot-fill"
            dependencies={[blockProps]}
          >
            {(options) => (
              <BlockToolbarItem
                {...options}
                label="Hide slot fill"
                icon={blockIsHidden ? showSVG : hideSVG}
                onClick={() =>
                  onChangeBlock(block, { ...data, 'v:hidden': !blockIsHidden })
                }
              />
            )}
          </Plug>
          {/* Hide the mutate and delete buttons, if slot is inherited */}
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
        </>
      )}
    </>
  );
};

export default injectIntl(SlotEditBlockWrapper);
