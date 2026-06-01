import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadIcon } from '@plone/components/Icons';
import { useContentsContext } from '../../providers/contents';

interface ContentsDropZoneProps {
  children: React.ReactNode;
}

/**
 * Wraps its children in a full-area file drop zone.
 *
 * Uses capture-phase event handlers so that file drags are intercepted before
 * React Aria's table DnD system can call stopPropagation and swallow them.
 * Non-file drags (e.g. row reordering) are ignored and left for child handlers.
 */
export function ContentsDropZone({ children }: ContentsDropZoneProps) {
  const { t } = useTranslation();
  const { setShowUpload, setPendingDropFiles } = useContentsContext();
  const [isFileDragOver, setIsFileDragOver] = useState(false);
  const dragCountRef = useRef(0);

  const isFileDrag = (e: React.DragEvent) =>
    e.dataTransfer.types.includes('Files');

  return (
    <div
      className="relative"
      onDragEnterCapture={(e) => {
        if (!isFileDrag(e)) return;
        e.stopPropagation();
        dragCountRef.current++;
        setIsFileDragOver(true);
      }}
      onDragLeaveCapture={(e) => {
        if (!isFileDrag(e)) return;
        e.stopPropagation();
        dragCountRef.current--;
        if (dragCountRef.current <= 0) {
          dragCountRef.current = 0;
          setIsFileDragOver(false);
        }
      }}
      onDragOverCapture={(e) => {
        if (!isFileDrag(e)) return;
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
      }}
      onDropCapture={(e) => {
        if (!isFileDrag(e)) return;
        e.preventDefault();
        e.stopPropagation();
        dragCountRef.current = 0;
        setIsFileDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
          setPendingDropFiles(
            files.map((f) => ({
              file: f,
              title: f.name,
            })),
          );
          setShowUpload(true);
        }
      }}
    >
      {isFileDragOver && (
        <div
          className={`
            pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center
            gap-4 rounded-md bg-quanta-tiffany/60 text-quanta-puya outline-2 -outline-offset-4
            outline-quanta-cobalt
          `}
        >
          <div
            className={`
              flex h-24 w-24 items-center justify-center rounded-full bg-quanta-tiffany
              text-quanta-puya
            `}
          >
            <UploadIcon size="3xl" />
          </div>
          <p className="text-xl font-bold">
            {t('contents.modal_upload.upload_files')}
          </p>
        </div>
      )}
      {children}
    </div>
  );
}
