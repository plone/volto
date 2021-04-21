import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import langmap from 'langmap';
import config from '@plone/volto/registry';

import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import translateSVG from '@plone/volto/icons/translate.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  compare_to: {
    id: 'compare_to',
    defaultMessage: 'Compare to language',
  },
  compare_to_nothing: {
    id: 'compare_to_nothing',
    defaultMessage: 'Do not compare',
  },
});

const CompareLanguagesMenu = ({
  theToolbar,
  translations,
  setComparingLanguage,
  closeMenu,
}) => {
  const intl = useIntl();

  return (
    <div
      className="toolbar-content show compare-languages"
      style={{
        flex: theToolbar.current
          ? `0 0 ${theToolbar.current.getBoundingClientRect().width}px`
          : null,
      }}
    >
      <div className="pastanaga-menu">
        <header>{intl.formatMessage(messages.compare_to)}</header>
        <div className="pastanaga-menu-list">
          <ul>
            {translations.map((t) => (
              <li key={t['@id']}>
                <button
                  aria-label={`${intl.formatMessage(messages.compare_to)} ${
                    langmap[t.language].nativeName
                  }`}
                  onClick={() => {
                    setComparingLanguage(t.language);
                    closeMenu();
                  }}
                >
                  {langmap[t.language].nativeName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CompareLanguages = React.forwardRef((props, ref) => {
  const {
    content,
    comparingLanguage,
    setComparingLanguage,
    pathname,
    toolbarRef,
  } = props;

  const intl = useIntl();
  const [viewMenu, setViewMenu] = useState(false);
  const translations = config.settings.isMultilingual
    ? content?.['@components']?.translations?.items || []
    : [];

  const compareOptions = translations.map((t) => {
    return {
      key: t.language,
      text: t.language,
      value: t.language,
      disabled: t.language === comparingLanguage,
    };
  });

  if (comparingLanguage) {
    compareOptions.push({
      key: 'nothing',
      text: intl.formatMessage(messages.compare_to_nothing),
      value: null,
    });
  }

  const translationsObject = {};
  translations.forEach((t) => {
    translationsObject[t.language] = t['@id'];
  });

  if (config.settings.isMultilingual && compareOptions.length > 0) {
    return (
      <div className="toolbar-compare-translatons-contaniner">
        <div className="toolbar-button-spacer" />

        <Button
          aria-label={intl.formatMessage(messages.compare_to)}
          onClick={() => {
            setViewMenu(!viewMenu);
          }}
          id="toolbar-compare-translations"
        >
          <Icon className="mobile hidden" name={translateSVG} size="30px" />
          {viewMenu ? (
            <Icon className="mobile only" name={clearSVG} size="30px" />
          ) : (
            <Icon className="mobile only" name={translateSVG} size="30px" />
          )}
        </Button>

        {viewMenu && (
          <CompareLanguagesMenu
            pathname={pathname}
            theToolbar={toolbarRef}
            key={`compareLanguagesComponent`}
            closeMenu={() => setViewMenu(false)}
            translations={translations}
            setComparingLanguage={(value) => {
              setComparingLanguage(value, translationsObject[value]);
            }}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
});

export default CompareLanguages;
