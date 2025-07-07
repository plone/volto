import { useAtomValue } from 'jotai';
import { useAppForm } from '../Form/Form';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionItemTrigger,
} from '@plone/components/quanta';
import type { BlockConfigBase } from '@plone/types';
import { blockAtomFamily } from '../../routes/atoms';

type BlocksSettingsProps = {
  block: string;
  schema: BlockConfigBase['blockSchema'];
};

const BlockSettingsForm = (props: BlocksSettingsProps) => {
  const { schema: schemaProp } = props;

  const blockAtom = blockAtomFamily(props.block);
  const blockData = useAtomValue(blockAtom);

  const form = useAppForm({
    defaultValues: blockData,
  });

  const schema =
    typeof schemaProp === 'function'
      ? // TODO: use i18n
        schemaProp({ props, intl: undefined as any })
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
                        formAtom={blockAtom}
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
