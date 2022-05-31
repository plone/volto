/**
 * Rules container.
 * @module components/manage/Rules/Rules
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Input,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { getRules } from '@plone/volto/actions';

import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import { getBaseUrl } from '@plone/volto/helpers';

//toast notifications
// import { toast } from 'react-toastify';
// import { Toast } from '@plone/volto/components';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  rules: {
    id: 'Rules',
    defaultMessage: 'Rules',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

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
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
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

  componentDidUpdate(prevProps, prevState) {}

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {}

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="rules">
        <Helmet title={this.props.intl.formatMessage(messages.rules)} />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Content rules for {title}"
              defaultMessage="Content rules for {title}"
              values={{ title: <q>{this.props.title}</q> }}
            />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="The following content rules are active in this Page. Use the content rules control panel to create new rules or delete or modify existing ones."
              defaultMessage="The following content rules are active in this Page. Use the content rules control panel to create new rules or delete or modify existing ones."
            />
          </Segment>
        </Segment.Group>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>
                <FormattedMessage id="Select" defaultMessage="Select" />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="Active content rules in this Page"
                  defaultMessage="Active content rules in this Page"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="Applies to subfolders?"
                  defaultMessage="Applies to subfolders?"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="Enabled here?"
                  defaultMessage="Enabled here?"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id="Enabled?" defaultMessage="Enabled?" />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Body>
        </Table>
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <Link
                  to={`${getBaseUrl(this.props.pathname)}`}
                  className="item"
                >
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
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      acquired_rules: state.rules?.acquired_rules,
      assigned_rules: state.rules?.assigned_rules,
      pathname: props.location.pathname,
      title: state.content.data?.title || '',
    }),
    { getRules },
  ),
)(Rules);
