/**
 * Personal information component.
 * @module components/manage/Preferences/PersonalInformation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Portal } from 'react-portal';
import { Link, withRouter } from 'react-router-dom';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Container, Menu } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { Form, Icon, Toast, Toolbar } from '../../../components';
import { getUser, updateUser } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

import backSVG from '../../../icons/back.svg';

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
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

/**
 * PersonalInformation class.
 * @class PersonalInformation
 * @extends Component
 */
@injectIntl
@connect(
  (state, props) => ({
    user: state.users.user,
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
    loaded: state.users.get.loaded,
    loading: state.users.update.loading,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ getUser, updateUser }, dispatch),
)
class PersonalInformation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    user: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string,
      home_page: PropTypes.string,
      location: PropTypes.string,
    }).isRequired,
    updateUser: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    pathname: PropTypes.string.isRequired,
    isToolbarEmbedded: PropTypes.bool,
    closeMenu: PropTypes.func,
  };

  defaultProps = {
    isToolbarEmbedded: false,
    closeMenu: null,
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
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getUser(this.props.userId);
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    // We don't want the user to change his login name/username or the roles
    // from this form
    // Backend will complain anyways, but we clean the data here before it does
    delete data.id;
    delete data.username;
    delete data.roles;
    this.props.updateUser(this.props.userId, data);
    toast.success(
      <Toast success title={this.props.intl.formatMessage(messages.saved)} />,
    );
    if (this.props.isToolbarEmbedded) {
      this.props.closeMenu();
    }
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    if (this.props.isToolbarEmbedded) {
      this.props.closeMenu();
    } else {
      this.props.history.goBack();
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const InnerContent = (
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
        loading={this.props.loading}
      />
    );

    if (this.props.isToolbarEmbedded && this.props.loaded) {
      return <>{InnerContent}</>;
    }

    if (!this.props.isToolbarEmbedded && this.props.loaded) {
      return (
        <Container id="page-personal-information">
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
          {InnerContent}
          <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
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
                    size="32px"
                    title={this.props.intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />
          </Portal>
        </Container>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(PersonalInformation);
