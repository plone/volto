/**
 * Moderate content rules component.
 * @module components/manage/Controlpanels/Rules
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
  Form,
  Header,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar } from '@plone/volto/components';

import { getRules } from '@plone/volto/actions';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  rules: {
    id: 'Content Rules',
    defaultMessage: 'Content Rules',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

const filterChoices = [
  { label: 'Comment Added', value: 'comment-added' },
  { label: 'Comment removed', value: 'comment-removed' },
  { label: 'Comment reply added', value: 'comment-reply-added' },
  { label: 'User Created', value: 'user-created' },
  { label: 'Enabled', value: 'enabled' },
  { label: 'Disabled', value: 'disabled' },
];

/**
 * Rules class.
 * @class Rules
 * @extends Component
 */
class Rules extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getRules: PropTypes.func.isRequired,
  };

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
    this.props.getRules(getBaseUrl(this.props.pathname));

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
   * Select filter type handler
   * @method handleSelectFilterType
   * @returns {undefined}
   */
  handleSelectFilterType(type) {
    this.setState({ filterType: type });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-rules">
        <Helmet title={this.props.intl.formatMessage(messages.rules)} />
        <Container>
          <article id="content">
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage
                  id="Content Rules"
                  defaultMessage="Content Rules"
                />
              </Segment>
              <Segment className="secondary">
                <FormattedMessage
                  id="Use the form below to define, change or remove content rules. Rules will automatically perform actions on content when certain triggers take place. After defining rules, you may want to go to a folder to assign them, using the 'rules' item in the actions menu."
                  defaultMessage="Use the form below to define, change or remove content rules. Rules will automatically perform actions on content when certain triggers take place. After defining rules, you may want to go to a folder to assign them, using the 'rules' item in the actions menu."
                />
              </Segment>
              <Segment>
                <Checkbox
                  onChange={(e, { value }) => console.log(value)}
                  //checked={}
                  value={'disable-globally'}
                  label="Disable globally"
                />
              </Segment>
              <Segment className="secondary">
                <FormattedMessage
                  id="Whether or not content rules should be disabled globally. If this is selected, no rules will be executed anywhere in the portal."
                  defaultMessage="Whether or not content rules should be disabled globally. If this is selected, no rules will be executed anywhere in the portal."
                />
              </Segment>
              <Segment>
                <Header size="small">
                  <FormattedMessage
                    id="Filter Rules:"
                    defaultMessage="Filter Rules:"
                  />
                </Header>
                {filterChoices.map((o, i) => (
                  <Form.Field key={i}>
                    <Checkbox
                      onChange={(e, { value }) => console.log(value)}
                      //checked={}
                      value={o.value}
                      label={o.label}
                    />
                  </Form.Field>
                ))}
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.HeaderCell>
                        <FormattedMessage
                          id="Content Rule"
                          defaultMessage="Content Rule"
                        />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Event" defaultMessage="Event" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage id="Status" defaultMessage="Status" />
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <FormattedMessage
                          id="Actions"
                          defaultMessage="Actions"
                        />
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Button onClick={() => console.log('handleadd')} primary>
                  <FormattedMessage
                    id="Add content rule"
                    defaultMessage="Add content rule"
                  />
                </Button>
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
      rules: state.rules,
      pathname: props.location.pathname,
    }),
    {
      getRules,
    },
  ),
)(Rules);
