/**
 * Edit Hero block.
 * @module components/manage/Blocks/Image/Edit
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { SidebarPortal } from '@plone/volto/components';

import Data from './Data';
import View from './View';

const messages = defineMessages({
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
});

const HeroEdit = (props) => {
  const { data, selected } = props;
  const intl = useIntl();
  const placeholder =
    data.placeholder || intl.formatMessage(messages.placeholder);

  return (
    <>
      <View {...props} placeholder={placeholder} isEditMode />
      <SidebarPortal selected={selected}>
        <Data {...props} />
      </SidebarPortal>
    </>
  );
};

export default HeroEdit;
