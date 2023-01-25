import ReactDOM from 'react-dom';
import cx from 'classnames';
import { isEqual } from 'lodash';
import { Transforms, Editor } from 'slate'; // , Transforms
import { Slate, Editable, ReactEditor } from 'slate-react';
import React, { Component } from 'react'; // , useState
import { v4 as uuid } from 'uuid';

import config from '@plone/volto/registry';

import { Element, Leaf } from './render';

import withTestingFeatures from './extensions/withTestingFeatures';
import {
  makeEditor,
  toggleInlineFormat,
  toggleMark,
  parseDefaultSelection,
} from '@plone/volto-slate/utils';
import { InlineToolbar } from './ui';
import EditorContext from './EditorContext';

import isHotkey from 'is-hotkey';

import './less/editor.less';

import Toolbar from './ui/Toolbar';

const handleHotKeys = (editor, event, config) => {
  let wasHotkey = false;

  for (const hk of Object.entries(config.hotkeys)) {
    const [shortcut, { format, type }] = hk;
    if (isHotkey(shortcut, event)) {
      event.preventDefault();

      if (type === 'inline') {
        toggleInlineFormat(editor, format);
      } else {
        // type === 'mark'
        toggleMark(editor, format);
      }

      wasHotkey = true;
    }
  }

  return wasHotkey;
};

// TODO: implement onFocus
class SlateEditor extends Component {
  constructor(props) {
    super(props);

    this.createEditor = this.createEditor.bind(this);
    this.multiDecorator = this.multiDecorator.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSavedSelection = this.getSavedSelection.bind(this);
    this.setSavedSelection = this.setSavedSelection.bind(this);

    this.savedSelection = null;

    const uid = uuid(); // used to namespace the editor's plugins

    this.slateSettings = props.slateSettings || config.settings.slate;

    this.state = {
      editor: this.createEditor(uid),
      showExpandedToolbar: config.settings.slate.showExpandedToolbar,
      internalValue: this.props.value || this.slateSettings.defaultValue(),
      uid,
    };

    this.editor = null;
    this.selectionTimeout = null;
  }

  getSavedSelection() {
    return this.savedSelection;
  }
  setSavedSelection(selection) {
    this.savedSelection = selection;
  }

  createEditor(uid) {
    // extensions are "editor plugins" or "editor wrappers". It's a similar
    // similar to OOP inheritance, where a callable creates a new copy of the
    // editor, while replacing or adding new capabilities to that editor.
    // Extensions are purely JS, no React components.
    const editor = makeEditor({ extensions: this.props.extensions });

    // When the editor loses focus it no longer has a valid selections. This
    // makes it impossible to have complex types of interactions (like filling
    // in another text box, operating a select menu, etc). For this reason we
    // save the active selection

    editor.getSavedSelection = this.getSavedSelection;
    editor.setSavedSelection = this.setSavedSelection;
    editor.uid = uid || this.state.uid;

    return editor;
  }

  handleChange(value) {
    ReactDOM.unstable_batchedUpdates(() => {
      this.setState({ internalValue: value });
      if (this.props.onChange && !isEqual(value, this.props.value)) {
        this.props.onChange(value, this.editor);
      }
    });
  }

  multiDecorator([node, path]) {
    // Decorations (such as higlighting node types, selection, etc).
    const { runtimeDecorators = [] } = this.slateSettings;
    return runtimeDecorators.reduce(
      (acc, deco) => deco(this.state.editor, [node, path], acc),
      [],
    );
  }

  componentDidMount() {
    // watch the dom change

    if (this.props.selected) {
      let focused = true;
      try {
        focused = ReactEditor.isFocused(this.state.editor);
      } catch {}
      if (!focused) {
        setTimeout(() => {
          try {
            ReactEditor.focus(this.state.editor);
          } catch {}
        }, 100); // flush
      }
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.extensions, this.props.extensions)) {
      this.setState({ editor: this.createEditor() });
      return;
    }

    if (
      this.props.value &&
      !isEqual(this.props.value, this.state.internalValue)
    ) {
      const { editor } = this.state;
      editor.children = this.props.value;

      if (this.props.defaultSelection) {
        const selection = parseDefaultSelection(
          editor,
          this.props.defaultSelection,
        );

        ReactEditor.focus(editor);
        Transforms.select(editor, selection);
      } else {
        Transforms.select(editor, Editor.end(editor, []));
      }

      this.setState({
        internalValue: this.props.value,
      });
      return;
    }

    const { editor } = this.state;

    if (!prevProps.selected && this.props.selected) {
      // if the SlateEditor becomes selected from unselected

      if (window.getSelection().type === 'None') {
        // TODO: why is this condition checked?
        Transforms.select(
          this.state.editor,
          Editor.range(this.state.editor, Editor.start(this.state.editor, [])),
        );
      }

      ReactEditor.focus(this.state.editor);
    }

