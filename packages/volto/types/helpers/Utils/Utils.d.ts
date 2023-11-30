/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(object: any, base: any): any;
/**
 * A helper to pipe a configuration object through configuration loaders
 *
 * @param {Array} configMethods A list of configuration methods
 * @param {Object} config The Volto singleton config object
 */
export function applyConfig(configMethods: any[], config: any): any;
/**
 * A HOC factory that propagates the status of asyncConnected requests back to
 * the main server process, to allow properly expressing an error status as
 * HTTP status code
 *
 * @param {} code HTTP return code
 */
export function withServerErrorCode(code: any): (WrappedComponent: any) => (props: any) => JSX.Element;
/**
 * Normalize (unicode) string to a normalized plain ascii string
 * @method normalizeString
 * @param {string} str The string to be normalized
 * @returns {string} Normalized plain ascii string
 */
export function normalizeString(str: string): string;
/**
 * Given an event target element returns if it's an interactive element
 * of the one in the list.
 * @param {node} element event.target element type
 * @returns {boolean} If it's an interactive element of the list
 */
export function isInteractiveElement(element: node, interactiveElements?: string[]): boolean;
export function safeWrapper(func: Function): (config: any) => any;
export function getInitials(title: any, limit: any): string;
export function getColor(name: any): any;
export function parseDateTime(locale: string, value: string, format: string, moment: any): any | string;
export function toGettextLang(language: string): string;
export function normalizeLanguageName(language: string): string;
export function toReactIntlLang(language: string): string;
export function toLangUnderscoreRegion(language: string): string;
export function toBackendLang(language: string): string;
export function hasApiExpander(expander: string, path?: string, type?: string): boolean;
export function insertInArray(array: any[], element: any, index: number): any[];
export function replaceItemOfArray(array: any[], index: number, value: any): any[];
export function removeFromArray(array: any[], index: number): any[];
export function reorderArray(array: any[], origin: number, target: number): any[];
export function slugify(string: string): string;
export function cloneDeepSchema(object: object): object;
export function arrayRange(start: number, stop: number, step: number): any[];
