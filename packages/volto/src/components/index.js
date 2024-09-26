/**
 * Point of contact for component modules. This file is quite sensitive regarding the
 * order in which it's loaded. e.g. if the component depends on others to work, it
 * should ideally be loaded after them. If you start seeing imported components as
 * undefined, check the order of imports in this file.
 * @module components
 */
import loadable from '@loadable/component';

//  Do not lazy load them, since it has not much sense (they will live in the main chunk)
// The App and View component are deliberatelly left out of this index.js file!
// They should be used by Volto and only by Volto internally
export { default as AppExtras } from '@plone/volto/components/theme/AppExtras/AppExtras';
export { default as Header } from '@plone/volto/components/theme/Header/Header';
export { default as Logo } from '@plone/volto/components/theme/Logo/Logo';
export { default as Anontools } from '@plone/volto/components/theme/Anontools/Anontools';
export { default as Navigation } from '@plone/volto/components/theme/Navigation/Navigation';
export { default as Breadcrumbs } from '@plone/volto/components/theme/Breadcrumbs/Breadcrumbs';
export { default as SearchWidget } from '@plone/volto/components/theme/SearchWidget/SearchWidget';
export { default as Footer } from '@plone/volto/components/theme/Footer/Footer';
export { default as Title } from '@plone/volto/components/theme/Title/Title';
export { default as DefaultView } from '@plone/volto/components/theme/View/DefaultView';
export { default as Pagination } from '@plone/volto/components/theme/Pagination/Pagination';
export { default as Tags } from '@plone/volto/components/theme/Tags/Tags';
export { default as OutdatedBrowser } from '@plone/volto/components/theme/OutdatedBrowser/OutdatedBrowser';
export { default as LanguageSelector } from '@plone/volto/components/theme/LanguageSelector/LanguageSelector';
export { default as RenderBlocks } from '@plone/volto/components/theme/View/RenderBlocks';
export { default as SkipLinks } from '@plone/volto/components/theme/SkipLinks/SkipLinks';
export { default as EventDetails } from '@plone/volto/components/theme/EventDetails/EventDetails';
export { default as PreviewImage } from '@plone/volto/components/theme/PreviewImage/PreviewImage';

export { default as Error } from '@plone/volto/components/theme/Error/Error';
export { default as ErrorBoundary } from '@plone/volto/components/theme/Error/ErrorBoundary';
export const NotFound = loadable(
  () => import('@plone/volto/components/theme/NotFound/NotFound'),
);
export const Forbidden = loadable(
  () => import('@plone/volto/components/theme/Forbidden/Forbidden'),
);
export const Unauthorized = loadable(
  () => import('@plone/volto/components/theme/Unauthorized/Unauthorized'),
);
export { default as Avatar } from '@plone/volto/components/theme/Avatar/Avatar';
export { default as Icon } from '@plone/volto/components/theme/Icon/Icon';
export { default as Image } from '@plone/volto/components/theme/Image/Image';
export { default as ConditionalLink } from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
export { default as UniversalLink } from '@plone/volto/components/manage/UniversalLink/UniversalLink';
export { default as LinkMore } from '@plone/volto/components/manage/LinkMore/LinkMore';

// Lazy load them, since we want them and its deps to be in its own chunk
export const ContactForm = loadable(
  () => import('@plone/volto/components/theme/ContactForm/ContactForm'),
);
export const Login = loadable(
  () => import('@plone/volto/components/theme/Login/Login'),
);
export { default as Logout } from '@plone/volto/components/theme/Logout/Logout';
export const Sitemap = loadable(
  () => import('@plone/volto/components/theme/Sitemap/Sitemap'),
);
export const Search = loadable(
  () => import('@plone/volto/components/theme/Search/Search'),
);

export { default as Comments } from '@plone/volto/components/theme/Comments/Comments';
export const Register = loadable(
  () => import('@plone/volto/components/theme/Register/Register'),
);
export const PasswordReset = loadable(
  () => import('@plone/volto/components/theme/PasswordReset/PasswordReset'),
);
export const RequestPasswordReset = loadable(
  () =>
    import('@plone/volto/components/theme/PasswordReset/RequestPasswordReset'),
);
export {
  ChangePassword,
  PersonalPreferences,
  PersonalInformation,
} from '@plone/volto/components/manage/Preferences';

