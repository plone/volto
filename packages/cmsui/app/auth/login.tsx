import type { Route } from './+types/login';
import { data, Form, Link, useActionData, redirect } from 'react-router';

import { redirectIfLoggedInLoader, setAuthOnResponse } from './auth';
import { Button, TextField } from '@plone/components';

import PloneClient from '@plone/client';
import config from '@plone/registry';

export const loader = redirectIfLoggedInLoader;

export const meta = () => {
  return [{ title: 'Plone Login' }];
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  const ploneClient = config
    .getUtility({
      name: 'ploneClient',
      type: 'client',
    })
    .method();

  const { login } = ploneClient as PloneClient;

  const token = await login({ username, password });
  if (!token) {
    return data(
      { ok: false, errors: { password: 'Invalid credentials' } },
      400,
    );
  }

  const response = redirect('/');
  return setAuthOnResponse(response, token);
}

export default function Login() {
  const actionResult = useActionData<typeof action>();

  return (
    <div className="mt-20 flex min-h-full flex-1 flex-col sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          id="login-header"
          className="mt-6 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900"
        >
          Log in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form className="space-y-6" method="post">
            <div>
              <TextField
                autoFocus
                id="username"
                name="username"
                aria-describedby={
                  actionResult?.errors?.email ? 'email-error' : 'login-header'
                }
                isRequired
              />
            </div>

            <div>
              <TextField
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-describedby="password-error"
                isRequired
              />
            </div>

            <div>
              <Button type="submit">Sign in</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
