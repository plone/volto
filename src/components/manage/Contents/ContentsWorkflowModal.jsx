/**
 * Contents workflow modal.
 * @module components/manage/Contents/ContentsWorkflowModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { concat, filter, last, map, uniqBy } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { getWorkflow, transitionWorkflow } from '../../../actions';
import { ModalForm } from '../../../components';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  stateTitle: {
    id: 'Change State',
    defaultMessage: 'Change State',
  },
  stateDescription: {
    id: 'Select the transition to be used for modifying the items state.',
    defaultMessage:
      'Select the transition to be used for modifying the items state.',
  },
});

@injectIntl
@connect(
  state => ({
    request: state.workflow.transition,
    workflows: state.workflow.multiple,
  }),
  dispatch => bindActionCreators({ getWorkflow, transitionWorkflow }, dispatch),
)
/**
 * Component to display a workflow modal in the folder contents.
 * @class ContentsWorkflowModal
 * @extends Component
 */
export default class ContentsWorkflowModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to get workflow
     */
    getWorkflow: PropTypes.func.isRequired,
    /**
     * Action to transition workflow
     */
    transitionWorkflow: PropTypes.func.isRequired,
    /**
     * List of items
     */
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
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
     * List of workflows
     */
    workflows: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Workflow transition
         */
        transition: PropTypes.shape({
          /**
           * Id of the transition
           */
          '@id': PropTypes.string,
          /**
           * Title of the transition
           */
          title: PropTypes.string,
        }),
      }),
    ).isRequired,
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
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.getWorkflow(this.props.items);
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
   * @param {string} state New state
   */
  onSubmit({ state }) {
    if (!state) {
      return;
    }

    this.props.transitionWorkflow(
      filter(
        map(
          concat(
            ...map(this.props.workflows, workflow => workflow.transitions),
          ),
          item => item['@id'],
        ),
        x => last(x.split('/')) === state,
      ),
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
                fields: ['state'],
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
                        workflow => workflow.transitions,
                      ),
                    ),
                    x => x.title,
                  ),
                  y => [last(y['@id'].split('/')), y.title],
                ),
              },
            },
            required: [],
          }}
        />
      )
    );
  }
}
