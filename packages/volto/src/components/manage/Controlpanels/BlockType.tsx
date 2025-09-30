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
  const isClient = useClient();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const block =
    config.blocks.blocksConfig[id as keyof typeof config.blocks.blocksConfig];

  useEffect(() => {
    dispatch(getBlockTypes(id));
  }, [id, dispatch]);

  const items = useSelector(
    (state: {
      blockTypes: {
        items: {
          items: Array<{ '@id': string; title: string; count: number }>;
        };
      };
    }) => state.blockTypes.items.items,
  );

  const onChangeSearch = (value: string) => {
    dispatch(getBlockTypes(id, value));
  };

  const debouncedSearch = debounce(onChangeSearch, 600);

  return (
    <div id="page-block_type" className="ui container controlpanel-block_type">
      <h2>
        <FormattedMessage
          id="block-type"
          defaultMessage="{title}"
          values={{ title: block.title }}
        />
      </h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search results..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <button type="button">
          <Icon
            name={searchSVG}
            size="30px"
            title={intl.formatMessage(messages.search)}
          />
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="Title" defaultMessage="Title" />
            </th>
            <th>
              <FormattedMessage id="Count" defaultMessage="Count" />
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.length > 0 ? (
            items.map((item) => (
              <tr key={item['@id']}>
                <td>
                  <a href={item['@id']}>
                    {flattenToAppURL(item['@id']) || 'Home'}
                  </a>
                </td>
                <td>{item.count}</td>
              </tr>
            ))
          ) : (
            <FormattedMessage
              id="no-blocks-found"
              defaultMessage="No items found for type: {type}."
              values={{ type: id }}
            />
          )}
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

export default BlockTypeControlpanel;
