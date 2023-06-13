import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { FormattedMessage } from 'react-intl';
import config from '@plone/volto/registry';

const LinkView = ({ token, content, history }) => {
  useEffect(() => {
    if (!token) {
      const { remoteUrl } = content;
      if (isInternalURL(remoteUrl)) {
        history.replace(flattenToAppURL(remoteUrl));
      } else if (!__SERVER__) {
        window.location.href = flattenToAppURL(remoteUrl);
      }
    }
  }, [content, history, token]);
  const { remoteUrl } = content;
  const { openExternalLinkInNewTab } = config.settings;

  return (
    <Container id="page-document">
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {remoteUrl && (
        <p>
          <FormattedMessage
            id="The link address is:"
            defaultMessage="The link address is:"
          />{' '}
          <UniversalLink
            href={remoteUrl}
            openLinkInNewTab={
              openExternalLinkInNewTab && !isInternalURL(remoteUrl)
            }
          >
            {flattenToAppURL(remoteUrl)}
          </UniversalLink>
        </p>
      )}
    </Container>
  );
};

LinkView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    remoteUrl: PropTypes.string,
  }),
  token: PropTypes.string,
};

LinkView.defaultProps = {
  content: null,
  token: null,
};

export default LinkView;
