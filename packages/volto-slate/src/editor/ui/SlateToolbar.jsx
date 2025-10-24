/**
 * This is the main toolbar, which:
 *
 * - appears only when a range selection exists
 * - can be toggled between expanded and hovering state
 *
 */

import React from 'react';
import { defineMessages } from 'react-intl';
import cx from 'classnames';

import toggleIcon from '@plone/volto/icons/more.svg';

import Toolbar from './Toolbar';
import ExpandedToolbar from './ExpandedToolbar';
import ToolbarButton from './ToolbarButton';

import config from '@plone/volto/registry';

const messages = defineMessages({
  More: {
    id: 'More',
    defaultMessage: 'More',
  },
  Less: {
    id: 'Less',
    defaultMessage: 'Less',
  },
});

const SlateToolbar = (props) => {
  const {
    selected,
    showExpandedToolbar,
    setShowExpandedToolbar,
    className,
    enableExpando = false,
    show,
  } = props;

  const slate = props.slateSettings || config.settings.slate;

  const { toolbarButtons, expandedToolbarButtons, buttons } = slate;

  function renderButton(name, index) {
    const Btn = buttons[name];
    if (!Btn) {
      // eslint-disable-next-line
      console.warn('Button not found:', name);
      return null;
    }
    // using also name because some buttons can be like "Separator"
    return <Btn key={`${name}-${index}`} />;
  }

  return (
    <>
      {!showExpandedToolbar && (
        <Toolbar
          show={show}
          toggleButton={
            enableExpando && (
              <ToolbarButton
                title={messages.More}
                onMouseDown={(event) => {
                  setShowExpandedToolbar(!showExpandedToolbar);
                  event.preventDefault();
                }}
                icon={toggleIcon}
                active={showExpandedToolbar}
              />
            )
          }
          className={className}
        >
          {toolbarButtons?.map(renderButton)}
        </Toolbar>
      )}
      <div
        className={cx('toolbar-wrapper', {
          active: showExpandedToolbar && selected,
        })}
      >
        {selected && showExpandedToolbar && (
          <ExpandedToolbar
            show={show}
            toggleButton={
              <ToolbarButton
                title={messages.Less}
                onMouseDown={(event) => {
                  setShowExpandedToolbar(!showExpandedToolbar);
                  event.preventDefault();
                }}
                icon={toggleIcon}
                active={showExpandedToolbar}
              />
            }
          >
            {expandedToolbarButtons?.map(renderButton)}
          </ExpandedToolbar>
        )}
      </div>
    </>
  );
};

export default SlateToolbar;
