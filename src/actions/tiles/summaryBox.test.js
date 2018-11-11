import * as actions from './summaryBox';
import {
  GET_SUMMARY_BOX_SEARCH_RESULTS,
  GET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_CONTENT,
  RESET_SUMMARY_BOX_SEARCH,
} from '../../constants/ActionTypes';

describe('Summary Box tile action', () => {
  describe('getSummaryBoxSearchResults', () => {
    it('should create an action to get summary box search results', () => {
      const action = actions.getSummaryBoxSearchResults('', {
        Title: '*test*',
      });

      expect(action.type).toEqual(GET_SUMMARY_BOX_SEARCH_RESULTS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@search?Title=*test*');
    });
  });
  describe('resetSummaryBoxSearch', () => {
    it('should create an action to reset summary box search results', () => {
      const action = actions.resetSummaryBoxSearch();
      expect(action.type).toEqual(RESET_SUMMARY_BOX_SEARCH);
    });
  });
  describe('getSummaryBoxContent', () => {
    it('should create an action to get summary box content', () => {
      const action = actions.getSummaryBoxContent('/test');

      expect(action.type).toEqual(GET_SUMMARY_BOX_CONTENT);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/test?include_items=false');
    });
  });
  describe('resetSummaryBoxContent', () => {
    it('should create an action to reset summary box content', () => {
      const action = actions.resetSummaryBoxContent();
      expect(action.type).toEqual(RESET_SUMMARY_BOX_CONTENT);
    });
  });
});
