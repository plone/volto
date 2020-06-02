// /**
//  * Content type metadata.
//  * @module components/manage/Controlpanels/ContentTypeMetadata
//  */

// import { createContent, getSchema } from '@plone/volto/actions';
// import { Icon, Sidebar, Toast, Toolbar } from '@plone/volto/components';
// import SchemaWidget from '@plone/volto/components/manage/Widgets/SchemaWidget';
// import { Helmet } from '@plone/volto/helpers';
// import clearSVG from '@plone/volto/icons/clear.svg';
// import saveSVG from '@plone/volto/icons/save.svg';
// import PropTypes from 'prop-types';
// import qs from 'query-string';
// import React, { Component } from 'react';
// import { defineMessages, injectIntl } from 'react-intl';
// import { Portal } from 'react-portal';
// import { connect } from 'react-redux';
// import { toast } from 'react-toastify';
// import { compose } from 'redux';
// import { Button } from 'semantic-ui-react';

// const messages = defineMessages({
//   metadata: {
//     id: 'metadata {type}',
//     defaultMessage: 'metadata {type}',
//   },
//   save: {
//     id: 'Save',
//     defaultMessage: 'Save',
//   },
//   cancel: {
//     id: 'Cancel',
//     defaultMessage: 'Cancel',
//   },
//   error: {
//     id: 'Error',
//     defaultMessage: 'Error',
//   },
// });

// const makeSchemaList = (schema) => {
//   let result = {
//     fieldsets: [
//       {
//         fields: ['title', 'description', 'contact_email', 'url', 'pass'],
//         id: 'default',
//         title: 'default',
//       },
//       {
//         fields: ['kda'],
//         id: 'art',
//         title: 'art',
//       },
//     ],
//     layouts: ['newsitem_view'],
//     properties: {
//       title: { description: '', title: 'Title', type: 'string' },
//       contact_email: {
//         description: '',
//         minLength: 3,
//         title: 'contact email',
//         type: 'string',
//         widget: 'email',
//       },
//       pass: {
//         description: '',
//         minLength: 8,
//         title: 'pass',
//         type: 'string',
//         widget: 'password',
//       },
//       description: {
//         description: 'Used in item listings and search results.',
//         title: 'Summary',
//         type: 'string',
//       },
//       url: {
//         description: '',
//         minLength: 5,
//         title: 'url',
//         type: 'string',
//         widget: 'url',
//       },
//     },
//     title: 'News Item',
//     required: ['title', 'contact_email'],
//   };

//   return JSON.stringify(result);
// };

// /**
//  * ContentTypeMetadata class.
//  * @class ContentTypeMetadata
//  * @extends Component
//  */
// class ContentTypeMetadata extends Component {
//   /**
//    * Property types.
//    * @property {Object} propTypes Property types.
//    * @static
//    */
//   static propTypes = {
//     createContent: PropTypes.func.isRequired,
//     getSchema: PropTypes.func.isRequired,
//     pathname: PropTypes.string.isRequired,
//     schema: PropTypes.objectOf(PropTypes.any),
//     content: PropTypes.shape({
//       // eslint-disable-line react/no-unused-prop-types
//       '@id': PropTypes.string,
//       '@type': PropTypes.string,
//     }),
//     returnUrl: PropTypes.string,
//     createRequest: PropTypes.shape({
//       loading: PropTypes.bool,
//       loaded: PropTypes.bool,
//     }).isRequired,
//     schemaRequest: PropTypes.shape({
//       loading: PropTypes.bool,
//       loaded: PropTypes.bool,
//     }).isRequired,
//     type: PropTypes.string,
//     location: PropTypes.objectOf(PropTypes.any),
//   };

//   /**
//    * Default properties
//    * @property {Object} defaultProps Default properties.
//    * @static
//    */
//   static defaultProps = {
//     schema: null,
//     content: null,
//     returnUrl: '/controlpanel/dexterity-types',
//     type: 'Default',
//   };

//   /**
//    * Constructor
//    * @method constructor
//    * @param {Object} props Component properties
//    * @constructs WysiwygEditor
//    */
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: [],
//       placeholderProps: {},
//       formData: {},
//       activeIndex: 0,
//       schemaItems: makeSchemaList(props?.schema),
//       loading: false,
//       hideActions: false,
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onCancel = this.onCancel.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }
//   onSubmit(event) {}
//   onChange(event) {}
//   onCancel(event) {}

