/**
 * Personal preferences component.
 * @module components/manage/Preferences/PersonalPreferences
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { updateIntl } from 'react-intl-redux';
import { map, keys } from 'lodash';
import cookie from 'react-cookie';
import request from 'superagent';

import { Form } from '../../../components';
import languages from '../../../constants/Languages';

/**
 * PersonalPreferences class.
 * @class AddComponent
 * @extends Component
 */
@connect(() => {}, dispatch => bindActionCreators({ updateIntl }, dispatch))
export default class PersonalPreferences extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateIntl: PropTypes.func.isRequired,
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
    request(
      'GET',
      `/assets/locales/${data.language || 'en'}.json`,
    ).then(locale =>
      this.props.updateIntl({
        locale: locale.language || 'en',
        messages: locale.body,
      }),
    );
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
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
      <div id="page-add">
        <Helmet title="Personal Preferences" />
        <Form
          formData={{ language: cookie.load('lang') || '' }}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['language'],
              },
            ],
            properties: {
              language: {
                description: 'Your preferred language',
                title: 'Language',
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
