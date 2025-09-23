'use client';

import { MentionInputPlugin, MentionPlugin } from '@platejs/mention/react';

import { MentionElement, MentionInputElement } from '../../ui/mention-node';

export const MentionKit = [
  MentionPlugin.configure({
    options: { triggerPreviousCharPattern: /^$|^[\s"']$/ },
  }).withComponent(MentionElement),
  MentionInputPlugin.withComponent(MentionInputElement),
];
