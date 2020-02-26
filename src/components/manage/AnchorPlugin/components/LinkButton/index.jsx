import React, { Component } from 'react';
import PropTypes from 'prop-types';
import unionClassNames from 'union-class-names';
import EditorUtils from 'draft-js-plugins-utils';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import linkSVG from '@plone/volto/icons/link.svg';
import unlinkSVG from '@plone/volto/icons/unlink.svg';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

/**
 * Add link form class.
 * @class LinkButton
 * @extends Component
 */
class LinkButton extends Component {
  static propTypes = {
    theme: PropTypes.shape({}).isRequired,
    ownTheme: PropTypes.shape({}).isRequired,
    onRemoveLinkAtSelection: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  onMouseDown = event => {
    event.preventDefault();
  };

  onSelectItem = url => {
    this.props.setEditorState(
      EditorUtils.createLinkAtSelection(this.props.getEditorState(), url),
    );
  };

  onAddLinkClick = e => {
    e.preventDefault();
    e.stopPropagation();
    const { openObjectBrowser } = this.props;
    openObjectBrowser({ mode: 'link', onSelectItem: this.onSelectItem });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { theme, onRemoveLinkAtSelection } = this.props;
    const hasLinkSelected = EditorUtils.hasEntity(
      this.props.getEditorState(),
      'LINK',
    );
    const className = hasLinkSelected
      ? unionClassNames(theme.button, theme.active)
      : theme.button;

    return (
      <div
        className={theme.buttonWrapper}
        onMouseDown={this.onMouseDown}
        role="presentation"
      >
        <button
          className={className}
          onClick={
            hasLinkSelected
              ? () =>
                  onRemoveLinkAtSelection(
                    this.props.setEditorState,
                    this.props.getEditorState,
                  )
              : this.onAddLinkClick
          }
          type="button"
        >
          {!hasLinkSelected ? (
            <Icon name={linkSVG} size="24px" />
          ) : (
            <Icon name={unlinkSVG} size="24px" />
          )}
        </button>
      </div>
    );
  }
}

export default withObjectBrowser(LinkButton);
