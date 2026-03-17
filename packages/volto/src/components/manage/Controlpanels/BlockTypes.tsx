import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getParentUrl } from '@plone/volto/helpers/Url/Url';
import { useClient } from '@plone/volto/hooks';
import config from '@plone/volto/registry';
import { createPortal } from 'react-dom';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getBlockTypes } from '@plone/volto/actions/blockTypes/blockTypes';
import { useDispatch, useSelector } from 'react-redux';
import Error from '@plone/volto/components/theme/Error/Error';
import { Spinner, Table } from '@plone/components';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

import backSVG from '@plone/volto/icons/back.svg';
import type { Location } from 'history';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  loading: {
    id: 'loading',
    defaultMessage: 'Loading',
  },
  blockType: {
    id: 'Block Type',
    defaultMessage: 'Block Type',
  },
  occurrences: {
    id: 'Occurrences',
    defaultMessage: 'Occurrences',
  },
});

type RouteProps = {
  history: History;
  location: Location;
};

const BlockTypesControlpanel = (props: RouteProps) => {
  const { location } = props;
  const intl = useIntl();
  const blockTypes = useSelector((state) => state.blockTypes);
  const blocksConfig = config.blocks.blocksConfig;
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const isClient = useClient();

  const blocks = Object.values(blocksConfig)
    .map((blockConfig) => ({
      ...blockConfig,
      title: blockConfig.title
        ? intl.formatMessage({
            id: blockConfig.title,
            defaultMessage: blockConfig.title,
          })
        : blockConfig.id,
    }))
    .sort((a, b) => (a.title === b.title ? 0 : a.title > b.title ? 1 : -1));

  useEffect(() => {
    dispatch(getBlockTypes());
  }, [dispatch]);

  if (blockTypes.loading) {
    return <Spinner label={intl.formatMessage(messages.loading)} />;
  }

  if (blockTypes?.error?.status) {
    return <Error error={blockTypes.error} />;
  }

  return (
    blockTypes.loaded && (
      <div
        id="page-block_types"
        className="ui container controlpanel-block-types"
      >
        <h1>
          <FormattedMessage id="Block Types" defaultMessage="Block Types" />
        </h1>
        <Table
          className="react-aria-Table cmsui-table"
          columns={[
            {
              id: 'blockType',
              name: intl.formatMessage(messages.blockType),
              isRowHeader: true,
            },
            {
              id: 'occurrences',
              name: intl.formatMessage(messages.occurrences),
            },
          ]}
          rows={blocks.map((block) => ({
            id: block.id,
            textValue: block.title,
            blockType: (
              <UniversalLink href={`${pathname}/${block.id}`}>
                {block.title}
              </UniversalLink>
            ),
            occurrences: blockTypes.items?.[block.id] || 0,
          }))}
        />
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

export default BlockTypesControlpanel;
