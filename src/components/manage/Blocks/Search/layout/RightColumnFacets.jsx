import React from 'react';
import { SearchInput, SearchDetails, Facets } from '../components';
import { Grid, Divider } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { flushSync } from 'react-dom';

const FacetWrapper = ({ children }) => <div className="facet">{children}</div>;

const RightColumnFacets = (props) => {
  const {
    children,
    data,
    totalItems,
    facets,
    setFacets,
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

  return (
    <Grid className="searchBlock-facets right-column-facets" stackable>
      <Grid.Row>
        <Grid.Column width={12}>
          <h3>{data.title}</h3>
          <SearchDetails text={searchedText} total={totalItems} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column mobile={12} tablet={8} computer={9}>
          <Grid>
            <Grid.Row>
              <Grid columns="2" verticalAlign="bottom">
                {data.showSearchInput && (
                  <Grid.Column>
                    <SearchInput {...props} isLive={isLive} />
                  </Grid.Column>
                )}
                {data.showSearchButton && (
                  <Grid.Column>
                    <Button onClick={() => onTriggerSearch(searchText)}>
                      {data.searchButtonLabel || 'Search!'}
                    </Button>
                  </Grid.Column>
                )}
              </Grid>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={12}>
                <Divider />
                {children}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column mobile={12} tablet={4} computer={3}>
          <Facets
            data={data}
            facets={facets}
            isEditMode={isEditMode}
            setFacets={(f) => {
              flushSync(() => {
                setFacets(f);
                if (isLive) onTriggerSearch(searchedText || '', f);
              });
            }}
            facetWrapper={FacetWrapper}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RightColumnFacets;
