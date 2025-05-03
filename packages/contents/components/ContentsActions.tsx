import React from 'react';
import { TooltipTrigger, type Selection } from 'react-aria-components';
import { Button, Tooltip } from '@plone/components';
import StateSVG from '@plone/components/icons/state.svg?react';
import BinSVG from '@plone/components/icons/bin.svg?react';
import UploadSVG from '@plone/components/icons/upload.svg?react';
import PropertiesSVG from '@plone/components/icons/properties.svg?react';
import RenameSVG from '@plone/components/icons/rename.svg?react';
import TagSVG from '@plone/components/icons/tag.svg?react';
import CutSVG from '@plone/components/icons/cut.svg?react';
import CopySVG from '@plone/components/icons/copy.svg?react';
import PasteSVG from '@plone/components/icons/paste.svg?react';

import { useContentsContext } from '../providers/contents';

type Props = {
  upload: () => Promise<void>;
  rename: () => Promise<void>;
  workflow: () => Promise<void>;
  tags: () => Promise<void>;
  properties: () => Promise<void>;
  cut: (value?: string) => Promise<void>;
  copy: (value?: string) => Promise<void>;
  paste: () => Promise<void>;
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
          <UploadSVG />
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
          <RenameSVG />
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
          <StateSVG />
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
          <TagSVG />
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
          <PropertiesSVG />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Properties' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger cut"
          onPress={() => cut()}
          aria-label={intl.formatMessage({ id: 'Cut' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <CutSVG />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Cut' })}
        </Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger copy"
          onPress={() => copy()}
          aria-label={intl.formatMessage({ id: 'Copy' })}
          isDisabled={selected !== 'all' && selected.size === 0}
        >
          <CopySVG />
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
          <PasteSVG />
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
          <BinSVG />
        </Button>
        <Tooltip placement="bottom">
          {intl.formatMessage({ id: 'Delete' })}
        </Tooltip>
      </TooltipTrigger>
    </div>
  );
}
