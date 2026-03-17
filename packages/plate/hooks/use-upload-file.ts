import * as React from 'react';

import { toast } from 'sonner';
import { z } from 'zod';

export type UploadedFile = {
  appUrl?: string;
  key: string;
  name: string;
  size: number;
  type: string;
  url: string;
};

interface UseUploadFileProps {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

export function useUploadFile({
  onUploadComplete,
  onUploadError,
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadToPlone(file: File) {
    setIsUploading(true);
    setUploadingFile(file);
    setProgress(10);

    try {
      const payload = await buildCreateContentPayload(file);
      const contentPath = getCurrentContentPath();
      const endpoint =
        contentPath === '/'
          ? '/@createContent'
          : `/@createContent${contentPath}`;

      setProgress(40);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          data: payload.data,
        }),
      });

      if (!response.ok) {
        const errorPayload = await parseJsonSafe(response);
        throw new Error(
          getServerErrorMessage(errorPayload) ??
            `Upload failed with status ${response.status}`,
        );
      }

      const createdItem = await response.json();

      setProgress(90);

      const uploaded = createUploadedFile(file, createdItem);

      setUploadedFile(uploaded);
      onUploadComplete?.(uploaded);
      setProgress(100);

      return uploaded;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(
        errorMessage.length > 0
          ? errorMessage
          : 'Something went wrong, please try again later.',
      );

      onUploadError?.(error);
      return undefined;
    } finally {
      setProgress(0);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadToPlone,
    uploadingFile,
  };
}

async function buildCreateContentPayload(file: File) {
  const binaryFieldName = isImageFile(file) ? 'image' : 'file';
  const contentType = binaryFieldName === 'image' ? 'Image' : 'File';
  const encoded = await readFileAsDataURL(file);
  const fields = encoded.match(/^data:(.*);(.*),(.*)$/);

  if (!fields) {
    throw new Error('Could not read file data');
  }

  return {
    data: {
      '@type': contentType,
      title: file.name,
      [binaryFieldName]: {
        data: fields[3],
        encoding: fields[2],
        'content-type': fields[1],
        filename: file.name,
      },
    },
  };
}

function createUploadedFile(
  file: File,
  createdItem: Record<string, unknown>,
): UploadedFile {
  const id = String(createdItem?.['@id'] ?? '');
  const baseId = id.replace(/\/$/, '');
  const isImage = isImageFile(file);
  const url = isImage
    ? `${baseId}/@@images/image`
    : `${baseId}/@@download/file`;

  return {
    appUrl: baseId,
    key: String(createdItem?.UID ?? baseId ?? file.name),
    name: String(createdItem?.title ?? file.name),
    size: file.size,
    type: file.type,
    url,
  };
}

function isImageFile(file: File) {
  if (file.type?.startsWith('image/')) return true;

  const lowerName = file.name.toLowerCase();
  return /\.(png|jpe?g|gif|webp|bmp|svg|avif|tiff?)$/.test(lowerName);
}

async function parseJsonSafe(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getServerErrorMessage(errorPayload: any) {
  if (!errorPayload) return null;

  const message = errorPayload?.message ?? errorPayload?.data?.message;
  if (typeof message === 'string') return message;

  const nested = errorPayload?.error?.message;
  if (typeof nested === 'string') return nested;

  return null;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () =>
      reject(reader.error ?? new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

function getCurrentContentPath() {
  if (typeof window === 'undefined') return '/';

  let path = window.location.pathname || '/';

  path = path.replace(/^\/@@edit(\/|$)/, '/');
  path = path.replace(/\/@@edit(?:\/.*)?$/, '');

  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path || '/';
}

export function getErrorMessage(err: unknown) {
  const unknownError = 'Something went wrong, please try again later.';

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });

    return errors.join('\n');
  } else if (err instanceof Error) {
    return err.message;
  } else {
    return unknownError;
  }
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);

  return toast.error(errorMessage);
}
