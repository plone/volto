/**
 * Point of contact for component modules.
 * This file is used to avoid lazy loading components in tests.
 * @module components
 * @example import { Field } from 'components';
 */

export App from './theme/App/App';
export ContactForm from './theme/ContactForm/ContactForm';
export Login from './theme/Login/Login';
export Logout from './theme/Logout/Logout';
export NotFound from './theme/NotFound/NotFound';
export Search from './theme/Search/Search';
export View from './theme/View/View';
export Register from './theme/Register/Register';
export PasswordReset from './theme/PasswordReset/PasswordReset';
export RequestPasswordReset from './theme/PasswordReset/RequestPasswordReset';
export ChangePassword from './manage/Preferences/ChangePassword';
export DefaultView from './theme/View/DefaultView';
export FileView from './theme/View/FileView';
export ImageView from './theme/View/ImageView';
export NewsItemView from './theme/View/NewsItemView';
export ListingView from './theme/View/ListingView';
export SummaryView from './theme/View/SummaryView';
export TabularView from './theme/View/TabularView';
export Comments from './theme/Comments/Comments';
export Tags from './theme/Tags/Tags';
export SocialSharing from './theme/SocialSharing/SocialSharing';
export Pagination from './theme/Pagination/Pagination';
export SearchTags from './theme/Search/SearchTags';
export CommentEditModal from './theme/Comments/CommentEditModal';

// CMSUI
export Toolbar from './manage/Toolbar/Toolbar';
export Add from './manage/Add/Add';
export Edit from './manage/Edit/Edit';
export Contents from './manage/Contents/Contents';
export Sharing from './manage/Sharing/Sharing';
export Controlpanel from './manage/Controlpanels/Controlpanel';
export Controlpanels from './manage/Controlpanels/Controlpanels';
export ModerateComments from './manage/Controlpanels/ModerateComments';
export UsersControlpanel from './manage/Controlpanels/UsersControlpanel';
export Delete from './manage/Delete/Delete';
export Diff from './manage/Diff/Diff';
export ModalForm from './manage/Form/ModalForm';
export History from './manage/History/History';

export Anontools from './theme/Anontools/Anontools';
export Breadcrumbs from './theme/Breadcrumbs/Breadcrumbs';
export Footer from './theme/Footer/Footer';
export Header from './theme/Header/Header';
export Icon from './theme/Icon/Icon';
export Logo from './theme/Logo/Logo';
export Navigation from './theme/Navigation/Navigation';
export SearchWidget from './theme/SearchWidget/SearchWidget';
export Title from './theme/Title/Title';

export Actions from './manage/Actions/Actions';
export ContentsIndexHeader from './manage/Contents/ContentsIndexHeader';
export ContentsItem from './manage/Contents/ContentsItem';
export ContentsUploadModal from './manage/Contents/ContentsUploadModal';
export ContentsPropertiesModal from './manage/Contents/ContentsPropertiesModal';
export ContentsRenameModal from './manage/Contents/ContentsRenameModal';
export ContentsWorkflowModal from './manage/Contents/ContentsWorkflowModal';
export ContentsTagsModal from './manage/Contents/ContentsTagsModal';

export UsersControlpanelGroups from './manage/Controlpanels/UsersControlpanelGroups';
export VersionOverview from './manage/Controlpanels/VersionOverview';
export UsersControlpanelUser from './manage/Controlpanels/UsersControlpanelUser';
export DiffField from './manage/Diff/DiffField';
export Display from './manage/Display/Display';
export Form from './manage/Form/Form';
export Field from './manage/Form/Field';

export Messages from './manage/Messages/Messages';
export PersonalPreferences from './manage/Preferences/PersonalPreferences';
export PersonalInformation from './manage/Preferences/PersonalInformation';
export ArrayWidget from './manage/Widgets/ArrayWidget';
export CheckboxWidget from './manage/Widgets/CheckboxWidget';
export DatetimeWidget from './manage/Widgets/DatetimeWidget';
export FileWidget from './manage/Widgets/FileWidget';
export PasswordWidget from './manage/Widgets/PasswordWidget';
export ReferenceWidget from './manage/Widgets/ReferenceWidget';
export SchemaWidget from './manage/Widgets/SchemaWidget';
export SchemaWidgetFieldset from './manage/Widgets/SchemaWidgetFieldset';
export SelectWidget from './manage/Widgets/SelectWidget';
export Sidebar from './manage/Sidebar/Sidebar';
export SidebarPortal from './manage/Sidebar/SidebarPortal';
export TextareaWidget from './manage/Widgets/TextareaWidget';
export TextWidget from './manage/Widgets/TextWidget';
export WysiwygWidget from './manage/Widgets/WysiwygWidget';
export Workflow from './manage/Workflow/Workflow';

export BlockChooser from './manage/BlockChooser/BlockChooser';

export EditDescriptionBlock from './manage/Blocks/Description/Edit';
export EditTitleBlock from './manage/Blocks/Title/Edit';
export EditToCBlock from './manage/Blocks/ToC/Edit';
export EditTextBlock from './manage/Blocks/Text/Edit';
export EditImageBlock from './manage/Blocks/Image/Edit';
export EditListingBlock from './manage/Blocks/Listing/Edit';
export EditVideoBlock from './manage/Blocks/Video/Edit';
export EditBlock from './manage/Blocks/Block/Edit';
export EditHeroImageLeftBlock from './manage/Blocks/HeroImageLeft/Edit';
export EditMapBlock from './manage/Blocks/Maps/Edit';
export EditHTMLBlock from './manage/Blocks/HTML/Edit';

export ViewDescriptionBlock from './manage/Blocks/Description/View';
export ViewTitleBlock from './manage/Blocks/Title/View';
export ViewToCBlock from './manage/Blocks/ToC/View';
export ViewTextBlock from './manage/Blocks/Text/View';
export ViewImageBlock from './manage/Blocks/Image/View';
export ViewListingBlock from './manage/Blocks/Listing/View';
export ViewVideoBlock from './manage/Blocks/Video/View';
export ViewHeroImageLeftBlock from './manage/Blocks/HeroImageLeft/View';
export ViewMapBlock from './manage/Blocks/Maps/View';
export ViewHTMLBlock from './manage/Blocks/HTML/View';

export ListingBlockBody from './manage/Blocks/Listing/ListingBody';
export ListingBlockData from './manage/Blocks/Listing/ListingData';
export ListingBlockSidebar from './manage/Blocks/Listing/ListingSidebar';
export ListingBlockStyle from '@plone/volto/components/manage/Blocks/Listing/ListingStyle';
export ListingBlockMore from '@plone/volto/components/manage/Blocks/Listing/ListingMore';

export ImageSidebar from './manage/Blocks/Image/ImageSidebar';
export MapsSidebar from './manage/Blocks/Maps/MapsSidebar';
export VideoSidebar from './manage/Blocks/Video/VideoSidebar';
export LeadImageSidebar from './manage/Blocks/LeadImage/LeadImageSidebar';

export ConditionalLink from './manage/ConditionalLink/ConditionalLink';
export PersonalTools from './manage/Toolbar/PersonalTools';
export More from './manage/Toolbar/More';
export Types from './manage/Toolbar/Types';
export Toast from './manage/Toast/Toast';
