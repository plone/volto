/**
 * VocabularyTermsWidget
 * @module components/manage/Widgets/VocabularyTermsWidget
 * Widget for dict field
 * with value_type TextLine field
 *
 * values are editable
 * keys are generated
 * Purpose: Use this widget for a dict field (of controlpanel), that acts as a source of a vocabulary for a Choice field.
 * Vocabulary terms should change over time only in title (corresponding dictionary value), not value (corresponding dictionary key), as vocabulary term values are stored on content type instances.
 */

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
    id: 'Vocabulary terms',
    defaultMessage: 'Vocabulary terms',
  },
  termtitle: {
    id: 'Vocabulary term',
    defaultMessage: 'Vocabulary term',
  },
  addTerm: {
    id: 'Add vocabulary term',
    defaultMessage: 'Add term',
  },
  removeTerm: {
    id: 'Remove term',
    defaultMessage: 'Remove term',
  },
  clearTermTitle: {
    id: 'Reset term title',
    defaultMessage: 'Reset title',
  },
  termtitlelabel: {
    id: 'Vocabulary term title',
    defaultMessage: 'Title',
  },
});

const VocabularyTermsWidget = (props) => {
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
          aria-label={intl.formatMessage(messages.termtitle)}
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
          {intl.formatMessage(messages.addTerm)}
        </Button>
      </div>
      <Grid className="entries-list">
        {vocabularytokens.map((dictkey, index) => {
          return (
            <Grid.Row stretched className="entry-wrapper" key={index}>
              <Grid.Column width="1">
                <Button.Group>
                  <Button
                    basic
                    className="cancel"
                    title={intl.formatMessage(messages.removeTerm)}
                    aria-label={`${intl.formatMessage(messages.removeTerm)} #${
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
                  placeholder={intl.formatMessage(messages.termtitlelabel)}
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
                      title={intl.formatMessage(messages.clearTermTitle)}
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

export default VocabularyTermsWidget;
