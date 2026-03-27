---
myst:
  html_meta:
    "description": "Configure and extend the Plate slash menu per editor in Seven"
    "property=og:description": "Configure and extend the Plate slash menu per editor in Seven"
    "property=og:title": "Configure Plate slash menus"
    "keywords": "Seven, Plate, slash menu, editor, extensibility, shadowing"
---

# Configure Plate slash menus

This guide explains how the Plate slash menu is wired in Seven, how to extend it without bloating the registry or the bundle, and how to configure different slash menus for different editors.

The key design choice is that the slash menu is configured at editor composition time, not by globally shadowing the UI component.

## Current architecture

The slash menu is split into three parts:

- {file}`packages/plate/components/editor/plugins/slash-kit.tsx`
- {file}`packages/plate/components/editor/plugins/slash-menu.tsx`
- {file}`packages/plate/components/ui/slash-node.tsx`

Their responsibilities are:

- `slash-kit.tsx`: registers the Plate slash plugins and exposes `createSlashKit(...)`
- `slash-menu.tsx`: defines the menu types, the default menu builders, and the extension API
- `slash-node.tsx`: renders the menu UI from the plugin-provided configuration

This split is important because it keeps the renderer generic and moves customization into configuration.

## Why this model exists

Shadowing `SlashInputElement` is a poor fit when a project has more than one editor.

If the menu is customized by shadowing the component:

- the customization becomes global
- every editor gets the same slash menu
- projects cannot easily provide one menu for one editor and another menu for a different editor
- add-ons are pushed toward component forks instead of configuration

The current model avoids that by letting each editor build its own `SlashKit`.

## Default behavior

The default export is still:

```ts
export const SlashKit = createSlashKit();
```

This preserves the current behavior for existing editor kits.

By default, the menu includes:

- static Plate items such as paragraphs, headings, lists, tables, and callouts
- the title block insertion entry when the current document does not already contain one
- registry-backed Plone blocks from `config.blocks.blocksConfig`

## The extension API

The slash menu is configured with `createSlashKit(...)`.

The supported shape is:

```ts
type SlashKitOptions = {
  menu?: SlashMenuConfig;
};

type SlashMenuConfig = {
  groups?: SlashMenuGroup[];
  getGroups?: (
    editor: PlateEditor,
    context: SlashMenuContext,
  ) => SlashMenuGroup[];
  extendGroups?: (
    groups: SlashMenuGroup[],
    editor: PlateEditor,
    context: SlashMenuContext,
  ) => SlashMenuGroup[];
};
```

The extension points serve different use cases:

- `groups`: provide a fully static menu
- `getGroups`: build a complete menu dynamically from the editor state
- `extendGroups`: start from the default menu and modify it

In most cases, `extendGroups` is the best entry point.

## How groups are resolved

The renderer resolves groups in this order:

1. `menu.getGroups(editor, context)`
2. `menu.groups`
3. `getDefaultSlashMenuGroups(editor, context)`

Then, if `menu.extendGroups` exists, it receives the resolved groups and returns the final menu.

That means:

- `getGroups` replaces the full base menu
- `groups` is a static replacement
- `extendGroups` can be used either with the defaults or with a replacement menu

## The context object

Slash builders receive a `context` object:

```ts
type SlashMenuContext = {
  hasTitleBlock: boolean;
  intl?: {
    formatMessage?: (...args: any[]) => any;
  } | null;
};
```

This is useful when the menu depends on editor state. For example:

- adding a title command only when no title exists
- translating labels from registry-backed blocks
- showing or hiding commands depending on the current editor

## Use case: keep the defaults and add one item

This is the most common customization.

```ts
import { SparklesIcon } from 'lucide-react';

import {
  createSlashKit,
} from '@plone/plate/components/editor/plugins/slash-kit';

const CustomSlashKit = createSlashKit({
  menu: {
    extendGroups: (groups) =>
      groups.map((group) => {
        if (group.group === 'Actions') {
          return {
              ...group,
              items: [
                ...group.items,
                {
                  icon: <SparklesIcon />,
                  label: 'My action',
                  value: 'my_action',
                  onSelect: (editor) => {
                    // custom command
                  },
                },
              ],
            }
          };
        }
        return group;
      }),
  },
});
```

Use this when:

- you want the built-in items to remain
- you only need to append or prepend a few commands
- you want the smallest maintenance surface

## Use case: remove items or groups from the defaults

You can filter the default groups with `extendGroups`.

Example removing the `Actions` group:

```ts
const CustomSlashKit = createSlashKit({
  menu: {
    extendGroups: (groups) =>
      groups.filter((group) => group.group !== 'Actions'),
  },
});
```

Example removing just one item:

```ts
const CustomSlashKit = createSlashKit({
  menu: {
    extendGroups: (groups) =>
      groups.map((group) =>
        group.group === 'Advanced blocks'
          ? {
              ...group,
              items: group.items.filter((item) => item.value !== 'action_three_columns'),
            }
          : group,
      ),
  },
});
```

Use this when:

- your project wants to curate the default menu
- some commands should not be available in a specific editor

## Use case: reorder groups or items

`extendGroups` can also reorder the resolved menu.

Example moving `Blocks` to the top:

```ts
const CustomSlashKit = createSlashKit({
  menu: {
    extendGroups: (groups) => {
      const blocks = groups.find((group) => group.group === 'Blocks');
      const rest = groups.filter((group) => group.group !== 'Blocks');

      return blocks ? [blocks, ...rest] : groups;
    },
  },
});
```

