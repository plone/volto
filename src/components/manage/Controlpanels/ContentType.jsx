/**
 * Content Type component.
 * @module components/manage/Controlpanels/ContentType
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { Container, Button } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { getSchema } from '@plone/volto/actions';
import { Form } from '@plone/volto/components';
import { Icon, Toolbar } from '@plone/volto/components';
import {
  getId,
  Helmet,
  getParentUrl,
  hasBlocksData,
} from '@plone/volto/helpers';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  ContentType: {
    id: 'Content Type: {type}',
    defaultMessage: 'Content Type: {type}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
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
    this.onCancel = this.onCancel.bind(this);
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
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(this.props.pathname));
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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schemaRequest.loaded) {
      const visual = hasBlocksData(this.props.schema.properties);
      return (
        <div id="page-dexterity-types">
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
                <Form
                  schema={this.props.schema}
                  onSubmit={this.onSubmit}
                  hideActions
                  pathname={this.props.pathname}
                  visual={visual}
                />
              </section>
            </article>
          </Container>
          <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Button
                    id="toolbar-save"
                    className="save"
                    aria-label={this.props.intl.formatMessage(messages.save)}
                    onClick={() => this.form.current.onSubmit()}
                  // loading={this.props.createRequest.loading}
                  >
                    <Icon
                      name={saveSVG}
                      className="circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.save)}
                    />
                  </Button>
                  <Button className="cancel" onClick={() => this.onCancel()}>
                    <Icon
                      name={clearSVG}
                      className="circled"
                      aria-label={this.props.intl.formatMessage(
                        messages.cancel,
                      )}
                      size="30px"
                      title={this.props.intl.formatMessage(messages.cancel)}
                    />
                  </Button>
                </>
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
