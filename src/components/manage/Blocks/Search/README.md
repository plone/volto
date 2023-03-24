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

## Sorting

We start with the following assumption: the "relevance" based ordering is an
intrinsec property which should be provided by the system, the end users should
automatically benefit from it.

For the main listing-block derived query, the editors can choose a sort order.
This will be the called the "default sort", it will be used whenever we don't
have "an external condition" that changes that.

So we follow this logic:

If the Editor doesn't enable aditional Sort On index from the Controls
fieldset, the block will work like:

- when the user loads the search block without a search term, the listing uses
  the "default sort" in the Query part.
- when the user enters a search term (or if he/she loads the search block with
  a search term via URL), the search block will automatically switch to
  "relevance" sorting.
- If there's only one sort option available, the SortOn control is read-only
  (disabled)
- The "relevance" sort option is automatically added as an option when the user
  has a "search term"
- If there's no "default sort" and no "search term", but the Editor enabled the
  Sort On control, then the Sort On control displays only one option,
  "Unsorted". This will force the Editor to either disable the control or add
  some sorting options

If the Editor enables additional sorton indexes but doesn't define
a "default sort":

- the users see an "Unsorted" option if there's no "search term"


