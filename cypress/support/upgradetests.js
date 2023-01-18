export const getsystemNeedsUpgrade = {
  '@id': 'http://localhost:3000/@system',
  cmf_version: '2.6.0',
  debug_mode: 'No',
  pil_version: '9.2.0 (Pillow)',
  plone_gs_metadata_version_file_system: '6008',
  plone_gs_metadata_version_installed: '6006',
  plone_restapi_version: '8.32.0',
  plone_version: '6.0.0b3',
  python_version:
    '3.9.14 (main, Sep 13 2022, 03:20:56) \n[GCC 10.2.1 20210110]',
  upgrade: true,
  zope_version: '5.6',
};

export const getUpgradeNeedsUpgrade = {
  '@id': 'http://localhost:3000/@upgrade',
  upgrade_steps: {
    '6006-6007': [
      {
        id: 'cb3b910894ab80c94b6367b39bc93039',
        title: 'Run to6007 upgrade profile.',
      },
      {
        id: 'bb72e6a5b0c9c6131b1efad155868131',
        title: 'Add a timezone property to portal memberdata if it is missing.',
      },
      {
        id: '62ef4eea9b3bfbd472cf349277de749b',
        title: 'Fix the portal action icons.',
      },
      {
        id: 'bac1428c12e294517042a1cee5cfabdc',
        title:
          'Rename the behavior collective.dexteritytextindexer to plone.textindexer',
      },
    ],
    '6007-6008': [
      {
        id: 'e5cad1e9fd65e8bd1b23519d49417e51',
        title: 'Update plonetheme.barceloneta registry',
      },
    ],
  },
  versions: {
    fs: '6008',
    instance: '6006',
  },
};

export const postUpgradeDryRun = {
  '@id': 'http://localhost:3000/@upgrade',
  dry_run: false,
  report:
    'Starting the migration from version: 6006\nRole / permission map imported.\nActions tool imported.\nRan upgrade step: Run to6007 upgrade profile.\nRan upgrade step: Add a timezone property to portal memberdata if it is missing.\nRan upgrade step: Fix the portal action icons.\nRan upgrade step: Rename the behavior collective.dexteritytextindexer to plone.textindexer\nRan upgrade step: Update plonetheme.barceloneta registry\nEnd of upgrade path, main migration has finished.\nStarting upgrade of core addons.\nControl panel imported.\nDone upgrading core addons.\nYour Plone instance is now up-to-date.\n',
  upgraded: true,
  versions: {
    fs: '6008',
    instance: '6008',
  },
};

export const postUpgrade = {
  '@id': 'http://localhost:3000/@upgrade',
  dry_run: false,
  report:
    'Starting the migration from version: 6008\nEnd of upgrade path, main migration has finished.\nStarting upgrade of core addons.\nDone upgrading core addons.\nYour Plone instance is now up-to-date.\n',
  upgraded: true,
  versions: {
    fs: '6008',
    instance: '6008',
  },
};

export const getUpgradeSiteUpgraded = {
  '@id': 'http://localhost:3000/@upgrade',
  upgrade_steps: {},
  versions: {
    fs: '6008',
    instance: '6008',
  },
};
