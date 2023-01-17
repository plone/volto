import React from 'react';
import { useSlate } from 'slate-react';
import { Dropdown } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { omit } from 'lodash';
import { isBlockStyleActive, isInlineStyleActive, toggleStyle } from './utils';
import config from '@plone/volto/registry';
import { ToolbarButton } from '@plone/volto-slate/editor/ui';
import paintSVG from '@plone/volto/icons/paint.svg';

const messages = defineMessages({
  inlineStyle: {
    id: 'Inline Style',
    defaultMessage: 'Inline Style',
  },
  paragraphStyle: {
    id: 'Paragraph Style',
    defaultMessage: 'Paragraph Style',
  },
  additionalStyles: {
    id: 'Additional Styles',
    defaultMessage: 'Additional Styles',
  },
});

const StyleMenuButton = ({ icon, active, ...props }) => (
  <ToolbarButton {...props} icon={icon} active={active} />
);

const MenuOpts = ({ editor, toSelect, option, ...rest }) => {
  const isActive = toSelect.includes(option);
  return (
    <Dropdown.Item
      as="span"
      active={isActive}
      className={cx({ active: isActive })}
      {...omit(option, ['isBlock'])}
      data-isblock={option.isBlock}
      onClick={(event, selItem) => {
        toggleStyle(editor, {
          cssClass: selItem.value,
          isBlock: selItem.isBlock,
        });
      }}
    />
  );
};

const StylingsButton = (props) => {
  const editor = useSlate();
  const intl = useIntl();

  // Converting the settings to a format that is required by dropdowns.
  const inlineOpts = [
    ...config.settings.slate.styleMenu.inlineStyles.map((def) => {
      return {
        value: def.cssClass,
        text: def.label,
        icon: def.icon,
        isBlock: false,
      };
    }),
  ];
  const blockOpts = [
    ...config.settings.slate.styleMenu.blockStyles.map((def) => {
      return {
        value: def.cssClass,
        text: def.label,
        icon: def.icon,
        isBlock: true,
      };
    }),
  ];

  // Calculating the initial selection.
  const toSelect = [];
  // block styles
  for (const val of blockOpts) {
    const ia = isBlockStyleActive(editor, val.value);
    if (ia) {
      toSelect.push(val);
    }
  }
  // inline styles
  for (const val of inlineOpts) {
    const ia = isInlineStyleActive(editor, val.value);
    if (ia) {
      toSelect.push(val);
    }
  }

  const menuItemProps = {
    toSelect,
    editor,
  };
  const showMenu = inlineOpts.length || blockOpts.length;
  return showMenu ? (
    <Dropdown
      id="style-menu"
      pointing="top left"
      multiple
      value={toSelect}
      disabled={config.settings.slate.styleMenu.disabled ?? false}
      additionLabel={intl.formatMessage(messages.additionalStyles)}
      trigger={
        <StyleMenuButton
          title={intl.formatMessage(messages.additionalStyles)}
          icon={paintSVG}
          active={toSelect.length > 0}
        />
      }
    >
      <Dropdown.Menu>
        {inlineOpts.length && (
          <>
            <Dropdown.Header
              content={intl.formatMessage(messages.inlineStyle)}
            />
            {inlineOpts.map((option, index) => (
              <MenuOpts {...menuItemProps} option={option} key={index} />
            ))}
          </>
        )}

        {blockOpts.length && (
          <>
            <Dropdown.Header
              content={intl.formatMessage(messages.paragraphStyle)}
            />
            {blockOpts.map((option, index) => (
              <MenuOpts {...menuItemProps} option={option} key={index} />
            ))}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  ) : (
    ''
  );
};

export default StylingsButton;
