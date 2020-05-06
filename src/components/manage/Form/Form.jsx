/**
 * Form component.
 * @module components/manage/Form/Form
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  findIndex,
  isEmpty,
  keys,
  map,
  mapValues,
  omit,
  pickBy,
  uniq,
  without,
} from 'lodash';
import move from 'lodash-move';
import isBoolean from 'lodash/isBoolean';
import {
  Button,
  Container,
  Form as UiForm,
  Segment,
  Tab,
  Message,
} from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';

import { EditBlock, Icon, Field } from '@plone/volto/components';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import { difference } from '@plone/volto/helpers';

import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  addBlock: {
    id: 'Add block...',
    defaultMessage: 'Add block...',
  },
  required: {
    id: 'Required input is missing.',
    defaultMessage: 'Required input is missing.',
  },
  minLength: {
    id: 'Minimum length is {len}.',
    defaultMessage: 'Minimum length is {len}.',
  },
  maxLength: {
    id: 'Maximum length is {len}.',
    defaultMessage: 'Maximum length is {len}.',
  },
  minimum: {
    id: 'Minimum value is {len}.',
    defaultMessage: 'Minimum value is {len}.',
  },
  maximum: {
    id: 'Maximum value is {len}.',
    defaultMessage: 'Maximum value is {len}.',
  },
  uniqueItems: {
    id: 'Items must be unique.',
    defaultMessage: 'Items must be unique.',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  isNumber: {
    id: 'number',
    defaultMessage: 'Input must be number',
  },
  isInteger: {
    id: 'integer',
    defaultMessage: 'Input must be integer',
  },
  isValidEmail: {
    id: 'email',
    defaultMessage: 'Input must be valid email (something@domain.com)',
  },
  isValidURL: {
    id: 'url',
    defaultMessage:
      'Input must be valid url (www.something.com or http(s)://www.something.com)',
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
 * Will return the intl message if invalid
 * @param {boolean} isValid
 * @param {string} maxCriterion
 * @param {string | number} valueToCompare can compare '47' < 50
 * @param {Function} intlFunc
 */
const validationMessage = (isValid, maxCriterion, valueToCompare, intlFunc) =>
  !isValid
    ? intlFunc(messages[maxCriterion], {
        len: valueToCompare,
      })
    : null;
/**
 * Returns if based on the criterion the value is lower or equal
 * @param {string | number} value can compare '47' < 50
 * @param {string | number} valueToCompare can compare '47' < 50
 * @param {string} minCriterion
 * @param {Function} intlFunc
 */
const isMaxPropertyValid = (value, valueToCompare, minCriterion, intlFunc) => {
  const isValid = valueToCompare !== undefined ? value <= valueToCompare : true;
  return validationMessage(isValid, minCriterion, valueToCompare, intlFunc);
};
/**
 * Returns if based on the criterion the value is higher or equal
 * @param {string | number} value can compare '47' < 50
 * @param {string | number} valueToCompare can compare '47' < 50
 * @param {string} minCriterion
 * @param {Function} intlFunc
 */
const isMinPropertyValid = (value, valueToCompare, maxCriterion, intlFunc) => {
  const isValid = valueToCompare !== undefined ? value >= valueToCompare : true;
  return validationMessage(isValid, maxCriterion, valueToCompare, intlFunc);
};

