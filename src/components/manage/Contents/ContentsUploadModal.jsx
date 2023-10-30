import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Loader,
  Modal,
  Table,
  Segment,
} from 'semantic-ui-react';
import loadable from '@loadable/component';
import { concat, filter, map } from 'lodash';
import filesize from 'filesize';
import { readAsDataURL } from 'promise-file-reader';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { FormattedRelativeDate } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import { validateFileUploadSize, usePrevious } from '@plone/volto/helpers';

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
});

const SUBREQUEST = 'batch-upload';

const ContentsUploadModal = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const request = useSelector(
    (state) => state.content.subrequests?.[SUBREQUEST] || {},
    shallowEqual,
  );

  const prevrequestloading = usePrevious(request.loading);
  const [Files, setFiles] = useState([]);
  const { onOk } = props;
  useEffect(() => {
    if (prevrequestloading && request.loaded) {
      onOk();
      setFiles([]);
    }
  }, [prevrequestloading, request.loaded, onOk]);

  const onRemoveFile = (event) => {
    setFiles(
      filter(
        Files,
        (file, index) =>
          index !== parseInt(event.target.getAttribute('value'), 10),
      ),
    );
  };

  const onDrop = async (files) => {
    const validFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (validateFileUploadSize(files[i], intl.formatMessage)) {
        await readAsDataURL(files[i]).then((data) => {
          const fields = data.match(/^data:(.*);(.*),(.*)$/);
          files[i].preview = fields[0];
        });
        validFiles.push(files[i]);
      }
    }
    setFiles(concat(Files, validFiles));
  };

  const onCancel = () => {
    props.onCancel();
    setFiles([]);
  };

  const onSubmit = () => {
    Promise.all(map(Files, (file) => readAsDataURL(file))).then((files) => {
      dispatch(
        createContent(
          props.pathname,
          map(Files, (file, index) => {
            const fields = files[index].match(/^data:(.*);(.*),(.*)$/);
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
    });
  };

  return (
    props.open && (
      <Modal open={props.open}>
        <Header>
          <FormattedMessage id="Upload files" defaultMessage="Upload files" />
        </Header>
        <Dimmer active={request.loading}>
          <Loader>
            <FormattedMessage
              id="Uploading files"
              defaultMessage="Uploading files"
            />
          </Loader>
        </Dimmer>
        <Modal.Content>
          <Dropzone
            onDrop={onDrop}
            className="dropzone"
            noDragEventsBubbling={true}
            multiple={true}
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
          {Files.length > 0 && (
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
                {map(Files, (file, index) => (
                  <Table.Row className="upload-row" key={file.name}>
                    <Table.Cell>{file.name}</Table.Cell>
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
                      <Icon
                        name="close"
                        value={index}
                        link
                        onClick={onRemoveFile}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Modal.Content>
        <Modal.Actions>
          {Files.length > 0 && (
            <Button
              basic
              circular
              primary
              floated="right"
              icon="arrow right"
              aria-label={intl.formatMessage(messages.upload, {
                count: Files.length,
              })}
              onClick={onSubmit}
              title={intl.formatMessage(messages.upload, {
                count: Files.length,
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
            onClick={onCancel}
          />
        </Modal.Actions>
      </Modal>
    )
  );
};

ContentsUploadModal.propTypes = {
  pathname: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ContentsUploadModal;
