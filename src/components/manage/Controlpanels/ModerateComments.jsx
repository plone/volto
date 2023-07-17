import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getParentUrl, Helmet, usePrevious } from '@plone/volto/helpers';
import { useClient } from '@plone/volto/hooks';
import { Portal } from 'react-portal';
import { Container, Button, Table } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { deleteComment, searchContent } from '@plone/volto/actions';
import {
  CommentEditModal,
  FormattedRelativeDate,
  Icon,
  Toolbar,
} from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  ModerateComments: {
    id: 'Moderate comments',
    defaultMessage: 'Moderate comments',
  },
});

const ModerateComments = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showEdit, setshowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState(null);
  const isClient = useClient();
  const items = useSelector((state) => state.search.items, shallowEqual);
  const deleteRequest = useSelector((state) => state.comments.delete);
  const pathname  = props.location.pathname;
  const history = useHistory();
  const prevdeleteRequestloading = usePrevious(deleteRequest.loading);
  useEffect(() => {
    dispatch(
      searchContent('', {
        portal_type: 'Discussion Item',
        fullobjects: true,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (prevdeleteRequestloading && deleteRequest.loaded) {
      dispatch(
        searchContent('', {
          portal_type: 'Discussion Item',
          fullobjects: true,
        }),
      );
    }
  }, [prevdeleteRequestloading, deleteRequest.loaded, dispatch]);

  const onDelete = (event, { value }) => {
    dispatch(deleteComment(value));
  };

  const onEdit = (event, { value }) => {
    setshowEdit(true);
    setEditId(value.id);
    setEditText(value.text);
  };

  const onEditOk = () => {
    setshowEdit(false);
    setEditId(null);
    setEditText(null);

    dispatch(
      searchContent('', {
        portal_type: 'Discussion Item',
        fullobjects: true,
      }),
    );
  };

  const onEditCancel = () => {
    setshowEdit(false);
    setEditId(null);
    setEditText(null);
  };

  const onCancel = () => {
    history.push(getParentUrl(pathname));
  };

  return (
    <div id="page-moderate-comments">
      <CommentEditModal
        open={showEdit}
        onCancel={onEditCancel}
        onOk={onEditOk}
        id={editId}
        text={editText}
      />
      <Helmet title={intl.formatMessage(messages.ModerateComments)} />
      <Container>
        <article id="content">
          <header>
            <h1 className="documentFirstHeading">
              <FormattedMessage
                id="Moderate comments"
                defaultMessage="Moderate comments"
              />
            </h1>
          </header>
          <section id="content-core">
            <Table compact singleLine striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Commenter"
                      defaultMessage="Commenter"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage id="Date" defaultMessage="Date" />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage id="Comment" defaultMessage="Comment" />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage id="Action" defaultMessage="Action" />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map((item) => (
                  <Table.Row key={item['@id']}>
                    <Table.Cell>{item.author_name}</Table.Cell>
                    <Table.Cell>
                      <FormattedRelativeDate date={item.creation_date} />
                    </Table.Cell>
                    <Table.Cell>{item.text.data}</Table.Cell>
                    <Table.Cell>
                      {item.is_editable && (
                        <Button
                          onClick={onEdit}
                          value={{ id: item['@id'], text: item.text.data }}
                          primary
                        >
                          <FormattedMessage id="Edit" defaultMessage="Edit" />
                        </Button>
                      )}
                      {item.is_deletable && (
                        <Button
                          onClick={onDelete}
                          value={item['@id']}
                          color="red"
                        >
                          <FormattedMessage
                            id="Delete"
                            defaultMessage="Delete"
                          />
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </section>
        </article>
      </Container>
      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link className="item" to="#" onClick={() => onCancel()}>
                <Icon
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />
        </Portal>
      )}
    </div>
  );
};

export default ModerateComments;
