import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';

import { TextWidget } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

const messages = defineMessages({
  LinkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
});

const ListingMore = ({
  data,
  block,
  onChangeBlock,
  required = false,
  intl,
  openObjectBrowser,
}) => {
  return (
    <>
      <TextWidget
        id="linkTitle"
        title={intl.formatMessage(messages.LinkTitle)}
        required={false}
        value={data.linkMore?.title}
        onChange={(name, value) => {
          onChangeBlock(block, {
            ...data,
            linkMore: {
              ...data.linkMore,
              title: value,
            },
          });
        }}
      />

      <TextWidget
        id="linkHref"
        title={intl.formatMessage(messages.LinkTo)}
        required={false}
        value={data.linkMore?.href}
        icon={data.linkMore?.href ? clearSVG : navTreeSVG}
        iconAction={
          data.linkMore?.href
            ? () => {
                onChangeBlock(block, {
                  ...data,
                  linkMore: {
                    ...data.linkMore,
                    href: '',
                  },
                });
              }
            : () =>
                openObjectBrowser({
                  mode: 'link',
                  onSelectItem: (url) => {
                    onChangeBlock(block, {
                      ...data,
                      linkMore: {
                        ...data.linkMore,
                        href: url,
                      },
                    });
                  },
                })
        }
        onChange={(key, value) =>
          onChangeBlock(block, {
            ...data,
            linkMore: {
              ...data.linkMore,
              href: value,
            },
          })
        }
      />
    </>
  );
};

ListingMore.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default compose(withObjectBrowser, injectIntl)(ListingMore);
