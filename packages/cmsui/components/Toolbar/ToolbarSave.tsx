import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { formSubmitAtom } from '../../routes/atoms';
import Checkbox from '@plone/components/icons/checkbox.svg?react';

export const ToolbarSave = () => {
  const formSubmit = useAtomValue(formSubmitAtom);
  const { t } = useTranslation();

  return (
    <button
      aria-label={t('cmsui.save')}
      title={t('cmsui.save')}
      type="submit"
      onClick={() => formSubmit?.()}
      className="primary"
    >
      <Checkbox />
    </button>
  );
};
