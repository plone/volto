/* TODO: When the Volto Team removes Jest configuration support from Volto core, update this file with the Vitest version of the mock.
Then, in the tests, we need to replace:

vi.mock('@plone/volto/components/manage/Contents', async () => {
  return await import(
    '@plone/volto/components/manage/Contents/__mocks__/index.vitest.tsx'
  );
});

with the following:

vi.mock('@plone/volto/components/manage/Contents');

Finally, remove this comment.
*/

export const Contents = jest.fn(() => <div className="Contents" />);

export const ContentsRenameModal = jest.fn(() => (
  <div className="ContentsRenameModal" />
));
