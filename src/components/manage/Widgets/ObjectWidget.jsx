/**
 * A generic widget for an object. If multiple
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Segment } from 'semantic-ui-react';
import { Field, Icon } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

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
  block,
  data,
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
        fieldSet={data.title.toLowerCase()}
        block={block}
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
 * A JSON data editor widget based on a schema. If you want to represent complex
 * data using a single field, this is the widget to use.
 *
 * If there are multiple field sets, it renders a Tab component with multiple
 * tab panes. Each tab has the title of the fieldset it renders.
 */
const ObjectWidget = ({
  block,
  schema,
  value, // not checked to not contain unknown fields
  onChange,
  errors = {},
  id,
  ...props
}) => {
  const [currentActiveFieldset, setCurrentActiveFieldset] = React.useState(0);
  function handleCurrentActiveFieldset(e, blockProps) {
    const { index } = blockProps;
    const newIndex = currentActiveFieldset === index ? -1 : index;

    setCurrentActiveFieldset(newIndex);
  }
  return schema.fieldsets.length === 1 ? (
    <>
      <FieldSet
        block={block}
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
    schema.fieldsets.map((fieldset, index) => (
      <Accordion fluid styled className="form" key={fieldset.id}>
        <div key={fieldset.id} id={`blockform-fieldset-${fieldset.id}`}>
          <Accordion.Title
            active={currentActiveFieldset === index}
            index={index}
            onClick={handleCurrentActiveFieldset}
          >
            {fieldset.title && <>{fieldset.title}</>}
            {currentActiveFieldset === index ? (
              <Icon name={upSVG} size="20px" />
            ) : (
              <Icon name={downSVG} size="20px" />
            )}
          </Accordion.Title>
          <Accordion.Content active={currentActiveFieldset === index}>
            <AnimateHeight
              animateOpacity
              duration={500}
              height={currentActiveFieldset === index ? 'auto' : 0}
            >
              <Segment className="attached">
                <FieldSet
                  block={block}
                  data={fieldset}
                  index={index}
                  schema={schema}
                  errors={errors}
                  value={value}
                  onChange={onChange}
                  id={id}
                />
              </Segment>
            </AnimateHeight>
          </Accordion.Content>
        </div>
      </Accordion>
    ))
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
