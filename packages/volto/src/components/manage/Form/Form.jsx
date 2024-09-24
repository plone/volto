/**
 * Form component.
 * @module components/manage/Form/Form
 */

import { Icon, Toast } from '@plone/volto/components';
import { Field, BlocksForm } from '@plone/volto/components/manage/Form';
import BlocksToolbar from '@plone/volto/components/manage/Form/BlocksToolbar';
import UndoToolbar from '@plone/volto/components/manage/Form/UndoToolbar';
import {
  difference,
  FormValidation,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  messages,
} from '@plone/volto/helpers';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import {
  findIndex,
  isEmpty,
  isEqual,
  keys,
  map,
  mapValues,
  pickBy,
  without,
  cloneDeep,
  xor,
} from 'lodash';
import isBoolean from 'lodash/isBoolean';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import {
  Accordion,
  Button,
  Container as SemanticContainer,
  Form as UiForm,
  Message,
  Segment,
  Tab,
} from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import {
  setMetadataFieldsets,
  resetMetadataFocus,
  setSidebarTab,
  setFormData,
  setUIState,
} from '@plone/volto/actions';
import { compose } from 'redux';
import config from '@plone/volto/registry';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';

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
    }),
    formData: PropTypes.objectOf(PropTypes.any),
    globalData: PropTypes.objectOf(PropTypes.any),
    metadataFieldsets: PropTypes.arrayOf(PropTypes.string),
    metadataFieldFocus: PropTypes.string,
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    resetOnCancel: PropTypes.bool,
    isEditForm: PropTypes.bool,
    isAdminForm: PropTypes.bool,
    title: PropTypes.string,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
    description: PropTypes.string,
    visual: PropTypes.bool,
    blocks: PropTypes.arrayOf(PropTypes.object),
    isFormSelected: PropTypes.bool,
    onSelectForm: PropTypes.func,
    editable: PropTypes.bool,
    onChangeFormData: PropTypes.func,
    requestError: PropTypes.string,
    allowedBlocks: PropTypes.arrayOf(PropTypes.string),
    showRestricted: PropTypes.bool,
    global: PropTypes.bool,
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
    resetOnCancel: false,
    isEditForm: false,
    isAdminForm: false,
    title: null,
    description: null,
    error: null,
    loading: null,
    hideActions: false,
    visual: false,
    blocks: [],
    pathname: '',
    schema: {},
    isFormSelected: true,
    onSelectForm: null,
    editable: true,
    requestError: null,
    allowedBlocks: null,
    global: false,
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
    let { formData, schema: originalSchema } = props;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

    const schema = this.removeBlocksLayoutFields(originalSchema);

    this.props.setMetadataFieldsets(
      schema?.fieldsets ? schema.fieldsets.map((fieldset) => fieldset.id) : [],
    );

    if (!props.isEditForm) {
      // It's a normal (add form), get defaults from schema
      formData = {
        ...mapValues(props.schema.properties, 'default'),
        ...formData,
      };
    }

    // We initialize the formData snapshot in here, before the initial data checks
    const initialFormData = cloneDeep(formData);

    // Adding fallback in case the fields are empty, so we are sure that the edit form
    // shows at least the default blocks
    if (
      formData.hasOwnProperty(blocksFieldname) &&
      formData.hasOwnProperty(blocksLayoutFieldname)
    ) {
      if (
        !formData[blocksLayoutFieldname] ||
        isEmpty(formData[blocksLayoutFieldname].items)
      ) {
        formData[blocksLayoutFieldname] = {
          items: [ids.title, ids.text],
        };
      }
      if (!formData[blocksFieldname] || isEmpty(formData[blocksFieldname])) {
        formData[blocksFieldname] = {
          [ids.title]: {
            '@type': 'title',
          },
          [ids.text]: {
            '@type': config.settings.defaultBlockType,
          },
        };
      }
    }

    let selectedBlock = null;
    if (
      formData.hasOwnProperty(blocksLayoutFieldname) &&
      formData[blocksLayoutFieldname].items.length > 0
    ) {
      if (config.blocks?.initialBlocksFocus === null) {
        selectedBlock = null;
      } else if (this.props.type in config.blocks?.initialBlocksFocus) {
        // Default selected is not the first block, but the one from config.
        // TODO Select first block and not an arbitrary one.
        Object.keys(formData[blocksFieldname]).forEach((b_key) => {
          if (
            formData[blocksFieldname][b_key]['@type'] ===
            config.blocks?.initialBlocksFocus?.[this.props.type]
          ) {
            selectedBlock = b_key;
          }
        });
      } else {
        selectedBlock = formData[blocksLayoutFieldname].items[0];
      }
    }

    // Sync state to global state
    if (this.props.global) {
      this.props.setFormData(formData);
    }

    this.props.setUIState({
      selected: selectedBlock,
      multiSelected: [],
      hovered: null,
    });

    // Set initial state
    this.state = {
      formData,
      initialFormData,
      errors: {},
      isClient: false,
      // Ensure focus remain in field after change
      inFocus: {},
      sidebarMetadataIsAvailable: false,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onSelectBlock = this.onSelectBlock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onBlurField = this.onBlurField.bind(this);
    this.onClickInput = this.onClickInput.bind(this);
    this.onToggleMetadataFieldset = this.onToggleMetadataFieldset.bind(this);
  }

  /**
   * On updates caused by props change
   * if errors from Backend come, these will be shown to their corresponding Fields
   * also the first Tab to have any errors will be selected
   * @param {Object} prevProps
   */
  async componentDidUpdate(prevProps, prevState) {
    let { requestError } = this.props;
    let errors = {};
    let activeIndex = 0;

    if (!this.props.isFormSelected && prevProps.isFormSelected) {
      this.props.setUIState({
        selected: null,
      });
    }

    if (requestError && prevProps.requestError !== requestError) {
      errors =
        FormValidation.giveServerErrorsToCorrespondingFields(requestError);
      activeIndex = FormValidation.showFirstTabWithErrors({
        errors,
        schema: this.props.schema,
      });

      this.setState({
        errors,
        activeIndex,
      });
    }

    if (this.props.onChangeFormData) {
      if (!isEqual(prevState?.formData, this.state.formData)) {
        this.props.onChangeFormData(this.state.formData);
      }
    }
    if (
      this.props.global &&
      !isEqual(this.props.globalData, prevProps.globalData)
    ) {
      this.setState({
        formData: this.props.globalData,
      });
    }

    if (!isEqual(prevProps.schema, this.props.schema)) {
      this.props.setMetadataFieldsets(
        this.removeBlocksLayoutFields(this.props.schema).fieldsets.map(
          (fieldset) => fieldset.id,
        ),
      );
    }

    if (
      this.props.metadataFieldFocus !== '' &&
      !isEqual(prevProps.metadataFieldFocus, this.props.metadataFieldFocus)
    ) {
      // Scroll into view
      document
        .querySelector(`.field-wrapper-${this.props.metadataFieldFocus}`)
        .scrollIntoView();

      // Set focus to first input if available
      document
        .querySelector(`.field-wrapper-${this.props.metadataFieldFocus} input`)
        ?.focus();

      // Reset focus field
      this.props.resetMetadataFocus();
    }

    if (
      !this.state.sidebarMetadataIsAvailable &&
      document.getElementById('sidebar-metadata')
    ) {
      this.setState(() => ({ sidebarMetadataIsAvailable: true }));
    }
  }

  /**
   * Tab selection is done only by setting activeIndex in state
   */
  onTabChange(e, { activeIndex }) {
    const defaultFocus = this.props.schema.fieldsets[activeIndex].fields[0];
    this.setState({
      activeIndex,
      ...(defaultFocus ? { inFocus: { [defaultFocus]: true } } : {}),
    });
  }

  /**
   * If user clicks on input, the form will be not considered pristine
   * this will avoid onBlur effects without interaction with the form
   * @param {Object} e event
   */
  onClickInput(e) {
    this.setState({ isFormPristine: false });
  }

  /**
   * Validate fields on blur
   * @method onBlurField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onBlurField(id, value) {
    if (!this.state.isFormPristine) {
      const errors = FormValidation.validateFieldsPerFieldset({
        schema: this.props.schema,
        formData: this.state.formData,
        formatMessage: this.props.intl.formatMessage,
        touchedField: { [id]: value },
      });

      this.setState({
        errors,
      });
    }
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
  }

  /**
   * Change field handler
   * Remove errors for changed field
   * @method onChangeField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onChangeField(id, value) {
    this.setState((prevState) => {
      const { errors, formData } = prevState;
      const newFormData = {
        ...formData,
        // We need to catch also when the value equals false this fixes #888
        [id]: value || (value !== undefined && isBoolean(value)) ? value : null,
      };
      delete errors[id];
      if (this.props.global) {
        this.props.setFormData(newFormData);
      }
      return {
        errors,
        formData: newFormData,
        // Changing the form data re-renders the select widget which causes the
        // focus to get lost. To circumvent this, we set the focus back to
        // the input.
        // This could fix other widgets too but currently targeted
        // against the select widget only.
        // Ensure field to be in focus after the change
        inFocus: { [id]: true },
      };
    });
  }

  /**
   * Select block handler
   * @method onSelectBlock
   * @param {string} id Id of the field
   * @param {string} isMultipleSelection true if multiple blocks are selected
   * @returns {undefined}
   */
  onSelectBlock(id, isMultipleSelection, event) {
    let multiSelected = [];
    let selected = id;
    const formData = this.state.formData;

    if (isMultipleSelection) {
      selected = null;
      const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

      const blocks_layout = formData[blocksLayoutFieldname].items;

      if (event.shiftKey) {
        const anchor =
          this.props.uiState.multiSelected.length > 0
            ? blocks_layout.indexOf(this.props.uiState.multiSelected[0])
            : blocks_layout.indexOf(this.props.uiState.selected);
        const focus = blocks_layout.indexOf(id);

        if (anchor === focus) {
          multiSelected = [id];
        } else if (focus > anchor) {
          multiSelected = [...blocks_layout.slice(anchor, focus + 1)];
        } else {
          multiSelected = [...blocks_layout.slice(focus, anchor + 1)];
        }
        window.getSelection().empty();
      }

      if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
        multiSelected = this.props.uiState.multiSelected || [];
        if (!this.props.uiState.multiSelected.includes(this.state.selected)) {
          multiSelected = [...multiSelected, this.props.uiState.selected];
          selected = null;
        }
        if (this.props.uiState.multiSelected.includes(id)) {
          selected = null;
          multiSelected = without(multiSelected, id);
        } else {
          multiSelected = [...multiSelected, id];
        }
      }
    }

    this.props.setUIState({
      selected,
      multiSelected,
      gridSelected: null,
    });

    if (this.props.onSelectForm) {
      if (event) event.nativeEvent.stopImmediatePropagation();
      this.props.onSelectForm();
    }
  }

  /**
   * Cancel handler
   * It prevents event from triggering submit, reset form if props.resetAfterSubmit
   * and calls this.props.onCancel
   * @method onCancel
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    if (this.props.resetOnCancel || this.props.resetAfterSubmit) {
      this.setState({
        formData: this.props.formData,
      });
      if (this.props.global) {
        this.props.setFormData(this.props.formData);
      }
    }
    this.props.onCancel(event);
  }

  /**
   * Submit handler also validate form and collect errors
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    const formData = this.state.formData;

    if (event) {
      event.preventDefault();
    }

    const errors = this.props.schema
      ? FormValidation.validateFieldsPerFieldset({
          schema: this.props.schema,
          formData,
          formatMessage: this.props.intl.formatMessage,
        })
      : {};

    let blocksErrors = {};

    if (hasBlocksData(formData)) {
      // Validate blocks
      const blocks = this.state.formData[getBlocksFieldname(formData)];
      const blocksLayout =
        this.state.formData[getBlocksLayoutFieldname(formData)];
      const defaultSchema = {
        properties: {},
        fieldsets: [],
        required: [],
      };
      blocksLayout.items.forEach((block) => {
        let blockSchema =
          config.blocks.blocksConfig[blocks[block]['@type']].blockSchema ||
          defaultSchema;
        if (typeof blockSchema === 'function') {
          blockSchema = blockSchema({
            intl: this.props.intl,
            formData: blocks[block],
          });
        }
        const blockErrors = FormValidation.validateFieldsPerFieldset({
          schema: blockSchema,
          formData: blocks[block],
          formatMessage: this.props.intl.formatMessage,
        });
        if (keys(blockErrors).length > 0) {
          blocksErrors = {
            ...blocksErrors,
            [block]: { ...blockErrors },
          };
        }
      });
    }

    if (keys(errors).length > 0 || keys(blocksErrors).length > 0) {
      const activeIndex = FormValidation.showFirstTabWithErrors({
        errors,
        schema: this.props.schema,
      });

      this.setState({
        errors: {
          ...errors,
          ...(!isEmpty(blocksErrors) && { blocks: blocksErrors }),
        },
        activeIndex,
      });

      if (keys(errors).length > 0) {
        // Changes the focus to the metadata tab in the sidebar if error
        Object.keys(errors).forEach((err) =>
          toast.error(
            <Toast
              error
              title={this.props.schema.properties[err].title || err}
              content={errors[err].join(', ')}
            />,
          ),
        );
        this.props.setSidebarTab(0);
      } else if (keys(blocksErrors).length > 0) {
        const errorField = Object.entries(
          Object.entries(blocksErrors)[0][1],
        )[0][0];
        const errorMessage = Object.entries(
          Object.entries(blocksErrors)[0][1],
        )[0][1];
        toast.error(
          <Toast
            error
            title={this.props.intl.formatMessage(
              messages.blocksFieldsErrorTitle,
              { errorField },
            )}
            content={errorMessage}
          />,
        );
        this.props.setSidebarTab(1);
        this.props.setUIState({
          selected: Object.keys(blocksErrors)[0],
          multiSelected: [],
          hovered: null,
        });
      }
    } else {
      // Get only the values that have been modified (Edit forms), send all in case that
      // it's an add form
      if (this.props.isEditForm) {
        this.props.onSubmit(this.getOnlyFormModifiedValues());
      } else {
        this.props.onSubmit(formData);
      }
      if (this.props.resetAfterSubmit) {
        this.setState({
          formData: this.props.formData,
        });
        if (this.props.global) {
          this.props.setFormData(this.props.formData);
        }
      }
    }
  }

  /**
   * getOnlyFormModifiedValues handler
   * It returns only the values of the fields that are have really changed since the
   * form was loaded. Useful for edit forms and PATCH operations, when we only want to
   * send the changed data.
   * @method getOnlyFormModifiedValues
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  getOnlyFormModifiedValues = () => {
    const formData = this.state.formData;

    const fieldsModified = Object.keys(
      difference(formData, this.state.initialFormData),
    );
    return {
      ...pickBy(formData, (value, key) => fieldsModified.includes(key)),
      ...(formData['@static_behaviors'] && {
        '@static_behaviors': formData['@static_behaviors'],
      }),
    };
  };

  /**
   * Removed blocks and blocks_layout fields from the form.
   * @method removeBlocksLayoutFields
   * @param {object} schema The schema definition of the form.
   * @returns A modified copy of the given schema.
   */
  removeBlocksLayoutFields = (schema) => {
    const newSchema = { ...schema };
    const layoutFieldsetIndex = findIndex(
      newSchema.fieldsets,
      (fieldset) => fieldset.id === 'layout',
    );
    if (layoutFieldsetIndex > -1) {
      const layoutFields = newSchema.fieldsets[layoutFieldsetIndex].fields;
      newSchema.fieldsets[layoutFieldsetIndex].fields = layoutFields.filter(
        (field) => field !== 'blocks' && field !== 'blocks_layout',
      );
      if (newSchema.fieldsets[layoutFieldsetIndex].fields.length === 0) {
        newSchema.fieldsets = [
          ...newSchema.fieldsets.slice(0, layoutFieldsetIndex),
          ...newSchema.fieldsets.slice(layoutFieldsetIndex + 1),
        ];
      }
    }
    return newSchema;
  };

  /**
   * Toggle metadata fieldset handler
   * @method onToggleMetadataFieldset
   * @param {Object} event Event object.
   * @param {Object} blockProps Block properties.
   * @returns {undefined}
   */
  onToggleMetadataFieldset(event, blockProps) {
    const { index } = blockProps;
    this.props.setMetadataFieldsets(xor(this.props.metadataFieldsets, [index]));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { settings } = config;
    const {
      schema: originalSchema,
      onCancel,
      onSubmit,
      navRoot,
      type,
      metadataFieldsets,
    } = this.props;
    const formData = this.state.formData;
    const schema = this.removeBlocksLayoutFields(originalSchema);
    const Container =
      config.getComponent({ name: 'Container' }).component || SemanticContainer;

    return this.props.visual ? (
      // Removing this from SSR is important, since react-beautiful-dnd supports SSR,
      // but draftJS don't like it much and the hydration gets messed up
      this.state.isClient && (
        <>
          <SlotRenderer
            name="aboveContent"
            content={this.props.content}
            navRoot={navRoot}
          />

          <Container>
            <>
              <BlocksToolbar
                formData={formData}
                selectedBlock={this.props.uiState.selected}
                selectedBlocks={this.props.uiState.multiSelected}
                onChangeBlocks={(newBlockData) => {
                  const newFormData = {
                    ...formData,
                    ...newBlockData,
                  };
                  this.setState({
                    formData: newFormData,
                  });
                  if (this.props.global) {
                    this.props.setFormData(newFormData);
                  }
                }}
                onSetSelectedBlocks={(blockIds) =>
                  this.props.setUIState({ multiSelected: blockIds })
                }
                onSelectBlock={this.onSelectBlock}
              />
              <UndoToolbar
                state={{
                  formData,
                  selected: this.props.uiState.selected,
                  multiSelected: this.props.uiState.multiSelected,
                }}
                enableHotKeys
                onUndoRedo={({ state }) => {
                  if (this.props.global) {
                    this.props.setFormData(state.formData);
                  }
                  return this.setState(state);
                }}
              />
              <BlocksForm
                onChangeFormData={(newData) => {
                  const newFormData = {
                    ...formData,
                    ...newData,
                  };
                  this.setState({
                    formData: newFormData,
                  });
                  if (this.props.global) {
                    this.props.setFormData(newFormData);
                  }
                }}
                onChangeField={this.onChangeField}
                onSelectBlock={this.onSelectBlock}
                properties={formData}
                navRoot={navRoot}
                type={type}
                pathname={this.props.pathname}
                selectedBlock={this.props.uiState.selected}
                multiSelected={this.props.uiState.multiSelected}
                manage={this.props.isAdminForm}
                allowedBlocks={this.props.allowedBlocks}
                showRestricted={this.props.showRestricted}
                editable={this.props.editable}
                isMainForm={this.props.editable}
                // Properties to pass to the BlocksForm to match the View ones
                history={this.props.history}
                location={this.props.location}
                token={this.props.token}
                errors={this.state.errors}
                blocksErrors={this.state.errors.blocks}
              />
              {this.state.isClient &&
                this.state.sidebarMetadataIsAvailable &&
                this.props.editable &&
                createPortal(
                  <UiForm
                    method="post"
                    onSubmit={this.onSubmit}
                    error={keys(this.state.errors).length > 0}
                  >
                    {schema &&
                      map(schema.fieldsets, (fieldset) => (
                        <Accordion
                          fluid
                          styled
                          className="form"
                          key={fieldset.title}
                        >
                          <div
                            key={fieldset.id}
                            id={`metadataform-fieldset-${fieldset.id}`}
                          >
                            <Accordion.Title
                              active={metadataFieldsets.includes(fieldset.id)}
                              index={fieldset.id}
                              onClick={this.onToggleMetadataFieldset}
                            >
                              {fieldset.title}
                              {metadataFieldsets.includes(fieldset.id) ? (
                                <Icon name={upSVG} size="20px" />
                              ) : (
                                <Icon name={downSVG} size="20px" />
                              )}
                            </Accordion.Title>
                            <Accordion.Content
                              active={metadataFieldsets.includes(fieldset.id)}
                            >
                              <Segment className="attached">
                                {map(fieldset.fields, (field, index) => (
                                  <Field
                                    {...schema.properties[field]}
                                    id={field}
                                    fieldSet={fieldset.title.toLowerCase()}
                                    formData={formData}
                                    focus={
                                      this.state.isClient &&
                                      document
                                        .getElementById('sidebar-metadata')
                                        ?.contains(document.activeElement)
                                        ? this.state.inFocus[field]
                                        : false
                                    }
                                    value={formData?.[field]}
                                    required={
                                      schema.required.indexOf(field) !== -1
                                    }
                                    onChange={this.onChangeField}
                                    onBlur={this.onBlurField}
                                    onClick={this.onClickInput}
                                    key={field}
                                    error={this.state.errors[field]}
                                  />
                                ))}
                              </Segment>
                            </Accordion.Content>
                          </div>
                        </Accordion>
                      ))}
                  </UiForm>,
                  document.getElementById('sidebar-metadata'),
                )}

              <SlotRenderer
                name="belowContent"
                content={this.props.content}
                navRoot={navRoot}
              />
            </>
          </Container>
        </>
      )
    ) : (
      <Container>
        <UiForm
          method="post"
          onSubmit={this.onSubmit}
          error={keys(this.state.errors).length > 0}
          className={settings.verticalFormTabs ? 'vertical-form' : ''}
        >
          <fieldset className="invisible">
            <Segment.Group raised>
              {schema && schema.fieldsets.length > 1 && (
                <>
                  {settings.verticalFormTabs && this.props.title && (
                    <Segment secondary attached key={this.props.title}>
                      {this.props.title}
                    </Segment>
                  )}
                  <Tab
                    menu={{
                      secondary: true,
                      pointing: true,
                      attached: true,
                      tabular: true,
                      className: 'formtabs',
                      vertical: settings.verticalFormTabs,
                    }}
                    grid={{ paneWidth: 9, tabWidth: 3, stackable: true }}
                    onTabChange={this.onTabChange}
                    activeIndex={this.state.activeIndex}
                    panes={map(schema.fieldsets, (item) => ({
                      menuItem: item.title,
                      render: () => [
                        !settings.verticalFormTabs && this.props.title && (
                          <Segment secondary attached key={this.props.title}>
                            {this.props.title}
                          </Segment>
                        ),
                        item.description && (
                          <Message attached="bottom">
                            {item.description}
                          </Message>
                        ),
                        ...map(item.fields, (field, index) => (
                          <Field
                            {...schema.properties[field]}
                            id={field}
                            formData={formData}
                            fieldSet={item.id}
                            focus={this.state.inFocus[field]}
                            value={formData?.[field]}
                            required={schema.required.indexOf(field) !== -1}
                            onChange={
                              this.props.editable
                                ? this.onChangeField
                                : () => {}
                            }
                            onBlur={this.onBlurField}
                            onClick={this.onClickInput}
                            key={field}
                            error={this.state.errors[field]}
                          />
                        )),
                      ],
                    }))}
                  />
                </>
              )}
              {schema && schema.fieldsets.length === 1 && (
                <Segment>
                  {this.props.title && (
                    <Segment className="primary">
                      <h1 style={{ fontSize: '16px' }}> {this.props.title}</h1>
                    </Segment>
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
                  {map(schema.fieldsets[0].fields, (field) => (
                    <Field
                      {...schema.properties[field]}
                      id={field}
                      value={formData?.[field]}
                      required={schema.required.indexOf(field) !== -1}
                      onChange={this.onChangeField}
                      onBlur={this.onBlurField}
                      onClick={this.onClickInput}
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
                      aria-label={this.props.intl.formatMessage(
                        messages.cancel,
                      )}
                      title={this.props.intl.formatMessage(messages.cancel)}
                      floated="right"
                      onClick={this.onCancel}
                    >
                      <Icon className="circled" name={clearSVG} size="30px" />
                    </Button>
                  )}
                </Segment>
              )}
            </Segment.Group>
          </fieldset>
        </UiForm>
      </Container>
    );
  }
}

const FormIntl = injectIntl(Form, { forwardRef: true });

export default compose(
  connect(
    (state, props) => ({
      content: state.content.data,
      globalData: state.form?.global,
      uiState: state.form?.ui,
      metadataFieldsets: state.sidebar?.metadataFieldsets,
      metadataFieldFocus: state.sidebar?.metadataFieldFocus,
    }),
    {
      setMetadataFieldsets,
      setSidebarTab,
      setFormData,
      setUIState,
      resetMetadataFocus,
    },
    null,
    { forwardRef: true },
  ),
)(FormIntl);
