import { type FormEvent, useState } from 'react';
import { Form, Input, Label, TextField } from 'react-aria-components';
import type { SlotComponentProps } from '../SlotRenderer';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@plone/components';
import Search from '@plone/components/icons/search.svg?react';
import styles from './Tools.module.css';
import clsx from 'clsx';

const SearchWidget = (props: SlotComponentProps) => {
  const { location } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const { t } = useTranslation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const path =
      pathname?.length > 0 ? `&path=${encodeURIComponent(pathname)}` : '';

    navigate(
      `/search?SearchableText=${encodeURIComponent(searchQuery)}${path}`,
    );

    setSearchQuery('');
    e.preventDefault();
  };

  return (
    <Form
      className={clsx(styles['searchwidget'], 'searchwidget')}
      onSubmit={onSubmit}
    >
      <TextField name="search" type="text">
        <Label className="sr-only">
          {t('layout.slots.tools.searchWidget.searchSite')}
        </Label>
        <Input
          placeholder={t('layout.slots.tools.searchWidget.searchSite')}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </TextField>
      <Button type="submit">
        <Search />
      </Button>
    </Form>
  );
};

export default SearchWidget;
