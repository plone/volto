import React from 'react';
import {
  SearchInput,
  SearchDetails,
  Facets,
  FilterList,
  SortOn,
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

const LeftColumnFacets = (props) => {
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
    // searchData,
    // mode = 'view',
    // variation,
  } = props;
  const { showSearchButton } = data;
  const isLive = !showSearchButton;
  const intl = useIntl();

  return (
    <Grid className="searchBlock-facets left-column-facets" stackable>
      <Grid.Row>
        <Grid.Column>
          {data.headline && <h2 className="headline">{data.headline}</h2>}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        {facets.length && (
          <Grid.Column mobile={12} tablet={4} computer={3}>
            {data.facets && data.facets.length > 0 && (
              <div className="facets">
                {data.facetsTitle && <h3>{data.facetsTitle}</h3>}
                <Facets
                  data={data}
                  facets={facets}
                  setFacets={(f) => {
                    flushSync(() => {
                      setFacets(f);
                      onTriggerSearch(searchedText || '', f);
                    });
                  }}
                  facetWrapper={FacetWrapper}
                />
              </div>
            )}
          </Grid.Column>
        )}

        <Grid.Column
          mobile={12}
          tablet={facets.length ? 8 : 12}
          computer={facets.length ? 9 : 12}
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
            <SearchDetails text={searchedText} total={totalItems} />

            {data.showSortOn && (
              <SortOn
                data={data}
                isEditMode={isEditMode}
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
          {children}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LeftColumnFacets;
