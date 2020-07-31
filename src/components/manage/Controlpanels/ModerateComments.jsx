/**
 * Moderate comments component.
 * @module components/manage/Controlpanels/ModerateComments
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Helmet } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import { Container, Button, Table } from 'semantic-ui-react';
import moment from 'moment';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { deleteComment, searchContent } from '@plone/volto/actions';
import { CommentEditModal, Icon, Toolbar } from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';

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

/**
 * ModerateCommentsComponent class.
 * @class ModerateComments
 * @extends Component
 */
class ModerateComments extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Comments
   */
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.state = {
      showEdit: false,
      editId: null,
      editText: null,
      isClient: false,
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.searchContent('', {
      portal_type: 'Discussion Item',
      fullobjects: true,
    });
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) {
      this.props.searchContent('', {
        portal_type: 'Discussion Item',
        fullobjects: true,
      });
    }
  }

  /**
   * Delete handler
   * @method onDelete
   * @param {Object} event Event object.
   * @param {string} value Delete value.
   * @returns {undefined}
   */
  onDelete(event, { value }) {
    this.props.deleteComment(value);
  }

  /**
   * Edit handler
   * @method onEdit
   * @param {Object} event Event object.
   * @param {string} value Delete value.
   * @returns {undefined}
   */
  onEdit(event, { value }) {
    this.setState({
      showEdit: true,
      editId: value.id,
      editText: value.text,
    });
  }

  /**
   * On edit ok
   * @method onEditOk
   * @returns {undefined}
   */
  onEditOk() {
    this.setState({
      showEdit: false,
      editId: null,
      editText: null,
    });
    this.props.searchContent('', {
      portal_type: 'Discussion Item',
      fullobjects: true,
    });
  }

  /**
   * On edit cancel
   * @method onEditCancel
   * @returns {undefined}
   */
  onEditCancel() {
    this.setState({
      showEdit: false,
      editId: null,
      editText: null,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-moderate-comments">
        <CommentEditModal
          open={this.state.showEdit}
          onCancel={this.onEditCancel}
          onOk={this.onEditOk}
          id={this.state.editId}
          text={this.state.editText}
        />
        <Helmet
          title={this.props.intl.formatMessage(messages.ModerateComments)}
        />
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
                  {this.props.items.map((item) => (
                    <Table.Row key={item['@id']}>
                      <Table.Cell>{item.author_name}</Table.Cell>
                      <Table.Cell>
                        <span title={moment(item.creation_date).format('LLLL')}>
                          {moment(item.creation_date).fromNow()}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{item.text.data}</Table.Cell>
                      <Table.Cell>
                        {item.is_editable && (
                          <Button
                            onClick={this.onEdit}
                            value={{ id: item['@id'], text: item.text.data }}
                            primary
                          >
                            <FormattedMessage id="Edit" defaultMessage="Edit" />
                          </Button>
                        )}
                        {item.is_deletable && (
                          <Button
                            onClick={this.onDelete}
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
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <Link
                  to={`${getBaseUrl(this.props.pathname)}controlpanel`}
                  className="item"
                >
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />
          </Portal>
        )}
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      items: state.search.items,
      deleteRequest: state.comments.delete,
      pathname: props.location.pathname,
    }),
    { deleteComment, searchContent },
  ),
)(ModerateComments);
