import React from 'react';
import cx from 'classnames';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, useIntl } from 'react-intl';
import { BlockChooserButton, Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';
import {
  Pluggable,
  Plug,
  // context as PluggableContext,
} from '@plone/volto/components/manage/Pluggable';
import PluggableMenuSection from './PluggableMenuSection';

import config from '@plone/volto/registry';

import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
});

const hideHandler = (data) => {
  return !!data.fixed || !blockHasValue(data);
};

const QuantaEditBlockWrapper = (props) => {
  const { blockProps, draginfo, children, classNames } = props;
  const intl = useIntl();
  const { selected, data, type, onDeleteBlock, block } = blockProps;
  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  const visibleHandler = selected && !hideHandler(data);
  // console.log(props);
  // {draginfo.dragHandleProps['data-rbd-drag-handle-draggable-id']}

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={cx(
        'quanta-block',
        `quanta-block-editor-${data['@type']}`,
        classNames,
      )}
    >
      {selected ? (
        <>
          <Pluggable name="block-toolbar">
            {(blockControls) => {
              // console.log(
              //   'bt',
              //   blockControls.map((p) => p.id),
              // );
              return (
                <div className="toolbar quanta-block-toolbar">
                  <Button
                    style={{
                      // avoid react-dnd to complain
                      visibility: visibleHandler ? 'visible' : 'visible',
                    }}
                    {...draginfo.dragHandleProps}
                    icon
                    basic
                  >
                    <Icon name={dragSVG} size="18px" />
                  </Button>
                  {blockControls.map((p) => p())}
                </div>
              );
            }}
          </Pluggable>
          <Plug
            pluggable="block-toolbar"
            id="block-children"
            dependencies={[{ ...blockProps }]}
          >
            <Pluggable
              name={`block-toolbar-required:${block}`}
              params={blockProps}
            />
            <Pluggable
              name={`block-toolbar-main:${block}`}
              params={blockProps}
            />
            <PluggableMenuSection
              name={`block-toolbar-extra:${block}`}
              maxSizeBeforeCollapse={3}
              params={blockProps}
            />
          </Plug>
          <Plug
            pluggable={`block-toolbar-main:${block}`}
            id="mutate-block-button-classic"
            dependencies={[{ ...blockProps }]}
          >
            <></>
          </Plug>
          <Plug
            pluggable={`block-toolbar-main:${block}`}
            id="mutate-block-button"
            dependencies={[{ ...blockProps }]}
          >
            <BlockChooserButton
              {...blockProps}
              onInsertBlock={(id, value) => {
                blockProps.onSelectBlock(blockProps.onInsertBlock(id, value));
              }}
              className="quanta-block-add-button"
            />
          </Plug>
          <Plug
            pluggable={`block-toolbar-extra:${block}`}
            id="delete-button"
            dependencies={[blockProps]}
          >
            <>
              {!required ? (
                <Button
                  icon
                  basic
                  onClick={() => onDeleteBlock(block)}
                  className="delete-button"
                  aria-label={intl.formatMessage(messages.delete)}
                >
                  <Icon name={trashSVG} size="18px" />
                </Button>
              ) : null}
            </>
          </Plug>
        </>
      ) : (
        <div {...draginfo.dragHandleProps} style={{ display: 'none' }}></div>
      )}
      <div className={`ui drag block inner ${type}`}>{children}</div>
    </div>
  );
};

export default QuantaEditBlockWrapper;
/*
{children.map((child, i) => (
  <Dropdown.Item key={i}>{child}</Dropdown.Item>
))}
          <Plug
            id={`drag-handler:${block}`}
            pluggable="block-toolbar"
            extra={{ visible: visibleHandler }}
            order={-100}
            dependencies={[{ ...blockProps }]}
          ></Plug>
 *
*/
/*
<QuantaToolbar
  {...props}
  extra={
    <Button
      style={{
        // avoid react-dnd to complain
        visibility: visibleHandler ? 'visible' : 'visible',
      }}
      {...draginfo.dragHandleProps}
      icon
      basic
    >
      <Icon name={dragSVG} size="18px" />
    </Button>
  }
></QuantaToolbar>;
// const QuantaToolbar = ({ extra, children }) => {
//   // const pluggableContext = React.useContext(PluggableContext);
//   return (
//     <Pluggable name="block-toolbar">
//       {(pluggables) => {
//         console.log(
//           'bt',
//           // pluggables,
//           pluggables.map((p) => p.id),
//         );
//         return pluggables?.length ? (
//           <>
//             <div className="toolbar quanta-block-toolbar">
//               {pluggables.map((p) => p())}
//             </div>
//           </>
//         ) : (
//           extra
//         );
//       }}
//     </Pluggable>
//   );
// };

*/
