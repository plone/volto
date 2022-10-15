/**
 * Edit Hero block.
 * @module components/manage/Blocks/Image/Edit
 */

import React from 'react';
import { defineMessages } from 'react-intl';

import { SidebarPortal } from '@plone/volto/components';

import Data from './Data';
import View from './View';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  browse: {
    id: 'Browse',
    defaultMessage: 'Browse',
  },
});

const HeroEdit = (props) => {
  const { data, intl, selected } = props;
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
