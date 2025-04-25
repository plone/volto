import querystring from './querystring';
import { GET_QUERYSTRING } from '@plone/volto/constants/ActionTypes';

describe('Querystring reducer', () => {
  it('should return the initial state', () => {
    expect(querystring()).toEqual({
      error: null,
      indexes: {},
      loaded: false,
      loading: false,
      sortable_indexes: {},
    });
  });

  it('should handle GET_QUERYSTRING_PENDING', () => {
    expect(
      querystring(undefined, {
        type: `${GET_QUERYSTRING}_PENDING`,
      }),
    ).toEqual({
      error: null,
      indexes: {},
      loaded: false,
      loading: true,
      sortable_indexes: {},
    });
  });

  it('should handle GET_QUERYSTRING_SUCCESS', () => {
    expect(
      querystring(undefined, {
        type: `${GET_QUERYSTRING}_SUCCESS`,
        result: {
          indexes: {
            Creator: {
              description: 'The person that created an item',
              enabled: true,
              group: 'Metadata',
              operations: [
                'plone.app.querystring.operation.string.currentUser',
                'plone.app.querystring.operation.selection.any',
              ],
              operators: {
                'plone.app.querystring.operation.selection.any': {
                  description: 'Tip: you can use * to autocomplete.',
                  operation: 'plone.app.querystring.queryparser._contains',
                  title: 'Matches any of',
                  widget: 'MultipleSelectionWidget',
                },
                'plone.app.querystring.operation.string.currentUser': {
                  description: 'The user viewing the querystring results',
                  operation: 'plone.app.querystring.queryparser._currentUser',
                  title: 'Current logged in user',
                  widget: null,
                },
              },
              sortable: true,
              title: 'Creator',
              values: {},
              vocabulary: 'plone.app.vocabularies.Users',
            },
          },
          sortable_indexes: {
            Creator: {
              description: 'The person that created an item',
              enabled: true,
              group: 'Metadata',
              operations: [
                'plone.app.querystring.operation.string.currentUser',
                'plone.app.querystring.operation.selection.any',
              ],
              operators: {
                'plone.app.querystring.operation.selection.any': {
                  description: 'Tip: you can use * to autocomplete.',
                  operation: 'plone.app.querystring.queryparser._contains',
                  title: 'Matches any of',
                  widget: 'MultipleSelectionWidget',
                },
                'plone.app.querystring.operation.string.currentUser': {
                  description: 'The user viewing the querystring results',
                  operation: 'plone.app.querystring.queryparser._currentUser',
                  title: 'Current logged in user',
                  widget: null,
                },
              },
              sortable: true,
              title: 'Creator',
              values: {},
              vocabulary: 'plone.app.vocabularies.Users',
            },
          },
        },
      }),
    ).toEqual({
      error: null,
      indexes: {
        Creator: {
          description: 'The person that created an item',
          enabled: true,
          group: 'Metadata',
          operations: [
            'plone.app.querystring.operation.string.currentUser',
            'plone.app.querystring.operation.selection.any',
          ],
          operators: {
            'plone.app.querystring.operation.selection.any': {
              description: 'Tip: you can use * to autocomplete.',
              operation: 'plone.app.querystring.queryparser._contains',
              title: 'Matches any of',
              widget: 'MultipleSelectionWidget',
            },
            'plone.app.querystring.operation.string.currentUser': {
              description: 'The user viewing the querystring results',
              operation: 'plone.app.querystring.queryparser._currentUser',
              title: 'Current logged in user',
              widget: null,
            },
          },
          sortable: true,
          title: 'Creator',
          values: {},
          vocabulary: 'plone.app.vocabularies.Users',
        },
      },
      loaded: true,
      loading: false,
      sortable_indexes: {
        Creator: {
          description: 'The person that created an item',
          enabled: true,
          group: 'Metadata',
          operations: [
            'plone.app.querystring.operation.string.currentUser',
            'plone.app.querystring.operation.selection.any',
          ],
          operators: {
            'plone.app.querystring.operation.selection.any': {
              description: 'Tip: you can use * to autocomplete.',
              operation: 'plone.app.querystring.queryparser._contains',
              title: 'Matches any of',
              widget: 'MultipleSelectionWidget',
            },
            'plone.app.querystring.operation.string.currentUser': {
              description: 'The user viewing the querystring results',
              operation: 'plone.app.querystring.queryparser._currentUser',
              title: 'Current logged in user',
              widget: null,
            },
          },
          sortable: true,
          title: 'Creator',
          values: {},
          vocabulary: 'plone.app.vocabularies.Users',
        },
      },
    });
  });

  it('should handle GET_QUERYSTRING_FAIL', () => {
    expect(
      querystring(undefined, {
        type: `${GET_QUERYSTRING}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      indexes: {},
      loaded: false,
      loading: false,
      sortable_indexes: {},
    });
  });
});
