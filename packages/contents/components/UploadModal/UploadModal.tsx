import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import { Heading, FileTrigger } from 'react-aria-components';
import { type FileDropItem, useDateFormatter } from 'react-aria';
import { useTranslation, Trans } from 'react-i18next';
import {
  Button,
  Dialog,
  DropZone,
  DropZoneText,
  Input,
  Modal,
} from '@plone/components/quanta';
import {
  BinIcon,
  CloseIcon,
  PageIcon,
  UploadIcon,
} from '@plone/components/Icons';
import { type ToastItem } from '@plone/layout/config/toast';
import { useContentsContext } from '../../providers/contents';

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exp = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / Math.pow(1024, exp);
  return `${exp === 0 ? value : value.toFixed(1)} ${units[exp]}`;
}

export default function UploadModal() {
  const { t } = useTranslation();
  const {
    showUpload,
    setShowUpload,
    contentTitle,
    contentPath,
    showToast,
    pendingDropFiles: entries,
    setPendingDropFiles: setEntries,
  } = useContentsContext();
  const fetcher = useFetcher();
  const longFormatter = useDateFormatter({
    dateStyle: 'full',
    timeStyle: 'full',
  });
  const shortFormatter = useDateFormatter({
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const addFiles = (newFiles: File[]) => {
    const existingNames = new Set(entries.map((e) => e.file.name));
    const unique = newFiles
      .filter((f) => !existingNames.has(f.name))
      .map((f) => ({
        file: f,
        title: f.name,
      }));
    setEntries([...entries, ...unique]);
  };

  const removeFile = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateTitle = (index: number, title: string) => {
    setEntries(entries.map((e, i) => (i === index ? { ...e, title } : e)));
  };

  useEffect(() => {
    if (fetcher.state === 'idle') {
      const responseData = fetcher.data;
      if (responseData?.ok?.length > 0) {
        const toast: ToastItem = { title: '', icon: <UploadIcon /> };
        if (responseData.ok.length === 1) {
          toast.title = t('contents.actions.uploaded', {
            title: responseData.ok[0].title,
          });
        } else {
          toast.title = t('contents.actions.uploaded_multiple', {
            number: responseData.ok.length,
          });
        }
        showToast(toast);
      }
      if (responseData?.errors?.length > 0) {
        responseData.errors.forEach((e: any) => {
          const toast: ToastItem = {
            title: `${t('contents.error')} ${e.__error?.status} - ${e.__error?.data?.type}`,
            description: e.__error?.data?.message,
            icon: <UploadIcon />,
            className: 'error',
          };
          showToast(toast);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.state]);

  if (!showUpload) return null;

  const close = () => {
    setEntries([]);
    setShowUpload(false);
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const confirm = async () => {
    const encodedFiles = await Promise.all(
      entries.map(async ({ file, title }) => ({
        name: file.name,
        type: file.type || 'application/octet-stream',
        data: await fileToBase64(file),
        title,
      })),
    );
    fetcher.submit(
      { path: contentPath, files: encodedFiles },
      {
        method: 'POST',
        encType: 'application/json',
        action: '/@@contents/@@upload',
      },
    );
    close();
  };

  return (
    <Modal isDismissable isOpen={showUpload} onOpenChange={setShowUpload}>
      <Dialog className="mx-auto w-full p-8">
        <Heading
          slot="title"
          className="react-aria-Heading mb-6 text-xl font-bold"
        >
          {t('contents.modal_upload.title', { title: contentTitle })}
        </Heading>
        <div className="mx-auto max-w-2xl">
          {entries.length > 0 && (
            <table className="mb-6 w-full border-collapse text-sm">
              <thead>
                <tr className="text-quanta-graphite border-b border-quanta-silver text-left">
                  <th className="pb-2 font-normal">
                    {t('contents.modal_upload.columns.name')}
                  </th>
                  <th className="pb-2 font-normal">
                    {t('contents.modal_upload.columns.size')}
                  </th>
                  <th className="pb-2 font-normal">
                    {t('contents.modal_upload.columns.last_modified')}
                  </th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="border-b border-quanta-silver">
                    <td className="flex items-center gap-2 py-3">
                      {entry.file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(entry.file)}
                          alt={entry.file.name}
                          className="h-8 w-8 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                          <PageIcon size="sm" />
                        </div>
                      )}
                      <Input
                        type="text"
                        name="title"
                        value={entry.title}
                        onChange={(e) => updateTitle(index, e.target.value)}
                        className="me-2 flex-1"
                        aria-label={`${t('contents.modal_upload.columns.name')}: ${entry.file.name}`}
                      />
                    </td>
                    <td className="py-3">{formatBytes(entry.file.size)}</td>
                    <td className="py-3">
                      {(() => {
                        const date = new Date(entry.file.lastModified);
                        return (
                          <time
                            dateTime={date.toISOString()}
                            title={longFormatter.format(date)}
                          >
                            {shortFormatter.format(date)}
                          </time>
                        );
                      })()}
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        type="button"
                        variant="destructive"
                        onPress={() => removeFile(index)}
                        aria-label={t('contents.modal_upload.remove_file')}
                      >
                        <BinIcon size="sm" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <DropZone
            className="flex-col"
            getDropOperation={() => 'copy'}
            onDrop={async (e) => {
              const fileItems = e.items.filter(
                (item): item is FileDropItem => item.kind === 'file',
              );
              // TODO catch errors, use a toast to tell the user which files had errors
              const dropped = await Promise.all(
                fileItems.map((item) => item.getFile()),
              );
              addFiles(dropped);
            }}
          >
            <div
              className={`
                flex h-30 w-30 items-center justify-center rounded-full bg-quanta-tiffany
                text-quanta-puya
              `}
            >
              <UploadIcon size="3xl" />
            </div>
            <p className="my-1 text-xl font-bold">
              {entries.length > 0
                ? t('contents.modal_upload.upload_more_files')
                : t('contents.modal_upload.upload_files')}
            </p>
            <DropZoneText slot="label">
              <Trans i18nKey="contents.modal_upload.dropzone_label">
                Drag and drop or
                <FileTrigger
                  allowsMultiple
                  onSelect={(fileList) => {
                    if (fileList) addFiles([...fileList]);
                  }}
                >
                  <Button
                    type="button"
                    className={`
                      border-0 bg-transparent p-0 text-quanta-sapphire underline decoration-current
                      decoration-1
                      hover:bg-transparent hover:text-quanta-royal hover:shadow-none
                      focus:bg-transparent focus:shadow-none
                      active:bg-transparent active:shadow-none
                      pressed:bg-transparent pressed:shadow-none
                    `}
                  >
                    Browse
                  </Button>
                </FileTrigger>
              </Trans>
            </DropZoneText>
          </DropZone>

          <div className="mt-8 flex justify-center gap-3">
            <Button
              onPress={close}
              aria-label={t('contents.modal.close')}
              accent={true}
              size="L"
            >
              <CloseIcon />
            </Button>
            <Button
              onPress={confirm}
              aria-label={t('contents.modal_upload.confirm')}
              variant="primary"
              accent={true}
              size="L"
              isDisabled={entries.length === 0 || fetcher.state !== 'idle'}
            >
              <UploadIcon />
            </Button>
          </div>
        </div>
      </Dialog>
    </Modal>
  );
}
