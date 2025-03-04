/**
 * Configure content rule component.
 * @module components/manage/Controlpanels/Rules/ConfigureRule
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getBaseUrl, getParentUrl, Helmet } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import {
  Button,
  Card,
  Container,
  Dropdown,
  Grid,
  Segment,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar, UniversalLink } from '@plone/volto/components';
import {
  getControlPanelRule,
  removeCondition,
  addCondition,
  editCondition,
  removeAction,
  addAction,
  editAction,
  getCondition,
  getAction,
  moveRuleCondition,
  moveRuleAction,
} from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import upSVG from '@plone/volto/icons/up.svg';
import downSVG from '@plone/volto/icons/down.svg';
import VariableModal from './components/VariableModal';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  configRule: {
    id: 'Configure content rule',
    defaultMessage: 'Configure content rule',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  deleteCondition: {
    id: 'Delete condition',
    defaultMessage: 'Condition deleted',
  },
  addCondition: {
    id: 'Add condition',
    defaultMessage: 'Condition added',
  },
  deleteAction: {
    id: 'Delete action',
    defaultMessage: 'Action deleted',
  },
  addAction: {
    id: 'Add action',
    defaultMessage: 'Action added',
  },
  editAction: {
    id: 'Action changed',
    defaultMessage: 'Action changed',
  },
  editCondition: {
    id: 'Condition changed',
    defaultMessage: 'Condition changed',
  },
  move: {
    id: 'Position changed',
    defaultMessage: 'Position changed',
  },
  moveUp: {
    id: 'Move up',
    defaultMessage: 'Move up',
  },
  moveDown: {
    id: 'Move down',
    defaultMessage: 'Move down',
  },
});

/**
 * ConfigureRule class.
 * @class ConfigureRule
 * @extends Component
 */
