import {
  baseMockAddonsEndpointResponse,
  mockInstalledPloneSession,
  mockUninstalledPloneSession,
  mockUpgradedPloneRestApi,
} from '../../../support/addons-controlpanel';

describe('Addons Control Panel Test', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.visit('/');
    cy.autologin();
    cy.wait('@content');
  });

  it('Should intall a third party addon ', () => {
    cy.intercept('GET', `/**/@addons`, {
      statusCode: 200,
      body: baseMockAddonsEndpointResponse,
    }).as('addons');
    cy.visit('/controlpanel/addons');
    cy.wait('@addons');
    // Get and install Plone Session
    cy.get('button#plone\\.session').should('have.text', 'Install');
    cy.intercept('POST', `/**/@addons/plone.session/install`, {
      statusCode: 204,
    }).as('installsAddon');
    cy.intercept('GET', `/**/@addons`, {
      statusCode: 200,
      body: mockInstalledPloneSession,
    }).as('addonsAfterInstall');

    cy.get('button#plone\\.session').click();
    cy.wait('@installsAddon');
    cy.wait('@addonsAfterInstall');

    // Get and uninstall Plone Session
    cy.get('button#installed-plone\\.session').should('have.text', 'Uninstall');
  });
  it('Should uninstall a third party addon', () => {
    cy.intercept('GET', `/**/@addons`, {
      statusCode: 200,
      body: mockInstalledPloneSession,
    }).as('addons');
    cy.visit('/controlpanel/addons');
    cy.wait('@addons');

    // // Get and uninstall Plone Session
    cy.get('button#installed-plone\\.session').should('have.text', 'Uninstall');
    cy.intercept('POST', `/**/@addons/plone.session/uninstall`, {
      statusCode: 204,
    }).as('uninstallsAddon');
    cy.intercept('GET', `/**/@addons`, {
      statusCode: 200,
      body: mockUninstalledPloneSession,
    }).as('addonsAfterUninstall');

    cy.get('button#installed-plone\\.session').click();
    cy.wait('@uninstallsAddon');
    cy.wait('@addonsAfterUninstall');

    cy.get('button#plone\\.session').should('have.text', 'Install');
  });
  it('Should update a third party addon', () => {
    cy.intercept('GET', `/**/@addons`, {
      statusCode: 200,
      body: baseMockAddonsEndpointResponse,
    }).as('addons');
    cy.visit('/controlpanel/addons');
    cy.wait('@addons');

    cy.intercept('POST', `/**/@addons/plone.restapi/upgrade`, {
      statusCode: 204,
    }).as('upgradesAddon');
    cy.intercept('GET', `/**/@addons`, {
      statusCode: 200,
      body: mockUpgradedPloneRestApi,
    }).as('addonsAfterUpgrade');

    cy.get('button#upgradable-plone\\.restapi').click();
    cy.wait('@upgradesAddon');
    cy.wait('@addonsAfterUpgrade');

    cy.get('button#installed-plone\\.restapi').should('have.text', 'Uninstall');
  });
});
