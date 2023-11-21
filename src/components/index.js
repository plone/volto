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

export const EventView = loadable(() =>
  import('@plone/volto/components/theme/View/EventView'),
);

export { default as ListingView } from '@plone/volto/components/theme/View/ListingView';
export { default as SummaryView } from '@plone/volto/components/theme/View/SummaryView';
export { default as TabularView } from '@plone/volto/components/theme/View/TabularView';
export { default as AlbumView } from '@plone/volto/components/theme/View/AlbumView';

export { default as Actions } from '@plone/volto/components/manage/Actions/Actions';
export { default as Add } from '@plone/volto/components/manage/Add/Add';
export { default as AddonsControlpanel } from '@plone/volto/components/manage/Controlpanels/AddonsControlpanel';
export { default as UndoControlpanel } from '@plone/volto/components/manage/Controlpanels/UndoControlpanel';
export { default as Contents } from '@plone/volto/components/manage/Contents/Contents';
export { default as Circle } from '@plone/volto/components/manage/Contents/circle';
export { default as DatabaseInformation } from '@plone/volto/components/manage/Controlpanels/DatabaseInformation';
export { default as Controlpanel } from '@plone/volto/components/manage/Controlpanels/Controlpanel';
export { default as Controlpanels } from '@plone/volto/components/manage/Controlpanels/Controlpanels';
export { default as AliasesControlpanel } from '@plone/volto/components/manage/Controlpanels/Aliases';
export { default as ContentTypes } from '@plone/volto/components/manage/Controlpanels/ContentTypes';
export { default as ContentType } from '@plone/volto/components/manage/Controlpanels/ContentType';
export { default as ContentTypeLayout } from '@plone/volto/components/manage/Controlpanels/ContentTypeLayout';
export { default as ContentTypeSchema } from '@plone/volto/components/manage/Controlpanels/ContentTypeSchema';
export { default as ContentTypesActions } from '@plone/volto/components/manage/Controlpanels/ContentTypesActions';
export { default as UsersControlpanel } from '@plone/volto/components/manage/Controlpanels/Users/UsersControlpanel';
export { default as UserGroupMembershipControlPanel } from '@plone/volto/components/manage/Controlpanels/Users/UserGroupMembershipControlPanel';
export { default as Relations } from '@plone/volto/components/manage/Controlpanels/Relations/Relations';
export { default as GroupsControlpanel } from '@plone/volto/components/manage/Controlpanels/Groups/GroupsControlpanel';
export { default as RulesControlpanel } from '@plone/volto/components/manage/Controlpanels/Rules/Rules';
export { default as AddRuleControlpanel } from '@plone/volto/components/manage/Controlpanels/Rules/AddRule';
export { default as EditRuleControlpanel } from '@plone/volto/components/manage/Controlpanels/Rules/EditRule';
export { default as ConfigureRuleControlpanel } from '@plone/volto/components/manage/Controlpanels/Rules/ConfigureRule';
export { default as UpgradeControlPanel } from '@plone/volto/components/manage/Controlpanels/UpgradeControlPanel';

export { default as ModerateComments } from '@plone/volto/components/manage/Controlpanels/ModerateComments';
export { default as VersionOverview } from '@plone/volto/components/manage/Controlpanels/VersionOverview';
export { default as Delete } from '@plone/volto/components/manage/Delete/Delete';
export { default as Diff } from '@plone/volto/components/manage/Diff/Diff';
export { default as Display } from '@plone/volto/components/manage/Display/Display';
export { default as Edit } from '@plone/volto/components/manage/Edit/Edit';
export { default as ModalForm } from '@plone/volto/components/manage/Form/ModalForm';
export { default as History } from '@plone/volto/components/manage/History/History';
export { default as Sharing } from '@plone/volto/components/manage/Sharing/Sharing';
export { default as Rules } from '@plone/volto/components/manage/Rules/Rules';
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

// Potentially could ve removed from index, since they are internal components and
// we don't want them to end up in the main chunk
export { default as Form } from '@plone/volto/components/manage/Form/Form';
export { default as BlocksToolbar } from '@plone/volto/components/manage/Form/BlocksToolbar';
export { default as UndoToolbar } from '@plone/volto/components/manage/Form/UndoToolbar';
export { default as Field } from '@plone/volto/components/manage/Form/Field';
export { default as SearchTags } from '@plone/volto/components/theme/Search/SearchTags';
export { default as CommentEditModal } from '@plone/volto/components/theme/Comments/CommentEditModal';
export { default as ContentsBreadcrumbs } from '@plone/volto/components/manage/Contents/ContentsBreadcrumbs';
export { default as ContentsIndexHeader } from '@plone/volto/components/manage/Contents/ContentsIndexHeader';
export { default as ContentsItem } from '@plone/volto/components/manage/Contents/ContentsItem';
export { default as ContentsUploadModal } from '@plone/volto/components/manage/Contents/ContentsUploadModal';
export { default as ContentsPropertiesModal } from '@plone/volto/components/manage/Contents/ContentsPropertiesModal';
export { default as ContentsRenameModal } from '@plone/volto/components/manage/Contents/ContentsRenameModal';
export { default as ContentsWorkflowModal } from '@plone/volto/components/manage/Contents/ContentsWorkflowModal';
export { default as ContentsTagsModal } from '@plone/volto/components/manage/Contents/ContentsTagsModal';
export { default as RenderUsers } from '@plone/volto/components/manage/Controlpanels/Users/RenderUsers';
export { default as RenderGroups } from '@plone/volto/components/manage/Controlpanels/Groups/RenderGroups';
export { default as DiffField } from '@plone/volto/components/manage/Diff/DiffField';
export { default as DragDropList } from '@plone/volto/components/manage/DragDropList/DragDropList';
export { default as InlineForm } from '@plone/volto/components/manage/Form/InlineForm';
export { default as BlocksForm } from '@plone/volto/components/manage/Blocks/Block/BlocksForm';
export { default as BlockDataForm } from '@plone/volto/components/manage/Form/BlockDataForm';

