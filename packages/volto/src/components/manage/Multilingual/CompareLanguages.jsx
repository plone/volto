import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import langmap from '@plone/volto/helpers/LanguageMap/LanguageMap';
import { useDetectClickOutside } from '@plone/volto/helpers/Utils/useDetectClickOutside';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from 'semantic-ui-react';
import translateSVG from '@plone/volto/icons/translate.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  compare_to: {
    id: 'compare_to',
    defaultMessage: 'Compare to language',
  },
  stop_compare: {
    id: 'Stop compare',
    defaultMessage: 'Stop compare',
  },
});

const CompareLanguagesMenu = ({
  theToolbar,
  translations,
  comparingLanguage,
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
                {comparingLanguage === t.language ? (
                  <button
                    aria-label={`${intl.formatMessage(messages.stop_compare)} ${
                      langmap[t.language]?.nativeName || t.language
                    }`}
                    title={`${intl.formatMessage(messages.stop_compare)} ${
                      langmap[t.language]?.nativeName || t.language
                    }`}
                    onClick={() => {
                      setComparingLanguage(null);
                      closeMenu();
                    }}
                  >
                    {langmap[t.language]?.nativeName || t.language}
                    <Icon name={clearSVG} size="30px" />
                  </button>
                ) : (
                  <button
                    aria-label={`${intl.formatMessage(
                      messages.compare_to,
                    )} ${(langmap[t.language]?.nativeName || t.language).toLowerCase()}`}
                    title={`${intl.formatMessage(
                      messages.compare_to,
                    )} ${(langmap[t.language]?.nativeName || t.language).toLowerCase()}`}
                    onClick={() => {
                      setComparingLanguage(t.language);
                      closeMenu();
                    }}
                  >
                    {langmap[t.language]?.nativeName || t.language}
                  </button>
                )}
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
  const translations = content?.['@components']?.translations?.items || [];
  const compareLanguagesRef = useDetectClickOutside({
    onTriggered: () => setViewMenu(false),
    triggerKeys: ['Escape'],
  });

  const translationsObject = {};
  translations.forEach((t) => {
    translationsObject[t.language] = t['@id'];
  });

  if (translations.length > 0) {
    return (
      <div
        className="toolbar-compare-translations-wrapper"
        ref={compareLanguagesRef}
      >
        <div className="toolbar-button-spacer" />

        <Button
          type="button"
          aria-label={intl.formatMessage(messages.compare_to)}
          title={intl.formatMessage(messages.compare_to)}
          onClick={() => {
            setViewMenu((viewMenu) => !viewMenu);
          }}
          id="toolbar-compare-translations"
          className="toolbar-button-compare-translations"
        >
          <Icon
            className="mobile hidden"
            name={viewMenu ? clearSVG : translateSVG}
            size="30px"
          />
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
            comparingLanguage={comparingLanguage}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
});

export default CompareLanguages;
