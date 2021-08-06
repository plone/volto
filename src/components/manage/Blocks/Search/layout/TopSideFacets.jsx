import React from 'react';
import { SearchInput, SearchDetails, Facets } from '../components';
import { Grid, Divider } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { flushSync } from 'react-dom';

const FacetWrapper = ({ children }) => (
  <Grid.Column mobile={12} tablet={4} computer={3}>
    {children}
  </Grid.Column>
);

const TopSideFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
    onTriggerSearch,
    searchedText, // search text for previous search
    searchText, // search text currently being entered (controlled input)
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;

  return (
    <Grid className="searchBlock-facets" stackable>
      <Grid.Column width={12}>
        {data.title && <h3>{data.title}</h3>}
        <SearchDetails text={searchedText} total={totalItems} as="h5" />
      </Grid.Column>

      <Grid.Row verticalAlign="bottom">
        <Grid.Column width={12}>
          <div className="search-wrapper">
            {data.showSearchInput && <SearchInput {...props} isLive={isLive} />}
            {data.showSearchButton && (
              <Button onClick={() => onTriggerSearch(searchText)}>
                {data.searchButtonLabel || 'Search!'}
              </Button>
            )}
          </div>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={12}>
          <Grid verticalAlign="bottom" columns={12}>
            <Facets
              data={data}
              facets={facets}
              setFacets={(f) => {
                flushSync(() => {
                  setFacets(f);
                  if (isLive) onTriggerSearch(searchedText || '', f);
                });
              }}
              facetWrapper={FacetWrapper}
            />
          </Grid>
        </Grid.Column>
      </Grid.Row>

      <Divider />

      <Grid.Row>
        <Grid.Column width={12}>{children}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TopSideFacets;
