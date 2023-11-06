import { Slate as OrigSlate } from '@slate-react';

// Components
export { Editable, DefaultPlaceholder } from '@slate-react';

export { DefaultElement } from '@slate-react';
export { DefaultLeaf } from '@slate-react';

// Hooks
export { useEditor } from '@slate-react';
export { useSlateStatic } from '@slate-react';
export { useFocused } from '@slate-react';
export { useReadOnly } from '@slate-react';
export { useSelected } from '@slate-react';
export { useSlate, useSlateWithV } from '@slate-react';
export { useSlateSelector } from '@slate-react';
export { useSlateSelection } from '@slate-react';

// Plugin
export { ReactEditor } from '@slate-react';
export { withReact } from '@slate-react';

export const Slate = (props) => {
  const initialValue = props.initialValue || props.value;
  return OrigSlate({ ...props, initialValue });
};
