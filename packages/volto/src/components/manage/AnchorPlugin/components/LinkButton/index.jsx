import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import EditorUtils from '../../utils/EditorUtils';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import AddLinkForm from '@plone/volto/components/manage/AnchorPlugin/components/LinkButton/AddLinkForm';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import linkSVG from '@plone/volto/icons/link.svg';
import unlinkSVG from '@plone/volto/icons/unlink.svg';

// import unionClassNames from 'union-class-names';
//import EditorUtils from 'draft-js-plugins-utils';

/**
 * Add link form class.
 * @class LinkButton
 * @extends Component
 */
class LinkButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    theme: PropTypes.shape({}).isRequired,
    ownTheme: PropTypes.shape({}).isRequired,
    onRemoveLinkAtSelection: PropTypes.func.isRequired,
    onOverrideContent: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.DraftEditorUtils = props.draftJsPluginsUtils.default;
    this.EditorUtils = EditorUtils(props);
  }

  static defaultProps = {
    placeholder: '',
  };

  onMouseDown = (event) => {
    event.preventDefault();
  };

  onAddLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { ownTheme, placeholder, onOverrideContent } = this.props;
    const link = this.EditorUtils.getCurrentEntity(
      this.props.getEditorState(),
    )?.getData()?.url;

    const content = (props) => (
      <AddLinkForm
        {...props}
        placeholder={placeholder}
        theme={ownTheme}
        block="draft-js"
        data={{ url: link || '' }}
        onChangeBlock={() => {}}
        onClear={() => {
          this.props.setEditorState(
            this.DraftEditorUtils.removeLinkAtSelection(
              this.props.getEditorState(),
            ),
          );
        }}
        onChangeValue={(url) => {
          this.props.setEditorState(
            this.DraftEditorUtils.createLinkAtSelection(
              this.props.getEditorState(),
              url,
            ),
          );
        }}
      />
    );
    onOverrideContent(content);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { theme } = this.props;
    const hasLinkSelected = this.EditorUtils.hasEntity(
      this.props.getEditorState(),
      'LINK',
    );
    const className = hasLinkSelected
      ? cx(theme.button, theme.active)
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
            this.onAddLinkClick
            // hasLinkSelected
            //   ? () =>
            //       onRemoveLinkAtSelection(
            //         this.props.setEditorState,
            //         this.props.getEditorState,
            //       )
            //   : this.onAddLinkClick
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

export default injectLazyLibs(['draftJs', 'draftJsPluginsUtils'])(LinkButton);
