/**
 * Contents rename modal.
 * @module components/manage/Contents/ContentsRenameModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { concat, merge, map } from 'lodash';

import { editContent } from '../../../actions';
import { ModalForm } from '../../../components';

/**
 * ContentsRenameModal class.
 * @class ContentsRenameModal
 * @extends Component
 */
@connect(
  state => ({
    request: state.content.edit,
  }),
  dispatch => bindActionCreators({ editContent }, dispatch),
)
export default class ContentsRenameModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    editContent: PropTypes.func.isRequired,
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
  componentWillReceiveProps(nextProps) {
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
    this.props.editContent(
      map(this.props.items, item => item.url),
      map(this.props.items, (item, index) => ({
        url: item.url,
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
      this.props.open &&
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
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
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
                title: 'Title',
                type: 'string',
                description: '',
              },
              [`${index}_id`]: {
                title: 'Short name',
                type: 'string',
                description: 'This name will be displayed in the URL.',
              },
            })),
          ),
          required: [],
        }}
      />
    );
  }
}
