export function selectFacetStateToValue({ facetSettings, index, selectedValue, }: {
    facetSettings: any;
    index: any;
    selectedValue: any;
}): {
    value: any;
    label: any;
}[] | {
    value: any;
    label: any;
};
export function selectFacetSchemaEnhancer({ schema, formData }: {
    schema: any;
    formData: any;
}): any;
export function selectFacetValueToQuery({ value, facet }: {
    value: any;
    facet: any;
}): {
    i: any;
    o: string;
    v: any;
};
