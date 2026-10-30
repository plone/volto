import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import DexterityTypesRedirect from './DexterityTypesRedirect';

// Where the old content types control panel's URL ends up.
function redirect(from: string) {
  let pathname = '';
  render(
    <MemoryRouter initialEntries={[from]}>
      <Route
        path="/controlpanel/dexterity-types/:id?/:view?"
        component={DexterityTypesRedirect}
      />
      <Route
        render={({ location }) => {
          pathname = location.pathname;
          return null;
        }}
      />
    </MemoryRouter>,
  );
  return pathname;
}

describe('DexterityTypesRedirect', () => {
  it('sends the list to the new control panel', () => {
    expect(redirect('/controlpanel/dexterity-types')).toBe(
      '/controlpanel/content-types',
    );
  });

  it('sends a type to its Settings tab, and its schema to the Fields tab', () => {
    expect(redirect('/controlpanel/dexterity-types/Event')).toBe(
      '/controlpanel/content-types/Event/settings',
    );
    expect(redirect('/controlpanel/dexterity-types/Event/schema')).toBe(
      '/controlpanel/content-types/Event/fields',
    );
  });
});
