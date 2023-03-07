import ReactDOM from 'react-dom';
import React from 'react';
import { readAsDataURL } from 'promise-file-reader';
import Dropzone from 'react-dropzone';
import { defineMessages, useIntl } from 'react-intl';
import { useInView } from 'react-intersection-observer';
import { Dimmer, Loader, Message, Segment } from 'semantic-ui-react';

import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import {
  BlockDataForm,
  SidebarPortal,
  BlockChooserButton,
} from '@plone/volto/components';

import { SlateEditor } from '@plone/volto-slate/editor';
import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import {
  createImageBlock,
  parseDefaultSelection,
  deconstructToVoltoBlocks,
} from '@plone/volto-slate/utils';
import { Transforms } from 'slate';

import PersistentSlashMenu from './SlashMenu';
import ShortcutListing from './ShortcutListing';
import MarkdownIntroduction from './MarkdownIntroduction';
import { handleKey } from './keyboard';
import TextBlockSchema from './schema';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';

import './css/editor.css';

// TODO: refactor dropzone to separate component wrapper

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

const DEBUG = false;

export const DefaultTextBlockEditor = (props) => {
  const {
    block,
    blocksConfig,
    data,
    detached = false,
    index,
    onChangeBlock,
    onInsertBlock,
    onMutateBlock,
    onSelectBlock,
    pathname,
    properties,
    selected,
    uploadRequest,
    uploadContent,
    uploadedContent,
    defaultSelection,
    saveSlateBlockSelection,
    allowedBlocks,
    formTitle,
    formDescription,
  } = props;

  const { slate } = config.settings;
  const { textblockExtensions } = slate;
  const { value } = data;

  // const [addNewBlockOpened, setAddNewBlockOpened] = React.useState();
  const [showDropzone, setShowDropzone] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [newImageId, setNewImageId] = React.useState(null);

  const prevReq = React.useRef(null);

  const withBlockProperties = React.useCallback(
    (editor) => {
      editor.getBlockProps = () => props;
      return editor;
    },
    [props],
  );

  const slateSettings = React.useMemo(
    () => ({
      ...config.settings.slate,
      persistentHelpers: [
        ...config.settings.slate.persistentHelpers,
        PersistentSlashMenu,
      ],
    }),
    [],
  );

  const onDrop = React.useCallback(
    (files) => {
      // TODO: need to fix setUploading, treat uploading indicator
      // inteligently, show progress report on uploading files
      setUploading(true);
      files.forEach((file) => {
        const [mime] = file.type.split('/');
        if (mime !== 'image') return;

        readAsDataURL(file).then((data) => {
          const fields = data.match(/^data:(.*);(.*),(.*)$/);
          uploadContent(
            getBaseUrl(pathname),
            {
              '@type': 'Image',
              title: file.name,
              image: {
                data: fields[3],
                encoding: fields[2],
                'content-type': fields[1],
                filename: file.name,
              },
            },
            block,
          );
        });
      });
      setShowDropzone(false);
    },
    [pathname, uploadContent, block],
  );

  const { loaded, loading } = uploadRequest;
  const imageId = uploadedContent['@id'];
  const prevLoaded = prevReq.current;

  React.useEffect(() => {
    if (loaded && !loading && !prevLoaded && newImageId !== imageId) {
      const url = flattenToAppURL(imageId);
      setNewImageId(imageId);

      createImageBlock(url, index, props);
    }
    prevReq.current = loaded;
  }, [props, loaded, loading, prevLoaded, imageId, newImageId, index]);

  const handleUpdate = React.useCallback(
    (editor) => {
      // defaultSelection is used for things such as "restoring" the selection
      // when joining blocks or moving the selection to block start on block
      // split
      if (defaultSelection) {
        const selection = parseDefaultSelection(editor, defaultSelection);
        if (selection) {
          Transforms.select(editor, selection);
          saveSlateBlockSelection(block, null);
        }
      }
    },
    [defaultSelection, block, saveSlateBlockSelection],
  );

  const onEditorChange = (value, editor) => {
    ReactDOM.unstable_batchedUpdates(() => {
      onChangeBlock(block, {
        ...data,
        value,
        plaintext: serializeNodesToText(value || []),
        // TODO: also add html serialized value
      });
      deconstructToVoltoBlocks(editor);
    });
  };

  // Get editing instructions from block settings or props
  let instructions = data?.instructions?.data || data?.instructions;
  if (!instructions || instructions === '<p><br/></p>') {
    instructions = formDescription;
  }

  const intl = useIntl();
  const placeholder =
    data.placeholder || formTitle || intl.formatMessage(messages.text);
  const schema = TextBlockSchema(data);

  const disableNewBlocks = data?.disableNewBlocks || detached;
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 200px 0px',
  });

  const handleFocus = React.useCallback(() => {
    if (!selected) {
      onSelectBlock(block);
    }
  }, [onSelectBlock, selected, block]);

  return (
    <div className="text-slate-editor-inner" ref={ref}>
      <>
        <Dropzone
          disableClick
          onDrop={onDrop}
          className="dropzone"
          onDragOver={() => setShowDropzone(true)}
          onDragLeave={() => setShowDropzone(false)}
        >
          {({ getRootProps, getInputProps }) => {
            return showDropzone ? (
              <div className="drop-indicator">
                {uploading ? (
                  <Dimmer active>
                    <Loader indeterminate>Uploading image</Loader>
                  </Dimmer>
                ) : (
                  <Message>
                    <center>
                      <img src={imageBlockSVG} alt="" />
                    </center>
                  </Message>
                )}
              </div>
            ) : (
              <>
                <SlateEditor
                  index={index}
                  readOnly={!inView}
                  properties={properties}
                  extensions={textblockExtensions}
                  renderExtensions={[withBlockProperties]}
                  value={value}
                  block={block /* is this needed? */}
                  defaultSelection={defaultSelection}
                  onUpdate={handleUpdate}
                  debug={DEBUG}
                  onFocus={handleFocus}
                  onChange={(value, editor) => onEditorChange(value, editor)}
                  onKeyDown={handleKey}
                  selected={selected}
                  placeholder={placeholder}
                  slateSettings={slateSettings}
                  editableProps={{ 'aria-multiline': 'false' }}
                />
                {DEBUG ? <div>{block}</div> : ''}
              </>
            );
          }}
        </Dropzone>

        {!config.experimental.addBlockButton.enabled &&
          selected &&
          !data.plaintext?.trim() &&
          !disableNewBlocks && (
            <BlockChooserButton
              data={data}
              block={block}
              onInsertBlock={(id, value) => {
                onSelectBlock(onInsertBlock(id, value));
              }}
              onMutateBlock={onMutateBlock}
              allowedBlocks={allowedBlocks}
              blocksConfig={blocksConfig}
              size="24px"
              properties={properties}
            />
          )}

        <SidebarPortal selected={selected}>
          <div id="slate-plugin-sidebar"></div>
          {instructions ? (
            <Segment attached>
              <div dangerouslySetInnerHTML={{ __html: instructions }} />
            </Segment>
          ) : (
            <>
              <ShortcutListing />
              <MarkdownIntroduction />
              <BlockDataForm
                block={block}
                schema={schema}
                title={schema.title}
                onChangeBlock={onChangeBlock}
                onChangeField={(id, value) => {
                  onChangeBlock(block, {
                    ...data,
                    [id]: value,
                  });
                }}
                formData={data}
              />
            </>
          )}
        </SidebarPortal>
      </>
    </div>
  );
};

export default DefaultTextBlockEditor;
