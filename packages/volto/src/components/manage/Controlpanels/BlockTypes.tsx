import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getParentUrl } from '@plone/volto/helpers/Url/Url';
import { useClient } from '@plone/volto/hooks';
import config from '@plone/volto/registry';
import { createPortal } from 'react-dom';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlockTypes } from '@plone/volto/actions/blockTypes/blockTypes';
import { useDispatch, useSelector } from 'react-redux';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import { listRoles } from '@plone/volto/actions/roles/roles';

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
  const [isUserManager, setIsUserManager] = useState(false);
  const roles = useSelector((state) => state.roles.roles);
  const blockTypes = useSelector((state) => state.blockTypes);
  const blocksConfig = config.blocks.blocksConfig;
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const isClient = useClient();
  const blocks = [];

  useEffect(() => {
    dispatch(listRoles());
  }, []);

  useEffect(() => {
    if (roles.length > 0 && roles.map((role) => role.id === 'Manager')) {
      setIsUserManager(true);
      dispatch(getBlockTypes());
    }
  }, [roles]);

  for (const block of Object.values(blocksConfig)) {
    blocks.push(block);
  }

  return isUserManager ? (
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
              <td className="table-cell">
                {blockTypes.items?.[block.id] || 0}
              </td>
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
