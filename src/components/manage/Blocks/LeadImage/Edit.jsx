/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { Message } from 'semantic-ui-react';

import { LeadImageSidebar, SidebarPortal } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { FormStateContext } from '@plone/volto/components/manage/Form/FormContext';

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
    id: "Upload a lead image in the 'Lead Image' content field.",
    defaultMessage: "Upload a lead image in the 'Lead Image' content field.",
  },
});

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
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
  };
  static contextType = FormStateContext;

  /**
   * Align block handler
   * @method onAlignBlock
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignBlock(align) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      align,
    });
  }

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const properties = this.context?.contextData?.formData || {};
    const { data } = this.props;
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.ImageBlockInputPlaceholder);

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
        {!properties.image && (
          <Message>
            <center>
              <img src={imageBlockSVG} alt="" />
              <div className="message-text">{placeholder}</div>
            </center>
          </Message>
        )}
        {properties.image && (
          <img
            className={cx({ 'full-width': data.align === 'full' })}
            src={
              properties.image.data
                ? `data:${properties.image['content-type']};base64,${properties.image.data}`
                : flattenToAppURL(properties.image.download)
            }
            alt={data.image_caption || ''}
          />
        )}
        <SidebarPortal selected={this.props.selected}>
          <LeadImageSidebar {...{ ...this.props, properties }} />
        </SidebarPortal>
      </div>
    );
  }
}

export default compose(injectIntl)(Edit);
