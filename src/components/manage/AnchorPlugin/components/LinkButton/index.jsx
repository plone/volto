import React, { Component } from 'react';
import PropTypes from 'prop-types';
import unionClassNames from 'union-class-names';
import EditorUtils from 'draft-js-plugins-utils';
import AddLinkForm from './AddLinkForm';
import Icon from '../../../../../components/theme/Icon/Icon';

import linkSVG from '../../../../../icons/link.svg';
import unlinkSVG from '../../../../../icons/unlink.svg';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

/**
 * Add link form class.
 * @class LinkButton
 * @extends Component
 */
class LinkButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    store: PropTypes.shape({}).isRequired,
    theme: PropTypes.shape({}).isRequired,
    ownTheme: PropTypes.shape({}).isRequired,
    onRemoveLinkAtSelection: PropTypes.func.isRequired,
    onOverrideContent: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  static defaultProps = {
    placeholder: '',
  };

  onMouseDown = event => {
    event.preventDefault();
  };

  onAddLinkClick = e => {
    e.preventDefault();
    e.stopPropagation();
    const { ownTheme, placeholder, onOverrideContent, openObjectBrowser } = this.props;
    openObjectBrowser({ mode: 'link' });
//     const content = props => (
//       <AddLinkForm {...props} placeholder={placeholder} theme={ownTheme} />
//     );
//     onOverrideContent(content);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { theme, onRemoveLinkAtSelection } = this.props;
    const hasLinkSelected = EditorUtils.hasEntity(
      this.props.store.getEditorState(),
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
            hasLinkSelected ? onRemoveLinkAtSelection : this.onAddLinkClick
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
