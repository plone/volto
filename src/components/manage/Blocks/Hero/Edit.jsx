/**
 * Edit Hero block.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { isEqual } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';

import { SidebarPortal, Hero } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';

import Data from './Data';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  browse: {
    id: 'Browse',
    defaultMessage: 'Browse',
  },
  uploading: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
  },
});

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class EditComponent extends Component {
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
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    editable: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    editable: true,
  };

  /**
   * @param {*} nextProps
   * @param {*} nextState
   * @returns {boolean}
   * @memberof Edit
   */
  shouldComponentUpdate(nextProps) {
    return this.props.selected || !isEqual(this.props.data, nextProps.data);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.placeholder);

    return (
      <div
        className={cx(
          'block hero align',
          {
            selected: this.props.selected,
          },
          {
            center: !Boolean(this.props.data.align),
          },
          this.props.data.align,
        )}
      >
        <Hero {...this.props} placeholder={placeholder} isEditMode />
        <SidebarPortal selected={this.props.selected}>
          <Data {...this.props} />
        </SidebarPortal>
      </div>
    );
  }
}

export default compose(injectIntl, withBlockExtensions)(EditComponent);
