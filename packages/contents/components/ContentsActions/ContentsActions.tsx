import { useTranslation } from 'react-i18next';
import { TooltipTrigger } from 'react-aria-components';
import { Tooltip } from '@plone/components';

import {
  UploadIcon,
  StateIcon,
  BinIcon,
  PropertiesIcon,
  RenameIcon,
  TagIcon,
  CutIcon,
  CopyIcon,
  PasteIcon,
} from '@plone/components/Icons';

import type { Brain } from '@plone/types';
import { Button } from '@plone/components/quanta';

import { useContentsContext } from '../../providers/contents';
import './ContentsActions.css';

type Props = {
  upload: () => Promise<void>;
  rename: () => Promise<void>;
  workflow: () => Promise<void>;
  tags: () => Promise<void>;
  properties: () => Promise<void>;
  cut: (item?: Brain) => void;
  copy: (item?: Brain) => void;
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
        <Button
          variant="icon"
          className="contents-action-trigger upload"
          onPress={upload}
          aria-label={t('contents.actions.upload')}
        >
          <UploadIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.upload')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger rename"
          onPress={rename}
          aria-label={t('contents.actions.rename')}
          isDisabled={selected.size === 0}
        >
          <RenameIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.rename')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger state"
          onPress={workflow}
          aria-label={t('contents.actions.state')}
          isDisabled={selected.size === 0}
        >
          <StateIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.state')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger tags"
          onPress={tags}
          aria-label={t('contents.actions.tags')}
          isDisabled={selected.size === 0}
        >
          <TagIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.tags')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger properties"
          onPress={properties}
          aria-label={t('contents.actions.properties')}
          isDisabled={selected.size === 0}
        >
          <PropertiesIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.properties')}</Tooltip>
      </TooltipTrigger>
      <span className="separator"></span>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger cut"
          onPress={() => cut()}
          aria-label={t('contents.actions.cut')}
          isDisabled={selected.size === 0}
        >
          <CutIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.cut')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger copy"
          onPress={() => copy()}
          aria-label={t('contents.actions.copy')}
          isDisabled={selected.size === 0}
        >
          <CopyIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.copy')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger paste"
          onPress={paste}
          aria-label={t('contents.actions.paste')}
          isDisabled={!canPaste}
        >
          <PasteIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.paste')}</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          variant="icon"
          className="contents-action-trigger delete"
          onPress={() => deleteItem()}
          aria-label={t('contents.actions.delete')}
          isDisabled={selected.size === 0}
        >
          <BinIcon />
        </Button>
        <Tooltip placement="bottom">{t('contents.actions.delete')}</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