//   /**
//    * Component did mount
//    * @method componentDidMount
//    * @returns {undefined}
//    */
//   componentDidMount() {
//     this.props.getSchema(this.props.type);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // console.log('prevProps', prevProps);
//     // console.log('this.props', this.props);
//     // console.log('this.state', this.state);
//     // console.log('prevState', prevState);

//     if (this.props.createRequest.error) {
//       toast.error(
//         <Toast
//           error
//           title={this.props.intl.formatMessage(messages.error)}
//           content={`${this.props.createRequest.error.status}:  ${this.props.createRequest.error.response?.body?.message}`}
//         />,
//       );
//     }
//   }

//   /**
//    * Render method.
//    * @method render
//    * @returns {string} Markup for the component.
//    */
//   render() {
//     // console.log('this.props', this.props);
//     // console.log('this.state', this.state);
//     return (
//       // <Container>
//       <div id="page-types-control-panel-metadata">
//         <Helmet
//           title={this.props.intl.formatMessage(messages.metadata, {
//             type: this.props.type,
//           })}
//         />

//         {this.props.schema ? (
//           <SchemaWidget
//             id="schema"
//             value={this.state.schemaItems}
//             error={this.state.error}
//             schema={this.state.schemaItems}
//             pathname={this.props.pathname}
//             loading={this.props.loading}
//             hideActions={this.props.hideActions}
//             onCancel={this.onCancel}
//             onSubmit={this.onSubmit}
//           />
//         ) : null}
//         <Portal node={__CLIENT__ && document.getElementById('sidebar')}>
//           <Sidebar />
//         </Portal>
//         <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
//           <Toolbar
//             pathname={this.props.pathname}
//             hideDefaultViewButtons
//             inner={
//               <>
//                 <Button
//                   id="toolbar-save"
//                   className="save"
//                   aria-label={this.props.intl.formatMessage(messages.save)}
//                   onClick={() => this.form.current.onSubmit()}
//                   // disabled={this.props.updateRequest.loading}
//                   // loading={this.props.updateRequest.loading}
//                 >
//                   <Icon
//                     name={saveSVG}
//                     className="circled"
//                     size="30px"
//                     title={this.props.intl.formatMessage(messages.save)}
//                   />
//                 </Button>
//                 <Button
//                   className="cancel"
//                   aria-label={this.props.intl.formatMessage(messages.cancel)}
//                   onClick={() => this.onCancel()}
//                 >
//                   <Icon
//                     name={clearSVG}
//                     className="circled"
//                     size="30px"
//                     title={this.props.intl.formatMessage(messages.cancel)}
//                   />
//                 </Button>
//               </>
//             }
//           />
//         </Portal>
//       </div>
//       // </Container>
//     );
//   }
// }

// export default compose(
//   injectIntl,
//   connect(
//     (state, props) => ({
//       createRequest: state.content.create,
//       schemaRequest: state.schema,
//       content: state.content.data,
//       schema: state.schema.schema,
//       pathname: props.location.pathname,
//       returnUrl: qs.parse(props.location.search).return_url,
//       type: props.match.params.id,
//     }),
//     { createContent, getSchema },
//   ),
// )(ContentTypeMetadata);

/**
 * Content Type component.
 * @module components/manage/Controlpanels/ContentTypeSchema
 */

import { getControlpanel, updateControlpanel } from '@plone/volto/actions';
import { Form, Toast } from '@plone/volto/components';
import { getParentUrl } from '@plone/volto/helpers';
import { join, nth } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { compose } from 'redux';

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

