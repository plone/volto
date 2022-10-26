import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  yes: {
    id: 'yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'no',
    defaultMessage: 'No',
  },
});

function ToggleFacetFilterListEntry(props) {
  const { facet, isEditMode, setFacets, facets } = props;
  const intl = useIntl();

  return (
    <Label size="small">
      {intl.formatMessage(facets[facet] ? messages.yes : messages.no)}
      <Icon
        name="delete"
        onClick={() => {
          const filteredFacets = Object.assign(
            {},
            ...Object.keys(facets)
              .filter((f) => f !== facet)
              .map((f) => ({ [f]: facets[f] })),
          );
          !isEditMode && setFacets(filteredFacets);
        }}
      />
    </Label>
  );
}

export default ToggleFacetFilterListEntry;
