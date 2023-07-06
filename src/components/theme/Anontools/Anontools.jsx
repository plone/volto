import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { useSelector, shallowEqual } from 'react-redux';

function useContent() {
  const data = useSelector((state) => state.content.data, shallowEqual);

  return { data };
}
const useToken = () => {
  return useSelector((state) => state.userSession.token, shallowEqual);
};
const Anontools = () => {
  const token = useToken();
  const { data: content } = useContent();

  const { settings } = config;
  return (
    !token && (
      <Menu pointing secondary floated="right">
        <Menu.Item>
          <Link
            aria-label="login"
            to={`/login${
              content?.['@id']
                ? `?return_url=${flattenToAppURL(content['@id'])}`
                : ''
            }`}
          >
            <FormattedMessage id="Log in" defaultMessage="Log in" />
          </Link>
        </Menu.Item>
        {settings.showSelfRegistration && (
          <Menu.Item>
            <Link aria-label="register" to="/register">
              <FormattedMessage id="Register" defaultMessage="Register" />
            </Link>
          </Menu.Item>
        )}
      </Menu>
    )
  );
};

export default Anontools;

Anontools.propTypes = {
  token: PropTypes.string,
  content: PropTypes.shape({
    '@id': PropTypes.string,
  }),
};

Anontools.defaultProps = {
  token: null,
  content: {
    '@id': null,
  },
};
