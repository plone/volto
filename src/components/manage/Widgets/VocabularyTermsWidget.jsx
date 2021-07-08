/**
 * VocabularyTermsWidget
 * @module components/manage/Widgets/VocabularyTermsWidget
 * Widget for dict field
 *   - with value_type TextLine field
 *   - or value_type Dict field for translations
 *
 * values are editable
 * keys are generated
 * Purpose: Use this widget for a dict field (of controlpanel),
 * that acts as a source of a vocabulary for a Choice field.
 * Vocabulary terms should change over time only in title (corresponding dictionary value), not value (corresponding dictionary key),
 * as vocabulary term values are stored on content type instances.
 *
 * The widget has two versions depending if you apply it (widget='vocabularyterms') to a plone.schema Dict field
 *   - with value_type TextLine field
 *   - or value_type Dict field for translations
 * The latter provides fields for all config.settings.supportedLanguages
 *
 * See storybook for a demo.
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { keys, values } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import { Button, Divider, Grid, Input, Segment } from 'semantic-ui-react';

import { FormFieldWrapper, Icon, ObjectWidget } from '@plone/volto/components';
import { langmap } from '@plone/volto/helpers';

import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import config from '@plone/volto/registry';

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

  // sort terms by values
  // sort terms with translations by defaultLanguage if provided by config
  const defaultLanguage =
    config.settings.defaultLanguage ?? config.settings.supportedLanguages[0];
  const vocabularytokens =
    props.value_type?.schema?.type === 'string'
      ? keys(value).sort((a, b) => {
          return value[a].localeCompare(value[b]);
        })
      : keys(value).sort((a, b) => {
          return defaultLanguage
            ? value[a][defaultLanguage]?.localeCompare(
                value[b][defaultLanguage],
              )
            : values(value[a])[0].localeCompare(values(value[b])[0]);
        });

  const TermSchema = {
    title: 'Translation of term',
    fieldsets: [
      {
        id: 'default',
        title: 'Email',
        fields: config.settings.supportedLanguages,
      },
    ],
    properties: Object.fromEntries(
      config.settings.supportedLanguages.map((languageIdentifier) => [
        languageIdentifier,
        {
          title: langmap[languageIdentifier]?.nativeName ?? languageIdentifier,
        },
      ]),
    ),
    required: [],
  };

  React.useEffect(() => {
    const element = document.getElementById(toFocusId);
    element && element.focus();
  }, [dispatch, toFocusId, value]);

  function onChangeFieldHandler(dictkey, fieldvalue) {
    onChange(id, { ...value, [dictkey]: fieldvalue });
    if (typeof fieldvalue === 'string') {
      setToFocusId(props.id + '-' + dictkey);
    }
  }

  function addTermHandler(e) {
    e.preventDefault();
    const newdictkey = uuid();
    if (props.value_type?.schema?.type === 'string') {
      onChange(id, {
        ...value,
        [newdictkey]: '',
      });
      setToFocusId(props.id + '-' + newdictkey);
    } else {
      onChange(id, {
        ...value,
        [newdictkey]: Object.fromEntries(
          config.settings.supportedLanguages.map((el) => [el, '']),
        ),
      });
    }
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
            addTermHandler(e);
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
                {typeof value[dictkey] === 'string' ? (
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
                ) : (
                  <>
                    <ObjectWidget
                      id={`${id}-${dictkey}`}
                      onChange={(id, value) => {
                        onChangeFieldHandler(dictkey, value);
                      }}
                      value={value[dictkey]}
                      schema={TermSchema}
                      title="Translation of term"
                    />
                    <Divider />
                  </>
                )}
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
