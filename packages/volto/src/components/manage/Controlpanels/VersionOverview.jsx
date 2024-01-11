/**
 * Version Overview component.
 * @module components/manage/Controlpanels/VersionOverview
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import voltoPackageJson from '../../../../package.json';
import projectPackageJson from '@root/../package.json';

import { defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  no_addons: {
    id: 'No addons found',
    defaultMessage: 'No addons found',
  },
});

const voltoVersion = voltoPackageJson.version;

const VersionOverview = ({
  cmf_version,
  debug_mode,
  pil_version,
  plone_version,
  plone_restapi_version,
  python_version,
  zope_version,
}) => {
  const intl = useIntl();
  const { addonsInfo } = config.settings;
  const isProject = voltoPackageJson.name !== projectPackageJson.name;

  return (
    <>
      <ul
        style={{
          fontSize: '16px',
          fontFamily: 'Monospace',
          paddingLeft: '1rem',
        }}
      >
        {isProject ? (
          <li>
            {projectPackageJson.name} {projectPackageJson.version}
          </li>
        ) : null}
        {voltoVersion && <li>Volto {voltoVersion}</li>}
        <li>Plone {plone_version}</li>
        <li>plone.restapi {plone_restapi_version}</li>
        <li>CMF {cmf_version}</li>
        <li>Zope {zope_version}</li>
        <li>Python {python_version}</li>
        <li>PIL {pil_version}</li>
      </ul>
      <h3>Add-ons</h3>
      {isEmpty(addonsInfo) ? (
        <p>{intl.formatMessage(messages.no_addons)}</p>
      ) : (
        <ul style={{ fontSize: '16px', fontFamily: 'Monospace' }}>
          {addonsInfo.map((addon) => (
            <li key={addon.name}>{`${addon.name} ${addon.version || ''}`}</li>
          ))}
        </ul>
      )}
      {debug_mode !== 'No' && (
        <p>
          <FormattedMessage
            id="Warning Regarding debug mode"
            defaultMessage="You are running in 'debug mode'. This mode is intended for sites that are under development. This allows many configuration changes to be immediately visible, but will make your site run more slowly. To turn off debug mode, stop the server, set 'debug-mode=off' in your buildout.cfg, re-run bin/buildout and then restart the server process."
          />
        </p>
      )}
    </>
  );
};

export default VersionOverview;
