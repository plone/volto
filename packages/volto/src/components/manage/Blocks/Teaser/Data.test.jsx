import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { vi } from 'vitest';

import TeaserData from './Data';

vi.mock('@plone/volto/components/manage/Form', () => ({
  BlockDataForm: ({ actionButton }) => actionButton,
}));

const mockStore = configureStore();

test.each([
  ['News Item', { effective: '2026-11-20T09:00:00+00:00' }],
  [
    'Event',
    {
      start: '2026-11-21T14:00:00+00:00',
      end: '2026-11-21T16:00:00+00:00',
    },
  ],
])('resets the Teaser target metadata for a %s', async (type, dates) => {
  const target = {
    '@id': '/target',
    '@type': type,
    title: 'Target title',
    description: 'Target description',
    head_title: 'Target kicker',
    ...dates,
  };
  const store = mockStore({});
  vi.spyOn(store, 'dispatch').mockResolvedValue(target);
  const onChangeBlock = vi.fn();

  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <TeaserData
          block="teaser-block"
          blocksConfig={{
            teaser: { blockSchema: () => ({ title: 'Teaser' }) },
          }}
          data={{
            '@type': 'teaser',
            href: [{ '@id': '/target' }],
            overwrite: true,
          }}
          onChangeBlock={onChangeBlock}
        />
      </IntlProvider>
    </Provider>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Reset to target' }));

  await waitFor(() => {
    expect(onChangeBlock).toHaveBeenCalledWith(
      'teaser-block',
      expect.objectContaining({
        overwrite: true,
        href: [expect.objectContaining(target)],
      }),
    );
  });
});
