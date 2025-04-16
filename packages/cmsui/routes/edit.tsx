import { useTranslation } from 'react-i18next';
import {
  Form,
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import type PloneClient from '@plone/client';
import config from '@plone/registry';
import { requireAuthCookie } from './auth/auth';
import { Button } from '@plone/components/tailwind';
import { mergeForm, useTransform } from '@tanstack/react-form';
import type { DeepKeys } from '@tanstack/react-form';

import {
  ServerValidateError,
  createServerValidate,
  formOptions,
  initialFormState,
} from '@tanstack/react-form/remix';
import { atom, useAtom, useSetAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { useHydrateAtoms } from 'jotai/utils';
import { useCallback, useMemo } from 'react';
import type { PrimitiveAtom, WritableAtom } from 'jotai';
import type { ReactNode } from 'react';
import type { Content } from '@plone/types';
import type { OpticFor } from 'optics-ts';

// import Field from '../components/Form/Field';
import { useAppForm } from '../components/Form/Form';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const path = `/${params['*'] || ''}`;

  const { data: content } = await cli.getContent({ path });
  const { data: schema } = await cli.getType({ contentType: content['@type'] });

  return { content, schema };
}

export async function action({ params, request }: ActionFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const path = `/${params['*'] || ''}`;

  const formData = await request.formData();

  await cli.updateContent({
    path,
    data: Object.fromEntries(formData),
  });

  return redirect(path);
}

const formAtom = atom<Content>({} as Content);

const HydrateAtoms = ({
  atomValues,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  atomValues: Iterable<
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: ReactNode;
}) => {
  // initialising on state with prop on render here
  useHydrateAtoms(new Map(atomValues));
  return children;
};

const useTitleAtom = ({ formAtom, field }) => {
  return useMemo(() => {
    return focusAtom(formAtom, (optic) => optic.prop(field));
  }, [formAtom, field]);
};

const ConsoleLog = () => {
  const titleAtom = useTitleAtom({ formAtom, field: 'title' });
  const title = useSetAtom(titleAtom);
  const [formData, setFormData] = useAtom(formAtom);

  return (
    <div className="mt-4">
      <pre>
        Global form data main JOTAI atom{' '}
        {JSON.stringify(formData.title, null, 2)}
      </pre>
      <pre>
        Focused atom GETTER on title key {JSON.stringify(title, null, 2)}
      </pre>
    </div>
  );
};

export function useFocusAtom<T>({
  anAtom,
  field,
}: {
  anAtom: PrimitiveAtom<T>;
  field: DeepKeys<T>;
}) {
  return useSetAtom(
    focusAtom(
      anAtom,
      // @ts-ignore
      useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
    ),
  );
}

export default function Edit() {
  const { content, schema } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  const form = useAppForm({
    defaultValues: content,
  });

  return (
    <HydrateAtoms atomValues={[[formAtom, content]]}>
      <main className="mx-4 flex h-screen flex-1 flex-col justify-center">
        <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-lg">
          <h1 className="mb-4 text-2xl font-bold">
            {content.title} - {t('cmsui.edit')}
          </h1>
          <Form method="post" onSubmit={form.handleSubmit}>
            {(schema.fieldsets[0].fields as DeepKeys<Content>[]).map(
              (schemaField, index) => (
                <form.AppField
                  name={schemaField}
                  key={index}
                  // eslint-disable-next-line react/no-children-prop
                  children={(field) => (
                    <field.Quanta
                      {...schema.properties[schemaField]}
                      label={schema.properties[field.name].title}
                      name={field.name}
                      defaultValue={field.state.value}
                      required={schema.required.indexOf(schemaField) !== -1}
                      error={field.state.meta.errors}
                      formAtom={formAtom}
                    />
                  )}
                />
              ),
            )}
            {/* <form.Field name="title">
              {(field) => {
                return (
                  <div className="mb-8">
                    <TextField
                      label={schema.properties[field.name].title}
                      name={field.name}
                      defaultValue={field.state.value}
                      onChange={(value) => {
                        setTitle(value);
                        return field.handleChange(value);
                      }}
                    />
                    {field.state.meta.errors.map((error) => (
                      <p key={error as string}>{error}</p>
                    ))}
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="description">
              {(field) => {
                return (
                  <div>
                    <TextField
                      label={schema.properties[field.name].title}
                      name={field.name}
                      defaultValue={field.state.value}
                      onChange={(value) => {
                        setTitle(value);
                        return field.handleChange(value);
                      }}
                    />
                    {field.state.meta.errors.map((error) => (
                      <p key={error as string}>{error}</p>
                    ))}
                  </div>
                );
              }}
            </form.Field> */}
            <div className="mt-4">
              <Button type="submit">{t('cmsui.save')}</Button>
            </div>
          </Form>
        </div>
        <ConsoleLog />
      </main>
    </HydrateAtoms>
  );
}
