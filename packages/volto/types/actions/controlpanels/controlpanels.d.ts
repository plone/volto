/**
 * Get controlpanel function.
 * @function getControlpanel
 * @param {id} id Controlpanel id.
 * @returns {Object} Get controlpanel action.
 */
export function getControlpanel(id: any): any;
/**
 * Post controlpanel function.
 * @function postControlpanel
 * @param {id} id Controlpanel id.
 * @param {Object} data Controlpanel data.
 * @returns {Object} Post controlpanel action.
 */
export function postControlpanel(id: any, data: any): any;
/**
 * Delete controlpanel function.
 * @function deleteControlpanel
 * @param {id} id Controlpanel id.
 * @param {string} item Controlpanel item to be deleted.
 * @returns {Object} Delete controlpanel action.
 */
export function deleteControlpanel(id: any, item: string): any;
/**
 * List controlpanels function.
 * @function listControlpanels
 * @returns {Object} List controlpanels action.
 */
export function listControlpanels(): any;
/**
 * Update controlpanel function.
 * @function updateControlpanel
 * @param {string} url Controlpanel url.
 * @param {Object} data Controlpanel data.
 * @returns {Object} Update controlpanel action.
 */
export function updateControlpanel(url: string, data: any): any;
export function getSystemInformation(): {
    type: any;
    request: {
        op: string;
        path: string;
    };
};
export function getDatabaseInformation(): {
    type: any;
    request: {
        op: string;
        path: string;
    };
};