export {
  CreateTranslation,
  TranslationObject,
  CompareLanguages,
  ManageTranslations,
} from '@plone/volto/components/manage/Multilingual';
export { default as FileView } from '@plone/volto/components/theme/View/FileView';
export { default as ImageView } from '@plone/volto/components/theme/View/ImageView';
export { default as NewsItemView } from '@plone/volto/components/theme/View/NewsItemView';

export const EventView = loadable(
  () => import('@plone/volto/components/theme/View/EventView'),
);

export { default as ListingView } from '@plone/volto/components/theme/View/ListingView';
export { default as SummaryView } from '@plone/volto/components/theme/View/SummaryView';
export { default as TabularView } from '@plone/volto/components/theme/View/TabularView';
export { default as AlbumView } from '@plone/volto/components/theme/View/AlbumView';

export { default as Actions } from '@plone/volto/components/manage/Actions/Actions';
export { Add } from '@plone/volto/components/manage/Add';
export {
  Controlpanels,
  Controlpanel,
  RulesControlpanel,
  AddRuleControlpanel,
  EditRuleControlpanel,
  ConfigureRuleControlpanel,
  UsersControlpanel,
  RenderUsers,
  UserGroupMembershipControlPanel,
  GroupsControlpanel,
  RenderGroups,
  RelationsControlpanel,
  AliasesControlpanel,
  UndoControlpanel,
  AddonsControlpanel,
  ContentType,
  ContentTypeLayout,
  ContentTypeSchema,
  ContentTypes,
  VersionOverview,
  UpgradeControlPanel,
  ModerateComments,
  DatabaseInformation,
} from '@plone/volto/components/manage/Controlpanels';

export { default as Circle } from '@plone/volto/components/manage/Contents/circle';

export const Delete = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Delete/Delete'
    ),
);
export const Diff = loadable(
  () =>
    import(
      /* webpackChunkName: "HistoryView" */ '@plone/volto/components/manage/Diff/Diff'
    ),
);
export const DiffField = loadable(
  () =>
    import(
      /* webpackChunkName: "HistoryView" */ '@plone/volto/components/manage/Diff/DiffField'
    ),
);
export const Display = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Display/Display'
    ),
);

export { Edit } from '@plone/volto/components/manage/Edit';
export const History = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/History/History'
    ),
);
export const Sharing = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Sharing/Sharing'
    ),
);
export const Rules = loadable(
  () => import('@plone/volto/components/manage/Rules/Rules'),
);
export const Aliases = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Aliases/Aliases'
    ),
);
export const LinksToItem = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/LinksToItem/LinksToItem'
    ),
);
export const Workflow = loadable(
  () =>
    import(
      /* webpackChunkName: "Manage" */ '@plone/volto/components/manage/Workflow/Workflow'
    ),
);
export { default as Messages } from '@plone/volto/components/manage/Messages/Messages';
export {
  BlockChooser,
  BlockChooserButton,
} from '@plone/volto/components/manage/BlockChooser';

export {
  Toolbar,
  More,
  PersonalTools,
  Types,
} from '@plone/volto/components/manage/Toolbar';
export {
  Sidebar,
  SidebarPopup,
  SidebarPortal,
} from '@plone/volto/components/manage/Sidebar';

export { default as Toast } from '@plone/volto/components/manage/Toast/Toast';

export {
  Field,
  InlineForm,
  ModalForm,
  UndoToolbar,
  BlocksToolbar,
  BlockDataForm,
  BlocksForm,
  Form,
} from '@plone/volto/components/manage/Form';
export { default as SearchTags } from '@plone/volto/components/theme/Search/SearchTags';
export { CommentEditModal } from '@plone/volto/components/theme/Comments';
export {
  Contents,
  ContentsBreadcrumbs,
  ContentsIndexHeader,
  ContentsItem,
  ContentsUploadModal,
  ContentsPropertiesModal,
  ContentsRenameModal,
  ContentsWorkflowModal,
  ContentsTagsModal,
} from '@plone/volto/components/manage/Contents';
export { default as DragDropList } from '@plone/volto/components/manage/DragDropList/DragDropList';

