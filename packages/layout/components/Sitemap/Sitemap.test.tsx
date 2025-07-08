import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Sitemap from './Sitemap';

expect.extend(toHaveNoViolations);

it('Breadcrumbs basic a11y test', async () => {
  const { container } = render(
    <Sitemap
      items={[
        {
          '@id': '/',
          description: '',
          items: [],
          review_state: null,
          title: 'Home',
        },
        {
          '@id': '/my-first-page',
          description: '',
          items: [
            {
              '@id': '/my-first-page/topic-1-of-first-page',
              description: '',
              items: [],
              review_state: 'published',
              title: 'topic 1 of first page',
              use_view_action_in_listings: false,
            },
          ],
          review_state: 'published',
          title: 'My first page',
        },
        {
          '@id': '/a-second-one',
          description: '',
          items: [],
          review_state: 'published',
          title: 'a second one',
        },
        {
          '@id': '/the-third-page',
          description: '',
          items: [],
          review_state: 'published',
          title: 'the third page',
        },
      ]}
    />,
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
