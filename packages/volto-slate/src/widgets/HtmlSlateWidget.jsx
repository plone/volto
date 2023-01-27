/**
 * HtmlSlateWidget, a slate widget variant that saves its data as HTML
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';

import { FormFieldWrapper } from '@plone/volto/components';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import { serializeNodes } from '@plone/volto-slate/editor/render';
import { makeEditor } from '@plone/volto-slate/utils';
import deserialize from '@plone/volto-slate/editor/deserialize';

import {
  createEmptyParagraph,
  normalizeExternalData,
} from '@plone/volto-slate/utils';
import { ErrorBoundary } from './ErrorBoundary';

import './style.css';

const messages = defineMessages({
  error: {
    id:
      'An error has occurred while editing "{name}" field. We have been notified and we are looking into it. Please save your work and retry. If the issue persists please contact the site administrator.',
    defaultMessage:
      'An error has occurred while editing "{name}" field. We have been notified and we are looking into it. Please save your work and retry. If the issue persists please contact the site administrator.',
  },
});

const HtmlSlateWidget = (props) => {
  const {
    id,
    onChange,
    value,
    focus,
    className,
    block,
    placeholder,
    properties,
    intl,
  } = props;

  const [selected, setSelected] = React.useState(focus);

  const editor = React.useMemo(() => makeEditor(), []);

  const token = useSelector((state) => state.userSession.token);

  const toHtml = React.useCallback(
    (value) => {
      const mockStore = configureStore();
      const html = ReactDOMServer.renderToStaticMarkup(
        <Provider store={mockStore({ userSession: { token } })}>
          <MemoryRouter>{serializeNodes(value || [])}</MemoryRouter>
        </Provider>,
      );
      // console.log('toHtml value', JSON.stringify(value));
      // console.log('toHtml html', html);

      return {
        'content-type': value ? value['content-type'] : 'text/html',
        encoding: value ? value.encoding : 'utf8',
        data: html,
      };
    },
    [token],
  );

  const fromHtml = React.useCallback(
    (value) => {
      const html = value?.data || '';

      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const body =
        parsed.getElementsByTagName('google-sheets-html-origin').length > 0
          ? parsed.querySelector('google-sheets-html-origin > table')
          : parsed.body;
      let data = deserialize(editor, body, { collapseWhitespace: false });
      data = normalizeExternalData(editor, data);

      // editor.children = data;
      // Editor.normalize(editor);
      // TODO: need to add {text: ""} placeholders between elements
      const res = data.length ? data : [createEmptyParagraph()];
      // console.log('from html', { html: value?.data, res });
      return res;
    },
    [editor],
  );

  const valueFromHtml = React.useMemo(() => {
    return fromHtml(value);
  }, [value, fromHtml]);

  const handleChange = React.useCallback(
    (newValue) => {
      onChange(id, toHtml(newValue));
    },
    [onChange, toHtml, id],
  );

  const handleClick = React.useCallback(() => {
    setSelected(true);
  }, []);

  return (
    <FormFieldWrapper {...props} draggable={false} className="slate_wysiwyg">
      <div
        className="slate_wysiwyg_box"
        role="textbox"
        tabIndex="-1"
        style={{ boxSizing: 'initial' }}
        onClick={handleClick}
        onKeyDown={() => {}}
      >
        <ErrorBoundary name={intl.formatMessage(messages.error, { name: id })}>
          <SlateEditor
            className={className}
            id={id}
            name={id}
            value={valueFromHtml}
            onChange={handleChange}
            block={block}
            selected={selected}
            properties={properties}
            placeholder={placeholder}
          />
        </ErrorBoundary>
      </div>
    </FormFieldWrapper>
  );
};

export default injectIntl(HtmlSlateWidget);
