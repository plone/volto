/**
 * Version Overview component.
 * @module components/manage/Controlpanels/VersionOverview
 */

import React from 'react';
import { List } from 'semantic-ui-react';

import packageJSON from '../../../../package.json';

const VersionOverview = () => {
  const voltoVersion = packageJSON.version;

  return (
    <List>{voltoVersion && <List.Item>Volto {voltoVersion}</List.Item>}</List>
  );
};

export default VersionOverview;
