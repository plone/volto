import clsx from 'clsx';
import type { SlotComponentProps } from '../SlotRenderer';
import { useTranslation } from 'react-i18next';
import { Link } from '@plone/components';
import config from '@plone/registry';
import styles from './Tools.module.css';
import { flattenToAppURL } from '@plone/helpers';

const AnonymousTools = (props: SlotComponentProps) => {
  const { content } = props;
  const { t } = useTranslation();

  const returnUrl = flattenToAppURL(content['@id']);
  const hasReturnUrl = returnUrl !== '' && returnUrl !== '/';

  return (
    <div className={clsx(styles['anonymoustools'], 'anonymoustools')}>
      <Link href={`/login${hasReturnUrl ? `?return_url=${returnUrl}` : ''}`}>
        {t('layout.slots.tools.anonymousTools.login')}
      </Link>
      {config.settings.showSelfRegistration && (
        <Link href="/register">
          {t('layout.slots.tools.anonymousTools.register')}
        </Link>
      )}
    </div>
  );
};

export default AnonymousTools;
