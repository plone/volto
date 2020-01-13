import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div></div>;

export const Anontools = Loadable({
  loader: () => import('@plone/volto/components/theme/Anontools/Anontools'),
  loading: Loading,
});
export const Breadcrumbs = Loadable({
  loader: () => import('@plone/volto/components/theme/Breadcrumbs/Breadcrumbs'),
  loading: Loading,
});
export const ContactForm = Loadable({
  loader: () => import('@plone/volto/components/theme/ContactForm/ContactForm'),
  loading: Loading,
});
export const Footer = Loadable({
  loader: () => import('@plone/volto/components/theme/Footer/Footer'),
  loading: Loading,
});
export const Header = Loadable({
  loader: () => import('@plone/volto/components/theme/Header/Header'),
  loading: Loading,
});
export const Icon = Loadable({
  loader: () => import('@plone/volto/components/theme/Icon/Icon'),
  loading: Loading,
});
export const Logo = Loadable({
  loader: () => import('@plone/volto/components/theme/Logo/Logo'),
  loading: Loading,
});
export const Navigation = Loadable({
  loader: () => import('@plone/volto/components/theme/Navigation/Navigation'),
  loading: Loading,
});
export const SearchWidget = Loadable({
  loader: () =>
    import('@plone/volto/components/theme/SearchWidget/SearchWidget'),
  loading: Loading,
});
export const Title = Loadable({
  loader: () => import('@plone/volto/components/theme/Title/Title'),
  loading: Loading,
});
export const App = Loadable({
  loader: () => import('@plone/volto/components/theme/App/App'),
  loading: Loading,
});
export const DefaultView = Loadable({
  loader: () => import('@plone/volto/components/theme/View/DefaultView'),
  loading: Loading,
});
export const FileView = Loadable({
  loader: () => import('@plone/volto/components/theme/View/FileView'),
  loading: Loading,
});
export const ImageView = Loadable({
  loader: () => import('@plone/volto/components/theme/View/ImageView'),
  loading: Loading,
});
export const NewsItemView = Loadable({
  loader: () => import('@plone/volto/components/theme/View/NewsItemView'),
  loading: Loading,
});
export const ListingView = Loadable({
  loader: () => import('@plone/volto/components/theme/View/ListingView'),
  loading: Loading,
});
export const Login = Loadable({
  loader: () => import('@plone/volto/components/theme/Login/Login'),
  loading: Loading,
});
export const Logout = Loadable({
  loader: () => import('@plone/volto/components/theme/Logout/Logout'),
  loading: Loading,
});
export const NotFound = Loadable({
  loader: () => import('@plone/volto/components/theme/NotFound/NotFound'),
  loading: Loading,
});
export const Pagination = Loadable({
  loader: () => import('@plone/volto/components/theme/Pagination/Pagination'),
  loading: Loading,
});
export const SummaryView = Loadable({
  loader: () => import('@plone/volto/components/theme/View/SummaryView'),
  loading: Loading,
});
export const Search = Loadable({
  loader: () => import('@plone/volto/components/theme/Search/Search'),
  loading: Loading,
});
export const SearchTags = Loadable({
  loader: () => import('@plone/volto/components/theme/Search/SearchTags'),
  loading: Loading,
});
export const TabularView = Loadable({
  loader: () => import('@plone/volto/components/theme/View/TabularView'),
  loading: Loading,
});
export const View = Loadable({
  loader: () => import('@plone/volto/components/theme/View/View'),
  loading: Loading,
});
export const Comments = Loadable({
  loader: () => import('@plone/volto/components/theme/Comments/Comments'),
  loading: Loading,
});
export const CommentEditModal = Loadable({
  loader: () =>
    import('@plone/volto/components/theme/Comments/CommentEditModal'),
  loading: Loading,
});
export const SocialSharing = Loadable({
  loader: () =>
    import('@plone/volto/components/theme/SocialSharing/SocialSharing'),
  loading: Loading,
});
export const Tags = Loadable({
  loader: () => import('@plone/volto/components/theme/Tags/Tags'),
  loading: Loading,
});
export const Register = Loadable({
  loader: () => import('@plone/volto/components/theme/Register/Register'),
  loading: Loading,
});
export const PasswordReset = Loadable({
  loader: () =>
    import('@plone/volto/components/theme/PasswordReset/PasswordReset'),
  loading: Loading,
});
export const RequestPasswordReset = Loadable({
  loader: () =>
    import('@plone/volto/components/theme/PasswordReset/RequestPasswordReset'),
  loading: Loading,
});

