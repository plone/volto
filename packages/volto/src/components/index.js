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
export { default as NotFound } from '@plone/volto/components/theme/NotFound/NotFound';
export { default as Forbidden } from '@plone/volto/components/theme/Forbidden/Forbidden';
export { default as Unauthorized } from '@plone/volto/components/theme/Unauthorized/Unauthorized';

export { default as Avatar } from '@plone/volto/components/theme/Avatar/Avatar';
export { default as Icon } from '@plone/volto/components/theme/Icon/Icon';
export { default as Image } from '@plone/volto/components/theme/Image/Image';
export { default as ConditionalLink } from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
export { default as UniversalLink } from '@plone/volto/components/manage/UniversalLink/UniversalLink';
export { default as LinkMore } from '@plone/volto/components/manage/LinkMore/LinkMore';

// Lazy load them, since we want them and its deps to be in its own chunk
export { default as ContactForm } from '@plone/volto/components/theme/ContactForm/ContactForm';
export { default as Login } from '@plone/volto/components/theme/Login/Login';
export { default as Logout } from '@plone/volto/components/theme/Logout/Logout';
export { default as Sitemap } from '@plone/volto/components/theme/Sitemap/Sitemap';
export { default as Search } from '@plone/volto/components/theme/Search/Search';
export { default as Comments } from '@plone/volto/components/theme/Comments/Comments';
export { default as SocialSharing } from '@plone/volto/components/theme/SocialSharing/SocialSharing';
export { default as Register } from '@plone/volto/components/theme/Register/Register';
export { default as PasswordReset } from '@plone/volto/components/theme/PasswordReset/PasswordReset';
export { default as RequestPasswordReset } from '@plone/volto/components/theme/PasswordReset/RequestPasswordReset';
export { default as ChangePassword } from '@plone/volto/components/manage/Preferences/ChangePassword';
export { default as PersonalPreferences } from '@plone/volto/components/manage/Preferences/PersonalPreferences';
export { default as PersonalInformation } from '@plone/volto/components/manage/Preferences/PersonalInformation';
export { default as CreateTranslation } from '@plone/volto/components/manage/Multilingual/CreateTranslation';
export { default as TranslationObject } from '@plone/volto/components/manage/Multilingual/TranslationObject';
export { default as CompareLanguages } from '@plone/volto/components/manage/Multilingual/CompareLanguages';

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
export { default as Add } from '@plone/volto/components/manage/Add/Add';
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

export { default as Delete } from '@plone/volto/components/manage/Delete/Delete';
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
export { default as Display } from '@plone/volto/components/manage/Display/Display';
export { default as Edit } from '@plone/volto/components/manage/Edit/Edit';
export { default as History } from '@plone/volto/components/manage/History/History';
export { default as Sharing } from '@plone/volto/components/manage/Sharing/Sharing';
export const Rules = loadable(
  () => import('@plone/volto/components/manage/Rules/Rules'),
);
export { default as Aliases } from '@plone/volto/components/manage/Aliases/Aliases';
export { default as LinksToItem } from '@plone/volto/components/manage/LinksToItem/LinksToItem';
export { default as Workflow } from '@plone/volto/components/manage/Workflow/Workflow';
export { default as Messages } from '@plone/volto/components/manage/Messages/Messages';
export { default as BlockChooser } from '@plone/volto/components/manage/BlockChooser/BlockChooser';
export { default as BlockChooserButton } from '@plone/volto/components/manage/BlockChooser/BlockChooserButton';
export { default as Toolbar } from '@plone/volto/components/manage/Toolbar/Toolbar';
export { default as Sidebar } from '@plone/volto/components/manage/Sidebar/Sidebar';
export { default as SidebarPopup } from '@plone/volto/components/manage/Sidebar/SidebarPopup';
export { default as SidebarPortal } from '@plone/volto/components/manage/Sidebar/SidebarPortal';
export { default as PersonalTools } from '@plone/volto/components/manage/Toolbar/PersonalTools';
export { default as More } from '@plone/volto/components/manage/Toolbar/More';
export { default as Types } from '@plone/volto/components/manage/Toolbar/Types';
export { default as Toast } from '@plone/volto/components/manage/Toast/Toast';
export { default as ManageTranslations } from '@plone/volto/components/manage/Multilingual/ManageTranslations';

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
  DatetimeWidget,
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
