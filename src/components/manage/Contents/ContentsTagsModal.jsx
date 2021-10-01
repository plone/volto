/**
 * Contents tags modal.
 * @module components/manage/Contents/ContentsTagsModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { map } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';

import { updateContent } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  tags: {
    id: 'Tags',
    defaultMessage: 'Tags',
  },
  tagsToRemove: {
    id: 'Tags to remove',
    defaultMessage: 'Tags to remove',
  },
  tagsToAdd: {
    id: 'Tags to add',
    defaultMessage: 'Tags to add',
  },
});

/**
 * ContentsTagsModal class.
 * @class ContentsTagsModal
 * @extends Component
 */
class ContentsTagsModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        subjects: PropTypes.arrayOf(PropTypes.string),
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
  onSubmit({ tags_to_add = [], tags_to_remove = [] }) {
    this.props.updateContent(
      map(this.props.items, (item) => item.url),
      map(this.props.items, (item) => ({
        subjects: [
          ...new Set(
            (item.subjects ?? [])
              .filter((s) => !tags_to_remove.includes(s))
              .concat(tags_to_add),
          ),
        ],
      })),
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const currentSetTags = [
      ...new Set(this.props.items.map((item) => item.subjects).flat()),
    ];

    return (
      this.props.open && (
        <ModalForm
          open={this.props.open}
          onSubmit={this.onSubmit}
          onCancel={this.props.onCancel}
          title={this.props.intl.formatMessage(messages.tags)}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: ['tags_to_remove', 'tags_to_add'],
              },
            ],
            properties: {
              tags_to_remove: {
                type: 'array',
                widget: 'array',
                title: this.props.intl.formatMessage(messages.tagsToRemove),
                choices: currentSetTags.map((tag) => [tag, tag]),
              },
              tags_to_add: {
                type: 'array',
                widget: 'token',
                title: this.props.intl.formatMessage(messages.tagsToAdd),
                items: {
                  vocabulary: { '@id': 'plone.app.vocabularies.Keywords' },
                },
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
)(ContentsTagsModal);
