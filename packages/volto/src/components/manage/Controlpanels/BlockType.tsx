import { getBlockTypes } from '@plone/volto/actions/blockTypes/blockTypes';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getParentUrl, flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import debounce from 'lodash/debounce';
import { useClient } from '@plone/volto/hooks';
import config from '@plone/volto/registry';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import { listRoles } from '@plone/volto/actions/roles/roles';

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
  const [isUserManager, setIsUserManager] = useState(false);
  const params = useParams<{ id: string }>();
  const id = params.id;
  const intl = useIntl();
  const roles = useSelector((state) => state.roles.roles);
  const blockTypes = useSelector((state) => state.blockTypes);
  const isClient = useClient();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const block =
    config.blocks.blocksConfig[id as keyof typeof config.blocks.blocksConfig];

  useEffect(() => {
    dispatch(listRoles());
  }, []);

  useEffect(() => {
    if (roles.length > 0 && roles.map((role) => role.id === 'Manager')) {
      setIsUserManager(true);
      dispatch(getBlockTypes(id));
    }
  }, [roles, id]);

  const onChangeSearch = (value: string) => {
    dispatch(getBlockTypes(id, value));
  };

  const debouncedSearch = debounce(onChangeSearch, 600);

  return isUserManager ? (
    <div id="page-block_type" className="ui container controlpanel-block_type">
      <h1>
        <FormattedMessage
          id="block-type"
          defaultMessage="{title}"
          values={{ title: block.title }}
        />
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
        <table className="table">
          <thead className="table-header">
            <tr className="table-row">
              <th className="table-heading">
                <FormattedMessage id="Title" defaultMessage="Title" />
              </th>
              <th className="table-heading">
                <FormattedMessage id="Occurrence" defaultMessage="Occurrence" />
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {blockTypes.items.map((item) => (
              <tr key={item['@id']} className="table-row">
                <td className="table-cell">
                  <a href={item['@id']}>{item.title}</a>
                  <span>{flattenToAppURL(item['@id']) || '/'}</span>
                </td>
                <td className="table-cell">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <FormattedMessage
          id="no-blocks-found"
          defaultMessage="No items found for type: {type}."
          values={{ type: id }}
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
  ) : (
    <Unauthorized pathname={pathname} staticContext={props.staticContext} />
  );
};

export default BlockTypeControlpanel;
