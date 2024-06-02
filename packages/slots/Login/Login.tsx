import * as React from 'react';
import { Button, Form, TextField } from '@plone/components';
import type { LoginComponentProps } from './Driver';

export const Login = (props: LoginComponentProps) => {
  const { login, returnUrl, navigate } = props;

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));
          login.mutate(
            {
              username: data.username,
              password: data.password,
            },
            {
              onSuccess: () => {
                if (returnUrl) {
                  navigate(returnUrl);
                }
              },
            },
          );
        }}
      >
        <TextField name="username" label="username" isRequired></TextField>
        <TextField name="password" label="password" isRequired></TextField>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};
