/**
 * Content icon mapper for Quanta icons
 * @module helpers/Content/getContentIcon
 */

import React from 'react';
import {
  PageIcon,
  FolderIcon,
  NewsIcon,
  CalendarIcon,
  ImageIcon,
  AttachmentIcon,
  LinkIcon,
  VideoIcon,
  CollectionIcon,
} from '@plone/components/Icons';

export interface ContentIconMap {
  [key: string]: React.ComponentType<any>;
}

/**
 * Default content type to icon mapping using Quanta icons
 */
export const defaultContentIcons: ContentIconMap = {
  Document: PageIcon,
  Folder: FolderIcon,
  'News Item': NewsIcon,
  Event: CalendarIcon,
  Image: ImageIcon,
  File: AttachmentIcon,
  Link: LinkIcon,
  Video: VideoIcon,
  Collection: CollectionIcon,
};

/**
 * Get content icon component for a given content type
 * @function getContentIcon
 * @param {string} type Content type (e.g., 'Document', 'Folder', 'Image')
 * @param {boolean} isFolderish Whether the content is folderish
 * @param {ContentIconMap} customIcons Optional custom icon mapping to override defaults
 * @returns {React.ComponentType} Icon component from Quanta design system
 */
export function getContentIcon(
  type: string,
  isFolderish: boolean = false,
  customIcons: ContentIconMap = {},
): React.ComponentType<any> {
  // Merge custom icons with defaults
  const contentIcons = { ...defaultContentIcons, ...customIcons };

  // Return specific icon for the content type if it exists
  if (type in contentIcons) {
    return contentIcons[type];
  }

  // Fallback to folder or file icon based on folderish property
  return isFolderish ? contentIcons.Folder : contentIcons.File;
}

/**
 * Get content icon component as JSX element
 * @function getContentIconElement
 * @param {string} type Content type
 * @param {boolean} isFolderish Whether the content is folderish
 * @param {object} iconProps Props to pass to the icon component
 * @param {ContentIconMap} customIcons Optional custom icon mapping
 * @returns {React.ReactElement} Icon component rendered as JSX
 */
export function getContentIconElement(
  type: string,
  isFolderish: boolean = false,
  iconProps: object = {},
  customIcons: ContentIconMap = {},
): React.ReactElement {
  const IconComponent = getContentIcon(type, isFolderish, customIcons);
  return React.createElement(IconComponent, iconProps);
}
