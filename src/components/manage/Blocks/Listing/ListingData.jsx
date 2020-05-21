import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { toPairs, groupBy, map } from 'lodash';
import loadable from '@loadable/component';
import { CheckboxWidget, TextWidget } from '@plone/volto/components';
import { compose } from 'redux';
import { useSelector } from 'react-redux';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import QuerystringWidget from '@plone/volto/components/manage/Blocks/Listing/QuerystringWidget';

import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

const Select = loadable(() => import('react-select'));

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  SortOn: {
    id: 'Sort on',
    defaultMessage: 'Sort on',
  },
  reversedOrder: {
    id: 'Reversed order',
    defaultMessage: 'Reversed order',
  },
  limit: {
    id: 'Results limit',
    defaultMessage: 'Results limit',
  },
  itemBatchSize: {
    id: 'Item batch size',
    defaultMessage: 'Item batch size',
  },
  NoSelection: {
    id: 'No selection',
    defaultMessage: 'No selection',
  },
});

const ListingData = ({
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
  intl,
}) => {
  const sortable_indexes = useSelector(
    (state) => state.querystring.sortable_indexes,
  );
  const [limit, setLimit] = React.useState(data.limit || '');
  const [itemBatchSize, setItemBatchSize] = React.useState(data.b_size || '');

  return (
    <>
      <Segment className="form sidebar-listing-data">
        <QuerystringWidget
          id="source"
          title={intl.formatMessage(messages.Source)}
          required={false}
          value={data.query || []}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              query: value,
            });
          }}
        />

        <Form.Field inline id="field-listingblock-sort-on">
          <Grid>
            <Grid.Row stretched>
              <Grid.Column width="4">
                <div className="wrapper">
                  <label htmlFor="select-listingblock-sort-on">
                    {intl.formatMessage(messages.SortOn)}
                  </label>
                </div>
              </Grid.Column>
              <Grid.Column width="8">
                <Select
                  id="select-listingblock-sort-on"
                  name="select-listingblock-sort-on"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  // placeholder="Select criteria"
                  options={[
                    {
                      label: intl.formatMessage(messages.NoSelection),
                      value: '',
                    },
                    ...map(
                      toPairs(
                        groupBy(
                          toPairs(sortable_indexes),
                          (item) => item[1].group,
                        ),
                      ),
                      (group) => ({
                        label: group[0],
                        options: map(group[1], (field) => ({
                          label: field[1].title,
                          value: field[0],
                        })),
                      }),
                    ),
                  ]}
                  styles={customSelectStyles}
                  theme={selectTheme}
                  components={{ DropdownIndicator, Option }}
                  value={{
                    value: data.sort_on || '',
                    label:
                      data.sort_on && sortable_indexes
                        ? sortable_indexes[data.sort_on]?.title
                        : data.sort_on ||
                          intl.formatMessage(messages.NoSelection),
                  }}
                  onChange={(field) => {
                    onChangeBlock(block, {
                      ...data,
                      sort_on: field.value,
                    });
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Field>

        <CheckboxWidget
          id="listingblock-sort-on-reverse"
          title={intl.formatMessage(messages.reversedOrder)}
          value={data.sort_order ? data.sort_order : false}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              sort_order: value,
            });
          }}
        />

        <TextWidget
          id="limit"
          title={intl.formatMessage(messages.limit)}
          required={false}
          value={limit}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              limit: value,
            });
            setLimit(value);
          }}
        />

        <TextWidget
          id="itembatchsize"
          title={intl.formatMessage(messages.itemBatchSize)}
          required={false}
          value={itemBatchSize}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              b_size: value,
            });
            setItemBatchSize(value);
          }}
        />
      </Segment>
    </>
  );
};

ListingData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default compose(withObjectBrowser, injectIntl)(ListingData);
