import {
  Form,
  useActionData,
  redirect,
  type ActionFunctionArgs,
} from 'react-router';

import {
  redirectIfLoggedInLoader,
  setAuthOnResponse,
} from '@plone/react-router';
import { Button } from '@plone/components/quanta';
import { TextField } from '../../components/TextField/TextField';
import ploneSvg from '../../static/plone-white.svg';
import ArrowRightSVG from '@plone/components/icons/arrow-right.svg?react';

import type PloneClient from '@plone/client';
import config from '@plone/registry';

export const loader = redirectIfLoggedInLoader;

export const meta = () => {
  return [{ title: 'Plone Login' }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  const cli = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method() as PloneClient;

  const { data } = await cli.login({ username, password });
  const response = redirect('/');
  return await setAuthOnResponse(response, data.token);
}

export default function Login() {
  const actionResult = useActionData<typeof action>();

  return (
    <div className="mx-4 flex h-screen flex-1 flex-col justify-center">
      <div
        className={`
          flex flex-col items-center
          sm:mx-auto sm:w-full sm:max-w-md
        `}
      >
        <div className="flex h-32 w-32 flex-col items-center rounded-full bg-quanta-sapphire p-8">
          <img src={ploneSvg} alt="" />
        </div>
        <h2
          id="login-header"
          className="mt-6 text-center text-2xl leading-8 font-bold tracking-wide text-gray-900"
        >
          Sign in
        </h2>
      </div>

      <div className="mx-auto mt-11 w-full max-w-[360px]">
        <div className="bg-quanta-air">
          <Form className="space-y-6" method="post">
            <TextField label="username" name="username" isRequired />
            <TextField
              label="password"
              name="password"
              type="password"
              autoComplete="current-password"
              isRequired
              isInvalid={actionResult?.status === 401}
              errorMessage={
                actionResult?.status === 401
                  ? actionResult?.data?.error.message
                  : undefined
              }
            />

            <Button
              className="float-end"
              variant="primary"
              accent
              size="L"
              type="submit"
              aria-label="Sign in"
            >
              <ArrowRightSVG />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
