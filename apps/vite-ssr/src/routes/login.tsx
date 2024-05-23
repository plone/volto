import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QuantaTextField, Button } from '@plone/components';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { usePloneClient } from '@plone/providers';
import config from '@plone/registry';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
});

function LoginComponent() {
  const { loginQuery } = usePloneClient();
  console.log(loginQuery);
  const mutation = useMutation(loginQuery());
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('this has been called');
    mutation.mutate({ username: 'admin', password: 'admin', config });
  };
  console.log(mutation.mutate, 'thi si mutation data');
  return (
    <div>
      This is login
      {mutation.isPending && <div>this is alok</div>}
      <div>this sload</div>
      <form onSubmit={onSubmit}>
        <QuantaTextField
          name="username"
          label="UserName"
          placeholder="Write your username"
          type="text"
        />
        <QuantaTextField
          name="password"
          label="Password"
          placeholder="Write your password"
          type="password"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
