/**
 * Version Overview component.
 * @module components/manage/Controlpanels/VersionOverview
 */

import React from 'react';
import { List } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import { version as voltoVersion } from '../../../../package.json';
import { addonsInfo } from 'load-volto-addons';

import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  no_addons: {
    id: 'No addons found',
    defaultMessage: 'No addons found',
  },
});

const VersionOverview = ({
  cmf_version,
  pil_version,
  plone_version,
  plone_restapi_version,
  python_version,
  zope_version,
}) => {
  const intl = useIntl();

  return (
    <>
      <List
        bulleted
        size="large"
        style={{ fontSize: '16px', fontFamily: 'Monospace' }}
      >
        {voltoVersion && (
          <List.Item key="volto-version">Volto {voltoVersion}</List.Item>
        )}
        <List.Item key="plone-version">Plone {plone_version}</List.Item>
        <List.Item key="plone-restapi-version">
          plone.restapi {plone_restapi_version}
        </List.Item>
        <List.Item key="cmf-version"> CMF {cmf_version}</List.Item>
        <List.Item key="zope-version">Zope {zope_version}</List.Item>
        <List.Item key="python-version">Python {python_version}</List.Item>
        <List.Item key="pil-version">PIL {pil_version}</List.Item>
      </List>

      <h3>Add-ons</h3>
      {isEmpty(addonsInfo) && <p>{intl.formatMessage(messages.no_addons)}</p>}
      <ul style={{ fontSize: '16px', fontFamily: 'Monospace' }}>
        {Object.keys(addonsInfo).map((addon) => (
          <li>{`${addon} ${addonsInfo[addon].version || ''}`}</li>
        ))}
      </ul>
      <p>
        <FormattedMessage
          id="Warning Regarding debug mode"
          defaultMessage="You are running in 'debug mode'. This mode is intended for sites that are under development. This allows many configuration changes to be immediately visible, but will make your site run more slowly. To turn off debug mode, stop the server, set 'debug-mode=off' in your buildout.cfg, re-run bin/buildout and then restart the server process."
        />
      </p>
    </>
  );
};

export default VersionOverview;
