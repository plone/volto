import { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import {
  Button,
  Modal,
  Table,
  Input,
  Dimmer,
  Progress,
} from 'semantic-ui-react';
import cx from 'classnames';
import filesize from 'filesize';
import { readAsDataURL } from 'promise-file-reader';

import { createContent } from '@plone/volto/actions/content/content';
import { usePrevious } from '@plone/volto/helpers/Utils/usePrevious';
import { validateFileUploadSize } from '@plone/volto/helpers/FormValidation/FormValidation';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import uploadSVG from '@plone/volto/icons/upload.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import FormattedRelativeDate from '@plone/volto/components/theme/FormattedDate/FormattedRelativeDate';
import Image from '@plone/volto/components/theme/Image/Image';

const SUBREQUEST = 'batch-upload';

const messages = defineMessages({
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  upload: {
    id: '{count, plural, one {Upload {count} file} other {Upload {count} files}}',
    defaultMessage:
      '{count, plural, one {Upload {count} file} other {Upload {count} files}}',
  },
  filesUploaded: {
    id: 'Files uploaded: {uploadedFiles}',
    defaultMessage: 'Files uploaded: {uploadedFiles}',
  },
  dropFiles: {
    id: 'Drop files here to upload',
    defaultMessage: 'Drop files here to upload',
  },
  releaseToAdd: {
    id: 'Release to add file(s) to this folder',
    defaultMessage: 'Release to add file(s) to this folder',
  },
  totalFilesToUpload: {
    id: 'Total files to upload: {totalFiles}',
    defaultMessage: 'Total files to upload: {totalFiles}',
  },
  uploadFiles: {
    id: 'Upload Files ({count})',
    defaultMessage: 'Upload Files ({count})',
  },
});

const DropZoneContent = (props) => {
  const { onOk, onCancel, pathname, children } = props;
  const [isDragOver, setIsDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);

  const intl = useIntl();
  const dispatch = useDispatch();

  const request = useSelector(
    (state) => state.content.subrequests?.[SUBREQUEST] || {},
    shallowEqual,
  );

  const uploadedFiles = useSelector((state) => state.content.uploadedFiles);
  const prevrequestloading = usePrevious(request.loading);

  useEffect(() => {
    if (prevrequestloading && request.loaded) {
      onOk();
      setDroppedFiles([]);
    }
  }, [prevrequestloading, request.loaded, onOk]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = async (e) => {
    setIsDragOver(false);
    const newFiles = Array.from(e.dataTransfer.files);
    const validFiles = [];
    for (let i = 0; i < newFiles.length; i++) {
      if (validateFileUploadSize(newFiles[i], intl.formatMessage)) {
        await readAsDataURL(newFiles[i]).then((data) => {
          const fields = data.match(/^data:(.*);(.*),(.*)$/);
          newFiles[i].preview = fields[0];
        });
        validFiles.push(newFiles[i]);
      }
    }
    setDroppedFiles((prev) => prev.concat(validFiles));
    setTotalFiles((prev) => prev + validFiles.length);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onCancel();
    setDroppedFiles([]);
    setTotalFiles(0);
  };

  const onSubmit = () => {
    Promise.all(droppedFiles.map((file) => readAsDataURL(file))).then(
      (dataUrls) => {
        dispatch(
          createContent(
            pathname,
            droppedFiles.map((file, index) => {
              const fields = dataUrls[index].match(/^data:(.*);(.*),(.*)$/);
              const image = fields[1].split('/')[0] === 'image';
              return {
                '@type': image ? 'Image' : 'File',
                title: file.name,
                [image ? 'image' : 'file']: {
                  data: fields[3],
                  encoding: fields[2],
                  'content-type': fields[1],
                  filename: file.name,
                },
              };
            }),
            SUBREQUEST,
          ),
        );
      },
    );
    handleCloseModal();
  };
  const onRemoveFile = (index) => {
    const updatedFiles = droppedFiles.filter((file, i) => i !== index);
    setDroppedFiles(updatedFiles);
    setTotalFiles(updatedFiles.length);
  };

  const onChangeFileName = (e, index) => {
    let copyOfFiles = [...droppedFiles];
    let originalFile = droppedFiles[index];
    let newFile = new File([originalFile], e.target.value, {
      type: originalFile.type,
    });

    newFile.preview = originalFile.preview;
    newFile.path = e.target.value;
    copyOfFiles[index] = newFile;
    setDroppedFiles(copyOfFiles);
  };

  return (
    <>
      <div
        className={cx('contents-dropzone', {
          'drag-over': isDragOver,
          'drag-inactive': !isDragOver,
        })}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={onDrop}
      >
        {children}
        {isDragOver && (
          <div className="dropzone-overlay">
            <div className="dropzone-content">
              <Icon name={uploadSVG} size="48px" />
              <h3>{intl.formatMessage(messages.dropFiles)}</h3>
              <p>{intl.formatMessage(messages.releaseToAdd)}</p>
            </div>
          </div>
        )}
      </div>
      <Modal
        open={totalFiles > 0 && showModal}
        onClose={handleCloseModal}
        className="contents-upload-modal"
      >
        <Modal.Header>
          {intl.formatMessage(messages.uploadFiles, {
            count: droppedFiles.length,
          })}
        </Modal.Header>
        <Dimmer active={request.loading}>
          <div className="progress-container">
            <Progress
              className="progress-bar"
              value={uploadedFiles}
              total={totalFiles}
            >
              {intl.formatMessage(messages.filesUploaded, {
                uploadedFiles,
              })}
              <br />
              {intl.formatMessage(messages.totalFilesToUpload, {
                totalFiles,
              })}
            </Progress>
          </div>
        </Dimmer>
        <Modal.Content>
          {droppedFiles.length > 0 && (
            <Table compact singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={8}>
                    <FormattedMessage id="Filename" defaultMessage="Filename" />
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    <FormattedMessage
                      id="Last modified"
                      defaultMessage="Last modified"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    <FormattedMessage
                      id="File size"
                      defaultMessage="File size"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    <FormattedMessage id="Preview" defaultMessage="Preview" />
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {droppedFiles.map((file, index) => (
                  <Table.Row className="upload-row" key={index}>
                    <Table.Cell>
                      <Input
                        className="file-name"
                        value={file.name}
                        onChange={(e) => onChangeFileName(e, index)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {file.lastModifiedDate && (
                        <FormattedRelativeDate date={file.lastModifiedDate} />
                      )}
                    </Table.Cell>
                    <Table.Cell>{filesize(file.size, { round: 0 })}</Table.Cell>
                    <Table.Cell>
                      {file.type.split('/')[0] === 'image' && (
                        <Image
                          src={file.preview}
                          height={60}
                          className="ui image"
                        />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Icon
                        name={clearSVG}
                        size="24px"
                        onClick={() => onRemoveFile(index)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Modal.Content>
        <Modal.Actions>
          {droppedFiles.length > 0 && (
            <Button
              basic
              circular
              primary
              floated="right"
              icon="arrow right"
              aria-label={intl.formatMessage(messages.upload, {
                count: droppedFiles.length,
              })}
              onClick={onSubmit}
              title={intl.formatMessage(messages.upload, {
                count: droppedFiles.length,
              })}
              size="big"
            />
          )}
          <Button
            basic
            circular
            secondary
            icon="remove"
            aria-label={intl.formatMessage(messages.cancel)}
            title={intl.formatMessage(messages.cancel)}
            floated="right"
            size="big"
            onClick={handleCloseModal}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DropZoneContent;
