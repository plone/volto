import React, { useRef } from 'react';
import { VisuallyHidden } from 'react-aria';
import { ArrowleftIcon, ArrowrightIcon } from '../icons';
import { Button } from '../Button/Button';

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;

  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  currentLabel?: string;
  pageLabel?: string;
  buttonComponent?: React.ElementType;
  // --- props to change page size. Not implemented yet.---
  // pageSize: number;
  // pageSizes: Array<number>;
  // onChangePageSizes: (pageSize: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage = 0,
  onPageChange,

  ariaLabel = 'Pagination',
  prevLabel = 'Previous page',
  nextLabel = 'Next page',
  currentLabel = 'Current page',
  pageLabel = 'Page',
  buttonComponent: ButtonComponent = Button,
  // pageSize,
  // pageSizes,
  //onChangePageSizes,
}: PaginationProps) => {
  const ref = useRef<HTMLElement | null>(null);

  type PageType = {
    type: string;
    value?: number;
    text?: string;
    icon?: any;
    className?: string;
    disabled?: boolean;
    ariaLabel?: string;
    current?: boolean;
  };
  const pages = [] as PageType[];

  //previous button
  pages.push({
    type: 'prev-next',
    value: currentPage - 1,
    icon: <ArrowleftIcon />,
    className: 'previous-page',
    disabled: currentPage == 0,
    ariaLabel: prevLabel,
  });

  //page 1, always visible
  if (currentPage > 2) {
    pages.push({
      type: 'page',
      value: 0,
      text: '1',
    });
  }

  //dots
  if (currentPage > 3) {
    pages.push({ type: 'other-items', disabled: true, text: '...' });
  }

  //current page -2
  if (currentPage > 1) {
    pages.push({
      type: 'page',
      value: currentPage - 2,
      text: `${currentPage - 1}`,
    });
  }
  //current page -1
  if (currentPage > 0) {
    pages.push({
      type: 'page',
      value: currentPage - 1,
      text: `${currentPage}`,
      current: true,
    });
  }
  //current page
  if (totalPages > 1) {
    pages.push({
      type: 'page',
      value: currentPage,
      text: `${currentPage + 1}`,
      current: true,
      className: 'active',
      ariaLabel: currentLabel,
    });
  }

  //current page +1
  if (totalPages > currentPage + 1) {
    pages.push({
      type: 'page',
      value: currentPage + 1,
      text: `${currentPage + 2}`,
    });
  }
  //current page +2
  if (totalPages > currentPage + 2) {
    pages.push({
      type: 'page',
      value: currentPage + 2,
      text: `${currentPage + 3}`,
    });
  }

  //dots
  if (totalPages > currentPage + 4) {
    pages.push({ type: 'other-items', disabled: true, text: '...' });
  }

  //last page
  if (totalPages > currentPage + 3) {
    pages.push({
      type: 'page',
      value: totalPages - 1,
      text: `${totalPages}`,
    });
  }

  //next button
  pages.push({
    type: 'prev-next',
    value: currentPage + 1,
    icon: <ArrowrightIcon />,
    className: 'next-page',
    disabled: currentPage == totalPages - 1,
    ariaLabel: nextLabel,
  });

  //TODO: handle change pagesize

  return totalPages > 1 ? (
    <nav aria-label={ariaLabel} ref={ref} className="pagination">
      {pages.map((page, i) => {
        const buttonAttributes = {
          className: page.className
            ? `react-aria-Button ${page.className}`
            : undefined,
          isDisabled: page.disabled,
          'aria-label':
            page.ariaLabel ??
            (page.type === 'page' ? `${pageLabel} ${page.text}` : undefined),
        };

        return (
          <ButtonComponent
            {...buttonAttributes}
            key={`${i}${page.value}`}
            onClick={
              page.value !== undefined
                ? () => {
                    onPageChange(page.value ?? 0);
                  }
                : undefined
            }
          >
            {page.type === 'prev-next' && (
              <VisuallyHidden>{currentPage}</VisuallyHidden>
            )}
            {page.icon ? page.icon : page.text}
          </ButtonComponent>
        );
      })}
    </nav>
  ) : (
    <></>
  );
};
