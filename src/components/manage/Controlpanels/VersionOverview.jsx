/**
 * Version Overview component.
 * @module components/manage/Controlpanels/VersionOverview
 */

import React from 'react';
import { List } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import packageJSON from '../../../../package.json';

const VersionOverview = ({
  cmf_version,
  pil_version,
  plone_version,
  python_version,
  zope_version,
}) => {
  const voltoVersion = packageJSON.version;

  return (
    <>
      <List bulleted size="large">
        {voltoVersion && (
          <List.Item key="volto">Volto {voltoVersion}</List.Item>
        )}
        <List.Item key="volto">Plone {plone_version}</List.Item>

        <List.Item key="volto"> CMF {cmf_version}</List.Item>
        <List.Item key="volto">Zope {zope_version}</List.Item>
        <List.Item key="volto">Python {python_version}</List.Item>
        <List.Item key="volto">PIL {pil_version}</List.Item>
      </List>
      <p>
        <FormattedMessage
          id="Warning Regarding debug mode"
          defaultMessage='You are running in "debug mode". This mode is intended for sites that
        are under development. This allows many configuration changes to be
        immediately visible, but will make your site run more slowly. To turn
        off debug mode, stop the server, set "debug-mode=off" in your
        buildout.cfg, re-run bin/buildout and then restart the server process.'
        />
      </p>
    </>
  );
};

export default VersionOverview;
