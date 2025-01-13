import { toggleList } from './utils';
import { isBlockActive } from '@plone/volto-slate/utils/blocks';
import { UL, OL, LI,H1, H2, H3, BLOCKQUOTE } from '@plone/volto-slate/constants';

/**
 * Uses the old toggleList function to toggle lists on or off or from a type to another.
 * @param {Editor} editor The editor to which to apply the change.
 * @param {string} format A list type.
 */
export const localToggleList = (editor, format) => {
  toggleList(editor, {
    typeList: format,
    isBulletedActive: !!isBlockActive(editor, UL),
    isNumberedActive: !!isBlockActive(editor, OL),
  });
};

/**
 * The autoformat rules created by this plugin for the Markdown language.
 *
 * @todo Use constants instead of the remaining hard-coded types (h2, h3 etc.).
 */
export const autoformatRules = [
  {
    type: H1,
    markup: '#',
  },
  {
    type: H2,
    markup: '##',
  },
  {
    type: H3,
    markup: '###',
  },
  {
    type: LI,
    markup: ['*', '-', '+'],
    format: (editor) => {
      localToggleList(editor, 'ul');
    },
  },
  {
    type: LI,
    markup: ['1.', '1)'],
    format: (editor) => {
      localToggleList(editor, 'ol');
    },
  },
  {
    type: BLOCKQUOTE,
    markup: ['>'],
    // preFormat,
  },
  {
    type: 'strong',
    between: ['**', '**'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'strong',
    between: ['__', '__'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'em',
    between: ['*', '*'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'em',
    between: ['_', '_'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: 'del',
    between: ['~~', '~~'],
    mode: 'inline',
    insertTrigger: true,
  },
];
