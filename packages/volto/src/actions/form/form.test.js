import { setFormData } from './form';
import { SET_FORM_DATA } from '@plone/volto/constants/ActionTypes';

describe('Form action', () => {
  describe('setFormData', () => {
    it('should create an action to set the form data', () => {
      const data = { foo: 'bar' };
      const action = setFormData(data);

      expect(action.type).toEqual(SET_FORM_DATA);
      expect(action.data).toEqual(data);
    });
  });
});
