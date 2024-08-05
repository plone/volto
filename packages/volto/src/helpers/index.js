/**
 * Point of contact for helper modules.
 * @module helpers
 * @example import { Api, Html } from 'helpers';
 */

// export { injectLazyLibs } from './Loadable/Loadable';
export { default as Api } from '@plone/volto/helpers/Api/Api';
export { getAPIResourceWithAuth } from '@plone/volto/helpers/Api/APIResourceWithAuth';
export { default as Html } from '@plone/volto/helpers/Html/Html';
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
  flattenScales,
  getFieldURL,
} from '@plone/volto/helpers/Url/Url';
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
  blocksFormGenerator,
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  buildStyleObjectFromData,
  getPreviousNextBlock,
  findBlocks,
  getBlocksHierarchy,
  moveBlockEnhanced,
} from '@plone/volto/helpers/Blocks/Blocks';
export {
  getSimpleDefaultBlocks,
  getDefaultBlocks,
} from '@plone/volto/helpers/Blocks/defaultBlocks';
export { default as BodyClass } from '@plone/volto/helpers/BodyClass/BodyClass';
export { default as ScrollToTop } from '@plone/volto/helpers/ScrollToTop/ScrollToTop';
export {
  getBoolean,
  getVocabName,
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
  getFieldsVocabulary,
} from '@plone/volto/helpers/Vocabularies/Vocabularies';

export { default as langmap } from './LanguageMap/LanguageMap';
export { default as Helmet } from './Helmet/Helmet';
export { default as FormValidation } from './FormValidation/FormValidation';
export { validateFileUploadSize } from './FormValidation/FormValidation';
export { tryParseJSON } from './FormValidation/FormValidation';
export { extractInvariantErrors } from './FormValidation/FormValidation';
export {
  difference,
  getColor,
  getInitials,
  safeWrapper,
  applyConfig,
  withServerErrorCode,
  parseDateTime,
  toGettextLang,
  normalizeLanguageName, // old name for toGettextLang
  toReactIntlLang,
  toLangUnderscoreRegion, // old name for toReactIntlLang
  toBackendLang,
  hasApiExpander,
  replaceItemOfArray,
  cloneDeepSchema,
  insertInArray,
  removeFromArray,
  arrayRange,
  reorderArray,
  isInteractiveElement,
  slugify,
  normalizeString,
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
export {
  userHasRoles,
  isManager,
  canAssignGroup,
  canAssignRole,
} from './User/User';
// export { injectLazyLibs } from './Loadable/Loadable';
export { useDetectClickOutside } from './Utils/useDetectClickOutside';
export { useEvent } from './Utils/useEvent';
export { usePrevious } from './Utils/usePrevious';
export { usePagination } from './Utils/usePagination';
export { default as useUndoManager } from './UndoManager/useUndoManager';
export { getCookieOptions } from './Cookies/cookies';
export { getWidgetView } from './Widget/widget';
export {
  getCurrentStateMapping,
  getWorkflowOptions,
} from './Workflows/Workflows';
export { getSiteAsyncPropExtender } from './Site';
export { ContentTypeCondition } from './Slots';
