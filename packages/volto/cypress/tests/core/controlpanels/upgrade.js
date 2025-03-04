import {
  getsystemNeedsUpgrade,
  getUpgradeNeedsUpgrade,
  postUpgradeDryRun,
  postUpgrade,
  getUpgradeSiteUpgraded,
} from '../../../support/upgradetests';

describe('Upgrade Site Tests', () => {
  beforeEach(() => {
    // give a logged in editor and the site root
    cy.autologin();
    cy.visit('/');
    cy.viewport('macbook-16');
  });

  it('As manager, I can upgrade the site if available', function () {
    cy.intercept('GET', '/**/@system', {
      statusCode: 200,
      body: {
        ...getsystemNeedsUpgrade,
      },
    }).as('getSystemNeedsUpdate');
    cy.navigate('controlpanel');
    cy.wait('@getSystemNeedsUpdate');

    cy.get('.content-area').contains('Please continue with the upgrade.');
  });

  it('As manager, I can click upgrade site, the upgrade control panel shows', function () {
    cy.intercept('GET', '/**/@system', {
      statusCode: 200,
      body: {
        ...getsystemNeedsUpgrade,
      },
    }).as('getSystemNeedsUpdate');
    cy.intercept('GET', '/**/@upgrade', {
      statusCode: 200,
      body: {
        ...getUpgradeNeedsUpgrade,
      },
    }).as('getSystemNeedsUpdate');
    cy.navigate('controlpanel');
    cy.wait('@getSystemNeedsUpdate');

    cy.findByText('Please continue with the upgrade.').click();
    cy.get('.content-area').contains(
      'The site configuration is outdated and needs to be upgraded.',
    );
  });

  it('As manager, I can dry run upgrade the site', function () {
    cy.intercept('GET', '/**/@system', {
      statusCode: 200,
      body: {
        ...getsystemNeedsUpgrade,
      },
    }).as('getSystemNeedsUpdate');
    cy.intercept('GET', '/**/@upgrade', {
      statusCode: 200,
      body: {
        ...getUpgradeNeedsUpgrade,
      },
    }).as('getUpgradeNeedsUpgrade');
    cy.intercept('POST', '/**/@upgrade', {
      statusCode: 200,
      body: {
        ...postUpgradeDryRun,
      },
    }).as('postUpgradeDryRun');
    cy.navigate('controlpanel');
    cy.wait('@getSystemNeedsUpdate');

    cy.findByText('Please continue with the upgrade.').click();
    cy.wait('@getUpgradeNeedsUpgrade');

    cy.findByText('Dry run mode').click();
    cy.findByLabelText('Upgrade').click();
    cy.wait('@postUpgradeDryRun');

    cy.get('.toast-inner-content').contains(
      'Dry run selected, transaction aborted.',
    );
  });

  it('As manager, I can upgrade the site', function () {
    cy.intercept('GET', '/**/@system', {
      statusCode: 200,
      body: {
        ...getsystemNeedsUpgrade,
      },
    }).as('getSystemNeedsUpdate');
    cy.intercept('GET', '/**/@upgrade', {
      statusCode: 200,
      body: {
        ...getUpgradeNeedsUpgrade,
      },
    }).as('getUpgradeNeedsUpgrade');
    cy.intercept('POST', '/**/@upgrade', {
      statusCode: 200,
      body: {
        ...postUpgrade,
      },
    }).as('postUpgrade');
    cy.navigate('controlpanel');
    cy.wait('@getSystemNeedsUpdate');

    cy.findByText('Please continue with the upgrade.').click();
    cy.wait('@getUpgradeNeedsUpgrade');

    cy.intercept('GET', '/**/@upgrade', {
      statusCode: 200,
      body: {
        ...getUpgradeSiteUpgraded,
      },
    }).as('getUpgradeSiteUpgraded');
    cy.findByLabelText('Upgrade').click();
    cy.wait('@postUpgrade');
    cy.wait('@getUpgradeSiteUpgraded');

    cy.get('.content-area').contains('Your site is up to date.');
  });
});
