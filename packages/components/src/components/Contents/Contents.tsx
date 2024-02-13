'use client';

import type { ActionsResponse } from '@plone/types';
import { useState } from 'react';
import {
  Button,
  // OverlayArrow,
  Tooltip,
  TooltipTrigger,
} from 'react-aria-components';
import cx from 'classnames';
import styles from './Contents.module.scss';
import Add from '../Icons/AddIcon';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Container from '../Container/Container';
import Input from '../Input/Input';

interface ContentsProps {
  pathname: string;
  objectActions: ActionsResponse['object'];
  loading: boolean;
  title: string;
}

/**
 * A table showing the contents of an object.
 *
 * It has a toolbar for interactions with the items and a searchbar for filtering.
 * Items can be sorted by drag and drop.
 */
export default function Contents({
  pathname,
  objectActions,
  loading,
  title,
}: ContentsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  // const path = getBaseUrl(pathname);
  const path = pathname;

  const folderContentsActions = objectActions.find(
    (action) => action.id === 'folderContents',
  );

  if (!folderContentsActions) {
    // TODO current volto returns the Unauthorized component here
    // it would be best if the permissions check was done at a higher level
    // and this remained null
    return null;
  }

  return (
    <Container
      as="div"
      // id="page-contents"
      className="folder-contents"
      aria-live="polite"
    >
      {/* TODO better loader */}
      {loading && <p>Loading...</p>}
      {/* TODO helmet setting title here... or should we do it at a higher level? */}
      <article id="content">
        <section className={cx('topbar', styles.topbar)}>
          <div className="title-block">
            <Breadcrumbs includeRoot={true} items={[]} />
            <h1>{title}</h1>
          </div>
          <Input
            name="sortable_title"
            placeholder="Search site"
            className={cx('search-input', styles['search-input'])}
          />
          <TooltipTrigger>
            <Button>
              <Add />
            </Button>
            <Tooltip placement="bottom">Add content</Tooltip>
          </TooltipTrigger>
        </section>
      </article>
    </Container>
  );
}