export { default as FormFieldWrapper } from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
export { default as ArrayWidget } from '@plone/volto/components/manage/Widgets/ArrayWidget';
export { default as CheckboxWidget } from '@plone/volto/components/manage/Widgets/CheckboxWidget';

export const DatetimeWidget = loadable(() =>
  import('@plone/volto/components/manage/Widgets/DatetimeWidget'),
);
export const RecurrenceWidget = loadable(() =>
  import(
    '@plone/volto/components/manage/Widgets/RecurrenceWidget/RecurrenceWidget'
  ),
);

export { default as FileWidget } from '@plone/volto/components/manage/Widgets/FileWidget';
export { default as IdWidget } from '@plone/volto/components/manage/Widgets/IdWidget';
export { default as PasswordWidget } from '@plone/volto/components/manage/Widgets/PasswordWidget';
export { default as ReferenceWidget } from '@plone/volto/components/manage/Widgets/ReferenceWidget';
export { default as SchemaWidget } from '@plone/volto/components/manage/Widgets/SchemaWidget';
export { default as SchemaWidgetFieldset } from '@plone/volto/components/manage/Widgets/SchemaWidgetFieldset';
export { default as SelectWidget } from '@plone/volto/components/manage/Widgets/SelectWidget';
export { default as TextareaWidget } from '@plone/volto/components/manage/Widgets/TextareaWidget';
export { default as TextWidget } from '@plone/volto/components/manage/Widgets/TextWidget';
export { default as WysiwygWidget } from '@plone/volto/components/manage/Widgets/WysiwygWidget';
export { default as ObjectBrowserWidget } from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';
export { default as ObjectBrowserWidgetMode } from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';
export { default as ObjectWidget } from '@plone/volto/components/manage/Widgets/ObjectWidget';
export { default as ObjectListWidget } from '@plone/volto/components/manage/Widgets/ObjectListWidget';

export { default as EditDefaultBlock } from '@plone/volto/components/manage/Blocks/Block/DefaultEdit';
export { default as EditDescriptionBlock } from '@plone/volto/components/manage/Blocks/Description/Edit';
export { default as EditTitleBlock } from '@plone/volto/components/manage/Blocks/Title/Edit';
export { default as EditToCBlock } from '@plone/volto/components/manage/Blocks/ToC/Edit';
export { default as EditTextBlock } from '@plone/volto/components/manage/Blocks/Text/Edit';
export { default as EditImageBlock } from '@plone/volto/components/manage/Blocks/Image/Edit';
export { default as EditListingBlock } from '@plone/volto/components/manage/Blocks/Listing/Edit';
export { default as EditVideoBlock } from '@plone/volto/components/manage/Blocks/Video/Edit';
export { default as EditBlock } from '@plone/volto/components/manage/Blocks/Block/Edit';
export { default as EditHeroImageLeftBlock } from '@plone/volto/components/manage/Blocks/HeroImageLeft/Edit';
export { default as ViewHeroImageLeftBlock } from '@plone/volto/components/manage/Blocks/HeroImageLeft/View';
export { default as EditMapBlock } from '@plone/volto/components/manage/Blocks/Maps/Edit';
export { default as EditHTMLBlock } from '@plone/volto/components/manage/Blocks/HTML/Edit';

export { default as ViewDefaultBlock } from '@plone/volto/components/manage/Blocks/Block/DefaultView';
export { default as ViewDescriptionBlock } from '@plone/volto/components/manage/Blocks/Description/View';
export { default as ViewTitleBlock } from '@plone/volto/components/manage/Blocks/Title/View';
export { default as ViewToCBlock } from '@plone/volto/components/manage/Blocks/ToC/View';
export { default as ViewTextBlock } from '@plone/volto/components/manage/Blocks/Text/View';
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
export { default as TextSettingsSchema } from '@plone/volto/components/manage/Blocks/Text/Schema';
export { default as ImageSettingsSchema } from '@plone/volto/components/manage/Blocks/Image/LayoutSchema';
export { default as ToCSettingsSchema } from '@plone/volto/components/manage/Blocks/ToC/Schema';

export { default as MaybeWrap } from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
export { default as ContentMetadataTags } from '@plone/volto/components/theme/ContentMetadataTags/ContentMetadataTags';
export { default as FormattedDate } from '@plone/volto/components/theme/FormattedDate/FormattedDate';
export { default as FormattedRelativeDate } from '@plone/volto/components/theme/FormattedDate/FormattedRelativeDate';
export { default as Popup } from '@plone/volto/components/theme/Popup/Popup';
export { default as Component } from '@plone/volto/components/theme/Component/Component';

export { default as App } from '@plone/volto/components/theme/App/App';