const schema = `{
    "fieldsets": [
      {
        "fields": [
          "title",
          "description",
          "start",
          "end",
          "whole_day",
          "open_end",
          "sync_uid",
          "recurrence",
          "location",
          "attendees",
          "contact_name",
          "contact_email",
          "contact_phone",
          "event_url",
          "text",
          "changeNote"
        ],
        "id": "default",
        "title": "Default"
      },
      {
        "fields": [
          "subjects",
          "language",
          "relatedItems"
        ],
        "id": "categorization",
        "title": "Categorization"
      },
      {
        "fields": [
          "effective",
          "expires"
        ],
        "id": "dates",
        "title": "Dates"
      },
      {
        "fields": [
          "creators",
          "contributors",
          "rights"
        ],
        "id": "ownership",
        "title": "Ownership"
      },
      {
        "fields": [
          "allow_discussion",
          "exclude_from_nav",
          "id",
          "versioning_enabled"
        ],
        "id": "settings",
        "title": "Settings"
      }
    ],
    "layouts": [
      "event_view"
    ],
    "properties": {
      "allow_discussion": {
        "choices": [
          [
            "True",
            "Yes"
          ],
          [
            "False",
            "No"
          ]
        ],
        "description": "Allow discussion for this content object.",
        "enum": [
          "True",
          "False"
        ],
        "enumNames": [
          "Yes",
          "No"
        ],
        "title": "Allow discussion",
        "type": "string",
        "vocabulary": {
          "@id": "http://localhost:3000/api/@sources/allow_discussion"
        }
      },
      "attendees": {
        "additionalItems": true,
        "default": [],
        "description": "List of attendees.",
        "items": {
          "description": "",
          "title": "",
          "type": "string"
        },
        "title": "Attendees",
        "type": "array",
        "uniqueItems": true,
        "widgetOptions": {
          "klass": "event_attendees"
        }
      },
      "changeNote": {
        "description": "Enter a comment that describes the changes you made.",
        "title": "Change Note",
        "type": "string"
      },
      "contact_email": {
        "description": "Email address to contact about this event.",
        "title": "Contact E-mail",
        "type": "string",
        "widgetOptions": {
          "klass": "event_contact_email"
        }
      },
      "contact_name": {
        "description": "Name of a person to contact about this event.",
        "title": "Contact Name",
        "type": "string",
        "widgetOptions": {
          "klass": "event_contact_name"
        }
      },
      "contact_phone": {
        "description": "Phone number to contact about this event.",
        "title": "Contact Phone",
        "type": "string",
        "widgetOptions": {
          "klass": "event_contact_phone"
        }
      },
      "contributors": {
        "additionalItems": true,
        "description": "The names of people that have contributed to this item. Each contributor should be on a separate line.",
        "items": {
          "description": "",
          "title": "",
          "type": "string"
        },
        "title": "Contributors",
        "type": "array",
        "uniqueItems": true,
        "widgetOptions": {
          "vocabulary": {
            "@id": "http://localhost:3000/api/@vocabularies/plone.app.vocabularies.Users"
          }
        }
      },
      "creators": {
        "additionalItems": true,
        "description": "Persons responsible for creating the content of this item. Please enter a list of user names, one per line. The principal creator should come first.",
        "items": {
          "description": "",
          "title": "",
          "type": "string"
        },
        "title": "Creators",
        "type": "array",
        "uniqueItems": true,
        "widgetOptions": {
          "vocabulary": {
            "@id": "http://localhost:3000/api/@vocabularies/plone.app.vocabularies.Users"
          }
        }
      },
      "description": {
        "description": "Used in item listings and search results.",
        "title": "Summary",
        "type": "string",
        "widget": "textarea"
      },
      "effective": {
        "description": "If this date is in the future, the content will not show up in listings and searches until this date.",
        "title": "Publishing Date",
        "type": "string",
        "widget": "datetime"
      },
      "end": {
        "default": "2020-05-29T10:00:00+00:00",
        "description": "Date and Time, when the event ends.",
        "title": "Event Ends",
        "type": "string",
        "widget": "datetime",
        "widgetOptions": {
          "default_timezone": "Europe/Helsinki",
          "klass": "event_end"
        }
      },
      "event_url": {
        "description": "Web address with more info about the event. Add http:// for external links.",
        "title": "Event URL",
        "type": "string",
        "widget": "url",
        "widgetOptions": {
          "klass": "event_url"
        }
      },
      "exclude_from_nav": {
        "default": false,
        "description": "If selected, this item will not appear in the navigation tree",
        "title": "Exclude from navigation",
        "type": "boolean"
      },
      "expires": {
        "description": "When this date is reached, the content will no longer be visible in listings and searches.",
        "title": "Expiration Date",
        "type": "string",
        "widget": "datetime"
      },
      "id": {
        "description": "This name will be displayed in the URL.",
        "title": "Short name",
        "type": "string"
      },
      "language": {
        "default": "en",
        "description": "",
        "title": "Language",
        "type": "string",
        "vocabulary": {
          "@id": "http://localhost:3000/api/@vocabularies/plone.app.vocabularies.SupportedContentLanguages"
        }
      },
      "location": {
        "description": "Location of the event.",
        "title": "Location",
        "type": "string",
        "widgetOptions": {
          "klass": "event_location"
        }
      },
      "open_end": {
        "default": false,
        "description": "This event is open ended.",
        "title": "Open End",
        "type": "boolean",
        "widgetOptions": {
          "klass": "event_open_end"
        }
      },
      "recurrence": {
        "description": "Define the event recurrence rule.",
        "title": "Recurrence",
        "type": "string",
        "widget": "textarea",
        "widgetOptions": {
          "first_day": 1,
          "klass": "event_recurrence",
          "show_repeat_forever": false,
          "start_field": "IEventBasic.start"
        }
      },
      "relatedItems": {
        "additionalItems": true,
        "default": [],
        "description": "",
        "items": {
          "description": "",
          "title": "Related",
          "type": "string",
          "vocabulary": {
            "@id": "http://localhost:3000/api/@vocabularies/plone.app.vocabularies.Catalog"
          }
        },
        "title": "Related Items",
        "type": "array",
        "uniqueItems": true,
        "widgetOptions": {
          "pattern_options": {
            "recentlyUsed": true
          },
          "vocabulary": {
            "@id": "http://localhost:3000/api/@vocabularies/plone.app.vocabularies.Catalog"
          }
        }
      },
      "rights": {
        "description": "Copyright statement or other rights information on this item.",
        "title": "Rights",
        "type": "string",
        "widget": "textarea"
      },
      "start": {
        "default": "2020-05-29T09:00:00+00:00",
        "description": "Date and Time, when the event begins.",
        "title": "Event Starts",
        "type": "string",
        "widget": "datetime",
        "widgetOptions": {
          "default_timezone": "Europe/Helsinki",
          "klass": "event_start"
        }
      },
      "subjects": {
        "additionalItems": true,
        "description": "Tags are commonly used for ad-hoc organization of content.",
        "items": {
          "description": "",
          "title": "",
          "type": "string"
        },
        "title": "Tags",
        "type": "array",
        "uniqueItems": true,
        "widgetOptions": {
          "vocabulary": {
            "@id": "http://localhost:3000/api/@vocabularies/plone.app.vocabularies.Keywords"
          }
        }
      },
      "sync_uid": {
        "description": "",
        "mode": "hidden",
        "title": "",
        "type": "string"
      },
      "text": {
        "description": "",
        "title": "Text",
        "type": "string",
        "widget": "richtext"
      },
      "title": {
        "description": "",
        "title": "Title",
        "type": "string"
      },
      "versioning_enabled": {
        "default": true,
        "description": "Enable/disable versioning for this document.",
        "title": "Versioning enabled",
        "type": "boolean"
      },
      "whole_day": {
        "default": false,
        "description": "Event lasts whole day.",
        "title": "Whole Day",
        "type": "boolean",
        "widgetOptions": {
          "klass": "event_whole_day"
        }
      }
    },
    "required": [
      "title",
      "start",
      "end"
    ],
    "title": "Event",
    "type": "object"
  }`;

const form_schema = {
  title: 'Event',
  type: 'object',
  fieldsets: [
    {
      fields: ['schema'],
      id: 'default',
      title: 'Default',
    },
  ],
  properties: {
    schema: {
      description: 'Form schema',
      title: 'Form schema',
      type: 'schema',
    },
  },
  required: [],
  layouts: ['event_view'],
};

const data = {
  schema: schema,
};

/**
 * ContentTypeSchema class.
 * @class ContentTypeSchema
 * @extends Component
 */
class ContentTypeSchema extends Component {
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
   * @constructs ContentTypeSchema
   */
  constructor(props) {
    super(props);
    this.state = {
      visual: true,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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
    console.log(data);
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(this.props.pathname));
  }

  onChange() {}

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.controlpanel) {
      return (
        <Form
          isEditForm
          schema={form_schema}
          formData={data}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          loading={this.props.updateRequest.loading}
        />
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
)(ContentTypeSchema);
