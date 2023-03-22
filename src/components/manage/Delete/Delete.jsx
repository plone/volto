
/**
 * Delete container.
 * @module components/manage/Delete/Delete
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import qs from 'query-string';
import { deleteContent, getContent } from '@plone/volto/actions';
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
 * Delete container fuction.
 * @function Delete
 * 
 */
const Delete = ({
  deleteContent,
  getContent,
  deleteRequest,
  pathname,
  content,
  returnUrl,
  history,
  location,
}) => {
  const [isClient, setIsClient] = useState(false);
  const intl = useIntl();

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  useEffect(() => {
    getContent(pathname.split('/delete')[0]);
    setIsClient(true);
  }, [getContent, pathname]);

  /**
   * Component will receive props
   * @method useEffect
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  useEffect(() => {
    if (deleteRequest.loading && !deleteRequest.loaded) {
      history.push(
        returnUrl ||
          pathname.replace('/delete', '').replace(/\/[^/]*$/, ''),
      );
    }
  }, [deleteRequest.loading, deleteRequest.loaded, history, pathname, returnUrl]);

  /**
   * Submit handler
   * @method onSubmit
   * @returns {undefined}
   */
  const onSubmit = () => {
    deleteContent(pathname.replace('/delete', ''));
  };

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  const onCancel = () => {
    history.push(pathname.replace('/delete', ''));
  };

  /**
   * deprcate Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  if (content) {
    return (
      <div id="page-delete">
        <Helmet title={intl.formatMessage(messages.delete)} />
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
                <List.Item>{content.title}</List.Item>
              </List>
            </Segment>
            <Segment className="actions" clearing>
              <Button
                basic
                circular
                primary
                floated="right"
                icon="arrow right"
                aria-label={intl.formatMessage(messages.ok)}
                title={intl.formatMessage(messages.ok)}
                size="big"
                onClick={onSubmit}
              />
              <Button
                basic
                circular
                secondary
                icon="remove"
                aria-label={intl.formatMessage(messages.cancel)}
                title={intl.formatMessage(messages.cancel)}
                floated="right"
                size="big"
                onClick={onCancel}
              />
            </Segment>
          </Segment.Group>
        </Container>
        {isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={pathname}
              hideDefaultViewButtons
              inner={<span />}
            />
          </Portal>
        )}
      </div>
    );
  }
  return <div />;
};


/**
   * Property types.
   * @property {Object} propTypes Property types.
 */
Delete.propTypes = {
  deleteContent: PropTypes.func.isRequired,
  getContent: PropTypes.func.isRequired,
  deleteRequest: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string,
  }),
  returnUrl: PropTypes.string,
};
/**
     * Default properties
     * @property {Object} defaultProps Default properties.
 */
Delete.defaultProps = {
  content: null,
  returnUrl: null,
};

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      content: state.content.data,
      deleteRequest: state.content.delete,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
    }),
    { deleteContent, getContent },
  ),
)(Delete);
