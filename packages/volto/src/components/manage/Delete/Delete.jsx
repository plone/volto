import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import qs from 'query-string';

import { Toolbar } from '@plone/volto/components';
import { Helmet, usePrevious } from '@plone/volto/helpers';
import { deleteContent, getContent } from '@plone/volto/actions';

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

const Delete = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isClient, setisClient] = useState(false);
  const { pathname, search } = useLocation();
  const history = useHistory();
  const deleteRequest = useSelector((state) => state.content?.delete);
  const content = useSelector((state) => state.content?.data, shallowEqual);

  const prevdeleteRequestLoading = usePrevious(deleteRequest.loading);
  const returnUrl = qs.parse(search).return_url;

  useEffect(() => {
    setisClient(true);
  }, []);

  useEffect(() => {
    dispatch(getContent(pathname.split('/delete')[0]));
  }, [dispatch, pathname]);

  useEffect(() => {
    if (prevdeleteRequestLoading && deleteRequest.loaded) {
      history.push(
        returnUrl || pathname.replace('/delete', '').replace(/\/[^/]*$/, ''),
      );
    }
  }, [
    history,
    pathname,
    returnUrl,
    prevdeleteRequestLoading,
    deleteRequest.loaded,
  ]);

  const onSubmit = () => {
    dispatch(deleteContent(pathname.replace('/delete', '')));
  };

  const onCancel = () => {
    history.push(pathname.replace('/delete', ''));
  };

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

export default Delete;
