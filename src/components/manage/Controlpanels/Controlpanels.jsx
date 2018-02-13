/**
 * Controlpanels component.
 * @module components/manage/Controlpanels/Controlpanels
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { filter, last, map, uniqBy } from 'lodash';
import Helmet from 'react-helmet';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';
import Icons from '../../../constants/ControlpanelIcons';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { getControlpanels } from '../../../actions';

const messages = defineMessages({
  sitesetup: {
    id: 'Site Setup',
    defaultMessage: 'Site Setup',
  },
});

@injectIntl
@connect(
  state => ({
    controlpanels: state.controlpanels.controlpanels,
  }),
  dispatch => bindActionCreators({ getControlpanels }, dispatch),
)
/**
 * Component to dispay an overview of the controlpanels.
 * @class Controlpanels
 * @extends Component
 */
export default class Controlpanels extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to get controlpanels
     */
    getControlpanels: PropTypes.func.isRequired,
    /**
     * List of the controlpanels
     */
    controlpanels: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Id of the controlpanel
         */
        '@id': PropTypes.string,
        /**
         * Group of the controlpanel
         */
        group: PropTypes.string,
        /**
         * Title of the controlpanel
         */
        title: PropTypes.string,
      }),
    ).isRequired,
    /**
     * i18n object
     */
    intl: intlShape.isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getControlpanels();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const groups = map(uniqBy(this.props.controlpanels, 'group'), 'group');
    const controlpanels = map(this.props.controlpanels, controlpanel => ({
      ...controlpanel,
      id: last(controlpanel['@id'].split('/')),
    }));
    return (
      <div id="page-home">
        <Helmet title={this.props.intl.formatMessage(messages.sitesetup)} />
        <h1>
          <FormattedMessage id="Site Setup" defaultMessage="Site Setup" />
        </h1>
        <p className="description">
          <FormattedMessage
            id="Configuration area for Plone and add-on Products."
            defaultMessage="Configuration area for Plone and add-on Products."
          />
        </p>
        {map(groups, group => (
          <div key={group}>
            <Header as="h2" attached="top">
              {group}
            </Header>
            <Segment attached>
              <Grid columns={6}>
                <Grid.Row>
                  {map(filter(controlpanels, { group }), controlpanel => (
                    <Grid.Column key={controlpanel.id}>
                      <Link to={`/controlpanel/${controlpanel.id}`}>
                        <Header as="h3" icon textAlign="center">
                          <Icon name={Icons[controlpanel.id] || 'setting'} />
                          <Header.Content>{controlpanel.title}</Header.Content>
                        </Header>
                      </Link>
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </Segment>
          </div>
        ))}
      </div>
    );
  }
}
