import type { JSONSchema } from '@plone/types';
import type { Ref } from 'react';
const { forwardRef } = jest.requireActual('react');

// Field descriptions can contain react elements and those are not JSON stringifiable
const cleanupSchema = (schema: JSONSchema | null): JSONSchema | null => {
  if (!schema || !schema.properties) return schema;
  return {
    ...schema,
    properties: Object.entries(schema.properties).reduce<Record<string, any>>(
      (acc, [key, value]) => {
        acc[key] = {
          ...value,
          description:
            typeof value.description === 'string'
              ? value.description
              : undefined,
        };
        return acc;
      },
      {},
    ),
  };
};

export const Field = jest.fn((props) => (
  <div className="Field" id={props.id}>
    {props.title}
  </div>
));

export const InlineForm = jest.fn((props) => (
  <div
    id="InlineForm"
    data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
  />
));

export const ModalForm = jest.fn((props) => (
  <div
    id="ModalForm"
    data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
  />
));

export const UndoToolbar = jest.fn(() => <div id="UndoToolbar" />);

export const BlocksToolbar = jest.fn(() => <div id="BlocksToolbar" />);

export const BlockDataForm = jest.fn((props) => (
  <div
    id="BlockDataForm"
    data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
  />
));

export const BlocksForm = jest.fn((props) => (
  <div
    id="BlocksForm"
    data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
  />
));

const MockForm = forwardRef(
  (props: { schema: JSONSchema | null }, ref: Ref<any>) => (
    <div
      id="Form"
      data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
      ref={ref}
    />
  ),
);

export const Form = jest.fn((props) => <MockForm {...props} />);
