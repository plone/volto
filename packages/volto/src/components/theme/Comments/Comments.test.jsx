import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import Comments from './Comments';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';

vi.mock('@plone/volto/components/theme/Comments/CommentEditModal', () => ({
  default: vi.fn(({ id, text, ...props }) => (
    <div data-testid="comment-edit-modal">Mocked CommentEditModal</div>
  )),
}));

const mockStore = configureStore();

vi.mock('moment', () => ({
  default: vi.fn(() => ({
    format: vi.fn(() => 'Sunday, April 23, 2017 3:38 AM'),
    fromNow: vi.fn(() => 'a few seconds ago'),
  })),
}));

vi.mock('@plone/volto/helpers/Loadable/Loadable');
vi.mock('@plone/volto/components/manage/Form');

beforeAll(async () => {
  await __setLoadables();
});

describe('Comments', () => {
  it('renders a comments component', () => {
    const store = mockStore({
      comments: {
        items: [
          {
            '@id': 'someurl',
            comment_id: '1614094601171408',
            author_name: 'admin',
            creation_date: '2017-11-06T19:36:01',
            text: { data: 'Some comment' },
            is_deletable: true,
            is_editable: true,
            can_reply: true,
          },
        ],
        permissions: {
          view_comments: true,
          can_reply: true,
        },
        add: {
          loading: false,
          loaded: true,
        },
        delete: {
          loading: false,
          loaded: true,
        },
        update: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <Comments pathname="/blog" />
      </Provider>,
    );

    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
