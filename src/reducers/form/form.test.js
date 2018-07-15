import form from './form';

describe('Form reducer', () => {
  it('should return the initial state', () => {
    expect(form()).toEqual({});
  });
});