export const Actions = Loadable({
  loader: () => import('@plone/volto/components/manage/Actions/Actions'),
  loading: Loading,
});
export const Add = Loadable({
  loader: () => import('@plone/volto/components/manage/Add/Add'),
  loading: Loading,
});
export const Contents = Loadable({
  loader: () => import('@plone/volto/components/manage/Contents/Contents'),
  loading: Loading,
});
export const ContentsIndexHeader = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Contents/ContentsIndexHeader'),
  loading: Loading,
});
export const ContentsItem = Loadable({
  loader: () => import('@plone/volto/components/manage/Contents/ContentsItem'),
  loading: Loading,
});
export const ContentsUploadModal = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Contents/ContentsUploadModal'),
  loading: Loading,
});
export const ContentsPropertiesModal = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Contents/ContentsPropertiesModal'),
  loading: Loading,
});
export const ContentsRenameModal = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Contents/ContentsRenameModal'),
  loading: Loading,
});
export const ContentsWorkflowModal = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Contents/ContentsWorkflowModal'),
  loading: Loading,
});
export const ContentsTagsModal = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Contents/ContentsTagsModal'),
  loading: Loading,
});
export const Controlpanel = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Controlpanels/Controlpanel'),
  loading: Loading,
});
export const Controlpanels = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Controlpanels/Controlpanels'),
  loading: Loading,
});
export const ModerateComments = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Controlpanels/ModerateComments'),
  loading: Loading,
});
export const UsersControlpanel = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Controlpanels/UsersControlpanel'),
  loading: Loading,
});
export const UsersControlpanelGroups = Loadable({
  loader: () =>
    import(
      '@plone/volto/components/manage/Controlpanels/UsersControlpanelGroups'
    ),
  loading: Loading,
});
export const VersionOverview = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Controlpanels/VersionOverview'),
  loading: Loading,
});
export const Delete = Loadable({
  loader: () => import('@plone/volto/components/manage/Delete/Delete'),
  loading: Loading,
});
export const UsersControlpanelUser = Loadable({
  loader: () =>
    import(
      '@plone/volto/components/manage/Controlpanels/UsersControlpanelUser'
    ),
  loading: Loading,
});
export const Diff = Loadable({
  loader: () => import('@plone/volto/components/manage/Diff/Diff'),
  loading: Loading,
});
export const DiffField = Loadable({
  loader: () => import('@plone/volto/components/manage/Diff/DiffField'),
  loading: Loading,
});
export const Display = Loadable({
  loader: () => import('@plone/volto/components/manage/Display/Display'),
  loading: Loading,
});
export const Edit = Loadable({
  loader: () => import('@plone/volto/components/manage/Edit/Edit'),
  loading: Loading,
});
export const Form = Loadable({
  loader: () => import('@plone/volto/components/manage/Form/Form'),
  loading: Loading,
});
export const Field = Loadable({
  loader: () => import('@plone/volto/components/manage/Form/Field'),
  loading: Loading,
});
export const ModalForm = Loadable({
  loader: () => import('@plone/volto/components/manage/Form/ModalForm'),
  loading: Loading,
});
export const History = Loadable({
  loader: () => import('@plone/volto/components/manage/History/History'),
  loading: Loading,
});
export const Messages = Loadable({
  loader: () => import('@plone/volto/components/manage/Messages/Messages'),
  loading: Loading,
});
export const ChangePassword = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Preferences/ChangePassword'),
  loading: Loading,
});
export const PersonalPreferences = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Preferences/PersonalPreferences'),
  loading: Loading,
});
export const PersonalInformation = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Preferences/PersonalInformation'),
  loading: Loading,
});
export const ArrayWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/ArrayWidget'),
  loading: Loading,
});
export const CheckboxWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/CheckboxWidget'),
  loading: Loading,
});
export const DatetimeWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/DatetimeWidget'),
  loading: Loading,
});
export const FileWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/FileWidget'),
  loading: Loading,
});
export const PasswordWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/PasswordWidget'),
  loading: Loading,
});
export const ReferenceWidget = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Widgets/ReferenceWidget'),
  loading: Loading,
});
export const SchemaWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/SchemaWidget'),
  loading: Loading,
});
export const SchemaWidgetFieldset = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Widgets/SchemaWidgetFieldset'),
  loading: Loading,
});
export const SelectWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/SelectWidget'),
  loading: Loading,
});
export const Sidebar = Loadable({
  loader: () => import('@plone/volto/components/manage/Sidebar/Sidebar'),
  loading: Loading,
});
export const SidebarPortal = Loadable({
  loader: () => import('@plone/volto/components/manage/Sidebar/SidebarPortal'),
  loading: Loading,
});
export const Sharing = Loadable({
  loader: () => import('@plone/volto/components/manage/Sharing/Sharing'),
  loading: Loading,
});
export const TextareaWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/TextareaWidget'),
  loading: Loading,
});
export const TextWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/TextWidget'),
  loading: Loading,
});
export const Toolbar = Loadable({
  loader: () => import('@plone/volto/components/manage/Toolbar/Toolbar'),
  loading: Loading,
});
export const WysiwygWidget = Loadable({
  loader: () => import('@plone/volto/components/manage/Widgets/WysiwygWidget'),
  loading: Loading,
});
export const Workflow = Loadable({
  loader: () => import('@plone/volto/components/manage/Workflow/Workflow'),
  loading: Loading,
});

