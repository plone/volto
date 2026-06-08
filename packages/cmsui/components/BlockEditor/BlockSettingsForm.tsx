import { useEffect } from 'react';
import { isDeepEqual } from '@plone/helpers';
import { useAppForm } from '../Form/Form';
import type { BlockConfigBase } from '@plone/types';
import BlockSettingsFormRenderer from './BlockSettingsFormRenderer';

type BlockSettingsFormProps = {
  schema: BlockConfigBase['blockSchema'];
  formData?: Record<string, unknown>;
  onFormDataChange?: (next: Record<string, unknown>) => void;
};

const setValueByPath = (
  source: Record<string, unknown>,
  path: string,
  value: unknown,
): Record<string, unknown> => {
  const segments = path.split('.');
  const root: Record<string, unknown> = { ...source };

  let current: any = root;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const nextSegment = segments[index + 1];
    const nextIsArrayIndex = /^\d+$/.test(nextSegment);
    const existing = current[segment];

    if (Array.isArray(existing)) {
      current[segment] = [...existing];
    } else if (existing && typeof existing === 'object') {
      current[segment] = { ...(existing as Record<string, unknown>) };
    } else {
      current[segment] = nextIsArrayIndex ? [] : {};
    }

    current = current[segment];
  }

  const lastSegment = segments[segments.length - 1];
  current[lastSegment] = value;

  return root;
};

const BlockSettingsForm = (props: BlockSettingsFormProps) => {
  const { schema: schemaProp, formData = {} } = props;

  const form = useAppForm({
    defaultValues: formData,
  });

  useEffect(() => {
    if (isDeepEqual(form.state.values, formData)) return;
    form.reset(formData);
  }, [form, formData]);

  const schema =
    typeof schemaProp === 'function'
      ? // TODO: use i18n
        (schemaProp as any)({
          props,
          formData: formData as any,
          intl: undefined as any,
        })
      : schemaProp;

  return (
    <BlockSettingsFormRenderer
      schema={schema as any}
      form={form}
      getFieldProps={(fieldName) => ({
        onChange: (value: unknown) => {
          const nextData = setValueByPath(
            (form.state.values as Record<string, unknown>) ?? {},
            fieldName,
            value,
          );

          props.onFormDataChange?.(nextData);
        },
      })}
    />
  );
};

export default BlockSettingsForm;
