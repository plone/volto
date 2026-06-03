import { getBlockTypes } from '@plone/volto/actions/blockTypes/blockTypes';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getParentUrl, flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useClient } from '@plone/volto/hooks';
import config from '@plone/volto/registry';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Error from '@plone/volto/components/theme/Error/Error';
import { Table } from '@plone/components';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

import backSVG from '@plone/volto/icons/back.svg';
import type { Location } from 'history';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  controlpanelTitle: {
    id: 'controlpanel_block_type',
    defaultMessage: 'Block: {title}',
  },
  item: {
    id: 'Item',
    defaultMessage: 'Item',
  },
  path: {
    id: 'Path',
    defaultMessage: 'Path',
  },
  occurrences: {
    id: 'Occurrences',
    defaultMessage: 'Occurrences',
  },
  loading: {
    id: 'loading',
    defaultMessage: 'Loading',
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

  if (blockTypes.loading) {
    return <div>{intl.formatMessage(messages.loading)}&hellip;</div>;
  }

  if (blockTypes?.error?.status) {
    return <Error error={blockTypes.error} />;
  }

  const translatedTitle = block?.title
    ? intl.formatMessage({ id: block.title, defaultMessage: block.title })
    : id;

  return (
    blockTypes.loaded && (
      <div
        id="page-block_type"
        className="ui container controlpanel-block-type"
      >
        <h1>
          {intl.formatMessage(messages.controlpanelTitle, {
            title: translatedTitle,
          })}
        </h1>
        {blockTypes.items?.length > 0 ? (
          <Table
            className="react-aria-Table cmsui-table"
            columns={[
              {
                id: 'title',
                name: intl.formatMessage(messages.item),
                isRowHeader: true,
              },
              {
                id: 'path',
                name: intl.formatMessage(messages.path),
                isRowHeader: true,
              },
              {
                id: 'occurrences',
                name: intl.formatMessage(messages.occurrences),
                isRowHeader: true,
              },
            ]}
            rows={blockTypes.items.map((item) => ({
              id: item['@id'],
              textValue: item.title,
              title: (
                <UniversalLink href={item['@id']}>{item.title}</UniversalLink>
              ),
              path: flattenToAppURL(item['@id']) || '/',
              occurrences: item.count,
            }))}
          />
        ) : (
          <FormattedMessage
            id="no-blocks-found"
            defaultMessage="No items found for type: {type}."
            values={{
              type: translatedTitle,
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
