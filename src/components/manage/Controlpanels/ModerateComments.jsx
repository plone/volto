/**
 * Moderate comments component.
 * @module components/manage/Controlpanels/ModerateComments
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Portal } from 'react-portal';
import { Container, Icon, Button, Table } from 'semantic-ui-react';
import moment from 'moment';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { deleteComment, searchContent } from '../../../actions';
import { Toolbar, CommentEditModal } from '../../../components';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    items: state.search.items,
    deleteRequest: state.comments.delete,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ deleteComment, searchContent }, dispatch),
)
/**
 * ModerateCommentsComponent class.
 * @class ModerateComments
 * @extends Component
 */
export default class ModerateComments extends Component {
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
    intl: intlShape.isRequired,
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
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.searchContent('', {
      portal_type: 'Discussion Item',
      fullobjects: true,
    });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
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
        <Helmet title="Moderate comments" />
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
                  {this.props.items.map(item => (
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
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            inner={
              <Link
                to={`${getBaseUrl(this.props.pathname)}controlpanel`}
                className="item"
              >
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
