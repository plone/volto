/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import cx from 'classnames';

import { ImageSidebar, SidebarPortal } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

import MediaWidget from '@plone/volto/components/manage/Widgets/MediaSelectWidget';

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;
    return (
      <div
        className={cx(
          'block image align',
          {
            center: !Boolean(data.align),
          },
          data.align,
        )}
      >
        {data.url ? (
          <img
            className={cx({
              'full-width': data.align === 'full',
              large: data.size === 'l',
              medium: data.size === 'm',
              small: data.size === 's',
            })}
            src={
              isInternalURL(data.url)
                ? // Backwards compat in the case that the block is storing the full server URL
                  (() => {
                    if (data.size === 'l')
                      return `${flattenToAppURL(data.url)}/@@images/image`;
                    if (data.size === 'm')
                      return `${flattenToAppURL(
                        data.url,
                      )}/@@images/image/preview`;
                    if (data.size === 's')
                      return `${flattenToAppURL(data.url)}/@@images/image/mini`;
                    return `${flattenToAppURL(data.url)}/@@images/image`;
                  })()
                : data.url
            }
            alt={data.alt || ''}
          />
        ) : (
          <div>
            {this.props.editable && (
              <MediaWidget
                inline
                id="url"
                title="Source"
                onChange={(id, value) => {
                  this.props.onChangeBlock(this.props.block, {
                    ...data,
                    [id]: value,
                  });
                }}
              />
            )}
          </div>
        )}
        <SidebarPortal selected={this.props.selected}>
          <ImageSidebar {...this.props} />
        </SidebarPortal>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withBlockExtensions,
  connect(
    (state, ownProps) => ({
      request: state.content.subrequests[ownProps.block] || {},
      content: state.content.subrequests[ownProps.block]?.data,
    }),
    { createContent },
  ),
)(Edit);
