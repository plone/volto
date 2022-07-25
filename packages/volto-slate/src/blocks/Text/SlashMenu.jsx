import React from 'react';
import PropTypes from 'prop-types';
import { filter, isEmpty } from 'lodash';
import { Menu } from 'semantic-ui-react';
import { useIntl, FormattedMessage } from 'react-intl';
import { Icon } from '@plone/volto/components';

const emptySlateBlock = () => ({
  value: [
    {
      children: [
        {
          text: '',
        },
      ],
      type: 'p',
    },
  ],
  plaintext: '',
});

const useIsMounted = () => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = true;
    return () => (ref.current = false);
  }, []);
  return ref.current;
};

const SlashMenu = ({
  currentBlock,
  onMutateBlock,
  selected,
  availableBlocks,
}) => {
  const intl = useIntl();

  return (
    <div className="power-user-menu">
      <Menu vertical fluid borderless>
        {availableBlocks.map((block, index) => (
          <Menu.Item
            key={block.id}
            className={block.id}
            active={index === selected}
            onClick={(e) => {
              // onInsertBlock(currentBlock, { '@type': block.id });
              onMutateBlock(currentBlock, { '@type': block.id });
              e.stopPropagation();
            }}
          >
            <Icon name={block.icon} size="24px" />
            {intl.formatMessage({
              id: block.title,
              defaultMessage: block.title,
            })}
          </Menu.Item>
        ))}
        {availableBlocks.length === 0 && (
          <Menu.Item>
            <FormattedMessage
              id="No matching blocks"
              defaultMessage="No matching blocks"
            />
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

SlashMenu.propTypes = {
  currentBlock: PropTypes.string.isRequired,
  onInsertBlock: PropTypes.func,
  selected: PropTypes.number,
  blocksConfig: PropTypes.arrayOf(PropTypes.any),
};

/**
 * A SlashMenu wrapper implemented as a volto-slate PersistentHelper.
 */
const PersistentSlashMenu = ({ editor }) => {
  const props = editor.getBlockProps();
  const {
    block,
    blocksConfig,
    data,
    onMutateBlock,
    properties,
    selected,
    allowedBlocks,
    detached,
  } = props;
  const disableNewBlocks = data?.disableNewBlocks || detached;

  const [slashMenuSelected, setSlashMenuSelected] = React.useState(0);

  const useAllowedBlocks = !isEmpty(allowedBlocks);
  const slashCommand = data.plaintext?.trim().match(/^\/([a-z]*)$/);

  const availableBlocks = React.useMemo(
    () =>
      filter(blocksConfig, (item) =>
        useAllowedBlocks
          ? allowedBlocks.includes(item.id)
          : typeof item.restricted === 'function'
          ? !item.restricted({ properties, block: item })
          : !item.restricted,
      )
        .filter(
          // TODO: make it work with intl?
          (block) => slashCommand && block.id.indexOf(slashCommand[1]) === 0,
        )
        .sort((a, b) => (a.title < b.title ? -1 : 1)),
    [allowedBlocks, blocksConfig, properties, slashCommand, useAllowedBlocks],
  );

  const slashMenuSize = availableBlocks.length;
  const show = selected && slashCommand && !disableNewBlocks;

  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (isMounted && show && slashMenuSelected > slashMenuSize - 1) {
      setSlashMenuSelected(slashMenuSize - 1);
    }
  }, [show, slashMenuSelected, isMounted, slashMenuSize]);

  editor.showSlashMenu = show;

  editor.slashEnter = () =>
    slashMenuSize > 0 &&
    onMutateBlock(
      block,
      {
        '@type': availableBlocks[slashMenuSelected].id,
      },
      emptySlateBlock(),
    );

  editor.slashArrowUp = () =>
    setSlashMenuSelected(
      slashMenuSelected === 0 ? slashMenuSize - 1 : slashMenuSelected - 1,
    );

  editor.slashArrowDown = () =>
    setSlashMenuSelected(
      slashMenuSelected >= slashMenuSize - 1 ? 0 : slashMenuSelected + 1,
    );

  return show ? (
    <SlashMenu
      currentBlock={block}
      onMutateBlock={onMutateBlock}
      availableBlocks={availableBlocks}
      selected={slashMenuSelected}
    />
  ) : (
    ''
  );
};

export default PersistentSlashMenu;
