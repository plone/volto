export function validationMessage(isValid: boolean, criterion: string, valueToCompare: string | number, intlFunc: Function): any;
export function tryParseJSON(requestItem: string): any;
export default FormValidation;
export function validateFileUploadSize(file: File, intlFunc: Function): boolean;
declare class FormValidation {
    /**
     * The first Fieldset (Tab) that has any errors
     * will be selected
     * @param {Object} errors
     * @param {Object} schema
     * @returns {number} activeIndex
     */
    static showFirstTabWithErrors({ errors, schema, }?: any): number;
    /**
     * Create the errors object from backend the same way it is done on Frontend validation
     * @param {string} requestError form the server
     * @returns {Object}
     */
    static giveServerErrorsToCorrespondingFields(requestError?: string): any;
    /**
     * Return validation result
     * @param {Object} schema
     * @param {Object} formData
     * @param {function} formatMessage
     * @returns {Object} errors
     */
    static validateFieldsPerFieldset({ schema, formData, formatMessage, touchedField, }?: any): any;
}
