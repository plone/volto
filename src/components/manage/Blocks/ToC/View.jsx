/**
 * View toc block.
 * @module components/manage/Blocks/ToC/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { map, filter } from 'lodash';
import { List } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

/**
 * View toc block class.
 * @class View
 * @extends Component
 */
const View = ({ properties }) => {
  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  return (
    <div className="block table-of-contents">
      <h2>
        <FormattedMessage
          id="Table of Contents"
          defaultMessage="Table of Contents"
        />
      </h2>
      <List bulleted>
        {map(
          filter(
            map(
              properties[blocksLayoutFieldname].items,
              (id) => properties[blocksFieldname][id],
            ),
            (block) =>
              block['@type'] === 'text' &&
              block.text?.blocks[0].type.indexOf('header-') === 0,
          ),
          (block) => (
            <List.Item
              key={block.text.blocks[0].key}
              className={block.text.blocks[0].type}
            >
              <AnchorLink href={`#${block.text.blocks[0].key}`}>
                {block.text.blocks[0].text}
              </AnchorLink>
            </List.Item>
          ),
        )}
      </List>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(View);
