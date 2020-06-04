/**
 * Content Type component.
 * @module components/manage/Controlpanels/ContentTypeLayout
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet, getParentUrl } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import { Button } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { nth, join } from 'lodash';
import { Form, Icon, Toolbar, Toast, Sidebar } from '@plone/volto/components';
import { getControlpanel, updateControlpanel } from '@plone/volto/actions';

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

const schema = {
  fieldsets: [
    {
      id: "layout",
      title: "Layout",
      fields: [
        "blocks",
        "blocks_layout"
      ],
    }
  ],
  properties: {
    blocks: {
      default: {},
      description: "The JSON representation of the object blocks information. Must be a JSON object.",
      title: "Blocks",
      type: "dict",
      widget: "json",
    },
    blocks_layout: {
      default: {
        items: []
      },
      items: [],
      description: "The JSON representation of the object blocks layout. Must be a JSON array.",
      title: "Blocks Layout",
      type: "dict",
      widget: "json",
    },
  }
}

const data = {
  blocks: {},
  blocks_layout: {}
}

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
    id: PropTypes.string.isRequired,
    parent: PropTypes.string.isRequired,
    updateRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    controlpanel: PropTypes.shape({
      '@id': PropTypes.string,
      data: PropTypes.object,
      schema: PropTypes.object,
      title: PropTypes.string,
    }),
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
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
      visual: true,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.form = React.createRef();
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.getControlpanel(join([this.props.parent, this.props.id], '/'));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      toast.info(
        <Toast
          info
          title={this.props.intl.formatMessage(messages.info)}
          content={this.props.intl.formatMessage(messages.changesSaved)}
        />,
      );
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.updateControlpanel(this.props.controlpanel['@id'], data);
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
    if (this.props.controlpanel) {
      let controlpanel = this.props.controlpanel;
      if (controlpanel?.data?.filter_content_types === false) {
        controlpanel.data.filter_content_types = { title: 'all', token: 'all' };
      }
      if (controlpanel?.data?.filter_content_types === true) {
        if ((controlpanel?.data?.allowed_content_types || []).length) {
          controlpanel.data.filter_content_types = {
            title: 'some',
            token: 'some',
          };
        } else {
          controlpanel.data.filter_content_types = {
            title: 'none',
            token: 'none',
          };
        }
      }
      return (
        <div id="page-controlpanel">
          <Helmet title={controlpanel.title} />
          <Form
            isEditForm
            isAdminForm
            ref={this.form}
            title={controlpanel.title}
            schema={schema}
            formData={data}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            pathname={this.props.pathname}
            visual={this.state.visual}
            hideActions
            loading={this.props.updateRequest.loading}
          />
          {this.state.visual && (
            <Portal node={__CLIENT__ && document.getElementById('sidebar')}>
              <Sidebar />
            </Portal>
          )}
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
                    disabled={this.props.updateRequest.loading}
                    loading={this.props.updateRequest.loading}
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
    return <div />;
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      controlpanel: state.controlpanels.controlpanel,
      updateRequest: state.controlpanels.update,
      pathname: props.location.pathname,
      id: nth(props.location.pathname.split('/'), -2),
      parent: nth(props.location.pathname.split('/'), -3),
    }),
    { getControlpanel, updateControlpanel },
  ),
)(ContentTypeLayout);
