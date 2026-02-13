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
import { Table } from '@plone/components';

import backSVG from '@plone/volto/icons/back.svg';
import type { Location } from 'history';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
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
  const blocks = Object.values(blocksConfig).sort((a, b) =>
    a.title === b.title ? 0 : a.title > b.title ? 1 : -1,
  );

  useEffect(() => {
    dispatch(getBlockTypes());
  }, [dispatch]);

  if (blockTypes.loading) {
    return <div>Loading...</div>;
  }

  if (blockTypes?.error?.status) {
    return <Error error={blockTypes.error} />;
  }

  return (
    blockTypes.loaded && (
      <div
        id="page-block_types"
        className="ui container controlpanel-block_types"
      >
        <h1>
          <FormattedMessage id="block-types" defaultMessage="Block Types" />
        </h1>
        <Table
          columns={[
            {
              id: 'blockType',
              name: intl.formatMessage({
                id: 'block-type',
                defaultMessage: 'Block Type',
              }),
              isRowHeader: true,
            },
            {
              id: 'occurrence',
              name: intl.formatMessage({
                id: 'occurrence',
                defaultMessage: 'Occurrence',
              }),
            },
          ]}
          rows={blocks.map((block) => ({
            id: block.id,
            textValue: block.title,
            blockType: (
              <a href={`${pathname}/${block.id}`} className="table-link">
                {block.title}
              </a>
            ),
            occurrence: blockTypes.items?.[block.id] || 0,
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
