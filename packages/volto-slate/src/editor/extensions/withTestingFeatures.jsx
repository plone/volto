import React, { useMemo } from 'react';
import { ReactEditor } from 'slate-react';
import { omit } from 'lodash-es';

const withTestingFeatures = (WrappedComponent) => {
  return (props) => {
    let ref = React.useRef();

    // Source: https://stackoverflow.com/a/53623568/258462
    const onTestSelectWord = (val) => {
      let slateEditor =
        val.detail.parentElement.parentElement.parentElement.parentElement;

      // Events are special, can't use spread or Object.keys
      let selectEvent = {};
      for (let key in val) {
        if (key === 'currentTarget') {
          selectEvent['currentTarget'] = slateEditor;
        } else if (key === 'type') {
          selectEvent['type'] = 'select';
        } else {
          selectEvent[key] = val[key];
        }
      }

      // Make selection
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(val.detail);
      selection.removeAllRanges();
      selection.addRange(range);

      // Slate monitors DOM selection changes automatically
    };

    const onTestSelectRange = (val) => {
      const newDomRange =
        val && ReactEditor.toDOMRange(window.focusedSlateEditor, val.detail);

      let selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(newDomRange);
    };

    React.useEffect(() => {
      document.addEventListener('Test_SelectWord', onTestSelectWord);
      document.addEventListener('Test_SelectRange', onTestSelectRange);
      return () => {
        document.removeEventListener('Test_SelectWord', onTestSelectWord);
        document.removeEventListener('Test_SelectRange', onTestSelectRange);
      };
    });

    const handleFocus = React.useCallback(() => {
      window.focusedSlateEditor = ref?.current;
      if (props.onFocus) {
        props.onFocus();
      }
    }, [props]);

    const managedProps = useMemo(() => {
      return omit(props, 'onFocus');
    }, [props]);

    return (
      <WrappedComponent
        debug
        debug-values={{
          'data-slate-value': JSON.stringify(props.value, null, 2),
          'data-slate-selection': JSON.stringify(
            ref?.current?.selection,
            null,
            2,
          ),
        }}
        testingEditorRef={ref}
        onFocus={handleFocus}
        {...managedProps}
      />
    );
  };
};

export default withTestingFeatures;
