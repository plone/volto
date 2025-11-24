import clsx from 'clsx';
import type { SlotComponentProps } from '../SlotRenderer';
import { useTranslation } from 'react-i18next';
import { Link } from '@plone/components/quanta';
import config from '@plone/registry';
import styles from './Tools.module.css';
import { flattenToAppURL } from '@plone/helpers';

const Anontools = (props: SlotComponentProps) => {
  const { content } = props;
  const { t } = useTranslation();

  const returnUrl = flattenToAppURL(content['@id']);
  const hasReturnUrl = returnUrl !== '' && returnUrl !== '/';

  return (
    <div className={clsx(styles['anontools'], 'anontools')}>
      <Link href={`/login${hasReturnUrl ? `?return_url=${returnUrl}` : ''}`}>
        {t('layout.slots.tools.anontools.login')}
      </Link>
      {config.settings.showSelfRegistration && (
        <Link href="/register">
          {t('layout.slots.tools.anontools.register')}
        </Link>
      )}
    </div>
  );
};

export default Anontools;
