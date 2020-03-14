/**
 * Point of contact for component modules.
 * @module components
 * @example import { Field } from 'components';
 */
import loadable from '@loadable/component';

export const App = loadable(() =>
  import('@plone/volto/components/theme/App/App'),
);
export const ContactForm = loadable(() =>
  import('@plone/volto/components/theme/ContactForm/ContactForm'),
);
export const Login = loadable(() =>
  import('@plone/volto/components/theme/Login/Login'),
);
export const Logout = loadable(() =>
  import('@plone/volto/components/theme/Logout/Logout'),
);
export const NotFound = loadable(() =>
  import('@plone/volto/components/theme/NotFound/NotFound'),
);
export const Forbidden = loadable(() =>
  import('@plone/volto/components/theme/Forbidden/Forbidden'),
);
export const Unauthorized = loadable(() =>
  import('@plone/volto/components/theme/Unauthorized/Unauthorized'),
);
export const Search = loadable(() =>
  import('@plone/volto/components/theme/Search/Search'),
);
export const View = loadable(() =>
  import('@plone/volto/components/theme/View/View'),
);
export const Register = loadable(() =>
  import('@plone/volto/components/theme/Register/Register'),
);
export const PasswordReset = loadable(() =>
  import('@plone/volto/components/theme/PasswordReset/PasswordReset'),
);
export const RequestPasswordReset = loadable(() =>
  import('@plone/volto/components/theme/PasswordReset/RequestPasswordReset'),
);
export const ChangePassword = loadable(() =>
  import('@plone/volto/components/manage/Preferences/ChangePassword'),
);
export const DefaultView = loadable(() =>
  import('@plone/volto/components/theme/View/DefaultView'),
);
export const FileView = loadable(() =>
  import('@plone/volto/components/theme/View/FileView'),
);
export const ImageView = loadable(() =>
  import('@plone/volto/components/theme/View/ImageView'),
);
export const NewsItemView = loadable(() =>
  import('@plone/volto/components/theme/View/NewsItemView'),
);
export const EventView = loadable(() =>
  import('@plone/volto/components/theme/View/EventView'),
);
export const ListingView = loadable(() =>
  import('@plone/volto/components/theme/View/ListingView'),
);
export const SummaryView = loadable(() =>
  import('@plone/volto/components/theme/View/SummaryView'),
);
export const TabularView = loadable(() =>
  import('@plone/volto/components/theme/View/TabularView'),
);
export const AlbumView = loadable(() =>
  import('@plone/volto/components/theme/View/AlbumView'),
);
export const Comments = loadable(() =>
  import('@plone/volto/components/theme/Comments/Comments'),
);
export const Tags = loadable(() =>
  import('@plone/volto/components/theme/Tags/Tags'),
);
export const SocialSharing = loadable(() =>
  import('@plone/volto/components/theme/SocialSharing/SocialSharing'),
);
export const Pagination = loadable(() =>
  import('@plone/volto/components/theme/Pagination/Pagination'),
);
export const SearchTags = loadable(() =>
  import('@plone/volto/components/theme/Search/SearchTags'),
);
export const CommentEditModal = loadable(() =>
  import('@plone/volto/components/theme/Comments/CommentEditModal'),
);
export const OutdatedBrowser = loadable(() =>
  import('@plone/volto/components/theme/OutdatedBrowser/OutdatedBrowser'),
);

