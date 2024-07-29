import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  usePloneClient,
  useAppRouter,
  useFlattenToAppURL,
} from '@plone/providers';
import type { UseMutationResult } from '@tanstack/react-query';

export interface LoginComponentProps {
  // TODO: Better typings
  login: UseMutationResult;
  navigate: any;
  returnUrl: string;
}

export const Driver = (Component: React.ComponentType<LoginComponentProps>) => {
  const WrappedComponent = () => {
    const ploneClient = usePloneClient();
    const { loginMutation } = ploneClient;
    const login = useMutation(loginMutation());
    const { navigate, useLocation } = useAppRouter();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { flattenToAppURL } = useFlattenToAppURL();
    const returnUrl = flattenToAppURL(searchParams.get('return_url') || '/');
    const props: LoginComponentProps = {
      login,
      navigate,
      returnUrl,
    };

    return <Component {...props} />;
  };

  WrappedComponent.displayName = 'LoginDriver';

  return WrappedComponent;
};