export {
  AlignWidget,
  ButtonsWidget,
  ArrayWidget,
  CheckboxWidget,
  FileWidget,
  IdWidget,
  PasswordWidget,
  QueryWidget,
  QuerySortOnWidget,
  QuerystringWidget,
  SchemaWidget,
  SelectWidget,
  TextareaWidget,
  TextWidget,
  TokenWidget,
  WysiwygWidget,
  UrlWidget,
  InternalUrlWidget,
  EmailWidget,
  NumberWidget,
  ImageSizeWidget,
  RegistryImageWidget,
  ReferenceWidget,
  ObjectBrowserWidget,
  ObjectWidget,
  ObjectListWidget,
  VocabularyTermsWidget,
  SelectMetadataWidget,
  SelectAutoComplete,
  ColorPickerWidget,
  // DatetimeWidget,
  RecurrenceWidget,
  FormFieldWrapper,
} from '@plone/volto/components/manage/Widgets';

export const SchemaWidgetFieldset = loadable(
  () => import('@plone/volto/components/manage/Widgets/SchemaWidgetFieldset'),
);
export const ObjectBrowserWidgetMode = loadable(
  () => import('@plone/volto/components/manage/Widgets/ObjectBrowserWidget'),
);

export { default as EditDefaultBlock } from '@plone/volto/components/manage/Blocks/Block/DefaultEdit';
export { default as EditDescriptionBlock } from '@plone/volto/components/manage/Blocks/Description/Edit';
export { default as EditTitleBlock } from '@plone/volto/components/manage/Blocks/Title/Edit';
export { default as EditToCBlock } from '@plone/volto/components/manage/Blocks/ToC/Edit';
export { default as EditImageBlock } from '@plone/volto/components/manage/Blocks/Image/Edit';
export { default as EditListingBlock } from '@plone/volto/components/manage/Blocks/Listing/Edit';
export { default as EditVideoBlock } from '@plone/volto/components/manage/Blocks/Video/Edit';
export { default as EditBlock } from '@plone/volto/components/manage/Blocks/Block/Edit';
export { default as EditMapBlock } from '@plone/volto/components/manage/Blocks/Maps/Edit';
export { default as EditHTMLBlock } from '@plone/volto/components/manage/Blocks/HTML/Edit';

export { default as ViewDefaultBlock } from '@plone/volto/components/manage/Blocks/Block/DefaultView';
export { default as ViewDescriptionBlock } from '@plone/volto/components/manage/Blocks/Description/View';
export { default as ViewTitleBlock } from '@plone/volto/components/manage/Blocks/Title/View';
export { default as ViewToCBlock } from '@plone/volto/components/manage/Blocks/ToC/View';
export { default as ViewImageBlock } from '@plone/volto/components/manage/Blocks/Image/View';
export { default as ViewListingBlock } from '@plone/volto/components/manage/Blocks/Listing/View';
export { default as ViewVideoBlock } from '@plone/volto/components/manage/Blocks/Video/View';
export { default as ViewMapBlock } from '@plone/volto/components/manage/Blocks/Maps/View';
export { default as ViewHTMLBlock } from '@plone/volto/components/manage/Blocks/HTML/View';

export { default as ListingBlockBody } from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
export { default as ListingBlockData } from '@plone/volto/components/manage/Blocks/Listing/ListingData';

export { default as ImageSidebar } from '@plone/volto/components/manage/Blocks/Image/ImageSidebar';
export { default as MapsSidebar } from '@plone/volto/components/manage/Blocks/Maps/MapsSidebar';
export { default as VideoSidebar } from '@plone/volto/components/manage/Blocks/Video/VideoSidebar';
export { default as LeadImageSidebar } from '@plone/volto/components/manage/Blocks/LeadImage/LeadImageSidebar';

export { default as Style } from '@plone/volto/components/manage/Blocks/Block/Style';
export { default as BlockSettingsSidebar } from '@plone/volto/components/manage/Blocks/Block/Settings';
export { default as BlockSettingsSchema } from '@plone/volto/components/manage/Blocks/Block/Schema';
export { default as ImageSettingsSchema } from '@plone/volto/components/manage/Blocks/Image/LayoutSchema';
export { default as ToCSettingsSchema } from '@plone/volto/components/manage/Blocks/ToC/Schema';

export { default as MaybeWrap } from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
export { default as ContentMetadataTags } from '@plone/volto/components/theme/ContentMetadataTags/ContentMetadataTags';
export { default as FormattedDate } from '@plone/volto/components/theme/FormattedDate/FormattedDate';
export { default as FormattedRelativeDate } from '@plone/volto/components/theme/FormattedDate/FormattedRelativeDate';
export { default as Popup } from '@plone/volto/components/theme/Popup/Popup';
export { default as Component } from '@plone/volto/components/theme/Component/Component';

export { default as App } from '@plone/volto/components/theme/App/App';
