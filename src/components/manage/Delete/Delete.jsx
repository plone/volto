/**
 * Delete container.
 * @module components/manage/Delete/Delete
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import qs from 'query-string';
import {
  deleteContent,
  getContent,
  getLinkintegrity,
} from '@plone/volto/actions';
import { Toolbar } from '@plone/volto/components';

const messages = defineMessages({
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  ok: {
    id: 'Ok',
    defaultMessage: 'Ok',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

/**
 * Delete container class.
 * @class Delete
 * @extends Component
 */
class Delete extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    deleteContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    getLinkintegrity: PropTypes.func.isRequired,
    deleteRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string,
    }),
    returnUrl: PropTypes.string,
    affectedLinks: PropTypes.array,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    content: null,
    returnUrl: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { isClient: false };
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) {
      this.props.history.push(
        this.props.returnUrl ||
          this.props.pathname.replace('/delete', '').replace(/\/[^/]*$/, ''),
      );
    }
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getContent(this.props.pathname.split('/delete')[0]);
    this.props.getLinkintegrity([this.props.content.UID]);
    this.setState({ isClient: true });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @returns {undefined}
   */
  onSubmit() {
    this.props.deleteContent(this.props.pathname.replace('/delete', ''));
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(this.props.pathname.replace('/delete', ''));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.content) {
      return (
        <div id="page-delete">
          <Helmet title={this.props.intl.formatMessage(messages.delete)} />
          <Container>
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage
                  id="Do you really want to delete this item?"
                  defaultMessage="Do you really want to delete this item?"
                />
              </Segment>
              <Segment attached>
                <List bulleted>
                  <List.Item>{this.props.content.title}</List.Item>
                </List>
              </Segment>
              {this.props.affectedLinks?.length > 0 && (
                <>
                  <Segment attached>
                    <FormattedMessage
                      id="By deleting this item, you will break links that exist in the items listed below. If this is indeed what you want to do, we recommend that you remove these references first."
                      defaultMessage="By deleting this item, you will break links that exist in the items listed below. If this is indeed what you want to do, we recommend that you remove these references first."
                    />
                  </Segment>
                  <Segment attached>
                    <FormattedMessage
                      id="This Page is referenced by the following items:"
                      defaultMessage="This Page is referenced by the following items:"
                    />
                    <List bulleted>
                      {this.props.affectedLinks[0].breaches.map((item) => {
                        return (
                          <List.Item>
                            <a href={item['@id']}>
                              {item['title']}
                              <a
                                href={item['@id'] + '/edit'}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {' '}
                                - [edit in new window]
                              </a>
                            </a>
                          </List.Item>
                        );
                      })}
                    </List>
                  </Segment>
                </>
              )}
              <Segment className="actions" clearing>
                <Button
                  basic
                  circular
                  primary
                  floated="right"
                  icon="arrow right"
                  aria-label={this.props.intl.formatMessage(messages.ok)}
                  title={this.props.intl.formatMessage(messages.ok)}
                  size="big"
                  onClick={this.onSubmit}
                />
                <Button
                  basic
                  circular
                  secondary
                  icon="remove"
                  aria-label={this.props.intl.formatMessage(messages.cancel)}
                  title={this.props.intl.formatMessage(messages.cancel)}
                  floated="right"
                  size="big"
                  onClick={this.onCancel}
                />
              </Segment>
            </Segment.Group>
          </Container>
          {this.state.isClient && (
            <Portal node={document.getElementById('toolbar')}>
              <Toolbar
                pathname={this.props.pathname}
                hideDefaultViewButtons
                inner={<span />}
              />
            </Portal>
          )}
        </div>
      );
    }
    return <div />;
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      content: state.content.data,
      deleteRequest: state.content.delete,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
      affectedLinks: state.linkintegrity.result,
    }),
    { deleteContent, getContent, getLinkintegrity },
  ),
)(Delete);
