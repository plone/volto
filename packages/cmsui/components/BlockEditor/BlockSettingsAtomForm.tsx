import { useAtomValue } from 'jotai';
import { useAppForm } from '../Form/Form';
import type { BlockConfigBase } from '@plone/types';
import { blockAtomFamily } from '../../routes/atoms';
import BlockSettingsFormRenderer from './BlockSettingsFormRenderer';

type BlockSettingsAtomFormProps = {
  block: string;
  schema: BlockConfigBase['blockSchema'];
};

const BlockSettingsAtomForm = (props: BlockSettingsAtomFormProps) => {
  const { schema: schemaProp } = props;

  const blockAtom = blockAtomFamily(props.block);
  const blockData = useAtomValue(blockAtom);

  const form = useAppForm({
    defaultValues: blockData,
  });

  const schema =
    typeof schemaProp === 'function'
      ? // TODO: use i18n
        (schemaProp as any)({
          props,
          formData: (blockData ?? {}) as any,
          intl: undefined as any,
        })
      : schemaProp;

  return (
    <BlockSettingsFormRenderer
      schema={schema as any}
      form={form}
      getFieldProps={() => ({
        formAtom: blockAtom,
      })}
    />
  );
};

export default BlockSettingsAtomForm;
