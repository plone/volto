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
  const blocksConfig = config.blocks.blocksConfig;
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const isClient = useClient();
  const blocks = [];

  for (const block of Object.values(blocksConfig)) {
    blocks.push(block);
  }

  useEffect(() => {
    dispatch(getBlockTypes());
  }, [dispatch]);

  const items = useSelector(
    (state: {
      blockTypes: {
        items: { summary: Record<string, number> };
      };
    }) => state.blockTypes.items.summary,
  );

  return (
    <div
      id="page-block_types"
      className="ui container controlpanel-block_types"
    >
      <h2>
        <FormattedMessage id="block-types" defaultMessage="Block Types" />
      </h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.id}>
              <td>
                <a href={`${pathname}/${block.id}`}>{block.title}</a>
              </td>
              <td>{items?.[block.id] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  );
};

export default BlockTypesControlpanel;
