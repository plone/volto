/**
 * VocabularyTermsWidget
 * @module components/manage/Widgets/VocabularyTermsWidget
 * Widget for plone.schema.JSONField field meant for a SimpleVocabulary source
 * 

VOCABULARY_SCHEMA = json.dumps(
    {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "token": {"type": "string"},
                        "titles": {
                            "type": "object",
                            "properties": {
                                "lang": {"type": "string"},
                                "title": {"type": "string"},
                            }
                        },
                    }
                }
            }
        },
    }
)


class IPloneconfSettings(Interface):

    types_of_foo = schema.JSONField(
        title="Types of Foo",
        description="Available types of a foo",
        required=False,
        schema=VOCABULARY_SCHEMA,
        widget="vocabularyterms",
        default={"items": [
            {
                "token": "talk",
                "titles": {
                    "en": "Talk",
                    "de": "Vortrag",
                }
            },
            {
                "token": "lightning-talk",
                "titles": {
                    "en": "Lightning-Talk",
                    "de": "kürzerer erleuchtender Vortrag",
                }
            },
        ]},
        missing_value={"items": []},
    )


@provider(IVocabularyFactory)
def TalkTypesVocabulary(context):
    name = "ploneconf.types_of_talk"
    registry_record_value = api.portal.get_registry_record(name)
    items = registry_record_value.get('items', [])
    lang = api.portal.get_current_language()
    return SimpleVocabulary.fromItems([[item['token'], item['token'], item['titles'][lang]] for item in items])


 * titles are editable
 * tokens are generated
 * 
 * Purpose: Use this widget for a controlpanel field
 * that acts as a source of a vocabulary for a zope.schema.Choice field.
 * Vocabulary terms should change over time only in title, not value,
 * as vocabulary term values are stored on content type instances.
 *
 * Apply widget with `widget='vocabularyterms'`
 * Future widget directive coming: Apply widget with directive widget
 *
 * See storybook for a demo: Run
 * `yarn storybook`
 * or see https://docs.voltocms.com/storybook/
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { findIndex, remove } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import { Button, Segment } from 'semantic-ui-react';

import {
  DragDropList,
  FormFieldWrapper,
  Icon,
  ObjectWidget,
} from '@plone/volto/components';
import { langmap } from '@plone/volto/helpers';

import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';

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
  var widgetvalue = value;
  const dispatch = useDispatch();
  const [toFocusId, setToFocusId] = React.useState('');
  const intl = useIntl();

  React.useEffect(() => {
    const element = document.getElementById(toFocusId);
    element && element.focus();
    setToFocusId('');
  }, [dispatch, toFocusId]);

  // LEGACY: value from unordered zope.schema.Dict instead of zope.schema.JSONField
  if (widgetvalue.items === undefined) {
    widgetvalue = {
      items: Object.keys(widgetvalue).map((key) => {
        return {
          token: key,
          titles: {
            en: widgetvalue[key],
          },
        };
      }),
    };
  }

  let vocabularyterms = widgetvalue.items;

  let supportedLanguages = Object.keys(
    vocabularyterms?.map((el) => el.titles)?.pop() || {},
  );

  const TermSchema = {
    title: 'Translation of term',
    fieldsets: [
      {
        id: 'default',
        title: 'Email',
        fields: supportedLanguages,
      },
    ],
    properties: Object.fromEntries(
      supportedLanguages.map((languageIdentifier) => [
        languageIdentifier,
        {
          title: langmap[languageIdentifier]?.nativeName ?? languageIdentifier,
        },
      ]),
    ),
    required: [],
  };

  function onChangeFieldHandler(token, fieldid, fieldvalue) {
    let index = findIndex(widgetvalue.items, { token: token });
    let newitems = widgetvalue.items;
    newitems.splice(index, 1, {
      token: token,
      titles: fieldvalue,
    });
    onChange(id, {
      items: newitems,
    });
  }

  function addTermHandler(e) {
    e.preventDefault();
    const newtoken = uuid();
    let newitems = widgetvalue.items;
    newitems.push({
      token: newtoken,
      titles: Object.fromEntries(supportedLanguages.map((el) => [el, ''])),
    });
    onChange(id, {
      items: newitems,
    });
    setToFocusId(`field-${supportedLanguages[0]}-0-${id}-${newtoken}`);
  }

  function swap(arr, from, to) {
    arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
  }

  let enhancedvocabularyterms = vocabularyterms.map((el) => {
    return { ...el, '@id': el.token };
  });

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
      <DragDropList
        childList={enhancedvocabularyterms.map((o) => [o['@id'], o])}
        onMoveItem={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          let newitems = widgetvalue.items;
          swap(newitems, source.index, destination.index);
          onChange(id, {
            items: newitems,
          });
          return true;
        }}
      >
        {(dragProps) => {
          const { child, childId, index } = dragProps;
          let termProps = {
            index: index,
            id,
            vocabularyterms,
            vterm: child,
            onChange,
          };
          return termsWrapper(
            dragProps,
            <ObjectWidget
              id={`${id}-${child.token}`}
              key={childId}
              onChange={(fieldid, fieldvalue) => {
                onChangeFieldHandler(child.token, fieldid, fieldvalue);
              }}
              value={child.titles}
              schema={TermSchema}
              title="Translation of term"
            />,
            termProps,
          );
        }}
      </DragDropList>
    </FormFieldWrapper>
  );
};

const termsWrapper = ({ draginfo }, OW, termProps) => (
  <TermsWrapper draginfo={draginfo} termProps={termProps}>
    {OW}
  </TermsWrapper>
);

const TermsWrapper = (props) => {
  const intl = useIntl();
  const { termProps, draginfo, children } = props;
  const { id, vocabularyterms, vterm, onChange } = termProps;

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className="vocabularyterm"
    >
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <div {...draginfo.dragHandleProps} className="draghandlewrapper">
          <Icon name={dragSVG} size="18px" />
        </div>
        <div className="ui drag block inner">{children}</div>
        <div>
          <Button
            icon
            basic
            className="delete-button"
            title={intl.formatMessage(messages.removeTerm)}
            aria-label={`${intl.formatMessage(messages.removeTerm)} #${
              vterm.token
            }`}
            onClick={(e) => {
              e.preventDefault();
              remove(vocabularyterms, (el) => el.token === vterm.token);
              onChange(id, { items: vocabularyterms });
            }}
          >
            <Icon name={deleteSVG} size="20px" color="#e40166" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyTermsWidget;