// CMSUI
export const Toolbar = loadable(() =>
  import('@plone/volto/components/manage/Toolbar/Toolbar'),
);
export const Add = loadable(() =>
  import('@plone/volto/components/manage/Add/Add'),
);
export const Edit = loadable(() =>
  import('@plone/volto/components/manage/Edit/Edit'),
);
export const Contents = loadable(() =>
  import('@plone/volto/components/manage/Contents/Contents'),
);
export const Sharing = loadable(() =>
  import('@plone/volto/components/manage/Sharing/Sharing'),
);
export const Toast = loadable(() =>
  import('@plone/volto/components/manage/Toast/Toast'),
);
export const Controlpanel = loadable(() =>
  import('@plone/volto/components/manage/Controlpanels/Controlpanel'),
);
export const Controlpanels = loadable(() =>
  import('@plone/volto/components/manage/Controlpanels/Controlpanels'),
);
export const ModerateComments = loadable(() =>
  import('@plone/volto/components/manage/Controlpanels/ModerateComments'),
);
export const UsersControlpanel = loadable(() =>
  import('@plone/volto/components/manage/Controlpanels/UsersControlpanel'),
);
export const Delete = loadable(() =>
  import('@plone/volto/components/manage/Delete/Delete'),
);
export const Diff = loadable(() =>
  import('@plone/volto/components/manage/Diff/Diff'),
);
export const ModalForm = loadable(() =>
  import('@plone/volto/components/manage/Form/ModalForm'),
);
export const History = loadable(() =>
  import('@plone/volto/components/manage/History/History'),
);

export const Anontools = loadable(() =>
  import('@plone/volto/components/theme/Anontools/Anontools'),
);
export const Breadcrumbs = loadable(() =>
  import('@plone/volto/components/theme/Breadcrumbs/Breadcrumbs'),
);
export const Footer = loadable(() =>
  import('@plone/volto/components/theme/Footer/Footer'),
);
export const Header = loadable(() =>
  import('@plone/volto/components/theme/Header/Header'),
);
export const Icon = loadable(() =>
  import('@plone/volto/components/theme/Icon/Icon'),
);
export const Logo = loadable(() =>
  import('@plone/volto/components/theme/Logo/Logo'),
);
export const Navigation = loadable(() =>
  import('@plone/volto/components/theme/Navigation/Navigation'),
);
export const SearchWidget = loadable(() =>
  import('@plone/volto/components/theme/SearchWidget/SearchWidget'),
);
export const Title = loadable(() =>
  import('@plone/volto/components/theme/Title/Title'),
);

export const Actions = loadable(() =>
  import('@plone/volto/components/manage/Actions/Actions'),
);
export const ContentsIndexHeader = loadable(() =>
  import('@plone/volto/components/manage/Contents/ContentsIndexHeader'),
);
export const ContentsItem = loadable(() =>
  import('@plone/volto/components/manage/Contents/ContentsItem'),
);
export const ContentsUploadModal = loadable(() =>
  import('@plone/volto/components/manage/Contents/ContentsUploadModal'),
);
export const ContentsPropertiesModal = loadable(() =>
  import('@plone/volto/components/manage/Contents/ContentsPropertiesModal'),
);
export const ContentsRenameModal = loadable(() =>
  import('@plone/volto/components/manage/Contents/ContentsRenameModal'),
);
export const ContentsWorkflowModal = loadable(() =>
  import('@plone/volto/components/manage/Contents/ContentsWorkflowModal'),
);
export const ContentsTagsModal = loadable(() =>
  import('@plone/volto/components/manage/Contents/ContentsTagsModal'),
);

export const UsersControlpanelGroups = loadable(() =>
  import(
    '@plone/volto/components/manage/Controlpanels/UsersControlpanelGroups'
  ),
);
export const VersionOverview = loadable(() =>
  import('@plone/volto/components/manage/Controlpanels/VersionOverview'),
);
export const UsersControlpanelUser = loadable(() =>
  import('@plone/volto/components/manage/Controlpanels/UsersControlpanelUser'),
);
export const DiffField = loadable(() =>
  import('@plone/volto/components/manage/Diff/DiffField'),
);
export const Display = loadable(() =>
  import('@plone/volto/components/manage/Display/Display'),
);
export const Form = loadable(() =>
  import('@plone/volto/components/manage/Form/Form'),
);
export const Field = loadable(() =>
  import('@plone/volto/components/manage/Form/Field'),
);

