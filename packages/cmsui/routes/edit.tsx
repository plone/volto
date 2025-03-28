import type { Route } from './+types/edit';
import { useRouteLoaderData } from 'react-router';
import { Form, NumberField, TextField } from '@plone/components';
import { useForm, Controller, type FieldValues } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';

import type { Content } from '@plone/types';
import type { ReactNode } from 'react';

import '@plone/components/dist/basic.css';

export const meta: Route.MetaFunction = () => {
  return [];
};

const dummySchema = {
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title' },
    foo: { type: 'integer', title: 'Foo' },
    bar: { type: 'string', title: 'Bar' },
  },
  required: ['foo'],
  additionalProperties: false,
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'foo', 'bar'],
    },
  ],
};

const fieldByType = {
  integer: NumberField,
  string: TextField,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: Route.LoaderArgs) {}

type FieldComponentImpl = {
  label: string | ReactNode;
  description: string | ReactNode;
  errorMessage: string | ReactNode | undefined;
};

type FieldTypes = 'integer' | 'string';

function Field(props: any) {
  const FieldComponent = fieldByType[props.type as FieldTypes];
  const { title: label, description, errorMessage } = props;

  return (
    <FieldComponent
      {...props}
      label={label}
      description={description}
      errorMessage={errorMessage}
    />
  );
}

function Fieldset({ id, title, fields, properties, form }) {
  return (
    <div id={`fieldset-${id}`}>
      <h3>{title}</h3>
      {fields.map((fieldId) => (
        <Controller
          key={fieldId}
          name={fieldId}
          control={form.control}
          render={({ field }) => {
            console.log({ field });
            return (
              <Field
                {...properties[fieldId]}
                {...field}
                errorMessage={form.formState.errors[fieldId]}
              />
            );
          }}
        />
      ))}
    </div>
  );
}

export default function Edit() {
  const data = useRouteLoaderData('root') as Content;
  const form = useForm({
    resolver: ajvResolver(dummySchema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log({ data });
  };
  const { handleSubmit } = form;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>{data.title}</h1>
      {dummySchema.fieldsets.map((fieldset) => (
        <Fieldset
          form={form}
          key={fieldset.id}
          id={fieldset.id}
          properties={dummySchema.properties}
          fields={fieldset.fields}
          title={fieldset.title}
        />
      ))}
    </Form>
  );

  // const pathname = useLocation().pathname;
  // return <App content={data} location={{ pathname }} />;
}
