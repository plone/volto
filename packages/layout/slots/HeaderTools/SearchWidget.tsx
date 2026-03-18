import { type FormEvent, useState } from 'react';
import { Form, Input, Label, TextField } from 'react-aria-components';
import type { SlotComponentProps } from '../SlotRenderer';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@plone/components';
import { Button } from '@plone/components/quanta';
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
        <Icon size="sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
            <path
              fillRule="evenodd"
              d="M7,16 C7,11.038 11.037,7 16,7 C20.963,7 25,11.038 25,16 C25,20.962 20.963,25 16,25 C11.037,25 7,20.962 7,16 L7,16 Z M32.707,31.293 L24.448,23.034 C26.039,21.125 27,18.673 27,16 C27,9.935 22.065,5 16,5 C9.935,5 5,9.935 5,16 C5,22.065 9.935,27 16,27 C18.673,27 21.125,26.039 23.034,24.448 L31.293,32.707 L32.707,31.293 Z"
            />
          </svg>
        </Icon>
      </Button>
    </Form>
  );
};

export default SearchWidget;
