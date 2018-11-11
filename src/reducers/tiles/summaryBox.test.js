import { settings } from '~/config';
import summaryBox from './summaryBox';
import {
  GET_SUMMARY_BOX_SEARCH_RESULTS,
  GET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_SEARCH,
} from '../../constants/ActionTypes';

describe('Summary Box reducer', () => {
  it('should return the initial state', () => {
    expect(summaryBox()).toEqual({
      errorContent: null,
      errorSearch: null,
      items: [],
      content: {},
      loadedContent: false,
      loadingContent: false,
      loadedSearch: false,
      loadingSearch: false,
    });
  });

  it('should handle GET_SUMMARY_BOX_SEARCH_RESULTS_PENDING', () => {
    expect(
      summaryBox(undefined, {
        type: `${GET_SUMMARY_BOX_SEARCH_RESULTS}_PENDING`,
      }),
    ).toMatchObject({
      errorContent: null,
      errorSearch: null,
      items: [],
      content: {},
      loadedContent: false,
      loadingContent: false,
      loadedSearch: false,
      loadingSearch: true,
    });
  });

  it('should handle GET_SUMMARY_BOX_SEARCH_RESULTS_SUCCESS', () => {
    expect(
      summaryBox(undefined, {
        type: `${GET_SUMMARY_BOX_SEARCH_RESULTS}_SUCCESS`,
        result: {
          items: [
            {
              '@id': `${settings.apiPath}/test`,
            },
          ],
        },
      }),
    ).toMatchObject({
      errorContent: null,
      errorSearch: null,
      items: [
        {
          '@id': '/test',
        },
      ],
      content: {},
      loadedContent: false,
      loadingContent: false,
      loadedSearch: true,
      loadingSearch: false,
    });
  });

  it('should handle GET_SUMMARY_BOX_SEARCH_RESULTS_FAIL', () => {
    expect(
      summaryBox(undefined, {
        type: `${GET_SUMMARY_BOX_SEARCH_RESULTS}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      errorContent: null,
      errorSearch: 'failed',
      items: [],
      content: {},
      loadedContent: false,
      loadingContent: false,
      loadedSearch: false,
      loadingSearch: false,
    });
  });

  it('should handle RESET_SUMMARY_BOX_SEARCH', () => {
    expect(
      summaryBox(undefined, {
        type: RESET_SUMMARY_BOX_SEARCH,
      }),
    ).toMatchObject({
      errorContent: null,
      errorSearch: null,
      items: [],
      content: {},
      loadedContent: false,
      loadingContent: false,
      loadedSearch: false,
      loadingSearch: false,
    });
  });

  it('should handle GET_SUMMARY_BOX_CONTENT_PENDING', () => {
    expect(
      summaryBox(undefined, {
        type: `${GET_SUMMARY_BOX_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      errorContent: null,
      errorSearch: null,
      items: [],
      content: {},
      loadedContent: false,
      loadingContent: true,
      loadedSearch: false,
      loadingSearch: false,
    });
  });

  it('should handle GET_SUMMARY_BOX_CONTENT_SUCCESS', () => {
    expect(
      summaryBox(undefined, {
        type: `${GET_SUMMARY_BOX_CONTENT}_SUCCESS`,
        result: {
          '@id': `${settings.apiPath}/test`,
          title: 'Test',
          description: 'Summary',
        },
      }),
    ).toMatchObject({
      errorContent: null,
      errorSearch: null,
      items: [],
      content: {
        '@id': `${settings.apiPath}/test`,
        title: 'Test',
        description: 'Summary',
      },
      loadedContent: true,
      loadingContent: false,
      loadedSearch: false,
      loadingSearch: false,
    });
  });

  it('should handle GET_SUMMARY_BOX_CONTENT_FAIL', () => {
    expect(
      summaryBox(undefined, {
        type: `${GET_SUMMARY_BOX_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      errorContent: 'failed',
      errorSearch: null,
      items: [],
      content: {},
      loadedContent: false,
      loadingContent: false,
      loadedSearch: false,
      loadingSearch: false,
    });
  });

  it('should handle RESET_SUMMARY_BOX_CONTENT', () => {
    expect(
      summaryBox(undefined, {
        type: RESET_SUMMARY_BOX_CONTENT,
      }),
    ).toMatchObject({
      errorContent: null,
      errorSearch: null,
      items: [],
      content: {},
      loadedContent: false,
      loadingContent: false,
      loadedSearch: false,
      loadingSearch: false,
    });
  });
});
