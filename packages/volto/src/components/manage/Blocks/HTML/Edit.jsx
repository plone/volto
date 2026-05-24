import { compose } from 'redux';
import React, {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { Button, Popup } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import showSVG from '@plone/volto/icons/show.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import indentSVG from '@plone/volto/icons/indent.svg';

const Editor = loadable(() => import('react-simple-code-editor'));

const messages = defineMessages({
  source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  preview: {
    id: 'Preview',
    defaultMessage: 'Preview',
  },
  placeholder: {
    id: '<p>Add some HTML here</p>',
    defaultMessage: '<p>Add some HTML here</p>',
  },
  prettier: {
    id: 'Prettify your code',
    defaultMessage: 'Prettify your code',
  },
  clear: {
    id: 'Clear',
    defaultMessage: 'Clear',
  },
  code: {
    id: 'Code',
    defaultMessage: 'Code',
  },
});

const Edit = memo(
  (props) => {
    const {
      selected,
      block,
      data,
      onChangeBlock,
      editable = true,
      prettierStandalone,
      prettierParserHtml,
      prismCore,
    } = props;

    const intl = useIntl();

    const [isPreview, setIsPreview] = useState(false);

    const codeEditorRef = useRef(null);
    const savedSelection = useRef({});

    const getValue = useCallback(() => {
      return data.html || '';
    }, [data.html]);

    const onChangeCode = useCallback(
      (code) => {
        onChangeBlock(block, {
          ...data,
          html: code,
        });
      },
      [onChangeBlock, block, data],
    );

    const getSelection = useCallback((editor) => {
      if (!editor || !editor._input) {
        return {};
      }
      const o = {};
      if (editor._input.selectionStart) {
        o.selectionStart = editor._input.selectionStart;
      }
      if (editor._input.selectionEnd) {
        o.selectionEnd = editor._input.selectionEnd;
      }
      return o;
    }, []);

    useLayoutEffect(() => {
      const editor = codeEditorRef.current;
      if (
        selected &&
        editor?._input &&
        typeof savedSelection.current?.selectionStart === 'number' &&
        typeof savedSelection.current?.selectionEnd === 'number'
      ) {
        editor._input.selectionStart = savedSelection.current.selectionStart;
        editor._input.selectionEnd = savedSelection.current.selectionEnd;
        editor._input.focus();
      }
    });

    const editorRefCallback = useCallback(
      (node) => {
        if (node) {
          codeEditorRef.current = node;
          savedSelection.current = getSelection(node);
        }
      },
      [getSelection],
    );

    const onPreview = useCallback(async () => {
      try {
        const code = (
          await prettierStandalone.format(getValue(), {
            parser: 'html',
            plugins: [prettierParserHtml],
          })
        ).trim();
        setIsPreview((prev) => !prev);
        onChangeCode(code);
      } catch (ex) {}
    }, [prettierStandalone, prettierParserHtml, getValue, onChangeCode]);

    const onPrettify = useCallback(async () => {
      try {
        const code = (
          await prettierStandalone.format(getValue(), {
            parser: 'html',
            plugins: [prettierParserHtml],
          })
        ).trim();
        onChangeCode(code);
      } catch (ex) {}
    }, [prettierStandalone, prettierParserHtml, getValue, onChangeCode]);

    const onCodeEditor = useCallback(() => {
      setIsPreview((prev) => !prev);
    }, []);

    const placeholder =
      data.placeholder || intl.formatMessage(messages.placeholder);
    const value = getValue();

    return (
      <>
        {selected && value && (
          <div className="toolbar">
            <Popup
              trigger={
                <Button
                  type="button"
                  icon
                  basic
                  aria-label={intl.formatMessage(messages.source)}
                  active={!isPreview}
                  onClick={onCodeEditor}
                >
                  <Icon name={codeSVG} size="24px" />
                </Button>
              }
              position="top center"
              content={intl.formatMessage(messages.code)}
              size="mini"
            />
            <Popup
              trigger={
                <Button
                  type="button"
                  icon
                  basic
                  aria-label={intl.formatMessage(messages.preview)}
                  active={isPreview}
                  onClick={onPreview}
                >
                  <Icon name={showSVG} size="24px" />
                </Button>
              }
              position="top center"
              content={intl.formatMessage(messages.preview)}
              size="mini"
            />
            <Popup
              trigger={
                <Button
                  type="button"
                  icon
                  basic
                  aria-label={intl.formatMessage(messages.prettier)}
                  onClick={onPrettify}
                >
                  <Icon name={indentSVG} size="24px" />
                </Button>
              }
              position="top center"
              content={intl.formatMessage(messages.prettier)}
              size="mini"
            />
            <div className="separator" />
            <Popup
              trigger={
                <Button.Group>
                  <Button
                    type="button"
                    icon
                    basic
                    onClick={() => onChangeCode('')}
                  >
                    <Icon name={clearSVG} size="24px" color="#e40166" />
                  </Button>
                </Button.Group>
              }
              position="top center"
              content={intl.formatMessage(messages.clear)}
              size="mini"
            />
          </div>
        )}
        {isPreview ? (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <Editor
            value={value}
            readOnly={!editable}
            placeholder={placeholder}
            onValueChange={(code) => onChangeCode(code)}
            highlight={
              prismCore?.highlight && prismCore?.languages?.html
                ? (code) =>
                    prismCore.highlight(code, prismCore.languages.html, 'html')
                : () => {}
            }
            padding={8}
            className="html-editor"
            ref={editorRefCallback}
            ignoreTabKey={true}
          />
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    if (nextProps.selected) return false;
    return (
      prevProps.data === nextProps.data &&
      prevProps.selected === nextProps.selected
    );
  },
);

Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

Edit.defaultProps = {
  editable: true,
};

const withPrismMarkup = (WrappedComponent) => (props) => {
  const [loaded, setLoaded] = React.useState();
  const promise = React.useRef(null);
  const cancelled = React.useRef(false);

  React.useEffect(() => {
    promise.current = import('prismjs/components/prism-markup');
    promise.current.then(() => {
      if (!cancelled.current) {
        setLoaded(true);
      }
    });
    return () => {
      cancelled.current = true;
    };
  }, []);

  return loaded ? <WrappedComponent {...props} /> : null;
};

export default compose(
  injectLazyLibs(['prettierStandalone', 'prettierParserHtml', 'prismCore']),
  withPrismMarkup,
)(Edit);