Use this when:

- one editor should emphasize project blocks over core text commands
- you need an editorial workflow-specific ordering

## Use case: replace the full menu with a static list

Use `groups` when the menu is fixed and does not depend on runtime editor state.

```ts
import { Heading1Icon, PilcrowIcon } from 'lucide-react';
import { KEYS } from 'platejs';

const MinimalSlashKit = createSlashKit({
  menu: {
    groups: [
      {
        group: 'Text',
        items: [
          {
            icon: <PilcrowIcon />,
            label: 'Paragraph',
            value: KEYS.p,
            onSelect: (editor, value) => {
              editor.tf.setNodes({ type: value });
            },
          },
          {
            icon: <Heading1Icon />,
            label: 'Heading 1',
            value: KEYS.h1,
            onSelect: (editor, value) => {
              editor.tf.setNodes({ type: value });
            },
          },
        ],
      },
    ],
  },
});
```

Use this when:

- an editor must expose a very narrow authoring surface
- the menu is intentionally independent from the default menu

## Use case: build the full menu dynamically

Use `getGroups` when the menu depends on editor state or external configuration.

```ts
const ConditionalSlashKit = createSlashKit({
  menu: {
    getGroups: (editor, context) => {
      const groups = [];

      if (!context.hasTitleBlock) {
        groups.push({
          group: 'Structure',
          items: [
            {
              icon: <BookA />,
              label: 'Title',
              value: 'title',
              onSelect: (nextEditor, value) => {
                // insert title block
              },
            },
          ],
        });
      }

      if (editor.selection) {
        groups.push({
          group: 'Text',
          items: [
            // build commands from editor state
          ],
        });
      }

      return groups;
    },
  },
});
```

Use this when:

- the set of available commands depends on the editor state
- commands differ based on selection, schema, or document content
- you need more control than `extendGroups` provides

## Use case: different slash menus for different editors

This is the main reason to use `createSlashKit(...)`.

You can compose different editor kits with different slash configurations:

```ts
import { createSlashKit } from './plugins/slash-kit';

export const NewsEditorKit = [
  // ...
  ...createSlashKit({
    menu: {
      extendGroups: (groups) =>
        groups.filter((group) => group.group !== 'Advanced blocks'),
    },
  }),
];

export const LandingPageEditorKit = [
  // ...
  ...createSlashKit({
    menu: {
      extendGroups: (groups) => [
        ...groups,
        {
          group: 'Landing page',
          items: [
            // landing-specific commands
          ],
        },
      ],
    },
  }),
];
```

This approach is preferable to shadowing because each editor keeps its own slash menu definition.

## Use case: project-wide defaults in an add-on

If a project wants to change the default slash menu everywhere, there are two reasonable approaches.

### Option 1: shadow the editor kit

Shadow the editor kit that your project uses and replace:

```ts
...SlashKit
```

with:

```ts
...createSlashKit({
  menu: {
    extendGroups: (groups) => {
      // project defaults
      return groups;
    },
  },
})
```

This is the preferred approach when you control the editor composition.

### Option 2: shadow `slash-menu.tsx`

This is acceptable only if your goal is to redefine the global defaults used by `createSlashKit()` with no explicit `menu` argument.

This is useful when:

- your project intentionally wants a different global default
- you still want per-editor overrides to remain possible

It is less desirable than composing a custom editor kit because it changes the default behavior for all consumers of the default slash menu.

## When not to shadow `SlashInputElement`

Do not shadow `packages/plate/components/ui/slash-node.tsx` just to change groups or items.

That should now be treated as a rendering component, not as the main extension point.

Shadow it only when you need to change:

- the combobox layout
- visual styling
- custom markup for items or groups
- accessibility behavior of the rendered menu

If the change is about menu contents, prefer `createSlashKit(...)`.

## Registry-backed Plone blocks

The default slash menu still reads Plone blocks from:

- `config.blocks.blocksConfig`

The current default builder:

- filters malformed or restricted blocks
- localizes titles when needed
- creates slash entries that insert an adapted Plone block into the editor

That means projects can still register blocks through the registry as usual, while customizing the slash menu composition per editor.

## Performance and bundle-size notes

This model is designed to avoid unnecessary registry or bundle growth.

Prefer this pattern:

- keep reusable slash builders in small modules
- import only the builders needed by a given editor kit
- compose the menu at editor build time

Avoid this pattern:

- a central registry of every possible slash command for every editor

The editor-specific factory approach is better because:

- editors only import the commands they actually need
- customization stays local to the editor composition
- add-ons do not need to fork the UI renderer to change menu data

## Recommended extension strategy

Use this order of preference:

1. `extendGroups` for small additive or subtractive changes
2. `getGroups` when the menu is dynamic
3. `groups` for a fully static replacement
4. shadow an editor kit when a project wants different defaults everywhere
5. shadow `slash-node.tsx` only for rendering changes

## Related files

- {file}`packages/plate/components/editor/plugins/slash-kit.tsx`
- {file}`packages/plate/components/editor/plugins/slash-menu.tsx`
- {file}`packages/plate/components/ui/slash-node.tsx`
- {file}`packages/plate/components/editor/editor-kit.tsx`
- {file}`packages/plate/components/editor/block-editor-kit.tsx`
