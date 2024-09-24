import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { map, keys } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { withCookies } from 'react-cookie';

import { Toast } from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
import languages from '@plone/volto/constants/Languages.cjs';
import { changeLanguage } from '@plone/volto/actions';
import { toGettextLang } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const messages = defineMessages({
  personalPreferences: {
    id: 'Personal Preferences',
    defaultMessage: 'Personal Preferences',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  language: {
    id: 'Language',
    defaultMessage: 'Language',
  },
  languageDescription: {
    id: 'Your preferred language',
    defaultMessage: 'Your preferred language',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Changes saved',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

const PersonalPreferences = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { closeMenu } = props;
  const onSubmit = (data) => {
    let language = data.language || 'en';
    if (config.settings.supportedLanguages.includes(language)) {
      const langFileName = toGettextLang(language);
      import(
        /* @vite-ignore */ '@root/../locales/' + langFileName + '.json'
      ).then((locale) => {
        dispatch(changeLanguage(language, locale.default));
      });
    }
    toast.success(<Toast success title={intl.formatMessage(messages.saved)} />);
    closeMenu();
  };

  const onCancel = () => {
    closeMenu();
  };
  const { cookies } = props;
  return (
    <Form
      formData={{ language: cookies.get('I18N_LANGUAGE') || '' }}
      schema={{
        fieldsets: [
          {
            id: 'default',
            title: intl.formatMessage(messages.default),
            fields: ['language'],
          },
        ],
        properties: {
          language: {
            description: intl.formatMessage(messages.languageDescription),
            title: intl.formatMessage(messages.language),
            type: 'string',
            choices: map(keys(languages), (lang) => [lang, languages[lang]]),
          },
        },
        required: [],
      }}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

PersonalPreferences.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};
export default compose(withCookies)(PersonalPreferences);
