/**
 * Create relation function.
 * @function createRelations
 * @param {Object|Array} content Relation data.
 * @returns {Object} Create relation action.
 */
export function createRelations(content: any | any[]): any;
/**
 * Delete relation function.
 * @function deleteRelations
 * @param {string} id Relation id
 * @returns {Object} Delete relation action.
 */
export function deleteRelations(content: any): any;
/**
 * Query relations
 * @function queryRelations
 * @param {string} relation Name of relation
 * @param {boolean} onlyBroken
 * @returns {Object} List relations action
 */
export function queryRelations(relation?: string, onlyBroken?: boolean, subrequest?: any, source?: any, target?: any, query_source?: any, query_target?: any): any;
/** Get relation stats
 * @function getRelationStats
 * @returns {Object} Relation stats
 */
export function getRelationStats(): any;
