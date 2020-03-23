/**
 * Content Types component.
 * @module components/manage/Controlpanels/ContentTypes
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Helmet } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import { Container, Table, Checkbox } from 'semantic-ui-react';

import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar } from '@plone/volto/components';
import { getId } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  ContentTypes: {
    id: 'Content Types',
    defaultMessage: 'Content Types',
  },
});

/**
 * ContentTypes class.
 * @class ContentTypes
 * @extends Component
 */
class ContentTypes extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
      }),
    ).isRequired,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Types
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
  UNSAFE_componentWillMount() {

  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {

  }

  /**
   * Delete handler
   * @method onDelete
   * @param {Object} event Event object.
   * @param {string} value Delete value.
   * @returns {undefined}
   */
  onDelete(event, { value }) {

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
      <div id="page-content-types">
        <Helmet
          title={this.props.intl.formatMessage(messages.ContentTypes)}
        />
        <Container>
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">
                <FormattedMessage
                  id="Content Types"
                  defaultMessage="Content Types"
                />
              </h1>
            </header>
            <section id="content-core">
              <Table compact singleLine striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <FormattedMessage
                        id="Type name"
                        defaultMessage="Type name"
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <FormattedMessage id="Description" defaultMessage="Description" />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <FormattedMessage id="# of items" defaultMessage="# of items" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.items.map(item => (
                    <Table.Row key={item['@id']}>
                      <Table.Cell>
                        <Checkbox
                          value={item['@id']} />
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/controlpanel/content-types/${getId(item['@id'])}`}>
                          {item.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        {item.description}
                      </Table.Cell>
                      <Table.Cell>
                        {item.count}
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
            hideDefaultViewButtons
            inner={
              <Link
                to="/controlpanel"
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
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      items: state.types.types,
      pathname: props.location.pathname,
    }),
    { },
  ),
)(ContentTypes);
