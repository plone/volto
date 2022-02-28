## Terminology

Facet: a filter control that allows the final users of search block to tweak
the query that's sent to the `@querystringsearch` endpoint. Usually, a facet is
a list of all possible values for a field, so that it can be set to either
a single value or a list of those selected values.

Facets: a control that renders the list of facet filters.

FilterList: a control rendered at the top of the block, it shows a list of all
applied facet values, with quick access to the users to clear either the facet
or the entire searchblock state.

`<FacetType>FilterListEntry`: components used to render the selected value for
a particular facet, in the FilterList component. They can be registered per
facet type.

Layout: a high-level component that controls the way the results are layed out
in relation to the facet list (facets can be displayed at top, left or right of
results).
