/**
 * Contents rename modal.
 * @module components/manage/Contents/ContentsRenameModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { concat, merge, map } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';

import { updateContent } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';

const messages = defineMessages({
  renameItems: {
    id: 'Rename items',
    defaultMessage: 'Rename items',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  shortName: {
    id: 'Short name',
    defaultMessage: 'Short name',
  },
  shortNameDescription: {
    id: 'This name will be displayed in the URL.',
    defaultMessage: 'This name will be displayed in the URL.',
  },
});

/**
 * ContentsRenameModal class.
 * @class ContentsRenameModal
 * @extends Component
 */
class ContentsRenameModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
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
    this.props.updateContent(
      map(this.props.items, (item) => item.url),
      map(this.props.items, (item, index) => ({
        id: data[`${index}_id`],
        title: data[`${index}_title`],
      })),
    );
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
          formData={merge(
            ...map(this.props.items, (item, index) => ({
              [`${index}_title`]: item.title,
              [`${index}_id`]: item.id,
            })),
          )}
          title={this.props.intl.formatMessage(messages.renameItems)}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: concat(
                  ...map(this.props.items, (item, index) => [
                    `${index}_title`,
                    `${index}_id`,
                  ]),
                ),
              },
            ],
            properties: merge(
              ...map(this.props.items, (item, index) => ({
                [`${index}_title`]: {
                  title: this.props.intl.formatMessage(messages.title),
                  type: 'string',
                  description: '',
                },
                [`${index}_id`]: {
                  title: this.props.intl.formatMessage(messages.shortName),
                  type: 'string',
                  description: this.props.intl.formatMessage(
                    messages.shortNameDescription,
                  ),
                },
              })),
            ),
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
)(ContentsRenameModal);
