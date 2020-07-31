/**
 * Contents properties modal.
 * @module components/manage/Contents/ContentsPropertiesModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isEmpty, map } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';

import { updateContent } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';

const messages = defineMessages({
  properties: {
    id: 'Properties',
    defaultMessage: 'Properties',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  effectiveTitle: {
    id: 'Publishing Date',
    defaultMessage: 'Publishing Date',
  },
  effectiveDescription: {
    id:
      'If this date is in the future, the content will not show up in listings and searches until this date.',
    defaultMessage:
      'If this date is in the future, the content will not show up in listings and searches until this date.',
  },
  expiresTitle: {
    id: 'Expiration Date',
    defaultMessage: 'Expiration Date',
  },
  expiresDescription: {
    id:
      'When this date is reached, the content will nolonger be visible in listings and searches.',
    defaultMessage:
      'When this date is reached, the content will nolonger be visible in listings and searches.',
  },
  rightsTitle: {
    id: 'Rights',
    defaultMessage: 'Rights',
  },
  rightsDescription: {
    id: 'Copyright statement or other rights information on this item.',
    defaultMessage:
      'Copyright statement or other rights information on this item.',
  },
  creatorsTitle: {
    id: 'Creators',
    defaultMessage: 'Creators',
  },
  creatorsDescription: {
    id:
      'Persons responsible for creating the content of this item. Please enter a list of user names, one per line. The principal creator should come first.',
    defaultMessage:
      'Persons responsible for creating the content of this item. Please enter a list of user names, one per line. The principal creator should come first.',
  },
  excludeFromNavTitle: {
    id: 'Exclude from navigation',
    defaultMessage: 'Exclude from navigation',
  },
  excludeFromNavDescription: {
    id: 'If selected, this item will not appear in the navigation tree',
    defaultMessage:
      'If selected, this item will not appear in the navigation tree',
  },
});

/**
 * ContentsPropertiesModal class.
 * @class ContentsPropertiesModal
 * @extends Component
 */
class ContentsPropertiesModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ContentsUploadModal
   */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      this.props.onOk();
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} data Form data
   * @returns {undefined}
   */
  onSubmit(data) {
    if (isEmpty(data)) {
      this.props.onOk();
    } else {
      this.props.updateContent(
        this.props.items,
        map(this.props.items, () => data),
      );
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      this.props.open && (
        <ModalForm
          open={this.props.open}
          onSubmit={this.onSubmit}
          onCancel={this.props.onCancel}
          title={this.props.intl.formatMessage(messages.properties)}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: [
                  'effective',
                  'expires',
                  'rights',
                  'creators',
                  'exclude_from_nav',
                ],
              },
            ],
            properties: {
              effective: {
                description: this.props.intl.formatMessage(
                  messages.effectiveDescription,
                ),
                title: this.props.intl.formatMessage(messages.effectiveTitle),
                type: 'string',
                widget: 'datetime',
              },
              expires: {
                description: this.props.intl.formatMessage(
                  messages.expiresDescription,
                ),
                title: this.props.intl.formatMessage(messages.expiresTitle),
                type: 'string',
                widget: 'datetime',
              },
              rights: {
                description: this.props.intl.formatMessage(
                  messages.rightsDescription,
                ),
                title: this.props.intl.formatMessage(messages.rightsTitle),
                type: 'string',
                widget: 'textarea',
              },
              creators: {
                description: this.props.intl.formatMessage(
                  messages.creatorsDescription,
                ),
                title: this.props.intl.formatMessage(messages.creatorsTitle),
                type: 'array',
              },
              exclude_from_nav: {
                default: false,
                description: this.props.intl.formatMessage(
                  messages.excludeFromNavDescription,
                ),
                title: this.props.intl.formatMessage(
                  messages.excludeFromNavTitle,
                ),
                type: 'boolean',
              },
            },
            required: [],
          }}
        />
      )
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      request: state.content.update,
    }),
    { updateContent },
  ),
)(ContentsPropertiesModal);
