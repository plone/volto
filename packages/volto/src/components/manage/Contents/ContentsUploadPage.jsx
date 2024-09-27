import {
  Button,
  Container,
  Header,
  Item,
  ItemContent,
  ItemExtra,
  ItemHeader,
  ItemImage,
  ItemMeta,
  Modal,
  Progress,
} from 'semantic-ui-react';
import { Toolbar, Icon } from '@plone/volto/components';

import { useLocation, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { deleteContent } from '@plone/volto/actions';
import { useDispatch } from 'react-redux';

import TusUploady from '@rpldy/tus-uploady';
import {
  useRequestPreSend,
  useBatchAddListener,
  useUploady,
  useItemAbortListener,
  useItemProgressListener,
  useItemStartListener,
  useItemFinishListener,
  useItemErrorListener,
  useAbortAll,
} from '@rpldy/uploady';

import UploadDropZone from '@rpldy/upload-drop-zone';

import exclamationSVG from '@plone/volto/icons/exclamation.svg';
import readySVG from '@plone/volto/icons/ready.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import backSVG from '@plone/volto/icons/back.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import fileSVG from '@plone/volto/icons/file.svg';
import { map, isEmpty } from 'lodash';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  browse: {
    id: 'Browse',
    defaultMessage: 'Browse',
  },
  uploaded: {
    id: 'Uploaded',
    defaultMessage: 'Uploaded',
  },
  lastModified: {
    id: 'Last modified:',
    defaultMessage: 'Last modified:',
  },
  complete: {
    id: 'Complete',
    defaultMessage: 'Complete',
  },
  errorMessage: {
    id: 'There was an error',
    defaultMessage: 'There was an error',
  },
  dragAndDrop: {
    id: 'Drag and Drop or',
    defaultMessage: 'Drag and Drop or',
  },
  noUploads: {
    id: 'No files uploaded yet!',
    defaultMessage: 'No files uploaded yet!',
  },
  uploadContext: {
    id: 'Uploading to {uploadFolder}',
    defaultMessage: 'Uploading to {uploadFolder}',
  },
  uploadMore: {
    id: 'Upload more files',
    defaultMessage: 'Upload more files',
  },
  startUpload: {
    id: 'Start Upload',
    defaultMessage: 'Start Upload',
  },
  abortMessage: {
    id: 'Are you sure you want to abort the remaining file uploads?',
    defaultMessage:
      'Are you sure you want to abort the remaining file uploads?',
  },
});

