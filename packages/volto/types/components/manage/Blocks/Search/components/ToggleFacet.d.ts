export default ToggleFacet;
declare function ToggleFacet(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace ToggleFacet {
    function stateToValue({ facetSettings, index, selectedValue }: {
        facetSettings: any;
        index: any;
        selectedValue: any;
    }): any;
    function valueToQuery({ value, facet }: {
        value: any;
        facet: any;
    }): {
        i: any;
        o: string;
        v: string;
    };
}
