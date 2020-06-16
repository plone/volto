/**
 * Content Type component.
 * @module components/manage/Controlpanels/ContentTypeLayout
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getParentUrl, hasBlocksData, getBlocksFieldname } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { nth, join } from 'lodash';
import { Form, Icon, Toolbar, Sidebar, Toast } from '@plone/volto/components';
import {
  getSchema,
  putSchema,
  updateSchema,
  getControlpanel,
  updateControlpanel } from '@plone/volto/actions';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import backSVG from '@plone/volto/icons/back.svg';

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
    updateControlpanel: PropTypes.func.isRequired,
    getControlpanel: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    putSchema: PropTypes.func.isRequired,
    updateSchema: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    updateRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    controlpanel: PropTypes.shape({
      '@id': PropTypes.string,
      data: PropTypes.object,
      schema: PropTypes.object,
      title: PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: {},
    controlpanel: null,
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
      content: null,
      readOnly: false,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEnableBlocks = this.onEnableBlocks.bind(this);
    this.onDisableBlocksBehavior = this.onDisableBlocksBehavior.bind(this);
    this.form = React.createRef();
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.getControlpanel(join([this.props.parent, this.props.id], '/'));
    this.props.getSchema(this.props.id);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // Schema
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

        const blocksFieldName = getBlocksFieldname(properties);
        const blocksBehavior = properties[blocksFieldName]?.behavior || "";
        this.setState({
          readOnly: !blocksBehavior.includes("generated")
        });
      } else {
        this.setState({
          visual: false,
          readOnly: false,
        });
      }
    }

    // Blocks enabled
    if (this.props.schemaRequest.put.loading && nextProps.schemaRequest.put.loaded) {
      this.props.getSchema(this.props.id);
    }

    // Schema updated
    if (this.props.schemaRequest.update.loading && nextProps.schemaRequest.update.loaded) {
      toast.info(
        <Toast
          info
          title={this.props.intl.formatMessage(messages.info)}
          content={this.props.intl.formatMessage(messages.changesSaved)}
        />,
      );
    }

    // Blocks behavior disabled
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      this.props.getSchema(this.props.id);
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.updateSchema(this.props.id, data);
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    let url = getParentUrl(this.props.pathname)
    this.props.history.push(getParentUrl(url));
  }

  /**
   * Enable blocks handler
   * @method onEnableBlocks
   * @returns {undefined}
   */
  onEnableBlocks() {
    let schema = {
      ...this.props.schema,
      fieldsets: [
        ...this.props.schema.fieldsets,
        {
          id: "layout",
          title: "Layout",
          fields: ["blocks", "blocks_layout"],
        }
      ],
      properties: {
        ...this.props.schema.properties,
        blocks: {
          default: {},
          title: "Blocks",
          type: "dict",
          widget: "json",
          factory: "JSONField"
        },
        blocks_layout: {
          default: {
            items: []
          },
          title: "Blocks Layout",
          type: "dict",
          widget: "json",
          factory: "JSONField"
        },
      }
    }
    this.props.putSchema(this.props.id, schema);
    // debugger;
    // this.props.postSchema(this.props.id, {
    //   "@type": "fieldset",
    //   "title": "Layout"
    // },

    // );
    // this.props.postSchema(this.props.id, {
    //   "@type": "JSONField",
    //   "title": "Blocks Layout",
    //   "fieldset_id": 1
    // });
    // this.props.postSchema(this.props.id, {
    //   "@type": "JSONField",
    //   "title": "Blocks",
    //   "fieldset_id": 1
    // });
    // this.props.updateSchema(this.props.id, {
    //   blocks: {},
    //   blocks_layout: {"items": []}
    // });
  }

  /**
   * Disable Blocks behavior handler
   * @method onDisableBlocksBehavior
   * @returns {undefined}
   */
  onDisableBlocksBehavior() {
    this.props.updateControlpanel(this.props.controlpanel['@id'], {
      "volto.blocks": false
    })
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (!this.state.visual) {
      // Still loading
      if (!this.state.content) {
        return <div />;
      }

      // Blocks are not enabled
      return (
        <>
        <div id="page-controlpanel-layout" className="ui container">
          <p>
          <FormattedMessage
              id="Can not edit Layout for {type} content-type as it doesn't have support for Volto Blocks enabled"
              defaultMessage="Can not edit Layout for {type} content-type as it doesn't have support for Volto Blocks enabled"
              values = {{
                type: this.props.id
              }}
            />
          </p>
          <p>
            <button onClick={this.onEnableBlocks}>
              <FormattedMessage
                id="Enables Volto Blocks support"
                defaultMessage="Enables Volto Blocks support"
              />
            </button>
          </p>
        </div>
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
        <Toolbar
          pathname={this.props.pathname}
          hideDefaultViewButtons
          inner={
            <>
              <Link className="item" to="#" onClick={() => this.onCancel()}>
                <Icon
                  name={backSVG}
                  size="30px"
                  className="contents circled"
                  title={this.props.intl.formatMessage(messages.back)}
                />
              </Link>
            </>
          }
        />
      </Portal>
      </>
      )
    }

    if (this.state.readOnly) {
      return (
        <>
          <div id="page-controlpanel-layout" className="ui container">
            <p>
              <FormattedMessage
                  id="Can not edit Layout for {type} content-type as the Blocks behavior is enabled and read-only"
                  defaultMessage="Can not edit Layout for {type} content-type as the Blocks behavior is enabled and read-only"
                  values = {{
                    type: this.props.id
                  }}
                />
            </p>
            <p>
              <button onClick={this.onDisableBlocksBehavior}>
                <FormattedMessage
                  id="Enable editable Blocks"
                  defaultMessage="Enable editable Blocks"
                />
              </button>
            </p>
          </div>
          <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link className="item" to="#" onClick={() => this.onCancel()}>
                  <Icon
                    name={backSVG}
                    size="30px"
                    className="contents circled"
                    title={this.props.intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />
        </Portal>
        </>
      )
    }

    // Render layout editor
    return (
      <div id="page-controlpanel-layout">
        <Form
          isEditForm
          isAdminForm
          ref={this.form}
          schema={{
            ...this.props.schema,
            required: []
          }}
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
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      schema: state.schema.schema,
      schemaRequest: state.schema,
      updateRequest: state.controlpanels.update,
      controlpanel: state.controlpanels.controlpanel,
      pathname: props.location.pathname,
      id: nth(props.location.pathname.split('/'), -2),
      parent: nth(props.location.pathname.split('/'), -3),
    }),
    { getSchema, putSchema, updateSchema,
      getControlpanel, updateControlpanel
    },
  ),
)(ContentTypeLayout);
