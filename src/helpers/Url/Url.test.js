import { getBaseUrl, getView } from './Url';

test('removing view name from url', () => {
  expect(getBaseUrl('http://localhost/edit')).toBe('http://localhost');
});

test('get edit view from url', () => {
  expect(getView('http://localhost/edit')).toBe('edit');
});

test('get view view from url', () => {
  expect(getView('http://localhost/my-blog')).toBe('view');
});