    if (this.props.selected && this.props.onUpdate) {
      this.props.onUpdate(editor);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { selected = true, value, readOnly } = nextProps;
    const res =
      selected ||
      this.props.selected !== selected ||
      this.props.readOnly !== readOnly ||
      !isEqual(value, this.props.value);
    return res;
  }

  render() {
    const {
      selected,
      placeholder,
      onKeyDown,
      testingEditorRef,
      readOnly,
      className,
      renderExtensions = [],
      editableProps = {},
    } = this.props;
    const slateSettings = this.slateSettings;

    // renderExtensions is needed because the editor is memoized, so if these
    // extensions need an updated state (for example to insert updated
    // blockProps) then we need to always wrap the editor with them
    const editor = renderExtensions.reduce(
      (acc, apply) => apply(acc),
      this.state.editor,
    );

    // Reset selection if field is reset
    if (
      editor.selection &&
      this.props.value?.length === 1 &&
      this.props.value[0].children.length === 1 &&
      this.props.value[0].children[0].text === ''
    ) {
      Transforms.select(editor, {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      });
    }
    this.editor = editor;

    if (testingEditorRef) {
      testingEditorRef.current = editor;
    }

    // debug-values are `data-` HTML attributes in withTestingFeatures HOC

    return (
      <div
        {...this.props['debug-values']}
        className={cx('slate-editor', {
          'show-toolbar': this.state.showExpandedToolbar,
          selected,
        })}
        tabIndex={-1}
      >
        <EditorContext.Provider value={editor}>
          <Slate
            editor={editor}
            value={this.props.value || slateSettings.defaultValue()}
            onChange={this.handleChange}
          >
            {selected ? (
              <>
                <InlineToolbar
                  editor={editor}
                  className={className}
                  slateSettings={this.props.slateSettings}
                />
                {Object.keys(slateSettings.elementToolbarButtons).map(
                  (t, i) => {
                    return (
                      <Toolbar elementType={t} key={i}>
                        {slateSettings.elementToolbarButtons[t].map(
                          (Btn, b) => {
                            return <Btn editor={editor} key={b} />;
                          },
                        )}
                      </Toolbar>
                    );
                  },
                )}
              </>
            ) : (
              ''
            )}
            <Editable
              tabIndex={this.props.tabIndex || 0}
              readOnly={readOnly}
              placeholder={placeholder}
              renderElement={(props) => <Element {...props} />}
              renderLeaf={(props) => <Leaf {...props} />}
              decorate={this.multiDecorator}
              spellCheck={false}
              scrollSelectionIntoView={
                slateSettings.scrollIntoView ? undefined : () => null
              }
              onBlur={() => {
                this.props.onBlur && this.props.onBlur();
                return null;
              }}
              onClick={this.props.onClick}
              onSelect={(e) => {
                if (!selected && this.props.onFocus) {
                  // we can't overwrite the onFocus of Editable, as the onFocus
                  // in Slate has too much builtin behaviour that's not
                  // accessible otherwise. Instead we try to detect such an
                  // event based on observing selected state
                  if (!editor.selection) {
                    setTimeout(() => {
                      this.props.onFocus();
                    }, 100); // TODO: why 100 is chosen here?
                  }
                }

                if (this.selectionTimeout) clearTimeout(this.selectionTimeout);
                this.selectionTimeout = setTimeout(() => {
                  if (
                    editor.selection &&
                    !isEqual(editor.selection, this.savedSelection) &&
                    !this.isUnmounted
                  ) {
                    this.setState((state) => ({ update: !this.state.update }));
                    this.setSavedSelection(
                      JSON.parse(JSON.stringify(editor.selection)),
                    );
                  }
                }, 200);
              }}
              onKeyDown={(event) => {
                const handled = handleHotKeys(editor, event, slateSettings);
                if (handled) return;
                onKeyDown && onKeyDown({ editor, event });
              }}
              {...editableProps}
            />
            {selected &&
              slateSettings.persistentHelpers.map((Helper, i) => {
                return <Helper key={i} editor={editor} />;
              })}
            {this.props.debug ? (
              <ul>
                <li>{selected ? 'selected' : 'no-selected'}</li>
                <li>
                  savedSelection: {JSON.stringify(editor.getSavedSelection())}
                </li>
                <li>live selection: {JSON.stringify(editor.selection)}</li>
                <li>children: {JSON.stringify(editor.children)}</li>
                <li> {selected ? 'selected' : 'notselected'}</li>
                <li>
                  {ReactEditor.isFocused(editor) ? 'focused' : 'unfocused'}
                </li>
              </ul>
            ) : (
              ''
            )}
            {this.props.children}
          </Slate>
        </EditorContext.Provider>
      </div>
    );
  }
}

SlateEditor.defaultProps = {
  extensions: [],
  className: '',
};

// May be needed to wrap in React.memo(), it used to be wrapped in connect()
export default __CLIENT__ && window?.Cypress
  ? withTestingFeatures(SlateEditor)
  : SlateEditor;
