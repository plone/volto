import React from 'react';
import { TooltipTrigger, type Selection } from 'react-aria-components';
import { useLocalStorage } from 'usehooks-ts';
import {
  BinIcon,
  Button,
  CopyIcon,
  CutIcon,
  PasteIcon,
  PropertiesIcon,
  RenameIcon,
  StateIcon,
  TagIcon,
  Tooltip,
  UploadIcon,
} from '@plone/components';
import { useContentsContext } from '../providers/contents';

type Props = {
  upload: () => Promise<void>;
  rename: () => Promise<void>;
  workflow: () => Promise<void>;
  tags: () => Promise<void>;
  properties: () => Promise<void>;
  cut: () => void;
  copy: () => void;
  paste: () => void;
  deleteItem: (value?: string) => Promise<void>;
  canPaste: boolean;
  selected: Selection;
};

export function ContentsActions({
  upload,
  rename,
  workflow,
  tags,
  properties,
  cut,
  copy,
  paste,
  deleteItem,
  canPaste,
  selected,
}: Props) {
  const { intl } = useContentsContext();

  return (
    <div className="contents-actions">
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger upload"
          onPress={upload}
          aria-label={intl.formatMessage({ id: 'Upload' })}
        >
          <UploadIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Upload' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger rename"
          onPress={rename}
          aria-label={intl.formatMessage({ id: 'Rename' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <RenameIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Rename' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger state"
          onPress={workflow}
          aria-label={intl.formatMessage({ id: 'State' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <StateIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'State' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger tags"
          onPress={tags}
          aria-label={intl.formatMessage({ id: 'Tags' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <TagIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Tags' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger properties"
          onPress={properties}
          aria-label={intl.formatMessage({ id: 'Properties' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <PropertiesIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Properties' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger cut"
          onPress={cut}
          aria-label={intl.formatMessage({ id: 'Cut' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <CutIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Cut' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger copy"
          onPress={copy}
          aria-label={intl.formatMessage({ id: 'Copy' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <CopyIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Copy' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger paste"
          onPress={paste}
          aria-label={intl.formatMessage({ id: 'Paste' })}
          isDisabled={!canPaste}
        >
          <PasteIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Paste' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger delete"
          onPress={() => deleteItem()}
          aria-label={intl.formatMessage({ id: 'Delete' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <BinIcon />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Delete' })}
        </Tooltip>
      </TooltipTrigger>
    </div>
  );
}
