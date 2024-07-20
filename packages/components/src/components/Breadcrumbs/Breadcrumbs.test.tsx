import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Breadcrumbs } from './Breadcrumbs';

expect.extend(toHaveNoViolations);

it('Breadcrumbs basic a11y test', async () => {
  const { container } = render(
    <Breadcrumbs
      items={[
        { '@id': '/', title: 'Home' },
        { '@id': '/folder', title: 'Folder' },
        { '@id': '/folder/page', title: 'Page' },
      ]}
    />,
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