class ConfigureRule extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getControlPanelRule: PropTypes.func.isRequired,
    removeCondition: PropTypes.func.isRequired,
    addCondition: PropTypes.func.isRequired,
    removeAction: PropTypes.func.isRequired,
    addAction: PropTypes.func.isRequired,
    moveRuleCondition: PropTypes.func.isRequired,
    moveRuleAction: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Rules
   */
  constructor(props) {
    super(props);
    this.openConditionModal = this.openConditionModal.bind(this);
    this.openActionModal = this.openActionModal.bind(this);
    this.handleConditionAdd = this.handleConditionAdd.bind(this);
    this.handleActionAdd = this.handleActionAdd.bind(this);
    this.openEditCondition = this.openEditCondition.bind(this);
    this.openEditAction = this.openEditAction.bind(this);
    this.handleEditCondition = this.handleEditCondition.bind(this);
    this.handleEditAction = this.handleEditAction.bind(this);

    this.state = {
      isClient: false,
      openModal: false,
      selConditionToAdd: '',
      selActionToAdd: '',
      selConditionToEdit: '',
      selActionToEdit: '',
      conditionFormData: '',
      actionFormData: '',
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
    this.props.getControlPanelRule(
      getBaseUrl(this.props.pathname),
      this.props?.match?.params?.id,
    );
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selConditionToEdit &&
      prevState.selConditionToEdit !== this.state.selConditionToEdit
    ) {
      this.props.getCondition(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
        this.state.selConditionToEdit.idx,
      );
    }
    if (
      this.props?.rule?.condition &&
      this.props?.rule?.condition !== prevProps?.rule.condition
    ) {
      const conditionFormData = this.props?.rule?.condition;
      this.setState({ conditionFormData });
    }
    if (
      this.state.selActionToEdit &&
      prevState.selActionToEdit !== this.state.selActionToEdit
    ) {
      this.props.getAction(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
        this.state.selActionToEdit.idx,
      );
    }
    if (
      this.props?.rule?.action &&
      this.props?.rule?.action !== prevProps?.rule.action
    ) {
      const actionFormData = this.props?.rule?.action;
      this.setState({ actionFormData });
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.rule.move.loading && nextProps.rule.move.loaded) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.move)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
    if (
      this.props.rule.deletecondition.loading &&
      nextProps.rule.deletecondition.loaded
    ) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.deleteCondition)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
    if (
      this.props.rule.editcondition.loading &&
      nextProps.rule.editcondition.loaded
    ) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.editCondition)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
    if (
      this.props.rule.editaction.loading &&
      nextProps.rule.editaction.loaded
    ) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.editAction)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
    if (
      this.props.rule.addcondition.loading &&
      nextProps.rule.addcondition.loaded
    ) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.addCondition)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
    if (
      this.props.rule.deleteaction.loading &&
      nextProps.rule.deleteaction.loaded
    ) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.deleteAction)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
    if (this.props.rule.addaction.loading && nextProps.rule.addaction.loaded) {
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.addAction)}
        />,
      );
      this.props.getControlPanelRule(
        getBaseUrl(this.props.pathname),
        this.props?.match?.params?.id,
      );
    }
  }

  /**
   * Back/Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(getParentUrl(this.props.pathname)));
  }

  /**
   * Remove condition handler
   * @method handleRemoveCondition
   * @returns {undefined}
   */
  handleRemoveCondition(conditionId) {
    const ruleId = this.props?.match?.params?.id;
    this.props.removeCondition(
      getBaseUrl(this.props.pathname),
      ruleId,
      conditionId,
    );
  }

  /**
   * Edit condition handler
   * @method handleEditCondition
   * @returns {undefined}
   */
  handleEditCondition(val) {
    const ruleId = this.props?.match?.params?.id;
    if (this.state.selConditionToEdit) {
      this.props.editCondition(
        getBaseUrl(this.props.pathname),
        ruleId,
        val,
        this.state.selConditionToEdit.idx,
      );
    }
  }

  /**
   * Edit action handler
   * @method handleEditAction
   * @returns {undefined}
   */
  handleEditAction(val) {
    const ruleId = this.props?.match?.params?.id;
    if (this.state.selActionToEdit) {
      this.props.editAction(
        getBaseUrl(this.props.pathname),
        ruleId,
        val,
        this.state.selActionToEdit.idx,
      );
    }
  }

  /**
   * open modal edit condition handler
   * @method openEditCondition
   * @returns {undefined}
   */
  openEditCondition(cond_id) {
    this.setState({
      selConditionToEdit: cond_id,
      openModal: true,
      selActionToEdit: '',
    });
  }

  /**
   * open modal edit action handler
   * @method openEditAction
   * @returns {undefined}
   */
  openEditAction(action_id) {
    this.setState({
      selActionToEdit: action_id,
      openModal: true,
      selConditionToEdit: '',
    });
  }

  /**
   * Add condition handler
   * @method openConditionModal
   * @returns {undefined}
   */
  openConditionModal() {
    if (this.state.selConditionToAdd) {
      this.setState({ openModal: true });
    }
  }

  /**
   * Condition save handler
   * @method handleConditionAdd
   * @returns {undefined}
   */
  handleConditionAdd(val) {
    const ruleId = this.props?.match?.params?.id;
    this.props.addCondition(getBaseUrl(this.props.pathname), ruleId, val);
    this.setState({ selConditionToAdd: '' });
  }

  /**
   * Add action handler
   * @method openActionModal
   * @returns {undefined}
   */
  openActionModal() {
    this.setState({ openModal: true });
  }

  /**
   * Action save handler
   * @method handleActionAdd
   * @returns {undefined}
   */
  handleActionAdd(val) {
    const ruleId = this.props?.match?.params?.id;
    this.props.addAction(getBaseUrl(this.props.pathname), ruleId, val);
    this.setState({ selConditionToAdd: '' });
  }

  /**
   * Remove action handler
   * @method handleRemoveAction
   * @returns {undefined}
   */
  handleRemoveAction(actionId) {
    const ruleId = this.props?.match?.params?.id;
    this.props.removeAction(getBaseUrl(this.props.pathname), ruleId, actionId);
  }

  /**
   * Move action handler
   * @method handleMoveAction
   * @returns {undefined}
   */
  handleMoveAction(action, direction) {
    const ruleId = this.props?.match?.params?.id;
    this.props.moveRuleAction(
      getBaseUrl(this.props.pathname),
      {
        'form.button.Move': direction === 'up' ? '_move_up' : '_move_down',
      },
      ruleId,
      action,
    );
  }

  /**
   * Move action handler
   * @method handleMoveCondition
   * @returns {undefined}
   */
  handleMoveCondition(condition, direction) {
    const ruleId = this.props?.match?.params?.id;
    this.props.moveRuleCondition(
      getBaseUrl(this.props.pathname),
      {
        'form.button.Move': direction === 'up' ? '_move_up' : '_move_down',
      },
      ruleId,
      condition,
    );
  }
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { item = {} } = this.props.rule || {};
    const {
      actions = [],
      addable_actions = [],
      addable_conditions = [],
      assignments = [],
      conditions = [],
      title = '',
    } = item;
    const conditions_options = addable_conditions.map((cond) => {
      return { key: cond.title, text: cond.title, value: cond };
    });

    const actions_options = addable_actions.map((act) => {
      return { key: act.title, text: act.title, value: act };
    });
    return (
      <div id="page-rule-configure">
        <Helmet title={this.props.intl.formatMessage(messages.configRule)} />
        <Container>
          <article id="content">
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage
                  id="Configure Content Rule: {title}"
                  defaultMessage="Configure Content Rule: {title}"
                  values={{ title: <q>{title}</q> }}
                />
              </Segment>
              <Segment className="secondary">
                <FormattedMessage
                  id="Rules execute when a triggering event occurs. Rule actions will only be invoked if all the rule's conditions are met. You can add new actions and conditions using the buttons below."
                  defaultMessage="Rules execute when a triggering event occurs. Rule actions will only be invoked if all the rule's conditions are met. You can add new actions and conditions using the buttons below."
                />
              </Segment>
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column
                      mobile={16}
                      tablet={16}
                      computer={6}
                      largeScreen={6}
                    >
                      <h4>
                        <FormattedMessage
                          id="If all of the following conditions are met:"
                          defaultMessage="If all of the following conditions are met:"
                        />
                      </h4>

                      {conditions && conditions.length > 0 && (
                        <Card.Group>
                          {conditions.map((cond, i) => {
                            return (
                              <Card fluid key={i}>
                                <Card.Content>
                                  <Card.Header>
                                    <h4>{cond.title}</h4>
                                  </Card.Header>
                                  <Card.Description>
                                    {cond.summary}
                                  </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                  <Button
                                    onClick={() => this.openEditCondition(cond)}
                                    compact
                                    size="tiny"
                                    primary
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      this.handleRemoveCondition(cond.idx)
                                    }
                                    compact
                                    size="tiny"
                                    color="youtube"
                                  >
                                    Remove
                                  </Button>
                                  <Button
                                    compact
                                    size="tiny"
                                    primary
                                    disabled={cond?.first}
                                    onClick={() =>
                                      this.handleMoveCondition(cond.idx, 'up')
                                    }
                                  >
                                    <Button.Content>
                                      <Icon
                                        name={upSVG}
                                        size="10px"
                                        title={this.props.intl.formatMessage(
                                          messages.moveUp,
                                        )}
                                      />
                                    </Button.Content>
                                  </Button>
                                  <Button
                                    compact
                                    size="tiny"
                                    primary
                                    disabled={cond?.last}
                                    onClick={() =>
                                      this.handleMoveCondition(cond.idx, 'down')
                                    }
                                  >
                                    <Button.Content>
                                      <Icon
                                        name={downSVG}
                                        size="10px"
                                        title={this.props.intl.formatMessage(
                                          messages.moveDown,
                                        )}
                                      />
                                    </Button.Content>
                                  </Button>
                                </Card.Content>
                              </Card>
                            );
                          })}
                        </Card.Group>
                      )}
                      <Grid.Row>
                        <h4 style={{ marginTop: '15px' }}>
                          <FormattedMessage
                            id="Condition: "
                            defaultMessage="Condition: "
                          />
                        </h4>
                        <Dropdown
                          style={{ margin: '5px 0' }}
                          placeholder="Select condition"
                          fluid
                          selection
                          options={conditions_options}
                          value={this.state.selConditionToAdd}
                          onChange={(e, { value }) =>
                            this.setState({ selConditionToAdd: value })
                          }
                        />
                        <Button
                          compact
                          onClick={this.openConditionModal}
                          primary
                        >
                          <FormattedMessage id="Add" defaultMessage="Add" />
                        </Button>
                      </Grid.Row>
                    </Grid.Column>
                    <Grid.Column
                      mobile={16}
                      tablet={16}
                      computer={6}
                      largeScreen={6}
                    >
                      <h4>
                        <FormattedMessage
                          id="Perform the following actions:"
                          defaultMessage="Perform the following actions:"
                        />
                      </h4>

                      {actions && actions.length > 0 && (
                        <Card.Group>
                          {actions.map((action, i) => {
                            return (
                              <Card fluid key={i}>
                                <Card.Content>
                                  <Card.Header>
                                    <h4>{action.title}</h4>
                                  </Card.Header>
                                  <Card.Description>
                                    {action.summary}
                                  </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                  <Button
                                    onClick={() => this.openEditAction(action)}
                                    compact
                                    size="tiny"
                                    primary
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      this.handleRemoveAction(action.idx)
                                    }
                                    compact
                                    size="tiny"
                                    color="youtube"
                                  >
                                    Remove
                                  </Button>
                                  <Button
                                    compact
                                    size="tiny"
                                    primary
                                    disabled={action?.first}
                                    onClick={() =>
                                      this.handleMoveAction(action.idx, 'up')
                                    }
                                  >
                                    <Button.Content>
                                      <Icon
                                        name={upSVG}
                                        size="10px"
                                        title={this.props.intl.formatMessage(
                                          messages.moveUp,
                                        )}
                                      />
                                    </Button.Content>
                                  </Button>
                                  <Button
                                    compact
                                    size="tiny"
                                    primary
                                    disabled={action?.last}
                                    onClick={() =>
                                      this.handleMoveAction(action.idx, 'down')
                                    }
                                  >
                                    <Button.Content>
                                      <Icon
                                        name={downSVG}
                                        size="10px"
                                        title={this.props.intl.formatMessage(
                                          messages.moveDown,
                                        )}
                                      />
                                    </Button.Content>
                                  </Button>
                                </Card.Content>
                              </Card>
                            );
                          })}
                        </Card.Group>
                      )}

                      <Grid.Row>
                        <h4 style={{ marginTop: '15px' }}>
                          <FormattedMessage
                            id="Action: "
                            defaultMessage="Action: "
                          />
                        </h4>
                        <Dropdown
                          style={{ margin: '5px 0' }}
                          placeholder="Select action"
                          fluid
                          selection
                          options={actions_options}
                          onChange={(e, { value }) =>
                            this.setState({ selActionToAdd: value })
                          }
                        />
                        <Button
                          compact
                          onClick={() => this.openActionModal()}
                          primary
                        >
                          <FormattedMessage id="Add" defaultMessage="Add" />
                        </Button>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row stretched>
                    <Grid.Column>
                      <h4>
                        <FormattedMessage
                          id="Assignments"
                          defaultMessage="Assignments"
                        />
                      </h4>
                      <FormattedMessage
                        id="This rule is assigned to the following locations:"
                        defaultMessage="This rule is assigned to the following locations:"
                      />
                      {assignments.map((assignment, i) => (
                        <UniversalLink
                          key={i}
                          title={assignment.title}
                          href={getBaseUrl(assignment.url)}
                        >
                          {assignment.title}
                        </UniversalLink>
                      ))}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Segment.Group>
          </article>
        </Container>
        {this.state.selConditionToAdd && (
          <VariableModal
            open={this.state.openModal}
            onClose={() =>
              this.setState({ openModal: false, selConditionToAdd: '' })
            }
            onOpen={() => this.setState({ openModal: true })}
            onSave={(v) => this.handleConditionAdd(v)}
            value={this.state.selConditionToAdd}
            type="Condition"
            action="add"
          />
        )}
        {this.state.selActionToAdd && (
          <VariableModal
            open={this.state.openModal}
            onClose={() =>
              this.setState({ openModal: false, selActionToAdd: '' })
            }
            onOpen={() => this.setState({ openModal: true })}
            onSave={(v) => this.handleActionAdd(v)}
            value={this.state.selActionToAdd}
            type="Action"
            action="add"
          />
        )}
        {this.state.selConditionToEdit && this.state.conditionFormData && (
          <VariableModal
            open={this.state.openModal}
            onClose={() =>
              this.setState({
                openModal: false,
                selConditionToEdit: '',
                conditionFormData: '',
              })
            }
            onOpen={() => this.setState({ openModal: true })}
            onSave={(v) => this.handleEditCondition(v)}
            value={this.state.selConditionToEdit}
            formData={this.state.conditionFormData}
            type="Condition"
            action="edit"
          />
        )}
        {this.state.selActionToEdit && this.state.actionFormData && (
          <VariableModal
            open={this.state.openModal}
            onClose={() =>
              this.setState({
                openModal: false,
                selActionToEdit: '',
                actionFormData: '',
              })
            }
            onOpen={() => this.setState({ openModal: true })}
            onSave={this.handleEditAction}
            value={this.state.selActionToEdit}
            formData={this.state.actionFormData}
            type="Action"
            action="edit"
          />
        )}
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <Link className="item" to="#" onClick={() => this.onCancel()}>
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />
          </Portal>
        )}
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      pathname: props.location.pathname,
      rule: state.controlpanelrule,
    }),
    {
      getControlPanelRule,
      removeCondition,
      addCondition,
      editCondition,
      getCondition,
      getAction,
      removeAction,
      addAction,
      editAction,
      moveRuleCondition,
      moveRuleAction,
    },
  ),
)(ConfigureRule);
