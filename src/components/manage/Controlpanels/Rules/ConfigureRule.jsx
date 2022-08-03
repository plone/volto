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
  Modal,
  Segment,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar, UniversalLink } from '@plone/volto/components';
import {
  getControlPanelRule,
  removeCondition,
  addCondition,
  removeAction,
} from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import upSVG from '@plone/volto/icons/up.svg';
import downSVG from '@plone/volto/icons/down.svg';
import AddConfigureModal from './AddConfigureModal';

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
  moveUp: {
    id: 'Move up',
    defaultMessage: 'Move up',
  },
  moveDown: {
    id: 'Move down',
    defaultMessage: 'Move down',
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
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Rules
   */
  constructor(props) {
    super(props);
    this.openConditionAdd = this.openConditionAdd.bind(this);
    this.openActionModal = this.openActionModal.bind(this);
    this.handleConditionAdd = this.handleConditionAdd.bind(this);

    this.state = {
      isClient: false,
      openModal: false,
      selectedCondition: '',
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
      this.props.match.params.id,
    );
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {}

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('thisrule', this.props.rule);
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
        this.props.match.params.id,
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
        this.props.match.params.id,
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
        this.props.match.params.id,
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
    const ruleId = this.props.match.params.id;
    this.props.removeCondition(
      getBaseUrl(this.props.pathname),
      ruleId,
      conditionId,
    );
  }

  /**
   * Add condition handler
   * @method openConditionAdd
   * @returns {undefined}
   */
  openConditionAdd() {
    if (this.state.selectedCondition) {
      this.setState({ openModal: true });
    }
    // this.props.AddCondition(
    //   getBaseUrl(this.props.pathname),
    //   ruleId,
    //   conditionId,
    // );
  }

  /**
   * Condition save handler
   * @method handleConditionAdd
   * @returns {undefined}
   */
  handleConditionAdd(val) {
    const ruleId = this.props.match.params.id;
    this.props.addCondition(getBaseUrl(this.props.pathname), ruleId, val);
  }

  /**
   * Add action handler
   * @method openActionModal
   * @returns {undefined}
   */
  openActionModal() {
    this.setState({ openModal: true });

    // this.props.AddAction(
    //   getBaseUrl(this.props.pathname),
    //   ruleId,
    //   actionId,
    // );
  }

  /**
   * Remove action handler
   * @method handleRemoveAction
   * @returns {undefined}
   */
  handleRemoveAction(actionId) {
    const ruleId = this.props.match.params.id;
    this.props.removeAction(getBaseUrl(this.props.pathname), ruleId, actionId);
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

    // console.log('zaitem', item);
    // console.log('sel', this.state.selectedCondition);

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
                                  <Button compact size="tiny" primary>
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
                                  <Button compact size="tiny" primary>
                                    <Icon
                                      name={upSVG}
                                      size="10px"
                                      title={this.props.intl.formatMessage(
                                        messages.moveUp,
                                      )}
                                    />
                                  </Button>
                                  <Button compact size="tiny" primary>
                                    <Icon
                                      name={downSVG}
                                      size="10px"
                                      title={this.props.intl.formatMessage(
                                        messages.moveDown,
                                      )}
                                    />
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
                          additionLabel="llaalal"
                          options={conditions_options}
                          onChange={(e, { value }) =>
                            this.setState({ selectedCondition: value })
                          }
                        />
                        <Button compact onClick={this.openConditionAdd} primary>
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
                                  <Button compact size="tiny" primary>
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
                                  <Button compact size="tiny" primary>
                                    <Icon
                                      name={upSVG}
                                      size="10px"
                                      title={this.props.intl.formatMessage(
                                        messages.moveUp,
                                      )}
                                    />
                                  </Button>
                                  <Button compact size="tiny" primary>
                                    <Icon
                                      name={downSVG}
                                      size="10px"
                                      title={this.props.intl.formatMessage(
                                        messages.moveDown,
                                      )}
                                    />
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
                          additionLabel="llaalal"
                          options={actions_options}
                        />
                        <Button
                          compact
                          onClick={() => console.log('handleadd')}
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
        {this.state.selectedCondition && (
          <AddConfigureModal
            open={this.state.openModal}
            onClose={() => this.setState({ openModal: false })}
            onOpen={() => this.setState({ openModal: true })}
            onSave={this.handleConditionAdd}
            value={this.state.selectedCondition}
            type="Condition"
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
      title: 'Example rule',
    }),
    { getControlPanelRule, removeCondition, addCondition, removeAction },
  ),
)(ConfigureRule);
