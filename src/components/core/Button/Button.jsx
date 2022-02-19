import { Button } from 'semantic-ui-react';
import { Component } from '@plone/volto/components';
import config from '@plone/volto/registry';

const coreButton = (props, { children }) => {
  const isComponentInRegistry = config.resolve('Button');

  return isComponentInRegistry ? (
    <Component {...props} name="Button">
      {children}
    </Component>
  ) : (
    <Button {...props}>{children}</Button>
  );
};

export default coreButton;
