import React from 'react';
import { useTranslation } from 'react-i18next';
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
import '../styles/ContentsActions.css';
import type { Content } from '@plone/types';

type Props = {
  upload: () => Promise<void>;
  rename: () => Promise<void>;
  workflow: () => Promise<void>;
  tags: () => Promise<void>;
  properties: () => Promise<void>;
  cut: (value?: string) => Promise<void>;
  copy: (value?: string) => Promise<void>;
  paste: () => Promise<void>;
  deleteItem: (item?: Content | null | undefined) => void;
  canPaste: boolean;
  selected: Set<Content>;
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
  const { t } = useTranslation();

  return (
    <div className="contents-actions">
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger upload"
          onPress={upload}
          aria-label={t('contents.actions.upload')}
        >
          <UploadSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.upload')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger rename"
          onPress={rename}
          aria-label={t('contents.actions.rename')}
          isDisabled={selected.length === 0}
        >
          <RenameSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.rename')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger state"
          onPress={workflow}
          aria-label={t('contents.actions.state')}
          isDisabled={selected.length === 0}
        >
          <StateSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.state')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger tags"
          onPress={tags}
          aria-label={t('contents.actions.tags')}
          isDisabled={selected.length === 0}
        >
          <TagSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.tags')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger properties"
          onPress={properties}
          aria-label={t('contents.actions.properties')}
          isDisabled={selected.length === 0}
        >
          <PropertiesSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.properties')}</Tooltip>
      </TooltipTrigger>
      <span className="separator"></span>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger cut"
          onPress={() => cut()}
          aria-label={t('contents.actions.cut')}
          isDisabled={selected.length === 0}
        >
          <CutSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.cut')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger copy"
          onPress={() => copy()}
          aria-label={t('contents.actions.copy')}
          isDisabled={selected.length === 0}
        >
          <CopySVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.copy')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger paste"
          onPress={paste}
          aria-label={t('contents.actions.paste')}
          isDisabled={!canPaste}
        >
          <PasteSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.paste')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          className="react-aria-Button contents-action-trigger delete"
          onPress={() => deleteItem()}
          aria-label={t('contents.actions.delete')}
          isDisabled={selected.length === 0}
        >
          <BinSVG />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.delete')}</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
