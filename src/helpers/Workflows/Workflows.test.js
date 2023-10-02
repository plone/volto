import config from '@plone/volto/registry';
import { getCurrentStateMapping, getWorkflowOptions } from './Workflows';

beforeEach(() => {
  config.settings.workflowMapping = {
    published: { value: 'published', color: '#007bc1' },
    publish: { value: 'publish', color: '#007bc1' },
    private: { value: 'private', color: '#ed4033' },
    pending: { value: 'pending', color: '#f6a808' },
    send_back: { value: 'private', color: '#ed4033' },
    retract: { value: 'private', color: '#ed4033' },
    submit: { value: 'review', color: '#f4e037' },
  };
});

describe('Workflow helpers', () => {
  it('getWorkflowOptions basic', () => {
    const transition = {
      '@id': 'http://127.0.0.1:3000/de/@workflow/publish',
      title: 'Veröffentlichen',
    };
    expect(getWorkflowOptions(transition)).toStrictEqual({
      color: '#007bc1',
      label: 'Veröffentlichen',
      url: 'http://127.0.0.1:3000/de/@workflow/publish',
      value: 'publish',
    });
  });

  it('getCurrentStateMapping basic', () => {
    const currentState = { id: 'published', title: 'Published' };
    expect(getCurrentStateMapping(currentState)).toStrictEqual({
      color: '#007bc1',
      label: 'Published',
      value: 'published',
    });
  });

  it('getCurrentStateMapping no matching mapping', () => {
    const currentState = { id: 'foo', title: 'Foo' };
    expect(getCurrentStateMapping(currentState)).toStrictEqual({
      color: '#000',
      label: 'Foo',
      value: 'foo',
    });
  });
});
