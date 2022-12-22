import React from 'react';
import {
  SearchInput,
  SearchDetails,
  Facets,
  FilterList,
  SortOn,
  ViewSwitcher,
} from '../components';
import { Grid, Segment } from 'semantic-ui-react';
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
  <Segment basic className="facet">
    {children}
  </Segment>
);

const RightColumnFacets = (props) => {
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
    <Grid className="searchBlock-facets right-column-facets" stackable>
      {data.headline && (
        <Grid.Row>
          <Grid.Column>
            <h2 className="headline">{data.headline}</h2>
          </Grid.Column>
        </Grid.Row>
      )}

      <Grid.Row>
        <Grid.Column
          mobile={12}
          tablet={data.facets?.length ? 8 : 12}
          computer={data.facets?.length ? 9 : 12}
        >
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

          <div className="search-results-count-sort">
            <SearchDetails text={searchedText} total={totalItems} data={data} />
            <div className="sort-views-wrapper">
              {data.showSortOn && (
                <SortOn
                  data={data}
                  querystring={querystring}
                  isEditMode={isEditMode}
                  sortOrder={sortOrder}
                  sortOn={sortOn}
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
              {data.availableViews && data.availableViews.length > 1 && (
                <ViewSwitcher {...props} />
              )}
            </div>
          </div>
          {children}
        </Grid.Column>

        {data.facets?.length > 0 && (
          <Grid.Column mobile={12} tablet={4} computer={3}>
            <div className="facets">
              {data.facetsTitle && <h3>{data.facetsTitle}</h3>}
              <Facets
                querystring={querystring}
                data={data}
                facets={facets}
                isEditMode={isEditMode}
                setFacets={(f) => {
                  flushSync(() => {
                    setFacets(f);
                    onTriggerSearch(searchedText || '', f);
                  });
                }}
                facetWrapper={FacetWrapper}
              />
            </div>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default RightColumnFacets;
