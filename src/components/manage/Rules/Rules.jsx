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
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

//actions should be like this
//import { removeRules, addRules, getRules } from '@plone/volto/actions';

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
    this.setState({ isClient: true });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('state', this.props.state.content.data);
  }

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
      state,
      pathname: props.location.pathname,
      title: state.content.data?.title || '',
    }),
    {},
  ),
)(Rules);
