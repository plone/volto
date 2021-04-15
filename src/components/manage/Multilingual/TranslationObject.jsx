/**
 * Add container.
 * @module components/manage/Add/Add
 */

import React, { useState } from 'react';
import { map } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import { Form as UiForm, Menu, Segment } from 'semantic-ui-react';

import { Form, Field } from '@plone/volto/components';

const messages = defineMessages({
  document: {
    id: 'Document',
    defaultMessage: 'Document',
  },
});

/**
 * TranslationObject class.
 * @class TranslationObject
 * @extends Component
 */
const TranslationObject = ({
  translationObject,
  schema,
  pathname,
  visual,
  isFormSelected,
  onSelectForm,
}) => {
  const intl = useIntl();
  const [activeMenu, setActiveMenu] = useState('language');
  const handleMenuClick = (e, { name }) => {
    setActiveMenu(name);
  };

  return (
    <>
      <Menu pointing secondary attached tabular>
        <Menu.Item
          name="language"
          active={activeMenu === 'language'}
          onClick={handleMenuClick}
        >
          {translationObject.language.token.toUpperCase()}
        </Menu.Item>
        {visual && (
          <Menu.Item
            name="properties"
            active={activeMenu === 'properties'}
            onClick={handleMenuClick}
          >
            {intl.formatMessage(messages.document)}
          </Menu.Item>
        )}
      </Menu>
      {activeMenu === 'language' && (
        <Form
          key="translation-object-form"
          schema={schema}
          formData={translationObject}
          onSubmit={() => {
            /*do nothing*/
          }}
          hideActions
          pathname={pathname}
          visual={visual}
          title={translationObject.language.title}
          loading={false}
          isFormSelected={isFormSelected}
          onSelectForm={onSelectForm}
          editable={false}
          onChange={() => {}}
        />
      )}
      {activeMenu === 'properties' && (
        <UiForm method="post" onSubmit={() => {}}>
          <fieldset className="invisible" disabled={true}>
            {schema &&
              map(schema.fieldsets, (item) => [
                <Segment secondary attached key={item.title}>
                  {item.title}
                </Segment>,
                <Segment attached key={`fieldset-contents-${item.title}`}>
                  {map(item.fields, (field, index) => (
                    <Field
                      {...schema.properties[field]}
                      id={field}
                      formData={translationObject}
                      focus={false}
                      value={translationObject[field]}
                      required={schema.required.indexOf(field) !== -1}
                      key={field}
                      onChange={() => {}}
                    />
                  ))}
                </Segment>,
              ])}
          </fieldset>
        </UiForm>
      )}
    </>
  );
};

export default TranslationObject;
