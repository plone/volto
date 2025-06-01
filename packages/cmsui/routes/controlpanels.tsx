import { Button } from '@plone/components/tailwind';
import { Plug } from '../components/Pluggable';
import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import type PloneClient from '@plone/client';
import { requireAuthCookie } from '@plone/react-router';
import ControlPanelsList from '../components/ControlPanelsList/ControlPanelsList';
import { flattenToAppURL } from '@plone/helpers';
import Back from '@plone/components/icons/arrow-left.svg?react';
import config from '@plone/registry';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const token = await requireAuthCookie(request);

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  cli.config.token = token;

  const { data: controlpanels } = await cli.getControlpanels();
  const controlpanels_plusflattenedurl = controlpanels.map((panel) => {
    return {
      ...panel,
      href: flattenToAppURL(panel['@id']),
    };
  });
  return { controlpanels: controlpanels_plusflattenedurl };
}

export default function ControlPanels() {
  const { controlpanels } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Plug pluggable="toolbar-top" id="button-back">
        <Button aria-label="back" size="L" onPress={() => navigate('/')}>
          <Back />
        </Button>
      </Plug>
      <h1 className="documentFirstHeading">{t('cmsui.controlpanel')}</h1>
      <ControlPanelsList controlpanels={controlpanels ?? []} />
    </>
  );
}
