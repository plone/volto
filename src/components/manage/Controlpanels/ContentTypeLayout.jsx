/**
 * Content Type component.
 * @module components/manage/Controlpanels/ContentTypeLayout
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet, getParentUrl, hasBlocksData } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { nth } from 'lodash';
import { Form, Icon, Toolbar, Sidebar } from '@plone/volto/components';
import { getSchema } from '@plone/volto/actions';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  changesSaved: {
    id: 'Changes saved.',
    defaultMessage: 'Changes saved.',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  info: {
    id: 'Info',
    defaultMessage: 'Info',
  },
});

/**
 * ContentTypeLayout class.
 * @class ContentTypeLayout
 * @extends Component
 */
class ContentTypeLayout extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    getSchema: PropTypes.func.isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: {},
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ContentTypeLayout
   */
  constructor(props) {
    super(props);
    this.state = {
      visual: false,
      content: {},
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.form = React.createRef();
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSchema(this.props.id);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.schemaRequest.loading && nextProps.schemaRequest.loaded) {
      let properties = nextProps.schema?.properties || {};
      let content = {};
      let value, key;
      for (key in properties) {
        value = properties[key].default
        if(value) {
          content[key] = value;
        }
      }
      this.setState({
        content: content,
      });

      if (hasBlocksData(properties)) {
        this.setState({
          visual: true,
        });
      }
    }
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
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(this.props.pathname));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.state.visual ? (
      <div id="page-controlpanel-layout">
        <Form
          isEditForm
          isAdminForm
          ref={this.form}
          schema={this.props.schema}
          formData={this.state.content}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          pathname={this.props.pathname}
          visual={this.state.visual}
          hideActions
        />
        <Portal node={__CLIENT__ && document.getElementById('sidebar')}>
          <Sidebar settingsTab={true} />
        </Portal>
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
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.save)}
                  />
                </Button>
                <Button
                  className="cancel"
                  aria-label={this.props.intl.formatMessage(messages.cancel)}
                  onClick={() => this.onCancel()}
                >
                  <Icon
                    name={clearSVG}
                    className="circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.cancel)}
                  />
                </Button>
              </>
            }
          />
        </Portal>
      </div>
    ) : (
      <div />
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      schema: state.schema.schema,
      schemaRequest: state.schema,
      pathname: props.location.pathname,
      id: nth(props.location.pathname.split('/'), -2),
      parent: nth(props.location.pathname.split('/'), -3),
    }),
    { getSchema },
  ),
)(ContentTypeLayout);
