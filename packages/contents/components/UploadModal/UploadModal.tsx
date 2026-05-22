import { useState } from 'react';
import { Heading, FileTrigger } from 'react-aria-components';
import { type FileDropItem, useDateFormatter } from 'react-aria';
import { useTranslation, Trans } from 'react-i18next';
import {
  Button,
  Dialog,
  DropZone,
  DropZoneText,
  Modal,
} from '@plone/components/quanta';
import { CloseIcon, PageIcon, UploadIcon } from '@plone/components/Icons';
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
  const { showUpload, setShowUpload, contentTitle } = useContentsContext();
  const [files, setFiles] = useState<File[]>([]);
  const longFormatter = useDateFormatter({
    dateStyle: 'full',
    timeStyle: 'full',
  });
  const shortFormatter = useDateFormatter({
    dateStyle: 'short',
    timeStyle: 'short',
  });

  if (!showUpload) return null;

  const addFiles = (newFiles: File[]) => {
    setFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name));
      const unique = newFiles.filter((f) => !existingNames.has(f.name));
      return [...prev, ...unique];
    });
  };

  const close = () => {
    setFiles([]);
    setShowUpload(false);
  };

  // UI-only stub — actual Plone API call will be added in a follow-up
  const confirm = () => {
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
          {files.length > 0 && (
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
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index} className="border-b border-quanta-silver">
                    <td className="flex items-center gap-2 py-3">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center">
                          <PageIcon size="sm" />
                        </div>
                      )}
                      <span className="text-quanta-sapphire">{file.name}</span>
                    </td>
                    <td className="py-3">{formatBytes(file.size)}</td>
                    <td className="py-3">
                      {(() => {
                        const date = new Date(file.lastModified);
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
              {files.length > 0
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
              isDisabled={files.length === 0}
            >
              <UploadIcon />
            </Button>
          </div>
        </div>
      </Dialog>
    </Modal>
  );
}
