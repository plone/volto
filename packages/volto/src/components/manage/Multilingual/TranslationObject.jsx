import React, { useEffect, useState } from 'react';
import map from 'lodash/map';
import { defineMessages, useIntl } from 'react-intl';
import { Form as UiForm, Menu, Segment } from 'semantic-ui-react';
import { Provider } from 'react-intl-redux';
import { Form, Field } from '@plone/volto/components/manage/Form';
import config from '@plone/volto/registry';
import configureStore from '@plone/volto/store';
import Api from '@plone/volto/helpers/Api/Api';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import langmap from '@plone/volto/helpers/LanguageMap/LanguageMap';
import {
  toGettextLang,
  toReactIntlLang,
} from '@plone/volto/helpers/Utils/Utils';
import { createBrowserHistory } from 'history';

const messages = defineMessages({
  document: {
    id: 'Document',
    defaultMessage: 'Document',
  },
});

const TranslationObject = ({
  translationObject,
  schema,
  pathname,
  visual,
  isFormSelected,
  onSelectForm,
}) => {
  const intl = useIntl();

  const [locales, setLocales] = useState({});
  const [loadingLocale, setLoadingLocale] = useState(false);
  const [activeMenu, setActiveMenu] = useState('language');
  const handleMenuClick = (e, { name }) => {
    setActiveMenu(name);
  };

  useEffect(() => {
    if (
      !loadingLocale &&
      Object.keys(locales).length < config.settings.supportedLanguages.length
    ) {
      setLoadingLocale(true);
      let lang =
        config.settings.supportedLanguages[Object.keys(locales).length];
      const langFileName = toGettextLang(lang);
      import(
        /* @vite-ignore */ '@root/../locales/' + langFileName + '.json'
      ).then((locale) => {
        setLocales({ ...locales, [toReactIntlLang(lang)]: locale.default });
        setLoadingLocale(false);
      });
    }
  }, [loadingLocale, locales]);

  const api = new Api();
  const history = createBrowserHistory();
  const store = configureStore(
    {
      ...window.__data,
      intl: {
        defaultLocale: translationObject.language.token,
        locale: translationObject.language.token,
        messages: locales[translationObject.language.token],
      },
    },
    history,
    api,
  );

  const lang = translationObject.language.token;

  return translationObject && Object.keys(locales).length > 0 ? (
    <Provider store={store}>
      <>
        <Menu pointing secondary attached tabular>
          <Menu.Item
            name="language"
            active={activeMenu === 'language'}
            onClick={handleMenuClick}
          >
            {langmap[lang].nativeName}
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
            type={translationObject['@type']}
            onSubmit={() => {
              /*do nothing*/
            }}
            hideActions
            pathname={flattenToAppURL(translationObject['@id'])}
            visual={visual}
            title={langmap[lang].nativeName}
            loading={false}
            isFormSelected={isFormSelected}
            onSelectForm={onSelectForm}
            editable={false}
            onChange={() => {}}
          />
        )}
        {activeMenu === 'properties' && (
          <UiForm method="post" onSubmit={() => {}}>
            <fieldset className="invisible">
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
    </Provider>
  ) : null;
};

export default TranslationObject;
