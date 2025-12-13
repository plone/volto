/**
 * Edit html block.
 * @module components/manage/Blocks/HTML/Edit
 */

import { compose } from 'redux';
import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Popup } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';
import isEqual from 'lodash/isEqual';

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

/**
 * Edit html block component.
 * @function Edit
 * @param {Object} props Component properties
 */
function Edit(props) {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  const { selected, data, onChangeBlock, editable } = props;

  const [isPreview, setisPreview] = useState(false);
  const intl = useIntl();
  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   */

  const codeEditorRef = useRef(null);
  const savedSelection = useRef({});
  const prevDataRef = useRef(data);
  const prevSelectedRef = useRef(selected);
  const isRestoringRef = useRef(false);

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

  const restoreSelectionAndFocus = useCallback(
    (editor) => {
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
    },
    [selected],
  );

  useEffect(() => {
    if (!isRestoringRef.current && codeEditorRef.current?._input) {
      const selection = getSelection(codeEditorRef.current);
      if (
        typeof selection.selectionStart === 'number' &&
        typeof selection.selectionEnd === 'number'
      ) {
        savedSelection.current = selection;
      }
    }
  }, [getSelection]);

  useEffect(() => {
    const dataChanged = !isEqual(prevDataRef.current, data);
    const selectedChanged = prevSelectedRef.current !== selected;

    if (dataChanged || selectedChanged) {
      prevDataRef.current = data;
      prevSelectedRef.current = selected;

      isRestoringRef.current = true;

      requestAnimationFrame(() => {
        if (
          selected &&
          codeEditorRef.current?._input &&
          typeof savedSelection.current?.selectionStart === 'number' &&
          typeof savedSelection.current?.selectionEnd === 'number'
        ) {
          restoreSelectionAndFocus(codeEditorRef.current);
        }

        isRestoringRef.current = false;
      });
    }
  }, [selected, data, getSelection, restoreSelectionAndFocus]);

  /**
   * Change html handler
   * @method onChangeCode
   * @param {string} code New value html
   * @returns {undefined}
   */
  const onChangeCode = (code) => {
    onChangeBlock(props.block, {
      ...data,
      html: code,
    });
  };

  const getValue = () => {
    return data.html || '';
  };

  /**
   * Preview mode handler
   * @method onPreview
   * @returns {undefined}
   */
  const onPreview = async () => {
    try {
      const code = (
        await props.prettierStandalone.format(getValue(), {
          parser: 'html',
          plugins: [props.prettierParserHtml],
        })
      ).trim();
      setisPreview(!isPreview);
      onChangeCode(code);
    } catch (ex) {
      // error while parsing the user-typed HTML
      // TODO: show a toast notification or something similar to the user
    }
  };

  /**
   * Prettify handler
   * @method onPrettify
   * @returns {undefined}
   */
  const onPrettify = async () => {
    try {
      const code = (
        await props.prettierStandalone.format(getValue(), {
          parser: 'html',
          plugins: [props.prettierParserHtml],
        })
      ).trim();
      onChangeCode(code);
    } catch (ex) {
      // error while parsing the user-typed HTML
      // TODO: show a toast notification or something similar to the user
    }
  };

  /**
   * Code Editor mode handler
   * @method onPreview
   * @returns {undefined}
   */
  const onCodeEditor = () => {
    setisPreview(!isPreview);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

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
          value={getValue()}
          readOnly={!editable}
          placeholder={placeholder}
          onValueChange={(code) => onChangeCode(code)}
          highlight={
            props.prismCore?.highlight && props.prismCore?.languages?.html
              ? (code) =>
                  props.prismCore.highlight(
                    code,
                    props.prismCore.languages.html,
                    'html',
                  )
              : () => {}
          }
          padding={8}
          className="html-editor"
          ref={(node) => {
            if (node) {
              codeEditorRef.current = node;
            }
          }}
          ignoreTabKey={true}
        />
      )}
    </>
  );
}

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
  const [loaded, setLoaded] = useState();
  const promise = useRef(null);
  const cancelled = useRef(false);

  useEffect(() => {
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
