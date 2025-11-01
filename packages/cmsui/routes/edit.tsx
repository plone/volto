import { useTranslation } from 'react-i18next';
import {
  data,
  redirect,
  useFetcher,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type SubmitTarget,
} from 'react-router';
import type PloneClient from '@plone/client';
import config from '@plone/registry';
import { requireAuthCookie } from '@plone/react-router';
import type { DeepKeys } from '@tanstack/react-form';
import { flattenToAppURL, InitAtoms } from '@plone/helpers';
import type { Content } from '@plone/types';
import { Plug } from '@plone/layout/components/Pluggable';
import Checkbox from '@plone/components/icons/checkbox.svg?react';

import TopNavBar from '../components/Layout/TopNavBar';
import { useAppForm } from '../components/Form/Form';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionItemTrigger,
  Button,
  Tabs,
} from '@plone/components/quanta';
import BlockEditor from '../components/BlockEditor/BlockEditor';
import Sidebar from '../components/Sidebar/Sidebar';

// import { ConsoleLog } from '../helpers/debug';
import { formAtom, store } from './atoms';
import { Provider } from 'jotai';

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

  return data(flattenToAppURL({ content, schema }));
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

  const formData = await request.json();

  await cli.updateContent({
    path,
    data: formData,
  });

  return redirect(path);
}

export default function Edit() {
  const { content, schema } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const fetcher = useFetcher();

  const form = useAppForm({
    defaultValues: content,
    onSubmit: async () => {
      fetcher.submit(store.get(formAtom) as unknown as SubmitTarget, {
        method: 'post',
        encType: 'application/json',
      });

      return redirect(`/${content['@id']}`);
    },
  });

  return (
    <Provider store={store}>
      <InitAtoms atomValues={[[formAtom, content]]}>
        <div id="main">
          <TopNavBar />
          <h1 className="m-4 text-2xl font-bold">
            {content.title} - {t('cmsui.edit')}
          </h1>
          <main className="mx-4 mt-8 flex h-screen flex-auto gap-8">
            <Tabs
              tabs={[
                {
                  id: 'blocks',
                  title: t('cmsui.blocksEditor.blocksTab'),
                  content: <BlockEditor formAtom={formAtom}></BlockEditor>,
                },
                {
                  id: 'content',
                  title: t('cmsui.blocksEditor.contentTab'),
                  content: (
                    <div className="flex flex-col">
                      <form>
                        {schema.fieldsets.map((fieldset) => (
                          <Accordion
                            defaultExpandedKeys={['default']}
                            key={fieldset.id}
                          >
                            <AccordionItem id={fieldset.id} key={fieldset.id}>
                              <AccordionItemTrigger>
                                {fieldset.title}
                              </AccordionItemTrigger>
                              <AccordionPanel>
                                {(fieldset.fields as DeepKeys<Content>[]).map(
                                  (schemaField, index) => (
                                    <form.AppField
                                      name={schemaField}
                                      key={index}
                                      // eslint-disable-next-line react/no-children-prop
                                      children={(field) => (
                                        <field.Quanta
                                          {...schema.properties[schemaField]}
                                          className="mb-4"
                                          label={
                                            schema.properties[field.name].title
                                          }
                                          name={field.name}
                                          defaultValue={field.state.value}
                                          required={
                                            schema.required.indexOf(
                                              schemaField,
                                            ) !== -1
                                          }
                                          error={field.state.meta.errors}
                                          formAtom={formAtom}
                                          value={field.state.value}
                                        />
                                      )}
                                    />
                                  ),
                                )}
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </form>
                      {/* <div className="mt-4">
                        <ConsoleLog supressHydrationWarnings formAtom={formAtom} />
                      </div> */}
                    </div>
                  ),
                },
              ]}
            />
          </main>
        </div>
        <Plug pluggable="toolbar-top" id="edit-save-button">
          <Button
            aria-label={t('cmsui.save')}
            type="submit"
            // Trigger the TS form submission
            onPress={() => form.handleSubmit()}
            variant="primary"
            accent
            size="L"
          >
            <Checkbox />
          </Button>
        </Plug>
        <Sidebar />
      </InitAtoms>
    </Provider>
  );
}
