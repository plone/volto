/**
 * Point of contact for helper modules.
 * @module helpers
 * @example import { Api, Html } from 'helpers';
 */

// export { injectLazyLibs } from './Loadable/Loadable';
export Api from '@plone/volto/helpers/Api/Api';
export { getAPIResourceWithAuth } from '@plone/volto/helpers/Api/APIResourceWithAuth';
export Html from '@plone/volto/helpers/Html/Html';
export {
  getAuthToken,
  persistAuthToken,
} from '@plone/volto/helpers/AuthToken/AuthToken';
export {
  addAppURL,
  expandToBackendURL,
  flattenHTMLToAppURL,
  flattenToAppURL,
  stripQuerystring,
  toPublicURL,
  isInternalURL,
  getParentUrl,
  getBaseUrl,
  getView,
  isCmsUi,
  getId,
  isUrl,
  normalizeUrl,
  removeProtocol,
  URLUtils,
} from '@plone/volto/helpers/Url/Url';
export { generateSitemap } from '@plone/volto/helpers/Sitemap/Sitemap';
export { generateRobots } from '@plone/volto/helpers/Robots/Robots';
export {
  nestContent,
  getLayoutFieldname,
  getContentIcon,
  getLanguageIndependentFields,
} from '@plone/volto/helpers/Content/Content';
export {
  addBlock,
  insertBlock,
  blockHasValue,
  changeBlock,
  deleteBlock,
  emptyBlocksForm,
  getBlocks,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  moveBlock,
  mutateBlock,
  nextBlockId,
  previousBlockId,
  applyBlockDefaults,
  applySchemaDefaults,
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  getPreviousNextBlock,
} from '@plone/volto/helpers/Blocks/Blocks';
export BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
export ScrollToTop from '@plone/volto/helpers/ScrollToTop/ScrollToTop';
export {
  getBoolean,
  getVocabName,
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
  getFieldsVocabulary,
} from '@plone/volto/helpers/Vocabularies/Vocabularies';

export langmap from './LanguageMap/LanguageMap';
export Helmet from './Helmet/Helmet';
export FormValidation from './FormValidation/FormValidation';
export {
  difference,
  getColor,
  getInitials,
  safeWrapper,
  applyConfig,
  withServerErrorCode,
  parseDateTime,
  normalizeLanguageName,
  toLangUnderscoreRegion,
  hasApiExpander,
  replaceItemOfArray,
  cloneDeepSchema,
} from '@plone/volto/helpers/Utils/Utils';
export { messages } from './MessageLabels/MessageLabels';
export {
  withBlockSchemaEnhancer,
  withVariationSchemaEnhancer,
  withBlockExtensions,
  applySchemaEnhancer,
  resolveExtension,
  resolveBlockExtensions,
  addStyling,
  composeSchema,
} from './Extensions';
export { asyncConnect } from './AsyncConnect';
export { userHasRoles } from './User/User';
// export { injectLazyLibs } from './Loadable/Loadable';
export { useDetectClickOutside } from './Utils/useDetectClickOutside';
export { useEvent } from './Utils/useEvent';
export { usePrevious } from './Utils/usePrevious';
export { usePagination } from './Utils/usePagination';
export useUndoManager from './UndoManager/useUndoManager';
export { getCookieOptions } from './Cookies/cookies';
export { getWidgetView } from './Widget/widget';
export {
  getCurrentStateMapping,
  getWorkflowOptions,
} from './Workflows/Workflows';
