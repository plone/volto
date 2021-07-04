import React from 'react';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import QuantaEditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/QuantaEditBlockWrapper';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import { BlockToolbarItem } from '@plone/volto/components';
import hideSVG from '@plone/volto/icons/hide.svg';
// import showSVG from '@plone/volto/icons/show.svg';

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
          <Plug pluggable="block-toolbar-main" id="hide-slot-fill">
            {(options) => (
              <BlockToolbarItem
                {...options}
                label="Hide slot fill"
                icon={hideSVG}
                onClick={() => {}}
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
