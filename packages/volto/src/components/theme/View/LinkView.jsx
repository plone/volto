import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { Container as SemanticContainer } from 'semantic-ui-react';

const LinkView = ({ token, content }) => {
  if (!token && content.remoteUrl) {
    if (isInternalURL(content.remoteUrl)) {
      return <Redirect to={flattenToAppURL(content.remoteUrl)} />;
    }
    window.location.href = flattenToAppURL(content.remoteUrl);
    return null;
  }
  const { title, description, remoteUrl } = content;
  const { openExternalLinkInNewTab } = config.settings;
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return (
    <Container id="page-document">
      <h1 className="documentFirstHeading">{title}</h1>
      {content.description && (
        <p className="documentDescription">{description}</p>
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
