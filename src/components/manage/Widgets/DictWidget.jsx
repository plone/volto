import React from 'react';
import { useDispatch } from 'react-redux';
import { keys, size } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';

import { Button, Grid, Input, Segment } from 'semantic-ui-react';
import { FormFieldWrapper, Icon } from '@plone/volto/components';

import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  title: {
    id: 'Vocabulary',
    defaultMessage: 'Vocabulary',
  },
  termtitle: {
    id: 'Term',
    defaultMessage: 'Term',
  },
  addTerm: {
    id: 'Add vocabulary term',
    defaultMessage: 'Add term',
  },
  removeTerm: {
    id: 'Remove vocabulary term',
    defaultMessage: 'Remove term',
  },
  clearTerm: {
    id: 'Reset vocabulary term',
    defaultMessage: 'Reset term',
  },
  termtokenlabel: {
    id: 'Vocabulary Token',
    defaultMessage: 'Token',
  },
  termtitlelabel: {
    id: 'Vocabulary Value',
    defaultMessage: 'Value',
  },
});

const DictWidget = (props) => {
  const { id, value = {}, onChange } = props;
  const dispatch = useDispatch();
  const [toFocusId, setToFocusId] = React.useState('');
  const intl = useIntl();

  const vocabularytokens = keys(value).sort((a, b) => {
    return value[a].localeCompare(value[b]);
  });

  React.useEffect(() => {
    const element = document.getElementById(toFocusId);
    element && element.focus();
  }, [dispatch, toFocusId]);

  function onChangeField(token, fieldvalue) {
    let dct = { ...value };
    dct[token] = fieldvalue;
    onChange(id, dct);
    setToFocusId(props.id + '-' + token);
  }

  return (
    <FormFieldWrapper {...props} className="vocabularylist">
      <Segment basic>
        <h3>{props.title}</h3>
      </Segment>
      <Grid className="add-term-button-wrapper">
        <Grid.Row stretched>
          <Grid.Column width="6"> </Grid.Column>
          <Grid.Column width="6">
            <Button
              aria-label={intl.formatMessage(messages.termtitle)}
              onClick={(e) => {
                e.preventDefault();
                const newtoken = 'term-' + size(value);
                onChange(id, {
                  ...value,
                  [newtoken]: '',
                });
                setToFocusId(props.id + '-' + newtoken);
              }}
            >
              <Icon name={addSVG} size="18px" />{' '}
              {intl.formatMessage(messages.addTerm)}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid className="terms-wrapper">
        {vocabularytokens.map((token, index) => {
          return (
            <Grid.Row stretched className="term-wrapper" key={index}>
              <Grid.Column width="1">
                <Button.Group>
                  <Button
                    basic
                    className="cancel"
                    title={`${intl.formatMessage(messages.removeTerm)} ${
                      value[token]
                    }`}
                    aria-label={`${intl.formatMessage(messages.removeTerm)} #${
                      index + 1
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      let dct = { ...value };
                      delete dct[token];
                      onChange(id, dct);
                    }}
                  >
                    <Icon name={deleteSVG} size="20px" color="#e40166" />
                  </Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column width="10">
                <Input
                  id={`${props.id}-${token}`}
                  name={`${props.id}-${token}`}
                  type="text"
                  placeholder={intl.formatMessage(messages.termtitlelabel)}
                  required={true}
                  value={value[token]}
                  onChange={(e, target) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onChangeField(token, target.value);
                  }}
                />
              </Grid.Column>
              <Grid.Column width="1">
                {value[token]?.length > 0 && (
                  <Button.Group>
                    <Button
                      basic
                      className="cancel"
                      title={`${intl.formatMessage(messages.clearTerm)} ${
                        value[token]
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onChangeField(token, '');
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
