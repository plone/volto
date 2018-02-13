/**
 * Personal preferences component.
 * @module components/manage/Preferences/PersonalPreferences
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
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
import { Menu } from 'semantic-ui-react';

import { Form } from '../../../components';
import languages from '../../../constants/Languages';
import { addMessage } from '../../../actions';

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
});

@injectIntl
@connect(
  () => ({}),
  dispatch => bindActionCreators({ updateIntl, addMessage }, dispatch),
)
/**
 * Component to display the personal preferences view.
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
    /**
     * Action to update the i18n
     */
    updateIntl: PropTypes.func.isRequired,
    /**
     * Action to add a notification message
     */
    addMessage: PropTypes.func.isRequired,
    /**
     * i18n object
     */
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
   */
  onSubmit(data) {
    cookie.save('lang', data.language || '', {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });
    request(
      'GET',
      `/assets/locales/${data.language || 'en'}.json`,
    ).then(locale => {
      this.props.updateIntl({
        locale: locale.language || 'en',
        messages: locale.body,
      });
      this.props.addMessage(
        null,
        this.props.intl.formatMessage(messages.saved),
        'success',
      );
    });
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
    return (
      <div id="page-personal-preferences">
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
        />
      </div>
    );
  }
}
