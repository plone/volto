import {
  RouterContextProvider,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from 'react-router';
import { useTranslation } from 'react-i18next';
import { ploneClientContext } from 'seven/app/middleware.server';
import { requireAuthCookie } from '@plone/react-router';
import { Button, Container } from '@plone/components/quanta';
import { Plug } from '@plone/layout/components/Pluggable';
import ControlPanelsList from '../components/ControlPanel/ControlPanelsList';
import VersionOverview from '../components/VersionOverview/VersionOverview';
import Back from '@plone/components/icons/arrow-left.svg?react';

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const cli = context.get(ploneClientContext);

  const [controlpanelsRes, sysInfoRes] = await Promise.all([
    cli.getControlpanels(),
    cli.getSystem(),
  ]);
  return {
    controlpanels: controlpanelsRes.data,
    systemInformation: sysInfoRes.data,
  };
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
