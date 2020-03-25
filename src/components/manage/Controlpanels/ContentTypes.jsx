/**
 * Content Types component.
 * @module components/manage/Controlpanels/ContentTypes
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Helmet, getBaseUrl } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import {
  Container,
  Table,
  Segment,
  Button,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import {
  getTypes,
  createType,
} from '@plone/volto/actions';
import {
  Icon,
  ModalForm,
  Toolbar,
  Toast,
} from '@plone/volto/components';
import { getId } from '@plone/volto/helpers';
import addSvg from '@plone/volto/icons/circle-plus.svg';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  add: {
    id: 'Add',
    defaultMessage: 'Add',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  ContentTypes: {
    id: 'Content Types',
    defaultMessage: 'Content Types',
  },
  addTypeFormTitle: {
    id: "Add new content type",
    defaultMessage: "Add new content type",
  },
  addTypeButtonTitle: {
    id: "Add new content type",
    defaultMessage: "Add new content type",
  },
  addTypeFormTitleTitle: {
    id: "Title",
    defaultMessage: "Title",
  },
  addTypeFormDescriptionTitle: {
    id: "Description",
    defaultMessage: "Description"
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  typeCreated: {
    id: 'Content type created',
    defaultMessage: 'Content type created',
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
    getTypes: PropTypes.func.isRequired,
    createType: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        addable: PropTypes.bool,
        title: PropTypes.string,
      }),
    ),
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
    this.onAddTypeSubmit = this.onAddTypeSubmit.bind(this);
    this.onAddTypeError = this.onAddTypeError.bind(this);
    this.onAddTypeSuccess = this.onAddTypeSuccess.bind(this);

    this.state = {
      showAddType: false,
      addTypeError: '',
    };
  }

  /**
   * Component will mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {

  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.createTypeRequest.loading && nextProps.createTypeRequest.loaded) {
      this.props.getTypes(getBaseUrl(this.props.pathname));
      this.onAddTypeSuccess();
    }
    if (this.props.createTypeRequest.loading && nextProps.createTypeRequest.error) {
      this.onAddTypeError(nextProps.createTypeRequest.error);
    }
  }

  /**
   *
   *
   * @param {object} data Form data from the ModalForm.
   * @param {func} callback to set new form data in the ModalForm
   * @memberof ContentTypes
   * @returns {undefined}
   */
  onAddTypeSubmit(data, callback) {
    this.props.createType(data);
    this.setState({
      addTypeSetFormDataCallback: callback,
    });
  }

  /**
   * Handle Errors after createType()
   *
   * @param {*} error object. Requires the property .message
   * @memberof ContentTypes
   * @returns {undefined}
   */
  onAddTypeError(error) {
    this.setState({
      addTypeError: error.message,
    });
  }

  /**
   * Handle Success after createType()
   *
   * @memberof ContentTypes
   * @returns {undefined}
   */
  onAddTypeSuccess() {
    this.state.addTypeSetFormDataCallback({ });
    this.setState({
      showAddType: false,
      addTypeError: undefined,
      addTypeSetFormDataCallback: undefined,
    });
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.typeCreated)}
      />,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container className="types-control-panel">
        <Helmet
          title={this.props.intl.formatMessage(messages.ContentTypes)}
        />
        <div className="container">
          <ModalForm
            open={this.state.showAddType}
            className="modal"
            onSubmit={this.onAddTypeSubmit}
            submitError={this.state.addTypeError}
            onCancel={() => this.setState({ showAddType: false })}
            title={this.props.intl.formatMessage(messages.addTypeFormTitle)}
            loading={this.props.createTypeRequest.loading}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: 'Content type',
                  fields: [
                    'title',
                    'description',
                  ],
                },
              ],
              properties: {
                title: {
                  title: this.props.intl.formatMessage(
                    messages.addTypeFormTitleTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                description: {
                  title: this.props.intl.formatMessage(
                    messages.addTypeFormDescriptionTitle,
                  ),
                  type: 'string',
                  description: '',
                },
              },
              required: ['title'],
            }}
          />
        </div>
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
                  {this.props.types.map(item => (
                    <Table.Row key={item['@id']}>
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
          <Segment clearing className="actions">
            {this.props.intl.formatMessage(messages.addTypeButtonTitle)}
            <Button
              basic
              primary
              floated="right"
              onClick={() => {
                this.setState({ showAddType: true });
              }}
            >
              <Icon
                name={addSvg}
                size="30px"
                color="#007eb1"
                title={this.props.intl.formatMessage(messages.add)}
              />
            </Button>
          </Segment>
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
        </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      types: state.types.types,
      pathname: props.location.pathname,
      createTypeRequest: state.types.create,
    }),
    {
      getTypes,
      createType
    },
  ),
)(ContentTypes);
