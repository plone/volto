/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, mapValues, omit, uniq, without } from 'lodash';
import {
  Button,
  Container,
  Dropdown,
  Form as UiForm,
  Segment,
  Tab,
  Message,
} from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';
import { v4 as uuid } from 'uuid';

import {
  EditTitleTile,
  EditDescriptionTile,
  EditTextTile,
  EditImageTile,
  EditVideoTile,
  Field,
} from '../../../components';

const messages = defineMessages({
  addTile: {
    id: 'Add tile...',
    defaultMessage: 'Add tile...',
  },
  required: {
    id: 'Required input is missing.',
    defaultMessage: 'Required input is missing.',
  },
  minLength: {
    id: 'Minimum length is {len}.',
    defaultMessage: 'Minimum length is {len}.',
  },
  uniqueItems: {
    id: 'Items must be unique.',
    defaultMessage: 'Items must be unique.',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  thereWereSomeErrors: {
    id: 'There were some errors.',
    defaultMessage: 'There were some errors.',
  },
});

/**
 * Form container class.
 * @class Form
 * @extends Component
 */
class Form extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    schema: PropTypes.shape({
      fieldsets: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.arrayOf(PropTypes.string),
          id: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
      properties: PropTypes.objectOf(PropTypes.any),
      required: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    formData: PropTypes.objectOf(PropTypes.any),
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    intl: intlShape.isRequired,
    title: PropTypes.string,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
    description: PropTypes.string,
    visual: PropTypes.bool,
    tiles: PropTypes.arrayOf(PropTypes.object),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    formData: null,
    onSubmit: null,
    onCancel: null,
    submitLabel: null,
    resetAfterSubmit: false,
    title: null,
    description: null,
    error: null,
    loading: null,
    hideActions: false,
    visual: false,
    tiles: [],
    pathname: '',
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Form
   */
  constructor(props) {
    super(props);
    const ids = {
      title: uuid(),
      description: uuid(),
      text: uuid(),
    };
    let { formData } = props;
    if (formData === null) {
      // get defaults from schema
      formData = mapValues(props.schema.properties, 'default');
    }
    // defaults for block editor; should be moved to schema on server side
    if (!formData.arrangement) {
      formData.arrangement = { items: [ids.title, ids.description, ids.text] };
    }
    if (!formData.tiles) {
      formData.tiles = {
        [ids.title]: {
          '@type': 'title',
        },
        [ids.description]: {
          '@type': 'description',
        },
        [ids.text]: {
          '@type': 'text',
          text: {
            'content-type': 'text/html',
            data: '',
            encoding: 'utf8',
          },
        },
      };
    }
    this.state = {
      formData,
      errors: {},
      selected: null,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onSelectTile = this.onSelectTile.bind(this);
    this.onDeleteTile = this.onDeleteTile.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Change field handler
   * @method onChangeField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onChangeField(id, value) {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: value || null,
      },
    });
  }

  /**
   * Change tile handler
   * @method onChangeTile
   * @param {string} id Id of the tile
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onChangeTile(id, value) {
    this.setState({
      formData: {
        ...this.state.formData,
        tiles: {
          ...this.state.formData.tiles,
          [id]: value || null,
        },
      },
    });
  }

  /**
   * Select tile handler
   * @method onSelectTile
   * @param {string} id Id of the field
   * @returns {undefined}
   */
  onSelectTile(id) {
    this.setState({
      selected: id,
    });
  }

  /**
   * Delete tile handler
   * @method onDeleteTile
   * @param {string} id Id of the field
   * @returns {undefined}
   */
  onDeleteTile(id) {
    this.setState({
      formData: {
        ...this.state.formData,
        arrangement: {
          items: without(this.state.formData.arrangement.items, id),
        },
        tiles: omit(this.state.formData.tiles, [id]),
      },
      selected: null,
    });
  }

  /**
   * Select tile handler
   * @method onSelectTile
   * @param {string} type Type of the tile
   * @returns {undefined}
   */
  onAddTile(type) {
    const id = uuid();
    this.setState({
      formData: {
        ...this.state.formData,
        arrangement: {
          items: [...this.state.formData.arrangement.items, id],
        },
        tiles: {
          ...this.state.formData.tiles,
          [id]: {
            '@type': type,
          },
        },
      },
      selected: id,
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const errors = {};
    map(this.props.schema.fieldsets, fieldset =>
      map(fieldset.fields, fieldId => {
        const field = this.props.schema.properties[fieldId];
        const data = this.state.formData[fieldId];
        if (this.props.schema.required.indexOf(fieldId) !== -1) {
          if (field.type !== 'boolean' && !data) {
            errors[fieldId] = errors[field] || [];
            errors[fieldId].push(
              this.props.intl.formatMessage(messages.required),
            );
          }
          if (field.minLength && data.length < field.minLength) {
            errors[fieldId] = errors[field] || [];
            errors[fieldId].push(
              this.props.intl.formatMessage(messages.minLength, {
                len: field.minLength,
              }),
            );
          }
        }
        if (field.uniqueItems && data && uniq(data).length !== data.length) {
          errors[fieldId] = errors[field] || [];
          errors[fieldId].push(
            this.props.intl.formatMessage(messages.uniqueItems),
          );
        }
      }),
    );
    if (keys(errors).length > 0) {
      this.setState({
        errors,
      });
    } else {
      this.props.onSubmit(this.state.formData);
      if (this.props.resetAfterSubmit) {
        this.setState({
          formData: this.props.formData,
        });
      }
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema, onCancel, onSubmit } = this.props;
    const { formData } = this.state;

    return this.props.visual ? (
      <div className="ui wrapper">
        {map(formData.arrangement.items, tile => {
          let Tile = null;
          switch (formData.tiles[tile]['@type']) {
            case 'title':
              Tile = EditTitleTile;
              break;
            case 'description':
              Tile = EditDescriptionTile;
              break;
            case 'text':
              Tile = EditTextTile;
              break;
            case 'image':
              Tile = EditImageTile;
              break;
            case 'video':
              Tile = EditVideoTile;
              break;
            default:
              break;
          }
          return Tile !== null ? (
            <Tile
              key={tile}
              onChangeTile={this.onChangeTile}
              onChangeField={this.onChangeField}
              onDeleteTile={this.onDeleteTile}
              onSelectTile={this.onSelectTile}
              properties={formData}
              data={formData.tiles[tile]}
              pathname={this.props.pathname}
              tile={tile}
              selected={this.state.selected === tile}
            />
          ) : (
            <div />
          );
        })}
        <div>
          <Dropdown
            trigger={
              <Button
                basic
                circular
                icon="plus"
                title={
                  this.props.submitLabel
                    ? this.props.submitLabel
                    : this.props.intl.formatMessage(messages.save)
                }
              />
            }
            icon={null}
          >
            <Dropdown.Menu>
              <Dropdown.Header
                content={this.props.intl.formatMessage(messages.addTile)}
              />
              <Dropdown.Item onClick={this.onAddTile.bind(this, 'title')}>
                <FormattedMessage id="Title" defaultMessage="Title" />
              </Dropdown.Item>
              <Dropdown.Item onClick={this.onAddTile.bind(this, 'description')}>
                <FormattedMessage
                  id="Description"
                  defaultMessage="Description"
                />
              </Dropdown.Item>
              <Dropdown.Item onClick={this.onAddTile.bind(this, 'text')}>
                <FormattedMessage id="Text" defaultMessage="Text" />
              </Dropdown.Item>
              <Dropdown.Item onClick={this.onAddTile.bind(this, 'image')}>
                <FormattedMessage id="Image" defaultMessage="Image" />
              </Dropdown.Item>
              <Dropdown.Item onClick={this.onAddTile.bind(this, 'video')}>
                <FormattedMessage id="Video" defaultMessage="Video" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    ) : (
      <Container>
        <UiForm
          method="post"
          onSubmit={this.onSubmit}
          error={keys(this.state.errors).length > 0}
        >
          <Segment.Group raised>
            {schema.fieldsets.length > 1 && (
              <Tab
                menu={{
                  secondary: true,
                  pointing: true,
                  attached: true,
                  tabular: true,
                }}
                panes={map(schema.fieldsets, item => ({
                  menuItem: item.title,
                  render: () => [
                    this.props.title && (
                      <Segment secondary attached>
                        {this.props.title}
                      </Segment>
                    ),
                    ...map(item.fields, field => (
                      <Field
                        {...schema.properties[field]}
                        id={field}
                        value={this.state.formData[field]}
                        required={schema.required.indexOf(field) !== -1}
                        onChange={this.onChangeField}
                        key={field}
                        error={this.state.errors[field]}
                      />
                    )),
                  ],
                }))}
              />
            )}
            {schema.fieldsets.length === 1 && (
              <Segment>
                {this.props.title && (
                  <Segment className="primary">{this.props.title}</Segment>
                )}
                {this.props.description && (
                  <Segment secondary>{this.props.description}</Segment>
                )}
                {keys(this.state.errors).length > 0 && (
                  <Message
                    icon="warning"
                    negative
                    attached
                    header={this.props.intl.formatMessage(messages.error)}
                    content={this.props.intl.formatMessage(
                      messages.thereWereSomeErrors,
                    )}
                  />
                )}
                {this.props.error && (
                  <Message
                    icon="warning"
                    negative
                    attached
                    header={this.props.intl.formatMessage(messages.error)}
                    content={this.props.error.message}
                  />
                )}
                {map(schema.fieldsets[0].fields, field => (
                  <Field
                    {...schema.properties[field]}
                    id={field}
                    value={this.state.formData[field]}
                    required={schema.required.indexOf(field) !== -1}
                    onChange={this.onChangeField}
                    key={field}
                    error={this.state.errors[field]}
                  />
                ))}
              </Segment>
            )}
            {!this.props.hideActions && (
              <Segment className="actions" clearing>
                {onSubmit && (
                  <Button
                    basic
                    circular
                    primary
                    floated="right"
                    icon="arrow right"
                    type="submit"
                    title={
                      this.props.submitLabel
                        ? this.props.submitLabel
                        : this.props.intl.formatMessage(messages.save)
                    }
                    size="big"
                    loading={this.props.loading}
                  />
                )}
                {onCancel && (
                  <Button
                    basic
                    circular
                    secondary
                    icon="remove"
                    title={this.props.intl.formatMessage(messages.cancel)}
                    floated="right"
                    size="big"
                    onClick={onCancel}
                  />
                )}
              </Segment>
            )}
          </Segment.Group>
        </UiForm>
      </Container>
    );
  }
}

export default injectIntl(Form, { withRef: true });