function ContentsUploadPage() {
  const intl = useIntl();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const pathname = location.pathname;
  const uploadFolder =
    pathname === '/uploads' ? 'Home' : pathname.split('/').reverse()[1];

  const pendingUploads = useRef(0);
  const uploadPropsRef = useRef();

  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [uploadItems, setUploadItems] = useState({});

  const Uploader = TusUploady;

  /**
   * A friendly format to view data size
   * @method friendlyFormat
   * @param {number} bytes - the nummber of bytes
   * @returns {string}
   */
  const friendlyFormat = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    const kiloBytes = bytes / 1024;
    if (kiloBytes < 1024) return `${kiloBytes.toFixed(2)} KB`;
    const megaBytes = kiloBytes / 1024;
    if (megaBytes < 1024) return `${megaBytes.toFixed(2)} MB`;
    const gigaBytes = megaBytes / 1024;
    if (gigaBytes < 1024) return `${gigaBytes.toFixed(2)}GB`;
  };

  /**
   * Format data to a readable manner
   * @method formatDate
   * @param {string} dateValue - the value of date
   * @returns {string}
   */
  const formatDate = (dateValue) => {
    const date = new Date(dateValue);

    const day = date.getDate();
    const month = date.toLocaleDateString('default', { month: 'short' });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  /**
   * calculate upload speed and time left
   * @method getSpeednTime
   * @param {string} startTime - start time of the upload of a file (milliseconds)
   * @param {number} loaded  - the number of bytes loaded in a file
   * @param {number} total  - the total nunber of bytes in a file
   * @returns {{uploadSpeed: number, timeLeft: number}}
   */
  const getSpeednTime = (startTime, loaded, total) => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // convert ms to seconds
    const uploadSpeed = loaded / elapsedTime; // bytes per second

    if (uploadSpeed === 0) {
      return { uploadSpeed, timeLeft: 0 };
    }

    const remainingBytes = total - loaded;
    const timeLeft = Math.round(remainingBytes / uploadSpeed); // seconds
    return { uploadSpeed, timeLeft };
  };

  /**
   * Truncate file name handler
   * @method truncateFile
   * @param {string}
   * @returns {string}
   */
  const truncateFile = (filename) => {
    const file = filename.split('.');
    return file[0].slice(0, 20) + '.' + file[file.length - 1];
  };

  /**
   * formatting timeleft to seconds, minutes and hours.
   * @method formatTimeLeft
   * @param {number} timeLeft - time left before upload is complete (in seconds)
   * @returns {string}
   */
  const formatTimeLeft = (timeLeft) => {
    if (timeLeft < 60) return `${Math.round(timeLeft)}s`;

    const timeInMins = Math.round(timeLeft / 60);
    const secondsLeft = Math.floor(timeLeft % 60);

    if (Number(timeInMins) < 60) return `${timeInMins}min ${secondsLeft}s`;

    const timeInhour = Math.round(timeLeft / 3600);
    const minLeft = Math.floor((timeLeft % 3600) / 60);
    return `${timeInhour}hr ${minLeft}min`;
  };

  const handleCancel = () => {
    if (pendingUploads.current === 0) {
      history.push(pathname.replace('uploads', 'contents'));
      return;
    }
    setOpen(true);
  };

  const addItems = (batch) => {
    const UploadData = batch.items.reduce((acc, item) => {
      const previewUrl = URL.createObjectURL(item.file);
      acc[item.id] = {
        ...item,
        preview: previewUrl,
        uploadSpeed: 0,
        timeLeft: 0,
        startTime: null,
      };
      return acc;
    }, {});

    pendingUploads.current = pendingUploads.current + batch.items.length;
    setUploadItems((prevState) => {
      return { ...prevState, ...UploadData };
    });
  };

  const updateItems = (item, action) => {
    switch (action) {
      case 'start':
        setUploadItems((prevState) => {
          return {
            ...prevState,
            [item.id]: { ...prevState[item.id], startTime: Date.now() },
          };
        });
        break;

      case 'progress':
        setUploadItems((prevState) => {
          const progItem = prevState[item.id];

          const { uploadSpeed, timeLeft } = getSpeednTime(
            progItem.startTime,
            progItem.loaded,
            progItem.file.size,
          );

          return {
            ...prevState,
            [item.id]: {
              ...prevState[item.id],
              loaded: item.loaded,
              state: item.state,
              completed: item.completed,
              uploadSpeed: uploadSpeed,
              timeLeft: timeLeft,
            },
          };
        });
        break;

      case 'finish':
        pendingUploads.current = pendingUploads.current - 1;
        setUploadItems((prevState) => {
          return {
            ...prevState,
            [item.id]: {
              ...prevState[item.id],
              state: item.state,
              uploadResponse: item.uploadResponse,
            },
          };
        });
        break;

      case 'error':
        setUploadItems((prevState) => {
          return {
            ...prevState,
            [item.id]: { ...prevState[item.id], state: item.state },
          };
        });
        break;

      case 'abort':
        pendingUploads.current = pendingUploads.current - 1;
        setUploadItems((prevState) => {
          const newData = { ...prevState };
          delete newData[item.id];
          return newData;
        });
        break;

      default:
        break;
    }
  };

  const StartUploadButton = () => {
    const { processPending } = useUploady();

    return (
      <button onClick={processPending}>
        <Icon
          name={uploadSVG}
          className="circled edit icon"
          color="#007eb1"
          size="30px"
          title={intl.formatMessage(messages.startUpload)}
        />
      </button>
    );
  };

  const DropZoneArea = () => {
    const uploady = useUploady();

    useRequestPreSend(({ items, options }) => {
      let ctype = 'File';
      if (items[0]['file']['type'].startsWith('image')) {
        ctype = 'Image';
      }
      if (items[0]['file']['type'].startsWith('video')) {
        ctype = 'Video';
      }

      return {
        options: {
          params: {
            filename: items[0]['file']['name'],
            'Content-type': items[0]['file']['type'],
            '@type': ctype,
          },
        },
      };
    });

    useBatchAddListener((batch) => {
      addItems(batch);
    });

    useItemStartListener((item) => {
      updateItems(item, 'start');
    });

    useItemProgressListener((item) => {
      updateItems(item, 'progress');
    });

    useItemErrorListener((item) => {
      updateItems(item, 'error');
    });

    useItemFinishListener((item) => {
      updateItems(item, 'finish');
    });

    useItemAbortListener((item) => {
      updateItems(item, 'abort');
    });

    const onUpload = () => {
      uploady.showFileUpload({ autoUpload: false });
    };

    return (
      <UploadDropZone
        autoUpload={false}
        className="dropzone-area"
        onDragOverClassName="dropzone-area-focus"
      >
        <div className="dropzone-message">
          <h2>{intl.formatMessage(messages.uploadMore)}</h2>
          <p>
            {intl.formatMessage(messages.dragAndDrop)}
            {'  '}
            <Button onClick={onUpload} className="browse-button">
              {intl.formatMessage(messages.browse)}
            </Button>{' '}
          </p>
        </div>
      </UploadDropZone>
    );
  };

  const DeleteButton = ({ item }) => {
    const handleDelete = () => {
      const results = item.uploadResponse['results'];
      const url = results[results.length - 1].headers.location;

      dispatch(deleteContent(url));
      setUploadItems((prevState) => {
        const newData = { ...prevState };
        delete newData[item.id];
        return newData;
      });
    };

    return (
      <Icon
        style={{ cursor: 'pointer' }}
        onClick={handleDelete}
        name={deleteSVG}
        color="#DC3545"
        size="1.8em"
        title={intl.formatMessage(messages.delete)}
      />
    );
  };

  const RemoveButton = ({ id }) => {
    const { abort } = useUploady();

    const removeFile = () => {
      abort(id);
    };

    return (
      <Icon
        onClick={removeFile}
        name={clearSVG}
        color="#777777"
        size="2em"
        style={{ cursor: 'pointer' }}
        title={intl.formatMessage(messages.cancel)}
      />
    );
  };

  const ItemProgress = ({ item }) => {
    const { state, uploadSpeed, loaded, file, timeLeft, completed } = item;

    return (
      <div className="progress-section">
        {state === 'pending' && (
          <>
            <ItemExtra>
              {friendlyFormat(uploadSpeed)}/s - {friendlyFormat(loaded)} of{' '}
              {friendlyFormat(file.size)} , waiting...
            </ItemExtra>
            <Progress size="small" percent={0} />
          </>
        )}
        {state === 'uploading' && (
          <>
            <ItemExtra>
              {friendlyFormat(uploadSpeed)}/s - {friendlyFormat(loaded)} of{' '}
              {friendlyFormat(file.size)}, {formatTimeLeft(timeLeft)} left
            </ItemExtra>
            <Progress size="small" percent={completed} indicating />
          </>
        )}
        {state === 'finished' && (
          <>
            <ItemExtra className="upload-complete">
              <Icon
                name={readySVG}
                aria-label="Upload Finished"
                color="green"
                size="1.2em"
                title={intl.formatMessage(messages.complete)}
              />
              <span
                style={{
                  color: '#51AA55',
                  fontWeight: 'bold',
                  fontSize: '1em',
                }}
              >
                {intl.formatMessage(messages.uploaded)}
              </span>{' '}
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1em',
                }}
              >
                {friendlyFormat(file.size)}
              </span>
            </ItemExtra>
            {/* <Progress size="small" success={true} percent={100} /> */}
          </>
        )}
        {state === 'error' && (
          <>
            <ItemExtra className="upload-complete">
              <Icon
                name={exclamationSVG}
                aria-label="upload error"
                color="red"
                size="20px"
                title={intl.formatMessage(messages.complete)}
              />
              <div>{intl.formatMessage(messages.errorMessage)}</div>
            </ItemExtra>
            <Progress size="small" error percent={100} />
          </>
        )}
      </div>
    );
  };

  const AbortButton = () => {
    const abortAll = useAbortAll();

    const onAbort = () => {
      abortAll();
      history.push(pathname.replace('uploads', 'contents'));
    };

    return (
      <Button color="red" onClick={onAbort}>
        Abort
      </Button>
    );
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );

    let uploadURL = `/++api++/${uploadFolder}/@tus-upload`;
    if (uploadFolder === 'Home') {
      uploadURL = '/++api++/@tus-upload';
    }

    const uploadProps = {
      destination: {
        url: uploadURL,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      },
      chunkSize: 52428800, // 50MB
      sendDataOnCreate: true,
      sendWithFormData: true,
      withCredentials: true,
    };

    uploadPropsRef.current = uploadProps;
    setIsClient(true);
  }, [uploadFolder]);

  return (
    <Container id="uploading-page">
      <>
        {isClient && (
          <Uploader {...uploadPropsRef.current}>
            <div className="upload-page-wrapper">
              <div className="upload-page-heading">
                <h1>
                  {intl.formatMessage(messages.uploadContext, { uploadFolder })}
                </h1>
              </div>
              {isEmpty(uploadItems) && (
                <div className="upload-item-alternative">
                  <h1 style={{ textAlign: 'center', color: '#a9acb4' }}>
                    {intl.formatMessage(messages.noUploads)}
                  </h1>
                </div>
              )}
              <div className="uploaded-files-list">
                {map(uploadItems, (item, index) => (
                  <Item className="upload-item" key={item.id}>
                    {item.file.type.split('/')[0] === 'image' ? (
                      <ItemImage
                        size="small"
                        src={item.preview}
                        className="preview-image"
                      />
                    ) : (
                      <div className="preview-icon">
                        <Icon
                          className=""
                          name={fileSVG}
                          color="#cccccc"
                          size="100%"
                        />
                      </div>
                    )}

                    <ItemContent>
                      <div>
                        <ItemHeader>{truncateFile(item.file.name)}</ItemHeader>
                        <ItemMeta>
                          <span
                            className="last-modified"
                            style={{ fontSize: '1em' }}
                          >
                            {intl.formatMessage(messages.lastModified)}{' '}
                            {formatDate(item.file.lastModified)}
                          </span>
                        </ItemMeta>
                      </div>
                      <ItemProgress item={item} />
                    </ItemContent>
                    <ItemExtra>
                      {item.state === 'finished' ? (
                        <DeleteButton item={item} />
                      ) : (
                        <RemoveButton id={item.id} />
                      )}{' '}
                    </ItemExtra>
                  </Item>
                ))}
              </div>
              <DropZoneArea />
              <Modal open={open}>
                <Header>
                  <FormattedMessage
                    id="Cancel uploads"
                    defaultMessage="Cancel uploads"
                  />
                </Header>
                <Modal.Content>
                  <p>{intl.formatMessage(messages.abortMessage)}</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <AbortButton />
                </Modal.Actions>
              </Modal>
            </div>
            {createPortal(
              <Toolbar
                pathname={pathname}
                hideDefaultViewButtons
                inner={
                  <>
                    <StartUploadButton />
                    <Button onClick={handleCancel}>
                      <Icon
                        name={backSVG}
                        className=" circled"
                        size="30px"
                        title={intl.formatMessage(messages.back)}
                      />
                    </Button>
                  </>
                }
              />,
              document.getElementById('toolbar'),
            )}
          </Uploader>
        )}
      </>
    </Container>
  );
}

export default ContentsUploadPage;
