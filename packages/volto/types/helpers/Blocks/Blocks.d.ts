/**
 * Get blocks field.
 * @function getBlocksFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the blocks
 */
export function getBlocksFieldname(props: any): string;
/**
 * Get blocks layout field.
 * @function getBlocksLayoutFieldname
 * @param {Object} props Properties.
 * @return {string} Field name of the blocks layout
 */
export function getBlocksLayoutFieldname(props: any): string;
/**
 * Has blocks data.
 * @function hasBlocksData
 * @param {Object} props Properties.
 * @return {boolean} True if it has blocks data.
 */
export function hasBlocksData(props: any): boolean;
/**
 * Pluggable method to test if a block has a set value (any non-empty value)
 * @function blockHasValue
 * @param {Object} data Block data
 * @return {boolean} True if block has a non-empty value
 */
export function blockHasValue(data: any): boolean;
/**
 * Move block to different location index within blocks_layout
 * @function moveBlock
 * @param {Object} formData Form data
 * @param {number} source index within form blocks_layout items
 * @param {number} destination index within form blocks_layout items
 * @return {Object} New form data
 */
export function moveBlock(formData: any, source: number, destination: number): any;
/**
 * Delete block by id
 * @function deleteBlock
 * @param {Object} formData Form data
 * @param {string} blockId Block uid
 * @return {Object} New form data
 */
export function deleteBlock(formData: any, blockId: string): any;
/**
 * Adds a block to the blocks form
 * @function addBlock
 * @param {Object} formData Form data
 * @param {string} type Block type
 * @param {number} index Destination index
 * @return {Array} New block id, New form data
 */
export function addBlock(formData: any, type: string, index: number, blocksConfig: any): any[];
/**
 * Mutate block, changes the block @type
 * @function mutateBlock
 * @param {Object} formData Form data
 * @param {string} id Block uid to mutate
 * @param {number} value Block's new value
 * @return {Object} New form data
 */
export function mutateBlock(formData: any, id: string, value: number, blocksConfig: any): any;
/**
 * Insert new block before another block
 * @function insertBlock
 * @param {Object} formData Form data
 * @param {string} id Insert new block before the block with this id
 * @param {number} value New block's value
 * @return {Array} New block id, New form data
 */
export function insertBlock(formData: any, id: string, value: number, current: {}, offset: number, blocksConfig: any): any[];
/**
 * Change block
 * @function changeBlock
 * @param {Object} formData Form data
 * @param {string} id Block uid to change
 * @param {number} value Block's new value
 * @return {Object} New form data
 */
export function changeBlock(formData: any, id: string, value: number): any;
/**
 * Get the next block UID within form
 * @function nextBlockId
 * @param {Object} formData Form data
 * @param {string} currentBlock Block uid
 * @return {string} Next block uid
 */
export function nextBlockId(formData: any, currentBlock: string): string;
/**
 * Get the previous block UID within form
 * @function previousBlockId
 * @param {Object} formData Form data
 * @param {string} currentBlock Block uid
 * @return {string} Previous block uid
 */
export function previousBlockId(formData: any, currentBlock: string): string;
/**
 * Generate empty block form
 * @function emptyBlocksForm
 * @param {Object} formData Form data
 * @return {Object} Empty blocks form with one defaultBlockType block
 */
export function emptyBlocksForm(): any;
/**
 * Generate empty blocks blocks/blocks_layout pair given the type
 * (could be empty, if not type given) and the number of blocks
 * @function blocksFormGenerator
 * @param {number} number How many blocks to generate of the type (could be "empty", if no type provided)
 * @param {string} type The type of the blocks
 * @return {Object} blocks/blocks_layout pair filled with the generated blocks
 */
export function blocksFormGenerator(number: number, type: string): any;
/**
 * Recursively discover blocks in data and call the provided callback
 * @function visitBlocks
 * @param {Object} content A content data structure (an object with blocks and blocks_layout)
 * @param {Function} callback A function to call on each discovered block
 */
export function visitBlocks(content: any, callback: Function): void;
/**
 * Initializes data with the default values coming from schema
 */
export function applySchemaDefaults({ data, schema, intl }: {
    data?: {};
    schema: any;
    intl: any;
}): any;
/**
 * Apply the block's default (as defined in schema) to the block data.
 *
 * @function applyBlockDefaults
 * @param {Object} params An object with data, intl and anything else
 * @return {Object} Derived data, with the defaults extracted from the schema
 */
export function applyBlockDefaults({ data, intl, navRoot, contentType, ...rest }: any, blocksConfig: any): any;
/**
 * Given a `block` object and a list of block types, return a list of block ids matching the types
 *
 * @function findBlocks
 * @param {Object} types A list with the list of types to be matched
 * @return {Array} An array of block ids
 */
export function findBlocks(blocks: any, types: any, result?: any[]): any[];
/**
 * Move block to different location index within blocks_layout
 * @function moveBlock
 * @param {Object} formData Form data
 * @param {number} source index within form blocks_layout items
 * @param {number} destination index within form blocks_layout items
 * @return {Object} New form data
 */
export function moveBlockEnhanced(formData: any, { source, destination }: number): any;
export function getBlocks(properties: any): any[];
export function styleToClassName(key: any, value: any, prefix?: string): any;
export function buildStyleClassNamesFromData(obj?: {}, prefix?: string): any;
export function buildStyleClassNamesExtenders({ block, content, data, classNames, }: any): any[];
export function styleDataToStyleObject(key: any, value: any, prefix?: string): any[];
export function buildStyleObjectFromData(obj?: any, prefix?: string): any;
export function getPreviousNextBlock({ content, block }: any): any[];
export function getBlocksHierarchy(properties: any): any;
export function findContainer(formData: object, { containerId }: {
    containerId: string;
}): object | undefined;
