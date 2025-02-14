import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '../components/Icons';

import '../styles/basic/icons.css';

const IconsList: React.FC = () => {
  const icons = [
    Icons.AddIcon,
    Icons.AligncenterIcon,
    Icons.AlignleftIcon,
    Icons.AlignrightIcon,
    Icons.ArchiveIcon,
    Icons.ArrowdownIcon,
    Icons.ArrowleftIcon,
    Icons.ArrowrightIcon,
    Icons.ArrowtoprightIcon,
    Icons.ArrowupIcon,
    Icons.AttachmentIcon,
    Icons.AutomatedcontentIcon,
    Icons.BackgroundIcon,
    Icons.BinIcon,
    Icons.BlindIcon,
    Icons.BoldIcon,
    Icons.CalendarIcon,
    Icons.CheckboxIcon,
    Icons.ChevrondownIcon,
    Icons.ChevronleftIcon,
    Icons.ChevronrightIcon,
    Icons.ChevronupIcon,
    Icons.CloseIcon,
    Icons.CodeIcon,
    Icons.CollectionIcon,
    Icons.ColumnafterIcon,
    Icons.ColumnbeforeIcon,
    Icons.ColumndeleteIcon,
    Icons.ColumnsIcon,
    Icons.CopyIcon,
    Icons.CutIcon,
    Icons.DashIcon,
    Icons.DiscussionIcon,
    Icons.DraggableIcon,
    Icons.EditIcon,
    Icons.EyeIcon,
    Icons.FilterIcon,
    Icons.FolderIcon,
    Icons.FooterIcon,
    Icons.ForegroundIcon,
    Icons.FullscreenIcon,
    Icons.HighlightIcon,
    Icons.HistoryIcon,
    Icons.HomeIcon,
    Icons.ImagefitIcon,
    Icons.ImagefullIcon,
    Icons.ImageIcon,
    Icons.ImageleftIcon,
    Icons.ImagerightIcon,
    Icons.InfoIcon,
    Icons.ItalicIcon,
    Icons.LanguageIcon,
    Icons.LeadingIcon,
    Icons.LeadingimageIcon,
    Icons.LinkIcon,
    Icons.ListIcon,
    Icons.ListnumbersIcon,
    Icons.MailIcon,
    Icons.MandatoryIcon,
    Icons.MapIcon,
    Icons.MenuIcon,
    Icons.MergedIcon,
    Icons.MoreoptionsIcon,
    Icons.NavigationIcon,
    Icons.NewsIcon,
    Icons.OutIcon,
    Icons.PageIcon,
    Icons.ParagraphIcon,
    Icons.PasteIcon,
    Icons.PauseIcon,
    Icons.PencilIcon,
    Icons.PlayIcon,
    Icons.PropertiesIcon,
    Icons.QuotesIcon,
    Icons.RadiobuttonIcon,
    Icons.RedoIcon,
    Icons.RenameIcon,
    Icons.ReverseIcon,
    Icons.ReviewIcon,
    Icons.RowafterIcon,
    Icons.RowbeforeIcon,
    Icons.RowdeleteIcon,
    Icons.SearchIcon,
    Icons.SecurityIcon,
    Icons.SettingsIcon,
    Icons.ShareIcon,
    Icons.SliderIcon,
    Icons.SocialIcon,
    Icons.SpacerIcon,
    Icons.StateIcon,
    Icons.SubtitleIcon,
    Icons.TableIcon,
    Icons.TagIcon,
    Icons.TextIcon,
    Icons.ThumbnailsIcon,
    Icons.TitleIcon,
    Icons.TocIcon,
    Icons.UndoIcon,
    Icons.UploadIcon,
    Icons.UserIcon,
    Icons.VideoIcon,
    Icons.VoltoIcon,
    Icons.WindowedIcon,
    Icons.WorldIcon,
  ];

  return (
    <div>
      {icons.map((QuantaIcon) => (
        <div
          key={QuantaIcon.name}
          style={{
            height: '100px',
            width: '100px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              backgroundColor: 'transparent',
              padding: '3px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '14px',
            }}
          >
            <QuantaIcon size="L" />
            <br />
            {QuantaIcon.name.replace('Icon', '')}
          </span>
        </div>
      ))}
    </div>
  );
};

const meta = {
  title: 'StyleGuide/Icons',
  component: IconsList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
