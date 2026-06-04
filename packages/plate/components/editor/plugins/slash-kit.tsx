import type { PlateEditor } from 'platejs/react';

import { SlashInputPlugin, SlashPlugin } from '@platejs/slash-command/react';
import { KEYS } from 'platejs';

import { SlashInputElement } from '../../ui/slash-node';
import type { SlashMenuConfig } from './slash-menu';

export type SlashKitOptions = {
  menu?: SlashMenuConfig;
};

const defaultTriggerQuery = (editor: PlateEditor) =>
  !editor.api.some({
    match: { type: editor.getType(KEYS.codeBlock) },
  });

export const createSlashKit = (options: SlashKitOptions = {}) => [
  SlashPlugin.configure({
    options: {
      menu: options.menu,
      triggerQuery: defaultTriggerQuery,
    } as any,
  }),
  SlashInputPlugin.withComponent(SlashInputElement),
];

export const SlashKit = createSlashKit();
