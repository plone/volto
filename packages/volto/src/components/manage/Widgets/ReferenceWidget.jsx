/**
 * ReferenceWidget component.
 * @module components/manage/Widgets/ReferenceWidget
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Label, Dropdown, Popup, Icon } from 'semantic-ui-react';
import { compact, concat, fromPairs, map, values, uniqBy } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';

import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { resetSearchContent, searchContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  no_results_found: {
    id: 'No results found.',
    defaultMessage: 'No results found.',
  },
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
});

const ReferenceWidget = (props) => {
  const {
    id,
    title,
    value,
    multiple,
    onChange,
    search,
    intl,
    resetSearchContent,
    searchContent,
  } = props;

  const initialChoices = value
    ? multiple
      ? fromPairs(
          map(value, (value) => [
            value['@id'],
            {
              key: value['@id'],
              text: flattenToAppURL(value['@id']),
              value: value['@id'],
              label: {
                content: value.title,
              },
              data: value,
            },
          ]),
        )
      : {
          [value['@id']]: {
            key: value['@id'],
            text: flattenToAppURL(value),
            value: value['@id'],
            label: {
              content: value.title,
            },
            data: value,
          },
          novalue: {
            key: 'novalue',
            text: intl.formatMessage(messages.no_value),
            value: 'novalue',
            data: null,
          },
        }
    : {};

  const [choices, setChoices] = useState(initialChoices);

  useEffect(() => {
    resetSearchContent();
  }, [resetSearchContent]);

  useEffect(() => {
    const updatedChoices = {
      ...fromPairs(
        map(
          uniqBy(
            map(compact(concat(value, search)), (item) => ({
              ...item,
              '@id': flattenToAppURL(item['@id']),
            })),
            '@id',
          ),
          (value) => [
            value['@id'],
            {
              key: value['@id'],
              text: flattenToAppURL(value['@id']),
              value: value['@id'],
              label: {
                content: value.title,
              },
              data: value,
            },
          ],
        ),
      ),
      novalue: {
        key: 'novalue',
        text: intl.formatMessage(messages.no_value),
        value: 'novalue',
        data: null,
      },
    };
    setChoices(updatedChoices);
  }, [value, search, intl]);

  const onSearchChange = useCallback(
    (event, data) => {
      if (data.searchQuery && data.searchQuery !== '') {
        searchContent('', {
          Title: `*${data.searchQuery}*`,
        });
      } else {
        resetSearchContent();
      }
    },
    [resetSearchContent, searchContent],
  );

  const renderLabel = (item, index, defaultProps) => {
    return (
      <Popup
        key={item.value}
        content={
          <>
            <Icon name="home" /> {item.value}
          </>
        }
        trigger={
          defaultProps && (
            <Label active={defaultProps.active}>
              {item.label.content}
              <Icon
                name="delete"
                onClick={(event) => {
                  defaultProps.onRemove(event, defaultProps);
                }}
              />
            </Label>
          )
        }
      />
    );
  };

  return (
    <FormFieldWrapper {...props}>
      <Dropdown
        options={values(choices)}
        placeholder={title}
        search
        selection
        fluid
        noResultsMessage={intl.formatMessage(messages.no_results_found)}
        multiple={multiple}
        value={
          multiple
            ? value
              ? map(value, (item) =>
                  item && item['@id'] ? flattenToAppURL(item['@id']) : item,
                )
              : []
            : value
              ? flattenToAppURL(value['@id'])
              : ''
        }
        onChange={(event, data) => {
          onChange(
            id,
            multiple
              ? map(data.value, (item) => choices[item].data)
              : choices[data.value].data,
          );
        }}
        onSearchChange={onSearchChange}
        renderLabel={renderLabel}
      />
    </FormFieldWrapper>
  );
};

ReferenceWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  onChange: PropTypes.func.isRequired,
  resetSearchContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  search: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      '@type': PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  wrapped: PropTypes.bool,
};

ReferenceWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  search: [],
  value: null,
  multiple: true,
};

export default injectIntl(
  connect(
    (state) => ({
      search: state.search.items,
    }),
    { resetSearchContent, searchContent },
  )(ReferenceWidget),
);
