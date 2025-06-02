import React from 'react';
import { Plug } from '../components/Pluggable';
import {
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import type PloneClient from '@plone/client';
import { requireAuthCookie } from '@plone/react-router';
import type { DeepKeys } from '@tanstack/react-form';
import Back from '@plone/components/icons/arrow-left.svg?react';
import { useAppForm } from '../components/Form/Form';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionItemTrigger,
  Button,
} from '@plone/components/tailwind';
import { InitAtoms } from '@plone/helpers';
import { atom } from 'jotai';
import type {
  Controlpanel,
  ControlPanelFieldset,
  ControlPanelSchema,
} from '@plone/types';
import Checkbox from '@plone/components/icons/checkbox.svg?react';
import config from '@plone/registry';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const token = await requireAuthCookie(request);

  const panel_id = params.id || 'navigation';

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const { data: controlpanel } = await cli.getControlpanel({ path: panel_id });
  return { controlpanel };
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

  // TODO: Activate update of control panel data
  // eslint-disable-next-line no-console
  console.warn('Updating control panel data not yet implemented');
  // console.log('formData', formData);
  // await cli.updateContent({
  //   path,
  //   data: formData,
  // });

  return redirect(`/controlpanel/${params.id}`);

  // return { ok: true };
}

const formAtom = atom<Controlpanel>({} as Controlpanel);

export default function SingleControlPanel() {
  const loaderData = useLoaderData<typeof loader>();
  const controlpanel = loaderData.controlpanel;
  const { filterControlPanelsSchema } = config.settings;
  const schema = filterControlPanelsSchema(controlpanel);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetcher = useFetcher();

  const form = useAppForm({
    defaultValues: controlpanel.data,
    onSubmit: async ({ value }) => {
      // bug fix: @ts-expect-error: For some reason, the type of value is not inferred correctly
      // as `useLoaderData` turns every "unknown" type into `undefined`
      fetcher.submit(value, {
        method: 'post',
        encType: 'application/json',
      });

      // return redirect(`/${content['@id']}`);
    },
  });

  // TODO: filter fields with filterControlPanelsSchema from config.settings
  return (
    <InitAtoms atomValues={[[formAtom, controlpanel.data]]}>
      <Plug pluggable="toolbar-top" id="button-back">
        <Button
          aria-label="back"
          size="L"
          onPress={() => navigate('/controlpanel')}
        >
          <Back />
        </Button>
      </Plug>
      <h1 className="documentFirstHeading">
        {controlpanel.title || 'a control panel'}
      </h1>
      <form>
        {schema.fieldsets.map((fieldset: ControlPanelFieldset) => (
          <Accordion defaultExpandedKeys={['default']} key={fieldset.id}>
            <AccordionItem id={fieldset.id} key={fieldset.id}>
              <AccordionItemTrigger>{fieldset.title}</AccordionItemTrigger>
              <AccordionPanel>
                {(fieldset.fields as DeepKeys<ControlPanelSchema>[]).map(
                  (schemaField, index) => (
                    <form.AppField
                      name={schemaField}
                      key={index}
                      // eslint-disable-next-line react/no-children-prop
                      children={(field) => (
                        <field.Quanta
                          {...schema.properties[schemaField]}
                          className="mb-4"
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
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
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
      </form>
    </InitAtoms>
  );
}