const widgetValidation = {
  email: {
    isValidEmail: (emailValue, emailObj, intlFunc) => {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const isValid = emailRegex.test(emailValue);
      return !isValid ? intlFunc(messages.isValidEmail) : null;
    },
    minLength: (emailValue, emailObj, intlFunc) =>
      isMinPropertyValid(
        emailValue.length,
        emailObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (emailValue, emailObj, intlFunc) =>
      isMaxPropertyValid(
        emailValue.length,
        emailObj.maxLength,
        'maxLength',
        intlFunc,
      ),
  },
  url: {
    isValidURL: (urlValue, urlObj, intlFunc) => {
      const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
      const isValid = urlRegex.test(urlValue);
      return !isValid ? intlFunc(messages.isValidURL) : null;
    },
    minLength: (urlValue, urlObj, intlFunc) =>
      isMinPropertyValid(
        urlValue.length,
        urlObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (urlValue, urlObj, intlFunc) =>
      isMaxPropertyValid(
        urlValue.length,
        urlObj.maxLength,
        'maxLength',
        intlFunc,
      ),
  },
  password: {
    minLength: (passwordValue, passwordObj, intlFunc) =>
      isMinPropertyValid(
        passwordValue.length,
        passwordObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (passwordValue, passwordObj, intlFunc) =>
      isMaxPropertyValid(
        passwordValue.length,
        passwordObj.maxLength,
        'maxLength',
        intlFunc,
      ),
  },
  string: {
    minLength: (value, itemObj, intlFunc) =>
      isMinPropertyValid(
        value.length,
        itemObj.minLength,
        'minLength',
        intlFunc,
      ),
    maxLength: (value, itemObj, intlFunc) =>
      isMaxPropertyValid(
        value.length,
        itemObj.maxLengthj,
        'maxLength',
        intlFunc,
      ),
  },
  number: {
    isNumber: (value, itemObj, intlFunc) => {
      const floatRegex = /^[+-]?\d+(\.\d+)?$/;
      const isValid = !isNaN(value) && floatRegex.test(value);
      return !isValid ? intlFunc(messages.isNumber) : null;
    },
    minimum: (value, itemObj, intlFunc) =>
      isMinPropertyValid(value, itemObj.minimum, 'minimum', intlFunc),
    maximum: (value, itemObj, intlFunc) =>
      isMaxPropertyValid(value, itemObj.maximum, 'maximum', intlFunc),
  },
  integer: {
    isInteger: (value, itemObj, intlFunc) => {
      const intRegex = /^-?[0-9]+$/;
      const isValid = !isNaN(value) && intRegex.test(value);
      return !isValid ? intlFunc(messages.isInteger) : null;
    },
    minimum: (value, itemObj, intlFunc) =>
      isMinPropertyValid(value, itemObj.minimum, 'minimum', intlFunc),
    maximum: (value, itemObj, intlFunc) =>
      isMaxPropertyValid(value, itemObj.maximum, 'maximum', intlFunc),
  },
};

/**
 * The string that comes my not be a valid JSON
 * @param {string} requestItem
 */
const tryParseJSON = requestItem => {
  let resultObj = null;
  try {
    resultObj = JSON.parse(requestItem);
  } catch (e) {
    try {
      resultObj = JSON.parse(requestItem.replace(/'/g, '"'));
    } catch (e) {
      resultObj = null;
    }
  }
  return resultObj;
};

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
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    isEditForm: PropTypes.bool,
    title: PropTypes.string,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
    description: PropTypes.string,
    visual: PropTypes.bool,
    blocks: PropTypes.arrayOf(PropTypes.object),
    requestError: PropTypes.string,
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
    isEditForm: false,
    title: null,
    description: null,
    error: null,
    loading: null,
    hideActions: false,
    visual: false,
    blocks: [],
    pathname: '',
    schema: {},
    requestError: null,
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
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

    if (!props.isEditForm) {
      // It's a normal (add form), get defaults from schema
      formData = {
        ...mapValues(props.schema.properties, 'default'),
        ...formData,
      };
    }
    // defaults for block editor; should be moved to schema on server side
    // Adding fallback in case the fields are empty, so we are sure that the edit form
    // shows at least the default blocks
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
          '@type': 'text',
        },
      };
    }
    this.state = {
      formData,
      initialFormData: { ...formData },
      isFormPrestine: true,
      errors: {},
      activeIndex: 0,
      selected:
        formData[blocksLayoutFieldname].items.length > 0
          ? formData[blocksLayoutFieldname].items[0]
          : null,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onBlurField = this.onBlurField.bind(this);
    this.onClickInput = this.onClickInput.bind(this);
    this.onChangeBlock = this.onChangeBlock.bind(this);
    this.onMutateBlock = this.onMutateBlock.bind(this);
    this.onSelectBlock = this.onSelectBlock.bind(this);
    this.onDeleteBlock = this.onDeleteBlock.bind(this);
    this.onAddBlock = this.onAddBlock.bind(this);
    this.onMoveBlock = this.onMoveBlock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocusPreviousBlock = this.onFocusPreviousBlock.bind(this);
    this.onFocusNextBlock = this.onFocusNextBlock.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  /**
   * The first Fieldset (Tab) that has any errors
   * will be selected
   * @param {Object[]} errors
   * @param {string} errors[].field
   * @param {string[]} errors[].message
   * @returns {number} activeIndex
   */
  showFirstTabWithErrors(errors) {
    let activeIndex = 0;

    this.props.schema.fieldsets.some((fieldSet, index) => {
      let foundfield = fieldSet.fields.some(fieldId => errors[fieldId]);

      activeIndex = foundfield ? index : activeIndex;
      return foundfield;
    });

    return activeIndex;
  }

  /**
   * Create the errors object from backend the same way it is done on Frontend validation
   * @param {string} requestError form the server
   * @returns {Object}
   */
  giveServerErrorsToCorrespondingFields(requestError) {
    let errorsList = tryParseJSON(requestError);
    const errors = {};

    if (Array.isArray(errorsList) && errorsList.length > 0) {
      errorsList.forEach(errorItem => {
        errors[errorItem.field] = errors[errorItem.field]
          ? errors[errorItem.field].push(errorItem.message)
          : [errorItem.message];
      });
    }
    return errors;
  }

  /**
   * On updates caused by props change
   * if errors from Backend come, these will be shown to their corresponding Fields
   * also the first Tab to have any errors will be selected
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    let { requestError } = this.props;
    let errors = {};
    let activeIndex = 0;

    if (prevProps.requestError !== this.props.requestError && requestError) {
      errors = this.giveServerErrorsToCorrespondingFields(requestError);
      activeIndex = this.showFirstTabWithErrors(errors);
      this.setState({
        errors,
        activeIndex,
      });
    }
  }

  /**
   * Tab selection is done only by setting activeIndex in state
   */
  onTabChange(e, { activeIndex }) {
    this.setState({ activeIndex });
  }

  /**
   * If user clicks on input, the form will be not considered pristine
   * this will avoid onBlur effects without interraction with the form
   * @param {Object} e event
   */
  onClickInput(e) {
    this.setState({ isFormPrestine: false });
  }

  /**
   * Validate fields on blur
   * @method onBlurField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onBlurField(id, value) {
    if (!this.state.isFormPrestine) {
      const errors = this.validateFieldsPerFieldset();

      if (keys(errors).length > 0) {
        this.setState({
          errors,
        });
      }
    }
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
    this.setState(prevState => {
      const { errors, formData } = prevState;
      delete errors[id];
      return {
        errors,
        formData: {
          ...formData,
          // We need to catch also when the value equals false this fixes #888
          [id]:
            value || (value !== undefined && isBoolean(value)) ? value : null,
        },
      };
    });
  }

  /**
   * Change block handler
   * @method onChangeBlock
   * @param {string} id Id of the block
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onChangeBlock(id, value) {
    const blocksFieldname = getBlocksFieldname(this.state.formData);
    this.setState({
      formData: {
        ...this.state.formData,
        [blocksFieldname]: {
          ...this.state.formData[blocksFieldname],
          [id]: value || null,
        },
      },
    });
  }

  /**
   * Change block handler
   * @method onMutateBlock
   * @param {string} id Id of the block
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onMutateBlock(id, value) {
    const idTrailingBlock = uuid();
    const blocksFieldname = getBlocksFieldname(this.state.formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const index =
      this.state.formData[blocksLayoutFieldname].items.indexOf(id) + 1;

    this.setState({
      formData: {
        ...this.state.formData,
        [blocksFieldname]: {
          ...this.state.formData[blocksFieldname],
          [id]: value || null,
          [idTrailingBlock]: {
            '@type': 'text',
          },
        },
        [blocksLayoutFieldname]: {
          items: [
            ...this.state.formData[blocksLayoutFieldname].items.slice(0, index),
            idTrailingBlock,
            ...this.state.formData[blocksLayoutFieldname].items.slice(index),
          ],
        },
      },
    });
  }

  /**
   * Select block handler
   * @method onSelectBlock
   * @param {string} id Id of the field
   * @returns {undefined}
   */
  onSelectBlock(id) {
    this.setState({
      selected: id,
    });
  }

  /**
   * Delete block handler
   * @method onDeleteBlock
   * @param {string} id Id of the field
   * @param {bool} selectPrev True if previous should be selected
   * @returns {undefined}
   */
  onDeleteBlock(id, selectPrev) {
    const blocksFieldname = getBlocksFieldname(this.state.formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);

    this.setState({
      formData: {
        ...this.state.formData,
        [blocksLayoutFieldname]: {
          items: without(this.state.formData[blocksLayoutFieldname].items, id),
        },
        [blocksFieldname]: omit(this.state.formData[blocksFieldname], [id]),
      },
      selected: selectPrev
        ? this.state.formData[blocksLayoutFieldname].items[
            this.state.formData[blocksLayoutFieldname].items.indexOf(id) - 1
          ]
        : null,
    });
  }

  /**
   * Add block handler
   * @method onAddBlock
   * @param {string} type Type of the block
   * @param {Number} index Index where to add the block
   * @returns {string} Id of the block
   */
  onAddBlock(type, index) {
    const id = uuid();
    const idTrailingBlock = uuid();
    const blocksFieldname = getBlocksFieldname(this.state.formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const totalItems = this.state.formData[blocksLayoutFieldname].items.length;
    const insert = index === -1 ? totalItems : index;

    this.setState({
      formData: {
        ...this.state.formData,
        [blocksLayoutFieldname]: {
          items: [
            ...this.state.formData[blocksLayoutFieldname].items.slice(
              0,
              insert,
            ),
            id,
            ...(type !== 'text' ? [idTrailingBlock] : []),
            ...this.state.formData[blocksLayoutFieldname].items.slice(insert),
          ],
        },
        [blocksFieldname]: {
          ...this.state.formData[blocksFieldname],
          [id]: {
            '@type': type,
          },
          ...(type !== 'text' && {
            [idTrailingBlock]: {
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
   * Returns errors if obj has unique Items
   * @param {Object} field
   * @param {*} fieldData
   * @returns {Object[string]} - list of errors
   */
  hasUniqueItems(field, fieldData) {
    const errors = [];
    if (
      field.uniqueItems &&
      fieldData &&
      uniq(fieldData).length !== fieldData.length
    ) {
      errors.push(this.props.intl.formatMessage(messages.uniqueItems));
    }
    return errors;
  }

  /**
   * If required fields are undefined, return list of errors
   * @returns {Object[string]} - list of errors
   */
  validateRequiredFields() {
    const errors = {};

    map(this.props.schema.required, requiredField => {
      if (!this.state.formData[requiredField]) {
        errors[requiredField] = [];
        errors[requiredField].push(
          this.props.intl.formatMessage(messages.required),
        );
      }
    });

    return errors;
  }

  /**
   * Return list of errors if field constraints are not respected
   * (ex min, max, maxLength, email format, url format etc)
   * each potential criterion has a validation process in widgetValidation
   * !!ONLY fields with data will be tested (those undefined are ignored here)
   * @returns {Object[string]} - list of errors
   */
  validateFieldsPerFieldset() {
    const errors = this.validateRequiredFields();

    map(this.props.schema.properties, (field, fieldId) => {
      const fieldWidgetType = field.widget || field.type;
      const widgetValidationCriteria = widgetValidation[fieldWidgetType]
        ? Object.keys(widgetValidation[fieldWidgetType])
        : [];
      let fieldData = this.state.formData[fieldId];
      // test each criterion ex maximum, isEmail, isUrl, maxLength etc
      const fieldErrors = widgetValidationCriteria
        .map(widgetCriterion => {
          const errorMessage =
            fieldData === undefined || fieldData === null
              ? null
              : widgetValidation[fieldWidgetType][widgetCriterion](
                  fieldData,
                  field,
                  this.props.intl.formatMessage,
                );
          return errorMessage;
        })
        .filter(item => !!item);

      const uniqueErrors = this.hasUniqueItems(field, fieldData);
      const mergedErrors = [...fieldErrors, ...uniqueErrors];

      if (mergedErrors.length > 0) {
        errors[fieldId] = [
          ...(errors[fieldId] || []),
          ...fieldErrors,
          ...uniqueErrors,
        ];
      }
    });

    return errors;
  }

  /**
   * Submit handler also validate form and collect errors
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    const errors = this.validateFieldsPerFieldset();

    if (keys(errors).length > 0) {
      this.setState({
        errors,
      });
    } else {
      // Get only the values that have been modified (Edit forms), send all in case that
      // it's an add form
      if (this.props.isEditForm) {
        this.props.onSubmit(this.getOnlyFormModifiedValues());
      } else {
        this.props.onSubmit(this.state.formData);
      }
      if (this.props.resetAfterSubmit) {
        this.setState({
          formData: this.props.formData,
        });
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
    const fieldsModified = Object.keys(
      difference(this.state.formData, this.state.initialFormData),
    );
    return pickBy(this.state.formData, (value, key) =>
      fieldsModified.includes(key),
    );
  };

  /**
   * Move block handler
   * @method onMoveBlock
   * @param {number} dragIndex Drag index.
   * @param {number} hoverIndex Hover index.
   * @returns {undefined}
   */
  onMoveBlock(dragIndex, hoverIndex) {
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);

    this.setState({
      formData: {
        ...this.state.formData,
        [blocksLayoutFieldname]: {
          items: move(
            this.state.formData[blocksLayoutFieldname].items,
            dragIndex,
            hoverIndex,
          ),
        },
      },
    });
  }

  /**
   *
   * @method onFocusPreviousBlock
   * @param {string} currentBlock The id of the current block
   * @param {node} blockNode The id of the current block
   * @returns {undefined}
   */
  onFocusPreviousBlock(currentBlock, blockNode) {
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const currentIndex = this.state.formData[
      blocksLayoutFieldname
    ].items.indexOf(currentBlock);

    if (currentIndex === 0) {
      // We are already at the top block don't do anything
      return;
    }
    const newindex = currentIndex - 1;
    blockNode.blur();

    this.onSelectBlock(
      this.state.formData[blocksLayoutFieldname].items[newindex],
    );
  }

  /**
   *
   * @method onFocusNextBlock
   * @param {string} currentBlock The id of the current block
   * @param {node} blockNode The id of the current block
   * @returns {undefined}
   */
  onFocusNextBlock(currentBlock, blockNode) {
    const blocksLayoutFieldname = getBlocksLayoutFieldname(this.state.formData);
    const currentIndex = this.state.formData[
      blocksLayoutFieldname
    ].items.indexOf(currentBlock);

    if (
      currentIndex ===
      this.state.formData[blocksLayoutFieldname].items.length - 1
    ) {
      // We are already at the bottom block don't do anything
      return;
    }

    const newindex = currentIndex + 1;
    blockNode.blur();

    this.onSelectBlock(
      this.state.formData[blocksLayoutFieldname].items[newindex],
    );
  }

  /**
   * handleKeyDown, sports a way to disable the listeners via an options named
   * parameter
   * @method handleKeyDown
   * @param {object} e Event
   * @param {number} index Block index
   * @param {string} block Block type
   * @param {node} node The block node
   * @returns {undefined}
   */
  handleKeyDown(
    e,
    index,
    block,
    node,
    {
      disableEnter = false,
      disableArrowUp = false,
      disableArrowDown = false,
    } = {},
  ) {
    if (e.key === 'ArrowUp' && !disableArrowUp) {
      this.onFocusPreviousBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown) {
      this.onFocusNextBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter) {
      this.onAddBlock('text', index + 1);
      e.preventDefault();
    }
  }

  /**
   * Removed blocks and blocks_layout fields from the form.
   * @method removeBlocksLayoutFields
   * @param {object} schema The schema definition of the form.
   * @returns A modified copy of the given schema.
   */
  removeBlocksLayoutFields = schema => {
    const newSchema = { ...schema };
    const layoutFieldsetIndex = findIndex(
      newSchema.fieldsets,
      fieldset => fieldset.id === 'layout',
    );
    if (layoutFieldsetIndex > -1) {
      const layoutFields = newSchema.fieldsets[layoutFieldsetIndex].fields;
      newSchema.fieldsets[layoutFieldsetIndex].fields = layoutFields.filter(
        field => field !== 'blocks' && field !== 'blocks_layout',
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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema: originalSchema, onCancel, onSubmit } = this.props;
    const { formData } = this.state;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const renderBlocks = formData[blocksLayoutFieldname]?.items;
    const blocksDict = formData[blocksFieldname];
    const schema = this.removeBlocksLayoutFields(originalSchema);

    return this.props.visual ? (
      <div className="ui container">
        {map(renderBlocks, (block, index) => (
          <EditBlock
            id={block}
            index={index}
            type={blocksDict[block]['@type']}
            key={block}
            handleKeyDown={this.handleKeyDown}
            onAddBlock={this.onAddBlock}
            onChangeBlock={this.onChangeBlock}
            onMutateBlock={this.onMutateBlock}
            onChangeField={this.onChangeField}
            onDeleteBlock={this.onDeleteBlock}
            onSelectBlock={this.onSelectBlock}
            onMoveBlock={this.onMoveBlock}
            onFocusPreviousBlock={this.onFocusPreviousBlock}
            onFocusNextBlock={this.onFocusNextBlock}
            properties={formData}
            data={blocksDict[block]}
            pathname={this.props.pathname}
            block={block}
            selected={this.state.selected === block}
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
            {schema &&
              map(schema.fieldsets, item => [
                <Segment secondary attached key={item.title}>
                  {item.title}
                </Segment>,
                <Segment attached key={`fieldset-contents-${item.title}`}>
                  {map(item.fields, (field, index) => (
                    <Field
                      {...schema.properties[field]}
                      id={field}
                      focus={false}
                      value={this.state.formData[field]}
                      required={schema.required.indexOf(field) !== -1}
                      onChange={this.onChangeField}
                      onBlur={this.onBlurField}
                      onClick={this.onClickInput}
                      key={field}
                      error={this.state.errors[field]}
                      typeField={field.type}
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
            {schema && schema.fieldsets.length > 1 && (
              <Tab
                menu={{
                  secondary: true,
                  pointing: true,
                  attached: true,
                  tabular: true,
                  className: 'formtabs',
                }}
                onTabChange={this.onTabChange}
                activeIndex={this.state.activeIndex}
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
                        onBlur={this.onBlurField}
                        onClick={this.onClickInput}
                        key={field}
                        error={this.state.errors[field]}
                        typeField={field.type}
                      />
                    )),
                  ],
                }))}
              />
            )}
            {schema && schema.fieldsets.length === 1 && (
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
                    onBlur={this.onBlurField}
                    onClick={this.onClickInput}
                    key={field}
                    error={this.state.errors[field]}
                    typeField={field.type}
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

export default injectIntl(Form, { forwardRef: true });
