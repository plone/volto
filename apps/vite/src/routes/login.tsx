import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { flattenToAppURL } from '../utils';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { usePloneClient } from '@plone/providers';
import { Breadcrumbs, RenderBlocks } from '@plone/components';
import config from '@plone/registry';
import { Login } from '@plone/slots/Login';
import { asd } from '@plone/slots/Login/test';

import { Container } from '@plone/components';

const expand = ['breadcrumbs', 'navigation'];

export const Route = createFileRoute('/login')({
  // loader: ({ context: { queryClient, ploneClient }, location }) => {
  //   const { getContentQuery } = ploneClient;
  //   return queryClient.ensureQueryData(
  //     getContentQuery({ path: flattenToAppURL(location.pathname), expand }),
  //   );
  // },
  component: LoginComponent,
});

function LoginComponent() {
  // const { getContentQuery } = usePloneClient();
  // const { data } = useSuspenseQuery(
  //   getContentQuery({ path: flattenToAppURL('/'), expand }),
  // );

  return (
    <Container narrow style={{ paddingTop: '200px' }}>
      <Login />
    </Container>
  );
}
