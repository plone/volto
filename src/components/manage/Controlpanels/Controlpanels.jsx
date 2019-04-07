/**
 * Controlpanels component.
 * @module components/manage/Controlpanels/Controlpanels
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { concat, filter, last, map, uniqBy } from 'lodash';
import { Portal } from 'react-portal';
import Helmet from 'react-helmet';
import { Container, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import Icons from '../../../constants/ControlpanelIcons';
import { listControlpanels } from '../../../actions';
import { Toolbar } from '../../../components';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  sitesetup: {
    id: 'Site Setup',
    defaultMessage: 'Site Setup',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    controlpanels: state.controlpanels.controlpanels,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ listControlpanels }, dispatch),
)
/**
 * Controlpanels container class.
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
    listControlpanels: PropTypes.func.isRequired,
    controlpanels: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        group: PropTypes.string,
        title: PropTypes.string,
      }),
    ).isRequired,
    pathname: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.listControlpanels();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const controlpanels = map(
      concat(this.props.controlpanels, [
        {
          '@id': '/moderate-comments',
          group: 'Content',
          title: 'Moderate Comments',
        },
        {
          '@id': '/users',
          group: 'Users',
          title: 'Users and Groups',
        },
      ]),
      controlpanel => ({
        ...controlpanel,
        id: last(controlpanel['@id'].split('/')),
      }),
    );
    const groups = map(uniqBy(controlpanels, 'group'), 'group');
    return (
      <div className="view-wrapper">
        <Helmet title={this.props.intl.formatMessage(messages.sitesetup)} />
        <Container>
          <Segment.Group raised>
            <Segment className="primary">
              <FormattedMessage id="Site Setup" defaultMessage="Site Setup" />
            </Segment>
            {map(groups, group => [
              <Segment key={`header-${group}`} secondary>
                {group}
              </Segment>,
              <Segment key={`body-${group}`} attached>
                <Grid columns={6}>
                  <Grid.Row>
                    {map(filter(controlpanels, { group }), controlpanel => (
                      <Grid.Column key={controlpanel.id}>
                        <Link to={`/controlpanel/${controlpanel.id}`}>
                          <Header as="h3" icon textAlign="center">
                            <Icon name={Icons[controlpanel.id] || 'setting'} />
                            <Header.Content>
                              {controlpanel.title}
                            </Header.Content>
                          </Header>
                        </Link>
                      </Grid.Column>
                    ))}
                  </Grid.Row>
                </Grid>
              </Segment>,
            ])}
          </Segment.Group>
        </Container>
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
      </div>
    );
  }
}
