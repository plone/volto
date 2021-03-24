/**
 * A generic widget for an object. If multiple
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

import Field from '@plone/volto/components/manage/Form/Field';

/**
 * Renders a field set. Passes some of the values in the schema to the Field
 * component used inside. Shows the current value, the errors, the required
 * status of the fields inside.
 *
 * @param {object} data
 * @param {number} index
 * @param {object} schema
 * @param {object} value
 * @param {object} errors
 * @param {function} onChange
 * @param {string} id
 */
const FieldSet = ({
  data,
  index,
  schema,
  value,
  errors,
  onChange,
  onChangeBlock,
  id,
}) => {
  return data.fields.map((field, idx) => {
    const v = value?.[field] || schema.properties[field].defaultValue;
    return (
      <Field
        {...schema.properties[field]}
        id={`${field}-${idx}-${id}`}
        fieldset={data.title.toLowerCase()}
        value={v}
        objectvalue={value}
        required={schema.required?.indexOf(field) !== -1}
        onChange={(field2, fieldvalue) => {
          return onChange(id, { ...value, [field]: fieldvalue });
        }}
        key={field}
        error={errors?.[field]}
        title={schema.properties[field].title}
        onChangeBlock={onChangeBlock}
      />
    );
  });
};

/**
 *
 * Provides an automatic form for complex JS objects, based on a schema
 *
 * Creates an object widget with the given onChange handler and an ID. If there
 * are multiple field sets, it renders a Tab component with multiple tab panes.
 * Each tab has the title of the fieldset it renders.
 *
 * @param {object} schema Schema, follows Plone dexterity serialized schema
 * @param {object} value Object value, a JS object
 * @param {function} onChange Callback for object changed
 * @param {object} errors A list errors
 * @param {string} id Field id
 */
const ObjectWidget = ({
  schema,
  value, // not checked to not contain unknown fields
  onChange,
  errors = {},
  id,
  ...props
}) => {
  const createTab = React.useCallback(
    (fieldset, index) => {
      return {
        menuItem: fieldset.title,
        render: () => (
          <Tab.Pane>
            <FieldSet
              data={fieldset}
              index={index}
              schema={schema}
              errors={errors}
              value={value}
              onChange={onChange}
              id={id}
            />
          </Tab.Pane>
        ),
      };
    },
    [errors, id, onChange, schema, value],
  );

  return schema.fieldsets.length === 1 ? (
    <>
      <FieldSet
        data={schema.fieldsets[0]}
        index={0}
        schema={schema}
        errors={errors}
        value={value}
        onChange={onChange}
        id={id}
      />
    </>
  ) : (
    <Tab panes={schema.fieldsets.map(createTab)} /> // lazy loading
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ObjectWidget.propTypes = {
  id: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  errors: PropTypes.object,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ObjectWidget.defaultProps = {
  value: null,
};

export default ObjectWidget;
