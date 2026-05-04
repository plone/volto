import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import config from '@plone/registry';
import BlockWrapper from './BlockWrapper';

type RegistryState = {
  utilities?: unknown;
};

const snapshotRegistryState = (): RegistryState => ({
  utilities: config.utilities,
});

const restoreRegistryState = (state: RegistryState) => {
  config.utilities = state.utilities as any;
};

const initialRegistryState = snapshotRegistryState();

afterEach(() => {
  restoreRegistryState(initialRegistryState);
});

beforeEach(() => {
  config.registerUtility({
    type: 'styleFieldDefinition',
    name: 'theme',
    method: () => [
      {
        name: 'default',
        label: 'Default',
        style: { '--theme-color': 'white' },
      },
      {
        name: 'sand',
        label: 'Sand',
        style: { '--theme-color': 'wheat' },
      },
    ],
  });
});

describe('BlockWrapper', () => {
  it('injects schema-driven theme styles into the wrapper element', () => {
    const { container } = render(
      <BlockWrapper
        data={
          {
            '@type': 'teaser',
            theme: 'sand',
          } as any
        }
        blocksConfig={
          {
            teaser: {
              id: 'teaser',
              title: 'Teaser',
              icon: 'icon',
              group: 'default',
              restricted: false,
              mostUsed: false,
              sidebarTab: false,
              blockSchema: {
                title: 'Teaser',
                fieldsets: [],
                required: [],
                properties: {
                  theme: {
                    title: 'Theme',
                    default: 'default',
                    choices: [
                      ['default', 'Default'],
                      ['sand', 'Sand'],
                    ],
                    styleField: true,
                  },
                },
              },
            },
          } as any
        }
      >
        <div>Body</div>
      </BlockWrapper>,
    );

    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper).toBeTruthy();
    expect(wrapper.style.getPropertyValue('--theme-color')).toBe('wheat');
  });
});
