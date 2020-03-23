/**
 * Content Type component.
 * @module components/manage/Controlpanels/ContentType
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Helmet } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import { Container } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { getSchema } from '@plone/volto/actions';
import { Form } from '@plone/volto/components';
import { Icon, Toolbar } from '@plone/volto/components';
import {
  getId,
  hasBlocksData,
 } from '@plone/volto/helpers';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  ContentType: {
    id: 'Content Type: {type}',
    defaultMessage: 'Content Type: {type}',
  },
  Type: {
    id: 'Type: {type}',
    defaultMessage: 'Type: {type}',
  }
});

/**
 * ContentType class.
 * @class ContentType
 * @extends Component
 */
class ContentType extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    type: PropTypes.string,
    getSchema: PropTypes.func.isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
  };

    /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
    type: 'Default',
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
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      showEdit: false,
      editId: null,
      editText: null,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSchema(this.props.type);
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
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {

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
    if (this.props.schemaRequest.loaded) {
      const visual = hasBlocksData(this.props.schema.properties);

      return (
        <div id="page-content-types">
          <Helmet
            title={this.props.intl.formatMessage(messages.ContentType, {
              type: this.props.type,
            })}
          />
          <Container>
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">
                <FormattedMessage
                  id="Type: {type}"
                  defaultMessage="Type: {type}"
                  values={{ type: this.props.type }}
                />
              </h1>
            </header>
            <section id="content-core">
            </section>
          </article>
        </Container>
        <Form
          schema={this.props.schema}
          onSubmit={this.onSubmit}
          hideActions
          pathname={this.props.pathname}
          visual={visual}
        />
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            hideDefaultViewButtons
            inner={
              <Link
                to="/controlpanel/content-types"
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
    return <div />;
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      schemaRequest: state.schema,
      schema: state.schema.schema,
      pathname: props.location.pathname,
      type: getId(props.location.pathname),
    }),
    { getSchema },
  ),
)(ContentType);