export const BlockChooser = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/BlockChooser/BlockChooser'),
  loading: Loading,
});

export const EditDescriptionBlock = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Blocks/Description/Edit'),
  loading: Loading,
});
export const EditTitleBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Title/Edit'),
  loading: Loading,
});
export const EditTextBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Text/Edit'),
  loading: Loading,
});
export const EditImageBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Image/Edit'),
  loading: Loading,
});
export const EditVideoBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Video/Edit'),
  loading: Loading,
});
export const EditBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Block/Edit'),
  loading: Loading,
});
export const EditHeroImageLeftBlock = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Blocks/HeroImageLeft/Edit'),
  loading: Loading,
});
export const ViewHeroImageLeftBlock = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Blocks/HeroImageLeft/View'),
  loading: Loading,
});
export const EditMapBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Maps/Edit'),
  loading: Loading,
});
export const EditHTMLBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/HTML/Edit'),
  loading: Loading,
});

export const ViewDescriptionBlock = Loadable({
  loader: () =>
    import('@plone/volto/components/manage/Blocks/Description/View'),
  loading: Loading,
});
export const ViewTitleBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Title/View'),
  loading: Loading,
});
export const ViewTextBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Text/View'),
  loading: Loading,
});
export const ViewImageBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Image/View'),
  loading: Loading,
});
export const ViewVideoBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Video/View'),
  loading: Loading,
});
export const ViewMapBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/Maps/View'),
  loading: Loading,
});
export const ViewHTMLBlock = Loadable({
  loader: () => import('@plone/volto/components/manage/Blocks/HTML/View'),
  loading: Loading,
});

export const ImageSidebar = Loadable({
  loader: () => import('@plone/volto/components/manage/Sidebar/ImageSidebar'),
  loading: Loading,
});

export const PersonalTools = Loadable({
  loader: () => import('@plone/volto/components/manage/Toolbar/PersonalTools'),
  loading: Loading,
});
export const More = Loadable({
  loader: () => import('@plone/volto/components/manage/Toolbar/More'),
  loading: Loading,
});
export const Types = Loadable({
  loader: () => import('@plone/volto/components/manage/Toolbar/Types'),
  loading: Loading,
});
export const Toast = Loadable({
  loader: () => import('@plone/volto/components/manage/Toast/Toast'),
  loading: Loading,
});
