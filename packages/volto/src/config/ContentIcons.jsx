import contentExistingSVG from '@plone/volto/icons/content-existing.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import calendarSVG from '@plone/volto/icons/calendar.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import fileSVG from '@plone/volto/icons/file.svg';
import pageSVG from '@plone/volto/icons/page.svg';
import imageSVG from '@plone/volto/icons/image.svg';

import {
  AttachmentIcon,
  CalendarIcon,
  FolderIcon,
  ImageIcon,
  LinkIcon,
  NewsIcon,
  PageIcon,
} from '@plone/components';

export const quantaContentIcons = {
  Document: PageIcon,
  Folder: FolderIcon,
  'News Item': NewsIcon,
  Event: CalendarIcon,
  Image: ImageIcon,
  File: AttachmentIcon,
  Link: LinkIcon,
};

export const contentIcons = {
  Document: pageSVG,
  Folder: folderSVG,
  'News Item': contentExistingSVG,
  Event: calendarSVG,
  Image: imageSVG,
  File: fileSVG,
  Link: linkSVG,
};
