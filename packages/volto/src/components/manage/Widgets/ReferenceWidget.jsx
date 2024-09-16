import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Dropdown, Popup, Icon } from 'semantic-ui-react';
import { compact, concat, fromPairs, map, values, uniqBy } from 'lodash-es';
import { defineMessages, useIntl } from 'react-intl';

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
  const { id, title, value, multiple, onChange } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.items);
  const [choices, setChoices] = useState(
    value
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
      : {},
  );

  useEffect(() => {
    dispatch(resetSearchContent());
  }, [dispatch]);

  useEffect(() => {
    setChoices({
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
    });
  }, [intl, search, value]);

  const onSearchChange = (event, data) => {
    if (data.searchQuery && data.searchQuery !== '') {
      dispatch(
        searchContent('', {
          Title: `*${data.searchQuery}*`,
        }),
      );
    } else {
      dispatch(resetSearchContent());
    }
  };
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
          return onChange(
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
  wrapped: PropTypes.bool,
};

ReferenceWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
  multiple: true,
};
export default ReferenceWidget;
