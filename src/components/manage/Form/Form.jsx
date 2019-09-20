/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, mapValues, omit, uniq, without } from 'lodash';
import move from 'lodash-move';
import {
  Button,
  Container,
  Form as UiForm,
  Segment,
  Tab,
  Message,
} from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';

import { EditTile, Icon, Field } from '../../../components';
import { getTilesFieldname, getTilesLayoutFieldname } from '../../../helpers';

import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

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
      definitions: PropTypes.objectOf(PropTypes.any),
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
      text: uuid(),
    };
    let { formData } = props;
    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);

    if (formData === null) {
      // get defaults from schema
      formData = mapValues(props.schema.properties, 'default');
    }
    // defaults for block editor; should be moved to schema on server side
    if (!formData[tilesLayoutFieldname]) {
      formData[tilesLayoutFieldname] = {
        items: [ids.title, ids.text],
      };
    }
    if (!formData[tilesFieldname]) {
      formData[tilesFieldname] = {
        [ids.title]: {
          '@type': 'title',
        },
        [ids.text]: {
          '@type': 'text',
        },
      };
    }
    this.state = {
      formData,
      errors: {},
      selected:
        formData[tilesLayoutFieldname].items.length > 0
          ? formData[tilesLayoutFieldname].items[0]
          : null,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    this.onSelectTile = this.onSelectTile.bind(this);
    this.onDeleteTile = this.onDeleteTile.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.onMoveTile = this.onMoveTile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocusPreviousTile = this.onFocusPreviousTile.bind(this);
    this.onFocusNextTile = this.onFocusNextTile.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
    const tilesFieldname = getTilesFieldname(this.state.formData);
    this.setState({
      formData: {
        ...this.state.formData,
        [tilesFieldname]: {
          ...this.state.formData[tilesFieldname],
          [id]: value || null,
        },
      },
    });
  }

  /**
   * Change tile handler
   * @method onMutateTile
   * @param {string} id Id of the tile
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onMutateTile(id, value) {
    const idTrailingTile = uuid();
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const index =
      this.state.formData[tilesLayoutFieldname].items.indexOf(id) + 1;

    this.setState({
      formData: {
        ...this.state.formData,
        [tilesFieldname]: {
          ...this.state.formData[tilesFieldname],
          [id]: value || null,
          [idTrailingTile]: {
            '@type': 'text',
          },
        },
        [tilesLayoutFieldname]: {
          items: [
            ...this.state.formData[tilesLayoutFieldname].items.slice(0, index),
            idTrailingTile,
            ...this.state.formData[tilesLayoutFieldname].items.slice(index),
          ],
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
   * @param {bool} selectPrev True if previous should be selected
   * @returns {undefined}
   */
  onDeleteTile(id, selectPrev) {
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState({
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          items: without(this.state.formData[tilesLayoutFieldname].items, id),
        },
        [tilesFieldname]: omit(this.state.formData[tilesFieldname], [id]),
      },
      selected: selectPrev
        ? this.state.formData[tilesLayoutFieldname].items[
            this.state.formData[tilesLayoutFieldname].items.indexOf(id) - 1
          ]
        : null,
    });
  }

  /**
   * Add tile handler
   * @method onAddTile
   * @param {string} type Type of the tile
   * @param {Number} index Index where to add the tile
   * @returns {string} Id of the tile
   */
  onAddTile(type, index) {
    const id = uuid();
    const idTrailingTile = uuid();
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const totalItems = this.state.formData[tilesLayoutFieldname].items.length;
    const insert = index === -1 ? totalItems : index;

    this.setState({
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          items: [
            ...this.state.formData[tilesLayoutFieldname].items.slice(0, insert),
            id,
            ...(type !== 'text' ? [idTrailingTile] : []),
            ...this.state.formData[tilesLayoutFieldname].items.slice(insert),
          ],
        },
        [tilesFieldname]: {
          ...this.state.formData[tilesFieldname],
          [id]: {
            '@type': type,
          },
          ...(type !== 'text' && {
            [idTrailingTile]: {
              '@type': 'text',
            },
          }),
        },
      },
      selected: id,
    });

    return id;
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
   * Move tile handler
   * @method onMoveTile
   * @param {number} dragIndex Drag index.
   * @param {number} hoverIndex Hover index.
   * @returns {undefined}
   */
  onMoveTile(dragIndex, hoverIndex) {
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState({
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          items: move(
            this.state.formData[tilesLayoutFieldname].items,
            dragIndex,
            hoverIndex,
          ),
        },
      },
    });
  }

  /**
   *
   * @method onFocusPreviousTile
   * @param {string} currentTile The id of the current tile
   * @param {node} tileNode The id of the current tile
   * @returns {undefined}
   */
  onFocusPreviousTile(currentTile, tileNode) {
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const currentIndex = this.state.formData[
      tilesLayoutFieldname
    ].items.indexOf(currentTile);

    if (currentIndex === 0) {
      // We are already at the top tile don't do anything
      return;
    }
    const newindex = currentIndex - 1;
    tileNode.blur();

    this.onSelectTile(
      this.state.formData[tilesLayoutFieldname].items[newindex],
    );
  }

  /**
   *
   * @method onFocusNextTile
   * @param {string} currentTile The id of the current tile
   * @param {node} tileNode The id of the current tile
   * @returns {undefined}
   */
  onFocusNextTile(currentTile, tileNode) {
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const currentIndex = this.state.formData[
      tilesLayoutFieldname
    ].items.indexOf(currentTile);

    if (
      currentIndex ===
      this.state.formData[tilesLayoutFieldname].items.length - 1
    ) {
      // We are already at the bottom tile don't do anything
      return;
    }

    const newindex = currentIndex + 1;
    tileNode.blur();

    this.onSelectTile(
      this.state.formData[tilesLayoutFieldname].items[newindex],
    );
  }

  /**
   * handleKeyDown, sports a way to disable the listeners via an options named
   * parameter
   * @method handleKeyDown
   * @param {object} e Event
   * @param {number} index Tile index
   * @param {string} tile Tile type
   * @param {node} node The tile node
   * @returns {undefined}
   */
  handleKeyDown(
    e,
    index,
    tile,
    node,
    {
      disableEnter = false,
      disableArrowUp = false,
      disableArrowDown = false,
    } = {},
  ) {
    if (e.key === 'ArrowUp' && !disableArrowUp) {
      this.onFocusPreviousTile(tile, node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown) {
      this.onFocusNextTile(tile, node);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter) {
      this.onAddTile('text', index + 1);
      e.preventDefault();
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
    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
    const renderTiles = formData[tilesLayoutFieldname].items;
    const tilesDict = formData[tilesFieldname];
    return this.props.visual ? (
      <div className="ui wrapper">
        {map(renderTiles, (tile, index) => (
          <EditTile
            id={tile}
            index={index}
            type={tilesDict[tile]['@type']}
            key={tile}
            handleKeyDown={this.handleKeyDown}
            onAddTile={this.onAddTile}
            onChangeTile={this.onChangeTile}
            onMutateTile={this.onMutateTile}
            onChangeField={this.onChangeField}
            onDeleteTile={this.onDeleteTile}
            onSelectTile={this.onSelectTile}
            onMoveTile={this.onMoveTile}
            onFocusPreviousTile={this.onFocusPreviousTile}
            onFocusNextTile={this.onFocusNextTile}
            properties={formData}
            data={tilesDict[tile]}
            pathname={this.props.pathname}
            tile={tile}
            selected={this.state.selected === tile}
          />
        ))}
        <Portal
          node={__CLIENT__ && document.getElementById('sidebar-metadata')}
        >
          <UiForm
            method="post"
            onSubmit={this.onSubmit}
            error={keys(this.state.errors).length > 0}
          >
            {map(schema.fieldsets, item => [
              <Segment secondary attached key={item.title}>
                {item.title}
              </Segment>,
              <Segment attached key={`fieldset-contents-${item.title}`}>
                {map(item.fields, (field, index) => (
                  <Field
                    {...schema.properties[field]}
                    id={field}
                    focus={index === 0}
                    value={this.state.formData[field]}
                    required={schema.required.indexOf(field) !== -1}
                    onChange={this.onChangeField}
                    key={field}
                    error={this.state.errors[field]}
                  />
                ))}
              </Segment>,
            ])}
          </UiForm>
        </Portal>
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
                  className: 'formtabs',
                }}
                panes={map(schema.fieldsets, item => ({
                  menuItem: item.title,
                  render: () => [
                    this.props.title && (
                      <Segment secondary attached key={this.props.title}>
                        {this.props.title}
                      </Segment>
                    ),
                    ...map(item.fields, (field, index) => (
                      <Field
                        {...schema.properties[field]}
                        id={field}
                        fieldSet={item.title.toLowerCase()}
                        focus={index === 0}
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
                    primary
                    floated="right"
                    type="submit"
                    aria-label={
                      this.props.submitLabel
                        ? this.props.submitLabel
                        : this.props.intl.formatMessage(messages.save)
                    }
                    title={
                      this.props.submitLabel
                        ? this.props.submitLabel
                        : this.props.intl.formatMessage(messages.save)
                    }
                    loading={this.props.loading}
                  >
                    <Icon className="circled" name={aheadSVG} size="30px" />
                  </Button>
                )}
                {onCancel && (
                  <Button
                    basic
                    secondary
                    aria-label={this.props.intl.formatMessage(messages.cancel)}
                    title={this.props.intl.formatMessage(messages.cancel)}
                    floated="right"
                    onClick={onCancel}
                  >
                    <Icon className="circled" name={clearSVG} size="30px" />
                  </Button>
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
