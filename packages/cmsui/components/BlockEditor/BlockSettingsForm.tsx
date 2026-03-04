import { useEffect } from 'react';
import { useAppForm } from '../Form/Form';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionItemTrigger,
} from '@plone/components/quanta';
import type { BlockConfigBase } from '@plone/types';

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
    <>
      <form>
        {schema.fieldsets.map((fieldset) => (
          <Accordion defaultExpandedKeys={['default']} key={fieldset.id}>
            <AccordionItem id={fieldset.id} key={fieldset.id}>
              <AccordionItemTrigger>{fieldset.title}</AccordionItemTrigger>
              <AccordionPanel>
                {fieldset.fields.map((schemaField, index) => (
                  <form.AppField
                    name={schemaField}
                    key={index}
                    // eslint-disable-next-line react/no-children-prop
                    children={(field) => (
                      <field.Quanta
                        {...schema.properties[schemaField]}
                        className="mb-4"
                        label={schema.properties[field.name].title}
                        name={field.name}
                        defaultValue={field.state.value}
                        required={schema.required.indexOf(schemaField) !== -1}
                        error={field.state.meta.errors}
                        onChange={(value: unknown) => {
                          const nextData = setValueByPath(
                            (form.state.values as Record<string, unknown>) ??
                              {},
                            String(field.name),
                            value,
                          );

                          props.onFormDataChange?.(nextData);
                        }}
                      />
                    )}
                  />
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </form>
    </>
  );
};

export default BlockSettingsForm;
