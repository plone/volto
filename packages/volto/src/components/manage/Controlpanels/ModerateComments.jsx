import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getParentUrl, Helmet } from '@plone/volto/helpers';
import { createPortal } from 'react-dom';
import { Container, Button, Table } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { deleteComment, searchContent } from '@plone/volto/actions';
import { FormattedRelativeDate, Icon, Toolbar } from '@plone/volto/components';
import { CommentEditModal } from '@plone/volto/components/theme/Comments';

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
  const {
    searchContent,
    deleteComment,
    items,
    deleteRequest,
    pathname,
    history,
  } = props;

  const intl = useIntl();

  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    searchContent('', {
      portal_type: 'Discussion Item',
      fullobjects: true,
    });
    setIsClient(true);
  }, [searchContent]);

  useEffect(() => {
    if (deleteRequest.loading && props.deleteRequest.loaded) {
      searchContent('', {
        portal_type: 'Discussion Item',
        fullobjects: true,
      });
    }
  }, [deleteRequest.loading, props.deleteRequest.loaded, searchContent]);

  const onDelete = (event, { value }) => {
    deleteComment(value);
  };

  const onEdit = (event, { value }) => {
    setShowEdit(true);
    setEditId(value.id);
    setEditText(value.text);
  };

  const onEditOk = () => {
    setShowEdit(false);
    setEditId(null);
    setEditText(null);
    searchContent('', {
      portal_type: 'Discussion Item',
      fullobjects: true,
    });
  };

  const onEditCancel = () => {
    setShowEdit(false);
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
      {isClient &&
        createPortal(
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
          />,
          document.getElementById('toolbar'),
        )}
    </div>
  );
};

ModerateComments.propTypes = {
  searchContent: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      author_name: PropTypes.string,
      creation_date: PropTypes.string,
      text: PropTypes.shape({
        data: PropTypes.string,
      }),
      is_deletable: PropTypes.bool,
      is_editable: PropTypes.bool,
    }),
  ).isRequired,
  deleteRequest: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  connect(
    (state, props) => ({
      items: state.search.items,
      deleteRequest: state.comments.delete,
      pathname: props.location.pathname,
    }),
    { deleteComment, searchContent },
  ),
)(ModerateComments);
