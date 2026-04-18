import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Content } from '@plone/types';
import type { JSX } from 'react';
import BlockSettingsForm from './BlockSettingsForm';

const { useAppFormSpy, getLastForm } = vi.hoisted(() => {
  const forms: any[] = [];

  const deepClone = (value: unknown) =>
    value == null ? value : JSON.parse(JSON.stringify(value));

  const getValueByPath = (source: any, path: string) =>
    path.split('.').reduce((acc, key) => acc?.[key], source);

  const setValueByPath = (
    source: Record<string, any>,
    path: string,
    value: unknown,
  ) => {
    const segments = path.split('.');
    let current: any = source;

    for (let index = 0; index < segments.length - 1; index += 1) {
      const segment = segments[index];
      const nextSegment = segments[index + 1];
      const nextIsArrayIndex = /^\d+$/.test(nextSegment);
      const existing = current[segment];

      if (Array.isArray(existing)) {
        current[segment] = [...existing];
      } else if (existing && typeof existing === 'object') {
        current[segment] = { ...existing };
      } else {
        current[segment] = nextIsArrayIndex ? [] : {};
      }

      current = current[segment];
    }

    current[segments[segments.length - 1]] = value;
  };

  return {
    useAppFormSpy: vi.fn(({ defaultValues }: { defaultValues: Content }) => {
      const state = {
        values: deepClone(defaultValues ?? {}),
      };

      const form = {
        state,
        reset: vi.fn((nextValues: Content) => {
          state.values = deepClone(nextValues ?? {});
        }),
        AppField: ({
          name,
          children,
        }: {
          name: string;
          children: (field: any) => JSX.Element;
        }) => {
          const Quanta = ({ label, defaultValue, onChange, required }: any) => (
            <label>
              {label}
              <input
                aria-label={label}
                data-required={required ? 'true' : 'false'}
                defaultValue={defaultValue ?? ''}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  const nextValues = deepClone(state.values ?? {});
                  setValueByPath(
                    nextValues as Record<string, any>,
                    String(name),
                    nextValue,
                  );
                  state.values = nextValues;
                  onChange(nextValue);
                }}
              />
            </label>
          );

          return children({
            name,
            state: {
              value: getValueByPath(state.values, String(name)),
              meta: { errors: [] },
            },
            Quanta,
          });
        },
      };

      forms.push(form);
      return form;
    }),
    getLastForm: () => forms[forms.length - 1],
  };
});

vi.mock('../Form/Form', () => ({
  useAppForm: useAppFormSpy,
}));

vi.mock('@plone/components/quanta', () => ({
  Accordion: ({ children }: any) => <section>{children}</section>,
  AccordionItem: ({ children }: any) => <div>{children}</div>,
  AccordionPanel: ({ children }: any) => <div>{children}</div>,
  AccordionItemTrigger: ({ children }: any) => <h3>{children}</h3>,
}));

const schema = {
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'settings.caption', 'items.0.label'],
    },
  ],
  properties: {
    title: { title: 'Title' },
    'settings.caption': { title: 'Caption' },
    'items.0.label': { title: 'First item label' },
  },
  required: ['title'],
} as any;

describe('BlockSettingsForm', () => {
  it('renders fieldsets and fields from a plain schema', () => {
    render(<BlockSettingsForm schema={schema} formData={{ title: 'Hello' }} />);

    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Caption')).toBeInTheDocument();
    expect(screen.getByLabelText('First item label')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toHaveAttribute(
      'data-required',
      'true',
    );
    expect(screen.getByLabelText('Caption')).toHaveAttribute(
      'data-required',
      'false',
    );
  });

  it('supports function schemas and passes props/formData', () => {
    const schemaFactory = vi.fn(() => schema);
    const formData = { title: 'Factory title' };

    render(
      <BlockSettingsForm schema={schemaFactory as any} formData={formData} />,
    );

    expect(schemaFactory).toHaveBeenCalledTimes(1);
    expect(schemaFactory).toHaveBeenCalledWith(
      expect.objectContaining({
        formData,
        props: expect.objectContaining({
          formData,
        }),
        intl: undefined,
      }),
    );
  });

  it('calls onFormDataChange with top-level field updates', () => {
    const onFormDataChange = vi.fn();

    render(
      <BlockSettingsForm
        schema={schema}
        formData={{ title: 'Old title', untouched: 'keep-me' }}
        onFormDataChange={onFormDataChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New title' },
    });

    expect(onFormDataChange).toHaveBeenCalledWith({
      title: 'New title',
      untouched: 'keep-me',
    });
  });

  it('calls onFormDataChange with nested object path updates', () => {
    const onFormDataChange = vi.fn();

    render(
      <BlockSettingsForm
        schema={schema}
        formData={{
          title: 'A title',
          settings: { caption: 'Old caption', other: 'preserved' },
        }}
        onFormDataChange={onFormDataChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Caption'), {
      target: { value: 'New caption' },
    });

    expect(onFormDataChange).toHaveBeenCalledWith({
      title: 'A title',
      settings: {
        caption: 'New caption',
        other: 'preserved',
      },
    });
  });

  it('calls onFormDataChange with nested array path updates', () => {
    const onFormDataChange = vi.fn();

    render(
      <BlockSettingsForm
        schema={schema}
        formData={{
          items: [{ label: 'Old item label', id: 'item-1' }],
        }}
        onFormDataChange={onFormDataChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('First item label'), {
      target: { value: 'Updated item label' },
    });

    expect(onFormDataChange).toHaveBeenCalledWith({
      items: [{ label: 'Updated item label', id: 'item-1' }],
    });
  });

  it('syncs form values when formData prop changes', async () => {
    const { rerender } = render(
      <BlockSettingsForm schema={schema} formData={{ title: 'Initial' }} />,
    );

    rerender(
      <BlockSettingsForm schema={schema} formData={{ title: 'Next' }} />,
    );

    await waitFor(() => {
      const lastForm = getLastForm();
      expect(lastForm.state.values).toEqual({ title: 'Next' });
    });
  });

  it('does not reset form values when formData only changes reference', async () => {
    const { rerender } = render(
      <BlockSettingsForm schema={schema} formData={{ title: 'Same value' }} />,
    );

    const lastForm = getLastForm();
    (lastForm.reset as any).mockClear();

    rerender(
      <BlockSettingsForm schema={schema} formData={{ title: 'Same value' }} />,
    );

    await waitFor(() => {
      expect(lastForm.reset).not.toHaveBeenCalled();
    });
  });
});
