import { render } from '@testing-library/react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18n from '../app/i18n';

/**
 * Use this function to render a component with the i18next provider
 * @param children The route Stub to render
 */
export async function renderWithI18n(children: React.ReactNode) {
  await i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ...i18n,
      ns: ['common'],
      detection: {
        order: ['htmlTag'],
        caches: [],
      },
    });
  const result = render(
    <I18nextProvider i18n={i18next}>{children}</I18nextProvider>,
  );
  return result;
}
