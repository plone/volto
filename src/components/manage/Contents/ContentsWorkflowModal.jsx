/**
 * Contents workflow modal.
 * @module components/manage/Contents/ContentsWorkflowModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { concat, filter, last, map, uniqBy } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';

import { getWorkflow, transitionWorkflow } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  stateTitle: {
    id: 'Change State',
    defaultMessage: 'Change State',
  },
  includeChildrenTitle: {
    id: 'Change workflow state recursively',
    defaultMessage: 'Change workflow state recursively',
  },
  stateDescription: {
    id: 'Select the transition to be used for modifying the items state.',
    defaultMessage:
      'Select the transition to be used for modifying the items state.',
  },
});

/**
 * ContentsWorkflowModal class.
 * @class ContentsWorkflowModal
 * @extends Component
 */
class ContentsWorkflowModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getWorkflow: PropTypes.func.isRequired,
    transitionWorkflow: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    workflows: PropTypes.arrayOf(
      PropTypes.shape({
        transition: PropTypes.shape({
          '@id': PropTypes.string,
          title: PropTypes.string,
        }),
      }),
    ).isRequired,
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
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.getWorkflow(this.props.items);
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
   * @param {string} state New state
   * @returns {undefined}
   */
  onSubmit({ state, include_children }) {
    if (!state) {
      return;
    }

    this.props.transitionWorkflow(
      filter(
        map(
          concat(
            ...map(this.props.workflows, (workflow) => workflow.transitions),
          ),
          (item) => item['@id'],
        ),
        (x) => last(x.split('/')) === state,
      ),
      include_children,
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
      this.props.workflows.length > 0 && (
        <ModalForm
          open={this.props.open}
          onSubmit={this.onSubmit}
          onCancel={this.props.onCancel}
          title={this.props.intl.formatMessage(messages.stateTitle)}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: ['state', 'include_children'],
              },
            ],
            properties: {
              state: {
                description: this.props.intl.formatMessage(
                  messages.stateDescription,
                ),
                title: this.props.intl.formatMessage(messages.stateTitle),
                type: 'string',
                choices: map(
                  uniqBy(
                    concat(
                      ...map(
                        this.props.workflows,
                        (workflow) => workflow.transitions,
                      ),
                    ),
                    (x) => x.title,
                  ),
                  (y) => [last(y['@id'].split('/')), y.title],
                ),
              },
              include_children: {
                title: this.props.intl.formatMessage(
                  messages.includeChildrenTitle,
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
      request: state.workflow.transition,
      workflows: state.workflow.multiple,
    }),
    { getWorkflow, transitionWorkflow },
  ),
)(ContentsWorkflowModal);
