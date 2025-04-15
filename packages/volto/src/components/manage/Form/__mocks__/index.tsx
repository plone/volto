import type { JSONSchema } from '@plone/types';
import type { Ref } from 'react';
import { vi } from 'vitest';
import { forwardRef } from 'react';

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

export const Field = vi.fn((props) => (
  <div className="Field" id={props.id}>
    {props.title}
  </div>
));

export const InlineForm = vi.fn((props) => (
  <div
    id="InlineForm"
    data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
  />
));

export const ModalForm = vi.fn((props) => (
  <div
    id="ModalForm"
    data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
  />
));

export const UndoToolbar = vi.fn(() => <div id="UndoToolbar" />);

export const BlocksToolbar = vi.fn(() => <div id="BlocksToolbar" />);

export const BlockDataForm = vi.fn((props) => (
  <div
    id="BlockDataForm"
    data-schema={JSON.stringify(cleanupSchema(props.schema), null, 2)}
  />
));

export const BlocksForm = vi.fn((props) => (
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

export const Form = vi.fn((props) => <MockForm {...props} />);
