import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import type PloneClient from '@plone/client';
import { requireAuthCookie } from '@plone/react-router';
import { Button, Container } from '@plone/components/quanta';
import { Plug } from '@plone/layout/components/Pluggable';
import ControlPanelsList from '../components/ControlPanel/ControlPanelsList';
import VersionOverview from '../components/VersionOverview/VersionOverview';
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
  const { data: systemInformation } = await cli.getSystem();
  return { controlpanels, systemInformation };
}

export default function ControlPanels() {
  const { controlpanels, systemInformation } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <main>
      <Plug pluggable="toolbar-top" id="button-back">
        <Button aria-label="back" size="L" onPress={() => navigate('/')}>
          <Back />
        </Button>
      </Plug>
      <Container width="default" className="route-controlpanel">
        <h1 className="documentFirstHeading">{t('cmsui.controlpanel')}</h1>
        <ControlPanelsList controlpanels={controlpanels ?? []} />
        <VersionOverview {...systemInformation} />
      </Container>
    </main>
  );
}
