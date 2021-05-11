import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { langmap, useDetectClickOutside } from '@plone/volto/helpers';

import { Icon } from '@plone/volto/components';
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

  const ClickOutsideListener = () => {
    closeMenu();
  };

  const ref = useDetectClickOutside({
    onTriggered: ClickOutsideListener,
    triggerKeys: ['Escape'],
  });

  return (
    <div
      className="toolbar-content show compare-languages"
      ref={ref}
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
                      langmap[t.language].nativeName
                    }`}
                    title={`${intl.formatMessage(messages.stop_compare)} ${
                      langmap[t.language].nativeName
                    }`}
                    onClick={() => {
                      setComparingLanguage(null);
                      closeMenu();
                    }}
                  >
                    {langmap[t.language].nativeName}
                    <Icon name={clearSVG} size="30px" />
                  </button>
                ) : (
                  <button
                    aria-label={`${intl.formatMessage(
                      messages.compare_to,
                    )} ${langmap[t.language].nativeName.toLowerCase()}`}
                    title={`${intl.formatMessage(
                      messages.compare_to,
                    )} ${langmap[t.language].nativeName.toLowerCase()}`}
                    onClick={() => {
                      setComparingLanguage(t.language);
                      closeMenu();
                    }}
                  >
                    {langmap[t.language].nativeName}
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
  const translations = config.settings.isMultilingual
    ? content?.['@components']?.translations?.items || []
    : [];

  const translationsObject = {};
  translations.forEach((t) => {
    translationsObject[t.language] = t['@id'];
  });

  if (config.settings.isMultilingual && translations.length > 0) {
    return (
      <div className="toolbar-compare-translations-wrapper">
        <div className="toolbar-button-spacer" />

        <Button
          aria-label={intl.formatMessage(messages.compare_to)}
          title={intl.formatMessage(messages.compare_to)}
          onClick={() => {
            setViewMenu(!viewMenu);
          }}
          id="toolbar-compare-translations"
          className="toolbar-button-compare-translations"
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
