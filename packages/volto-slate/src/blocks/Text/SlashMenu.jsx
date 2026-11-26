import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import { Menu } from 'semantic-ui-react';
import { useIntl, FormattedMessage } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import useUser from '@plone/volto/hooks/user/useUser';

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

const translateBlockTitle = (block, intl) =>
  intl.formatMessage({
    id: block.title,
    defaultMessage: block.title,
  });
const scoreBlock = (block, slashCommand, intl) => {
  if (!slashCommand) return 0;
  const title = translateBlockTitle(block, intl).toLowerCase();
  // prefer initial title matches, then title substring matches
  if (title.indexOf(slashCommand[1]) === 0) return 2;
  if (title.indexOf(slashCommand[1]) !== -1) return 1;
};

/**
 * A SlashMenu wrapper implemented as a volto-slate PersistentHelper.
 */
const PersistentSlashMenu = ({ editor }) => {
  const props = editor.getBlockProps();
  const intl = useIntl();
  const {
    block,
    blocksConfig,
    data,
    onMutateBlock,
    properties,
    selected,
    allowedBlocks,
    detached,
    navRoot,
    contentType,
  } = props;
  const disableNewBlocks = data?.disableNewBlocks || detached;

  const user = useUser();

  const [slashMenuSelected, setSlashMenuSelected] = React.useState(0);

  const hasAllowedBlocks = !isEmpty(allowedBlocks);
  const slashCommand = data.plaintext
    ?.toLowerCase()
    .trim()
    .match(/^\/([\p{L}]*)$/u);

  const availableBlocks = React.useMemo(
    () =>
      filter(blocksConfig, (item) =>
        hasAllowedBlocks
          ? allowedBlocks.includes(item.id)
          : typeof item.restricted === 'function'
            ? !item.restricted({
                properties,
                block: item,
                navRoot,
                contentType,
                user,
              })
            : !item.restricted,
      )
        .filter((block) => Boolean(block.title && block.id))
        .filter((block) => {
          // typed text is a substring of the title or id
          const title = translateBlockTitle(block, intl).toLowerCase();
          const originalTitle = block.title.toLowerCase();
          return (
            block.id !== 'slate' &&
            slashCommand &&
            (title.includes(slashCommand[1]) ||
              originalTitle.includes(slashCommand[1]))
          );
        })
        .sort((a, b) => {
          const scoreDiff =
            scoreBlock(b, slashCommand, intl) -
            scoreBlock(a, slashCommand, intl);
          if (scoreDiff) return scoreDiff;
          // sort equally scored blocks by title
          return translateBlockTitle(a, intl).localeCompare(
            translateBlockTitle(b, intl),
          );
        }),
    [
      allowedBlocks,
      blocksConfig,
      intl,
      properties,
      slashCommand,
      hasAllowedBlocks,
      navRoot,
      contentType,
      user,
    ],
  );

  const slashMenuSize = availableBlocks.length;
  const show = selected && slashCommand && !disableNewBlocks;

  // The stored index can be out of the current list: the list shrinks and
  // grows while typing, down to no matching blocks at all. Always read it
  // within the list.
  const selectedIndex = Math.min(
    Math.max(slashMenuSelected, 0),
    Math.max(slashMenuSize - 1, 0),
  );

  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (isMounted && show && slashMenuSelected !== selectedIndex) {
      setSlashMenuSelected(selectedIndex);
    }
  }, [show, slashMenuSelected, isMounted, selectedIndex]);

  editor.showSlashMenu = show;

  editor.slashEnter = () =>
    slashMenuSize > 0 &&
    onMutateBlock(
      block,
      {
        '@type': availableBlocks[selectedIndex].id,
      },
      emptySlateBlock(),
    );

  editor.slashArrowUp = () =>
    setSlashMenuSelected(
      selectedIndex === 0 ? slashMenuSize - 1 : selectedIndex - 1,
    );

  editor.slashArrowDown = () =>
    setSlashMenuSelected(
      selectedIndex >= slashMenuSize - 1 ? 0 : selectedIndex + 1,
    );

  return show ? (
    <SlashMenu
      currentBlock={block}
      onMutateBlock={onMutateBlock}
      availableBlocks={availableBlocks}
      selected={selectedIndex}
    />
  ) : (
    ''
  );
};

export default PersistentSlashMenu;
