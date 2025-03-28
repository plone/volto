import type { Route } from './+types/edit';
import { useRouteLoaderData } from 'react-router';
import { Form, NumberField, TextField } from '@plone/components';
import { useForm, Controller, type FieldValues } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';

import type { Content } from '@plone/types';

// import type { JSONSchemaType } from 'ajv';
// import type { ReactNode } from 'react';

import '@plone/components/dist/basic.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: Route.LoaderArgs) {}

export const meta: Route.MetaFunction = () => {
  return [];
};

const schema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Title',
      description: <strong>React description</strong>,
    },
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

// type FieldComponentImpl = {
//   label: string | ReactNode;
//   description: string | ReactNode;
//   errorMessage: string | ReactNode | undefined;
// };

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

type FieldsetProps = {
  id: string;
  title: string;
  required: string[];
  fields: string[]; // JSONSchemaType<any>[];
  form: any;
  properties: any;
};

function Fieldset({
  id,
  title,
  fields,
  properties,
  form,
  required,
}: FieldsetProps) {
  return (
    <div id={`fieldset-${id}`}>
      <h3>{title}</h3>
      {fields.map((fieldId) => (
        <Controller
          key={fieldId}
          name={fieldId}
          control={form.control}
          render={({ field }) => {
            // eslint-disable-next-line no-console
            console.log({ field });
            return (
              <Field
                {...properties[fieldId]}
                {...field}
                required={required}
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
    resolver: ajvResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    // eslint-disable-next-line no-console
    console.log({ data });
  };
  const { handleSubmit } = form;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>{data.title}</h1>
      {schema.fieldsets.map((fieldset) => (
        <Fieldset
          form={form}
          key={fieldset.id}
          id={fieldset.id}
          properties={schema.properties}
          fields={fieldset.fields}
          title={fieldset.title}
          required={schema.required}
        />
      ))}
    </Form>
  );

  // const pathname = useLocation().pathname;
  // return <App content={data} location={{ pathname }} />;
}
