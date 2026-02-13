import { getBlockTypes } from '@plone/volto/actions/blockTypes/blockTypes';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getParentUrl, flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import debounce from 'lodash/debounce';
import { useClient } from '@plone/volto/hooks';
import config from '@plone/volto/registry';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Error from '@plone/volto/components/theme/Error/Error';
import { Table } from '@plone/components';

import backSVG from '@plone/volto/icons/back.svg';
import searchSVG from '@plone/volto/icons/zoom.svg';
import type { Location } from 'history';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

type RouteProps = {
  history: History;
  location: Location;
};

const BlockTypeControlpanel = (props: RouteProps) => {
  const { location } = props;
  const params = useParams<{ id: string }>();
  const id = params.id;
  const intl = useIntl();
  const blockTypes = useSelector((state) => state.blockTypes);
  const isClient = useClient();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const block =
    config.blocks.blocksConfig[id as keyof typeof config.blocks.blocksConfig];

  useEffect(() => {
    dispatch(getBlockTypes(id));
  }, [dispatch, id]);

  const onChangeSearch = (value: string) => {
    dispatch(getBlockTypes(id, value));
  };

  const debouncedSearch = debounce(onChangeSearch, 600);

  if (blockTypes.loading) {
    return <div>Loading...</div>;
  }

  if (blockTypes?.error?.status) {
    return <Error error={blockTypes.error} />;
  }

  return (
    blockTypes.loaded && (
      <div
        id="page-block_type"
        className="ui container controlpanel-block_type"
      >
        <h1>
          {intl.formatMessage({ id: block.title, defaultMessage: block.title })}
        </h1>
        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <Icon
            name={searchSVG}
            size="16px"
            title={intl.formatMessage(messages.search)}
          />
        </form>
        {blockTypes.items?.length > 0 ? (
          <Table
            columns={[
              {
                id: 'title',
                name: intl.formatMessage({
                  id: 'Title',
                  defaultMessage: 'Title',
                }),
                isRowHeader: true,
              },
              {
                id: 'occurrence',
                name: intl.formatMessage({
                  id: 'Occurrence',
                  defaultMessage: 'Occurrence',
                }),
                isRowHeader: true,
              },
            ]}
            rows={blockTypes.items.map((item) => ({
              id: item['@id'],
              textValue: item.title,
              title: (
                <>
                  <a href={item['@id']}>{item.title}</a>{' '}
                  <span>{flattenToAppURL(item['@id']) || '/'}</span>
                </>
              ),
              occurrence: item.count,
            }))}
          />
        ) : (
          <FormattedMessage
            id="no-blocks-found"
            defaultMessage="No items found for type: {type}."
            values={{
              type: intl.formatMessage({
                id: block.title,
                defaultMessage: block.title,
              }),
            }}
          />
        )}
        {isClient &&
          createPortal(
            <Toolbar
              pathname={pathname}
              hideDefaultViewButtons
              inner={
                <Link to={getParentUrl(pathname)} className="item">
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />,
            document.getElementById('toolbar') as HTMLElement,
          )}
      </div>
    )
  );
};

export default BlockTypeControlpanel;
