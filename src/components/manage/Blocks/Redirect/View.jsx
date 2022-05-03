import React from 'react';
import PropTypes from 'prop-types';
import { withBlockExtensions } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useSelector } from 'react-redux';

const View = (props) => {
  const { data } = props;
  const remoteUrl = data.remoteUrl;
  const token = useSelector((state) => state.userSession?.token);
  return !token ? (
    <Redirect to={remoteUrl} />
  ) : (
    <Container>
      {remoteUrl && (
        <p>
          <FormattedMessage
            id="The link address is:"
            defaultMessage="The link address is:"
          />{' '}
          <UniversalLink href={remoteUrl}>
            {flattenToAppURL(remoteUrl)}
          </UniversalLink>
        </p>
      )}
    </Container>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string,
};

export default withBlockExtensions(View);
