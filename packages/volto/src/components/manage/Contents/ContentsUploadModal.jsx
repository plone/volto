/**
 * Contents upload modal.
 * @module components/manage/Contents/ContentsUploadModal
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Modal,
  Table,
  Segment,
  Input,
  Progress,
} from 'semantic-ui-react';
import loadable from '@loadable/component';
import { concat, filter, map } from 'lodash';
import filesize from 'filesize';
import { readAsDataURL } from 'promise-file-reader';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { FormattedRelativeDate } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import { validateFileUploadSize } from '@plone/volto/helpers';

const Dropzone = loadable(() => import('react-dropzone'));

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
  totalFilesToUpload: {
    id: 'Total files to upload: {totalFiles}',
    defaultMessage: 'Total files to upload: {totalFiles}',
  },
});

const SUBREQUEST = 'batch-upload';

/**
 * ContentsUploadModal function component.
 * @function ContentsUploadModal
 */
const ContentsUploadModal = (props) => {
  const [files, setFiles] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);

  useEffect(() => {
    if (props.request.loading && props.request.loaded) {
      props.onOk();
      setFiles([]);
    }
  }, [props.request, props.onOk]);

  const onRemoveFile = useCallback(
    (event) => {
      const index = parseInt(event.target.getAttribute('value'), 10);
      setFiles((prevFiles) => filter(prevFiles, (file, i) => i !== index));
      setTotalFiles((prevTotal) => prevTotal - 1);
    },
    [setFiles, setTotalFiles],
  );

  const onDrop = useCallback(
    async (droppedFiles) => {
      const validFiles = [];
      for (let i = 0; i < droppedFiles.length; i++) {
        if (validateFileUploadSize(droppedFiles[i], props.intl.formatMessage)) {
          await readAsDataURL(droppedFiles[i]).then((data) => {
            const fields = data.match(/^data:(.*);(.*),(.*)$/);
            droppedFiles[i].preview = fields[0];
          });
          validFiles.push(droppedFiles[i]);
        }
      }
      setFiles((prevFiles) => concat(prevFiles, validFiles));
      setTotalFiles(validFiles.length);
    },
    [props.intl],
  );

  const onCancel = useCallback(() => {
    props.onCancel();
    setFiles([]);
    setTotalFiles(0);
  }, [props]);

  const onChangeFileName = useCallback(
    (e, index) => {
      const newFileName = e.target.value;
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        const originalFile = prevFiles[index];
        const newFile = new File([originalFile], newFileName, {
          type: originalFile.type,
        });
        newFile.preview = originalFile.preview;
        newFile.path = newFileName;
        updatedFiles[index] = newFile;
        return updatedFiles;
      });
    },
    [setFiles],
  );

  const onSubmit = useCallback(() => {
    Promise.all(map(files, (file) => readAsDataURL(file))).then((filesData) => {
      props.createContent(
        props.pathname,
        map(files, (file, index) => {
          const fields = filesData[index].match(/^data:(.*);(.*),(.*)$/);
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
      );
    });
  }, [files, props]);

  const {
    multiple = true,
    minSize = null,
    maxSize = null,
    accept = null,
    disabled = false,
  } = props;

  const dropzoneOptions = {
    multiple,
    minSize,
    maxSize,
    accept,
    disabled,
  };

  return (
    props.open && (
      <Modal className="contents-upload-modal" open={props.open}>
        <Header>
          <FormattedMessage id="Upload files" defaultMessage="Upload files" />
        </Header>

        <Dimmer active={props.request.loading}>
          <div className="progress-container">
            <Progress
              className="progress-bar"
              value={props.uploadedFiles}
              total={totalFiles}
            >
              {props.intl.formatMessage(messages.filesUploaded, {
                uploadedFiles: props.uploadedFiles,
              })}
              <br />
              {props.intl.formatMessage(messages.totalFilesToUpload, {
                totalFiles: totalFiles,
              })}
            </Progress>
          </div>
        </Dimmer>
        <Modal.Content>
          <Dropzone
            onDrop={onDrop}
            className="dropzone"
            noDragEventsBubbling={true}
            {...dropzoneOptions}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'dashed' })}>
                <Segment>
                  <Table basic="very">
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <FormattedMessage
                            id="Drag and drop files from your computer onto this area or click the “Browse” button."
                            defaultMessage="Drag and drop files from your computer onto this area or click the “Browse” button."
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Button className="ui button primary">
                            <FormattedMessage
                              id="Browse"
                              defaultMessage="Browse"
                            />
                          </Button>
                          <input
                            {...getInputProps({
                              type: 'file',
                              style: { display: 'none' },
                            })}
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Segment>
              </div>
            )}
          </Dropzone>
          {files.length > 0 && (
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
                    <FormattedMessage id="File size" defaultMessage="File size" />
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    <FormattedMessage id="Preview" defaultMessage="Preview" />
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(files, (file, index) => (
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
                        <Image src={file.preview} height={60} />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name="close" value={index} link onClick={onRemoveFile} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Modal.Content>
        <Modal.Actions>
          {files.length > 0 && (
            <Button
              basic
              circular
              primary
              floated="right"
              icon="arrow right"
              aria-label={props.intl.formatMessage(messages.upload, {
                count: files.length,
              })}
              onClick={onSubmit}
              title={props.intl.formatMessage(messages.upload, {
                count: files.length,
              })}
              size="big"
            />
          )}
          <Button
            basic
            circular
            secondary
            icon="remove"
            aria-label={props.intl.formatMessage(messages.cancel)}
            title={props.intl.formatMessage(messages.cancel)}
            floated="right"
            size="big"
            onClick={onCancel}
          />
        </Modal.Actions>
      </Modal>
    )
  );
};

ContentsUploadModal.propTypes = {
  createContent: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  request: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.number,
  multiple: PropTypes.bool,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default compose(
  injectIntl,
  connect(
    (state) => ({
      request: state.content.subrequests?.[SUBREQUEST] || {},
      uploadedFiles: state.content.uploadedFiles,
    }),
    { createContent },
  ),
)(ContentsUploadModal);
