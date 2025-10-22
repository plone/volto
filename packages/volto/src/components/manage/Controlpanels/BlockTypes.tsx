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
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';

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
  const token = useSelector((state) => state.userSession.token);
  const controlpanels = useSelector(
    (state) => state.controlpanels.controlpanels,
  );
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

  return token && controlpanels?.length > 0 ? (
    <div
      id="page-block_types"
      className="ui container controlpanel-block_types"
    >
      <h1>
        <FormattedMessage id="block-types" defaultMessage="Block Types" />
      </h1>
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="table-heading">
              <FormattedMessage id="Type" defaultMessage="Type" />
            </th>
            <th className="table-heading">
              <FormattedMessage id="Occurrence" defaultMessage="Occurrence" />
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {blocks.map((block) => (
            <tr key={block.id} className="table-row">
              <td className="table-cell">
                <a href={`${pathname}/${block.id}`} className="table-link">
                  {block.title}
                </a>
              </td>
              <td className="table-cell">{items?.[block.id] || 0}</td>
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
  ) : (
    <Unauthorized pathname={pathname} staticContext={props.staticContext} />
  );
};

export default BlockTypesControlpanel;
