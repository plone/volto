/**
 * Contents rename modal.
 * @module components/manage/Contents/ContentsRenameModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { concat, merge, map } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { editContent } from '../../../actions';
import { ModalForm } from '../../../components';

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

@injectIntl
@connect(
  state => ({
    request: state.content.edit,
  }),
  dispatch => bindActionCreators({ editContent }, dispatch),
)
/**
 * Component to render the rename modal in the folder contents.
 * @class ContentsRenameModal
 * @extends Component
 */
export default class ContentsRenameModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to edit content
     */
    editContent: PropTypes.func.isRequired,
    /**
     * List of items
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Id of the item
         */
        id: PropTypes.string,
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
      }),
    ).isRequired,
    /**
     * Request status
     */
    request: PropTypes.shape({
      /**
       * Loading status
       */
      loading: PropTypes.bool,
      /**
       * Loaded status
       */
      loaded: PropTypes.bool,
    }).isRequired,
    /**
     * True when modal is open
     */
    open: PropTypes.bool.isRequired,
    /**
     * Handler when ok button is pressed
     */
    onOk: PropTypes.func.isRequired,
    /**
     * Handler when cancel button is pressed
     */
    onCancel: PropTypes.func.isRequired,
    /**
     * i18n object
     */
    intl: intlShape.isRequired,
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
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      this.props.onOk();
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} data Form data
   */
  onSubmit(data) {
    this.props.editContent(
      map(this.props.items, item => item.url),
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
