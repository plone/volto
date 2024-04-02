export default CheckboxFacet;
/**
 * A facet that uses radio/checkboxes to provide an explicit list of values for
 * filtering
 */
declare function CheckboxFacet(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace CheckboxFacet {
    export { selectFacetSchemaEnhancer as schemaEnhancer };
    export { selectFacetStateToValue as stateToValue };
    export { selectFacetValueToQuery as valueToQuery };
}
import { selectFacetSchemaEnhancer } from './base';
import { selectFacetStateToValue } from './base';
import { selectFacetValueToQuery } from './base';
