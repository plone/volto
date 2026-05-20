import { Form, Input, Label, TextField } from 'react-aria-components';
import type { SlotComponentProps } from '../SlotRenderer';
import { useTranslation } from 'react-i18next';
import { Button } from '@plone/components';
import Search from '@plone/components/icons/search.svg?react';
import styles from './Tools.module.css';
import clsx from 'clsx';

const SearchWidget = (props: SlotComponentProps) => {
  const { location } = props;

  const { t } = useTranslation();
  const pathname = location.pathname;
  const hasPath = pathname?.length > 0 && pathname !== '/';

  return (
    <Form
      className={clsx(styles['searchwidget'], 'searchwidget')}
      action="/search"
      method="get"
    >
      <TextField name="search" type="text">
        <Label className="sr-only">
          {t('layout.slots.tools.searchWidget.searchSite')}
        </Label>
        <Input
          name="SearchableText"
          placeholder={t('layout.slots.tools.searchWidget.searchSite')}
        />
        {hasPath && <input type="hidden" name="path" value={pathname} />}
      </TextField>
      <Button type="submit">
        <Search />
      </Button>
    </Form>
  );
};

export default SearchWidget;
