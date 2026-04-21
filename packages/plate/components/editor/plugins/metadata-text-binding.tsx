import { useEffect, useMemo, useRef } from 'react';
import { atom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusedAtom } from '@plone/helpers';
import config from '@plone/registry';
import {
  useEditorRef,
  useEditorSelector,
  type TPlateEditor,
} from 'platejs/react';

type BindingState = {
  isActive: boolean;
  value: string | null;
};

type SyncAction = 'editor-to-field' | 'field-to-editor' | 'none';

type GetSyncActionArgs = {
  editorValue: string | null;
  fieldValue: string;
  isEditorActive: boolean;
  lastAppliedFromEditor: string | null;
  lastAppliedFromField: string | null;
};

type MetadataTextBinding = {
  field: string;
  getState: (editor: TPlateEditor) => BindingState;
  writeToEditor: (editor: TPlateEditor, value: string) => void;
};

const fallbackFormAtom = atom<Record<string, unknown>>({});

export function getMetadataTextSyncAction({
  editorValue,
  fieldValue,
  isEditorActive,
  lastAppliedFromEditor,
  lastAppliedFromField,
}: GetSyncActionArgs): SyncAction {
  if (editorValue === null) return 'none';
  if (editorValue === fieldValue) return 'none';
  if (lastAppliedFromField !== null && editorValue === lastAppliedFromField) {
    return 'none';
  }
  if (lastAppliedFromEditor !== null && fieldValue === lastAppliedFromEditor) {
    return 'none';
  }

  return isEditorActive ? 'editor-to-field' : 'field-to-editor';
}

export function useMetadataTextBinding(binding: MetadataTextBinding) {
  const editor = useEditorRef();
  const lastAppliedFromEditorRef = useRef<string | null>(null);
  const lastAppliedFromFieldRef = useRef<string | null>(null);
  const formAtom = useMemo(() => {
    try {
      return config
        .getUtility({
          name: 'formAtom',
          type: 'atom',
        })
        ?.method?.() as PrimitiveAtom<Record<string, unknown>> | undefined;
    } catch {
      return undefined;
    }
  }, []);
  const [fieldValue, setFieldValue] = useFieldFocusedAtom(
    formAtom ?? fallbackFormAtom,
    binding.field as never,
  );
  const state = useEditorSelector(
    (currentEditor) => binding.getState(currentEditor as TPlateEditor),
    [binding],
  );

  const hasFormAtom = !!formAtom;
  const normalizedFieldValue = typeof fieldValue === 'string' ? fieldValue : '';

  useEffect(() => {
    if (!hasFormAtom) {
      lastAppliedFromEditorRef.current = null;
      lastAppliedFromFieldRef.current = null;
      return;
    }

    if (
      lastAppliedFromEditorRef.current !== null &&
      normalizedFieldValue === lastAppliedFromEditorRef.current
    ) {
      lastAppliedFromEditorRef.current = null;
    }

    if (
      lastAppliedFromFieldRef.current !== null &&
      state.value === lastAppliedFromFieldRef.current
    ) {
      lastAppliedFromFieldRef.current = null;
    }

    const action = getMetadataTextSyncAction({
      editorValue: state.value,
      fieldValue: normalizedFieldValue,
      isEditorActive: state.isActive,
      lastAppliedFromEditor: lastAppliedFromEditorRef.current,
      lastAppliedFromField: lastAppliedFromFieldRef.current,
    });

    if (action === 'editor-to-field' && state.value !== null) {
      lastAppliedFromEditorRef.current = state.value;
      setFieldValue(state.value);
      return;
    }

    if (action === 'field-to-editor') {
      lastAppliedFromFieldRef.current = normalizedFieldValue;
      binding.writeToEditor(editor as TPlateEditor, normalizedFieldValue);
    }
  }, [
    binding,
    editor,
    hasFormAtom,
    normalizedFieldValue,
    setFieldValue,
    state.isActive,
    state.value,
  ]);
}
