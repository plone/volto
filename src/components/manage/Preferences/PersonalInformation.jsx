/**
 * Personal information component.
 * @module components/manage/Preferences/PersonalInformation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Menu } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';

import { Form } from '../../../components';
import { getUser, editUser, addMessage } from '../../../actions';

const messages = defineMessages({
  personalInformation: {
    id: 'Personal Information',
    defaultMessage: 'Personal Information',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  fullnameTitle: {
    id: 'Full Name',
    defaultMessage: 'Full Name',
  },
  fullnameDescription: {
    id: 'Enter full name, e.g. John Smith.',
    defaultMessage: 'Enter full name, e.g. John Smith.',
  },
  emailTitle: {
    id: 'E-mail',
    defaultMessage: 'E-mail',
  },
  emailDescription: {
    id: 'We will use this address if you need to recover your password',
    defaultMessage:
      'We will use this address if you need to recover your password',
  },
  homePageTitle: {
    id: 'Home page',
    defaultMessage: 'Home page',
  },
  homePageDescription: {
    id: 'The URL for your external home page, if you have one.',
    defaultMessage: 'The URL for your external home page, if you have one.',
  },
  locationTitle: {
    id: 'Location',
    defaultMessage: 'Location',
  },
  locationDescription: {
    id:
      'Your location - either city and country - or in a company setting, where your office is located.',
    defaultMessage:
      'Your location - either city and country - or in a company setting, where your office is located.',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Changes saved',
  },
});

@injectIntl
@connect(
  state => ({
    user: state.users.user,
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
    loaded: state.users.get.loaded,
  }),
  dispatch => bindActionCreators({ addMessage, getUser, editUser }, dispatch),
)
/**
 * Component to display the personal information view.
 * @class PersonalInformation
 * @extends Component
 */
export default class PersonalInformation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * User data
     */
    user: PropTypes.shape({
      /**
       * Fullname of the user
       */
      fullname: PropTypes.string,
      /**
       * Email address of the user
       */
      email: PropTypes.string,
      /**
       * Homepage of the user
       */
      home_page: PropTypes.string,
      /**
       * Location of the user
       */
      location: PropTypes.string,
    }).isRequired,
    /**
     * Action to edit the user
     */
    editUser: PropTypes.func.isRequired,
    /**
     * Action to get the user
     */
    getUser: PropTypes.func.isRequired,
    /**
     * Action to add a notification message
     */
    addMessage: PropTypes.func.isRequired,
    /**
     * User id
     */
    userId: PropTypes.string.isRequired,
    /**
     * i18n object
     */
    intl: intlShape.isRequired,
    /**
     * Loaded status
     */
    loaded: PropTypes.bool.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ChangePassword
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.getUser(this.props.userId);
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   */
  onSubmit(data) {
    this.props.editUser(this.props.userId, data);
    this.props.addMessage(
      null,
      this.props.intl.formatMessage(messages.saved),
      'success',
    );
  }

  /**
   * Cancel handler
   * @method onCancel
   */
  onCancel() {
    browserHistory.goBack();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.props.loaded ? (
      <div id="page-personal-information">
        <Helmet
          title={this.props.intl.formatMessage(messages.personalInformation)}
        />
        <Menu attached="top" tabular stackable>
          <Menu.Item
            name={this.props.intl.formatMessage(messages.personalInformation)}
            active
          />
          <Link to="/personal-preferences" className="item">
            <FormattedMessage
              id="Personal Preferences"
              defaultMessage="Personal Preferences"
            />
          </Link>
          <Link to="/change-password" className="item">
            <FormattedMessage
              id="Change Password"
              defaultMessage="Change Password"
            />
          </Link>
        </Menu>
        <Form
          formData={this.props.user}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: ['fullname', 'email', 'home_page', 'location'],
              },
            ],
            properties: {
              fullname: {
                description: this.props.intl.formatMessage(
                  messages.fullnameDescription,
                ),
                title: this.props.intl.formatMessage(messages.fullnameTitle),
                type: 'string',
              },
              email: {
                description: this.props.intl.formatMessage(
                  messages.emailDescription,
                ),
                title: this.props.intl.formatMessage(messages.emailTitle),
                type: 'string',
              },
              home_page: {
                description: this.props.intl.formatMessage(
                  messages.homePageDescription,
                ),
                title: this.props.intl.formatMessage(messages.homePageTitle),
                type: 'string',
              },
              location: {
                description: this.props.intl.formatMessage(
                  messages.locationDescription,
                ),
                title: this.props.intl.formatMessage(messages.locationTitle),
                type: 'string',
              },
            },
            required: ['email'],
          }}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </div>
    ) : (
      <div />
    );
  }
}
