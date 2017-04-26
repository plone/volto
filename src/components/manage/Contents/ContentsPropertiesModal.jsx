/**
 * Contents properties modal.
 * @module components/manage/Contents/ContentsPropertiesModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, map } from 'lodash';

import { editContent } from '../../../actions';
import { ModalForm } from '../../../components';

/**
 * ContentsPropertiesModal class.
 * @class ContentsPropertiesModal
 * @extends Component
 */
@connect(
  state => ({
    request: state.content.edit,
  }),
  dispatch => bindActionCreators({ editContent }, dispatch),
)
export default class ContentsPropertiesModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    editContent: PropTypes.func.isRequired,
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
    if (isEmpty(data)) {
      this.props.onOk();
    } else {
      this.props.editContent(
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
      this.props.open &&
      <ModalForm
        open={this.props.open}
        onSubmit={this.onSubmit}
        onCancel={this.props.onCancel}
        title="Properties"
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: 'Default',
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
              description: 'If this date is in the future, the content will not show up in listings and searches until this date.',
              title: 'Publishing Date',
              type: 'string',
              widget: 'datetime',
            },
            expires: {
              description: 'When this date is reached, the content will nolonger be visible in listings and searches.',
              title: 'Expiration Date',
              type: 'string',
              widget: 'datetime',
            },
            rights: {
              description: 'Copyright statement or other rights information on this item.',
              title: 'Rights',
              type: 'string',
              widget: 'textarea',
            },
            creators: {
              description: 'Persons responsible for creating the content of this item. Please enter a list of user names, one per line. The principal creator should come first.',
              title: 'Creators',
              type: 'array',
            },
            exclude_from_nav: {
              default: false,
              description: 'If selected, this item will not appear in the navigation tree',
              title: 'Exclude from navigation',
              type: 'boolean',
            },
          },
          required: [],
        }}
      />
    );
  }
}
