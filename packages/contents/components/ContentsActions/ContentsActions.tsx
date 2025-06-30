import { useTranslation } from 'react-i18next';
import { TooltipTrigger } from 'react-aria-components';
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
import type { Brain } from '@plone/types';
import IconButton from '../IconButton';
import { useContentsContext } from '../../providers/contents';
import './ContentsActions.css';

type Props = {
  upload: () => Promise<void>;
  rename: () => Promise<void>;
  workflow: () => Promise<void>;
  tags: () => Promise<void>;
  properties: () => Promise<void>;
  cut: (value?: string) => void;
  copy: (value?: string) => void;
  paste: () => Promise<void>;
  deleteItem: (item?: Brain | null | undefined) => void;
  canPaste: boolean;
  // selected: Set<Brain>;
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
  // selected,
}: Props) {
  const { t } = useTranslation();
  const { selected } = useContentsContext();

  return (
    <div className="contents-actions">
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger upload"
          onPress={upload}
          aria-label={t('contents.actions.upload')}
        >
          <UploadSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.upload')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger rename"
          onPress={rename}
          aria-label={t('contents.actions.rename')}
          isDisabled={selected.size === 0}
        >
          <RenameSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.rename')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger state"
          onPress={workflow}
          aria-label={t('contents.actions.state')}
          isDisabled={selected.size === 0}
        >
          <StateSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.state')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger tags"
          onPress={tags}
          aria-label={t('contents.actions.tags')}
          isDisabled={selected.size === 0}
        >
          <TagSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.tags')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger properties"
          onPress={properties}
          aria-label={t('contents.actions.properties')}
          isDisabled={selected.size === 0}
        >
          <PropertiesSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.properties')}</Tooltip>
      </TooltipTrigger>
      <span className="separator"></span>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger cut"
          onPress={() => cut()}
          aria-label={t('contents.actions.cut')}
          isDisabled={selected.size === 0}
        >
          <CutSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.cut')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger copy"
          onPress={() => copy()}
          aria-label={t('contents.actions.copy')}
          isDisabled={selected.size === 0}
        >
          <CopySVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.copy')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger paste"
          onPress={paste}
          aria-label={t('contents.actions.paste')}
          isDisabled={!canPaste}
        >
          <PasteSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.paste')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton
          className="contents-action-trigger delete"
          onPress={() => deleteItem()}
          aria-label={t('contents.actions.delete')}
          isDisabled={selected.size === 0}
        >
          <BinSVG />
        </IconButton>
        <Tooltip placement="bottom">{t('contents.actions.delete')}</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
