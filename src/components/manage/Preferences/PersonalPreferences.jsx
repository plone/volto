/**
 * Personal preferences component.
 * @module components/manage/Preferences/PersonalPreferences
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { updateIntl } from 'react-intl-redux';
import { map, keys } from 'lodash';
import cookie from 'react-cookie';
import request from 'superagent';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Container, Icon, Menu } from 'semantic-ui-react';

import { Form, Toolbar } from '../../../components';
import languages from '../../../constants/Languages';
import { addMessage } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  personalPreferences: {
    id: 'Personal Preferences',
    defaultMessage: 'Personal Preferences',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  language: {
    id: 'Language',
    defaultMessage: 'Language',
  },
  languageDescription: {
    id: 'Your preferred language',
    defaultMessage: 'Your preferred language',
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

@injectIntl
@connect(
  (state, props) => ({
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ updateIntl, addMessage }, dispatch),
)
/**
 * PersonalPreferences class.
 * @class PersonalPreferences
 * @extends Component
 */
export default class PersonalPreferences extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateIntl: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs PersonalPreferences
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    cookie.save('lang', data.language || '', {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });
    request('GET', `/assets/locales/${data.language || 'en'}.json`).then(
      locale => {
        this.props.updateIntl({
          locale: locale.language || 'en',
          messages: locale.body,
        });
        this.props.addMessage(
          null,
          this.props.intl.formatMessage(messages.saved),
          'success',
        );
      },
    );
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    Router.goBack();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="page-personal-preferences">
        <Helmet
          title={this.props.intl.formatMessage(messages.personalPreferences)}
        />
        <Menu attached="top" tabular stackable>
          <Link to="/personal-information" className="item">
            <FormattedMessage
              id="Personal Information"
              defaultMessage="Personal Information"
            />
          </Link>
          <Menu.Item
            name={this.props.intl.formatMessage(messages.personalPreferences)}
            active
          />
          <Link to="/change-password" className="item">
            <FormattedMessage id="Password" defaultMessage="Password" />
          </Link>
        </Menu>
        <Form
          formData={{ language: cookie.load('lang') || '' }}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: ['language'],
              },
            ],
            properties: {
              language: {
                description: this.props.intl.formatMessage(
                  messages.languageDescription,
                ),
                title: this.props.intl.formatMessage(messages.language),
                type: 'string',
                choices: map(keys(languages), lang => [lang, languages[lang]]),
              },
            },
            required: [],
          }}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />{' '}
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            inner={
              <Link to={`${getBaseUrl(this.props.pathname)}`} className="item">
                <Icon
                  name="arrow left"
                  size="big"
                  color="blue"
                  title={this.props.intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />
        </Portal>
      </Container>
    );
  }
}