export const Messages = loadable(() =>
  import('@plone/volto/components/manage/Messages/Messages'),
);
export const PersonalPreferences = loadable(() =>
  import('@plone/volto/components/manage/Preferences/PersonalPreferences'),
);
export const PersonalInformation = loadable(() =>
  import('@plone/volto/components/manage/Preferences/PersonalInformation'),
);
export const ArrayWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/ArrayWidget'),
);
export const CheckboxWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/CheckboxWidget'),
);
export const DatetimeWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/DatetimeWidget'),
);
export const FileWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/FileWidget'),
);
export const PasswordWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/PasswordWidget'),
);
export const ReferenceWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/ReferenceWidget'),
);
export const SchemaWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/SchemaWidget'),
);
export const SchemaWidgetFieldset = loadable(() =>
  import('@plone/volto/components/manage/Widgets/SchemaWidgetFieldset'),
);
export const SelectWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/SelectWidget'),
);
export const Sidebar = loadable(() =>
  import('@plone/volto/components/manage/Sidebar/Sidebar'),
);
export const SidebarPortal = loadable(() =>
  import('@plone/volto/components/manage/Sidebar/SidebarPortal'),
);
export const TextareaWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/TextareaWidget'),
);
export const TextWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/TextWidget'),
);
export const WysiwygWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/WysiwygWidget'),
);
export const Workflow = loadable(() =>
  import('@plone/volto/components/manage/Workflow/Workflow'),
);

export const BlockChooser = loadable(() =>
  import('@plone/volto/components/manage/BlockChooser/BlockChooser'),
);

export const EditDescriptionBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Description/Edit'),
);
export const EditTitleBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Title/Edit'),
);
export const EditTextBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Text/Edit'),
);
export const EditImageBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Image/Edit'),
);
export const EditVideoBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Video/Edit'),
);
export const EditBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Block/Edit'),
);
export const EditHeroImageLeftBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/HeroImageLeft/Edit'),
);
export const ViewHeroImageLeftBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/HeroImageLeft/View'),
);
export const EditMapBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Maps/Edit'),
);
export const EditHTMLBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/HTML/Edit'),
);
export const EditToCBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/ToC/Edit'),
);
export const EditListingBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Listing/Edit'),
);

export const ViewDescriptionBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Description/View'),
);
export const ViewTitleBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Title/View'),
);
export const ViewTextBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Text/View'),
);
export const ViewImageBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Image/View'),
);
export const ViewVideoBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Video/View'),
);
export const ViewMapBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Maps/View'),
);
export const ViewHTMLBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/HTML/View'),
);
export const ViewToCBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/ToC/View'),
);
export const ViewListingBlock = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Listing/View'),
);

export const ListingBlockBody = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Listing/ListingBody'),
);
export const ListingBlockData = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Listing/ListingData'),
);
export const ListingBlockStyle = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Listing/ListingStyle'),
);
export const ListingBlockMore = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Listing/ListingMore'),
);
export const ListingBlockSidebar = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Listing/ListingSidebar'),
);

export const ImageSidebar = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Image/ImageSidebar'),
);
export const MapsSidebar = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Maps/MapsSidebar'),
);
export const VideoSidebar = loadable(() =>
  import('@plone/volto/components/manage/Blocks/Video/VideoSidebar'),
);
export const LeadImageSidebar = loadable(() =>
  import('@plone/volto/components/manage/Blocks/LeadImage/LeadImageSidebar'),
);

export const PersonalTools = loadable(() =>
  import('@plone/volto/components/manage/Toolbar/PersonalTools'),
);
export const More = loadable(() =>
  import('@plone/volto/components/manage/Toolbar/More'),
);
export const Types = loadable(() =>
  import('@plone/volto/components/manage/Toolbar/Types'),
);
export const ConditionalLink = loadable(() =>
  import('@plone/volto/components/manage/ConditionalLink/ConditionalLink'),
);
