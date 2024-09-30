import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Toast } from '@plone/components';
import { usePloneClient } from '@plone/providers';
import { useContentsContext } from '../providers/contents';
import { useCopyOrCut } from './useCopyOrCut';

export function usePaste(path: string) {
  const { copyMutation, moveMutation } = usePloneClient();
  const { intl, toast } = useContentsContext();
  const [copyOrCut] = useCopyOrCut();

  const { mutate: copyItems, isPending: copyIsPending } =
    useMutation(copyMutation());
  const { mutate: moveItems, isPending: moveIsPending } =
    useMutation(moveMutation());

  function successCallback() {
    toast.success(
      <Toast
        success
        title={intl.formatMessage({ id: 'Success' })}
        content={intl.formatMessage({ id: 'Item(s) pasted.' })}
      />,
    );
  }

  function paste(options?: { onSuccess?: () => void }) {
    if (copyOrCut.op === 'copy') {
      copyItems(
        {
          path,
          data: { source: copyOrCut.data },
        },
        {
          onSuccess: () => {
            successCallback();
            options?.onSuccess?.();
          },
        },
      );
    }
    if (copyOrCut.op === 'cut') {
      moveItems(
        {
          path,
          data: { source: copyOrCut.data },
        },
        {
          onSuccess: () => {
            successCallback();
            options?.onSuccess?.();
          },
        },
      );
    }
  }

  return {
    paste,
    isPending: copyIsPending || moveIsPending,
  };
}
