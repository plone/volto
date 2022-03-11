import { replaceItemOfArray, removeFromArray, reorderArray } from './Utils';
import deepFreeze from 'deep-freeze';

describe('Utils', () => {
  it('replaces the position of an element into an array immutable-ish', () => {
    const array = ['a', 'b', 'c'];
    deepFreeze(array);
    const result = replaceItemOfArray(array, 2, 'v');
    expect(result).toEqual(['a', 'b', 'v']);
  });

  it('removes an element from the array immutable-ish', () => {
    const array = ['a', 'b', 'c'];
    deepFreeze(array);
    const result = removeFromArray(array, 2);
    expect(result).toEqual(['a', 'b']);
  });

  it('reorders an array immutable-ish', () => {
    const array = ['a', 'b', 'c'];
    deepFreeze(array);
    const result = reorderArray(array, 2, 0);
    expect(result).toEqual(['c', 'a', 'b']);
  });
});
