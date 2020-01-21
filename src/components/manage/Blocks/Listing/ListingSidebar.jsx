import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { ListingBlockData as ListingData } from '@plone/volto/components';

const ListingSidebar = props => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Listing" defaultMessage="Listing" />
        </h2>
      </header>

      <ListingData {...props} />
    </Segment.Group>
  );
};

ListingSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default injectIntl(ListingSidebar);
