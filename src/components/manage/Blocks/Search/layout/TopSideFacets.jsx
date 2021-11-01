import React from 'react';
import {
  SearchInput,
  SearchDetails,
  Facets,
  FilterList,
  SortOn,
} from '../components';
import { Grid } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { flushSync } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchButtonText: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

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
    setSortOn,
    setSortOrder,
    sortOn,
    sortOrder,
    onTriggerSearch,
    searchedText, // search text for previous search
    searchText, // search text currently being entered (controlled input)
    isEditMode,
    querystring = {},
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;
  const intl = useIntl();

  return (
    <Grid className="searchBlock-facets" stackable>
      <Grid.Row>
        <Grid.Column>
          {data.headline && <h2 className="headline">{data.headline}</h2>}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          {(Object.keys(data).includes('showSearchInput')
            ? data.showSearchInput
            : true) && (
            <div className="search-wrapper">
              <SearchInput {...props} isLive={isLive} />
              {data.showSearchButton && (
                <Button primary onClick={() => onTriggerSearch(searchText)}>
                  {data.searchButtonLabel ||
                    intl.formatMessage(messages.searchButtonText)}
                </Button>
              )}
            </div>
          )}

          <div className="search-filters-sort">
            <FilterList
              {...props}
              isEditMode={isEditMode}
              setFacets={(f) => {
                flushSync(() => {
                  setFacets(f);
                  onTriggerSearch(searchedText || '', f);
                });
              }}
            />

            {data.showSortOn && (
              <SortOn
                data={data}
                querystring={querystring}
                isEditMode={isEditMode}
                sortOn={sortOn}
                sortOrder={sortOrder}
                setSortOn={(sortOn) => {
                  flushSync(() => {
                    setSortOn(sortOn);
                    onTriggerSearch(searchedText || '', facets, sortOn);
                  });
                }}
                setSortOrder={(sortOrder) => {
                  flushSync(() => {
                    setSortOrder(sortOrder);
                    onTriggerSearch(
                      searchedText || '',
                      facets,
                      sortOn,
                      sortOrder,
                    );
                  });
                }}
              />
            )}
          </div>
          {data.facets?.length > 0 && (
            <div className="facets">
              {data.facetsTitle && <h3>{data.facetsTitle}</h3>}
              <Grid verticalAlign="bottom" columns={12}>
                <Facets
                  data={data}
                  querystring={querystring}
                  facets={facets}
                  setFacets={(f) => {
                    flushSync(() => {
                      setFacets(f);
                      onTriggerSearch(searchedText || '', f);
                    });
                  }}
                  facetWrapper={FacetWrapper}
                />
              </Grid>
            </div>
          )}
          <SearchDetails text={searchedText} total={totalItems} as="h5" />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>{children}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TopSideFacets;
