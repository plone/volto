import type { ConfigType } from '@plone/registry';
import AttachmentIcon from '@plone/components/icons/attachment.svg?react';
import CalendarIcon from '@plone/components/icons/calendar.svg?react';
import CollectionIcon from '@plone/components/icons/collection.svg?react';
import FolderIcon from '@plone/components/icons/folder.svg?react';
import ImageIcon from '@plone/components/icons/image.svg?react';
import LinkIcon from '@plone/components/icons/link.svg?react';
import NewsIcon from '@plone/components/icons/news.svg?react';
import VideoIcon from '@plone/components/icons/video.svg?react';
import PageIcon from '@plone/components/icons/page.svg?react';

export default function install(config: ConfigType) {
  config.settings.hideBreadcrumbs = ['Plone Site', 'Subsite', 'LRF'];

  config.settings.contentIcons = {
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

  return config;
}
