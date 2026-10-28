import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import Comments from './Comments';

vi.mock('@plone/volto/components/theme/Comments/CommentEditModal', () => ({
  default: vi.fn(({ id, text, ...props }) => (
    <div data-testid="comment-edit-modal">Mocked CommentEditModal</div>
  )),
}));

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form');

describe('Comments', () => {
  beforeEach(() => {
    // Freeze time so formatRelativeDate produces deterministic output
    vi.useFakeTimers({ now: new Date('2017-04-23T03:38:04Z') });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a comments component', () => {
    const store = mockStore({
      comments: {
        items: [
          {
            '@id': 'someurl',
            comment_id: '1614094601171408',
            author_name: 'admin',
            creation_date: '2017-04-23T03:38:00Z',
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
