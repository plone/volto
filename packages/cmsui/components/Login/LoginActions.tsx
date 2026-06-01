import { Link, Button } from '@plone/components/quanta';
import ArrowRightSVG from '@plone/components/icons/arrow-right.svg?react';
import { useTranslation } from 'react-i18next';

const LoginActions = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <Link href="/register">{t('cmsui.auth.signUp')}</Link>
      <Button
        className="float-end"
        variant="primary"
        accent
        size="L"
        type="submit"
        aria-label={t('cmsui.auth.signIn')}
      >
        <ArrowRightSVG />
      </Button>
    </div>
  );
};

export default LoginActions;
