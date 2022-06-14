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
  Checkbox,
  Container,
  Dropdown,
  Form,
  Grid,
  Header,
  Input,
  Label,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import {
  Icon,
  Toolbar,
  FormFieldWrapper,
  Field,
} from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  configRule: {
    id: 'Configure Content Rule',
    defaultMessage: 'Configure Content Rule',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

const conditionOptions = [
  {
    key: 'Content Type',
    text: 'Content Type',
    value: 'Content Type',
  },
  {
    key: 'File Extension',
    text: 'File Extension',
    value: 'File Extension',
  },
  {
    key: 'Workflow state',
    text: 'Workflow state',
    value: 'Workflow state',
  },
];

const actionOptions = [
  {
    key: 'Logger',
    text: 'Logger',
    value: 'Logger',
  },
  {
    key: 'Notify user',
    text: 'Notify user',
    value: 'Notify user',
  },
  {
    key: 'Copy to folder',
    text: 'Copy to folder',
    value: 'Copy to folder',
  },
];

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
  static propTypes = {};

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Rules
   */
  constructor(props) {
    super(props);
    this.state = {
      isClient: false,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
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
  UNSAFE_componentWillReceiveProps(nextProps) {}

  /**
   * Back/Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(this.props.pathname));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
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
                  values={{ title: <q>{this.props.title}</q> }}
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
                  <Grid.Row stretched>
                    <Grid.Column
                      style={{ margin: '5px 0' }}
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
                      <div style={{ display: 'flex', alignContent: 'center' }}>
                        <Label size="medium">
                          <p>
                            <FormattedMessage
                              id="Condition: "
                              defaultMessage="Condition: "
                            />
                          </p>
                        </Label>
                        <Dropdown
                          style={{ margin: '0 5px' }}
                          placeholder="Select condition"
                          fluid
                          selection
                          additionLabel="llaalal"
                          options={conditionOptions}
                        />
                        <Button
                          compact
                          onClick={() => console.log('handleadd')}
                          primary
                        >
                          <FormattedMessage id="Add" defaultMessage="Add" />
                        </Button>
                      </div>
                    </Grid.Column>
                    <Grid.Column
                      style={{ margin: '5px 0' }}
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
                      <div style={{ display: 'flex', alignContent: 'center' }}>
                        <Label size="medium">
                          <p>
                            <FormattedMessage
                              id="Action: "
                              defaultMessage="Action: "
                            />
                          </p>
                        </Label>
                        <Dropdown
                          style={{ margin: '0 5px' }}
                          placeholder="Select action"
                          fluid
                          selection
                          additionLabel="llaalal"
                          options={actionOptions}
                        />
                        <Button
                          compact
                          onClick={() => console.log('handleadd')}
                          primary
                        >
                          <FormattedMessage id="Add" defaultMessage="Add" />
                        </Button>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row stretched>
                    <Grid.Column width={6} largeScreen={6}>
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
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Segment.Group>
          </article>
        </Container>
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
      title: 'Example rule',
    }),
    {},
  ),
)(ConfigureRule);
