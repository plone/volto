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
import { mergeForm, useForm, useTransform } from '@tanstack/react-form';
import {
  ServerValidateError,
  createServerValidate,
  formOptions,
  initialFormState,
} from '@tanstack/react-form/remix';
import { TextField } from '../components/TextField/TextField';
import { atom, useAtom, useSetAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { useHydrateAtoms } from 'jotai/utils';
import { useMemo } from 'react';
import type { WritableAtom } from 'jotai';
import type { ReactNode } from 'react';

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

const formAtom = atom({});

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

const ConsoleLog = ({ focusAtom }) => {
  const [title] = useAtom(focusAtom);
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

export default function Edit() {
  const { content, schema } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  console.log(schema);
  const form = useForm({
    defaultValues: content,
  });

  const useTitleAtom = ({ formAtom, field }) => {
    return useMemo(() => {
      return focusAtom(formAtom, (optic) => optic.prop(field));
    }, [formAtom, field]);
  };

  const titleAtom = useTitleAtom({ formAtom, field: 'title' });
  const setTitle = useSetAtom(titleAtom);

  // console.log('jotai title', setTitle);

  return (
    <HydrateAtoms atomValues={[[formAtom, content]]}>
      <main className="mx-4 flex h-screen flex-1 flex-col justify-center">
        <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-lg">
          <h1 className="mb-4 text-2xl font-bold">
            {content.title} - {t('cmsui.edit')}
          </h1>
          <Form method="post" onSubmit={form.handleSubmit}>
            <form.Field name="title">
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
            </form.Field>
            <div className="mt-4">
              <Button type="submit">{t('cmsui.save')}</Button>
            </div>
          </Form>
        </div>
        <ConsoleLog focusAtom={titleAtom} />
      </main>
    </HydrateAtoms>
  );
}
