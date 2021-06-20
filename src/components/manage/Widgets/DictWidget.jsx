import React from 'react';
import { useDispatch } from 'react-redux';
import { keys } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import { Button, Grid, Input, Segment } from 'semantic-ui-react';

import { FormFieldWrapper, Icon } from '@plone/volto/components';

import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  title: {
    id: 'Dictionary',
    defaultMessage: 'Dictionary',
  },
  entrytitle: {
    id: 'Dictionary Entry',
    defaultMessage: 'Dictionary Entry',
  },
  addEntry: {
    id: 'Add dictionary entry',
    defaultMessage: 'Add entry',
  },
  removeEntry: {
    id: 'Remove dictionary entry',
    defaultMessage: 'Remove entry',
  },
  clearEntry: {
    id: 'Reset dictionary value',
    defaultMessage: 'Reset value',
  },
  entryvaluelabel: {
    id: 'Dictionary Value',
    defaultMessage: 'Value',
  },
});

const DictWidget = (props) => {
  const { id, value = {}, onChange } = props;
  const dispatch = useDispatch();
  const [toFocusId, setToFocusId] = React.useState('');
  const intl = useIntl();

  const dictionarykeys = keys(value).sort((a, b) => {
    return value[a].localeCompare(value[b]);
  });

  React.useEffect(() => {
    const element = document.getElementById(toFocusId);
    element && element.focus();
  }, [dispatch, toFocusId, value]);

  function onChangeFieldHandler(dictkey, fieldvalue) {
    onChange(id, { ...value, [dictkey]: fieldvalue });
    setToFocusId(props.id + '-' + dictkey);
  }

  return (
    <FormFieldWrapper {...props} className="dictwidget">
      <Segment basic>
        <h3>{props.title}</h3>
      </Segment>
      <div className="add-item-button-wrapper">
        <Button
          aria-label={intl.formatMessage(messages.entrytitle)}
          onClick={(e) => {
            e.preventDefault();
            const newdictkey = uuid();
            onChange(id, {
              ...value,
              [newdictkey]: '',
            });
            setToFocusId(props.id + '-' + newdictkey);
          }}
        >
          <Icon name={addSVG} size="18px" />
          {intl.formatMessage(messages.addEntry)}
        </Button>
      </div>
      <Grid className="entries-list">
        {dictionarykeys.map((dictkey, index) => {
          return (
            <Grid.Row stretched className="entry-wrapper" key={index}>
              <Grid.Column width="1">
                <Button.Group>
                  <Button
                    basic
                    className="cancel"
                    title={`${intl.formatMessage(messages.removeEntry)} ${
                      value[dictkey]
                    } (${dictkey})`}
                    aria-label={`${intl.formatMessage(messages.removeEntry)} #${
                      index + 1
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      let dct = { ...value };
                      delete dct[dictkey];
                      onChange(id, dct);
                    }}
                  >
                    <Icon name={deleteSVG} size="20px" color="#e40166" />
                  </Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column width="10">
                <Input
                  id={`${props.id}-${dictkey}`}
                  name={`${props.id}-${dictkey}`}
                  type="text"
                  placeholder={intl.formatMessage(messages.entryvaluelabel)}
                  required={true}
                  value={value[dictkey]}
                  onChange={(e, target) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChangeFieldHandler(dictkey, target.value);
                  }}
                />
              </Grid.Column>
              <Grid.Column width="1">
                {value[dictkey]?.length > 0 && (
                  <Button.Group>
                    <Button
                      basic
                      className="cancel"
                      title={`${intl.formatMessage(messages.clearEntry)} ${
                        value[dictkey]
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onChangeFieldHandler(dictkey, '');
                      }}
                    >
                      <Icon name={clearSVG} size="20px" />
                    </Button>
                  </Button.Group>
                )}
              </Grid.Column>
            </Grid.Row>
          );
        })}
      </Grid>
    </FormFieldWrapper>
  );
};

export default DictWidget;
